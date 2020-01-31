<template>
    <div class="order-list">
        <navbar :backShow='!bottomShow'
                title='订单列表'></navbar>
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px')}">
            <div class="topShadow"></div>
            <div class='state-ul bg-w boxshadow m-b-10'>
                <!-- <div class="state-li" :class='{active:activestate=="all"}' @click="select('all',0)">
                    <div class="state-title">全部订单</div>
                </div> -->
                <div class="state-li"
                     :class='{active:activestate=="WAIT_PAY"}'
                     @click="select('WAIT_PAY',0)">
                    <div class="state-title">待支付</div>
                </div>
                <div class="state-li"
                     :class='{active:activestate=="WAIT_CONSUME"}'
                     @click="select('WAIT_CONSUME',1)">
                    <div class="state-title">待消费</div>
                </div>
                <div class="state-li"
                     :class='{active:activestate=="FINISH"}'
                     @click="select('FINISH',2)">
                    <div class="state-title">已完成</div>
                </div>
                <div class="state-li"
                     :class='{active:activestate=="REFUNDING"}'
                     @click="select('REFUNDING',3)">
                    <div class="state-title">退款</div>
                </div>
            </div>
            <swiper v-show='pageShow'
                    @animationfinish='test'
                    @change='switchTab'
                    :style='{height:swiperHeight+"px"}'
                    :current='currentindex'
                    class="state-content">
                <swiper-item>
                    <!-- {{listData[0]}} -->
                    <scroll-view @scrolltolower='getBottom(0)'
                                 scroll-y
                                 class="content-item">
                        <div class="item-ul">
                            <div v-if='listData[0].length'
                                 class="item-ul">
                                <div v-for='(it,i) in listData[0]'
                                     :key='i'
                                     @click="goUrl('pages/member/order/detail/main?payOrderNo='+it.payOrderNo)"
                                     class="waitpay m-b-10 boxshadow bg-w">
                                    <!-- <div v-for='(it,i) in listData[0]'
                                     :key='i'
                                     @click="goUrl('pages/member/order/detail/main?'+(activestate=='WAIT_PAY'?'payOrderNo':'orderno')+'='+(activestate=='WAIT_PAY'?it.payOrderNo:it.id))"
                                     class="waitpay m-b-10 boxshadow bg-w"> -->
                                    <div class="waitpay m-b-10 boxshadow bg-w">
                                        <!-- <div class="waitpay m-b-10 boxshadow bg-w"
                                         @click="toOrderDetail(it.id,it.payOrderNo,0)"> -->
                                        <!-- 其他订单 -->
                                        <div class="orderdate">
                                            <div class="date-wrap">
                                                <!-- <span class="text">订单编号:</span>
                                                <span class="date">12558877011</span> -->
                                                <span class="model">{{it.itemOrderTypeName}}</span>
                                            </div>
                                            <!-- <span class="fr state">{{it.modelCode||"已完成"}}</span> -->
                                            <span class="fr state wait-pay">{{"待支付"||it.payStatus}}</span>
                                            <!-- <span class="fr state wait-play">待消费</span> -->
                                        </div>
                                        <div class="waitpay-info">
                                            <div class="info">
                                                <div class="my-info-title">{{it.orderInfo}}</div>
                                                <div class="my-content"
                                                     :class="it.orderType=='hotel'?'hotel':''">
                                                    <div class="all-info">
                                                        <div class="two-line info-text">
                                                            <span class="item-pre">联系人</span>
                                                            {{it.linkName}}
                                                        </div>
                                                        <div class="two-line info-text go-date"
                                                             v-if="it.orderType!=='eatery'">
                                                            <span class="item-pre">{{it.orderType=="hotel"?'入住/离店':'出游日期'}}</span>
                                                            {{it.orderType=="hotel"?it.startDateStr+' - '+it.endDateStr:it.startDateStr}}
                                                        </div>
                                                        <div class="two-line info-text go-date"
                                                             v-else>
                                                            <span class="item-pre">{{'使用日期'}}</span>
                                                            {{'见详情'}}
                                                        </div>
                                                        <div class="spec-price clearfix">
                                                            <span class="item-pre">总价</span>
                                                            <em class="money-flag">￥</em>
                                                            {{it.orderSum}}
                                                        </div>
                                                    </div>
                                                    <div class="info-num">

                                                        <div class="item-pre">
                                                            {{it.orderType=="hotel"?"天数:":'数量：'}}
                                                        </div>
                                                        {{it.orderType=="hotel"?it.moveInto+' 晚':it.amount }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pay">
                                                <div class="time-wrap">
                                                    <i></i>
                                                    <div class="time">{{it.orderTimeStr}}</div>
                                                </div>
                                                <div class="pay-money pay-btns">
                                                    <!-- <span class="invoice item-btn"
                                                          @click.stop="openPayModal({orderInfo:it.orderDescription,paySum:it.paySum,payType:it.payType,payOrderNo:it.payOrderNo})">去支付
                                                    </span> -->
                                                    <span class="invoice item-btn"
                                                          @click.stop="openPayModal({orderInfo:it.orderDescription,paySum:it.paySum,payType:it.payType,payOrderNo:it.payOrderNo})">去支付
                                                    </span>
                                                    <!--
                                                          <span
                                                          class="invoice item-btn">开票</span>
                                                    <span class="complete item-btn">核销</span> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="no-data"
                                 v-else>
                                <img src="https://cdn.51dmq.com/ui/showImg/no_order.png"
                                     alt="">
                                <div class="text">暂无订单</div>
                            </div>
                        </div>
                    </scroll-view>
                </swiper-item>
                <swiper-item>
                    <!-- {{listData[0]}} -->
                    <scroll-view @scrolltolower='getBottom(1)'
                                 scroll-y
                                 class="content-item">
                        <div class="item-ul">
                            <div v-if='listData[1].length'
                                 class="item-ul">
                                <div v-for='(it,i) in listData[1]'
                                     :key='i'
                                     @click="goUrl('pages/member/order/detail/main?'+(activestate=='WAIT_PAY'?'payOrderNo':'orderno')+'='+(activestate=='WAIT_PAY'?it.payOrderNo:it.id))"
                                     class="waitpay m-b-10 boxshadow bg-w">
                                    <div class="waitpay m-b-10 boxshadow bg-w">
                                        <!-- <div class="waitpay m-b-10 boxshadow bg-w"
                                         @click="toOrderDetail(it.id,'',1)"> -->
                                        <!-- 其他订单 -->
                                        <detailStatus :itemOrderTypeName='it.itemOrderTypeName'
                                                      :orderNum="it.orderStatus"
                                                      :status="'wait-play'"></detailStatus>
                                        <!-- <div class="orderdate">
                                            <div class="date-wrap"> -->
                                        <!-- <span class="text">订单编号:</span>
                                                <span class="date">12558877011</span> -->
                                        <!-- <span class="model">{{it.itemOrderTypeName}}</span>
                                            </div> -->
                                        <!-- <span class="fr state">已完成</span> -->
                                        <!-- <span class="fr state wait-play">待消费</span> -->
                                        <!-- </div> -->
                                        <div class="waitpay-info">
                                            <div class="info">
                                                <div class="my-info-title">{{(it.orderInfo)}}</div>
                                                <div class="my-content"
                                                     :class="it.orderType=='hotel'?'hotel':''">
                                                    <div class="all-info">
                                                        <div class="two-line info-text">
                                                            <span class="item-pre">联系人</span>
                                                            {{it.itemLinkName || it.linkName}}
                                                        </div>
                                                        <div class="two-line info-text go-date"
                                                             v-if="it.orderType!='eatery'">
                                                            <span class="item-pre">{{it.orderType=="hotel"?'入住/离店':'出游日期'}}</span>
                                                            {{it.orderType=="hotel"?it.startDateStr+' - '+it.endDateStr:it.startDateStr}}
                                                        </div>
                                                        <div class="two-line info-text go-date"
                                                             v-else>
                                                            <span class="item-pre">{{'使用日期'}}</span>
                                                            {{it.startDateStr+' - '+it.endDateStr}}
                                                        </div>
                                                        <div class="spec-price clearfix">
                                                            <span class="item-pre">总价</span>
                                                            <em class="money-flag">￥</em>
                                                            {{it.orderSum}}
                                                        </div>
                                                    </div>
                                                    <div class="info-num">
                                                        <div class="item-pre">
                                                            {{it.orderType=="hotel"?"天数:":'数量：'}}
                                                        </div>
                                                        {{it.orderType=="hotel"?it.moveInto+' 晚':it.amount }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pay">
                                                <div class="time-wrap">
                                                    <i></i>
                                                    <div class="time">{{it.orderTimeStr}}</div>
                                                </div>
                                                <div class="pay-money pay-btns"
                                                     v-if="it.selfFlag">
                                                    <!-- <span class="invoice item-btn">开票</span> -->
                                                    <span class="complete item-btn"
                                                          @click.stop="toOffShow(it)">核销</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="no-data"
                                 v-else><img src="https://cdn.51dmq.com/ui/showImg/no_order.png"
                                     alt="">
                                <div class="text">暂无订单</div>
                            </div>
                        </div>
                    </scroll-view>
                </swiper-item>
                <swiper-item>
                    <!-- {{listData[0]}} -->
                    <scroll-view @scrolltolower='getBottom(2)'
                                 scroll-y
                                 class="content-item">
                        <div class="item-ul">
                            <div v-if='listData[2].length'
                                 class="item-ul">
                                <div v-for='(it,i) in listData[2]'
                                     :key='i'
                                     @click="goUrl('pages/member/order/detail/main?'+(activestate=='WAIT_PAY'?'payOrderNo':'orderno')+'='+(activestate=='WAIT_PAY'?it.payOrderNo:it.id))"
                                     class="waitpay m-b-10 boxshadow bg-w">
                                    <div class="waitpay m-b-10 boxshadow bg-w">
                                        <!-- <div class="waitpay m-b-10 boxshadow bg-w"
                                         @click="toOrderDetail(it.id,'',2)"> -->
                                        <!-- 其他订单 -->
                                        <detailStatus :itemOrderTypeName='it.itemOrderTypeName'
                                                      :orderNum="it.orderStatus"
                                                      :status="'complete-play'"></detailStatus>
                                        <div class="waitpay-info">
                                            <div class="info">
                                                <div class="my-info-title">{{it.orderInfo}}</div>
                                                <div class="my-content"
                                                     :class="it.orderType=='hotel'?'hotel':''">
                                                    <div class="all-info">
                                                        <div class="two-line info-text">
                                                            <span class="item-pre">联系人</span>
                                                            {{it.itemLinkName || it.linkName}}
                                                        </div>
                                                        <div class="two-line info-text go-date"
                                                             v-if="it.orderType!='eatery'">
                                                            <span class="item-pre">{{it.orderType=="hotel"?'入住/离店':'出游日期'}}</span>
                                                            {{it.orderType=="hotel"?it.startDateStr+' - '+it.endDateStr:it.startDateStr}}
                                                        </div>
                                                        <div class="two-line info-text go-date"
                                                             v-else>
                                                            <span class="item-pre">{{'使用日期'}}</span>
                                                            {{it.startDateStr+' - '+it.endDateStr}}
                                                        </div>
                                                        <div class="spec-price clearfix">
                                                            <span class="item-pre">总价</span>
                                                            <em class="money-flag">￥</em>
                                                            {{it.orderSum}}
                                                        </div>
                                                    </div>
                                                    <div class="info-num">
                                                        <div class="item-pre">
                                                            {{it.orderType=="hotel"?"天数:":'数量：'}}
                                                        </div>
                                                        {{it.orderType=="hotel"?it.moveInto+' 晚':it.amount }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pay">
                                                <div class="time-wrap">
                                                    <i></i>
                                                    <div class="time">{{it.orderTimeStr}}</div>
                                                </div>
                                                <div class="pay-money pay-btns"
                                                     v-if="it.ticketIssuedFlag">
                                                    <template v-for="(item,index) in it.orderDetail">
                                                        <span class="complete item-btn"
                                                              v-if="item.checkAmount>0 && item.leftAmount == 0"
                                                              @click.stop="toComment(it.payOrderNo)">去评论</span>
                                                    </template>
                                                    <!-- 隐藏开票 -->
                                                    <!-- <span class="invoice item-btn"
                                                          @click="goUrl('pages/member/invoice/invoicePay/main?payOrderNo='+it.payOrderNo)">开票</span> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="no-data"
                                 v-else><img src="https://cdn.51dmq.com/ui/showImg/no_order.png"
                                     alt="">
                                <div class="text">暂无订单</div>
                            </div>
                        </div>
                    </scroll-view>
                </swiper-item>
                <swiper-item>
                    <!-- {{listData[0]}} -->
                    <scroll-view @scrolltolower='getBottom(3)'
                                 scroll-y
                                 class="content-item">
                        <div class="item-ul">
                            <div v-if='listData[3].length'
                                 class="item-ul">
                                <div v-for='(it,i) in listData[3]'
                                     :key='i'
                                     @click="goUrl('pages/member/order/detail/main?'+(activestate=='WAIT_PAY'?'payOrderNo':'orderno')+'='+(activestate=='WAIT_PAY'?it.payOrderNo:it.id))"
                                     class="waitpay m-b-10 boxshadow bg-w">
                                    <div class="waitpay m-b-10 boxshadow bg-w">
                                        <!-- <div class="waitpay m-b-10 boxshadow bg-w"
                                         @click="toOrderDetail(it.id,'',3)"> -->
                                        <!-- 其他订单 -->
                                        <detailStatus :itemOrderTypeName='it.itemOrderTypeName'
                                                      :orderNum="it.orderStatus"
                                                      :status="'complete-play'"></detailStatus>
                                        <!-- <div class="orderdate">
                                            <div class="date-wrap"> -->
                                        <!-- <span class="text">订单编号:</span>
                                                <span class="date">12558877011</span> -->
                                        <!-- <span class="model">门票</span> -->
                                        <!-- </div>
                                            <span class="fr state">{{it.orderStatus == 6?"退款中":"已退款"}}</span> -->
                                        <!-- <span class="fr state wait-pay">{{"待支付"||it.payStatus}}</span> -->
                                        <!-- <span class="fr state wait-play">待消费</span> -->
                                        <!-- </div> -->
                                        <div class="waitpay-info">
                                            <div class="info">
                                                <div class="my-info-title">{{it.orderInfo}}</div>
                                                <div class="my-content"
                                                     :class="it.orderType=='hotel'?'hotel':''">
                                                    <div class="all-info">
                                                        <div class="two-line info-text">
                                                            <span class="item-pre">联系人</span>
                                                            {{it.itemLinkName || it.linkName}}
                                                        </div>
                                                        <div class="two-line info-text go-date"
                                                             v-if="it.orderType!='eatery'">
                                                            <span class="item-pre">{{it.orderType=="hotel"?'入住/离店':'出游日期'}}</span>
                                                            {{it.orderType=="hotel"?it.startDateStr+' - '+it.endDateStr:it.startDateStr}}
                                                        </div>
                                                        <div class="two-line info-text go-date"
                                                             v-else>
                                                            <span class="item-pre">{{'使用日期'}}</span>
                                                            {{it.startDateStr+' - '+it.endDateStr}}
                                                        </div>
                                                        <div class="spec-price clearfix">
                                                            <span class="item-pre">总价</span>
                                                            <em class="money-flag">￥</em>
                                                            {{it.orderSum}}
                                                        </div>
                                                    </div>
                                                    <div class="info-num">
                                                        <div class="item-pre">
                                                            {{it.orderType=="hotel"?"天数:":'数量：'}}
                                                        </div>
                                                        {{it.orderType=="hotel"?it.moveInto+' 晚':it.amount }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pay">
                                                <div class="time-wrap">
                                                    <i></i>
                                                    <div class="time">{{it.orderTimeStr}}</div>
                                                </div>
                                                <!-- <div class="pay-money pay-btns">
                                                    <span class="invoice item-btn">开票</span>
                                                    <span class="complete item-btn">核销</span>
                                                </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="no-data"
                                 v-else><img src="https://cdn.51dmq.com/ui/showImg/no_order.png"
                                     alt="">
                                <div class="text">暂无订单</div>
                            </div>
                        </div>
                    </scroll-view>
                </swiper-item>
            </swiper>
            <pay-sure :canClose='true'
                      :totalPrice='payMoney'
                      ref='paysure'></pay-sure>
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
                            <span>￥{{payObj.paySum||0}}</span>
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
            <!-- 核销弹窗 -->
            <inputAlert @writeOffs="writeOffs"
                        :writeOffFlag='writeOffFlag'
                        @writeOffShow="writeOffShow"
                        :select='merchantListShow'
                        @pickerCancel='pickerCancel'
                        props='mchName'
                        :arr='merchantList'
                        :toastErr='toastErrFlag'
                        @pickerChange='merchantChange'></inputAlert>

            <!-- 核销弹窗 -->

        </div>
        <um-author ref="um_author"
                   @success="getCoupons"></um-author>
        <vue-tab-bar v-if='bottomShow'
                     :pageData='navigationData'
                     @fetch-index="clickIndexNav"
                     :selectNavIndex='selectNavIndex'></vue-tab-bar>
    </div>
</template>

<script>
    import { getData, postData, merchantInfoId } from "@/common/common";
    import paySure from "@/components/paysure";
    import umAuthor from '@/components/author';
    import detailStatus from "@/components/orderStatus/detailStatus";
    import inputAlert from "@/components/inputAlert";
    import navbar from "@/components/navbar";
    import vueTabBar from "@/components/customCom/vueTabBar"; //底部导航
    import { deflate } from 'zlib';
    import definedPicker from "@/components/definedpicker";
    import moment from 'moment';
    // import { resolve } from 'dns';
    export default {
        components: {
            paySure,
            navbar,
            vueTabBar,
            detailStatus,
            inputAlert,
            umAuthor
        },
        data() {
            return {
                merchant: {},//核销
                merchantList: [],//核销
                merchantListShow: false,//核销
                verificationShow: false,// 核销
                bottomShow: false,
                pageShow: true, //去除个人中心过来的过度效果
                isShow: true,
                activestate: "WAIT_PAY",
                listData: [[], [], [], []],
                pageLimt: [null, null, null, null], //初始化页面页数限制
                currentindex: 0,
                pageList: [1, 1, 1, 1],
                swiperHeight: null,
                payAnimation: null,//支付弹窗
                payShow: false,//支付弹窗
                payMoney: null,
                payOrderNo: null,
                orderDescription: null,
                payIndex: null,
                isSwitch: false, //是否个人中心跳转过来,保证不会触发switch中的getList
                navigationData: {},
                selectNavIndex: 1,
                canScroll: false, //是否允许页面滑动
                payAnimationData: {},
                flagModal: false, //点击其他地方，支付弹框不要消失
                payObj: {},
                writeOffFlag: false,
                selfWriteOffInfo: {},//自核销
                selfWriteOffId: '',//自核销id
                toastErrFlag: false//  核销输入框样式
            };
        },
        //   created() {

        //   },
        onLoad() {
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
            this.navigationData = wx.getStorageSync("getNavigationData");
            this.navigationData.range.map(item => {
                if (item == "orderpage") {
                    this.bottomShow = true;
                }
            });

            var res = wx.getSystemInfoSync();
            // console.log(res);
            this.swiperHeight =
                res.windowHeight - 119 - (this.navContentHeight + this.navBarHeight);
            // res.windowHeight - 39 - (this.navContentHeight + this.navBarHeight);
            // this.initData(); //第一次加载的时候，应该是请求并且展示全部
            if (this.$root.$mp.query.name && this.$root.$mp.query.num) {
                let name = this.$root.$mp.query.name;
                let num = this.$root.$mp.query.num;
                this.getList(name, num);
            }
        },
        onUnload() { },
        onHide() {
            this.$refs.paysure.justClosePayModal();
        },
        onShow() {
            this.initData()

            console.log("-----------------------------member onshow----1111111111----------------------")
            //用pageLimit看下原先数据是否请求过
            // console.log(this.$root.$mp.query);
            // var stateDates = ["", "0", "3", "4", "6"];//  0 待支付订单（单独一个接口获取数据）   '' 为全部订单 3,4,6 （另外一个接口）  分别表示已支付  已完成  退款等订单
            var stateDates = ["0", "1,2,3,8,9,10,13,14,16,17,18,24", "4,5,12,15,19,22,23", "6,7,11,20,21"];//  0 待支付订单（单独一个接口获取数据）   '' 为全部订单 3,4,6 （另外一个接口）  分别表示已支付  已完成  退款等订单
            console.log(this.pageLimt)
            this.pageLimt.forEach((item, index) => {
                if (item || item == 0) {
                    this.stateGetList(stateDates[index], index);
                }
            });
            let statestr = wx.getStorageSync("wxxjsc_orderstate_2019_9_18");
            console.log("-----------------------------member onshow-----------------------statestr---", statestr)
            let stateIndex = {
                all: 5,
                WAIT_PAY: 0,
                WAIT_CONSUME: 1,
                FINISH: 2,
                REFUNDING: 3
            };
            if (statestr) {
                //有状态，订单中心跳转过来-页面展示，并且需要请求数据
                // 1、页面展示
                let _this = this;
                this.isSwitch = true;
                this.pageShow = false;
                this.activestate = statestr;
                this.currentindex = stateIndex[statestr];
                setTimeout(function () {
                    _this.pageShow = true;
                }, 700);
                //2、请求借口，可能存在重复请求的问题，暂时不处理
                let pageIndex = stateIndex[statestr]
                this.stateGetList(stateDates[pageIndex], pageIndex);
                //清除缓存
                wx.removeStorageSync("wxxjsc_orderstate_2019_9_18");
            }
        },
        filters: {

        },
        methods: {
            toComment(val) {//去评论
                this.goUrl('pages/member/comment/main?payOrderNo=' + val)
            },
            merchantChange(item) {
                console.log(item)
                this.merchant = item;
                this.pickerCancel()
                this.verificationShow = true;
            },
            pickerCancel() {
                this.merchantListShow = false;
            },
            merchantListSelect() {
                // getData('/marketing/api/marketingCoupon/selectMerchantsbyCouponCode', {
                //     couponCode: this.coupon.code,
                // }).then(res => {
                //     if (res.status == 200) {
                //         this.merchantList = res.data;
                //     }
                // })
                this.merchantListShow = true;
            },
            //核销
            toOffShow(item) {
                // let info = {}
                let _this = this
                postData('/order/webapi/orderInfo/toSelfCheckOrder', { id: item.id }).then(res => {
                    console.log("res1", res.data)
                    this.selfWriteOffInfo = res.data
                    let midIdArr = []
                    res.data.details.forEach((item, index) => {
                        midIdArr.push(item.id)
                    })
                    this.selfWriteOffId = midIdArr.toString()
                })
                this.writeOffShow()
            },
            writeOffShow() {
                console.log(this.writeOffFlag)
                this.writeOffFlag = !this.writeOffFlag
            },
            writeOffs(val) {
                console.log("核销", val)
                let _this = this
                if (this.selfWriteOffId.length && this.selfWriteOffId.length > 0) {
                    postData('/order/webapi/orderInfo/doSelfCheckOrder', {
                        orderType: this.selfWriteOffInfo.orderInfo.orderType,
                        orderDetailIds: this.selfWriteOffId,
                        checkCode: val
                    }).then(res => {
                        wx.showToast({
                            title: "订单核销成功",
                            icon: "success",
                            duration: 1000,
                            success: function () {
                                _this.writeOffShow()
                                _this.stateGetList("1,2,3,8,9,10,13,14,16,17,18,24", 1);
                            }
                        })
                    }).catch(res => {
                        if (res.status == 402) {
                            this.toastErrFlag = true
                        }
                    })
                }
                // postData('', {}).then(res => {
                //     console.log("核销", res)
                //     this.writeOffShow()
                // })
            },
            //支付弹框
            openPayModal(obj) {
                this.payObj = obj;//缓存支付参数
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
                let obj = this.payObj
                //微信支付
                let _this = this;
                this.flagModal = false;
                let extendParamJson = JSON.stringify({
                    orderInfo: obj.orderInfo,
                    openId: wx.getStorageSync("WxXjscUserInfo").openId
                });
                getData(this.api.main.pay.goPay, {
                    accountId: merchantInfoId,
                    extendParamJson: extendParamJson,
                    operateId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
                    payOrderNo: obj.payOrderNo,
                    paySum: obj.paySum,
                    payType: obj.payType || 33,
                    userType: "C",
                    wayType: 6
                }).then(res => {
                    if (res.payLink == false) {
                        wx.navigateTo({
                            url:
                                "/pages/paymentSuccess/main?orderId=" +
                                obj.payOrderNo +
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
                            _this.closePayModal()
                            _this.initData()
                            wx.navigateTo({
                                url:
                                    "/pages/paymentSuccess/main?orderId=" +
                                    obj.payOrderNo +
                                    "&from=pay"
                            });
                        },
                        fail: function (res) { }
                    });
                }).catch(err => {
                    if (err.status == 410) this.$refs.um_author.toShowDate();
                });
            },
            //日期截取
            formateTimes(time) {
                console.log("------------------time----------------------", time.substring(0, 10))
                return time.substring(0, 10)
            },
            toOrderDetail(id, payOrderNo, status) {
                console.log("---------------------------")
                if (payOrderNo) {
                    wx.navigateTo({
                        url: "/pages/member/detail/main?payOrderNo=" + payOrderNo + "&status=" + status
                    })
                } else {
                    wx.navigateTo({
                        url: "/pages/member/detail/main?&id=" + id + "&status=" + status
                    })
                }

            },
            //staget  获取列表
            stateGetList(state, index) {
                let url = this.api.member.order.pagelist;
                let data = {
                    currPage: 1,
                    pageSize: 10 * this.pageList[index],
                    orderStatus: state
                };
                if (state == "0") {
                    //待付款状态的时候
                    url = this.api.member.order.waitPayList;
                    data = {
                        leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
                        currPage: 1,
                        pageSize: 10 * this.pageList[index],
                        payStatus: 0
                    };
                }
                getData(url, data, false).then(res => {
                    if (this.pageList[index] == 1) {
                        //当pagesize为10的时候去设置this.pageLimt[index]的最大页码数
                        this.pageLimt[index] = res.data.pages;
                    }
                    console.log("查看一下返回", res) ////////////
                    res.data.rows.forEach((item, index) => {
                        let stateName = "";
                        if (item.orderStatus == "0") {
                            stateName = "待付款";
                        } else if (item.orderStatus == "1") {
                            stateName = "待发货";
                        } else if (item.orderStatus == "2") {
                            stateName = "待收货";
                        } else if (item.orderStatus == "3") {
                            stateName = "待消费";
                        } else if (item.orderStatus == "4") {
                            stateName = "已完成";
                        } else if (item.orderStatus == "5") {
                            stateName = "已关闭";
                        } else if (item.orderStatus == "6") {
                            stateName = "退款中";
                        } else if (item.orderStatus == "7") {
                            stateName = "已退款";
                        } else if (item.orderStatus == "8") {
                            stateName = "订单异常";
                        } else if (item.orderStatus == "9") {
                            stateName = "订单待确认";
                        }
                        let arr = [];
                        if (state == "0") {
                            // 待付款
                            // 规格信息处理
                            console.log("----------------------看看演出下的订单---------------------", item)/////////////////
                            if (item.orderDetailVoList[0].orderType == "mdse") {
                                //地付款商品规格处理
                                item.orderDetailVoList.forEach((specItem, specIndex) => {
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].specArr = this.formatterSpec(specItem.specParam);
                                });
                            }
                            //演出
                            if (item.orderDetailVoList[0].orderType == "show") {
                                //地付款商品规格处理
                                item.orderDetailVoList.forEach((specItem, specIndex) => {
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].startTime = specItem.startDate
                                            ? specItem.startDate.split(" ")[0]
                                            : "";
                                });

                                item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                                item.endDateStr = item.endTime.substring(0, 10).replace(/-/g, '/');
                                item.itemOrderTypeName = "演出"
                                item.orderInfo = item.orderDescription;
                            }
                            if (item.orderDetailVoList[0].orderType == "park") {
                                //门票
                                item.orderDetailVoList.forEach((specItem, specIndex) => {
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].startTime = specItem.startDate
                                            ? specItem.startDate.split(" ")[0]
                                            : "";
                                });
                                item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                                item.endDateStr = item.endTime.substring(0, 10).replace(/-/g, '/');
                                item.itemOrderTypeName = "门票"
                                // item.orderInfo = item.orderDescription;
                            }
                            if (item.orderDetailVoList[0].orderType == "hotel") {
                                //酒店
                                item.orderDetailVoList.forEach((specItem, specIndex) => {
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].startTime = specItem.startDate
                                            ? specItem.startDate.split(" ")[0]
                                            : "";
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].endTime = specItem.endDate
                                            ? specItem.endDate.split(" ")[0]
                                            : "";
                                });
                                item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                                item.endDateStr = item.endTime.substring(0, 10).replace(/-/g, '/');
                                item.itemOrderTypeName = "酒店"
                                item.moveInto = moment(item.endTime).diff(item.startTime, 'days') ? moment(item.endTime).diff(item.startTime, 'days') : moment(item.endDate).diff(item.startDate, 'days') ? moment(item.endDate).diff(item.startDate, 'days') : 0
                                // item.orderInfo = item.orderDescription;
                                // console.log(res.data.rows);
                            }
                            if (item.orderDetailVoList[0].orderType == "route") {
                                //跟团游
                                // let orderTypeName = ["【成人票】", "【儿童票】"];
                                item.orderDetailVoList.forEach((specItem, specIndex) => {
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].startTime = specItem.startDate
                                            ? specItem.startDate.split(" ")[0]
                                            : "";

                                    // res.data.rows[index].orderDetailVoList[
                                    //     specIndex
                                    // ].orderTypeName =
                                    //     orderTypeName[specItem.detailType];
                                });
                                item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                                item.endDateStr = item.endTime.substring(0, 10).replace(/-/g, '/');
                                item.itemOrderTypeName = "跟团游"
                                // item.orderInfo = item.orderDescription;
                            }
                        } else {
                            //非待付款
                            if (item.orderType == "mdse") {
                                //商品sku处理
                                res.data.rows[index].specArr = this.formatterSpec(item.specParam);
                            }
                        }
                        if (item.orderType == "route") {
                            // let orderTypeName = ["【成人票】", "【儿童票】"];
                            res.data.rows[index].startTime = item.startTime
                                ? item.startTime.split(" ")[0]
                                : "";
                            res.data.rows[index].createTime = item.startTime
                                ? item.createTime.split(" ")[0]
                                : "";
                            // item.orderDetail.forEach((ele, i) => {
                            //     if (item.orderDetail.length == 1) {
                            //         res.data.rows[index].orderTypeName =
                            //             orderTypeName[ele.detailType];
                            //     } else if (item.orderDetail.length == 2) {
                            //         res.data.rows[index].orderTypeName =
                            //             orderTypeName[0] + "+" + orderTypeName[1];
                            //     }
                            // });

                            item.itemOrderTypeName = "跟团游"
                        }
                        console.log("看看这是啥子奥", item)
                        item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                        if (item.orderType != "eatery") {
                            item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                            item.endDateStr = item.endTime.substring(0, 10).replace(/-/g, '/');
                        } else {
                            item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                            item.endDateStr = item.endTime.substring(0, 10).replace(/-/g, '/');
                        }
                        item.orderInfo = item.orderDescription ? item.orderDescription : item.orderInfo ? item.orderInfo : '';
                        item.createTime = item.createTime ? item.createTime.substring(0, 10).replace(/-/g, '/') : item.orderTime ? item.orderTime.substring(0, 10).replace(/-/g, '/') : '';

                        if (item.orderType == "show") {
                            item.itemOrderTypeName = "演出"
                        }
                        if (item.orderType == "park") {
                            item.itemOrderTypeName = "门票"
                        }
                        if (item.orderType == "hotel") {
                            item.itemOrderTypeName = "酒店"
                            item.moveInto = moment(item.endTime).diff(item.startTime, 'days') ? moment(item.endTime).diff(item.startTime, 'days') : moment(item.endDate).diff(item.startDate, 'days') ? moment(item.endDate).diff(item.startDate, 'days') : 0
                        }
                        if (item.orderType == "eatery") {
                            item.itemOrderTypeName = "餐饮"
                        }

                        res.data.rows[index].stateName = stateName;
                        // res.data.rows[index].hide = false;
                        res.data.rows[index].startTime = item.startTime
                            ? item.startTime.split(" ")[0]
                            : "";
                        res.data.rows[index].endTime = item.endTime
                            ? item.endTime.split(" ")[0]
                            : "";
                    });
                    this.$set(this.listData, index, res.data.rows);  //////630
                }).catch(err => {
                    if (err.status == 410) this.$refs.um_author.toShowDate();
                });
            },
            formatterSpec(str) {
                //{"重量":"500g"},{"多少抽":"100抽"},{"颜色":"纯白"}
                var arr = [];
                str.split(",").forEach((item, index) => {
                    arr.push(JSON.parse(item)[Object.keys(JSON.parse(item))[0]]);
                });
                return arr;
            },
            delOrder(orderno) {
                //删除订单
                getData(this.api.member.delOrder, {
                    orderNo: orderno
                }).then(res => {
                    //已关闭只要全部列表里有，所以要重新请求下

                    getData(this.api.member.order.pagelist, {
                        currPage: 1,
                        pageSize: 10 * this.pageList[0],
                        orderStatus: ""
                    }).then(res => {
                        this.$set(this.listData, 0, this.listData[0].concat(res.data.rows));
                    });
                });
            },
            cancelRefund() {
                //取消退款
                getData(this.api.member.order.cancelRetreat, {
                    orderRefundNo: this.refundData.refundNo,
                    wayType: 33
                }).then(res => {
                    if (res.status == 200) {
                        wx.showToast({
                            title: "取消退款成功",
                            icon: "success",
                            duration: 1000,
                            success: function () {
                                //页面跳转后说

                            }
                        });
                    }
                });
            },
            openPaySure(paySum, payOrderNo, orderDescription, i) {
                this.payMoney = paySum;
                this.payOrderNo = payOrderNo;
                this.orderDescription = orderDescription;
                this.payIndex = i;
                getData("/merchant/api/merchantPayType/getMerchantPayType", {
                    businessType: "WXXCX",
                    merchantInfoId: merchantInfoId
                }).then(res => {
                    this.payType = JSON.parse(res.message)[0];
                    let extendParamJson = {
                        orderInfo: this.orderDescription,
                        openId: wx.getStorageSync("WxXjscUserInfo").openId
                    }
                    this.$refs.paysure.openPayModal();
                    this.$refs.paysure.data = {
                        accountId: merchantInfoId,
                        extendParamJson: JSON.stringify(extendParamJson),
                        operateId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
                        payOrderNo: this.payOrderNo,
                        paySum: this.payMoney,
                        payType: this.payType,
                        userType: "C",
                        wayType: 6
                    };
                });

            },
            cancelOrder(payOrderNo, index) {
                //取消订单
                postData(this.api.member.order.cancel, {
                    payOrderNo: payOrderNo,
                    leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId
                }).then(res => {
                    this.stateGetList(0, 1);
                    wx.showToast({
                        title: "订单取消成功",
                        icon: "success",
                        duration: 1000,
                        success: function () {
                            this.stateGetList(0, 1);
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                });
            },
            getBottom(index) {
                //触底，页面已经请求过，并且有数据才能触底，直接判断当前页码和this.pageLimt[index]的大小比对
                this.pageList[index]++;
                if (this.pageList[index] <= this.pageLimt[index]) {
                    // console.log(this.pageList);
                    this.getList(this.activestate, index);
                }
            },

            // 获取列表
            getList(state, index) {
                let that = this
                // console.log("getList");
                if (state == "WAIT_CONSUME") {
                    //待消费
                    // state = "3,14";
                    state = "1,2,3,8,9,10,13,14,16,17,18,24";
                } else if (state == "FINISH") {
                    //已完成
                    state = "4,5,12,15,19,22,23";
                    // state = "4,22";
                } else if (state == "REFUNDING") {
                    //售后
                    state = "6,7,11,20,21";
                    // state = "6";
                }
                let url = this.api.member.order.pagelist;
                let data = {
                    currPage: this.pageList[index],
                    pageSize: 10,
                    // orderStatus: '6',
                    orderStatus: state == "all" ? "" : state
                };
                if (state == "WAIT_PAY") {
                    //待付款
                    url = this.api.member.order.waitPayList;
                    data = {
                        leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
                        currPage: this.pageList[index],
                        pageSize: 10,
                        payStatus: 0
                    };
                }

                getData(url, data).then(res => {
                    // console.log("res对接订单", res)
                    this.pageLimt[index] = res.data.pages;

                    res.data.rows.forEach((item, index) => {
                        let stateName = "";
                        if (item.orderStatus == "0") {
                            stateName = "待付款";
                        } else if (item.orderStatus == "1") {
                            stateName = "待发货";
                        } else if (item.orderStatus == "2") {
                            stateName = "待收货";
                        } else if (item.orderStatus == "3") {
                            stateName = "待消费";
                        } else if (item.orderStatus == "4") {
                            stateName = "已完成";
                        } else if (item.orderStatus == "5") {
                            stateName = "已关闭";
                        } else if (item.orderStatus == "6") {
                            stateName = "退款中";
                        } else if (item.orderStatus == "7") {
                            stateName = "已退款";
                        } else if (item.orderStatus == "8") {
                            stateName = "订单异常";
                        } else if (item.orderStatus == "9") {
                            stateName = "订单待确认";
                        }
                        // if(item.orderType=='show'){////////785
                        //     item.itemOrderTypeName = "演出"
                        //     item.orderTimeStr = this.formateTimes(item.orderTime)
                        // }
                        let arr = [];
                        if (state == "WAIT_PAY") {
                            // 待付款  
                            ////演出
                            // console.log("-----------------2222222222222------------------")
                            // console.log(item.orderDetailVoList[0], item)
                            // console.log("------------------22222222222-----------------")
                            if (item.orderDetailVoList[0].orderType == "eatery") {
                                //处理 业态  和  订单时间  游玩时间
                                // item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                // item.startDateStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                item.orderTimeStr = item.createTime ? item.createTime.substring(0, 10).replace(/-/g, '/') : item.orderTime ? item.orderTime.substring(0, 10).replace(/-/g, '/') : '';
                                item.startDateStr = item.startDate ? item.startDate.substring(0, 10).replace(/-/g, '/') : item.startTime ? item.endTime.substring(0, 10).replace(/-/g, '/') : '';
                                item.endDateStr = item.endDate ? item.endDate.substring(0, 10).replace(/-/g, '/') : item.endTime ? item.orderTime.substring(0, 10).replace(/-/g, '/') : '';
                                item.itemOrderTypeName = "餐饮"
                                item.orderInfo = item.orderDescription;

                            }
                            if (item.orderDetailVoList[0].orderType == "show") {
                                //处理 业态  和  订单时间  游玩时间
                                item.orderTimeStr = item.orderTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startDate.substring(0, 10).replace(/-/g, '/');
                                item.itemOrderTypeName = "演出"
                                item.orderInfo = item.orderDescription;

                            }
                            if (item.orderDetailVoList[0].orderType == "mdse") {
                                //商品-待付款 购物车结算生成的待付款订单，没有分单，一个订单包含多个商品及对应的sku
                                item.orderDetailVoList.forEach((specItem, specIndex) => {
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].specArr = this.formatterSpec(specItem.specParam);
                                });
                                item.orderTimeStr = item.orderTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startDate.substring(0, 10).replace(/-/g, '/');
                                item.itemOrderTypeName = "商品"
                            }
                            if (item.orderDetailVoList[0].orderType == "park") {
                                //门票景区
                                // res.data.rows[
                                //   index
                                // ].startTime = item.orderDetailVoList[0].startDate.split(" ")[0];
                                // console.log(item);
                                item.orderDetailVoList.forEach((specItem, specIndex) => {
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].startTime = specItem.startDate
                                            ? specItem.startDate.split(" ")[0]
                                            : "";
                                });

                                item.orderTimeStr = item.orderTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startDate.substring(0, 10).replace(/-/g, '/');
                                item.itemOrderTypeName = "门票";
                                item.orderInfo = item.orderDescription;
                            }
                            if (item.orderDetailVoList[0].orderType == "hotel") {
                                //酒店
                                item.orderDetailVoList.forEach((specItem, specIndex) => {
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].startTime = specItem.startDate
                                            ? specItem.startDate.split(" ")[0]
                                            : "";
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].endTime = specItem.endDate
                                            ? specItem.endDate.split(" ")[0]
                                            : "";
                                });
                                item.orderTimeStr = item.orderTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startDate.substring(0, 10).replace(/-/g, '/');
                                item.endDateStr = item.endDate.substring(0, 10).replace(/-/g, '/');
                                item.moveInto = moment(item.endTime).diff(item.startTime, 'days') ? moment(item.endTime).diff(item.startTime, 'days') : moment(item.endDate).diff(item.startDate, 'days') ? moment(item.endDate).diff(item.startDate, 'days') : 0
                                item.itemOrderTypeName = "酒店";
                                item.orderInfo = item.orderDescription;
                            }
                            if (item.orderDetailVoList[0].orderType == "route") {
                                //跟团游
                                console.log("跟团游的订单", item)
                                // let orderTypeName = ["【成人票】", "【儿童票】"];
                                item.orderTimeStr = item.orderTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startDate.substring(0, 10).replace(/-/g, '/');
                                item.itemOrderTypeName = "跟团游"
                                item.orderInfo = item.orderDescription;
                                item.orderDetailVoList.forEach((specItem, specIndex) => {
                                    res.data.rows[index].orderDetailVoList[
                                        specIndex
                                    ].startTime = specItem.startDate
                                            ? specItem.startDate.split(" ")[0]
                                            : "";

                                    // res.data.rows[index].orderDetailVoList[
                                    //     specIndex
                                    // ].orderTypeName =
                                    //     orderTypeName[specItem.detailType];
                                });

                            }
                        } else {
                            //餐饮
                            if (item.orderType == "eatery") {
                                res.data.rows[index].startTime = item.startTime
                                    ? item.startTime.split(" ")[0]
                                    : "";
                                res.data.rows[index].createTime = item.createTime
                                    ? item.createTime.split(" ")[0]
                                    : "";
                                item.itemOrderTypeName = "餐饮"
                                item.itemLinkName = item.buyerName
                                item.orderTimeStr = item.createTime ? item.createTime.substring(0, 10).replace(/-/g, '/') : item.orderTime ? item.orderTime.substring(0, 10).replace(/-/g, '/') : '';
                                item.startDateStr = item.startTime ? item.startTime.substring(0, 10).replace(/-/g, '/') : item.startTime ? item.startTime.substring(0, 10).replace(/-/g, '/') : '';
                                item.endDateStr = item.endTime ? item.endTime.substring(0, 10).replace(/-/g, '/') : item.endTime ? item.endTime.substring(0, 10).replace(/-/g, '/') : '';

                            }
                            //非待付款
                            if (item.orderType == "mdse") {
                                item.itemOrderTypeName = "商品"
                                item.itemLinkName = item.buyerName
                                item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                                // 商品
                                // item.specParam.split(",").forEach((item, index) => {
                                //   arr.push(JSON.parse(item)[Object.keys(JSON.parse(item))[0]]);
                                // });
                                res.data.rows[index].specArr = this.formatterSpec(item.specParam);
                            }
                            //门票景区
                            if (item.orderType == "park") {
                                item.itemOrderTypeName = "门票"
                                item.itemLinkName = item.buyerName
                                item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                                res.data.rows[index].startTime = item.startTime
                                    ? item.startTime.split(" ")[0]
                                    : "";
                            }
                            //酒店
                            if (item.orderType == "hotel") {
                                item.itemOrderTypeName = "酒店"
                                item.itemLinkName = item.buyerName
                                item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                                item.endDateStr = item.endTime.substring(0, 10).replace(/-/g, '/');
                                item.moveInto = moment(item.endTime).diff(item.startTime, 'days') ? moment(item.endTime).diff(item.startTime, 'days') : moment(item.endDate).diff(item.startDate, 'days') ? moment(item.endDate).diff(item.startDate, 'days') : 0
                                res.data.rows[index].startTime = item.startTime
                                    ? item.startTime.split(" ")[0]
                                    : "";
                                res.data.rows[index].endTime = item.endTime
                                    ? item.endTime.split(" ")[0]
                                    : "";
                            }
                            if (item.orderType == "route") {
                                // let orderTypeName = ["【成人票】", "【儿童票】"];
                                res.data.rows[index].startTime = item.startTime
                                    ? item.startTime.split(" ")[0]
                                    : "";
                                res.data.rows[index].createTime = item.startTime
                                    ? item.createTime.split(" ")[0]
                                    : "";
                                item.itemOrderTypeName = "跟团游"
                                item.itemLinkName = item.buyerName
                                item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                                //订单列表拼接  儿童票名字
                                // item.orderDetail.forEach((ele, i) => {
                                //     if (item.orderDetail.length == 1) {
                                //         res.data.rows[index].orderTypeName =
                                //             orderTypeName[ele.detailType];
                                //     } else if (item.orderDetail.length == 2) {
                                //         res.data.rows[index].orderTypeName =
                                //             orderTypeName[0] + "+" + orderTypeName[1];
                                //     }
                                // });
                            }
                            if (item.orderType == "show") {
                                res.data.rows[index].startTime = item.startTime
                                    ? item.startTime.split(" ")[0]
                                    : "";
                                res.data.rows[index].createTime = item.createTime
                                    ? item.createTime.split(" ")[0]
                                    : "";
                                item.itemOrderTypeName = "演出"
                                item.itemLinkName = item.linkName || item.buyerName
                                item.orderTimeStr = item.createTime.substring(0, 10).replace(/-/g, '/');
                                item.startDateStr = item.startTime.substring(0, 10).replace(/-/g, '/');
                                // item.orderDetail.forEach((ele, i) => {
                                //     if (item.orderDetail.length == 1) {
                                //         res.data.rows[index].orderTypeName =
                                //             orderTypeName[ele.detailType];
                                //     } else if (item.orderDetail.length == 2) {
                                //         res.data.rows[index].orderTypeName =
                                //             orderTypeName[0] + "+" + orderTypeName[1];
                                //     }
                                // });
                            }
                        }

                        res.data.rows[index].stateName = stateName;
                        res.data.rows[index].hide = false;
                    });
                    console.log('show--------------------show', res.data.rows);
                    this.isShow = true;
                    this.$set(
                        this.listData,
                        index,
                        this.listData[index].concat(res.data.rows)
                    );
                }).catch(err => {
                    if (err.status == 410) this.$refs.um_author.toShowDate();
                });
            },
            initData() {
                // this.getList("", 0);
                this.listData[0] = []//支付完成初始化待支付列表
                this.getList('WAIT_PAY', 0)///////
            },
            goUrl(path) {
                this.navigatePageTo(this.router + path);
            },
            select(state, index) {
                // if (!this.listData[index].length) {
                //   this.isShow = false;
                //   this.getList(state, index);
                // }
                this.activestate = state;
                this.currentindex = index;
            },
            switchTab(e) {
                // console.log(e);
                //确定swiper滚动是触摸发起的
                if (e.mp.detail.source == "touch") {
                    this.currentindex = e.mp.detail.current;
                }

                // this.currentindex = e.mp.detail.current;
                if (e.mp.detail.current == 5) {
                    this.activestate = "all";
                } else if (e.mp.detail.current == 0) {
                    this.activestate = "WAIT_PAY";
                } else if (e.mp.detail.current == 1) {
                    this.activestate = "WAIT_CONSUME";
                } else if (e.mp.detail.current == 2) {
                    this.activestate = "FINISH";
                } else if (e.mp.detail.current == 3) {
                    this.activestate = "REFUNDING";
                }
                if (e.mp.detail.current == 1) {
                    //待付款状态 // 1代销费状态
                    this.isShow = false;
                }
                if (!this.listData[e.mp.detail.current].length && !this.isSwitch) {
                    this.getList(this.activestate, e.mp.detail.current);
                } else {
                    this.isShow = true;
                }
                this.isSwitch = false;
            },
            gotoGame(path) {
                this.reLaunchPageTo(this.router + path);
            }
        }
    };
</script>

<style lang="scss">
    .order-list {
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

        background: #eff1f6;
        width: 100%;
        overflow: hidden;
        .topShadow {
            width: 100%;
            height: 0.5px;
            background-color: rgba(146, 144, 144, 0.2);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
        }
        .state-ul {
            display: flex;
            height: 50px;
            justify-content: space-around;
            align-items: center;
            font-size: 14px;
            color: #5c5c5c;
            font-family: PingFangSC-Regular, sans-serif;
            .state-li {
                .state-title {
                    padding: 10px 6px;
                }
            }
            .state-li.active {
                color: #f05b47;
                position: relative;
            }
            .state-li.active::after {
                content: "";
                display: block;
                height: 2px;
                width: 40%;
                background: #f05b47;
                position: absolute;
                bottom: 0;
                left: 30%;
                border-radius: 1px;
            }
        }
        .state-content {
            height: 100%;
            .content-item {
                height: 100%;
                .no-data {
                    padding-top: 117px;
                    text-align: center;
                    img {
                        display: block;
                        width: 75px;
                        height: 100px;
                        object-fit: cover;
                        margin: 0 auto;
                    }
                    .text {
                        display: inline-block;
                        width: 75px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 14px;
                        text-align: center;
                        color: #999999;
                        letter-spacing: 2.5px;
                        font-family: PingFangSC-Regular, sans-serif;
                    }
                }
                .item-ul {
                    .waitpay {
                        &:last-of-type {
                            margin-bottom: 0;
                        }
                        .orderdate {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-family: PingFang SC Regular;
                            height: 36px;
                            vertical-align: middle;
                            padding: 0 10px;
                            font-size: 13px;
                            color: #666666;
                            font-family: PingFangSC-Regular, sans-serif;
                            border: 1px dotted #eff1f6;
                            .date-wrap {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            }
                            .model {
                                display: inline-block;
                                height: 20px;
                                line-height: 20px;
                                border: 1px solid #fef2f3;
                                margin-left: 10px;
                                width: 50px;
                                border-radius: 10px;
                                background: #fef2f3;
                                text-align: center;
                                color: #ef0017;
                                font-size: 12px;
                            }
                            .text {
                                margin-left: 5px;
                                margin-right: 8px;
                            }
                            .state {
                                font-family: PingFang SC Medium;
                                font-size: 13px;
                                margin-right: 10px;
                                color: #ccc;
                                &.wait-pay {
                                    color: #ef0017;
                                }
                                &.wait-play {
                                    color: #449cff;
                                }
                            }
                            .date {
                                display: inline-block;
                                width: 89px;
                                white-space: nowrap;
                                overflow: hidden;
                                // text-overflow: ellipsis;
                            }
                        }
                        .waitpay-info {
                            .waitpay-info-item {
                                margin-bottom: 5px;
                            }
                            .img {
                                height: 80px;
                                width: 80px;
                                float: left;
                            }
                            .info {
                                // margin-left: 92px;
                                padding-left: 10px;
                                padding-right: 10px;
                                .my-info-title {
                                    padding-left: 5px;
                                    display: inline-block;
                                    height: 45px;
                                    line-height: 45px;
                                    font-family: PingFang SC Medium;
                                    font-size: 17px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    color: #333333;
                                    max-width: calc(100% - 22px);
                                    text-overflow: ellipsis;
                                }
                                .my-content {
                                    .info-num {
                                        vertical-align: top;
                                        display: inline-block;
                                        // width: 50%;
                                        font-size: 13px;
                                        color: #333333;
                                        font-family: PingFang SC Regular;
                                        .item-pre {
                                            display: inline-block;
                                            margin-left: 27.5px;
                                            margin-right: 5px;
                                            color: #999;
                                        }
                                    }
                                    &.hotel {
                                        .info-num {
                                            margin-left: -84px;
                                        }
                                    }
                                    .all-info {
                                        display: inline-block;
                                        // width: 50%;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        .info-text {
                                            width: 100%;
                                            overflow: hidden;
                                            white-space: nowrap;
                                            padding-left: 5px;
                                            font-size: 14px;
                                            color: #333333;
                                            font-family: PingFangSC-Regular,
                                                sans-serif;
                                            margin-bottom: 12px;
                                            .item-pre {
                                                display: inline-block;
                                                width: 52.5px;
                                                font-size: 13px;
                                                color: #999;
                                                margin-right: 15px;
                                                font-family: PingFang SC Regular;
                                            }
                                            &.go-date {
                                                .item-pre {
                                                    // margin-right: 15px;
                                                }
                                            }
                                        }
                                        .spec-price {
                                            // display: flex;
                                            // justify-content: space-between;
                                            .item-pre {
                                                display: inline-block;
                                                width: 52.5px;
                                                margin-right: 15px;
                                            }
                                            width: 100%;
                                            overflow: hidden;
                                            white-space: nowrap;
                                            padding-left: 5px;
                                            font-family: PingFang SC Heavy;
                                            font-size: 16px;
                                            color: #ef0017;
                                            .money-flag {
                                                font-family: PingFang SC Regular;
                                                display: inline-block;
                                                font-size: 12px;
                                                color: #ef0017;
                                                font-style: unset;
                                            }
                                            .spec-list {
                                                line-height: 11px;
                                                .spec-item {
                                                    font-size: 11px;
                                                    color: #999999;
                                                    font-family: PingFangSC-Regular,
                                                        sans-serif;
                                                    margin-right: 12px;
                                                }
                                            }
                                            .spec-list {
                                                width: 75%;
                                            }
                                            .price-info {
                                                color: #5c5c5c;
                                                font-family: PingFangSC-Regular,
                                                    sans-serif;
                                                .price {
                                                    font-size: 14px;
                                                }
                                                .num {
                                                    font-size: 15px;
                                                    .unit {
                                                        font-size: 12px;
                                                        margin-right: 6px;
                                                        margin-top: 3px;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            .pay {
                                padding-left: 10px;
                                padding-right: 10px;
                                height: 44px;
                                border-top: 1px dotted #eff1f6;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                align-items: center;
                                margin-top: 15px;
                                .pay-btns {
                                    .item-btn {
                                        display: inline-block;
                                        width: 80px;
                                        height: 30px;
                                        line-height: 30px;
                                        text-align: center;
                                        border-radius: 5px;
                                        margin-left: 10px;
                                        letter-spacing: 1px;
                                        &.invoice {
                                            border: 1px solid #ef0017;
                                            color: #ef0017;
                                        }
                                        &.complete {
                                            background: #ef0017;
                                            border: 1px solid #ef0017;
                                            color: #fff;
                                        }
                                    }
                                }
                                .time-wrap {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    i {
                                        margin-left: 2px;
                                        display: inline-block;
                                        width: 15px;
                                        height: 15px;
                                        background: url("https://cdn.51dmq.com/ui/showImg/time.png")
                                            no-repeat center;
                                        background-size: 100% 100%;
                                        margin-right: 9px;
                                    }
                                    font-family: PingFang SC Regular;
                                    font-size: 13px;
                                    color: #333333;
                                    .time {
                                        display: inline-block;
                                        max-width: 80%;
                                        overflow: hidden;
                                    }
                                }
                                .pay-money {
                                    font-size: 14px;
                                    color: #f05b47;
                                    font-family: PingFangSC-Regular, sans-serif;
                                    .text {
                                        color: #413838;
                                        margin-right: 8px;
                                    }
                                }
                                .order-btn {
                                    text-align: center;
                                    height: 25.5px;
                                    line-height: 25.5px;
                                    padding: 0 9px;
                                    border-radius: 2px;
                                    font-size: 12px;
                                    font-family: PingFangSC-Regular, sans-serif;
                                }
                                .red-btn {
                                    background: #f05b47;
                                    color: #fff;
                                    margin-left: 15px;
                                }
                                .cancel-btn {
                                    color: #f05b47;
                                    border: 0.5px solid #f05b47;
                                    height: 23.5px;
                                    line-height: 23.5px;
                                }
                            }
                        }
                    }
                    //全部订单
                    .item-li {
                        height: 108px;
                        padding: 0 15px;
                        padding-top: 20px;
                        .img {
                            padding-bottom: 20px;
                            display: flex;
                            justify-content: space-between;
                            .item-img-box {
                                display: flex;
                                align-items: center;
                                .state-img {
                                    margin-right: 8px;
                                    height: 25px;
                                    width: 25px;
                                    border-radius: 50%;
                                }
                                .title {
                                    font-size: 14px;
                                    color: #413838;
                                    font-family: PingFangSC-Regular, sans-serif;
                                }
                            }
                            .item-text {
                                font-size: 14px;
                                color: #f05b47;
                                font-family: PingFangSC-Regular, sans-serif;
                            }
                            .item-text.close {
                                color: #413838;
                            }
                        }
                        .name-price {
                            padding-bottom: 8px;
                            font-size: 14px;
                            display: flex;
                            justify-content: space-between;
                            .name {
                                color: #413838;
                                font-family: PingFangSC-Regular, sans-serif;
                                font-weight: 500;
                            }
                            .price {
                                color: #5c5c5c;
                                font-family: PingFangSC-Regular, sans-serif;
                            }
                        }
                        .use-info {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .time {
                                font-size: 12px;
                                color: #5c5c5c;
                                font-family: PingFangSC-Regular, sans-serif;
                                .text {
                                    margin-right: 7px;
                                }
                            }
                            .num-detail {
                                display: flex;
                                align-items: center;
                                .num {
                                    font-size: 14px;
                                    color: #5c5c5c;
                                    font-family: PingFangSC-Regular, sans-serif;
                                }
                                .detail-look {
                                    font-size: 12px;
                                    color: #f16c5a;
                                    font-family: PingFangSC-Regular, sans-serif;
                                    height: 25.5px;
                                    border: 0.5px solid #f16c5a;
                                    border-radius: 2px;
                                    line-height: 25.5px;
                                    padding: 0 8px;
                                    margin-left: 24px;
                                }
                                .detail-look.close {
                                    color: #5c5c5c;
                                    border-color: #5c5c5c;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
