<template>
    <div class="order-detail"
         :style="[{height:'calc(100vh - '+(navContentHeight+navBarHeight+'px')+')'}]">
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px')}">
            <navbar title='订单详情'></navbar>
            <div class="order-top-bg wait_pay"
                 v-if="pageIndex == 0">
                <div class="order-status">待支付</div>
            </div>
            <div class="order-top-bg toPlay"
                 v-if="pageIndex == 1">
                <div class="order-status">待消费</div>
            </div>
            <div class="order-top-bg complete_pay"
                 v-if="pageIndex == 2">
                <div class="order-status">已完成</div>
            </div>
            <div class="order-top-bg toReturn"
                 v-if="pageIndex == 3">
                <div class="order-status">退款</div>
            </div>
            <div class="detail-all-content">
                <ul class="all-info-ul">
                    <li class="both">
                        <!-- <span>订单编号：125558877011</span> -->
                        <span>演出</span>
                        <span v-if="pageIndex == 0">待支付</span>
                        <span v-if="pageIndex == 1">待消费</span>
                        <span v-if="pageIndex == 2">已完成</span>
                        <span v-if="pageIndex == 3">退款</span>
                    </li>
                    <li class="both">
                        <span>{{orderInfos.orderInfo}}</span>
                    </li>
                    <li class="both">
                        <span>联系人</span>
                        <span>{{orderInfos.linkName}}</span>
                    </li>
                    <li class="both">
                        <span>数量</span>
                        <span>{{1}}</span>
                    </li>
                    <li class="both">
                        <span>出游日期</span>
                        <span>{{orderInfos.startTimeStr}}</span>
                    </li>
                    <li class="both">
                        <span>订单总价</span>
                        <span>
                            <i>￥</i>
                            {{orderInfos.orderSum}}
                        </span>
                    </li>
                    <li class="both">
                        <span>积分抵扣</span>
                        <span>
                            <i>￥</i>
                            {{orderInfos.couponSum}}
                        </span>
                    </li>
                    <li class="both">
                        <span>订单总价</span>
                        <span>
                            <i>￥</i>
                            {{orderInfos.paySum}}
                        </span>
                    </li>
                </ul>
                <div class="pay-type">
                    <div class="item-li botn">
                        <span>下单日期</span>
                        <span>2019/08/12</span>
                    </div>
                    <div class="item-li botn">
                        <span>支付方式</span>
                        <span>微信</span>
                    </div>
                </div>
                <a class="back-home"
                   href="javascript:;"
                   v-if="pageIndex == 0"
                   @click="openPayModal">去支付</a>
                <a class="back-home"
                   href="javascript:;"
                   v-if="pageIndex == 1"
                   @click="goUrl('pages/member/order/tuikuan/main?orderId='+orderInfos.id)+'&amount='+orderInfos.amount+'&orderDetailId='+orderInfos.orderDetail[0].id">申请退款</a>
                <!-- <a class="back-home"
                   href="javascript:;"
                   v-if="pageIndex == 1"
                   @click="toRefund(orderInfos.id)">申请退款</a> -->
                <a v-if="pageIndex != 0"
                   class="back-home"
                   href="javascript:;"
                   @click="toIndex">返回首页</a>
            </div>

            <!-- 支付弹窗 -->
            <div class="toast-box">
                <div v-if='payShow'
                     @click='closePayModal'
                     class="mask"></div>
                <div :animation="payAnimationData"
                     class="modal pay-modal">
                    <div class="modal-content pay-sure">
                        <div class="pay-money bg-w  m-b-10 boxshadow">
                            <span class="title">支付金额:</span>
                            <span>￥{{obj.paySum||0}}</span>
                        </div>
                        <div class="pay-way bg-w boxshadow">
                            <div class="pay-info">
                                <i class="xx-icon icon-iconfont-weixin1 pay-svg fl"></i>
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
            <!-- 支付弹窗 -->
        </div>
    </div>
</template>

<script>
    import navbar from "@/components/navbar";
    import { getData, postData, merchantInfoId } from "@/common/common";
    export default {
        components: {
            navbar
        },
        data() {
            return {
                pageIndex: 0,
                canScroll: false, //是否允许页面滑动
                payAnimationData: {},
                flagModal: false, //点击其他地方，支付弹框不要消失
                payAnimation: null,//支付弹窗
                payShow: false,//支付弹窗
                obj: {
                    orderInfo: '',
                    paySum: '',
                    payType: "",
                    payOrderNo: '',
                    orderDetailId:''
                },
                orderInfos: {

                }
            };
        },
        onLoad() {
            let _this = this
            this.pageIndex = _this.$root.$mp.query.status
            // this.swiperHeight =
            //   res.windowHeight - 39 - (this.navContentHeight + this.navBarHeight);
            console.log("------------query", this.$root.$mp.query)

            let url = '/leaguer/api/order/manage/orderQuery'; // 非待支付接口订单详情
            let payOrderNo = _this.$root.$mp.query.payOrderNo ? _this.$root.$mp.query.payOrderNo : false;
            let params = {
                wayType: 1
            }
            if (payOrderNo) {
                url = "/order/api/getPayOrder";//待支付接口订单详情
                params.payOrderNo = payOrderNo
            } else {
                params.orderInfoId = _this.$root.$mp.query.id
            }
            getData(url, params).then(res => {
                console.log("演出接口返回数据", res)
                this.orderInfos = res.data
                this.orderInfos.startTimeStr = this.orderInfos.startTime.substring(0, 10)
            })

            //支付动画
            this.animation = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
            this.payAnimation = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
            this.couponAnimation = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
            //支付动画
        },
        onUnload() { },
        onHide() {
            this.$refs.paysure.justClosePayModal();
        },
        methods: {
            goUrl(path) {
                this.navigatePageTo(this.router + path);
            },
            // toRefund(id) {
            //     let _this = this
            //     let data = {
            //         orderId: id,
            //         refundAmount: _this.orderInfos.amount,
            //         refundType:0,//除商品之外 都是0   "0：仅退款,1：退款并退货"
            //         reason:'aaaaaaaa',
            //         familyRefundType:0,//退单类型 0：整单退,1：部分退"
            //         orderDetailId:_this.orderInfos.orderDetail[0].id

            //     }
            //     postData(
            //         this.api.member.order.refund,
            //         Object.assign(data, {
            //             wayType: 33,
            //             reason: this.reson ? this.reson : "this.selectReason"
            //         })
            //     ).then(res => {
            //         if (res.status == 200) {
            //             wx.showToast({
            //                 title: res.message,
            //                 duration: 3000,
            //                 icon: "success",
            //                 success: function () {
            //                     // wx.navigateBack();
            //                 }
            //             });
            //             setTimeout(wx.navigateBack(), 3000);
            //         } else {
            //             wx.showToast({
            //                 title: res.message,
            //                 duration: 3000,
            //                 icon: "none",
            //                 success: function () {
            //                     // wx.navigateBack();
            //                 }
            //             });
            //         }
            //         // 页面跳转成功后待定
            //     });
            // },
            //支付弹框
            openPayModal() {
                this.canScroll = true;
                this.payShow = true;
                this.payAnimation.bottom("0rpx").step();
                this.payAnimationData = this.payAnimation.export();
            },
            closePayModal() {
                console.log("------closePayModal-----------")
                this.canScroll = false;
                this.payShow = false;
                if (this.flagModal == false) {
                    this.payShow = false;
                    this.payAnimation.bottom("-944rpx").step();
                    this.payAnimationData = this.payAnimation.export();
                }
            },
            //支付弹框
            //去支付
            wxpay() {
                //微信支付
                let _this = this;
                this.flagModal = false;
                let extendParamJson = JSON.stringify({
                    orderInfo: _this.obj.orderInfo,
                    openId: wx.getStorageSync("WxXjscUserInfo").openId
                });
                getData(this.api.main.pay.goPay, {
                    accountId: merchantInfoId,
                    extendParamJson: extendParamJson,
                    operateId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
                    payOrderNo: _this.obj.payOrderNo,
                    paySum: _this.obj.paySum,
                    payType: _this.obj.payType,
                    userType: "C",
                    wayType: 6
                }).then(res => {
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
                });
            },
            toIndex() {
                wx.navigateTo({
                    url: "/pages/index/main"
                })
            }
        }
    }

</script>

<style lang="scss">
    .order-detail {
        position: relative;
        background: #eff1f6;
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
                bottom: -200%;
                width: 100%;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                background: #fff;
                height: 400px;
                // padding-top: 20px;
                z-index: 1000;
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
        }
        .order-top-bg {
            display: inline-block;
            width: 100%;
            height: 135px;
            &.wait_pay {
                background: url("https://cdn.51dmq.com/ui/showImg/wait_pay.png")
                    no-repeat center;

                background-size: 100% 100%;
            }
            &.complete_pay {
                background: url("https://cdn.51dmq.com/ui/showImg/complate_pay.png")
                    no-repeat center;

                background-size: 100% 100%;
            }
            &.toPlay {
                background: url("https://cdn.51dmq.com/ui/showImg/order-detail.jpg")
                    no-repeat center;

                background-size: 100% 100%;
            }
            &.toReturn {
                background: url("https://cdn.51dmq.com/ui/showImg/order-detail.jpg")
                    no-repeat center;

                background-size: 100% 100%;
            }

            .order-status {
                font-family: PingFang SC Bold;
                display: inline-block;
                width: 92.5px;
                height: 35px;
                line-height: 35px;
                color: #fff;
                font-size: 21px;
                text-align: center;
                margin-left: 10px;
                margin-top: 15px;
            }
        }
        .detail-all-content {
            position: absolute;
            top: 100px;
            left: 10px;
            width: calc(100% - 20px);
            .all-info-ul {
                background: #fff;
                border-radius: 8px;
                overflow: hidden;
                &:first-of-type {
                    border-bottom: 1px solid #eff1f6;
                    .both {
                        &:first-of-type {
                            border-bottom: 1px dotted #eff1f6;
                        }
                        &:last-of-type {
                            border-top: 1px dotted #eff1f6;
                        }
                        span {
                            &:last-of-type {
                                font-family: PingFang SC Medium;
                                display: inline-block;
                                height: 20px;
                                line-height: 20px;
                                text-align: center;
                                border-radius: 5px;
                                overflow: hidden;
                                &.wait-pay {
                                    color: #ef0017;
                                    font-size: 12px;
                                    background: #fef2f3;
                                }
                                &.wait-play {
                                    color: #449cff;
                                    font-size: 12px;
                                    background: #fff;
                                }
                                &.complete {
                                    color: #cccccc;
                                    font-size: 12px;
                                    background: #f2f2f2;
                                }
                            }
                        }
                        &:nth-of-type(2) {
                            span {
                                display: inline-block;
                                min-width: 100%;
                                white-space: nowrap;
                                overflow: hidden;
                                color: #333333;
                                font-size: 17px;
                                text-align: left;
                            }
                        }
                        &:nth-of-type(6) {
                            span {
                                &:nth-of-type(2) {
                                    text-align: right;
                                    font-family: PingFang SC Heavy;
                                    font-size: 16px;
                                    color: #333;
                                    i {
                                        display: inline-block;
                                        font-size: 13px;
                                        font-family: PingFang SC Medium;
                                    }
                                }
                            }
                        }
                        &:nth-of-type(7) {
                            span {
                                &:nth-of-type(2) {
                                    color: #333;
                                    text-align: right;
                                    font-family: PingFang SC Heavy;
                                    i {
                                        color: #333;
                                        display: inline-block;
                                        font-style: 13px;
                                        font-family: PingFang SC Medium;
                                    }
                                }
                            }
                        }
                        &:nth-of-type(8) {
                            span {
                                &:nth-of-type(2) {
                                    font-size: 16px;
                                    text-align: right;
                                    color: #ef0017;
                                    font-family: PingFang SC Heavy;
                                    i {
                                        display: inline-block;
                                        font-style: 13px;
                                        font-family: PingFang SC Medium;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .both {
                padding-left: 13px;
                padding-right: 13px;
                font-family: PingFang SC Medium;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                font-size: 13px;
                color: #333333;
                span {
                    flex-wrap: 1;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
            .pay-type {
                border-radius: 8px;
                background: #fff;
                margin-top: 10px;
                padding: 5px 13px;
                .item-li {
                    display: block;
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-family: PingFang SC Medium;
                    font-size: 13px;
                    color: #333;
                }
            }
            .back-home {
                display: inline-block;
                margin-top: 10px;
                width: 100%;
                height: 49px;
                line-height: 49px;
                text-align: center;
                color: #ef0017;
                font-family: PingFang SC Bold;
                background: #fff;
                border-radius: 8px;
            }
        }
    }
</style>
