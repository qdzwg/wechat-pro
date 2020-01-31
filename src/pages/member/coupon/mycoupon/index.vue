<template>
    <div class="coupon"
         :style="[{height:'calc(100vh - '+(navContentHeight+navBarHeight+'px')+')'}]">
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px')}">
            <navbar title='宋城集团'></navbar>
            <scroll-view scroll-y>
                <div class="coupon-wrap-ul"
                     v-for="(item,index) in swiperList"
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
        </div>
    </div>
</template>

<script>
    import { getData, merchantInfoId } from "@/common/common.js";
    import navbar from "@/components/navbar";
    export default {
        components: {
            navbar
        },
        data() {
            return {
                swiperList: []
            };
        },
        onLoad() {
            getData('/marketing/api/noAuthMarketingCoupon/listCouponTemplet4C', {
                merchantInfoId: merchantInfoId,
                distributionPath: this.$root.$mp.query.distributionPath,
                productCodes: this.$root.$mp.query.productCode,
                currPage: 1,
                pageSize: 10
            }).then(res => {
                if (res.status == 200)
                    this.swiperList = res.data.rows
            })
        },
        onUnload() {

        },
        onHide() {

        },
        computed: {

        },
        methods: {
            getAll() {
                // distributionPath
                // PRODUCT_DETAIL_PAGE ("0","产品详情页"),
                // SHOPPING_CART ("1","购物车"),
                // OPEN_SCREEN_PAGE ("2","小程序开屏页"),
                // PAYMENT_COMPLETED("3","支付完成送券"),
                // INDIVIDUAL_CENTER ("4","个人中心");
                getData(this.api.main.marketing.searchCoupon, {
                    merchantInfoId: merchantInfoId,
                    distributionPath: this.$root.$mp.query.distributionPath,
                    productCodes: this.$root.$mp.query.productCodes,
                    currPage: 1,
                    pageSize: 10
                }).then(res => {
                    if (res.status == 200) {
                        this.couponAll = res.data.rows;
                        // this.couponAll.map(item => {
                        //     item.validEndDate = item.validEndDate.substring(0, 10)
                        // })
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
                        this.getAll();
                    }
                })
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
        .coupon-wrap-ul {
            height: 100%;
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
                            background: linear-gradient(to right, #ef031b, #f7406a);
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
    }
</style>
