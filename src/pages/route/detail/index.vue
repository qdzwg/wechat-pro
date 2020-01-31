<template>
    <div class="detail-warp">
        <navbar title="跟团游详情"></navbar>
        <div class
             :style="{'margin-top': (navContentHeight+navBarHeight+'px')}">
            <!--静态页面用这个-->
            <!-- <div class="test-swiper-box">
        <img src="../../../assets/route-banner.jpg" alt="">
      </div> -->
            <div v-if="imgUrl.length>0"
                 class="swiper-box">
                <div class="swiper-container">
                    <swiper class="swiper"
                            indicator-color="#f7f7f7"
                            indicator-active-color="#fff"
                            @change="currentChange"
                            :autoplay="autoplay"
                            :interval="interval"
                            :duration="duration">
                        <swiper-item v-for="(item,index) in imgUrl"
                                     :key="index">
                            <image @click="test"
                                   :src="item"
                                   class="slide-image" />
                        </swiper-item>
                    </swiper>
                    <div class="dots-list">
                        <div v-for="(item,index) in imgUrl"
                             :key="index"
                             class="dots-item"
                             :class="{active:activeIndex==index}"></div>
                    </div>
                </div>
            </div>
            <div class="detail-main-box">
                <div class="price-sale clearfix">
                    <div class="detail-price-box fl">
                        <span class="price-tag">¥</span>
                        <span class="route-price">{{detailData.priceShow}}</span>
                        <span class="price-info">/人起</span>
                    </div>
                    <div class="detail-sale-box fr">
                        <span class="sale-num">已售{{detailData.salesNum}}份</span>
                    </div>
                </div>
                <div class="detail-info clearfix boxshadow">
                    <div class="detail-info-main">
                        <h1 class="detail-info-title">
                            <span class="detail-info-ztitle">{{detailData.name}}</span>
                        </h1>
                        <div class="detail-info-miaoshu">
                            <div v-html="detailData.lineDescription"></div>
                        </div>
                        <p class="line-theme">
                            <span v-for="(item, index) in lineTheme"
                                  :key="index"
                                  :class="'theme-item'+(index+1)"
                                  class="theme-item">{{item}}</span>
                        </p>
                    </div>
                </div>
                <div class="detail-pageline"></div>
                <div class="receive-coupons clearfix"
                     v-if="twoCoupon.length">
                    <div class="coupons-title fl">领优惠券</div>
                    <div class="coupons-list fl">
                        <ul class="clearfix">
                            <li v-for="(item, index) in twoCoupon"
                                @click="goCoupon"
                                :key="index">
                                <p class="coupons-bg">
                                    <span>满{{item.targetAmout}}减{{item.amount}}</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="fr coupons-yjt">
                        <i class="xx-icon icon-xiangyoujiantou"></i>
                    </div>
                </div>
                <div class="detail-ydxz clearfix">
                    <div class="detail-order-date">
                        <span class="date-title">选择日期</span>
                    </div>
                    <div class="route-date-box clearfix">
                        <div class="before-three-box">
                            <div v-for="(item, index) in stockPriceArr"
                                 :key="index"
                                 class="before-three clearfix">
                                <div class="hasPrice"
                                     v-if="item.price!='不可售'"
                                     @click="goUrl('pages/route/detail/mpvueCalendar/main?id='+routeId+'&routeCode='+routeCode+'&day='+item.day)">
                                    <p class="day">{{item.day}}</p>
                                    <p class="price">{{item.price}}</p>
                                </div>
                                <div class="noPrice"
                                     v-else>
                                    <p class="day">{{item.day}}</p>
                                    <p class="price">{{item.price}}</p>
                                </div>
                            </div>
                        </div>
                        <span class="ydxz-text"
                              @click="goUrl('pages/route/detail/mpvueCalendar/main?id='+routeId+'&routeCode='+routeCode)">更多日期</span>
                    </div>

                </div>
                <div class="detail-pageline"></div>
                <!--景点详情-->
                <div class="detail-info-content">
                    <div class="info-content-item">

                        <img src="https://cdn.51dmq.com/ui/order/icon-xingcheng.png"
                             class="icon-xingcheng"
                             alt="">
                        <span class="content-item-title">行程</span>
                    </div>
                    <div class="info-content-main boxshadow"
                         id="info-content-main">
                        <!-- <wx-parse :contentstr="routeDetail"></wx-parse> -->
                        <rich-text class="richText"
                                   :nodes="routeDetail"
                                   bindtap="tap"></rich-text>
                    </div>
                </div>
                <div class="detail-pageline"></div>
                <!--费用-->
                <div class="detail-info-content">
                    <div class="info-content-item">
                        <!-- <i class="blf4"></i> -->
                        <img src="https://cdn.51dmq.com/ui/order/icon-feiyong.png"
                             class="icon-feiyong"
                             alt="">
                        <span class="content-item-title">费用</span>
                    </div>
                    <div class="info-content-main boxshadow">
                        <!-- <wx-parse :contentstr="costDetail"></wx-parse> -->
                        <rich-text class="richText"
                                   :nodes="costDetail"
                                   bindtap="tap"></rich-text>
                    </div>
                </div>
                <div class="detail-pageline"></div>
                <!--预订须知-->
                <div class="detail-info-content">
                    <div class="info-content-item">
                        <!-- <i class="blf4"></i> -->
                        <img src="https://cdn.51dmq.com/ui/order/icon-xuzhi.png"
                             class="icon-xuzhi"
                             alt="">
                        <span class="content-item-title">须知</span>
                    </div>
                    <div class="info-content-main boxshadow">
                        <!-- <wx-parse :contentstr="orderDetail"></wx-parse> -->
                        <rich-text class="richText"
                                   :nodes="orderDetail"
                                   bindtap="tap"></rich-text>
                    </div>
                </div>
                <div class="detail-pageline"></div>
                <!--评论-->
                <div class="detail-info-content mb10">
                    <div class="info-content-item clearfix">
                        <!-- <i class="blf4"></i> -->
                        <div style="float:left">
                            <img src="https://cdn.51dmq.com/ui/order/icon-comment.png"
                                 class="icon-comment"
                                 alt="">
                            <span class="content-item-title">评价</span>
                        </div>
                        <div class="lookAll-comment"
                             v-if="commentData.length>0">
                            <span class="more-text">更多</span>
                            <img src="https://cdn.51dmq.com/ui/order/icon-more.png"
                                 class="icon-mores">
                        </div>
                    </div>
                    <div class="info-content-main boxshadow">
                        <!--评论有数据-->
                        <div v-if="commentData.length>0"
                             class="detail-comment-ul">

                            <div v-for='(item,index) in commentData'
                                 :key='index'
                                 class="detail-comment-li">
                                <p class="clearfix">
                                    <!-- <img v-if="item.headImg" :src="item.headImg" class="comment-img">
                <i v-else class="xx-icon icon-member fl member-svg"></i> -->
                                    <img src="../../../assets/comment-img.jpg"
                                         class="comment-img">
                                    <span class="comment-name">{{item.userName}}</span>
                                    <em class="comment-date">{{item.createTime}}</em>
                                </p>
                                <p class="comment-content">
                                    {{item.content}}
                                </p>
                            </div>

                        </div>
                        <!--评论无数据-->
                        <div v-else
                             class="noData">
                            <!-- <i class="xx-icon icon-iconfont-gantanhaom nodata-svg"></i> -->
                            <span class="nodata-text">暂无评论</span>
                        </div>
                    </div>
                </div>
                <div class="detail-pageline"></div>
                <!--推荐-->
                <recommend :cities="cities"
                           :parkIds="parkIds"
                           :productCodes="productCodess"
                           :ifShow="ifShow"></recommend>
                <!-- <div class="detail-info-content">         -->
                <!-- <div class="info-content-item clearfix">
          <div style="float:left">
            <img src="https://cdn.51dmq.com/ui/order/icon-tuijian.png" class="icon-tuijian" alt="">
            <span class="content-item-title">推荐</span> -->
                <!-- <img src="../../../assets/icon-comment.png" class="icon-comment" alt="">
            <span class="content-item-title">评价</span> -->
                <!-- </div>          
          <div class="lookAll-comment">
            <span class="more-text">更多</span>
            <img src="https://cdn.51dmq.com/ui/order/icon-more.png" class="icon-mores">
          </div>
        </div>
        <div class="info-content-main boxshadow">
          <ul class="tuijian-ul clearfix">
            <li class="tuijian-li" v-for="(item, index) in recommend" :key="index">
              <img :src="item.imgUrl" alt="" class="tuijian-img">
              <div class="tuijian-main">
                <p class="tuijian-title">{{item.title}}</p>
                <div class="tuijian-price-sale clearfix">
                  <div class="tuijian-price fl">
                    <span class="tuijian-price-sign">¥</span>
                    <span class="tuijian-price-price">{{item.price}}</span>
                    <span class="tuijian-price-low">起</span>
                  </div>
                  <div class="tuijian-sale fr">
                    <span class="tuijian-sale-num">已售{{item.sale}}万</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div> -->
                <!-- </div> -->
                <div class="detail-pageline"></div>
            </div>
        </div>

        <div class="route-order">
            <div class="float-layer">
                <!-- <img src="" alt=""> -->
                <div class="clearfix">
                    <div class="route-order-foot fl">
                        <i class="xx-icon icon-shopping-car"></i>
                        <span class="shop-car-text">购物车</span>
                    </div>
                    <div class="route-shop-car fr">
                        <span class="add-to-car"
                              @click='pushCar'>加入购物车</span>
                        <span class="to-order"
                              @click='buyNow'>立即预订</span>
                    </div>
                </div>

                <!-- <span class="route-detail-order"  @click="goUrl('pages/route/detail/mpvueCalendar/main?id='+routeId+'&routeCode='+routeCode+'&day='+stockPriceArr[0].day)">立即报名</span> -->
            </div>
        </div>
    </div>
</template>

<script>
    import api from "@/api/api";
    import navbar from "@/components/navbar";
    import recommend from '@/components/recommend'
    import {
        getData,
        postData,
        merchantInfoId,
        isauthorization,
        setUserInfo
    } from "@/common/common";
    import wxParse from "@/components/htmlParse";

    export default {
        components: {
            wxParse,
            navbar,
            recommend
        },
        data() {
            return {
                productCodes: '',
                productCode: '',
                twoCoupon: [],
                recommend: [],
                wayType: 1,
                autoplay: true,
                interval: 2500,
                duration: 500,
                activeIndex: 0,
                imgUrl: [],     //轮播图
                animation: null,
                animationData: {},
                detailData: {},   //详情主要数据
                lineTheme: [],    //详情页面展示标签
                routeDetail: '',   //行程安排
                orderDetail: '',  //预订须知
                costDetail: '',     //费用    
                routeId: '',
                routeCode: '',
                commentData: [],
                stockPriceArr: [],
                cities: "",//推荐产品  城市id
                parkIds: '',//推荐产品  景区id
                productCodess: '',//推荐产品  产品id
                ifShow: false
            };
        },
        methods: {
            pushCar() {
                this.navigatePageTo(this.router + "pages/order/car/main");
            },
            buyNow() {
                this.goUrl('pages/route/detail/mpvueCalendar/main?id=' + this.routeId + '&routeCode=' + this.routeCode)
            },
            goUrl(path) {
                this.navigatePageTo(this.router + path);
            },
            //打开地图
            openMap() {
                let _this = this;
                wx.getSetting({
                    //获取用户授权状态（查看是否授权）
                    success: result => {
                        //用户是否授权了地理位置权限
                        if (result.authSetting["scope.userLocation"]) {
                            //如果已经授权
                            _this.realOpenMap();
                        } else {
                            // 未授权，引导用户授权
                            wx.authorize({
                                scope: "scope.userLocation",
                                success: function () {
                                    //用户同意授权
                                    _this.realOpenMap();
                                },
                                fail: function (e) {
                                    console.log(e);
                                    //用户不同意授权
                                }
                            });
                        }
                    }
                });
            },
            realOpenMap() {
                let that = this;
                let arr = this.detailData.latitudeLongitude.split(",");
                wx.openLocation({
                    latitude: that.bMapTransQQMap(+arr[0], +arr[1]).lat,
                    longitude: that.bMapTransQQMap(+arr[0], +arr[1]).lng,
                    name: that.detailData.name,
                    scale: 28
                });
            },
            // 百度经纬度转腾讯经纬度
            bMapTransQQMap(lng, lat) {
                let x_pi = 3.14159265358979324 * 3000.0 / 180.0;

                let x = lng - 0.0065;

                let y = lat - 0.006;

                let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);

                let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);

                let lngs = z * Math.cos(theta);

                let lats = z * Math.sin(theta);

                return {
                    lng: lngs,

                    lat: lats
                };
            },
            //获取当前日期
            getDateStr(AddDayCount) {
                let dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
                let y = dd.getFullYear();
                let m = dd.getMonth() + 1;//获取当前月份的日期
                let d = dd.getDate();
                return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
            },
            searchCouponCB(res) {
                if (res.status == 200) {
                    this.twoCoupon = res.data.rows.splice(0, 2);
                }
            },
            goCoupon() {
                this.goUrl('pages/member/coupon/mycoupon/main?productCode=' + this.productCodes + '&distributionPath=' + 0)
            }
        },
        onLoad() {
            // 推荐产品id 和code
            this.productCodess = this.$root.$mp.query.productCode;
            if(this.productCodess && this.productCodess !=''){
                this.ifShow = true;
                wx.setStorageSync('xjsc_merchantProductCode', this.productCodess)
            }
            // this.parkIds = this.$root.$mp.query.id
            wx.setStorageSync('xjsc_merchantParkId','')            
            //判断用户是否授权
            isauthorization("userInfo").then(res => {
                this.authorization = res;
            });
            let that = this;
            let detailUrl = api.route.detail.main;
            let commentUrl = api.main.comment.list;
            let rd = getData(detailUrl, {
                wayType: that.wayType,
                id: that.$root.$mp.query.id,
                merchantInfoId: merchantInfoId
            });
            let rc = getData(commentUrl, {
                wayType: that.wayType,
                productType: "route",
                productCode: that.$root.$mp.query.productCode,
                merchantInfoId: merchantInfoId
            });
            wx.showLoading({
                title: "加载中..."
            });
            //展示跟团游预订日期的前三天
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
            let showThreeArr = [that.getDateStr(0), that.getDateStr(1), that.getDateStr(2), that.getDateStr(3)];
            let sp = getData(listCalendarPriceMapUrl, {
                wayType: that.wayType,
                id: that.$root.$mp.query.id,
                merchantInfoId: merchantInfoId,
                beginMonth: beginMonth,
                endMonth: endMonth
            });
            //请求接口获取详情页面需要的数据
            Promise.all([rd, rc, sp]).then(res => {
                that.detailData = res[0].data;
                that.routeId = res[0].data.id;
                that.routeCode = res[0].data.productCode;
                that.imgUrl = res[0].data.merchantPictureLibVo.wapUrl
                    ? res[0].data.merchantPictureLibVo.wapUrl.split(",")
                    : [];
                that.lineTheme = res[0].data.lineTheme
                    ? res[0].data.lineTheme.split(",")
                    : [];
                that.commentData = res[1].data ? res[1].data : [];
                that.routeDetail = res[0].data.lineArrange ? res[0].data.lineArrange.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ') : '';
                that.costDetail = res[0].data.costDescription ? res[0].data.costDescription.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ') : '';
                that.orderDetail = res[0].data.lineNotes ? res[0].data.lineNotes.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ') : '';
                res[1].data.forEach(it => {
                    var reg = /^(.{1}).*(.{1})$/;
                    if (it.isAnonymous == "T") {
                        it.userName = it.userName
                            ? it.userName.replace(reg, "$1***$2")
                            : "";
                    }
                });
                wx.setStorageSync('routeInfo', {
                    routeName: res[0].data.nickName,
                    routeId: that.routeId,
                    routeCode: that.routeCode
                });
                // let clCalendarDayVos = res[2].data[0].clCalendarDayVos;
                let showStockPriceArr = [];
                let arr = []
                for (let i = 0; i < res[2].data[0].clCalendarDayVos.length; i++) {
                    let obj = {}
                    let priceFlag = true
                    let flag = false;
                    let price
                    let pxArr = []
                    for (let j = 0; j < res[2].data.length; j++) {
                        if (res[2].data[j].clCalendarDayVos[i].salePrice) {
                            if (priceFlag) {
                                price = res[2].data[j].clCalendarDayVos[i].salePrice
                                priceFlag = false
                            }
                            flag = true;
                        }
                        pxArr.push(res[2].data[j].clCalendarDayVos[i])
                    }
                    obj.selcted = flag
                    obj.pxArr = pxArr
                    obj.salePrice = price ? price : ""
                    obj.date = res[2].data[0].clCalendarDayVos[i].date
                    arr.push(obj)
                }
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < showThreeArr.length; j++) {
                        if (arr[i].date == showThreeArr[j]) {
                            let obj = {};
                            if (arr[i].salePrice) {
                                obj = {
                                    day: arr[i].date,
                                    price: '¥' + arr[i].salePrice
                                }
                            } else {
                                obj = {
                                    day: arr[i].date,
                                    price: '不可售'
                                }
                            }
                            showStockPriceArr.push(obj);
                        }
                    }
                }
                that.stockPriceArr = showStockPriceArr;
                wx.showShareMenu({
                    withShareTicket: true
                })
                // 推荐产品 城市id
                this.cities = res[0].data.cityId?res[0].data.cityId:''
                wx.setStorageSync("wxxcx_citys", this.cities);
                // 查询优惠券
                that.productCodes = [];
                res[2].data.map(item => {
                    that.productCodes.push(item.modelCode)
                })
                that.searchCoupon({
                    productCodes: that.productCodes.join(','),
                    merchantInfoId: merchantInfoId,
                    distributionPath: 0, // 4：个人中心
                    currPage: 1,
                    pageSize: 1000
                }, that.searchCouponCB);
            });
        },
        onUnload() {
            this.stockPriceArr = [];
        }
    };
</script>

<style lang="scss">
    .detail-warp {
        width: 100%;
        background-color: #f7f7f7;
        position: relative;
        .detail-main-box {
            // position: absolute;
            background-color: #fff;
            top: 200px;
            left: 0;
            width: 100%;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            .detail-pageline {
                height: 10px;
                background-color: #f0f2f7;
                width: 100%;
            }
            .receive-coupons {
                padding: 12.5px 10px;
                border-bottom: 1px solid #f0f2f7;
                .coupons-title {
                    font-size: 12px;
                    color: #333;
                    font-family: PingFangSC-Regular, sans-serif;
                    margin-right: 18px;
                    height: 20px;
                    line-height: 20px;
                }
                .coupons-list {
                    ul {
                        margin-left: -11.5px;
                        li {
                            float: left;
                            margin: 0 11.5px;
                            .coupons-bg {
                                background: url("https://cdn.51dmq.com/ui/order/yhq-bg.png")
                                    no-repeat;
                                background-size: cover;
                                width: 76.5px;
                                height: 20px;
                                line-height: 20px;
                                span {
                                    color: #fff;
                                    font-size: 10px;
                                    white-space: nowrap;
                                    font-family: PingFangSC-Regular, sans-serif;
                                    margin-left: 15px;
                                    height: 20px;
                                    line-height: 20px;
                                    display: block;
                                }
                            }
                        }
                    }
                }
                .coupons-yjt {
                    height: 20px;
                    line-height: 20px;
                    i {
                        font-size: 10px;
                        color: #c9c9c9;
                    }
                }
            }
            .price-sale {
                padding-top: 18px;
                .detail-price-box {
                    margin-left: 10px;
                    .price-tag {
                        color: #ef0017;
                        font-family: PingFangSC-Regular, sans-serif;
                        font-size: 12px;
                    }
                    .route-price {
                        font-size: 21px;
                        color: #ef0017;
                        font-family: PingFangSC-Semibold, sans-serif;
                    }
                    .price-info {
                        font-size: 12px;
                        color: #999;
                        font-family: PingFangSC-Regular, sans-serif;
                    }
                }
                .detail-sale-box {
                    background-color: #f2f2f2;
                    padding: 2px 6px;
                    margin-right: 10px;
                    .sale-num {
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
        }
        .route-order {
            padding-top: 60px;
            position: relative;
            z-index: 29;
            .float-layer {
                background-color: #fff;
                height: 60px;
                line-height: 60px;
                border-top: 1px solid #eee;
                position: fixed;
                bottom: 0;
                width: 100%;
                left: 0;
                font-size: 12px;
                .route-order-foot {
                    line-height: 25px;
                    margin-left: 16px;
                    .shop-car-text {
                        font-size: 12px;
                        color: #333;
                        text-align: center;
                        // margin-top: 4px;
                    }
                    .icon-shopping-car {
                        color: #f0021a;
                        font-size: 21px;
                        margin-top: 10px;
                    }
                }

                .route-shop-car {
                    margin-right: 10px;
                    .add-to-car {
                        // display: inline-block;
                        // vertical-align: middle;
                        border: 1px solid #ef0018;
                        color: #f10a24;
                        padding: 10px 15px;
                        border-radius: 15px;
                        margin-right: 10px;
                        box-sizing: border-box;
                    }
                    .to-order {
                        // display: inline-block;
                        // vertical-align: middle;
                        color: #fff;
                        padding: 10px 15px;
                        background: linear-gradient(to right, #ef0017, #f97c9a);
                        border-radius: 15px;
                    }
                }
                .route-detail-order {
                    display: block;
                    height: 100%;
                    float: right;
                    width: 216.5px;
                    text-align: center;
                    background-color: #f05b47;
                    color: #fff;
                    font-size: 14px;
                }
            }
        }
        .notice {
        }
        .noData {
            .nodata-svg {
                font-size: 34.5px;
                color: #cbcbcb;
            }
            .nodata-text {
                font-size: 16px;
            }
        }
        .swiper-box {
            width: 100%;
            height: 221.5px;
            .swiper-container {
                position: relative;
                height: 221.5px;
                .swiper {
                    width: 100%;
                    // height: 221.5px;
                    height: 221.5px;
                    image {
                        width: 100%;
                        height: 221.5px;
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
        }
        .detail-info {
            width: 100%;
            // height: 100px;
            // background-color: #fff;

            .detail-info-main {
                // width: 315px;
                // height: 100px;
                .detail-info-title {
                    margin-left: 10px;
                    margin-top: 16px;
                    margin-right: 10px;
                    height: 20px;
                    line-height: 20px;
                    .detail-info-ztitle {
                        font-size: 18px;
                        color: #413838;
                        // display: inline-block;
                        // vertical-align: middle;
                        // font-weight: bold;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        font-family: PingFangSC-Regular, sans-serif;
                        // width: 287px;
                    }
                }
                .detail-info-miaoshu {
                    margin-top: 10px;
                    padding: 0px 10px;
                    font-size: 12px;
                    line-height: 24px;
                    color: rgba(65, 56, 56, 0.68);
                }

                .line-theme {
                    line-height: 20px;
                    margin-left: 10px;
                    margin-top: 10px;
                    margin-bottom: 7.5px;
                    .theme-item {
                        font-size: 12px;
                        display: inline-block;
                        vertical-align: top;
                        padding: 2px 8px;
                        margin: 0 4px;
                        border: 1px solid #f21e3b;
                        color: #ef0118;
                        border-radius: 8px;
                    }
                    .theme-item1 {
                        color: #2988fb;
                        background-color: #d4e7fe;
                    }
                    .theme-item2 {
                        color: #ff6801;
                        background-color: #ffe1cc;
                    }
                    .theme-item3 {
                        color: #fa4fb4;
                        background-color: #ffd3e6;
                    }
                    .theme-item4 {
                        color: #62c133;
                        background-color: #d4f5cc;
                    }
                    .theme-item5 {
                        color: #d25bf4;
                        background-color: #ecd5fc;
                    }
                }

                .detail-price {
                    padding-left: 15px;
                    .money-sign {
                        font-size: 12px;
                        color: #fc4150;
                    }
                    .show-price {
                        font-size: 18px;
                        color: #fc4150;
                        margin-left: 3px;
                    }
                    .start-text {
                        font-size: 12px;
                        color: #ababab;
                        margin-left: 4px;
                    }
                    .origin-price {
                        font-size: 12px;
                        color: #767676;
                        text-decoration: line-through;
                        margin-left: 6px;
                    }
                }
                //   .detail-ydxz {
                //     padding-left: 15px;
                //     height: 16px;
                //     line-height: 16px;
                //     overflow: hidden;
                //     width: 100%;
                //     .ydxz-text {
                //       font-size: 12px;
                //       color: #00699e;
                //     }
                //   }
            }
            .detail-info-location {
                width: 60px;
                //   height: 123.5px;
                height: 100px;
                background-color: #fafafa;
                display: block;
                .detail-gotoLocetion {
                    width: 21.5px;
                    height: 20px;
                    margin-top: 40px;
                    margin-left: 19.5px;
                    .location-icon {
                        width: 21.5px;
                        height: 20px;
                    }
                }
            }
        }
        .start-end {
            //   height: 30px;
            //   line-height: 30px;
            padding: 7.5px 10px 10px 10px;
            background-color: #fff;
            border-top: 1px solid #f0f2f7;
            // border-bottom: 1px solid #ccc;
            //   overflow: hidden;
            .start-place {
                float: left;
                width: 50%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .icon-iconfont-dingwei1 {
                    font-size: 12px;
                    color: #f52e52;
                    display: inline;
                    vertical-align: middle;
                }
                .place-name {
                    display: inline;
                    vertical-align: middle;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, sans-serif;
                    color: #666;
                }
            }
        }
        .detail-ydxz {
            padding-top: 10px;
            padding-left: 10px;
            padding-bottom: 10px;
            padding-right: 10px;
            overflow: hidden;
            // width: 100%;
            background-color: #fff;
            .detail-order-date {
                margin-bottom: 12px;
                .date-title {
                    font-size: 12px;
                    color: #333;
                }
            }
            .ydxz-text {
                font-size: 12px;
                color: #333;
                height: 30px;
                // line-height: 42px;
                // margin-left: 5px;
                width: 29px;
                padding: 5px 15px;
                // height: 40px;
                border: 1px solid #cecccd;
                display: inline-block;
                // float: right;
                vertical-align: middle;
                border-radius: 4px;
            }
            .before-three-box {
                max-width: 294px;
                height: 42px;
                overflow: hidden;
                display: inline-block;
                vertical-align: middle;
                // float:left;
                .before-three {
                    width: 80px;
                    float: left;
                    border: 1px solid #cecccd;
                    text-align: center;
                    margin-right: 5px;
                    line-height: 18px;
                    height: 40px;
                    // padding: 2px 0;
                    border-radius: 4px;
                    .hasPrice {
                        color: #413838;
                        font-size: 12px;
                        padding: 2px 0;
                        .day {
                        }
                        .price {
                            color: #fc4150;
                        }
                    }
                    .noPrice {
                        color: #ccc;
                        background-color: #eee;
                        font-size: 12px;
                        padding: 2px 0;
                        .day {
                        }
                        .price {
                        }
                    }
                }
            }
        }

        .detail-info-content {
            width: 100%;
            background-color: #fff;
            // margin-top: 10px;
            .info-content-item {
                // margin-left: 10px;
                padding: 10px;
                border-bottom: 1px solid #f0f2f7;
                .icon-xingcheng {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
                .icon-feiyong {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
                .icon-xuzhi {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
                .icon-comment {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
                .icon-tuijian {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
                .content-item-title {
                    font-size: 18px;
                    color: #333;
                    font-weight: bold;
                    font-family: PingFangSC-Semibold, sans-serif;
                    display: inline-block;
                    vertical-align: middle;
                }
                .lookAll-comment {
                    float: right;
                    .more-text {
                        font-size: 12px;
                        color: #999;
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .icon-mores {
                        width: 11.5px;
                        height: 11.5px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-left: 6px;
                    }
                }
            }
            .info-content-main {
                padding: 10px;
                font-size: 13px;
                color: #666;
                // line-height: 20px;
                .detail-comment-ul {
                    // padding: 0 20px;
                    .detail-comment-li {
                        margin-bottom: 17.5px;
                        .comment-img {
                            width: 20px !important;
                            height: 20px;
                            border-radius: 50%;
                            float: left;
                            margin-top: 0;
                        }
                        .comment-name {
                            font-size: 14px;
                            color: #413838;
                            float: left;
                            height: 20px;
                            line-height: 20px;
                            margin-left: 13px;
                        }
                        .comment-date {
                            font-size: 12px;
                            color: #413838;
                            float: right;
                        }
                        .comment-content {
                            color: #413838;
                            font-size: 14px;
                            margin-top: 8.5px;
                        }
                    }
                }
                .tuijian-ul {
                    overflow-x: auto;
                    white-space: nowrap;
                    .tuijian-li {
                        width: 150px;
                        display: inline-block;
                        margin-right: 10px;
                        .tuijian-img {
                            width: 150px;
                            height: 100px;
                            display: block;
                            border-radius: 4px;
                        }
                        .tuijian-main {
                            .tuijian-title {
                                line-height: 18px;
                                font-size: 14px;
                                color: #333;
                                white-space: normal;
                                max-height: 36px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                            .tuijian-price-sale {
                                margin-top: 4px;
                                .tuijian-price {
                                    .tuijian-price-sign {
                                        color: #f01026;
                                        font-size: 12px;
                                    }
                                    .tuijian-price-price {
                                        color: #f01026;
                                        font-size: 18px;
                                        margin: 0 2px;
                                    }
                                    .tuijian-price-low {
                                        color: #999;
                                        font-size: 10px;
                                    }
                                }
                                .tuijian-sale {
                                    margin-left: 4px;
                                    .tuijian-sale-num {
                                        color: #999;
                                        font-size: 10px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .test-swiper-box {
            height: 210px;
            width: 100%;
            image {
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
</style>
