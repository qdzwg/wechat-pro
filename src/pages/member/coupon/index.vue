<template>
    <div class="coupon"
         :style="[{height:'calc(100vh - '+(navContentHeight+navBarHeight+'px')+')'}]">
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
            <navbar title='宋城集团'></navbar>
            <div class="coupon-tab">
                <div class="types">
                    <span :class="showTab == 1?'on':''"
                          @click="toggleTab('showTab',1)">优惠券中心</span>
                    <span :class="showTab == 2?'on':''"
                          @click="toggleTab('showTab',2)">我的优惠券</span>
                </div>
                <swiper @change="switchTab"
                        :current="(showTab - 1)"
                        :style="{height:'calc(100vh - 50px - '+(navContentHeight+navBarHeight+'px')+')'}">
                    <swiper-item>
                        <scroll-view scroll-y>
                            <div class="coupon-wrap-ul"
                                 v-for="(item,index) in couponAll"
                                 :key="index">
                                <div class="item-coupon">
                                    <div class="inner">
                                        <div class="info">
                                            <div class="money" v-if="item.amount">
                                                <p>
                                                    <em>￥</em>
                                                    {{item.amount}}
                                                </p>
                                                <p>抵用券</p>
                                            </div>
                                            <div class="name">
                                                <p>{{item.name}}</p>
                                                <p v-if="item.validityDateType=='relative'">领取后{{item.relativeDay}}天失效</p>
                                                <p v-else>有效期至：{{item.validEndDate}}</p>
                                            </div>
                                            <a href="javascript:;"
                                               @click="getCoupon(item)">
                                                立即领取
                                            </a>
                                        </div>
                                        <div class="limit">
                                            <div v-if="item.useThreshold=='F'">无限制</div>
                                            <div v-else>满{{item.targetAmout}}元可用</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </scroll-view>
                    </swiper-item>
                    <swiper-item>
                        <scroll-view scroll-y
                                     @scrolltolower='getBottom(2)'>
                            <div class="coupon-wrap-ul"
                                 v-for="(item,index) in myCoupon"
                                 :key="index">
                                <div class="item-coupon">
                                    <div class="inner"
                                         :class="[item.on == true?'on':'']">
                                        <div class="info">
                                            <div class="money" v-if="item.amount">
                                                <p>
                                                    <em>￥</em>
                                                    {{item.amount}}
                                                </p>
                                                <p>抵用券</p>
                                            </div>
                                            <div class="name">
                                                <p>{{item.name}}</p>
                                                <p v-if="item.validityDateType=='relative'">领取后{{item.relativeDay}}天失效</p>
                                                <p v-else>有效期至：{{item.validEndDate}}</p>
                                            </div>
                                            <a v-if='item.verification'
                                               href="javascript:;"
                                               @click='useCoupon(item)'>
                                                去核销
                                            </a>
                                            <div v-else
                                                 class="coupon-hidden"
                                                 href="javascript:;"></div>
                                        </div>
                                        <div class="limit">
                                            <div v-if="item.useThreshold=='F'">无限制</div>
                                            <div v-else>满{{item.targetAmout}}元可用</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </scroll-view>
                    </swiper-item>
                </swiper>
            </div>
            <!-- 核销 -->
            <inputAlert @writeOffs="writeOffs"
                        :writeOffFlag='writeOffFlag'
                        @writeOffShow="writeOffShow"
                        ></inputAlert>
            <!-- <div v-if="verificationShow"
                 class="verification-modal"
                 @click='cancelAfterVerification'>
                <div class="verification-form">
                    <div class="verification-title">商户核销</div>
                    <div class="verification-item">
                        <div class="verification-label">核销码</div>
                        <div class="verification-value">
                            <input v-model="checkCode"
                                   type="text">
                        </div>
                    </div>
                    <div class="verification-item">
                        <div class="verification-label"></div>
                        <div class="verification-value">
                            <div class="verification-btn"
                                 @click='vaildCoupon'>确定</div>
                            <div class="verification-btn"
                                 @click='vaildCouponCancel'>取消</div>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- 核销 -->
            <definedPicker :select='merchantListShow'
                           @pickerCancel='pickerCancel'
                           props='mchName'
                           :arr='merchantList'
                           @pickerChange='merchantChange'></definedPicker>
        </div>
    </div>
</template>

<script>
    import { getData, postData, host, merchantInfoId } from "@/common/common.js";
    import navbar from "@/components/navbar";
    import definedPicker from "@/components/definedpicker";
    import inputAlert from "@/components/inputAlert";
    import moment from 'moment';
    export default {
        components: {
            definedPicker,
            navbar,
            inputAlert
        },
        data() {
            return {
                merchant: {},
                merchantList: [],
                merchantListShow: false,
                verificationShow: false,
                checkCode: '',
                coupon: {},
                myCoupon: [],
                couponAll: [],
                showTab: 1,
                pageList: [1, 1, 1, 1, 1],
                selfWriteOffInfo: {},//自核销
                selfWriteOffId: '',//自核销id
                toastErrFlag: false//  核销输入框样式
            };
        },
        onLoad() {
            this.showTab = this.$root.$mp.query.tab
            this.getAll();
        },
        onUnload() {
            this.verificationShow = false;
        },
        watch: {
            showTab(val) {
                if (val == 1) {
                    this.getAll()
                } else {
                    this.getList()
                }
            }
        },
        methods: {
            writeOffs(val){
                this.checkCode =val
                this.vaildCoupon()
            },
            writeOffShow() {
                // console.log(this.writeOffFlag)
                this.writeOffFlag = !this.writeOffFlag
            },
            merchantChange(item) {
                // console.log(item)
                this.merchant = item;
                this.pickerCancel()
                this.verificationShow = true;
                this.writeOffShow()
            },
            pickerCancel() {
                this.merchantListShow = false;
            },
            useCoupon(item) {
                let minTime = item.validStartDate
                let maxTime = item.validEndDate
                let currentTime = moment().format("YYYY-MM-DD hh:mm:ss")
                // if (moment(currentTime).diff(minTime, 'days') < 0 || moment(maxTime).diff(currentTime, 'days') < 0) {
                if (moment(currentTime).diff(minTime, 'seconds') < 0 || moment(maxTime).diff(currentTime, 'seconds') < 0) {
                    wx.showToast({
                        title: '未到核销时间不能核销',
                        icon: "none",
                        duration: 2000
                    });
                    return
                }
                this.coupon = item;
                this.merchantListSelect()
            },
            merchantListSelect() {
                getData('/marketing/api/marketingCoupon/selectMerchantsbyCouponCode', {
                    couponCode: this.coupon.code,
                }).then(res => {
                    if (res.status == 200) {
                        this.merchantList = res.data;
                        
                    }
                })
                this.merchantListShow = true;
               
            },
            vaildCouponCancel() {
                this.verificationShow = false;
                this.checkCode = '';
            },
            vaildCoupon() {
                getData(this.api.main.marketing.verification, {
                    checkCode: this.checkCode,
                    couponDetailCode: this.coupon.code,
                    mchId: this.merchant.mchId,
                }).then(res => {
                    this.verificationShow = false;
                    if (res.status == 200) {
                        this.writeOffShow();
                        wx.showToast({
                            title: "核销成功",
                            icon: "none",
                            duration: 2000
                        });
                        let timea = setTimeout(()=>{
                            this.getList();
                            clearTimeout(timea)
                        },1000)
                    }
                })
            },
            getCoupon(item) {
                getData(this.api.main.marketing.getCoupon, {
                    merchantInfoId: merchantInfoId,
                    couponCode: item.code,
                    userId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
                }).then(res => {
                    if (res.status == 200) {
                        wx.showToast({
                            title: "领取成功",
                            icon: "none",
                            duration: 2000
                        });
                        // this.getAll();
                    }
                })
            },
            getAll() {
                getData(this.api.main.marketing.searchCoupon, {
                    merchantInfoId: merchantInfoId,
                    distributionPath: 4, // 4：个人中心
                    currPage: 1,
                    pageSize: 1000
                }).then(res => {
                    if (res.status == 200) {
                        this.couponAll = res.data.rows;
                        // this.couponAll.map(item => {
                        //     item.validEndDate = item.validEndDate.substring(0, 10)
                        // })
                    }
                })
            },
            getList() {
                getData(this.api.main.marketing.myCoupons, {
                    couponCode: "",
                    status: 1,
                    userId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
                    currPage: 1,
                    pageSize: 1000
                }).then(res => {
                    if (res.status == 200) {
                        res.data.rows.map(item => {
                            item.verification = false;
                            if (item.usableRange) {
                                item.verification = item.usableRange.indexOf('1') > -1;

                            }
                        })
                        this.myCoupon = res.data.rows;
                        // let _this = this;
                        // this.myCoupon.map((item, index) => {
                        //     _this.myCoupon[index].validEndDate = item.validEndDate.substring(0, 10)
                        // })
                    }
                })
            },
            getBottom(index) {
                //触底，页面已经请求过，并且有数据才能触底，直接判断当前页码和this.pageLimt[index]的大小比对
                this.pageList[index]++;
            },
            toggleTab(tag, i) {
                console.log('aaaaaaaaaaaaaa', i)
                this[tag] = i;
            },
            switchTab(e) {
                console.log(e.target.current)
                this.showTab = e.target.current + 1
            },
            toggleHeart(item) {
                item.on = !item.on
                // e.currentTarget.dataset.heart = !e.currentTarget.dataset.heart
            },
        }
    }

</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .coupon {
        background: #f0f2f7;
        .coupon-tab {
            .types {
                display: block;
                height: 45px;
                line-height: 45px;
                background: #fff;
                color: #333333;
                span {
                    position: relative;
                    font-family: PingFang SC Medium;
                    font-size: 14px;
                    display: inline-block;
                    width: 50%;
                    text-align: center;
                    &.on {
                        font-family: PingFang SC bold;
                        color: #ef0017;
                        &::after {
                            position: absolute;
                            display: inline-block;
                            width: 24px;
                            background: #ef0017;
                            height: 4px;
                            content: "";
                            bottom: 0;
                            left: calc(50% - 12px);
                            display: inline-block;
                        }
                    }
                }
            }
            .coupon-wrap-ul {
                .item-coupon {
                    position: relative;
                    margin-top: 10px;
                    margin-left: 2.5px;
                    margin-right: 2.5px;
                    &::before {
                        content: "";
                        position: absolute;
                        left: 2.5px;
                        bottom: 25px;
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        background: #eceef3;
                        overflow: hidden;
                    }
                    &::after {
                        content: "";
                        position: absolute;
                        right: 2.5px;
                        bottom: 25px;
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        background: #eceef3;
                        overflow: hidden;
                    }
                    .inner {
                        display: block;
                        width: calc(100vw - 25px);
                        margin: 0 auto;
                        border-radius: 5px;
                        overflow: hidden;
                        .info {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding-left: 26px;
                            padding-right: 10px;
                            height: 93px;
                            background: #fff;
                            .money {
                                color: #ef0017;
                                font-size: 25px;
                                font-family: PingFang SC Heavy;
                                text-align: center;
                                p {
                                    display: block;
                                    em {
                                        display: inline-block;
                                        font-family: PingFang SC Bold;
                                        font-size: 12px;
                                    }
                                    &:last-of-type {
                                        font-family: PingFang SC Regular;
                                        font-size: 12px;
                                    }
                                }
                            }
                            .name {
                                font-family: PingFang SC Medium;
                                font-size: 17px;
                                color: #333;
                                width: 49%;
                                p {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    &:last-of-type {
                                        margin-top: 13px;
                                        font-size: 10px;
                                        color: #999999;
                                    }
                                }
                            }
                            a {
                                display: inline-block;
                                width: 77.5px;
                                height: 35px;
                                overflow: hidden;
                                line-height: 35px;
                                text-align: center;
                                border-radius: 17.5px;
                                font-size: 14px;
                                font-family: PingFang SC Medium;
                                color: #fff;
                                background: linear-gradient(
                                    to right,
                                    #ef031b,
                                    #f7406a
                                );
                            }
                            .coupon-hidden {
                                background-color: #fff;
                                display: inline-block;
                                width: 77.5px;
                                height: 35px;
                            }
                        }
                        .limit {
                            padding-left: 15px;
                            height: 32px;
                            line-height: 32px;
                            text-align: left;
                            font-size: 12px;
                            color: #999999;
                            font-family: PingFang SC Regular;
                            background: #f5f5f5;
                        }
                        &.on {
                            .info {
                                background: #fff;
                                .money {
                                    color: #ccc;
                                }
                                .name {
                                    color: #ccc;
                                    p {
                                        &:last-of-type {
                                            color: #cccccc;
                                        }
                                    }
                                }
                                a {
                                    color: #fff;
                                    background: #cecdce;
                                }
                            }
                        }
                    }
                }
            }
            swiper {
                swiper-item {
                    height: 100%;
                    overflow: hidden;
                    overflow-y: scroll;
                }
            }
        }
    }
    .verification-modal {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: rgba(0, 0, 0, 0.35);
        .verification-form {
            background-color: #fff;
            position: absolute;
            padding: 10px;
            top: 50%;
            left: 10px;
            right: 10px;
            .verification-title {
                line-height: 28px;
                font-size: 20px;
                font-weight: bold;
            }
            .verification-item {
                display: flex;
                align-items: center;
                line-height: 40px;
                font-size: 14px;
                .verification-label {
                    width: 60px;
                    text-align: left;
                }
                .verification-value {
                    flex-grow: 1;
                    input {
                        width: 100%;
                        border: 0.5px solid #ccc;
                    }
                    .verification-btn {
                        display: inline-block;
                        width: 40px;
                        line-height: 30px;
                        margin-right: 20px;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
