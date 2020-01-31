<template>
    <div class="paymentSuccess">
        <navbar title='支付成功'></navbar>
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
            <div class="pay-top">
                <div @click="test"><img src="https://cdn.51dmq.com/ui/showImg/icon_success.png"
                         alt=""
                         class="img-pay"></div>
                <div class="pay-text">支付成功</div>
                <div class="detail"
                     v-for="(item,index) in payResultData.orderDetailVoList"
                     :key="index">{{item.orderInfo}}*{{item.amount}}</div>
                <div class="tip">已成功提交，请耐心等待客服人员确认！</div>
                <!-- <div class="pay-num">￥{{paySum}}</div>
                <div class="pay-message"
                     v-if="deliveryType=='自提'">该订单为到店自提订单，到店后出示凭证即可提货</div> -->
            </div>

            <div class="hot-sale">
                <div v-if="saleData.length>0 || imgList!=''"
                     class="yhq-title">
                    <span class="icon-yuan-left">
                        <div class="heng fl"></div>
                        <div class="dian fr"></div>
                        <!-- <div style="clear:both;"></div> -->
                    </span>
                    <span class="icon-yhq">
                        <!-- <img src="http://statics.lotsmall.cn/wx/img/aixin.png" alt="" class="yhq-bg"> -->
                    </span>
                    <span class="yuq-text">
                        你可能还喜欢
                    </span>
                    <span class="icon-yuan-right">
                        <div class="dian fl"></div>
                        <div class="heng fr"></div>
                    </span>
                </div>
                <!-- 广告位 -->
                <div v-if="imgList!=''"
                     class="adcertising">
                    <img :src="imgList"
                         alt=""
                         class="adcertising-img">
                </div>
                <div v-if="saleData.length>0"
                     class="scenic-list">
                    <div v-for='(item,index) in saleData'
                         :key='index'
                         @click="goUrl('pages/'+item.productType+'/detail/main?id='+item.merchantProductId+'&productCode='+item.productCode+'&recommendFlag=T'+'&payOrderNo='+payOrderNo)"
                         class="scenic-item shadow-bottom">
                        <img class="scenic-img"
                             :src="item.linkMobileImg"
                             alt="">
                        <div class="scenic-info">
                            <div class="scenic-title">{{item.nickName}}</div>
                            <div class="scenic-distance clearfix">
                                <span class="fl">{{item.areaAddr}}</span>
                                <span class="hotel-star"
                                      v-if="orderType=='hotel'">{{item.productLevel}}A</span>
                            </div>
                            <div class="price-info">
                                <div class="buy-num">{{item.virtualSale}} 人已购买</div>
                                <div class='start-price'>
                                    <span class="unit">￥</span>
                                    <span class="price">{{item.priceShow}}</span>
                                    <span class="text">起</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--查看二维码弹框-->
            <div v-show='show'
                 @click="closemodal"
                 class="mask"
                 :style="{top:navContentHeight+navBarHeight+'px'}"></div>
            <div class="swiper-container"
                 :class="{block:show}"
                 :animation="animationData">
                <swiper class="swiper"
                        indicator-color='#f7f7f7'
                        indicator-active-color='#fff'
                        @change='currentChange'
                        :autoplay="autoplay"
                        :interval="interval"
                        :duration="duration">
                    <swiper-item v-if="ticketDetail.length"
                                 v-for="(item, index) in ticketDetail"
                                 :key="index">

                        <div class="modal-content">
                            <div class="code-modal">
                                <div v-if="item.oneCode=='T'"
                                     class="order">
                                    订单号: {{item.orderNo}}
                                </div>
                                <div v-if="item.codeUrl&&normal">
                                    <img class="testcode"
                                         :src="'data:image/jpeg;base64,' + item.codeUrl"
                                         alt="">
                                </div>
                                <div v-else>
                                    <span class="fail-qrcode">发码失败，请联系商家或直接申请退款</span>
                                </div>
                                <p v-if="item.extp.zybAssistCheckNo&&normal"
                                   class="fzm">辅助码：{{item.extp.zybAssistCheckNo}}</p>
                                <div v-if="item.oneCode=='T'"
                                     class="name">{{item.nickName}}</div>
                                <div class="clearfix date-num-info">
                                    <div class="title-box fl">
                                        <div v-if="item.orderType=='park'"
                                             class="text">游玩日期</div>
                                        <div v-else-if="item.orderType=='hotel'"
                                             class="text">入住-离店</div>
                                        <div class='text'>购买数量</div>
                                    </div>
                                    <div class="content fr">
                                        <div v-if="item.orderType=='park'"
                                             class="date">{{item.startTime}}</div>
                                        <div v-else-if="item.orderType=='hotel'"
                                             class="date">{{item.startTime}}-{{item.endTime}}</div>
                                        <div class="num-state clearfix">
                                            <span class="fl">{{item.amount}}张</span>
                                            <span v-if="item.orderStatus=='3'"
                                                  class="fr state">未使用</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="item.oneCode=='T'"
                                 class="detail-look"
                                 @click="goUrl('pages/member/order/detail/main?orderno='+item.sid)">
                                查看详情
                            </div>
                            <div v-else
                                 class="detail-look"
                                 @click="goswitchTab('all')">查看订单</div>
                        </div>

                    </swiper-item>

                </swiper>
                <div v-if="ticketDetail.length>1"
                     class="dots-list">
                    <div v-for='(item,index) in ticketDetail'
                         :key='index'
                         class="dots-item"
                         :class="{ active: activeIndex==index }"></div>
                </div>
            </div>
            <div v-if="listData.length>0"
                 class="youhuiquan">
                <div class="coupon-wrap-ul"
                     v-for="(item,index) in listData"
                     :key="index">
                    <div class="item-coupon">
                        <div class="inner"
                             :class="[item.on == true?'on':'']">
                            <div class="info">
                                <div class="money">
                                    <p>
                                        <em>￥</em>
                                        {{item.amount}}
                                    </p>
                                    <p>抵用券</p>
                                </div>
                                <div class="name">
                                    <p>恭喜你获得</p>
                                    <p>{{item.name}}</p>
                                    <p v-if="item.validityDateType=='relative'">领取后{{item.relativeDay}}天失效</p>
                                    <p v-else>有效期至：{{item.validEndDate}}</p>
                                </div>
                                <div class="coupon-get-btn"
                                     @click="getCoupon(item.code)">
                                    领取
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else style="height:120px"></div>
            <div class="payResult-btn">
                <div class="item-btn"
                    v-if="payResultData.orderDetailVoList.length && payResultData.orderDetailVoList.length>1"
                    @click="goswitchTab('WAIT_CONSUME')">查看订单</div>
                <div class="item-btn" 
                    v-else
                    @click="goUrl('pages/member/order/detail/main?orderno='+payResultData.orderDetailVoList[0].orderId)">查看订单</div>
                <div class="item-btn"
                    @click="goUrl('pages/index/main')">返回首页</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getData, postData, merchantInfoId } from "@/common/common";
    import api from "@/api/api";
    import navbar from "@/components/navbar";
    export default {
        components: {
            navbar
        },
        data() {
            return {
                paySum: "",
                deliveryType: "",
                imgList: "",
                listData: [],
                saleData: [],
                ticketDetail: [],
                show: false,
                animationData: {},
                animation: null,
                autoplay: true,
                interval: 5000,
                duration: 1000,
                activeIndex: 0,
                indicatorDots: false,
                orderType: "",
                normal: true,
                oneCode: false,
                payOrderNo: "",
                payResultData: {}
            };
        },
        methods: {
            goswitchTab(state) {//订单详情页面
                wx.setStorageSync("wxxjsc_orderstate_2019_9_18", state);
                wx.navigateTo({
                    url: "/pages/member/order/main"
                });
            },
            test() {
                console.log(1);
            },
            //领取优惠券
            getCoupon(code) {
                getData(this.api.main.marketing.getCoupon, {
                    userId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
                    couponCode: code,
                    merchantInfoId: merchantInfoId
                }).then(res => {
                    if (res.status == 200) {
                        wx.showToast({
                            title: "领取成功！",
                            icon: "none",
                            duration: 2000
                        });
                    } else {
                        wx.showToast({
                            title: res.message,
                            icon: "none",
                            duration: 2000
                        });
                    }
                });
            },
            //查看二维码
            lookcode() {
                let _this = this,
                    resultUrl = api.order.detail,//获取订单信息
                    orderDurl = api.member.order.orderQueryByOrderId,
                    url2QrCodeUrl = api.member.order.getQrCodeUrl;

                _this.show = true;
                _this.animation
                    .scale(1, 1)
                    .opacity(1)
                    .step();
                _this.$nextTick(function () {
                    _this.animationData = _this.animation.export();
                });
                getData(resultUrl, {
                    merchantInfoId: merchantInfoId,
                    payOrderNo: this.$root.$mp.query.orderId
                }).then(res => {
                    if (res.status == 200) {
                        if (!_this.ticketDetail.length) {
                            let dArr = [],
                                lotSum = 0;
                            res.data.orderDetailVoList.forEach((item, index) => {
                                lotSum += item.amount;
                                dArr.push(item.orderId);
                            });
                            getData(orderDurl, {
                                merchantInfoId: merchantInfoId,
                                orderId: dArr.join(",")
                            }).then(resdd => {
                                let cArr = [];
                                resdd.data.forEach((item, index) => {
                                    res.data.orderDetailVoList[index].oneCode = item.oneCode;
                                    res.data.orderDetailVoList[index].extp = JSON.parse(
                                        item.extendParam
                                    );
                                    res.data.orderDetailVoList[
                                        index
                                    ].startTime = item.startTime.substr(0, 10);
                                    res.data.orderDetailVoList[index].endTime = item.endTime.substr(
                                        0,
                                        10
                                    );
                                    res.data.orderDetailVoList[index].sid = item.id;
                                    res.data.orderDetailVoList[index].nickName = item.nickName;
                                    res.data.orderDetailVoList[index].orderStatus =
                                        item.orderStatus;
                                    //没有externalOrderNo说明是商城自建的订单
                                    if (!item.externalOrderNo) {
                                        res.data.orderDetailVoList[index].sczj = "T";
                                        cArr.push(
                                            postData(url2QrCodeUrl, {
                                                url: item.payOrderNo,
                                                imgWidth: 0,
                                                imgHeight: 0
                                            })
                                        );
                                        Promise.all(cArr)
                                            .then(resqr => {
                                                _this.normal = true;
                                                resqr.forEach((it, ind) => {
                                                    res.data.orderDetailVoList[index].codeUrl = it.message;
                                                });
                                                let nArr = [];
                                                res.data.orderDetailVoList[0].amount = lotSum;
                                                nArr.push(res.data.orderDetailVoList[0]);
                                                _this.ticketDetail = nArr;
                                                // res.data.orderDetailVoList[0].amount = lotSum;
                                                // _this.ticketDetail = res.data.orderDetailVoList;
                                            })
                                            .catch(error => {
                                                _this.normal = false;
                                                // _this.ticketDetail = res.data.orderDetailVoList;
                                                let nArr = [];
                                                res.data.orderDetailVoList[0].amount = lotSum;
                                                nArr.push(res.data.orderDetailVoList[0]);
                                                _this.ticketDetail = nArr;
                                            });
                                    } else {
                                        //智游宝订单（智游宝订单分一票一码和多票一码，根据oneCode字段判断）
                                        cArr.push(
                                            postData(url2QrCodeUrl, {
                                                url: item.externalOrderNo
                                                    ? item.checkNo
                                                        ? item.checkNo
                                                        : ""
                                                    : item.payOrderNo
                                                        ? item.payOrderNo
                                                        : "",
                                                imgWidth: 0,
                                                imgHeight: 0
                                            })
                                        );
                                        Promise.all(cArr)
                                            .then(resqr => {
                                                _this.normal = true;
                                                resqr.forEach((it, ind) => {
                                                    res.data.orderDetailVoList[index].codeUrl = it.message;
                                                });
                                                if (res.data.orderDetailVoList[index].oneCode == "T") {
                                                    //一票一码
                                                    _this.ticketDetail = res.data.orderDetailVoList;
                                                } else {
                                                    //多票一码
                                                    let nArr = [];
                                                    res.data.orderDetailVoList[0].amount = lotSum;
                                                    nArr.push(res.data.orderDetailVoList[0]);
                                                    _this.ticketDetail = nArr;
                                                    console.log(_this.ticketDetail);
                                                }
                                            })
                                            .catch(error => {
                                                _this.normal = false;
                                                if (res.data.orderDetailVoList[index].oneCode == "T") {
                                                    _this.ticketDetail = res.data.orderDetailVoList;
                                                } else {
                                                    let nArr = [];
                                                    res.data.orderDetailVoList[0].amount = lotSum;
                                                    nArr.push(res.data.orderDetailVoList[0]);
                                                    _this.ticketDetail = nArr;
                                                }
                                            });
                                    }
                                });
                            });
                        }
                    }
                });
            },
            closemodal() {
                let _this = this;
                this.animation
                    .scale(0, 0)
                    .opacity(0)
                    .step();
                this.animationData = this.animation.export();
                setTimeout(() => {
                    _this.show = false;
                }, 1500);
            },
            currentChange(test) {
                //轮播图下标改变
                this.activeIndex = test.mp.detail.current;
            },
            goUrl(path) {
                this.navigatePageTo(this.router + path);
            },
            gotab(path) {
                wx.switchTab({
                    url: path
                });
            },
            //查看订单跳转
            goswitchTab(state) {
                wx.setStorageSync("wxxjsc_orderstate_2019_9_18", state);
                wx.reLaunch({
                    url: "/pages/member/order/main"
                });
            }
        },

        onLoad() {
            let leagureId = wx.getStorageSync("WxXjscUserInfo").leaguerId;
            this.payOrderNo = this.$root.$mp.query.orderId;
            //二维码弹框动画
            this.animation = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
        },

        onShow() {
            let _this = this,
                resultUrl = api.order.detail,
                searchCoupon = api.main.marketing.searchCoupon,
                adUrl = api.main.merchant.findPayPageAd,
                recommendUrl = api.main.order.getRecommendPark;

            getData(resultUrl, {
                merchantInfoId: merchantInfoId,
                payOrderNo: this.$root.$mp.query.orderId
            }).then(res => {
                if (res.status == 200) {
                    let orderInfo = JSON.parse(res.data.orderInfoJson);
                    _this.paySum = res.data.paySum;
                    _this.deliveryType = res.data.deliveryType;
                    _this.orderType = orderInfo[0].orderType;
                    _this.payResultData = res.data
                    let code = [];
                    res.data.orderDetailVoList.map(item => {
                        code.push(item.modelCode)
                    });
                    Promise.all([
                        getData(searchCoupon, {
                            merchantInfoId: merchantInfoId,
                            distributionPath: 3, // 支付完成送券
                            productCodes: code.join(','),
                            currPage: 1,
                            pageSize: 10
                        }),
                        getData(adUrl, {
                            merchantInfoId: merchantInfoId
                        }),
                        getData(recommendUrl, {
                            payOrderNo: this.$root.$mp.query.orderId,
                            merchantInfoId: merchantInfoId,
                            leagureId: wx.getStorageSync("WxXjscUserInfo").leaguerId
                        })
                    ]).then(result => {
                        console.log(result);
                        _this.listData = result[0].data.rows;
                        _this.imgList =
                            result[1].data && result[1].data.picAddr
                                ? result[1].data.picAddr
                                : "";
                        result[2].data.forEach((item, index) => {
                            if (result[2].data[index].productType == "park") {
                                result[2].data[index].productType = "scenic";
                            }
                        });
                        _this.listData.map((item, index) => {
                            _this.listData[index].validEndDate = item.validEndDate.substring(0, 10)
                        })
                        _this.saleData = result[2].data;
                    });
                }
            });
        },
        onUnload() {
            this.ticketDetail = [];
            this.closemodal();
        }
    };
</script>


<style lang="scss">
    .paymentSuccess {
        width: 100%;
        .pay-top {
            // height: 208.5px;
            text-align: center;
            background-color: #fff;
            font-family: PingFangSC-Medium, sans-serif;
            .img-pay {
                height: 95px;
                width: 95px;
                overflow: hidden;
                object-fit: cover;
                margin: 70px auto 38px;
            }
            .pay-text {
                font-size: 16px;
                color: #413838;
            }
            .detail {
                margin-top: 23px;
                font-size: 14px;
                color: #333333;
                font-family: PingFang SC Bold;
                font-weight: bold;
            }
            .tip {
                margin-top: 16px;
                padding-bottom: 20px;
                font-size: 12px;
                color: #999999;
                font-family: PingFang SC Regular;
                border-bottom: 0.5px solid #f0f2f7;
            }
            .pay-num {
                margin-top: 10px;
                font-size: 18px;
                color: #fc4150;
            }
            .pay-message {
                margin-top: 5px;
                font-size: 12px;
                color: #aeaeae;
            }
        }
        .payResult-btn {
            z-index: 2;
            margin-bottom: 20px;
            .item-btn {
                margin-left: 37px;
                margin-right: 37px;
                width: calc(100vw - 74px);
                height: 50px;
                line-height: 50px;
                text-align: center;
                border-radius: 25px;
                overflow: hidden;
                &:first-of-type {
                    background: linear-gradient(to right, #ef0118, #f7406b);
                    color: #fff;
                    font-size: 18px;
                    font-family: PingFang SC Bold;
                }
                &:nth-of-type(2) {
                    margin-top: 12.5px;
                    color: #ef0017;
                    font-size: 18px;
                    font-family: PingFang SC Bold;
                    border: 1px solid #ef0017;
                    a {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .btn-look {
            width: 90%;
            background-color: #009ded;
            color: #fff;
            margin: 20px auto;
            button::after {
                border: none;
                border-radius: 0;
            }
        }
        .youhuiquan {
            padding-left: 38px;
            padding-right: 38px;
            margin-top: 16px;
            padding-bottom: 20px;
            color: #f05b47;
            background-color: #fff;
            .coupon-wrap-ul {
                .item-coupon {
                    position: relative;
                    margin-left: 2.5px;
                    margin-right: 2.5px;
                    .inner {
                        display: block;
                        margin: 0 auto;
                        border-radius: 5px;
                        overflow: hidden;
                        border-top: 0.5px solid #e7e7e7;
                        border-right: 0.5px solid #e7e7e7;
                        box-shadow: #e7e7e7 0px 3px;
                        background-color: #fff;
                        background-image: url("https://cdn.51dmq.com/ui/order/couponBCG.png");
                        background-repeat: no-repeat;
                        background-size: auto 100%;
                        background-position: left;
                        .info {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding-left: 26px;
                            padding-right: 10px;
                            height: 93px;
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
                                width: 46%;
                                margin-left: 2px;
                                p {
                                    &:nth-of-type(2) {
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    }
                                    &:last-of-type {
                                        margin-top: 6.5px;
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
                            .coupon-get-btn {
                                width: 63px;
                                line-height: 32px;
                                color: #ef0017;
                                text-align: center;
                                border-radius: 32px;
                                font-size: 14px;
                                border: 0.5px solid #ef0017;
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
                &:not(:first-of-type) {
                    margin-top: 10px;
                }
            }
        }
        .hot-sale {
            width: 100%;
            margin-top: 20px;
            color: #f05b47;
            background-color: #fff;
            margin-bottom: 20px;
            .yhq-title {
                width: 70%;
                margin: 0 auto;
                text-align: center;
                .icon-yuan-left {
                    width: 17px;
                    margin-right: 14px;
                    margin-bottom: 5px;
                    display: inline-block;
                    .heng {
                        width: 15px;
                        height: 1px;
                        background-color: #f05b47;
                    }
                    .dian {
                        width: 2.5px;
                        height: 2.5px;
                        border-radius: 50%;
                        background-color: #f05b47;
                    }
                }
                .icon-yhq {
                    width: 17px;
                    height: 14px;
                    margin-top: 5px;
                    display: inline-block;
                    .yhq-bg {
                        width: 17px;
                        height: 14px;
                        vertical-align: middle;
                    }
                }
                .yuq-text {
                    width: 85px;
                    font-size: 14px;
                }
                .icon-yuan-right {
                    width: 17px;
                    margin-left: 14px;
                    margin-bottom: 5px;
                    display: inline-block;
                    .heng {
                        width: 15px;
                        height: 1px;
                        background-color: #f05b47;
                    }
                    .dian {
                        width: 2.5px;
                        height: 2.5px;
                        border-radius: 50%;
                        background-color: #f05b47;
                    }
                }
            }
            .scenic-list {
                text-indent: 2.5px;
                margin-top: 15px;
                .scenic-item {
                    background: #fff;
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 10px;
                    .scenic-img {
                        height: 100px;
                        width: 156px;
                    }
                    .scenic-info {
                        width: 195px;
                        height: 79px;
                        padding: 12px 12px 9px;
                        .scenic-title {
                            padding-right: 12px;
                            color: #413838;
                            font-family: PingFangSC-Medium, sans-serif;
                            font-size: 16px;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        }
                        .scenic-distance {
                            font-size: 10px;
                            color: #f05b47;
                            font-family: PingFangSC-Regular, sans-serif;
                            padding-top: 5px;
                            padding-bottom: 6px;
                            .distance-icon {
                                display: inline;
                            }
                            .hotel-star {
                            }
                        }
                        .price-info {
                            position: relative;
                            .buy-num {
                                color: #ababab;
                                font-size: 10px;
                                font-family: PingFangSC-Regular, sans-serif;
                            }
                            .start-price {
                                position: absolute;
                                color: #fc4150;
                                right: 0;
                                bottom: 0;
                                .unit {
                                    font-size: 12px;
                                    font-family: PingFangSC-Semibold, sans-serif;
                                }
                                .price {
                                    font-size: 18px;
                                    font-family: PingFangSC-Semibold, sans-serif;
                                    padding-left: 6px;
                                    padding-right: 4px;
                                }
                                .text {
                                    font-size: 9px;
                                    color: #ababab;
                                    font-family: PingFangSC-Regular, sans-serif;
                                }
                            }
                        }
                    }
                }
            }
            .adcertising {
                width: 100%;
                height: 138px;
                padding: 5px;
                .adcertising-img {
                    width: 359px;
                    height: 138px;
                }
            }
        }
        .mask {
            position: fixed;
            // top: 69px !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            padding: 0 15px !important;
            padding-top: 50px !important;
            background: #d3d3d3 !important;
        }
        .swiper-container {
            width: 80%;
            height: 520px;
            opacity: 0;
            position: fixed;
            top: 50%;
            margin-top: -260px;
            z-index: 701;
            display: none;
            left: 50%;
            margin-left: -40%;
            .swiper {
                width: 100%;
                height: 520px;
                margin-top: 50px;
                .modal-content {
                    .code-modal {
                        padding-top: 23px;
                        border-radius: 2px;
                        background: #fff;
                        height: auto;
                        width: 100%;
                        text-align: center;
                        .fail-qrcode {
                            font-size: 16px;
                            color: #fa6167;
                        }
                        .fzm {
                            font-size: 16px;
                            border: 1px solid #413838;
                            height: 30px;
                            line-height: 30px;
                            margin: 5px auto;
                            width: 66%;
                        }
                        .order {
                            font-size: 12px;
                            color: #413838;
                            font-family: PingFangSC-Medium, sans-serif;
                            margin-bottom: 15px;
                        }
                        .testcode {
                            height: 189px;
                            width: 189px;
                            margin-bottom: 8px;
                        }
                        .name {
                            font-size: 18px;
                            color: #413838;
                            font-family: PingFangSC-Medium, sans-serif;
                            font-weight: 600px;
                            margin-bottom: 12px;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        }
                        .date-num-info {
                            padding: 0 20px;
                            .title-box {
                                color: #413838;
                                font-size: 14px;
                                font-family: PingFangSC-Medium, sans-serif;
                                .text {
                                    margin-bottom: 16px;
                                }
                            }
                            .content {
                                font-size: 14px;
                                font-family: PingFangSC-Medium, sans-serif;
                                color: #999999;
                                .date {
                                    margin-bottom: 16px;
                                }
                                .state {
                                    display: inline-block;
                                    height: 17.5px;
                                    line-height: 17.5px;
                                    background: #23d240;
                                    color: #fff;
                                    border-radius: 2px;
                                    padding: 0 5px;
                                    font-size: 12px;
                                    font-family: PingFangSC-Medium, sans-serif;
                                }
                            }
                        }
                    }
                    .detail-look {
                        height: 44px;
                        line-height: 44px;
                        background: #009ded;
                        color: #fff;
                        margin-top: 20px;
                        border-radius: 2px;
                        text-align: center;
                        font-size: 16px;
                        font-family: PingFangSC-Medium, sans-serif;
                    }
                }
            }
            .dots-list {
                position: absolute;
                width: 100%;
                bottom: 9px;
                left: 0px;
                display: flex;
                justify-content: center;
                .dots-item {
                    height: 5px;
                    width: 5px;
                    margin: 0 5px;
                    border-radius: 50%;
                    background: #fff;
                    opacity: 0.5;
                }
                .dots-item.active {
                    background: #fff;
                    opacity: 1;
                }
            }
        }
        .block {
            display: block;
        }
    }
</style>


