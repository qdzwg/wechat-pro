<template>
    <div class="paymentFail">
        <navbar title='支付失败'></navbar>
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
            <div class="pay-top">
                <div><img src="https://cdn.51dmq.com/ui/showImg/icon_fail.png"
                         alt=""
                         class="img-pay"></div>
                <div class="pay-text">支付失败</div>
                <div class="detail">票行111111111*数量</div>
                <div class="tip">已成功提交，请耐心等待客服人员确认！</div>
                <div class="payResult-btn">
                    <div class="item-btn">查看订单</div>
                    <div class="item-btn"><a href="/">返回首页</a></div>
                </div>
            </div>
            <!-- <div class="btn-look">
                <button class="btn-look">重新支付</button>
            </div>
            <div class="btn-order">
                <button class="btn-order">查看订单</button>
            </div> -->
            <!-- 隐藏掉 推荐产品 -->
            <div class="hot-sale" v-if="false">
                <div class="yhq-title">
                    <span class="icon-yuan-left">
                        <div class="heng fl"></div>
                        <div class="dian fr"></div>
                        <!-- <div style="clear:both;"></div> -->
                    </span>
                    <span class="icon-yhq">
                        <img src="http://statics.lotsmall.cn/wx/img/aixin.png"
                             alt=""
                             class="yhq-bg">
                    </span>
                    <span class="yuq-text">
                        你可能还喜欢
                    </span>
                    <span class="icon-yuan-right">
                        <div class="dian fl"></div>
                        <div class="heng fr"></div>
                    </span>
                </div>
                <div class="scenic-list">
                    <div v-for='(item,index) in saleData'
                         :key='index'
                         @click="goUrl('pages/hotel/detail/main?id='+item.id+'&productCode='+item.productCode)"
                         class="scenic-item shadow-bottom">
                        <img class="scenic-img"
                             :src="item.linkMobileImg"
                             alt="">
                        <div class="scenic-info">
                            <div class="scenic-title">{{item.nickName}}</div>
                            <div class="scenic-distance clearfix">
                                <!-- <i class="xx-icon icon-shouhuodizhi distance-icon fl"></i> -->
                                <span class="fl">{{item.areaName}}</span>
                                <span class="hotel-star"> {{item.hotelLevel}}星</span>
                            </div>
                            <div class="price-info">
                                <div class="buy-num">{{item.salesNum}} 人已购买</div>
                                <div class='start-price'>
                                    <span class="unit">￥</span>
                                    <span class="price">{{item.priceShow}}</span>
                                    <span class="text">起</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 广告位 -->
                <div class="adcertising">
                    <img :src="imgList"
                         alt=""
                         class="adcertising-img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from "@/components/navbar";
    export default {
        components: {
            navbar
        },
        data() {
            return {
                imgList:
                    "http://statics.lotsmall.cn/image/20180915/20180915092228c0ddqw.jpeg",
                listData: [
                    {
                        name: 1,
                        amount: 1
                    }
                ],
                saleData: [
                    {
                        linkMobileImg:
                            "http://statics.lotsmall.cn/image/20180915/20180915092228c0ddqw.jpeg",
                        nickName: "模拟数据",
                        areaName: "测试",
                        hotelLevel: 2,
                        salesNum: 100,
                        priceShow: 50
                    },
                    {
                        linkMobileImg:
                            "http://statics.lotsmall.cn/image/20180915/20180915092228c0ddqw.jpeg",
                        nickName: "模拟数据",
                        areaName: "测试",
                        hotelLevel: 2,
                        salesNum: 100,
                        priceShow: 50
                    },
                    {
                        linkMobileImg:
                            "http://statics.lotsmall.cn/image/20180915/20180915092228c0ddqw.jpeg",
                        nickName: "模拟数据",
                        areaName: "测试",
                        hotelLevel: 2,
                        salesNum: 100,
                        priceShow: 50
                    }
                ]
            };
        }
    };
</script>


<style lang="scss">
    .paymentFail {
        width: 100%;
        .pay-top {
            // height: 148px;
            text-align: center;
            background-color: #fff;
            font-family: PingFangSC-Medium, sans-serif;
            .img-pay {
                height: 95px;
                width: 95px;
                overflow: hidden;
                object-fit: cover;
                margin: 84px auto 38px;
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
        .btn-order {
            width: 90%;
            background-color: #fff;
            color: #413838;
            margin: 20px auto;
            button::after {
                border: none;
                border-radius: 0;
            }
        }
        .payResult-btn {
          padding-top: 138px;
            // position: fixed;
            // bottom:45px;
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
        .hot-sale {
            width: 100%;
            margin-top: 20px;
            color: #f05b47;
            background-color: #fff;
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
                        // box-sizing: content-box;
                        // display: inline-block;
                        width: 195px;
                        height: 79px;
                        padding: 12px 12px 9px;
                        .scenic-title {
                            padding-right: 12px;
                            color: #413838;
                            font-family: PingFangSC-Medium, sans-serif;
                            font-size: 16px;
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
    }
</style>


