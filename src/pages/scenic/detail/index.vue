<template>
    <div class="detail-warp"
         :class="{overflow:canScroll}">
        <navbar title="景区详情"></navbar>
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
            <div class="swiper-box"
                 v-if="imgUrl.length">
                <!-- <swiper :imgUrl="imgUrl"></swiper> -->
                <div class="swiper-container">
                    <!-- <button @click.stop="test">zzzz</button> -->
                    <swiper class="swiper"
                            indicator-color="#f7f7f7"
                            indicator-active-color="#fff"
                            @change="currentChange"
                            :autoplay="autoplay"
                            :interval="interval"
                            :duration="duration">
                        <!-- <block > -->
                        <swiper-item v-for="(item,index) in imgUrl"
                                     :key="index">
                            <image @click="test"
                                   :src="item"
                                   class="slide-image" />
                            <!-- <button @click="test">tes{{index}}t</button> -->
                        </swiper-item>
                        <!-- </block> -->
                    </swiper>
                    <div class="dots-list">
                        <div v-for="(item,index) in imgUrl"
                             :key="index"
                             class="dots-item"
                             :class="{active:activeIndex==index}"></div>
                    </div>
                    <div class="detail-radius"></div>
                </div>
            </div>
            <!--详情页主要信息-->
            <div class="detail-info clearfix boxshadow">
                <div class="fl detail-info-main">
                    <h1 class="detail-info-title">
                        <!-- <i class="blf4"></i> -->
                        <span class="detail-info-ztitle">{{detailData.nickName}}</span>
                    </h1>

                    <!-- <p class="detail-info-ftitle one-line">{{detailData.subtitle}}</p> -->

                    <div class="detail-price">
                        <span class="money-sign">¥&nbsp;</span>
                        <span class="show-price">{{detailData.priceShow}}</span>
                        <span class="start-text">起</span>
                        <div class="subName-text"
                             v-if="detailData.subtitle">{{detailData.subtitle}}</div>
                        <div class="saled-num">已售{{detailData.virtualSale}}份</div>
                    </div>
                    <div class="detail-ydxz"
                         @click="toMustKnow(detailData.orderNotice)">
                        <span class="ydxz-text">预订须知</span><br>
                        <span class="ydxz-text1">详情</span>
                    </div>
                    <div class="arrow-detail">&#155;</div>
                    <div class="block-hr"></div>
                    <div class="pingfeng"
                         @click="toPinglun(detailData.countComment)">
                        <div :class="{xingxing:true, buliang:detailData.avgScore<.5}"></div>
                        <div :class="{xingxing:true, buliang:detailData.avgScore<1.5}"></div>
                        <div :class="{xingxing:true, buliang:detailData.avgScore<2.5}"></div>
                        <div :class="{xingxing:true, buliang:detailData.avgScore<3.5}"></div>
                        <div :class="{xingxing:true, buliang:detailData.avgScore<4.5}"></div>
                        <div class="pingfen-num"
                             v-if="detailData.avgScore!=0">{{detailData.avgScore}}<span style="font-size:12px">分</span></div>
                        <div class="pingfen-num"
                             style="font-size:10px; color:#ababab"
                             v-else>暂无评分</span></div>
                        <div class="pinglun">{{detailData.countComment}}条评论</div>
                    </div>
                    <div class="arrow-detail1"
                         @click="goUrl('pages/comment/main')">&#155;</div>
                </div>
            </div>
            <!--优惠券-->
            <div class="detail-info-content-coupon">
                <div class="hotel-info-item hotel-none-border"
                     v-if="twoCoupon.length">
                    <div class="hotel-info-label">领优惠券</div>
                    <div class="hotel-info-value">
                        <div>
                            <div class="hotel-info-coupon"
                                 @click='goCoupon'
                                 v-for="(item, index) in twoCoupon"
                                 :key="index">满{{item.targetAmout}}减{{item.amount}}</div>
                        </div>
                        <div class="hotel-info-arrow">&#155;</div>
                    </div>
                </div>
                <div class="hotel-info-item">
                    <div class="hotel_info_label">开园时间&nbsp;&nbsp;{{detailData.openTime}}</div>
                </div>
            </div>
            <!--优惠券-->
            <!--选择日期-->
            <div class="detail-info-content">
                <div class="info-content-item">选择日期</div>
                <div class="timeBox">
                    <img src="https://cdn.51dmq.com/ui/um/jianbian.png"
                         alt
                         class="jianbian">
                    <div class="timeOptBox">
                        <div class="timeBarBox"
                             :style="{width:((dateChoose.length+1)*75+5)+'px'}">
                            <div :class="{timeOption:true, timeOptionFirst:index==0, timeOptChoosed:dateNow==index}"
                                 v-for="(val, index) in dateChoose"
                                 @click="toChooseDate(index)">
                                <span :class="{tOptDate:true, tOptChoosed:dateNow==index}">{{val.date}}</span><br>
                                <span :class="{tOptPrice:true, tOptChoosed:dateNow==index}"><span :class="{tOptDao:true, tOptChoosed:dateNow==index}">¥&nbsp;</span>{{val.price}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="timeBtn"
                         @click="toShowDate">
                        <span>更多</span><br>
                        <span>日期</span>
                    </div>
                </div>
            </div>

            <!-- 可选票型 -->
            <div class="block_Box">
                <div class="block_title">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可选票型
                    <img class="title_icon"
                         src="https://cdn.51dmq.com/ui/um/kexuan.png"
                         alt>
                </div>
                <div class="cTicket_box"
                     v-show="val.priceSettle!==0"
                     v-for="(val, index) in ticketType">
                    <div class="cTicket_title">{{val.nickName}}</div>
                    <div class="cTicket_price"><span class="cTicket_span">¥&nbsp;</span>{{val.price_span[0]}}<span class="cTicket_span">.{{val.price_span[1]}}</span></div>
                    <div class="lable_box">
                        <div class="cTicket_lableTitle"
                             @click="itemToMustKnow(val.bookRemind)">预定须知</div>
                        <!-- <span class="cTicket_lableContent">提前一天预订</span> -->
                    </div>
                    <div class="cTicket_numBox">
                        <div :class="{cTicket_numBtn1:true, cTicket_enable:val.num<1}"
                             @click="toMin(index)">-</div>
                        <div class="cTicket_numShow">{{val.num}}</div>
                        <div :class="{cTicket_numBtn2:true, cTicket_enable:false}"
                             @click="toAdd(index)">+</div>
                    </div>
                </div>
            </div>

            <!-- 景区详情 -->
            <div class="block_Box">
                <div class="block_title">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;景区详情
                    <img class="title_icon"
                         src="https://cdn.51dmq.com/ui/um/xiangqing.png"
                         alt>
                </div>
                <div class="jqDetail_contentBox">
                    <div class="jqDetail_title">{{'杭州宋城'}}</div>
                    <div class="jqDetail_text"
                         v-html="detailData.content"
                         :class="toggHeight?'.newHeight':'.oldHeight'"></div>
                    <div class="seaMore"
                         v-if="this.detailData.content.length && this.detailData.content.length > 168"
                         @click="seaMore">查看更多</div>
                </div>
            </div>

            <div class="fnIconBox">
                <div class="fnContent">
                    <div class="fnIcon_optBox">
                        <img class="fnIcon_img"
                             src="https://cdn.51dmq.com/ui/um/jiemudan.png"
                             alt>
                        <div class="fnIcon_text">节目单</div>
                    </div>
                    <div class="fnIcon_optBox">
                        <img class="fnIcon_img"
                             src="https://cdn.51dmq.com/ui/um/meishi.png"
                             alt>
                        <div class="fnIcon_text">美食</div>
                    </div>
                    <div class="fnIcon_optBox">
                        <img class="fnIcon_img"
                             src="https://cdn.51dmq.com/ui/um/songli.png"
                             alt>
                        <div class="fnIcon_text">宋礼</div>
                    </div>
                    <div class="fnIcon_optBox">
                        <img class="fnIcon_img"
                             src="https://cdn.51dmq.com/ui/um/gonglue.png"
                             alt>
                        <div class="fnIcon_text">攻略</div>
                    </div>
                    <div class="fnIcon_optBox">
                        <img class="fnIcon_img"
                             src="https://cdn.51dmq.com/ui/um/daolang.png"
                             alt>
                        <div class="fnIcon_text">导览</div>
                    </div>
                </div>
            </div>

            <!-- 热门产品推荐 -->
            <recommend :cities="cities"
                       :parkIds="parkIds"
                       :productCodes="productCodess"
                       :ifShow="ifShow"></recommend>
            <!-- <div class="block_Box">
        <div class="block_title">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;热门产品推荐
          <img class="title_icon" src="https://cdn.51dmq.com/ui/um/remen.png" alt>
        </div>
        <div class="rmProduct_Box">
          <div class="rmProduct_content" :style="{width:(remenList.length*320-20)+'rpx'}">
            <div :class="{rmProduct_optBox:true, rmProduct_optBox_last:index==remenList.length-1}" v-for="(val, index) in remenList">
              <div class="rmProduct_imgBox">
                <img class="rmProduct_img" :src="val.pic" alt>
              </div>
              <div class="rmProduct_title">{{val.name}}</div>
              <div class="rmProduct_subBox">
                <div class="rmProduct_price"><span style="font-size:12px; font-weight:500">¥&nbsp;</span>{{val.price}}</div>
                <div class="rmProduct_saled">已售{{val.saled}}份</div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

            <div style="height:65px"></div>

            <!--详情页预订-->
            <div class="footBox">
                <div class="carBox">
                    <div :class="{footCarImg:true, footCar_imgFalse:false}"></div>
                    <div :class="{footCarText:true, footCar_false:false}">购物车</div>
                </div>
                <div class="total_carBox">
                    <div class="total_option1">票数: {{_Ticket}}</div>
                    <div class="total_option2">总额: <span style="font-size:10px">¥</span>{{_Price}}</div>
                </div>
                <div :class="{footBuyBtn_buy:true, footBtn_false_buy:_Ticket==0}"
                     @click="toOrderPage">立即订购</div>
                <div :class="{footBuyBtn_add:true, footBtn_false_add:true}"
                     @click="toAddToCar">加入购物车</div>
            </div>

            <!-- 订购须知弹框 -->
            <div class="mustBox"
                 :animation="animationData_back"
                 v-if="showMust"
                 @click="toCloseMustKnow">
                <div class="must_contentBox"
                     :animation="animationData_content"
                     @click.stop>
                    <div class="must_Title">预定须知</div>
                    <div class="must_mainBox">
                        <div class="must_text"
                             v-html="commentOrderNotice  || '没有预定须知'">

                        </div>
                    </div>
                    <div class="must_closeBtn"
                         @click="toCloseMustKnow">关闭</div>
                </div>
            </div>

            <um-date ref="um_date"
                     title="更多日期"
                     lastToday
                     :date="dateObj"
                     @selectDay="toSelectDay"></um-date>
        </div>
    </div>
</template>

<script>
    import api from "@/api/api";
    import navbar from "@/components/navbar";
    import umDate from './moreDate/index.vue';
    import recommend from '@/components/recommend'
    import {
        getData,
        postData,
        merchantInfoId,
        isauthorization,
        setUserInfo
    } from "@/common/common";
    // import swiper from "@/components/swiper";
    import wxParse from "@/components/htmlParse";

    export default {
        components: {
            wxParse,
            navbar,
            umDate,
            recommend
        },
        data() {
            return {
                commentOrderNotice: '',//预定须知
                dateObj: {
                    yearNow: null,
                    monthNow: null,
                    dayNow: null
                },
                twoCoupon: [],
                merchantParkInfoId: '',  // 店铺景区ID
                authorization: false, //用户是否授权
                activeIndexArr: [],
                addActiveIndex: null,
                noticeShow: false, //
                indexArr: [], //add对应的数组
                scenicDetail: "",
                orderDetail: "",
                imgUrl: [],
                showMust: false,
                animation: null,
                animation_back: null,
                animation_content: null,
                animationData: {},
                animationData_back: {},
                animationData_content: {},
                wayType: 1,
                detailData: {},
                commentData: [],
                itemData: [],
                currPage: "1",
                pageSize: "100",
                playDate: "",
                number: 0,
                showPicker: false,
                canScroll: false,
                isSinglebuy: 1,
                totalPrice: null,
                autoplay: true,
                interval: 2500,
                duration: 500,
                activeIndex: 0,
                indicatorDots: false,
                timeReserveListArr: [],
                activeName: "",
                noTimeDataArr: [],
                userLoca: false,
                isAuth: false,
                cities: " ",//推荐产品  城市id
                parkIds: '',//推荐产品  景区id
                productCodess: '',//推荐产品  产品id
                dateChoose: [
                    /*{
                      date:'11/25',
                      price:'320.00',
                      fullDate: '2020-01-01'
                    }*/
                ],
                dateNow: 0,
                ticketType: [
                    // {priceSettle:0.01, num:0, price_span:['0', '01'], nickName:'票型1'}
                ],
                remenList: [

                ],
                toggHeight: false
            };
        },
        methods: {
            seaMore() {
                if (this.detailData.content.length && this.detailData.content.length > 168) {
                    this.toggHeight = !this.toggHeight
                }
            },
            toAddToCar() {

                return;  // 暂无购物车
                this.goUrl('pages/order/car/main');
            },
            toSelectDay(obj) {
                let date = `${obj.m}/${obj.d}`;
                let isHave = {
                    is: false,
                    index: null
                };
                for (let i = 0; i < this.dateChoose.length; i++) {
                    if (this.dateChoose[i].date == date) {
                        isHave = {
                            is: true,
                            index: i
                        };
                        break;
                    }
                };
                if (isHave.is) {
                    this.dateNow = isHave.index;
                    this.toGetTeckitList();
                    this.$refs.um_date.toCloseDate();
                } else {
                    this.dateNow = 0;
                    getData('/merchant/webapi/getMinPrice', {
                        playDate: obj.full,
                        merchantParkInfoId: this.merchantParkInfoId,
                        merchantInfoId: merchantInfoId
                    }).then(data => {
                        if (data.status == 200) {
                            if ([obj.full] in data.data) {
                                this.dateChoose.unshift({
                                    date,
                                    price: data.data[obj.full] !== 0 ? data.data[obj.full].toFixed(2) : '--',
                                    fullDate: obj.full
                                });
                            } else {
                                this.dateChoose = [
                                    {
                                        date,
                                        price: '--',
                                        fullDate: obj.full
                                    }
                                ];
                            };
                        } else {
                            this.dateChoose = [
                                {
                                    date,
                                    price: '--',
                                    fullDate: obj.full
                                }
                            ];
                        };
                        this.toGetTeckitList();
                        this.$refs.um_date.toCloseDate();
                    }).catch(err => {
                        this.dateChoose = [
                            {
                                date,
                                price: '--',
                                fullDate: obj.full
                            }
                        ];
                        this.toGetTeckitList();
                        this.$refs.um_date.toCloseDate();
                    });
                };
            },
            toShowDate() {
                this.$refs.um_date.toShowDate();
            },
            toCloseDate() {
                this.$refs.um_date.toCloseDate();
            },
            toOrderPage() {
                if (this._Ticket == 0) {
                    wx.showToast({
                        title: '未选择任何票型!',
                        icon: 'none',
                        duration: 2000
                    });
                    return;
                }

                let arr = [];
                this.ticketType.forEach(val => {
                    if (val.num > 0) {
                        arr.push({
                            productName: this.detailData.nickName,
                            nickName: val.nickName,
                            modelCodes: val.modelCode,
                            amounts: val.num,
                            priceSettle: (val.priceSettle || val.priceSettle == 0) ? val.priceSettle : 0
                        });
                    }
                });

                this.goUrl(`pages/scenic/order/main?date=${this.dateChoose[this.dateNow].fullDate}&buyed_ticket=${JSON.stringify(arr)}&merchantParkInfoId=${this.merchantParkInfoId}`);
            },
            toChooseDate(index) {
                this.dateNow = index;
                this.dateObj.dayNow = this.dateChoose[this.dateNow].fullDate.split('-')[2];
                this.toGetTeckitList();
            },
            toPinglun(num) {
                if (num > 0) {
                    goUrl('pages/comment/main')
                } else {
                    wx.showToast({
                        title: '暂无评论!',
                        icon: 'none',
                        duration: 2000
                    });
                };
            },
            toGetTeckitList() {
                getData(api.ticket.detail.productItems, {
                    wayType: this.wayType,
                    merchantParkInfoId: this.merchantParkInfoId,
                    merchantInfoId: merchantInfoId,
                    currPage: this.currPage,
                    pageSize: this.pageSize,
                    playDate: this.dateChoose[this.dateNow].fullDate
                }).then(data => {
                    if (data.status == 200 && data.data.length > 0) {
                        data.data[0].ticketList.forEach((val, i, arr) => {
                            arr[i].num = 0;
                            let str = val.priceSettle !== undefined ? Number(val.priceSettle).toFixed(2) : '0.00';
                            arr[i].price_span = str.split('.');
                            if (val.priceSettle === undefined) arr[i].priceSettle = 0;
                        });
                        this.ticketType = data.data[0].ticketList;

                        let productCode = [];
                        this.ticketType.map(item => {
                            productCode.push(item.modelCode)
                        });
                        console.log("this景区", this.ticketType)
                        this.cities = this.ticketType[0].cityId ? this.showType[0].cityId : ''
                        wx.setStorageSync("wxxcx_citys", this.cities);
                        this.productCodess = productCode.join(',')
                        if (this.productCodess && this.productCodess != '') {
                            this.ifShow = true
                        }
                        wx.setStorageSync('xjsc_merchantProductCode', productCode.join(','))
                        this.searchCoupon({
                            productCodes: productCode.join(','),
                            merchantInfoId: merchantInfoId,
                            distributionPath: 0, // 4：个人中心
                            currPage: 1,
                            pageSize: 1000
                        }, this.searchCouponCB);
                    } else {
                        this.ticketType = [];
                    };
                }).catch(err => {
                    this.ticketType = [];
                });
            },
            toMustKnow(val) {
                this.commentOrderNotice = val
                this.showMust = true;
                setTimeout(() => {
                    this.animation_back.opacity(1).step();
                    this.animation_content.bottom(0).step();
                    this.animationData_back = this.animation_back.export();
                    this.animationData_content = this.animation_content.export();
                }, 100);
            },
            itemToMustKnow(val) {
                this.commentOrderNotice = val
                this.showMust = true;
                setTimeout(() => {
                    this.animation_back.opacity(1).step();
                    this.animation_content.bottom(0).step();
                    this.animationData_back = this.animation_back.export();
                    this.animationData_content = this.animation_content.export();
                });
            },
            toCloseMustKnow() {
                this.animation_back.opacity(0).step();
                this.animationData_back = this.animation_back.export();
                this.animation_content.bottom('-800rpx').step();
                this.animationData_content = this.animation_content.export();
                setTimeout(() => {
                    this.showMust = false;
                }, 600);
            },
            toMin(index) {
                if (this.ticketType[index].num > 0) this.ticketType[index].num--;
            },
            toAdd(index) {
                this.ticketType[index].num++;
            },
            handleToggle(num) {
                this.animation.bottom(num * 2 + "rpx").step();
                this.animationData = this.animation.export();
            },
            goUrl(path) {
                this.navigatePageTo(this.router + path);
            },
            success() {
                this.noticeShow = false;
                //缓存激活的票型下标
                if (this.activeIndexArr.indexOf(this.addActiveIndex) < 0) {
                    if (this.itemData[this.addActiveIndex].isFsyy == "T") {
                        let timeReserveListUrl = api.order.timeReserveList;
                        postData(timeReserveListUrl, {
                            externalCode: this.itemData[this.addActiveIndex].externalCode,
                            startTime: this.playDate,
                            endTime: this.playDate
                        }).then(resp => {
                            if (resp.status == 200) {
                                //判断接口返回正确后处理
                                if (resp.data.length > 0) {
                                    this.activeIndexArr.push(this.addActiveIndex);
                                    this.itemData[this.addActiveIndex].num++;
                                    this.getTotal();
                                    this.itemData[this.addActiveIndex].timeReserveListArr =
                                        resp.data;
                                    let FsyyTimes = {
                                        code: this.itemData[this.addActiveIndex].modelCode,
                                        startTime: this.itemData[this.addActiveIndex]
                                            .timeReserveListArr[0].startTime,
                                        endTime: this.itemData[this.addActiveIndex]
                                            .timeReserveListArr[0].endTime
                                    };
                                    this.itemData[
                                        this.addActiveIndex
                                    ].timeReserveListselected = FsyyTimes;
                                    this.itemData[this.addActiveIndex].timeReserveListArr.forEach(
                                        (it, indx) => {
                                            this.itemData[this.addActiveIndex].timeReserveListArr[
                                                indx
                                            ].code = this.itemData[this.addActiveIndex].modelCode;
                                        }
                                    );
                                } else {
                                    this.itemData[this.addActiveIndex].showTimeTips = true;
                                }
                            } else {
                                //请求报错处理
                            }
                        });
                    } else {
                        this.activeIndexArr.push(this.addActiveIndex);
                        this.itemData[this.addActiveIndex].num++;
                        this.getTotal();
                    }
                } else {
                    this.itemData[this.addActiveIndex].num++;
                    this.getTotal();
                }
            },
            //获取当前日期
            getCurDate() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
            getTotal() {
                let _this = this,
                    sum = 0;
                _this.number = 0;
                _this.itemData.forEach((item, index) => {
                    _this.number += item.num;
                    sum += item.num * item.priceSettle;
                });
                _this.totalPrice = sum.toFixed(2);
                return _this.totalPrice;
            },
            currentChange(test) {
                //轮播图下标改变
                this.activeIndex = test.mp.detail.current;
            },
            getAllSetting() {
                wx.getSetting({
                    success: result => {
                        Object.keys(result.authSetting).forEach((item, index) => {
                            if (item == "scope.userLocation") {
                                this.isAuth = true;
                            }
                        });
                        if (this.isAuth) {
                            if (result.authSetting["scope.userLocation"]) {
                                this.userLoca = true;
                            } else {
                                this.userLoca = false;
                            }
                        }
                    }
                });
            },
            searchCouponCB(res) {
                if (res.status == 200) {
                    this.twoCoupon = res.data.rows.splice(0, 2);
                }
            },
            goCoupon() {
                this.goUrl('pages/member/coupon/mycoupon/main?productCode=' + this.productCodess + '&distributionPath=' + 0)
            }
        },
        onLoad() {
            this.parkIds = this.$root.$mp.query.id
            this.merchantParkInfoId = this.$root.$mp.query.id;
            let _y = new Date().getFullYear();
            let _m = new Date().getMonth();
            let _d = new Date().getDate();
            getData('/merchant/webapi/getMinPrice', {
                playDate: `${_y}-${_m + 1 > 9 ? _m + 1 : '0' + (_m + 1)}-${_d > 9 ? _d : '0' + (_d)}`,
                merchantParkInfoId: this.merchantParkInfoId,
                merchantInfoId: merchantInfoId
            }).then(data => {
                if (data.status == 200) {
                    let arr = [];
                    for (let key in data.data) {
                        arr.push({
                            date: key.split('-')[1] + '/' + key.split('-')[2],
                            price: data.data[key] !== 0 ? Number(data.data[key]).toFixed(2) : '--',
                            fullDate: key
                        });
                    };
                    this.dateChoose = arr;
                    if (this.dateChoose.length > 0) this.toGetTeckitList();
                } else {
                    this.dateChoose = [];
                };
            }).catch(err => {
                this.dateChoose = [];
            });
            console.log(this.$root.$mp)
            //判断用户是否授权
            isauthorization("userInfo").then(res => {
                this.authorization = res;
            });

            this.playDate = this.getCurDate();
            let _this = this,
                recommendFlag = _this.$root.$mp.query.recommendFlag,
                leagureId = wx.getStorageSync("WxXjscUserInfo").leaguerId,
                payOrderNo = _this.$root.$mp.query.payOrderNo;

            let detailUrl = api.ticket.detail.main,
                commentUrl = api.main.comment.list,
                itemUrl = api.ticket.detail.productItems;

            if (recommendFlag && leagureId && payOrderNo) {
                var pd = getData(detailUrl, {
                    wayType: _this.wayType,
                    merchantParkInfoId: _this.merchantParkInfoId,
                    merchantInfoId: merchantInfoId,
                    recommendFlag: recommendFlag,
                    payOrderNo: payOrderNo,
                    leaguerId: leagureId
                });
            } else {
                var pd = getData(detailUrl, {
                    wayType: _this.wayType,
                    merchantParkInfoId: _this.merchantParkInfoId,
                    merchantInfoId: merchantInfoId
                });
            }
            let pc = getData(commentUrl, {
                wayType: _this.wayType,
                productType: "park",
                productCode: _this.$root.$mp.query.productCode,
                merchantInfoId: merchantInfoId
            });
            wx.showLoading({
                title: "加载中..."
            });
            Promise.all([pd, pc])
                .then(result => {
                    console.log(result);
                    _this.detailData = result[0].data;
                    _this.commentData = result[1].data;
                    _this.imgUrl = result[0].data.merchantPictureLibVo.wapUrl
                        ? result[0].data.merchantPictureLibVo.wapUrl.split(",")
                        : [];

                    // _this.scenicDetail = result[0].data.content.replace(/<\/?[>]*>/g, "");
                    _this.scenicDetail = result[0].data.content.replace(
                        /\<img/gi,
                        '<img style="max-width:100%;height:auto" '
                    );
                    // _this.orderDetail = result[0].data.orderNotice;
                    _this.orderDetail = result[0].data.orderNotice.replace(
                        /\<img/gi,
                        '<img style="max-width:100%;height:auto" '
                    );
                    // result[2].data.rows.forEach((item, index) => {
                    //   result[2].data.rows[index].num = 0;
                    // });
                    // _this.itemData = result[2].data.rows;
                    _this.isSinglebuy = result[0].data.orderType;
                    result[1].data.forEach(item => {
                        var reg = /^(.{1}).*(.{1})$/;
                        if (item.isAnonymous == "T") {
                            item.userName = item.userName
                                ? item.userName.replace(reg, "$1***$2")
                                : "";
                        }
                    });
                    wx.setStorageSync("orderInfo", result[0].data.orderNotice);
                    wx.showShareMenu({
                        withShareTicket: true
                    });
                    wx.hideLoading();
                })
                .catch(error => { });
            //计算总价
            _this.getTotal();
            //弹框动画
            _this.animation = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
            _this.animation_back = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
            _this.animation_content = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
        },
        computed: {
            _Ticket: function () {
                let num = 0;
                this.ticketType.forEach(val => {
                    num += val.num;
                });
                return num;
            },
            _Price: function () {
                let num = 0;
                this.ticketType.forEach(val => {
                    let _num = val.priceSettle !== undefined ? Number(val.priceSettle) : 0;
                    num += _num * val.num;
                });
                return num.toFixed(2);
            }
        },
        onUnload() {
            this.detailData.latitudeLongitude = [];
        },
        onShow() {
            this.getAllSetting();
        }
    };
</script>

<style lang="scss" scoped>
    @keyframes mymoveTo {
        from {
            max-height: 150px;
        }
        to {
            max-height: 320px;
        }
    }
    @keyframes mymoveBa {
        from {
            max-height: 320px;
        }
        to {
            max-height: 150px;
        }
    }
    .detail-warp {
        width: 100%;
        background-color: #f7f7f7;
        font-family: PingFangSC-Regular, sans-serif;
        .notice {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 750;
            font-family: PingFangSC-Regular, sans-serif;
            .body {
                width: 90%;
                background: #ffffff;
                border-radius: 2px;
                .title {
                    text-align: center;
                    color: #413838;
                    font-size: 16px;
                    height: 30px;
                    line-height: 30px;
                }
                .content {
                    padding: 15px 10px;
                    border-top: 0.5px solid #eeeee7;
                    font-size: 16px;
                    font-family: PingFangSC-Regular, sans-serif;
                    color: #413838;
                    word-break: break-all;
                    word-wrap: break-word;
                    .content-box {
                        overflow: auto;
                        max-height: 200px;
                        .img-box {
                            padding: 0;
                        }
                    }
                }
                .footer {
                    border-top: 0.5px solid #eeeee7;
                    .fail {
                        color: #413838;
                        font-size: 16px;
                        height: 49px;
                        line-height: 49px;
                        text-align: center;
                        width: 50%;
                    }
                    .success {
                        color: #fff;
                        background: #f05b47;
                        font-size: 16px;
                        height: 49.5px;
                        line-height: 49.5px;
                        text-align: center;
                        width: 50%;
                    }
                }
            }
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
                .detail-radius {
                    color: red;
                    width: 100%;
                    height: 8px;
                    background: white;
                    border-radius: 8px 8px 0 0;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    z-index: 500;
                }
                .swiper {
                    width: 100%;
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
            height: 123.5px;
            background-color: #fff;
            .detail-info-main {
                width: 360px;
                height: 130px;
                position: relative;
                .detail-info-title {
                    margin-left: 15px;
                    margin-top: 5px;
                    height: 20px;
                    line-height: 20px;
                    .detail-info-ztitle {
                        font-size: 18px;
                        color: #413838;
                        display: inline-block;
                        vertical-align: middle;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        width: 287px;
                    }
                }
                .detail-info-ftitle {
                    font-size: 12px;
                    color: rgba(65, 56, 56, 0.68);
                    margin-left: 15px;
                    margin-top: 7.5px;
                    margin-right: 7.5px;
                    line-height: 20px;
                }
                .detail-price {
                    padding-left: 15px;
                    margin-top: 10px;
                    .subName-text {
                        height: 18px;
                        line-height: 20px;
                        position: relative;
                        top: -4px;
                        color: #ef0017;
                        font-size: 12px;
                        display: inline-block;
                        padding-left: 5px;
                        padding-right: 8px;
                        border-radius: 9px;
                        margin-left: 10px;
                        border: 1px solid #ef0017;
                    }
                    .saled-num {
                        font-size: 12px;
                        color: #ababab;
                        display: inline-block;
                        float: right;
                        background: #f2f2f2;
                        position: relative;
                        top: 6px;
                        padding: 2px 4px;
                    }
                    .money-sign {
                        font-size: 12px;
                        color: #fc4150;
                    }
                    .show-price {
                        font-weight: 900;
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
                .detail-ydxz {
                    padding-left: 15px;
                    height: 45px;
                    margin-top: 10px;
                    .ydxz-text {
                        font-size: 16px;
                        color: #585858;
                    }
                    .ydxz-text1 {
                        font-size: 12px;
                        color: #ababab;
                        position: relative;
                        top: -5px;
                    }
                }
                .arrow-detail {
                    position: absolute;
                    bottom: 20px;
                    left: 155px;
                    font-size: 26px;
                    font-weight: 100;
                    color: #ababab;
                }
                .arrow-detail1 {
                    position: absolute;
                    bottom: 20px;
                    right: 0;
                    font-size: 26px;
                    font-weight: 100;
                    color: #ababab;
                }
                .block-hr {
                    width: 1px;
                    height: 35px;
                    background: #e4e4e4;
                    position: absolute;
                    bottom: 18px;
                    left: 175px;
                }
                .pingfeng {
                    width: 170px;
                    height: 45px;
                    position: absolute;
                    bottom: 12px;
                    right: 0;
                    .xingxing {
                        width: 18px;
                        height: 18px;
                        display: inline-block;
                        margin-right: 3px;
                        margin-top: 3px;
                        border-radius: 3px;
                        background: #ef0017
                            url(https://cdn.51dmq.com/ui/um/xingxing.png) no-repeat;
                        background-size: 80% 80%;
                        background-position: 1.8px 1.8px;
                    }
                    .buliang {
                        background: #dfdfdf
                            url(https://cdn.51dmq.com/ui/um/xingxing.png) no-repeat;
                        background-size: 80% 80%;
                        background-position: 1.8px 1.8px;
                    }
                    .pingfen-num {
                        display: inline-block;
                        font-size: 22px;
                        position: relative;
                        top: -2px;
                        color: #ef0017;
                        margin-left: 8px;
                    }
                    .pinglun {
                        font-size: 10px;
                        color: #ababab;
                    }
                }
            }
            .detail-info-location {
                width: 60px;
                height: 123.5px;
                background-color: #fafafa;
                display: block;
                .detail-gotoLocetion {
                    width: 21.5px;
                    height: 20px;
                    margin-top: 50px;
                    margin-left: 19.5px;
                    .location-icon {
                        width: 21.5px;
                        height: 20px;
                    }
                }
            }
            .auth-btn {
                padding: 0;
                text-align: left;
                background-color: #fafafa;
                width: 60px;
                height: 123.5px;
                border-radius: 0;
                border: none;
                image {
                    display: block;
                    margin-top: 50px;
                    margin-left: 19.5px;
                    width: 21.5px;
                    height: 20px;
                }
            }
            .auth-btn::after {
                border: none;
            }
        }
        .detail-info-content {
            width: calc(100% - 30px);
            padding: 15px 15px;
            background-color: #fff;
            margin-top: 10px;
            color: #585858;
            position: relative;
            .arrow-detail2 {
                position: absolute;
                right: 15px;
                top: 9px;
                font-size: 26px;
                font-weight: 100;
                color: #ababab;
            }
            .info-content-item {
                position: absolute;
                top: 18px;
                left: 15px;
                font-size: 16px;
            }
            .youhuiquan {
                width: 250px;
                margin-bottom: 15px;
                position: relative;
                left: 80px;
                line-height: 30px;
                font-size: 12px;
                color: white;
                .youhuiOption {
                    width: 115px;
                    height: 30px;
                    display: inline-block;
                    margin-right: 10px;
                    height: 30px;
                    background: url(https://cdn.51dmq.com/ui/um/youhuiquan.png);
                    background-size: 115px 30px;
                    position: relative;
                    .optionText {
                        width: 90px;
                        height: 30px;
                        text-align: center;
                        overflow: hidden;
                        position: absolute;
                        right: 5px;
                    }
                }
            }
            .openTime {
                font-size: 16px;
                .kaiyuan1 {
                    display: inline-block;
                }
                .kaiyuan2 {
                    display: inline-block;
                    margin-left: 18px;
                    font-size: 20px;
                }
            }
            .timeBox {
                width: 100%;
                height: 60px;
                margin-top: 42px;
                position: relative;
                .jianbian {
                    width: 20px;
                    height: 60px;
                    position: absolute;
                    left: calc(100% - 93px);
                    top: 0;
                    z-index: 10;
                }
                .timeOptBox {
                    width: calc(100% - 75px);
                    height: 60px;
                    position: relative;
                    background: white;
                    overflow-x: auto;
                    overflow-y: hidden;
                    .timeBarBox {
                        height: 60px;
                        .timeOption {
                            width: 68px;
                            height: 51px;
                            text-align: center;
                            padding-top: 4px;
                            border-radius: 3px;
                            border: 1px solid #cecccd;
                            float: left;
                            margin-right: 5px;
                            .tOptDate {
                                font-size: 12px;
                                color: #413838;
                                line-height: 18px;
                                position: relative;
                                top: -4px;
                            }
                            .tOptPrice {
                                color: #ef0017;
                                font-size: 16px;
                                line-height: 18px;
                                position: relative;
                                top: -4px;
                            }
                            .tOptDao {
                                font-size: 12px;
                                color: #ef0017;
                                line-height: 18px;
                            }
                            .tOptChoosed {
                                color: white;
                            }
                        }
                        .timeOptionFirst {
                            margin-left: 5px;
                        }
                        .timeOptChoosed {
                            border: 1px solid #ef0017;
                            background: #ef0017;
                        }
                    }
                }
                .timeBtn {
                    width: 68px;
                    height: 46px;
                    padding-top: 12px;
                    text-align: center;
                    font-size: 12px;
                    color: #ababab;
                    border-radius: 3px;
                    border: 1px solid #cecccd;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
        }
        .detail-info-content-coupon {
            background-color: #fff;
            margin-top: 10px;
            color: #333;
            position: relative;
            .hotel-info-item {
                display: flex;
                line-height: 45px;
                color: #333;
                border-top: 0.5px solid #f0f2f7;
                padding: 0px 10px;
                align-items: center;
                .hotel-info-label {
                    padding-left: 10px;
                    text-align: left;
                    font-size: 12px;
                }
                .hotel-info-coupon {
                    display: inline-block;
                    vertical-align: middle;
                    background-image: url("https://cdn.51dmq.com/ui/order/yhq-bg.png");
                    background-repeat: no-repeat;
                    background-size: 100%;
                    width: 77px;
                    height: 20px;
                    line-height: 20px;
                    text-indent: 16px;
                    white-space: nowrap;
                    color: #fff;
                    font-size: 10px;
                    margin-left: 12px;
                    box-shadow: 0px 2.5px #fde6e9;
                }
                .hotel-info-value {
                    font-size: 14px;
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .hotel-info-arrow {
                        font-size: 22px;
                        color: #c7c7c7;
                        position: relative;
                        top: -3px;
                    }
                }
                .hotel-info-bold {
                    font-weight: bold;
                }
            }
            .hotel-none-border {
                border-top: none;
            }
        }
        .mask {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 700;
        }
        .toast-box {
            .modal {
                padding-bottom: 49px;
                position: fixed;
                left: 0;
                bottom: -100%;
                width: 100%;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                background: #f7f7f7;
                z-index: 710;
                .modal-head {
                    color: #413838;
                    font-size: 18px;
                    font-family: PingFangSC-Medium, sans-serif;
                    padding: 0 15px;
                    height: 56.5px;
                    line-height: 56.5px;
                    .single-notice {
                        color: #999;
                        font-size: 14px;
                        padding-left: 5px;
                    }
                    .single-notice.active {
                        color: #f05b47;
                    }
                }
                .playDate {
                    color: #413838;
                    font-size: 14px;
                    .pxkx-text {
                        padding: 0 15px;
                        display: flex;
                        height: 56.5px;
                        justify-content: space-between;
                        align-items: center;
                        .name {
                            font-size: 18px;
                            color: #413838;
                            font-family: PingFangSC-Medium, sans-serif;
                        }
                        .close {
                            font-size: 23px;
                            color: #b2b2b2;
                        }
                    }
                    .picker-box {
                        width: calc(100% - 28px);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color: #fff;
                        padding-left: 15px;
                        padding-right: 13px;
                        height: 45px;
                        .playDate-text {
                            font-size: 16px;
                        }
                        .date-select-box {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .date-picker {
                                height: 34px;
                                margin-right: 4px;
                                line-height: 34px;
                                border-radius: 2px;
                                padding-left: 80px;
                            }
                            .jiantou-svg {
                                font-size: 12px;
                                color: #f05b47;
                            }
                        }
                        .icon-rili {
                            position: absolute;
                            left: 172px;
                            top: 9px;
                        }
                    }
                    .date-title {
                        margin-right: 2px;
                    }
                }
                .modal-content {
                    height: 265px;
                    padding-top: 20px;
                    background-color: #fff;
                    .order-px {
                        padding: 0 20px 0 15px;
                        .px-ul {
                            width: 100%;
                            .px-li {
                                width: 100%;
                                margin-bottom: 22px;
                                .px-left {
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                                .px-right {
                                    display: inline-block;
                                    vertical-align: middle;
                                    float: right;
                                }
                                .px-tips {
                                    width: 100%;
                                    font-size: 12px;
                                    color: #ff6363;
                                }
                                .px-name {
                                    width: 200px;
                                    color: #413838;
                                    font-size: 16px;
                                }
                                .px-price {
                                    margin-top: 2px;
                                    .money-sign {
                                        font-size: 12px;
                                        color: #fc4150;
                                        margin-right: 3px;
                                    }
                                    .nowprice {
                                        font-size: 18px;
                                        color: #fc4150;
                                        margin-right: 10px;
                                    }
                                    .oriprice {
                                        font-size: 12px;
                                        color: #767676;
                                        text-decoration: line-through;
                                    }
                                }
                                .px-right {
                                    .number {
                                        font-size: 18px;
                                        color: #413838;
                                        display: inline-block;
                                        vertical-align: middle;
                                        margin-right: 18px;
                                    }
                                    .sub {
                                        color: rgba(255, 99, 99, 1);
                                        font-size: 18px;
                                        border: 1px solid rgba(255, 99, 99, 1);
                                        border-right: none;
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
                                        border-right: none !important;
                                        color: rgba(255, 99, 99, 0.35) !important;
                                    }
                                }
                                .ydxz {
                                    font-size: 12px;
                                    color: #00699e;
                                    margin-top: 5px;
                                }
                                .fsyy-ul {
                                    .fsyy-li {
                                        float: left;
                                        font-size: 12px;
                                        color: #413838;
                                        border-radius: 3px;
                                        border: 1px solid #e4e4e4;
                                        text-align: center;
                                        padding: 5px;
                                        margin: 5px 5px 0 0;
                                    }
                                    .active {
                                        border: 1px solid #19a0f0;
                                        color: #19a0f0;
                                    }
                                }
                                .fsyy-tips {
                                    color: #f66;
                                    font-size: 12px;
                                    padding: 5px 0;
                                }
                            }
                        }
                    }
                }
                .next-step {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 49px;
                    background-color: #fff;
                    .next-left {
                        width: 50%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        .choose-label {
                            color: #413838;
                            font-size: 13px;
                            margin-right: 15px;
                            display: inline-block;
                        }
                        .choose-num-box {
                            padding-left: 15px;
                            .choose-num {
                                color: #413838;
                                font-size: 13px;
                                display: inline-block;
                            }
                        }
                        .total-price {
                            padding-left: 15px;
                            line-height: 16px;
                            margin-top: 2px;
                            .choose-num {
                                display: inline-block;
                                vertical-align: middle;
                                .money-sign {
                                    display: inline-block;
                                    vertical-align: middle;
                                    color: #fc4150;
                                    font-size: 12px;
                                    margin-right: 4px;
                                }
                                .totalPrice {
                                    display: inline-block;
                                    color: #fc4150;
                                    font-size: 18px;
                                    line-height: 16px;
                                }
                            }
                        }
                    }
                    .next-right {
                        width: 50%;
                        height: 100%;
                        .next-btn {
                            width: 100%;
                            text-align: center;
                            background-color: #f05b47;
                            color: #fff;
                            height: 49px;
                            line-height: 49px;
                            display: block;
                            font-size: 16px;
                        }
                        .next-btn2 {
                            background-color: #cbcbcb;
                        }
                    }
                }
            }
        }
    }

    .block_Box {
        width: calc(100% - 30px);
        background: white;
        margin-top: 10px;
        padding: 15px 15px;
        position: relative;
    }
    .block_title {
        height: 24px;
        line-height: 20px;
        font-size: 16px;
        padding-top: 2px;
        margin-bottom: 10px;
        position: relative;
    }
    .title_icon {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 0;
        top: 0;
    }

    .cTicket_box {
        width: 225px;
        padding: 11px 0;
        position: relative;
    }
    .cTicket_title {
        width: 100%;
        font-size: 16px;
        color: #413838;
        overflow: hidden;
    }
    .cTicket_price {
        font-size: 20px;
        font-weight: 900;
        color: #ef0017;
    }
    .cTicket_span {
        font-size: 12px;
        color: #ef0017;
        font-weight: 500;
    }
    .lable_box {
        width: 100%;
        font-size: 10px;
        margin-top: 3px;
    }
    .cTicket_lableTitle {
        display: inline-block;
        margin-right: 8px;
        border-radius: 10px;
        background: #fef2f3;
        color: #ef0017;
        width: 64px;
        text-align: center;
        padding: 2px 4px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
    }
    .cTicket_lableContent {
        color: #ababab;
    }

    .cTicket_numBox {
        width: 110px;
        height: 30px;
        position: absolute;
        left: 235px;
        top: 50%;
        transform: translate(0, -50%);
        -webkit-transform: translate(0, -50%);
    }
    .cTicket_numBtn1 {
        width: 30px;
        height: 30px;
        text-align: center;
        color: #ef0017;
        border: 1px solid #ef0017;
        line-height: 30px;
        border-radius: 5px 0 0 5px;
        position: absolute;
        left: 0;
        top: 0;
    }
    .cTicket_numBtn2 {
        width: 30px;
        height: 30px;
        text-align: center;
        color: #ef0017;
        border: 1px solid #ef0017;
        line-height: 30px;
        border-radius: 0 5px 5px 0;
        position: absolute;
        right: 0;
        top: 0;
    }
    .cTicket_enable {
        color: #ffabbf;
        border: 1px solid #ffabbf;
    }
    .cTicket_numShow {
        width: 42px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
        position: absolute;
        left: 34px;
    }

    .fnIconBox {
        width: calc(100% - 20px);
        background: white;
        margin-top: 10px;
        padding: 20px 10px;
        position: relative;
    }
    .fnContent {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .fnIcon_optBox {
        width: 60px;
        height: 80px;
        text-align: center;
        position: relative;
    }
    .fnIcon_img {
        width: 40px;
        height: 40px;
    }
    .fnIcon_text {
        width: 60px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #413838;
        display: inline-block;
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .jqDetail_contentBox {
        width: 100%;
        margin-top: 15px;
    }
    .jqDetail_title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
    }
    .jqDetail_text {
        width: 100%;
        display: block;
        overflow: hidden;
        line-height: 1.5;
        font-family: PingFang SC Regular;
        font-size: 14px;
        color: #666666;
        overflow-y: scroll;
        max-height: 150px;
    }
    .newHeight {
        animation: mymoveTo 500ms 1;
        -webkit-animation: mymoveTo 500ms 1;
        animation-fill-mode: forwards;
    }
    .oldHeight {
        animation: mymoveBa 500ms 1;
        -webkit-animation: mymoveBa 500ms 1;
        animation-fill-mode: forwards;
    }

    .seaMore {
        text-align: center;
        margin-top: 5px;
        font-size: 12px;
    }
    .hotel_info_label {
        font-size: 12px;
        font-weight: 900;
    }

    .rmProduct_Box {
        width: 100%;
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
        color: #413838;
        margin-top: 16rpx;
    }
    .rmProduct_subBox {
        width: 100%;
        font-size: 10px;
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
        float: right;
        margin-right: 20rpx;
        margin-top: 6rpx;
        color: #ababab;
    }

    .footBox {
        width: 100%;
        height: 60px;
        background: white;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 30;
    }
    .carBox {
        width: 80px;
        height: 60px;
        position: absolute;
        left: 0;
        top: 0;
    }
    .total_carBox {
        width: 80px;
        height: 60px;
        color: #413838;
        text-align: left;
        position: absolute;
        left: 80px;
        top: 0;
    }
    .total_option1 {
        width: 80px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        position: relative;
        top: 4px;
    }
    .total_option2 {
        width: 80px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        position: relative;
        top: -4px;
    }
    .footCarImg {
        width: 26px;
        height: 26px;
        margin-left: 24px;
        margin-top: 8px;
        background: url(https://cdn.51dmq.com/ui/um/buy.png) no-repeat;
        background-size: 26px 26px;
    }
    .footCar_imgFalse {
        background: url(https://cdn.51dmq.com/ui/um/buy1.png) no-repeat;
        background-size: 26px 26px;
    }
    .footCarText {
        text-align: center;
        font-size: 12px;
        color: #413838;
        margin-top: 2px;
    }
    .footCar_false {
        color: #ababab;
    }
    .footBuyBtn_buy {
        width: 90px;
        height: 36px;
        font-size: 14px;
        text-align: center;
        line-height: 38px;
        border-radius: 16px;
        float: right;
        margin-top: 13px;
        margin-right: 15px;
        background-image: linear-gradient(to right, #ef0017, #f7416c);
        color: white;
    }
    .footBtn_false_buy {
        background: #ababab;
    }
    .footBuyBtn_add {
        width: 90px;
        height: 32px;
        font-size: 14px;
        text-align: center;
        line-height: 32px;
        border: 2px solid #ef0017;
        border-radius: 16px;
        float: right;
        margin-top: 13px;
        margin-right: 10px;
        color: #ef0017;
    }
    .footBtn_false_add {
        border: 2px solid #ababab;
        color: #ababab;
    }

    .mustBox {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.35);
        opacity: 1;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100000001;
    }
    .must_contentBox {
        width: 100%;
        height: 400px;
        background: white;
        border-radius: 5px 5px 0 0;
        position: fixed;
        left: 0;
        bottom: -800rpx;
    }
    .must_Title {
        width: calc(100% - 40px);
        height: 80rpx;
        margin-left: 20px;
        margin-top: 20rpx;
        line-height: 80rpx;
        font-size: 16px;
        font-weight: 900;
        border-bottom: 1px solid #e0e0e0;
    }
    .must_mainBox {
        width: calc(100% - 40px);
        height: 540rpx;
        margin-top: 20rpx;
        margin-left: 20px;
        overflow-y: auto;
        position: relative;
    }
    .must_text {
        line-height: 26px;
        font-size: 14px;
        color: #413838;
    }
    .must_closeBtn {
        width: 70%;
        height: 70rpx;
        border-radius: 45rpx;
        border: 2px solid #ef0017;
        text-align: center;
        line-height: 70rpx;
        margin-left: 15%;
        margin-top: 40rpx;
        font-size: 14px;
        color: #ef0017;
    }
</style>
