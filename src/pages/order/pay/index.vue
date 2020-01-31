<template>
    <div class="info-order"
         :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
        <navbar title='填写订单信息'></navbar>
        <div class="info-order-detail">
            <div class="info-order-title">{{orderInfo}}</div>
            <div class="info-order-money">
                <span class="info-order-unit">￥</span>
                <span class="info-order-number">{{totalprice}}</span>
            </div>
            <div class="info-order-message">
                请在
                <span>30</span>
                分钟内完成付款，否则该订单将取消
            </div>
        </div>
        <div class="pay-way-list">
            <div class="pay-way-item"
                 v-for="(item, index) in payWay"
                 :key="index">
                <div class="pay-way-info">
                    <img :src="item.icon"
                         alt="">
                    <span>{{item.name}}</span>
                </div>
                <div class="pay-way-select">
                    <img src="https://cdn.51dmq.com/ui/order/checked.png"
                         v-show="item.selected"
                         alt="">
                </div>
            </div>
        </div>
        <div class="pay-btn-wrap">
            <div class="pay-btn"
                 @click="openPayModal">去支付</div>
        </div>
        <!--支付弹框-->
        <div class="toast-box">
            <div v-if='payShow'
                 @click='closePayModal'
                 class="mask"></div>
            <div :animation="payAnimationData"
                 class="modal pay-modal">
                <div class="modal-content pay-sure">
                    <div class="pay-money bg-w  m-b-10 boxshadow">
                        <span class="title">支付金额:</span>
                        <span>￥{{totalprice}}</span>
                    </div>
                    <div class="pay-way bg-w boxshadow">
                        <div class="pay-info">
                            <img src="https://cdn.51dmq.com/ui/order/wechat.png"
                                 alt="">
                            <span class="pay-name fr">微信支付</span>
                        </div>
                        <radio class="payway-radio"
                               :checked="true" />
                    </div>
                    <div class="pay-btn"
                         @click="wxpay">去支付</div>
                </div>
            </div>
        </div>
        <!--支付弹框-->
    </div>
</template>

<script>
    // Use Vuex
    import api from "@/api/api";
    import { getData, postData, merchantInfoId, host } from "@/common/common";
    import navbar from "@/components/navbar";
    // import upng from "@/common/upng-js/UPNG.js";
    import sha1 from "sha1";
    export default {
        components: {
            navbar
        },
        data() {
            return {
                payWay: [
                    {
                        icon: 'https://cdn.51dmq.com/ui/order/wechat.png',
                        name: '微信',
                        selected: true,
                    }
                ],
                payInfo: {},
                subFormShow: true,
                couponName: "", //优惠券名称
                couponUserType: "", //优惠券  优惠活动
                couponUserNum: "", //优惠券使用门槛
                animation: null,
                animationData: {},
                show: false,
                ticketType: [],
                sumnum: 0,
                totalprice: 0,
                buyerName: "",
                buyerMobile: "",
                buyerIdNo: "",
                src: "",
                flag: true,
                payShow: false,
                payAnimation: null,
                payAnimationData: {},
                orderNo: null, //订单号
                orderInfo: "",
                beginDate: "",
                endDate: "",
                imgWidth: null,
                imgHeight: null,
                contactList: [],
                couponList: [],
                couponShow: false,
                couponAnimation: null,
                couponAnimationData: {},
                couponCode: "", //优惠券code
                orderId: "",
                flagModal: true, //点击其他地方，支付弹框不要消失
                canScroll: false, //是否允许页面滑动
                orderDetail: {},//演出订单信息
                commonOrderSum:0//支付订单金额
            };
        },
        computed: {},
        methods: {
            openModal() {
                this.canScroll = true;
                this.show = true;
                this.animation.bottom("0rpx").step();
                this.animationData = this.animation.export();
            },
            closeModal() {
                this.canScroll = false;
                this.show = false;
                this.animation.bottom("-944rpx").step();
                this.animationData = this.animation.export();
            },
            goUrl(path) {
                this.navigatePageTo(this.router + path);
            },
            getPrice(obj) {
                this.totalprice = 0;
                this.sumnum = 0;
                if (obj == 0) {
                    this.ticketType.forEach((item, index) => {
                        this.totalprice += item.singleSum * item.num;
                        this.sumnum += item.num;
                    });
                    this.totalprice = this.totalprice.toFixed(2);
                    return this.totalprice;
                } else {
                    switch (obj.applyType) {
                        case "all":
                        case "type":
                            let duseCprice = 0;
                            this.ticketType.forEach((item, index) => {
                                duseCprice += item.num * item.singleSum;
                                this.sumnum += item.num;
                            });
                            this.totalprice =
                                duseCprice > obj.amount ? duseCprice - obj.amount : 0;
                            this.totalprice = this.totalprice.toFixed(2);
                            return this.totalprice;
                            break;
                        case "used":
                            let dusetotalprice = 0,
                                ucoupontotalp = 0,
                                duseCouponprice;
                            for (let i = 0; i < this.ticketType.length; i++) {
                                dusetotalprice +=
                                    this.ticketType[i].singleSum * this.ticketType[i].num;
                                for (let j = 0; j < obj.productInfos.length; j++) {
                                    if (
                                        this.ticketType[i].modelCode ==
                                        obj.productInfos[j].productCode
                                    ) {
                                        ucoupontotalp +=
                                            this.ticketType[i].singleSum * this.ticketType[i].num;
                                    }
                                }
                            }
                            duseCouponprice = dusetotalprice - ucoupontotalp;
                            ucoupontotalp =
                                ucoupontotalp > obj.amount ? ucoupontotalp - obj.amount : 0;
                            this.totalprice = ucoupontotalp + duseCouponprice;
                            this.totalprice = this.totalprice.toFixed(2);
                            break;
                    }
                }
            },
            //支付
            wxpay() {
                //微信支付
                let _this = this;
                this.flagModal = false;
                let extendParamJson = JSON.stringify({
                    orderInfo: this.orderInfo,
                    openId: wx.getStorageSync("WxXjscUserInfo").openId
                });
                getData(this.api.main.pay.goPay, {
                    accountId: merchantInfoId,
                    extendParamJson: extendParamJson,
                    operateId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
                    payOrderNo: this.orderNo,
                    paySum: this.totalprice,
                    // paySum: this.commonOrderSum,
                    payType: this.payType,
                    userType: "C",
                    wayType: 6
                }).then(res => {
                    console.log("演出响应", res)
                    if (res.payLink == false) {
                        wx.navigateTo({
                            url:
                                "/pages/paymentSuccess/main?orderId=" +
                                _this.orderNo +
                                "&from=pay"
                        });
                        return;
                    }
                    let payData = JSON.parse(res.data);

                    wx.requestPayment({
                        timeStamp: payData.timestamp,
                        nonceStr: payData.noncestr,
                        package: payData.packagestr,
                        signType: payData.signtype,
                        paySign: payData.paysign,
                        success: function (res) {
                            wx.navigateTo({
                                url:
                                    "/pages/paymentSuccess/main?orderId=" +
                                    _this.orderNo +
                                    "&from=pay"
                            });
                        },
                        fail: function (res) { }
                    });
                }).catch(err => {
                    console.log("演出error", err)
                });
            },
            initData() { //获取订单信息
                console.log("----------------------获取退款详情")
                getData(this.api.order.detail, {
                    merchantInfoId: merchantInfoId,
                    payOrderNo: this.$root.$mp.query.orderNo,
                    wayType: 1
                }).then(res => {
                    //获取订单详情
                    // console.log("获取订单详情", res);
                    this.commonOrderSum = res.data.paySum

                });
            },
            //支付弹框
            openPayModal() {
                this.canScroll = true;
                this.payShow = true;
                this.payAnimation.bottom("0rpx").step();
                this.payAnimationData = this.payAnimation.export();
            },
            closePayModal() {
                this.canScroll = false;
                if (this.flagModal == false) {
                    this.payShow = false;
                    this.payAnimation.bottom("-944rpx").step();
                    this.payAnimationData = this.payAnimation.export();
                }
            },

            //优惠券弹框
            openCouponModal() {
                this.couponShow = true;
                this.handlecToggle(0);
            },
            closeCouponModal() {
                this.couponShow = false;
                this.handlecToggle(-375);
            },
            handlecToggle(num) {
                this.couponAnimation.right(num * 2 + "rpx").step();
                this.couponAnimationData = this.couponAnimation.export();
            },

            //表单验证
            checkMobile(val) {
                if (!/^1[345789]\d{9}$/.test(val)) {
                    return true;
                }
            },
            checkIdcard(val) {
                if (
                    !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
                        val
                    )
                ) {
                    return true;
                }
            },
            subForm() {
                let result = this.$root.$mp.query;
                this.orderNo = result.payOrderNo;
                this.orderInfo = result.orderDescription;
                this.orderId = result.id;
                getData("/merchant/api/merchantPayType/getMerchantPayType", {
                    businessType: "WXXCX"
                }).then(res => {
                    this.payType = JSON.parse(res.message)[0];
                    this.openPayModal(); //打开支付确认
                });
            },
        },
        onLoad() {
            //弹框动画
            this.animation = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
            this.payAnimation = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
            this.payType = this.$root.$mp.query.payType;
            this.totalprice = this.$root.$mp.query.totalPrice;
            this.orderId = this.$root.$mp.query.orderId;
            this.orderInfo = this.$root.$mp.query.orderInfo;
            this.orderNo = this.$root.$mp.query.orderNo
            this.initData()

            // let orderInfos = wx.getStorageSync("xjsc_orderInfo");
            // if(orderInfos){
            //   this.orderNo = orderInfos.orderNo;
            //   this.orderInfo = orderInfos.orderInfo;
            //   this.orderId = orderInfos.orderId;
            //   this.payType = orderInfos.payType;
            //   this.totalprice = orderInfos.totalprice;
            // }
            wx.showShareMenu({
                withShareTicket: true
            })
        },
        onUnload() {
            this.flagModal = false;
            // this.closePayModal();
            this.closeModal();
            this.couponCode = "";
            // this.getPrice();
            this.couponUserType = "";
            this.couponName = "";
            this.couponUserNum = "";
            // this.closeCouponModal();
            if (wx.getStorageSync("xjsc_2018_linkMan")) {
                wx.removeStorageSync("xjsc_2018_linkMan");
            }
        },
        onShow() {
            this.flagShow = false;
            if (wx.getStorageSync("xjsc_2018_linkMan")) {
                let linkmanObj = wx.getStorageSync("xjsc_2018_linkMan");
                this.buyerName = linkmanObj.name;
                this.buyerMobile = linkmanObj.phone;
                this.buyerIdNo = linkmanObj.certNo;
            }
            this.closeModal();
            this.closePayModal();
        }
    };
</script>

<style lang="scss">
    .info-order {
        text-align: center;
        .info-order-detail {
            padding: 30px 15px 0px;
            .info-order-title {
                font-size: 17px;
                color: #333;
            }
            .info-order-money {
                color: #ef0018;
                margin: 24px 0px;
                font-size: 32px;
                line-height: 32px;
                .info-order-number {
                    font-weight: bold;
                }
                .info-order-unit {
                    font-size: 16px;
                }
            }
            .info-order-message {
                color: #999;
                font-size: 12px;
                padding-bottom: 34px;
                border-bottom: 1px dashed #999;
                span {
                    color: #ef0018;
                }
            }
        }
        .pay-way-list {
            margin-bottom: 15px;
            // padding-top: 50px;
            padding-left: 10px;
            .pay-way-item {
                padding-left: 12px;
                padding-right: 15px;
                line-height: 75px;
                align-items: center;
                border-bottom: 1px solid #f0f2f7;
                height: 75px;
                display: flex;
                justify-content: space-between;
                .pay-way-info {
                    color: #333;
                    white-space: nowrap;
                    font-size: 14px;
                    img {
                        width: 35px;
                        height: 35px;
                        margin-right: 8px;
                    }
                }
                .pay-way-select {
                    border-radius: 50%;
                    text-align: center;
                    line-height: 0px;
                    height: 23px;
                    border: 1px solid #ececec;
                    width: 23px;
                    img {
                        margin-top: 6px;
                        height: 12px;
                        width: 16px;
                    }
                }
            }
        }
        .pay-btn-wrap {
            padding: 0px 10px;
            line-height: 50px;
            .pay-btn {
                width: 100%;
                border-radius: 50px;
                background-color: #ef0018;
                color: #fff;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
            }
        }
        .toast-box {
            .fixed-bottom {
                position: absolute;
                left: 0;
                bottom: 0;
                text-align: center;
                width: 100%;
                background: #f05b47;
                color: #fff;
                font-size: 16px;
                height: 49px;
                line-height: 49px;
                font-family: PingFangSC-Regular, sans-serif;
            }
            .modal {
                position: fixed;
                left: 0;
                bottom: -100%;
                width: 100%;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                background: #fff;
                height: 400px;
                // padding-top: 20px;
                z-index: 710;
                .modal-head {
                    // padding: 0 15px 15px 15px;
                    .close {
                        font-size: 16.5px;
                        color: #b2b2b2;
                        padding: 15px;
                        font-size: 23px;
                    }
                }
                .modal-content {
                    // height: 345px;
                    overflow-y: scroll;
                    .contacter-ul {
                        padding-left: 15px;
                        padding-right: 20px;
                        .contacter-li {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 16px;
                            .c-li-left {
                                width: 260px;
                                .contacter-label {
                                    width: 17px;
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                                .contacter-name {
                                    font-size: 14px;
                                    color: #413838;
                                }
                                .contacter-tel {
                                    height: 20px;
                                    line-height: 20px;
                                    .tel-icon {
                                        width: 7.5px;
                                        height: 11px;
                                        display: block;
                                    }
                                    .tel-text {
                                        font-size: 12px;
                                        color: rgba(65, 56, 56, 0.7);
                                        display: inline-block;
                                        vertical-align: middle;
                                    }
                                }
                                .contacter-idcard {
                                    height: 20px;
                                    line-height: 20px;
                                    .idcard-icon {
                                        width: 10.5px;
                                        height: 8.5px;
                                        display: block;
                                    }
                                    .idcard-text {
                                        font-size: 12px;
                                        color: rgba(65, 56, 56, 0.7);
                                        display: inline-block;
                                        vertical-align: middle;
                                    }
                                }
                            }
                            .c-li-right {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .edit-icon {
                                    // float:right;
                                    width: 19px;
                                    height: 19.5px;
                                }
                                .del-icon {
                                    width: 16.5px;
                                    height: 18.5px;
                                    margin-left: 20px;
                                }
                            }
                            .add-information {
                                color: #f05b47;
                                font-size: 11px;
                            }
                        }
                    }
                }
            }
            .pay-modal {
                background: #f7f7f7;
                height: 167.5px;
                .pay-sure {
                    background: transparent;
                    .pay-money {
                        height: 55px;
                        line-height: 55px;
                        text-align: center;
                        font-size: 16px;
                        font-family: PingFangSC-Regular, sans-serif;

                        color: #fc4150;
                        .title {
                            color: #020403;
                            margin-right: 10px;
                        }
                    }
                    .pay-way {
                        padding: 0 15px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 55px;
                        .pay-info {
                            height: 55px;
                            line-height: 55px;
                            .pay-svg {
                                color: #1aad19;
                                font-size: 30px;
                                margin-right: 10px;
                            }
                            img {
                                width: 30px;
                                height: 30px;
                                margin-right: 10px;
                            }
                            .pay-name {
                                font-size: 14px;
                                font-family: PingFangSC-Regular, sans-serif;
                                color: #020403;
                            }
                        }
                        .payway-radio {
                            color: #1aad19;
                            transform: scale(0.7);
                        }
                    }
                    .pay-btn {
                        height: 49px;
                        line-height: 49px;
                        background: #1aad19;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
            .camera-modal {
                background: #fff;
                height: 169px;
                border-top-left-radius: 2px;
                border-top-right-radius: 2px;
                padding-top: 0;
                .camera-content {
                    background-color: #fff;
                    .camera-do-ul {
                        background-color: #fff;
                        .camera-do-li {
                            height: 55px;
                            line-height: 55px;
                            text-align: center;
                            color: #020403;
                            font-size: 16px;
                            background-color: #fff;
                        }
                        .h10 {
                            height: 10px;
                            box-shadow: 0 10px 5px 0 rgba(242, 242, 242, 0.95);
                        }
                        .bb05 {
                            border-bottom: 0.5px solid #d1d1d1;
                            box-sizing: border-box;
                        }
                        .h49 {
                            height: 49px;
                            line-height: 49px;
                        }
                    }
                }
            }
            .coupon-modal {
                position: fixed;
                top: 0;
                right: -100%;
                width: 100%;
                height: 100%;
                background: #fff;
                z-index: 710;
                overflow-y: scroll;
                .modal-content {
                    .couponBody {
                        position: absolute;
                        // top: 69px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #f7f7f7;
                        .coupons_list {
                            padding-top: 12px;
                            .item-ul {
                                padding: 0 8px;
                                .item-li {
                                    margin-bottom: 20px;
                                    height: 144px;
                                    background: url("http://statics.lotsmall.cn/wx/img/coupons-bg.png")
                                        center center no-repeat;
                                    background-size: 100%;
                                    position: relative;
                                    .left {
                                        display: inline-block;
                                        width: 273px;
                                        .name {
                                            margin-top: 7px;
                                            color: #fff;
                                            font-size: 14px;
                                            font-family: PingFangSC-Regular,
                                                sans-serif;
                                            padding-left: 14px;
                                        }
                                        .price {
                                            padding-left: 40px;
                                            color: #fff;
                                            margin-top: 6px;
                                            margin-bottom: 9px;
                                            font-family: PingFangSC-Regular,
                                                sans-serif;
                                            .unit {
                                                font-size: 18px;
                                            }
                                            .num {
                                                font-size: 35px;
                                            }
                                        }
                                    }
                                    .date-use {
                                        position: absolute;
                                        left: 15px;
                                        bottom: 5px;
                                        font-size: 9px;
                                        color: #fff;
                                        font-family: PingFangSC-Semibold, sans-serif;
                                        .date {
                                            margin-bottom: 2.5px;
                                        }
                                        .use {
                                            margin-bottom: 5px;
                                        }
                                    }
                                    .right {
                                        height: 103px;
                                        display: inline-block;
                                        width: calc(100% - 273px);
                                        text-align: center;
                                        position: relative;
                                        .right-btn {
                                            border: none;
                                            width: 66px;
                                            height: 25px;
                                            line-height: 25px;
                                            border-radius: 2px;
                                            background: #fff;
                                            font-size: 14px;
                                            color: #f05b47;
                                            font-family: PingFangSC-Regular,
                                                sans-serif;
                                            margin-top: 44px;
                                            display: block;
                                        }
                                    }
                                }
                            }
                            .btn {
                                display: block;
                                color: #413838;
                                border-radius: 6px;
                                width: 90%;
                                height: 38px;
                                line-height: 38px;
                                margin-left: 5%;
                                text-align: center;
                                font-size: 15px;
                                background-color: #fff;
                                box-shadow: 0 0 10px rgba(245, 245, 245, 0.5);
                                margin-bottom: 10px;
                            }
                        }
                    }
                }
            }
        }
        .canvas-hide {
            position: fixed;
            right: -100%;
            top: 0;
        }
    }
</style>
