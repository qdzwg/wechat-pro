<template>
    <div class="detail-warp"
         :class="{overflow:canScroll}">
        <navbar title="演出详情"></navbar>
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
                    <!-- <div class="dots-list">
            <div
              v-for="(item,index) in imgUrl"
              :key="index"
              class="dots-item"
              :class="{active:activeIndex==index}"
            ></div> -->
                    <div class="swiper-page">
                        {{activeIndex+1+"/"+imgUrl.length}}
                    </div>
                </div>
                <div class="detail-radius"></div>
            </div>
        </div>
        <div class="show-detail-wrap">
            <!--详情页主要信息-->
            <div class="detail-info clearfix boxshadow">
                <div class="fl detail-info-main">
                    <h1 class="detail-info-title">
                        <!-- <i class="blf4"></i> -->
                        <span class="detail-info-ztitle">{{detailData.nickName}}</span>
                    </h1>

                    <!-- <p class="detail-info-ftitle one-line">{{detailData.subtitle}}</p> -->

                    <div class="detail-price">
                        <div class="price-l">
                            <span class="money-sign">¥&nbsp;</span>
                            <span class="show-price">{{detailData.priceShow}}</span>
                            <span class="start-text">起</span>
                            <div class="subName-text"
                                 v-if="detailData.subtitle">{{detailData.subtitle}}</div>
                        </div>
                        <div class="saled-num">已售{{detailData.virtualSale}}份</div>
                    </div>
                    <div class="detail-ydxz"
                         @click="toMustKnow(detailData.orderNotice)">
                        <span class="ydxz-text">预订须知</span>
                        <span class="ydxz-text1">详情</span>
                    </div>
                    <div class="arrow-detail"></div>
                    <div class="block-hr"></div>
                    <div class="pingfeng">
                        <div :class="{xingxing:true, buliang:false}"></div>
                        <div :class="{xingxing:true, buliang:false}"></div>
                        <div :class="{xingxing:true, buliang:false}"></div>
                        <div :class="{xingxing:true, buliang:false}"></div>
                        <div :class="{xingxing:true, buliang:true}"></div>
                        <div class="pingfen-num">{{detailData.avgScore||4.8}}<span style="font-size:12px;font-family:PingFang SC Medium">分</span></div>
                        <div class="pinglun">{{detailData.countComment||118}}条评论</div>
                    </div>
                    <div class="arrow-detail1"></div>
                </div>
            </div>
            <!--优惠券-->
            <div class="detail-info-content">
                <div class="arrow-detail2"></div>
                <div class="coupon-wrap"
                     v-if="twoCoupon.length">
                    <div class="info-content-item"
                         v-if="true">领优惠券</div>
                    <div class="youhuiquan"
                         v-if="true">
                        <div class="youhuiOption"
                             v-for="(item, index) in twoCoupon"
                             @click='goCoupon'
                             :key="index">
                            <div class="optionText">满{{item.targetAmout}}减{{item.amount}}</div>
                        </div>
                    </div>
                </div>
                <div class="openTime">
                    <div class="kaiyuan1">开园时间</div>
                    <div class="kaiyuan2">{{detailData.openTime||'08:00'}} - {{detailData.endTime||'16:00'}}</div>
                </div>
            </div>
            <!--选择日期-->
            <div class="detail-info-content select-date-wrap">
                <div class="info-content-item select-times">选择日期</div>
                <div class="timeBox">
                    <img src="https://cdn.51dmq.com/ui/showImg/jianbian.png"
                         alt
                         class="jianbian">
                    <div class="timeOptBox">
                        <div class="timeBarBox"
                             :style="{width:(dateChoose.length*75+5)+'px'}">
                            <div :class="{timeOption:true, timeOptionFirst:index==0, timeOptChoosed:dateNow==index}"
                                 v-for="(val, index) in dateChoose"
                                 @click="toggleDateTime(index)">
                                <span :class="{tOptDate:true, tOptChoosed:dateNow==index}">{{val.date}}</span><br>
                                <span :class="{tOptPrice:true, tOptChoosed:dateNow==index}"><span :class="{tOptDao:true, tOptChoosed:dateNow==index}">{{(index==0 || isNotShowFlag) ?"":"¥&nbsp;"}}</span>{{val.price}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="timeBtn"
                         @click="calendarToggle">
                        <!-- <div class="timeBtn"
                         @click="goUrl('pages/show/detail/mpvueCalendar/main?id='+routeId+'&routeCode='+routeCode)"> -->
                        <p>更多</p>
                        <p>日期</p>
                    </div>
                </div>
            </div>

            <div class="show-scene">
                <div class="show-tip"
                     v-if="showTimeStr.length && showTimeStr.length>0">请选择场次</div>
                <div class="scene-ul"
                     :class="(showTimes.length&&showTimes.length>4)?'scene-flex':''">
                    <li v-for="(item,index) in showTimeStr"
                        :key='index'
                        @click="changeTime(index)"
                        :class="showTimeSelect == index?'selected':''">
                        {{item}}
                        <div class="i_wrap"
                             v-if="showTimeSelect ==index">
                            <i></i>
                        </div>
                    </li>
                </div>
                <div class="scene-more"
                     v-if="showTimes.length&&showTimes.length>5?'selected':''"
                     @click="getMoreTime">查看更多</div>
            </div>

            <!-- 可选票型 -->
            <div class="block_Box select-tickets">
                <div class="block_title">
                    <img class="title_icon"
                         src="https://cdn.51dmq.com/ui/showImg/kexuan.png"
                         alt>
                    可选票型
                </div>
                <div class="cTicket_box"
                     v-for="(val, index) in showType">
                    <div class="cTicket_title">{{val.name}}</div>
                    <div class="cTicket_price"><span class="cTicket_span">¥&nbsp;</span>{{val.salePricePre}}<span class="cTicket_span">.{{val.salePriceEnd}}</span></div>
                    <div class="lable_box">
                        <div class="cTicket_lableTitle"
                             @click="itemToMustKnow(val.bookExplain)">预订须知</div>
                        <!-- <span class="cTicket_lableContent">提前一天预订</span> -->
                    </div>
                    <div class="cTicket_numBox">
                        <div :class="{cTicket_numBtn1:true, cTicket_enable:val.minSaleStock<1}"
                             @click="toMin(index)">-</div>
                        <div class="cTicket_numShow">{{val.minSaleStock}}</div>
                        <div :class="{cTicket_numBtn2:true, cTicket_enable:false}"
                             @click="toAdd(index,val.saleStock)">+</div>
                    </div>
                </div>
            </div>

            <!-- 景区详情 -->
            <div class="block_Box select-tickets">
                <div class="block_title">
                    <img class="title_icon"
                         src="https://cdn.51dmq.com/ui/showImg/xiangqing.png"
                         alt>
                    演出介绍
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
                             src="https://cdn.51dmq.com/ui/showImg/icon_01.png"
                             alt>
                        <div class="fnIcon_text">节目单</div>
                    </div>
                    <div class="fnIcon_optBox">
                        <img class="fnIcon_img"
                             src="https://cdn.51dmq.com/ui/showImg/icon_02.png"
                             alt>
                        <div class="fnIcon_text">美食</div>
                    </div>
                    <div class="fnIcon_optBox">
                        <img class="fnIcon_img"
                             src="https://cdn.51dmq.com/ui/showImg/icon_03.png"
                             alt>
                        <div class="fnIcon_text">宋礼</div>
                    </div>
                    <div class="fnIcon_optBox">
                        <img class="fnIcon_img"
                             src="https://cdn.51dmq.com/ui/showImg/icon_04.png"
                             alt>
                        <div class="fnIcon_text">攻略</div>
                    </div>
                    <div class="fnIcon_optBox">
                        <img class="fnIcon_img"
                             src="https://cdn.51dmq.com/ui/showImg/icon_05.png"
                             alt>
                        <div class="fnIcon_text">导览</div>
                    </div>
                </div>
            </div>
            <recommend :cities="cities"
                       :parkIds="parkIds"
                       :productCodes="productCodess"
                       :ifShow="ifShow"></recommend>
            <!-- 热门产品推荐 -->
            <!-- <div class="block_Box select-tickets">
                <div class="block_title">
                    <img class="title_icon"
                         src="https://cdn.51dmq.com/ui/showImg/remen.png"
                         alt>
                    热门产品推荐
                </div>
                <div class="rmProduct_Box">
                    <div class="rmProduct_content"
                         :style="{width:(remenList.length*320-20)+'rpx'}">
                        <div :class="{rmProduct_optBox:true, rmProduct_optBox_last:index==remenList.length-1}"
                             v-for="(val, index) in remenList">
                            <div class="rmProduct_imgBox">
                                <img class="rmProduct_img"
                                     :src="val.pic"
                                     alt>
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
        </div>

        <div style="height:60px"></div>

        <!--详情页预订-->
        <div class="footBox">
            <div class="carBox">
                <div :class="{footCarImg:true, footCar_imgFalse:false}"></div>
                <div :class="{footCarText:true, footCar_false:false}">购物车</div>
            </div>
            <div class="footTotalPrice">
                <div class="choose-num-box">
                    <span class="choose-label">已选：</span>
                    <span class="choose-num">{{newnumber}}</span>
                </div>
                <div class="total-price">
                    <span class="choose-label">总额：</span>
                    <span class="choose-num">
                        <em class="money-sign">¥&nbsp;</em>
                        <em class="totalPrice">{{totalNewPrice}}</em>
                    </span>
                </div>
            </div>
            <div :class="{footBuyBtn_buy:true, footBtn_false_buy:false}"
                 v-if="newnumber>0">
                <template v-if="authorization">
                    <span class="next-btn"
                          @click="newcheckIfgo">立即订购</span>
                </template>
                <button v-else
                        open-type="getUserInfo"
                        @getuserinfo="newgetUserInfo"
                        class="authorization-btn">立即订购</button>
            </div>
            <div :class="{footBuyBtn_buy:true, footBtn_false_buy:true}"
                 v-else>
                <span class="next-btn">立即订购</span>
            </div>
            <!-- <div :class="{footBuyBtn_add:true, footBtn_false_add:false}"
                 @click="buyAddCar"
                 v-if="newnumber>0">加入购物车</div>
            <div :class="{footBuyBtn_add:true, footBtn_false_add:true}"
                 v-else>加入购物车</div> -->
        </div>

        <!-- <div class="next-right fr">
                        <template v-if="authorization">
                            <span v-if="number>0"
                                  class="next-btn"
                                  @click="checkIfgo">下一步</span>
                            <span v-else
                                  class="next-btn next-btn2">下一步</span>
                        </template>
                        <button v-else
                                open-type="getUserInfo"
                                @getuserinfo="getUserInfo"
                                class="authorization-btn">下一步</button>
                    </div> -->

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

        <!-- 评论弹框 -->
        <div class="plBox">

        </div>

        <!--预订弹框-->
        <div class="toast-box">
            <div v-if="show"
                 @click="closeModal"
                 class="mask"></div>
            <div :animation="animationData"
                 class="modal"
                 catchtouchmove="’true’">
                <slot name="header">
                    <div class="section playDate">
                        <div class="pxkx-text">
                            <span class="name">可选时间</span>
                            <i @click="closeModal"
                               class="fr close xx-icon icon-guanbi2"></i>
                        </div>
                        <div class="picker-box">
                            <div class="playDate-text">游玩时间</div>
                            <div class="date-select-box">
                                <picker mode="date"
                                        :value="playDate"
                                        :start="startDate"
                                        @change="bindDateChange"
                                        class="date-picker">
                                    <div class="picker">{{playDate}}</div>
                                </picker>
                                <span class="xx-icon icon-iconfont-jiantou jiantou-svg"></span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-head clearfix">
                        可选票型
                        <span v-if="isSinglebuy=='2'"
                              class="single-notice"
                              :class="{active:addNum>1}">(一次只能预定一种票型)</span>
                    </div>
                </slot>
                <div class="modal-content">
                    <scroll-view :style="{'height': '265px'}"
                                 :scroll-y="true"
                                 @scrolltolower="scrolltolower"
                                 @scroll="scroll">
                        <div class="order-px">
                            <div v-if="itemData.length>0"
                                 class="px-ul">
                                <div v-for="(item,index) in itemData"
                                     :key="index"
                                     class="px-li clearfix">
                                    <div class="clearfix">
                                        <div class="px-left">
                                            <p class="px-name two-line">{{ item.nickName }}</p>
                                            <p class="px-price">
                                                <span class="money-sign">¥&nbsp;</span>
                                                <span class="nowprice">{{ item.priceSettle }}</span>
                                                <span class="oriprice">{{ item.merchantLinePrice }}</span>
                                            </p>
                                            <p class="ydxz"
                                               @click="goUrl('pages/scenic/detail/orderInfo/main?id='+item.id+'&playDate='+playDate)">预订须知</p>
                                        </div>
                                        <div class="px-right">
                                            <span class="number">{{item.num}}</span>
                                            <span class="sub"
                                                  :class="{sub0:item.num==0}"
                                                  @click.stop="sub(index, item)">-</span>
                                            <span class="add"
                                                  @click.stop="add(index, item)">+</span>
                                        </div>
                                    </div>
                                    <div v-if="item.timeReserveListArr.length>0"
                                         class="fsyy-ul clearfix">
                                        <div v-for="(iet, ide) in item.timeReserveListArr"
                                             :key="ide"
                                             :class="{active: ide==timeIndexArr[index]}"
                                             class="fsyy-li"
                                             @click="selectedTime(iet, ide,index)">{{iet.startTime}} - {{iet.endTime}}</div>
                                    </div>
                                    <div v-if="item.showTimeTips"
                                         class="fsyy-tips">当前游玩日期没有可选时间段，换个日期试试</div>
                                </div>
                            </div>
                            <!--没有数据-->
                            <div v-else
                                 class="noData">
                                <!-- <i class="xx-icon icon-iconfont-gantanhaom nodate-svg"></i> -->
                                <span class="nodata-text">暂无票型</span>
                            </div>
                            <!--没有数据-->
                        </div>
                    </scroll-view>
                </div>

                <div class="next-step clearfix">
                    <div class="next-left fl">
                        <div>
                            <div class="choose-num-box">
                                <span class="choose-label">已选：</span>
                                <span class="choose-num">{{number}}</span>
                            </div>
                            <div class="total-price">
                                <span class="choose-label">总额：</span>
                                <span class="choose-num">
                                    <em class="money-sign">¥&nbsp;</em>
                                    <em class="totalPrice"
                                        id="totalPrice">{{totalPrice}}</em>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="next-right fr">
                        <template v-if="authorization">
                            <span v-if="number>0"
                                  class="next-btn"
                                  @click="checkIfgo">下一步</span>
                            <span v-else
                                  class="next-btn next-btn2">下一步</span>
                        </template>
                        <button v-else
                                open-type="getUserInfo"
                                @getuserinfo="getUserInfo"
                                class="authorization-btn">下一步</button>
                    </div>
                </div>
            </div>
        </div>
        <!--预订弹框-->

        <!-- 购票提醒 -->
        <div v-if="noticeShow"
             @click="fail"
             class="notice">
            <div class="body">
                <div class="title">购票提醒</div>
                <div class="content">
                    <div class="content-box">
                        <wx-parse :contentstr="noticeStr"></wx-parse>
                    </div>
                </div>
                <div class="footer clearfix">
                    <span @click.stop="fail"
                          class="fl fail">不同意</span>
                    <span @click.stop="success"
                          class="fr success">同意</span>
                </div>
            </div>
        </div>
        <!-- 购票提醒 -->
        <!-- 日历 -->
        <showCalendar :calendarShow='calendarShow'
                      @calendarToggle='calendarToggle'
                      :currDate='dataTime'
                      @toggleFlag='toggleFlag'></showCalendar>
        <!-- 日历 -->
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
        setUserInfo,
    } from "@/common/common";
    import showCalendar from '@/pages/show/detail/mpvueCalendar'
    // import swiper from "@/components/swiper";
    import wxParse from "@/components/htmlParse";
    import recommend from '@/components/recommend'
    var moment = require('moment');
    export default {
        components: {
            wxParse,
            navbar,
            recommend,
            showCalendar
        },
        data() {
            return {
                commentOrderNotice: '',//预定须知
                calendarShow: false,//日历展示
                productCodeAll: '',
                twoCoupon: [],
                isNotShowFlag: true,//日期中是否显示￥
                timeIndexArr: [],
                authorization: false, //用户是否授权
                noticeStr: "",
                activeIndexArr: [],
                addActiveIndex: null,
                noticeShow: false, //
                indexArr: [], //add对应的数组
                addNum: 0, //add添加次数
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
                show: false,
                wayType: 1,
                detailData: {},
                commentData: [],
                itemData: [],
                currPage: "1",
                pageSize: "100",
                playDate: "",
                startDate: this.getCurDate(),
                number: 0,
                newnumber: 0,
                showPicker: false,
                canScroll: false,
                isSinglebuy: 1,
                totalPrice: null,
                totalNewPrice: 0,
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
                ifShow: false,
                dateChoose: [
                    {
                        date: '11/25',
                        price: '320.00'
                    },
                    {
                        date: '11/26',
                        price: '320.00'
                    },
                    {
                        date: '11/27',
                        price: '320.00'
                    },
                    {
                        date: '11/28',
                        price: '320.00'
                    },
                    {
                        date: '11/29',
                        price: '320.00'
                    },
                    {
                        date: '11/30',
                        price: '320.00'
                    },
                    {
                        date: '12/01',
                        price: '320.00'
                    }
                ],
                showTimes: [//场次时间
                    "9:30", "11:30", "12:30", "13:30"
                ],
                showTimeSelect: 0,//场次索引
                showMoreTime: false,//查看更多
                dateNow: 0,
                showType: [
                ],
                cities: "",//推荐产品  城市id
                parkIds: '',//推荐产品  景区id
                productCodess: '',//推荐产品  产品id
                toggHeight: false
            };
        },
        methods: {
            seaMore() {
                if (this.detailData.content.length && this.detailData.content.length > 168) {
                    this.toggHeight = !this.toggHeight
                }
            },
            toggleFlag() {
                this.calendarShow = !this.calendarShow
            },
            calendarToggle(val) {
                this.calendarShow = !this.calendarShow
                if (val.length && val.length > 0) {
                    this.playDate = val
                }
            },
            buyAddCar() {
                wx.showToast({
                    title: '加入购物车成功',
                    icon: 'success',
                    duration: 2000
                })
                // wx.showModal({
                //     title: '注意',
                //     content: '这是一个模态弹窗',
                //     success(res) {
                //         if (res.confirm) {
                //             console.log('用户点击确定')
                //         } else if (res.cancel) {
                //             console.log('用户点击取消')
                //         }
                //     }
                // })
            },
            saveShowOrder() {

            },
            toggleDateTime(i) {//日期切换

                this.dateNow = i;
                this.showTimeSelect = 0;//日期切换 
                console.log(this.dateNow)
                console.log(this.dataTime)
                getData(api.show.detail.main, {
                    merchantId: wx.getStorageSync('xjsc_merchantInfoId'),
                    merchantParkId: this.$root.$mp.query.id,
                    playDate: this.dataTime
                }).then(res => {
                    console.log("切换日期获取数据", res)
                    this.showTimes = res.sessionList;
                    this.showType = res.data;
                    // 查询优惠券
                    this.productCodeAll = [];
                    this.showType.map(item => {
                        if (item.salePrice) {
                            item.salePricePre = item.salePrice.toFixed(2).split('.')[0]
                            item.salePriceEnd = item.salePrice.toFixed(2).split('.')[1]
                        } else {
                            item.salePricePre = '0'
                            item.salePriceEnd = '00'
                        }
                        this.productCodeAll.push(item.modelCode)
                    })
                    this.searchCoupon({
                        productCodes: this.productCodeAll.join(','),
                        merchantInfoId: merchantInfoId,
                        distributionPath: 0, // 4：个人中心
                        currPage: 1,
                        pageSize: 1000
                    }, this.searchCouponCB);
                    this.cities = this.showType[0].cityId ? this.showType[0].cityId : ''
                    this.productCodess = this.productCodeAll.join(',');
                    if (this.productCodess && this.productCodess != '') {
                        this.ifShow = true
                    }
                    wx.setStorageSync("wxxcx_citys", this.cities);
                    wx.setStorageSync('xjsc_merchantProductCode', this.productCodeAll.join(','))
                })
            },
            getMoreTime() {
                this.showMoreTime = !this.showMoreTime
            },
            changeTime(i) {
                this.showTimeSelect = i
            },
            momentWeek(str) {
                let returnStr = "星期"
                switch (str) {
                    case 0:
                        returnStr = "星期日";
                        break;
                    case 1:
                        returnStr = "星期一";
                        break;
                    case 2:
                        returnStr = "星期二";
                        break;
                    case 3:
                        returnStr = "星期三";
                        break;
                    case 4:
                        returnStr = "星期四";
                        break;
                    case 5:
                        returnStr = "星期五";
                        break;
                    case 6:
                        returnStr = "星期六";
                        break;

                }
                return returnStr;
            },
            formatDateList(arr, newPlayDate) {
                let midDate;
                arr.forEach((item, index) => {
                    item.date = moment(newPlayDate).add(index, 'day').format("MM/DD");
                    item.FullDate = midDate = moment(newPlayDate).add(index, 'day').format("YYYY-MM-DD");
                    item.FullTimeStap = new Date(midDate);
                    item.price = this.momentWeek(moment(newPlayDate).add(index, 'day').weekday());

                }, newPlayDate)
                console.log(this.dateChoose)
            },
            firstDateFormat(arr) {
                console.log(this.getCurDate())
                console.log(arr[0].FullDate)
                if (arr.length > 0 && arr[0].FullDate == this.getCurDate()) {
                    arr[0].date = "今天"
                    // console.log('格式化日期')
                    // console.log(moment().format("DD/MM"))
                    // console.log('格式化日期', moment().subtract(3, 'day').weekday())
                    // console.log(moment().days("2019-12-17"))
                }
            },
            toMustKnow(val) {
                this.commentOrderNotice = val
                this.showMust = true;
                setTimeout(() => {
                    this.animation_back.opacity(1).step();
                    this.animation_content.bottom(0).step();
                    this.animationData_back = this.animation_back.export();
                    this.animationData_content = this.animation_content.export();
                });
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
                if (this.showType[index].minSaleStock > 0) {
                    this.showType[index].minSaleStock--;
                    this.getNewTotal();
                };
            },
            toAdd(index, max) {
                if (!this.showType[index].minSaleStock || this.showType[index].minSaleStock < max) {
                    this.showType[index].minSaleStock++;
                    this.getNewTotal()
                }
            },
            // getUserInfo(e) {
            //     if (e.mp.detail.userInfo) {
            //         //授权成功
            //         this.authorization = true;
            //         //huancu
            //         setUserInfo().then(res => {
            //             if (this.number > 0) {
            //                 this.newcheckIfgo();
            //             }
            //         });
            //     } else {
            //         // 授权失败-除非微信自己出问题了
            //     }
            // },
            newgetUserInfo(e) {
                if (e.mp.detail.userInfo) {
                    //授权成功
                    this.authorization = true;
                    //huancu
                    setUserInfo().then(res => {
                        this.newcheckIfgo();
                        // if (this.number > 0) {
                        //     this.checkIfgo();
                        // }
                    });
                } else {
                    // 授权失败-除非微信自己出问题了
                }
            },
            openModal() {
                this.activeIndexArr = [];
                this.addActiveIndex = null;
                this.noticeShow = false; //
                this.indexArr = []; //add对应的数组
                this.addNum = 0; //add添加次数
                this.totalPrice = 0;
                this.number = 0;
                let _this = this;
                _this.canScroll = true;
                _this.show = true;
                _this.handleToggle(0);
                let itemUrl = api.ticket.detail.productItems,
                    saleStatusUrl = api.ticket.detail.getSaleStatusByModelCode;
                let pp = getData(itemUrl, {
                    wayType: _this.wayType,
                    merchantParkInfoId: _this.$root.$mp.query.id,
                    merchantInfoId: merchantInfoId,
                    currPage: _this.currPage,
                    pageSize: _this.pageSize,
                    playDate: _this.playDate
                }).then(res => {
                    res.data.rows.forEach((item, index) => {
                        res.data.rows[index].num = 0;
                        res.data.rows[index].timeReserveListArr = [];
                    });
                    _this.itemData = res.data.rows;
                    this.timeIndexArr = Array.apply(null, Array(this.itemData.length)).map(
                        () => 0
                    );
                    wx.hideLoading();
                });
            },
            closeModal() {
                this.canScroll = false;
                this.show = false;
                this.handleToggle(-600);
            },
            handleToggle(num) {
                this.animation.bottom(num * 2 + "rpx").step();
                this.animationData = this.animation.export();
            },
            scrolltolower() { },
            scroll(e) { },
            goUrl(path) {
                this.navigatePageTo(this.router + path);
            },
            //加减运算
            sub(index, idata) {
                if (this.itemData[index].num > 0) {
                    this.itemData[index].num--;
                    this.getTotal();
                }
                if (this.itemData[index].num == 0 && idata.isFsyy == "T") {
                    this.itemData[index].timeReserveListArr = [];
                    this.itemData[index].timeReserveListselected = {};
                    this.getTotal();
                }
            },
            add(index, idata) {
                //缓存当前index
                this.addActiveIndex = index;
                if (idata.isFsyy && idata.isFsyy == "T") {
                    //分时预约票
                    if (this.isSinglebuy == "2") {
                        //单票型处理
                        if (this.indexArr.indexOf(index) < 0) {
                            this.indexArr.push(index);
                            this.addNum++;
                        }
                        if (this.itemData[index].isShowTicketNotice == "T") {
                            if (
                                this.activeIndexArr.indexOf(index) < 0 ||
                                this.itemData[index].num == 0
                            ) {
                                this.noticeStr = this.itemData[index].ticketNotice;
                                this.noticeShow = true;
                                return;
                            } else {
                                this.activeIndexArr.push(index);
                                this.itemData.forEach((itme, inx) => {
                                    if (index == inx) {
                                        this.itemData[inx].num++;
                                    } else {
                                        this.itemData[inx].num = 0;
                                    }
                                });
                                this.getTotal();
                            }
                        } else {
                            if (
                                this.activeIndexArr.indexOf(index) < 0 ||
                                this.itemData[index].num == 0
                            ) {
                                let timeReserveListUrl = api.order.timeReserveList;
                                postData(timeReserveListUrl, {
                                    externalCode: idata.externalCode,
                                    startTime: this.playDate,
                                    endTime: this.playDate
                                }).then(resp => {
                                    if (resp.status == 200) {
                                        //判断接口返回正确后处理
                                        if (resp.data.length > 0) {
                                            this.activeIndexArr.push(index);
                                            this.itemData.forEach((itme, inx) => {
                                                if (index == inx) {
                                                    this.itemData[inx].num++;
                                                } else {
                                                    this.itemData[inx].num = 0;
                                                }
                                            });
                                            this.getTotal();
                                            this.itemData[index].timeReserveListArr = resp.data;
                                            let FsyyTimes = {
                                                code: this.itemData[index].modelCode,
                                                startTime: this.itemData[index].timeReserveListArr[0]
                                                    .startTime,
                                                endTime: this.itemData[index].timeReserveListArr[0]
                                                    .endTime
                                            };
                                            this.itemData[index].timeReserveListselected = FsyyTimes;
                                            this.itemData[index].timeReserveListArr.forEach(
                                                (it, indx) => {
                                                    this.itemData[index].timeReserveListArr[
                                                        indx
                                                    ].code = this.itemData[index].modelCode;
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
                                this.activeIndexArr.push(index);
                                this.itemData.forEach((itme, inx) => {
                                    if (index == inx) {
                                        this.itemData[inx].num++;
                                    } else {
                                        this.itemData[inx].num = 0;
                                    }
                                });
                                this.getTotal();
                            }
                        }
                    } else {
                        //多票型处理
                        if (this.itemData[index].isShowTicketNotice == "T") {
                            if (
                                this.activeIndexArr.indexOf(index) < 0 ||
                                this.itemData[index].num == 0
                            ) {
                                this.noticeStr = this.itemData[index].ticketNotice;
                                this.noticeShow = true;
                                return;
                            } else {
                                this.itemData[index].num++;
                                this.getTotal();
                                if (this.activeIndexArr.indexOf(index) < 0) {
                                    this.activeIndexArr.push(index);
                                }
                            }
                        } else {
                            if (
                                this.activeIndexArr.indexOf(index) < 0 ||
                                this.itemData[index].num == 0
                            ) {
                                let timeReserveListUrl = api.order.timeReserveList;
                                postData(timeReserveListUrl, {
                                    externalCode: idata.externalCode,
                                    startTime: this.playDate,
                                    endTime: this.playDate
                                }).then(resp => {
                                    if (resp.status == 200) {
                                        if (resp.data.length > 0) {
                                            this.activeIndexArr.push(index);
                                            this.itemData[index].num++;
                                            this.getTotal();
                                            //判断接口返回正确后处理
                                            this.itemData[index].timeReserveListArr = resp.data;
                                            let FsyyTimes = {
                                                code: this.itemData[index].modelCode,
                                                startTime: this.itemData[index].timeReserveListArr[0]
                                                    .startTime,
                                                endTime: this.itemData[index].timeReserveListArr[0]
                                                    .endTime
                                            };
                                            this.itemData[index].timeReserveListselected = FsyyTimes;
                                            this.itemData[index].timeReserveListArr.forEach(
                                                (it, indx) => {
                                                    this.itemData[index].timeReserveListArr[
                                                        indx
                                                    ].code = this.itemData[index].modelCode;
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
                                this.itemData[index].num++;
                                this.getTotal();
                            }
                        }
                    }
                } else {
                    //非分时预约票
                    if (this.isSinglebuy == "2") {
                        //单票型
                        // let sttArr = [];
                        if (this.indexArr.indexOf(index) < 0) {
                            this.indexArr.push(index);
                            this.addNum++;
                        }

                        this.itemData.forEach((itme, inx) => {
                            if (index == inx) {
                                this.itemData[inx].num++;
                            } else {
                                this.itemData[inx].num = 0;
                            }
                        });
                    } else {
                        //多票型
                        if (this.itemData[index].isShowTicketNotice == "T") {
                            // 购票是否提醒
                            //判断原先是够已经同意了提醒

                            if (
                                this.activeIndexArr.indexOf(index) < 0 ||
                                this.itemData[index].num == 0
                            ) {
                                this.noticeStr = this.itemData[index].ticketNotice;
                                this.noticeShow = true;
                            } else {
                                this.itemData[index].num++;
                            }
                        } else {
                            this.itemData[index].num++;
                        }
                    }
                    this.getTotal();
                }
            },
            fail() {
                this.noticeShow = false;
                this.itemData[this.addActiveIndex].showTimeTips = false;
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
            //日期选择
            bindDateChange(e) {
                let _this = this,
                    itemUrl = api.ticket.detail.productItems,
                    saleStatusUrl = api.ticket.detail.getSaleStatusByModelCode;
                _this.playDate = e.mp.detail.value;
                getData(itemUrl, {
                    wayType: _this.wayType,
                    merchantParkInfoId: _this.$root.$mp.query.id,
                    merchantInfoId: merchantInfoId,
                    currPage: _this.currPage,
                    pageSize: _this.pageSize,
                    playDate: _this.playDate
                }).then(res => {
                    res.data.rows.forEach((item, index) => {
                        res.data.rows[index].num = 0;
                        res.data.rows[index].timeReserveListArr = [];
                    });
                    _this.itemData = res.data.rows;
                    _this.canScroll = true;
                    _this.show = true;
                    _this.handleToggle(0);
                    wx.hideLoading();
                    this.getTotal();
                });
            },
            //跳转页面以及判断多票型都是实名制处理
            checkIfgo() {
                let nArr = [];
                this.itemData.forEach((item, index) => {
                    if (item.num > 0) {
                        nArr.push(item);
                    }
                });
                wx.setStorageSync("showType", nArr);
                wx.setStorageSync("playDate", this.playDate);
                this.closeModal();
                let FsyyTimesArr = [];
                this.itemData.forEach((item, index) => {
                    if (
                        item.timeReserveListselected &&
                        item.timeReserveListselected.code &&
                        item.timeReserveListselected.startTime &&
                        item.timeReserveListselected.endTime
                    ) {
                        let obj = {
                            code: item.timeReserveListselected.code,
                            startTime: item.timeReserveListselected.startTime,
                            endTime: item.timeReserveListselected.endTime
                        };
                        FsyyTimesArr.push(obj);
                    }
                });
                wx.setStorageSync("FsyyTimesArr", FsyyTimesArr);
                this.goUrl("pages/scenic/order/main");
            },
            newcheckIfgo() {//演出
                let nArr = [];
                this.showType.forEach((item, index) => {
                    if (item.minSaleStock > 0) {
                        nArr.push(item);
                    }
                });
                wx.setStorageSync("showType", nArr);
                // console.log('showArr-nArraaaaaa', nArr)
                wx.setStorageSync("playDate", this.dataTime);
                // console.log('showArr-this.dataTime', this.dataTime)
                wx.setStorageSync("playDateTime", this.newshowTimes);
                // console.log('showArr-this.dataTime', this.newshowTimes)
                this.closeModal();
                let FsyyTimesArr = [];
                this.showType.forEach((item, index) => {
                    // if (
                    //     item.timeReserveListselected &&
                    //     item.timeReserveListselected.code &&
                    //     item.timeReserveListselected.startTime &&
                    //     item.timeReserveListselected.endTime
                    // ) {
                    //     let obj = {
                    //         code: item.timeReserveListselected.code,
                    //         startTime: item.timeReserveListselected.startTime,
                    //         endTime: item.timeReserveListselected.endTime
                    //     };
                    //     FsyyTimesArr.push(obj);
                    // }
                    let obj = {
                        id: item.id,
                        parkId: item.parkId,
                        num: item.minSaleStock
                    };
                    FsyyTimesArr.push(obj);
                });
                wx.setStorageSync("FsyyTimesArr", FsyyTimesArr);
                this.goUrl("pages/show/order/main");
            },
            gotoGame(path) {
                this.reLaunchPageTo(this.router + path);
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
                if (wx.getStorageSync('xjsc_showPlayDate')) {
                    currentdate = wx.getStorageSync('xjsc_showPlayDate');
                    this.showTimeSelect = 0;
                    this.dateNow = 0,
                        wx.setStorageSync('xjsc_showPlayDate', '')
                }
                return currentdate;
            },
            showTips() {
                wx.showToast({
                    title: "该票当前不可订，详见预订须知",
                    duration: 2000,
                    icon: "none"
                });
            },
            getNewTotal() {
                let _this = this,
                    sum = 0;
                _this.newnumber = 0;
                _this.showType.forEach((item, index) => {
                    _this.newnumber += item.minSaleStock;
                    sum += item.minSaleStock * item.salePrice;
                });
                _this.totalNewPrice = sum.toFixed(2);
                return _this.totalNewPrice;
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
            //选择分时预约时间段
            selectedTime(iet, ide, index) {
                this.timeIndexArr[index] = ide;
                this.itemData[index].timeReserveListselected = iet;
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
                this.goUrl('pages/member/coupon/mycoupon/main?productCode=' + this.productCodeAll + '&distributionPath=' + 0)
            }
            // resetDateTime(){
            //     let date = wx.getStorageSync("showeDate")
            //     this.formatDateList(this.dateChoose,date)
            // }
        },
        onLoad() {
            this.parkIds = this.$root.$mp.query.id
            wx.setStorageSync('xjsc_merchantParkId', this.$root.$mp.query.id)
            this.getNewTotal();
            this.formatDateList(this.dateChoose, this.getCurDate())
            this.firstDateFormat(this.dateChoose)
            //判断用户是否授权
            let merchantId = wx.getStorageSync('xjsc_merchantInfoId')
            isauthorization("userInfo").then(res => {
                this.authorization = res;
            });

            this.playDate = this.getCurDate();
            let _this = this,
                recommendFlag = _this.$root.$mp.query.recommendFlag,
                leagureId = wx.getStorageSync("WxXjscUserInfo").leaguerId,
                payOrderNo = _this.$root.$mp.query.payOrderNo;

            let detailUrl = api.ticket.detail.main,
                showDetailUrl = api.show.detail.main,
                commentUrl = api.main.comment.list,
                itemUrl = api.ticket.detail.productItems;
            console.log("-----------------wxgetStorage------------------------", wx.getStorageSync('xjsc_merchantParkId'))
            var pdshow = getData(showDetailUrl, {
                merchantId: merchantId,
                merchantParkId: wx.getStorageSync('xjsc_merchantParkId'),
                playDate: this.dataTime
            });
            if (recommendFlag && leagureId && payOrderNo) {
                var pd = getData(detailUrl, {
                    wayType: _this.wayType,
                    merchantParkInfoId: _this.$root.$mp.query.id,
                    merchantInfoId: merchantInfoId,
                    recommendFlag: recommendFlag,
                    payOrderNo: payOrderNo,
                    leaguerId: leagureId
                });
            } else {
                var pd = getData(detailUrl, {
                    wayType: _this.wayType,
                    merchantParkInfoId: _this.$root.$mp.query.id,
                    merchantInfoId: merchantInfoId
                });
            }
            let pc = getData(commentUrl, {
                wayType: _this.wayType,
                productType: "park",
                productCode: _this.$root.$mp.query.productCode,
                merchantInfoId: merchantInfoId
            });
            let pp = getData(itemUrl, {
                wayType: _this.wayType,
                merchantParkInfoId: _this.$root.$mp.query.id,
                merchantInfoId: merchantInfoId,
                currPage: _this.currPage,
                pageSize: _this.pageSize,
                playDate: _this.playDate
            });
            wx.showLoading({
                title: "加载中..."
            });
            Promise.all([pd, pc, pdshow])
                .then(result => {
                    console.log('演出详情', result);
                    this.showTimes = result[2].sessionList;
                    this.showType = result[2].data
                    // 查询优惠券
                    this.productCodeAll = [];
                    if (this.showType.length && this.showType.length > 0) {
                        this.showType.map(item => {
                            this.productCodeAll.push(item.modelCode)
                            if (item.salePrice) {
                                item.salePricePre = item.salePrice.toFixed(2).split('.')[0]
                                item.salePriceEnd = item.salePrice.toFixed(2).split('.')[1]
                            } else {
                                item.salePricePre = '0'
                                item.salePriceEnd = '00'
                            }

                        })
                    }
                    console.log("showTypeids", this.showType)
                    this.cities = this.showType[0] && this.showType[0].cityId ? this.showType[0].cityId : ''
                    wx.setStorageSync("wxxcx_citys", this.cities);
                    this.productCodess = this.productCodeAll.join(',')
                    if (this.productCodess && this.productCodess != '') {
                        this.ifShow = true
                    }
                    wx.setStorageSync('xjsc_merchantProductCode', this.productCodess)
                    this.searchCoupon({
                        productCodes: this.productCodeAll.join(','),
                        merchantInfoId: merchantInfoId,
                        distributionPath: 0, // 4：个人中心
                        currPage: 1,
                        pageSize: 1000
                    }, this.searchCouponCB);
                    _this.detailData = result[0].data;
                    _this.commentOrderNotice = result[0].data.orderNotice ? result[0].data.orderNotice : ''
                    _this.commentData = result[1].data;
                    console.log("this.detailData", this.detailData)
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
                    console.log("景区接口数据", result[0].data.cityId ? result[0].data.cityId : '')
                    this.cities = result[0].data.cityId ? result[0].data.cityId : ''
                    wx.setStorageSync("wxxcx_citys", this.cities);
                    wx.setStorageSync("orderInfo", result[0].data.orderNotice);
                    wx.showShareMenu({
                        withShareTicket: true
                    });
                    wx.hideLoading();
                })
                .catch(error => {
                    console.log("error", error)
                });
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
        watch: {
            playDate: {
                handler(val) {
                    let _this = this
                    this.getNewTotal();
                    this.formatDateList(this.dateChoose, val)
                    this.firstDateFormat(this.dateChoose)
                    getData(api.show.detail.main, {
                        merchantId: wx.getStorageSync('xjsc_merchantInfoId'),
                        merchantParkId: wx.getStorageSync('xjsc_merchantParkId'),
                        playDate: val
                    }).then(res => {
                        console.log("xin 演出详情0", res.data)
                        _this.showTimes = res.sessionList;
                        _this.showType = res.data;
                        if (this.showType.length && this.showType.length > 0) {
                            this.showType.map(item => {
                                this.productCodeAll.push(item.modelCode)
                                if (item.salePrice) {
                                    item.salePricePre = item.salePrice.toFixed(2).split('.')[0]
                                    item.salePriceEnd = item.salePrice.toFixed(2).split('.')[1]
                                } else {
                                    item.salePricePre = '0'
                                    item.salePriceEnd = '00'
                                }

                            })
                        }
                    })
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            }
        },
        computed: {
            newshowTimes() {
                return this.showTimes[this.showTimeSelect]
            },
            dataTime() {//日期时间
                // console.log("------------------------")
                // console.log(this.dateNow)
                // console.log("------------------------")
                // console.log(this.dateChoose[this.dateNow].FullDate)
                // console.log("------------------------")
                return this.dateChoose[this.dateNow].FullDate
            },
            showTime() {//场次时间
                let i = this.showTimeSelect;
                return this.showTimes[i]
            },
            showTimeStr() {//显示的场次
                let arr = [];
                if (this.showTimes.length > 5 && !this.showMoreTime) {
                    arr = this.showTimes.slice(0, 5)
                } else {
                    arr = this.showTimes
                }
                return arr;
            }
        },
        onUnload() {
            this.closeModal();
            this.detailData.latitudeLongitude = [];
        },
        onShow() {
            this.calendarShow = false
            this.closeModal();
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
        background-color: #f0f2f7;
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
                .swiper-page {
                    position: absolute;
                    width: 25px;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    border-radius: 50%;
                    color: #fff;
                    background: rgba($color: #000000, $alpha: 0.3);
                    bottom: 20px;
                    right: 10px;
                    font-family: PingFang SC Regular;
                    font-size: 12px;
                    z-index: 10;
                }
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
        .show-detail-wrap {
            position: relative;
            top: -10px;
            z-index: 10;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            background: #f0f2f7;
            overflow: hidden;
        }
        .detail-info {
            width: 100%;
            background-color: #fff;
            .detail-info-main {
                width: 100%;
                position: relative;
                .detail-info-title {
                    margin-left: 12.5px;
                    margin-top: 10px;
                    width: calc(100% - 25px);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .detail-info-ztitle {
                        font-family: PingFang SC Medium;
                        font-size: 19px;
                        color: #333333;
                        display: inline-block;
                        vertical-align: middle;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        width: calc(100% - 25px);
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
                    font-family: PingFang SC Medium;
                    padding-left: 10px;
                    margin-top: 12.5px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: calc(100% - 20px);
                    .subName-text {
                        height: 20px;
                        line-height: 20px;
                        color: #ef0118;
                        font-family: PingFang SC Regular;
                        font-size: 10px;
                        display: inline-block;
                        padding-left: 8px;
                        padding-right: 8px;
                        border-radius: 9px;
                        margin-left: 10px;
                        border: 1px solid #ef0017;
                    }
                    .saled-num {
                        font-size: 12px;
                        color: #999;
                        display: inline-block;
                        background: #f2f2f2;
                        padding: 4px 7.5px;
                        border-radius: 4px;
                    }
                    .money-sign {
                        font-size: 12px;
                        color: #ef0017;
                    }
                    .show-price {
                        font-weight: 900;
                        font-size: 19px;
                        color: #ef0017;
                        margin-left: 3px;
                        font-family: PingFang SC Heavy;
                    }
                    .start-text {
                        font-size: 12px;
                        color: #999999;
                        margin-left: 9px;
                        font-family: PingFang SC Regular;
                    }
                    .origin-price {
                        font-size: 12px;
                        color: #767676;
                        text-decoration: line-through;
                        margin-left: 6px;
                    }
                }
                .detail-ydxz {
                    font-family: PingFang SC Medium;
                    padding-left: 12px;
                    height: 50px;
                    border-top: 1px solid #f0f2f7;
                    margin-top: 9px;
                    .ydxz-text {
                        display: block;
                        margin-top: 8px;
                        margin-bottom: 7px;
                        font-size: 14px;
                        color: #333333;
                    }
                    .ydxz-text1 {
                        display: block;
                        font-size: 10px;
                        color: #999999;
                        position: relative;
                        top: -5px;
                        font-family: PingFang SC Regular;
                    }
                }
                .arrow-detail {
                    display: inline-block;
                    width: 9px;
                    height: 17.5px;
                    background: url("https://cdn.51dmq.com/ui/showImg/icon_jiantou1.png")
                        no-repeat top;
                    background-size: 100% 100%;
                    position: absolute;
                    bottom: 16px;
                    left: calc(50% - 22px);
                }
                .arrow-detail1 {
                    display: inline-block;
                    width: 9px;
                    height: 17.5px;
                    background: url("https://cdn.51dmq.com/ui/showImg/icon_jiantou1.png")
                        no-repeat top;
                    background-size: 100% 100%;
                    position: absolute;
                    bottom: 16px;
                    right: 12.5px;
                }
                .block-hr {
                    width: 1px;
                    height: 30px;
                    background: #e4e4e4;
                    position: absolute;
                    bottom: 9px;
                    left: 50%;
                }
                .pingfeng {
                    width: 170px;
                    position: absolute;
                    bottom: 6px;
                    right: 0;
                    .xingxing {
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                        margin-right: 3px;
                        margin-top: 3px;
                        border-radius: 3px;
                        background: #ef0017
                            url("https://cdn.51dmq.com/ui/showImg/xingxing.png")
                            no-repeat;
                        background-size: 80% 80%;
                        background-position: 1.8px 1.8px;
                    }
                    .buliang {
                        background: #dfdfdf
                            url("https://cdn.51dmq.com/ui/showImg/xingxing.png")
                            no-repeat;
                        background-size: 80% 80%;
                        background-position: 1.8px 1.8px;
                    }
                    .pingfen-num {
                        display: inline-block;
                        font-size: 18px;
                        position: relative;
                        color: #ef0017;
                        margin-left: 4px;
                        margin-bottom: -4.5px;
                        font-family: PingFang SC Bold;
                    }
                    .pinglun {
                        font-size: 10px;
                        color: #999999;
                        font-family: PingFang SC Regular;
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
        .show-scene {
            .show-tip {
                font-size: 12px;
                color: #333;
                margin-bottom: 7px;
            }
            padding: 10px 10px 0px;
            background: #ffff;
            .scene-ul {
                margin-right: 7px;
                &.scene-flex {
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                    flex-direction: row;
                    flex-wrap: wrap;
                    li {
                        margin-right: unset;
                    }
                }
                li {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 27.5px;
                    line-height: 27.5px;
                    text-align: center;
                    border-radius: 2px;
                    margin-top: 2px;
                    margin-bottom: 5px;
                    border-radius: 2.5px;
                    overflow: hidden;
                    font-size: 13px;
                    color: #333333;
                    border: 1px solid #d5d5d5;
                    margin-right: 8px;
                    .i_wrap {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 10px;
                        height: 10px;
                        background: #ef0017;
                        border-bottom-left-radius: 2.5px;
                        i {
                            width: 7px;
                            height: 6px;
                            margin-top: 2px;
                            margin-left: 2px;
                            background: url("https://cdn.51dmq.com/ui/showImg/icon_scene_select.png")
                                no-repeat center;
                            background-size: 100% 100%;
                        }
                    }
                    &.selected {
                        border: 1px solid #ef0017;
                        color: #ef0017;
                    }
                }
            }
            .scene-more {
                display: block;
                height: 20px;
                line-height: 20px;
                text-align: center;
                font-family: PingFang SC Regular;
                font-size: 10px;
                color: #999999;
                padding-bottom: 3px;
            }
        }
        .detail-info-content {
            background-color: #fff;
            margin-top: 10px;
            color: #585858;
            position: relative;
            padding-left: 10px;
            &.select-date-wrap {
                padding-bottom: 12px;
                border-bottom: 0.5px solid #f0f2f7;
            }
            .arrow-detail2 {
                position: absolute;
                right: 15px;
                top: 9px;
                font-size: 26px;
                font-weight: 100;
                color: #ababab;
            }
            .info-content-item {
                display: inline-block;
                margin-right: 7.5px;
                font-family: PingFang SC Regular;
                font-size: 12px;
                vertical-align: middle;
                color: #333333;
                &.select-times {
                    height: 37.5px;
                    line-height: 37.5px;
                }
            }
            .youhuiquan {
                display: inline-block;
                vertical-align: middle;
                .youhuiOption {
                    margin-top: -3px;
                    margin-left: 12.5px;
                    padding-left: 8px;
                    width: 77px;
                    height: 22px;
                    display: inline-block;
                    margin-right: 10px;
                    background: url("https://cdn.51dmq.com/ui/showImg/youhuiquan.png");
                    background-size: 100% 100%;
                    vertical-align: middle;
                    .optionText {
                        width: 77px;
                        height: 22px;
                        line-height: 22px;
                        color: #fff;
                        font-family: PingFang SC Medium;
                        font-size: 10px;
                        text-align: center;
                        overflow: hidden;
                    }
                }
            }
            .coupon-wrap {
                display: inline-block;
                width: 100%;
                height: 45px;
                line-height: 45px;
            }
            .openTime {
                border-top: 0.5px solid #f0f2f7;
                font-size: 12px;
                color: #333333;
                font-family: PingFang SC Medium;
                display: inline-block;
                width: 100%;
                height: 45px;
                line-height: 45px;
                .kaiyuan1 {
                    display: inline-block;
                }
                .kaiyuan2 {
                    display: inline-block;
                    margin-left: 20px;
                    font-family: PingFang SC Medium;
                    font-size: 14px;
                    color: #333333;
                }
            }
            .timeBox {
                width: 100%;
                height: 50px;
                margin-top: 2.5px;
                position: relative;
                .jianbian {
                    width: 7.5px;
                    height: 51px;
                    position: absolute;
                    right: 75px;
                    top: 0;
                    z-index: 10;
                    // border:1px solid #fff;
                }
                .timeOptBox {
                    width: calc(100% - 75px);
                    position: relative;
                    background: white;
                    overflow-x: auto;
                    overflow-y: hidden;
                    .timeBarBox {
                        // height: 50px;
                        .timeOption {
                            width: 60px;
                            height: 50px;
                            text-align: center;
                            border-radius: 3px;
                            border: 1px solid #cecccd;
                            float: left;
                            margin-right: 5px;
                            .tOptDate {
                                font-size: 12px;
                                color: #333;
                                line-height: 18px;
                                margin-top: 1.5px;
                            }
                            .tOptPrice {
                                color: #ef0017;
                                font-size: 12px;
                                line-height: 18px;
                                font-family: PingFang SC Heavy;
                                position: relative;
                                top: -6px;
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
                        .timeOptChoosed {
                            border: 1px solid #ef0017;
                            background: #ef0017;
                        }
                    }
                }
                .timeBtn {
                    width: 61px;
                    height: 50px;
                    text-align: center;
                    font-size: 12px;
                    color: #ababab;
                    border-radius: 3px;
                    border: 1px solid #cecccd;
                    position: absolute;
                    right: 10px;
                    top: 0;
                    p {
                        display: block;
                        font-size: 12px;
                        color: #333333;
                        letter-spacing: 2px;
                        font-family: PingFang SC Regular;
                        &:first-of-type {
                            margin-top: 8px;
                            margin-bottom: 2px;
                        }
                    }
                }
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
        &.select-tickets {
            padding: unset;
            width: 100%;
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

    .cTicket_box {
        width: calc(100% - 10px);
        padding: 10px 0;
        padding-left: 1.5px;
        border-bottom: 0.5px solid #f0f2f7;
        position: relative;
        left: 10px;
    }
    .cTicket_title {
        width: 60%;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-family: PingFang SC Medium;
        font-size: 16px;
        color: #333333;
        overflow: hidden;
    }
    .cTicket_price {
        font-size: 18px;
        // font-weight: bold;
        font-family: PingFang SC Bold;
        color: #ef0017;
        .cTicket_span {
            &:first-of-type {
                margin-left: 0.8px;
            }
        }
    }
    .cTicket_span {
        font-size: 12px;
        color: #ef0017;
        font-family: PingFang SC Medium;
        // font-weight: 500;
    }
    .lable_box {
        width: 100%;
        font-size: 12px;
        margin-top: 3px;
    }
    .cTicket_lableTitle {
        display: inline-block;
        // height: 17px;
        font-family: PingFang SC Regular;
        // line-height: 17px;
        // font-size: 10px;
        width: 65px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        border-radius: 7px;
        background: #fef2f3;
        color: #ef0017;
        margin-right: 7px;
    }
    .cTicket_lableContent {
        color: #999999;
        font-size: 12px;
        font-family: PingFang SC Regular;
    }

    .cTicket_numBox {
        width: 110px;
        height: 30px;
        position: absolute;
        right: 10px;
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
        border: 2px solid #ffabbf;
    }
    .cTicket_numShow {
        width: 42px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        font-size: 16px;
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
        width: calc(100% - 20px);
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        justify-content: space-between;
    }
    .fnIcon_optBox {
        display: inline-block;
        width: 50px;
        text-align: center;
        &:first-of-type {
            .fnIcon_img {
                display: inline-block;
                width: 25px;
                height: 33px;
                overflow: hidden;
            }
        }
        &:nth-of-type(2) {
            .fnIcon_img {
                display: inline-block;
                width: 32.5px;
                height: 25px;
                overflow: hidden;
            }
            .fnIcon_text {
                margin-top: 13px;
            }
        }
        &:nth-of-type(3) {
            .fnIcon_img {
                display: inline-block;
                width: 25px;
                height: 30px;
                overflow: hidden;
            }
        }
        &:nth-of-type(4) {
            .fnIcon_img {
                display: inline-block;
                width: 25px;
                height: 25px;
                overflow: hidden;
            }
        }
        &:nth-of-type(5) {
            .fnIcon_img {
                display: inline-block;
                width: 29px;
                height: 29px;
                overflow: hidden;
            }
        }
    }
    .fnIcon_img {
        width: 40px;
        height: 40px;
    }
    .fnIcon_text {
        width: 50px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        font-family: PingFang SC Regular;
        color: #333333;
        background: #f4f4f4;
        border-radius: 10px;
        display: inline-block;
        margin-top: 11px;
    }

    .jqDetail_contentBox {
        width: calc(100% - 37px);
        padding: 2.5px 18.5px 10px;
    }
    .jqDetail_title {
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        font-family: PingFang SC Bold;
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
    // .newHeightEnd{
    //     height: 320px;
    // }
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

    .footBox {
        width: 100%;
        height: 60px;
        background: white;
        border-top: 0.5px solid #f0f2f7;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 30;
    }
    .footTotalPrice {
        display: inline-block;
        font-size: 12px;
        color: #333;
        margin-left: 60px;
        margin-top: 13.5px;
        .total-price {
            .choose-num {
                em {
                    display: inline-block;
                    &.totalPrice {
                        color: #ef0017;
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .carBox {
        width: 70px;
        height: 60px;
        position: absolute;
        left: 0;
        top: 0;
    }
    .footCarImg {
        width: 22px;
        height: 20px;
        margin-left: 20px;
        margin-top: 8px;
        background: url(https://cdn.51dmq.com/ui/showImg/buy.png) no-repeat center;
        background-size: 100% 100%;
    }
    .footCar_imgFalse {
        background: url(https://cdn.51dmq.com/ui/showImg/buy1.png) no-repeat center;
        background-size: 100% 100%;
    }
    .footCarText {
        text-align: center;
        font-size: 12px;
        color: #333;
        margin-top: 2px;
    }
    .footCar_false {
        color: #ababab;
    }
    .footBuyBtn_buy {
        width: 100px;
        height: 33px;
        font-size: 16px;
        text-align: center;
        line-height: 33px;
        border-radius: 16px;
        float: right;
        margin-top: 13px;
        margin-right: 10px;
        background-image: linear-gradient(to right, #ef0017, #f7416c);
        color: white;
    }
    .footBtn_false_buy {
        background: #ababab;
    }
    .footBuyBtn_add {
        width: 100px;
        height: 32px;
        font-size: 16px;
        text-align: center;
        line-height: 32px;
        border: 1px solid #ef0017;
        border-radius: 16px;
        float: right;
        margin-top: 13px;
        margin-right: 10px;
        color: #ef0017;
    }
    .footBtn_false_add {
        border: 1px solid #ababab;
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
        z-index: 100000000;
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
        font-size: 18px;
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
        font-size: 16px;
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
        font-size: 16px;
        color: #ef0017;
    }
    .authorization-btn {
        width: 100px;
        height: 33px;
        font-size: 16px;
        text-align: center;
        line-height: 33px;
        border-radius: 16px;
        float: right;
        margin-top: unset;
        margin-right: unset;
        background-image: linear-gradient(to right, #ef0017, #f7416c);
        color: white;
    }
</style>
