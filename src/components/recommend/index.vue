<template>
    <!-- <div class="block_Box select-tickets"> -->
    <div class="block_Box"
         v-if="remenList.length && remenList.length>0 && ifShow" :class="isOrder?'order-class':'select-tickets'" >
        <div class="block_title">
            <img class="title_icon"
                 src="https://cdn.51dmq.com/ui/showImg/remen.png"
                 alt>
            热门产品推荐
        </div>
        <div class="rmProduct_Box">
            <div class="rmProduct_content"
                 :style="{width:(true?((remenList.length*320-20)+'rpx'):((remenList.length*320-40)+'rpx'))}">
            <!-- <div class="rmProduct_content"
                 :style="{width:(false?((remenList.length*320-20)+'rpx'):((remenList.length*320-40)+'rpx'))}"> -->
                <div :class="{rmProduct_optBox:true, rmProduct_optBox_last:index==remenList.length-1}"
                     v-for="(val, index) in remenList"
                     :key="index"
                     @click="goDetailPage(val)">
                    <div class="rmProduct_imgBox">
                        <img class="rmProduct_img"
                             :src="val.mainImage"
                             alt>
                    </div>
                    <div class="rmProduct_title">{{val.productName}}</div>
                    <div class="rmProduct_subBox">
                        <div class="rmProduct_price"><span style="font-size:12px; font-weight:500">¥&nbsp;</span>{{val.showPrice}}</div>
                        <div class="rmProduct_saled" v-if="false">已售{{val.showPrice}}份</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { postData, merchantInfoId } from "@/common/common.js";
    import moment from 'moment';
    export default {
        data() {
            return {
                animation: null,
                animationData: {},
                show: false,
                cityIds: this.cities,
                remenList: [],
                beginDate: '',
                endDate: '',
            };
        },
        props: {
            isOrder:{
                type:Boolean,
                default:false
            },
            cities: {
                type: String,
                default: ""
            },
            parkIds: {
                type: String,
                default: ""
            },
            productCodes: {
                type: String,
                default: ""
            },
            productIds: {
                type: String,
                default: ''
            },
            ifShow: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            cities(val) {
                console.log('监听城市id', val)
                return this.cityIds = val
            },
            // productCodes: {
            //     handler(code) {
            //         let _this = this
            //         if (code.length && code.length > 0) {
            //             postData('/product/api/recommend/get', {
            //                 cities: _this.cityIds,
            //                 parkIds: _this.parkIds,
            //                 productCodes: code,
            //                 productIds: _this.productIds,
            //                 merchantId: merchantInfoId
            //             }).then(res => {
            //                 if (res.status == 200) {
            //                     _this.remenList = res.data
            //                 }
            //                 console.log("这个是推荐产品的数据", res)
            //             })
            //         } else {
            //             _this.remenList = []
            //         }
            //     },
            //     // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            //     immediate: true
            // },
            // productCodes(code) {
            //     debugger
            //     let _this = this
            //     if (code.length && code.length > 0) {
            //         postData('/product/api/recommend/get', {
            //             cities: _this.cityIds,
            //             parkIds: _this.parkIds,
            //             productCodes: code,
            //             productIds: _this.productIds,
            //             merchantId: merchantInfoId
            //         }).then(res => {
            //             if (res.status == 200) {
            //                 _this.remenList = res.data
            //             }
            //             console.log("这个是推荐产品的数据", res)
            //         })
            //     } else {
            //         _this.remenList = []
            //     }
            // }
        },
        onLoad() {
            // let _this = this
            // postData('/product/api/recommend/get', {
            //     cities: wx.getStorageSync("wxxcx_citys"),
            //     parkIds: _this.parkIds,
            //     productCodes:wx.getStorageSync('xjsc_merchantProductCode'),
            //     productIds: _this.productIds,
            //     merchantId: merchantInfoId
            // }).then(res => {
            //     if (res.status == 200) {
            //         _this.remenList = res.data
            //     }
            //     console.log("这个是推荐产品的数据", res)
            // })
            this.beginDate = moment().format("YYYY-MM-DD")
            this.endDate = moment().add(1, 'days').format("YYYY-MM-DD")
            // console.log('1111111111111111111112222222222222222222222222222222222', this.productCodes, merchantInfoId, this.productIds);
            let _this = this
            if(this.ifShow && this.productCodes){
                postData('/product/api/recommend/get', {
                    cities: _this.cityIds,
                    parkIds: _this.parkIds,
                    productCodes: this.productCodes,
                    productIds: _this.productIds,
                    merchantId: merchantInfoId
                }).then(res => {
                    if (res.status == 200) {
                        _this.remenList = res.data
                    }
                })
            }
        },

        update: {

        },
        methods: {
            goUrl(path) {
                console.log("path", path)
                this.navigatePageTo(this.router + path);
            },
            goDetailPage(val) {
                if (val.productType != 'hotel') {
                    this.goUrl(`pages/${val.productType}/detail/main?id=${val.productId}&productCode=${val.productCode}`)
                } else {
                    this.goUrl(`pages/${val.productType}/detail/main?id=${val.productId}&productCode=${val.productCode}&endDate=${this.endDate}&beginDate=${this.beginDate}`)
                }
            }
        }
    };
</script>
<style lang='scss' scoped>
    .block_Box {
        width: calc(100% - 30px);
        background: white;
        margin-top: 10px;
        padding: 15px 15px;
        position: relative;
        &.select-tickets {
            padding: unset;
            width: 100%;
        }
        &.order-class{
            padding: unset;
            width: calc(100% - 20px);
            margin:0 auto;
            // margin:0 auto 10px;
        }
    }
    .block_title {
        height: 45px;
        line-height: 45px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 16px;
        font-family: PingFang SC Bold;
        vertical-align: middle;
        color: #333;
        border: 0.5px solid #f0f2f7;
    }
    .title_icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        overflow: hidden;
        vertical-align: middle;
        object-fit: cover;
    }
    .rmProduct_Box {
        width: calc(100% - 20px);
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        overflow-x: auto;
    }
    .rmProduct_content {
        height: 320rpx;
    }
    .rmProduct_optBox {
        width: 300rpx;
        margin-right: 20rpx;
        display: inline-block;
        position: relative;
    }
    .rmProduct_optBox_last {
        margin-right: 0;
    }
    .rmProduct_imgBox {
        width: 300rpx;
        height: 180rpx;
        background: #9c9c9c;
        border-radius: 5px;
        overflow: hidden;
    }
    .rmProduct_img {
        width: 300rpx;
        height: 180rpx;
    }
    .rmProduct_title {
        font-size: 14px;
        font-weight: 900;
        color: #333333;
        margin-top: 16rpx;
    }
    .rmProduct_subBox {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #ef0017;
        margin-top: 20rpx;
    }
    .rmProduct_price {
        display: inline-block;
        font-size: 16px;
        color: #ef0017;
        font-weight: 900;
    }
    .rmProduct_saled {
        display: inline-block;
        font-size: 9px;
        height: 15px;
        line-height: 15px;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 4px;
        background: #f5f5f5;
        color: #999999;
    }
</style>

