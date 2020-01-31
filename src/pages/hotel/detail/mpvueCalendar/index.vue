<template>
  <div class="hotel-calendar-mask">
    <div class="hotel-calendar-wrap">
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
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import {
  getData,
  postData,
  merchantInfoId,
  isauthorization,
  setUserInfo  
} from "@/common/common";
import Calendar from '@/components/mpvue-calendar/mpvue-hotelcalendar'
import '@/components/mpvue-calendar/browser-style.css'
import '@/components/mpvue-calendar/style.css';
import {holiday} from '@/components/mpvue-calendar/holiday'
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
export default {
  components: {    
    Calendar
  },
  props: {
    beginDate: {
      type: String,
      default: ""
    },
    endDate: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      wayType: 1,
      settingData: [],
      value: [],
      isrange: false,
      weekSwitch: false,
      ismulti: true,
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
      number: 0, 
      canOrder: false,
      authorization: false
    };
  },
  methods: {
    updateValue() {
      let that = this;
      if(that.beginDate&&that.endDate){ //传入日期
        let dateArr = that.beginDate.split('-');
        let dataYear = dateArr[0], dataMonth = dateArr[1].replace(/\b(0+)/gi,""), dateDay = dateArr[2].replace(/\b(0+)/gi,"");
        let dateArr1 = that.endDate.split('-');
        let dataYear1 = dateArr1[0], dataMonth1 = dateArr1[1].replace(/\b(0+)/gi,""), dateDay1 = dateArr1[2].replace(/\b(0+)/gi,"");
        that.value = [[Number(dataYear), Number(dataMonth), Number(dateDay)],[Number(dataYear1), Number(dataMonth1), Number(dateDay1)]];
      }else{  //第一个日期
        that.value = [];
      }
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
    select(val, val2) {
      //获取选定日期的价格库存
      let beginDate = '',
          endDate = '',
          date = val[0],
          date1 = val[1];
      date = date[0]+'-'+date[1]+'-'+date[2];
      date1 = date1[0]+'-'+date1[1]+'-'+date1[2];
      console.log(val, date, date1)
      if(new Date(date.replace(/-/g,'/')).getTime()>new Date(date1.replace(/-/g,'/')).getTime()){
        beginDate = date1;
        endDate = date;
      }else{
        endDate = date1;
        beginDate = date;
      }
      this.$emit('selectDate',beginDate,endDate);
      // this.goUrl('pages/hotel/detail/main?id='+this.hotelId+'&productCode='+this.productCode+'&endDate='+endDate+'&beginDate='+beginDate);
    },   
  },
  created() {   
    console.log('------------------------created')
    let that = this;
    //判断用户是否授权
    isauthorization("userInfo").then(res => {
      this.authorization = res;
    });
    let ndate = new Date();
    let nyear = ndate.getFullYear();
    let nmonth = ndate.getMonth() + 1;
    let nday = ndate.getDate();
    console.log(nyear,nmonth,nday)
    let ymArr = [];
    for (let i = 0; i < 3; i++) {
      let obj = {
        nyear: '',
        nmonth: ''
      };
      let oMonth = nmonth+i;      
      if(oMonth>12){
        obj.nmonth = oMonth - 12;
        obj.nyear = nyear+1;
        obj.days = new Date(obj.nyear, obj.nmonth, 0).getDate()
      }else{
        obj.nmonth = oMonth>10?oMonth:('0'+oMonth);
        obj.nyear = nyear;
        obj.days = new Date(obj.nyear, obj.nmonth, 0).getDate()
      }
      ymArr.push(obj);
    }
    let beginMonth = ymArr[0].nyear + '-' + ymArr[0].nmonth;
    let endMonth = ymArr[ymArr.length-1].nyear + '-' + ymArr[ymArr.length-1].nmonth;    
    let arr = []
    let disabled = false;
    ymArr.forEach(item=>{
      if(nyear>item.nyear||nyear==item.nyear&&nmonth>item.nmonth){
        disabled = true;
      }else{
        disabled = false;
      }
      for (let index = 1; index <= item.days; index++) {
        if(index<nday){
          disabled = true;
        }else{
          disabled = false;
        }
        let obj = {
          selected: false,
          disabled: disabled,
        };
        let day = index>9?index:('0'+index);
        obj.date = item.nyear + '/' + item.nmonth + '/' + day;
        arr.push(obj)
      }
    });
    that.settingData = arr
    console.log(arr)
    console.log(ymArr)
    that.showcData = true;
    that.updateValue();
  },
  onUnload() {
    console.log('------------------------onUnload')
    this.showcData = false;
    this.settingData = [];
    this.getFinalPriceStockArr = [];
    // this.value = [];
    this.getPriceStockArr = [];
  }
};
</script>

<style lang="scss">
.hotel-calendar-mask {
  position: fixed;
  top: 69px;
  left: 0px;
  right: 0px;
  z-index: 9999;
  overflow: auto;
  bottom: 0px;
  background-color: #f7f7f7; 
}
.hotel-calendar-wrap {
  width: 100%;
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
