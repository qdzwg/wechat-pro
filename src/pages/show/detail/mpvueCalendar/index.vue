<template>
    <div class="detail-warp showBg"
         v-if="calendarShow">
        <div class="nav-bar">
            <div :style="{'margin-top':navBarHeight+'px'}"
                 class="nav-bar-content">
                <div @click="toggleFlag"
                     :style="{'line-height':navContentHeight+'px','height':navContentHeight+'px'}"
                     class='nav-bar-arrow'>
                    <i class="xx-icon  icon-back nav-bar-icon">
                    </i>
                </div>
                <div :style="{'line-height':navContentHeight+'px','height':navContentHeight+'px'}"
                     class="nav-bar-text">{{"演出价格日历"}}</div>
            </div>
        </div>
        <div class
             :style="{'margin-top': (navContentHeight+navBarHeight+'px')}">
            <div class="calendar-wrapper">
                <div class="calendar">
                    <Calendar v-if='showcData'
                              :clean="clean"
                              :lunar="lunar"
                              ref="calendar"
                              :range="isrange"
                              :multi="ismulti"
                              :almanacs="almanacs"
                              @select="select"
                              @next="next"
                              @prev="prev"
                              @gotoOrder=gotoOrder
                              :value="value"
                              :disabled="disabledArray"
                              :weekSwitch="weekSwitch"
                              :events="events"
                              :settingData="settingData" />
                </div>
            </div>
            <!-- <div class="px-ul" v-if="getFinalPriceStockArr.length>0&&showcData">
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
          <div class="bottom-price-number">99.00</div>
          <div class="bottom-price-detail">明细</div>
        </div>
        <div class="right-warper"
            @click="subForm">
          提交订单
        </div>
      </div> -->
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
    import Calendar from '@/components/mpvue-calendar/mpvue-newcalendar'
    import '@/components/mpvue-calendar/browser-style.css'
    import '@/components/mpvue-calendar/style.css';
    import { holiday } from '@/components/mpvue-calendar/holiday'
    import moment from 'moment';
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    export default {
        components: {
            Calendar,
            navbar
        },
        props: {
            calendarShow: {
                type: Boolean,
                default: false
            },
            currDate: {
                type: String,
            }
        },
        watch: {
            currDate: {
                handler(val) {
                    let that = this
                    if (val) {
                        that.value[0] = Number(val.split('-')[0]);
                        that.value[1] = Number(val.split('-')[1]);
                        that.value[2] = Number(val.split('-')[2]);
                    } else {
                        that.value[0] = new Date().getFullYear();
                        that.value[1] = new Date().getMonth() + 1;
                        that.value[2] = new Date().getDate()
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            },
        },
        data() {
            return {
                wayType: 1,
                settingData: [],
                value: [],//默认选中日期
                isrange: false,//是否区间选择  适用于酒店
                weekSwitch: false,//只显示一周
                ismulti: false,//是否是多选
                dataInfo: {},
                monFirst: true,
                clean: true, //简洁模式
                lunar: true, //显示农历
                // events: {'2019-12-21':'今日备注', '2019-12-22':'一条很长的明日备注'},
                events: {},
                // tileContent: holiday,
                renderValues: [],
                disabledArray: [],//不能被选择的日期数组 '2019-12-23'
                almanacs: {},
                showcData: true,
                getPriceStockArr: [],
                getFinalPriceStockArr: [],
                number: 0,
                totalPrice: null,
                canOrder: false,
                routeCode: '',
                routeId: '',
                playDate: '',
                authorization: false
            };
        },
        methods: {
            toggleFlag(){
                this.$emit('toggleFlag')
            },
            // subForm() {
            //   this.goUrl("pages/order/main");
            // },
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
            gotoOrder() {
                wx.setStorageSync("showType", this.getFinalPriceStockArr);
                wx.setStorageSync("showeDate", this.playDate);
                wx.setStorageSync("xjsc_showPlayDate", this.playDate);
                this.$emit('calendarToggle', this.playDate)
                // this.goUrl("pages/show/detail/main?id="+wx.getStorageSync('xjsc_merchantParkId'));
            },
            select(val, val2) {
                //获取选定日期的价格库存        
                let selectDate = val2.date.split('-');
                let selectYear = selectDate[0];
                let selectMonth = selectDate[1] < 10 ? '0' + selectDate[1] : selectDate[1];
                let selectDay = selectDate[2] < 10 ? '0' + selectDate[2] : selectDate[2];
                let getFinalDate = selectYear + '-' + selectMonth + '-' + selectDay;
                let that = this;
                let getPriceStockArr = that.getPriceStockArr;
                let getFinalPriceStockArr = [];
                for (let m = 0; m < getPriceStockArr.length; m++) {
                    for (let n = 0; n < getPriceStockArr[m].clCalendarDayVos.length; n++) {
                        let obj = {
                            modelCode: getPriceStockArr[m].modelCode,
                            ticketName: getPriceStockArr[m].ticketName,
                            ticketType: getPriceStockArr[m].ticketType,
                            num: 0
                        }
                        if (getPriceStockArr[m].clCalendarDayVos[n].date == getFinalDate) {
                            let finalObj = Object.assign(getPriceStockArr[m].clCalendarDayVos[n], obj);
                            getFinalPriceStockArr.push(finalObj);
                        }
                    }
                }
                that.getFinalPriceStockArr = getFinalPriceStockArr;
                that.getTotalNum();
                this.playDate = val2.date;
                //选中日期 之后修改默认选中的日期
                this.value = [Number(selectYear), Number(selectMonth), Number(selectDay)];
                // console.log("看下value",this.value)
                this.gotoOrder()
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
                let num = this.getFinalPriceStockArr[index].num + 1;
                this.$set(this.getFinalPriceStockArr, index, Object.assign({}, this.getFinalPriceStockArr[index], { num: num }));
                this.canOrder = true;
                // console.log('933', this.getFinalPriceStockArr);
            },
            getTotalNum() {
                let sum = 0;
                this.getFinalPriceStockArr.forEach((item, index) => {
                    sum += item.num;
                });
                if (sum > 0) {
                    this.canOrder = true;
                } else {
                    this.canOrder = false;
                }
            },
        },
        onShow() {
            let that = this;
            console.log("aaaaaaaaaaaa", moment().format("YYYY,MM,DD").split(','))
            that.value[0] = new Date().getFullYear();
            that.value[1] = new Date().getMonth() + 1;
            that.value[2] = new Date().getDate()
            //判断用户是否授权
            isauthorization("userInfo").then(res => {
                this.authorization = res;
            });
            let id = that.$root.$mp.query.id;
            that.routeId = that.$root.$mp.query.id;
            that.routeCode = that.$root.$mp.query.routeCode;
            let ndate = new Date();
            let nyear = ndate.getFullYear();
            let nmonth = ndate.getMonth() + 1;
            let ymArr = [];
            for (let i = 0; i < 4; i++) {
                let obj = {
                    nyear: '',
                    nmonth: ''
                };
                let oMonth = nmonth + i;
                if (oMonth > 12) {
                    obj.nmonth = oMonth - 12;
                    obj.nyear = nyear + 1;
                } else {
                    obj.nmonth = oMonth;
                    obj.nyear = nyear;
                }
                ymArr.push(obj);
            }
            let beginMonth = ymArr[0].nyear + '-' + ymArr[0].nmonth;
            let endMonth = ymArr[ymArr.length - 1].nyear + '-' + ymArr[ymArr.length - 1].nmonth;
            let listCalendarPriceMapUrl = api.route.detail.listCalendarPriceMap;
            // getData(listCalendarPriceMapUrl, {
            //   merchantInfoId: merchantInfoId,
            //   id: id,
            //   beginMonth: beginMonth,
            //   endMonth: endMonth
            // }).then(res => {
            //   // that.settingData = res.data[0].clCalendarDayVos; 
            //   let arr = []
            //   for(let i=0;i<res.data[0].clCalendarDayVos.length;i++){
            //     let obj = {}
            //     let priceFlag = true
            //     let flag = false;
            //     let price
            //     let pxArr = []
            //     for(let j=0;j<res.data.length;j++){
            //        if(res.data[j].clCalendarDayVos[i].salePrice){
            //         if(priceFlag){
            //           price = res.data[j].clCalendarDayVos[i].salePrice
            //           priceFlag = false
            //         }
            //          flag = true;           
            //        }
            //         pxArr.push(res.data[j].clCalendarDayVos[i]) 
            //     }
            //     obj.selcted = flag
            //     obj.pxArr = pxArr
            //     obj.salePrice = price?price:""
            //     obj.date = res.data[0].clCalendarDayVos[i].date
            //     arr.push(obj)
            //   }  
            //    that.settingData = arr

            //   console.log(arr)
            //   that.getPriceStockArr = res.data;      
            //   that.showcData = true;      
            //   //选定价格日历中第一个日期或者传入的日期
            //   let myDate = new Date();
            //   let lFullYear = myDate.getFullYear();
            //   let lFullMonth = (myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1);
            //   let lFullDay = myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate();
            //   let curDate = lFullYear + '-' + lFullMonth + '-' + lFullDay;

            //   if(that.$root.$mp.query.day){ //传入日期
            //     let dateArr = that.$root.$mp.query.day.split('-');
            //     let dataYear = dateArr[0], dataMonth = dateArr[1].replace(/\b(0+)/gi,""), dateDay = dateArr[2].replace(/\b(0+)/gi,"");
            //     that.value = [Number(dataYear), Number(dataMonth), Number(dateDay)];
            //   }else{  //第一个日期
            //     for(let i =0; i < that.settingData.length; i++){
            //       if(that.settingData[i].price){          
            //         if(new Date(curDate).getTime() == new Date(that.settingData[i].date).getTime()){
            //           let firstValue = that.settingData[i].date.split('-');
            //           let firstYear = firstValue[0], firstMonth = firstValue[1].replace(/\b(0+)/gi,""), firstDay = firstValue[2].replace(/\b(0+)/gi,"");
            //           that.value = [Number(firstYear), Number(firstMonth), Number(firstDay)]; 
            //           break;
            //         }else{
            //           let firstValue = that.settingData[0].date.split('-');
            //           let firstYear = firstValue[0], firstMonth = firstValue[1].replace(/\b(0+)/gi,""), firstDay = firstValue[2].replace(/\b(0+)/gi,"");
            //           that.value = [Number(firstYear), Number(firstMonth), Number(firstDay)];          
            //         }
            //       }        
            //     }
            //   }

            //   //获取选定日期的价格库存展示票型      
            //   let selectDate = that.value;      
            //   let selectYear = selectDate[0];
            //   let selectMonth = selectDate[1] < 10 ? '0' + selectDate[1] : selectDate[1];
            //   let selectDay = selectDate[2] < 10 ? '0' + selectDate[2] : selectDate[2];
            //   let getFinalDate = selectYear + '-' +　selectMonth + '-' + selectDay;      
            //   let getPriceStockArr = res.data;      
            //   let getFinalPriceStockArr = [];
            //     for(let m = 0; m < getPriceStockArr.length; m++){
            //       for(let n = 0; n < getPriceStockArr[m].clCalendarDayVos.length; n++){
            //         let obj = {
            //           modelCode: getPriceStockArr[m].modelCode,
            //           ticketName: getPriceStockArr[m].ticketName,
            //           ticketType: getPriceStockArr[m].ticketType,
            //           num: 0
            //         }
            //         if(getPriceStockArr[m].clCalendarDayVos[n].date == getFinalDate){              
            //           let finalObj = Object.assign(getPriceStockArr[m].clCalendarDayVos[n], obj)
            //           getFinalPriceStockArr.push(finalObj);
            //         }
            //       }
            //     }
            //     that.getFinalPriceStockArr = getFinalPriceStockArr; 
            //     that.getTotalNum(); 
            //     that.playDate = that.value[0] + '-' + that.value[1] + '-' + that.value[2];
            //     // console.log('65565656565655566' ,that.playDate);
            //   // this.handelRenderValues();
            // })
        },
        onHide() {

        },
        onUnload() {
            this.showcData = true;
            this.settingData = [];
            this.getFinalPriceStockArr = [];
            this.value = [];
            this.getPriceStockArr = [];
        }
    };
</script>

<style lang="scss" s>
    .detail-warp {
        width: 100%;
        background-color: #f7f7f7;
        &.showBg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: #f7f7f7;
            z-index: 100;
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
                    .price-xuxian {
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
        .order-btn {
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
            opacity: 0.5;
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
                width: 88px;
                color: #fff;
                background: -webkit-linear-gradient(
                    left,
                    #f01127,
                    #f74068
                ); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(
                    right,
                    #f01127,
                    #f74068
                ); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(right, #f01127, #f74068);
                /* Firefox 3.6 - 15 */
                background: linear-gradient(to right, #f01127, #f74068);
                /* 标准的语法 */
            }
        }
    }
</style>
