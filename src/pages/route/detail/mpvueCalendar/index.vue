<template>
  <div class="detail-warp">
    <navbar title="跟团游价格日历"></navbar>
    <div class :style="{'margin-top': (navContentHeight+navBarHeight+'px')}">
      <div class="calendar-wrapper">    
        <div class="calendar">
          <Calendar
            v-if='showcData'
            :clean="clean"
            :lunar="lunar"
            ref="calendar"
            :range="isrange"
            :multi="ismulti"
            :almanacs="almanacs"        
            @select="select"
            @next="next"
            @prev="prev"
            :value="value"
            :disabled="disabledArray"
            :weekSwitch="weekSwitch"
            :events="events"
            :settingData="settingData"
          />
        </div>    
      </div>      
      <div class="px-ul" v-if="getFinalPriceStockArr.length>0&&showcData">
        <div class="px-title">出行人数</div>
        <div v-for="(item, index) in getFinalPriceStockArr" :key="index" class="px-li">
          <div class="px-left">
            <p class="px-name two-line">
              {{ item.ticketName }}
            </p>
            <p class="px-attention">2-12周岁(不含)</p>              
          </div>
          <div class="px-right" v-if="item.salePrice">
            <span class="sub" :class="{sub0:item.num==0}" @click.stop="sub(index)">-</span>
            <span class="number">{{item.num}}</span>
            <span class="add" @click.stop="add(index)">+</span>
          </div>
          <div class="px-right" v-else>
            <em class="price-xuxian">--</em>
          </div>
        </div>
      </div>
      <div class="bottom-box">
        <div class="left-warper">
          <div class="bottom-label">总额</div>
          <div class="bottom-price-unit">￥</div>
          <div class="bottom-price-number">{{totalPrice}}</div>
          <div class="bottom-price-detail" @click="priceDetailShow=true">明细</div>
        </div>
        <div v-if="authorization"
          class="right-warper"
          @click="gotoOrder">
          提交订单
        </div>
        <button v-else open-type="getUserInfo" @getuserinfo='getUserInfo' class="right-warper">提交订单</button>
      </div>
    </div>
    <!-- 明细 -->
    <div class="price-detail-warper" v-show="priceDetailShow" @click='priceDetailShow=false'>
      <div class="price-detail">
        <div class="price-detail-title price-detail-item">
          <div class="price-text">费用明细</div>
          <div class="price-value">
            <img src="https://cdn.51dmq.com/ui/order/close.png" alt="" @click='priceDetailShow=false'>
          </div>
        </div>
        <div class="price-detail-item" v-for="(item, index) in getFinalPriceStockArr" :key="index">
          <div class="price-text">{{item.ticketName}}</div>
          <div class="price-value">
            <span>￥{{item.salePrice}}</span><span class="price-num">X{{item.num}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import navbar from "@/components/navbar";
import {
  getData,
  postData,
  merchantInfoId,
  isauthorization,
  setUserInfo  
} from "@/common/common";
import Calendar from '@/components/mpvue-calendar/mpvue-calendar'
import '@/components/mpvue-calendar/browser-style.css'
import '@/components/mpvue-calendar/style.css';
import {holiday} from '@/components/mpvue-calendar/holiday'
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
export default {
  components: {    
    Calendar,
    navbar    
  },
  data() {
    return {
      priceDetailShow: false,
      wayType: 1,
      settingData: [],
      value: [],
      isrange: false,
      weekSwitch: false,
      ismulti: false,
      dataInfo: {},
      monFirst: true,
      clean: true, //简洁模式
      lunar: true, //显示农历
      // events: {'2019-2-7':'今日备注', '2019-2-8':'一条很长的明日备注'},
      events: {},
      // tileContent: holiday,
      renderValues: [],
      disabledArray: [],
      almanacs: {},
      showcData:false,
      getPriceStockArr: [],
      getFinalPriceStockArr: [],
      number: 0, 
      canOrder: false,
      routeCode: '',
      routeId: '',
      playDate: '',
      authorization: false
    };
  },
  computed: {
    totalPrice() {
      let num = 0;
      this.getFinalPriceStockArr.map(item=>{
        if(item.num)
        num += item.salePrice * item.num;
      })
      return num.toFixed(2);
    }
  },
  methods: {
    subForm() {
      this.goUrl("pages/route/order/main?orderType=route&playDate="+this.playDate);
    },
    getUserInfo(e) {
      if (e.mp.detail.userInfo) {
        //授权成功
        this.authorization = true;
        //huancu
        setUserInfo().then(res => {
            this.gotoOrder();
        });
      } else {
        // 授权失败-除非微信自己出问题了
      }
    },
    goUrl(path) {
      this.navigatePageTo(this.router + path);
    },
    gotoOrder(){ 
      this.getFinalPriceStockArr.map(item=>{
          item.modelName = item.ticketName
      })
      wx.setStorageSync("routeType", this.getFinalPriceStockArr);
      wx.setStorageSync("playDate", this.playDate);
      this.goUrl("pages/route/order/main?orderType=route&playDate="+this.playDate);
    },
    select(val, val2) {        
      //获取选定日期的价格库存        
      let selectDate = val2.date.split('-');
      let selectYear = selectDate[0];
      let selectMonth = selectDate[1] < 10 ? '0' + selectDate[1] : selectDate[1];
      let selectDay = selectDate[2] < 10 ? '0' + selectDate[2] : selectDate[2];
      let getFinalDate = selectYear + '-' +　selectMonth + '-' + selectDay;        
      let that = this;
      let getPriceStockArr = that.getPriceStockArr;
      console.log(getPriceStockArr)
      let getFinalPriceStockArr = [];
      for(let m = 0; m < getPriceStockArr.length; m++){
        for(let n = 0; n < getPriceStockArr[m].clCalendarDayVos.length; n++){            
          let obj = {
            modelCode: getPriceStockArr[m].modelCode,
            ticketName: getPriceStockArr[m].ticketName,
            ticketType: getPriceStockArr[m].ticketType,
            num: 0
          }
          if(getPriceStockArr[m].clCalendarDayVos[n].date == getFinalDate){              
            let finalObj = Object.assign(getPriceStockArr[m].clCalendarDayVos[n], obj);
            getFinalPriceStockArr.push(finalObj);
          }
        }
      }
      that.getFinalPriceStockArr = getFinalPriceStockArr;
      that.getTotalNum();    
      this.playDate = val2.date;
      // console.log(that.getFinalPriceStockArr);
    },
    //计算价格
    sub(index) {
      if (this.getFinalPriceStockArr[index].num > 0) {
        this.getFinalPriceStockArr[index].num--;
        this.getTotalNum();
      }
    },
    add(index) {
      let num =  this.getFinalPriceStockArr[index].num + 1;
      this.$set(this.getFinalPriceStockArr, index, Object.assign({},this.getFinalPriceStockArr[index],{num:num}));
      this.canOrder = true;
      // console.log('933', this.getFinalPriceStockArr);
    },
    getTotalNum() {
      let sum = 0;
      this.getFinalPriceStockArr.forEach((item, index) => {
        sum += item.num;
      });
      if(sum>0){
        this.canOrder = true;
      }else{
        this.canOrder = false;
      }
    },    
  },
  onLoad() {   
    let that = this;
    //判断用户是否授权
    isauthorization("userInfo").then(res => {
      this.authorization = res;
    });
    let id = that.$root.$mp.query.id;
    that.routeId = that.$root.$mp.query.id;
    that.routeCode = that.$root.$mp.query.routeCode;
    let routeParams = that.$root.$mp.query.routeParams?JSON.parse(that.$root.$mp.query.routeParams):{};
    let ndate = new Date();
    let nyear = ndate.getFullYear();
    let nmonth = ndate.getMonth() + 1;
    let ymArr = [];
    for (let i = 0; i < 5; i++) {
      let obj = {
        nyear: '',
        nmonth: ''
      };
      let oMonth = nmonth+i;      
      if(oMonth>12){
        obj.nmonth = oMonth - 12;
        obj.nyear = nyear+1;
      }else{
        obj.nmonth = oMonth;
        obj.nyear = nyear;
      }
      ymArr.push(obj);
    }
    let beginMonth = ymArr[0].nyear + '-' + ymArr[0].nmonth;
    let endMonth = ymArr[ymArr.length-1].nyear + '-' + ymArr[ymArr.length-1].nmonth;    
    let listCalendarPriceMapUrl = api.route.detail.listCalendarPriceMap;
    getData(listCalendarPriceMapUrl, {
      merchantInfoId: merchantInfoId,
      id: id,
      beginMonth: beginMonth,
      endMonth: endMonth
    }).then(res => {
      // that.settingData = res.data[0].clCalendarDayVos; 
      let arr = []
      for(let i=0;i<res.data[0].clCalendarDayVos.length;i++){
        let obj = {}
        let priceFlag = true
        let flag = false;
        let price
        let pxArr = []
        for(let j=0;j<res.data.length;j++){
           if(res.data[j].clCalendarDayVos[i].salePrice){
            if(priceFlag){
              price = res.data[j].clCalendarDayVos[i].salePrice
              priceFlag = false
            }
             flag = true;           
           }
            pxArr.push(res.data[j].clCalendarDayVos[i]) 
        }
        obj.selcted = flag
        obj.pxArr = pxArr
        obj.salePrice = price?price:""
        obj.date = res.data[0].clCalendarDayVos[i].date
        arr.push(obj)
      }  
       that.settingData = arr

      console.log(arr)
      that.getPriceStockArr = res.data;      
      that.showcData = true;      
      //选定价格日历中第一个日期或者传入的日期
      let myDate = new Date();
      let lFullYear = myDate.getFullYear();
      let lFullMonth = (myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1);
      let lFullDay = myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate();
      let curDate = lFullYear + '-' + lFullMonth + '-' + lFullDay;
      
      if(that.$root.$mp.query.day){ //传入日期
        let dateArr = that.$root.$mp.query.day.split('-');
        let dataYear = dateArr[0], dataMonth = dateArr[1].replace(/\b(0+)/gi,""), dateDay = dateArr[2].replace(/\b(0+)/gi,"");
        that.value = [Number(dataYear), Number(dataMonth), Number(dateDay)];
      }else{  //第一个日期
        for(let i =0; i < that.settingData.length; i++){
          if(that.settingData[i].price){          
            if(new Date(curDate).getTime() == new Date(that.settingData[i].date).getTime()){
              let firstValue = that.settingData[i].date.split('-');
              let firstYear = firstValue[0], firstMonth = firstValue[1].replace(/\b(0+)/gi,""), firstDay = firstValue[2].replace(/\b(0+)/gi,"");
              that.value = [Number(firstYear), Number(firstMonth), Number(firstDay)]; 
              break;
            }else{
              let firstValue = that.settingData[0].date.split('-');
              let firstYear = firstValue[0], firstMonth = firstValue[1].replace(/\b(0+)/gi,""), firstDay = firstValue[2].replace(/\b(0+)/gi,"");
              that.value = [Number(firstYear), Number(firstMonth), Number(firstDay)];          
            }
          }        
        }
      }
            
      //获取选定日期的价格库存展示票型      
      let selectDate = that.value;      
      let selectYear = selectDate[0];
      let selectMonth = selectDate[1] < 10 ? '0' + selectDate[1] : selectDate[1];
      let selectDay = selectDate[2] < 10 ? '0' + selectDate[2] : selectDate[2];
      let getFinalDate = selectYear + '-' +　selectMonth + '-' + selectDay;      
      let getPriceStockArr = res.data;      
      let getFinalPriceStockArr = [];
        for(let m = 0; m < getPriceStockArr.length; m++){
          for(let n = 0; n < getPriceStockArr[m].clCalendarDayVos.length; n++){
            let obj = {
              modelCode: getPriceStockArr[m].modelCode,
              ticketName: getPriceStockArr[m].ticketName,
              ticketType: getPriceStockArr[m].ticketType,
              num: 0
            }
            if(getPriceStockArr[m].clCalendarDayVos[n].date == getFinalDate){              
              let finalObj = Object.assign(getPriceStockArr[m].clCalendarDayVos[n], obj)
              finalObj.num = routeParams[finalObj.ticketType]?routeParams[finalObj.ticketType]:0,
              getFinalPriceStockArr.push(finalObj);
            }
          }
        }
        that.getFinalPriceStockArr = getFinalPriceStockArr; 
        that.getTotalNum(); 
        that.playDate = that.value[0] + '-' + that.value[1] + '-' + that.value[2];
        // console.log('65565656565655566' ,that.playDate);
      // this.handelRenderValues();
    })
  },
  onUnload() {
    this.priceDetailShow = false;
    this.showcData = false;
    this.settingData = [];
    this.getFinalPriceStockArr = [];
    this.value = [];
    this.getPriceStockArr = [];
  }
};
</script>

<style lang="scss">

.detail-warp {
  width: 100%;
  background-color: #f7f7f7;
  .price-detail-warper {
    z-index: 9;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.35);
    .price-detail {
      position: absolute;
      min-height: 300px;
      bottom: 0px;
      right: 0px;
      left: 0px;
      padding-left: 10px;
      background-color: #fff;
      .price-detail-title {
        font-weight: bold;
        font-size: 16px;
        line-height: 45px;
        color: #333;
      }
      .price-detail-item {
        color: #666;
        display: flex;
        justify-content: space-between;
        line-height: 48px;
        border-bottom: 0.5px solid #e0e0e0;
        font-size: 13px;
        img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
        .price-value {
          padding-right: 5px;
          span {
            margin-right: 13px;
          }
        }
      }
    }
  } 
  .px-ul {
    width: 100%;
    color: #333;
    background-color: #fff;
    .px-title {
      font-size: 16px;
      font-weight: bold;
      line-height: 49px;
      height: 49px;
      padding-left: 10px;
      border-bottom: 0.5px solid #e2e2e2;
    }
    .px-li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      margin-left: 10px;
      padding-right: 10px;
      line-height: 55px;
      border-bottom: 0.5px solid #e2e2e2;
      .px-right {
        display: inline-block;
        vertical-align: middle;
        float: right;
        .price-xuxian{
          color: #f66;
        }
      }
      .px-tips {
        width: 100%;
        font-size: 12px;
        color: #ff6363;
      }
      .px-name {
        display: inline-block;
        vertical-align: middle;
        max-width: 150px;
        color: #413838;
        font-size: 16px;
      }
      .px-attention {
        display: inline-block;
        vertical-align: middle;
        margin-left: 15px;
        color: #ccc;
      }
      .px-right {    
        .number {
          font-size: 18px;
          width: 34px;
          text-align: center;
          color: #333;
          display: inline-block;
          vertical-align: middle;
        }
        .sub {
          color: rgba(255, 99, 99, 1);
          font-size: 18px;
          border: 1px solid rgba(255, 99, 99, 1);
          height: 29px;
          line-height: 28px;
          width: 44px;
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }

        .add {
          color: rgba(255, 99, 99, 1);
          font-size: 18px;
          border: 1px solid #ff6363;
          height: 29px;
          line-height: 28px;
          width: 44px;
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
        }
        .sub0 {
          border: 1px solid rgba(255, 99, 99, 0.35) !important;
          color: rgba(255, 99, 99, 0.35) !important;
        }
      }
      .ydxz {
        font-size: 12px;
        color: #00699e;
        margin-top: 10px;
      }
    }
  }
  .order-btn{
    display: block;
    color: #fff;
    border-radius: 12px;
    width: 90%;
    height: 40px;
    line-height: 40px;
    margin-left: 5%;
    margin-top: 15px;
    text-align: center;
    font-size: 15px;
    // margin: 15px;
    background-color: #f05b47;
  }
  .disabled-btn {
    opacity: .5;
  }
  .bottom-box {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 50px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    border-top: 0.5px solid #e5e5e5;
    align-items: center;
    line-height: 50px;
    font-family: PingFangSC-Regular, sans-serif;
    background: #ffffff;
    z-index: 700;
    .left-warper {
      margin-left: 15px;
      color: #ef0017;
      .bottom-label {
        font-size: 13px;
        display: inline;
        color: #333;
      }
      .bottom-price-unit {
        font-size: 12px;
        display: inline;
        margin: 0px 2px;
      }
      .bottom-price-number {
        font-size: 19px;
        margin-right: 15px;
        display: inline;
      }
      .bottom-price-detail {
        font-size: 10px;
        line-height: 15px;
        width: 47px;
        text-align: center;
        color: #3399ff;
        vertical-align: middle;
        background-color: #eaf5ff;
        border-radius: 7.5px;
        height: 15px;
        display: inline-block;
      }
    }
    .right-warper {
      margin-right: 10px;
      font-size: 16px;
      line-height: 35px;
      border-radius: 17.5px;
      text-align: center;
      padding: 0px;
      width: 88px;
      color: #fff;
      background: -webkit-linear-gradient(left, #f01127 , #f74068); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #f01127, #f74068); /* Opera 11.1 - 12.0 */  
      background: -moz-linear-gradient(right, #f01127, #f74068); /* Firefox 3.6 - 15 */ 
      background: linear-gradient(to right, #f01127 , #f74068); /* 标准的语法 */ 
    }
  }
}
</style>
