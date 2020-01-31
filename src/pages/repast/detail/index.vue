<template>
  <div class="detail-warp" :class="{overflow:canScroll}">
    <navbar title="餐饮详情"></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <div class="swiper-box" v-if="imgUrl.length">
        <!-- <swiper :imgUrl="imgUrl"></swiper> -->
        <div class="swiper-container">
          <!-- <button @click.stop="test">zzzz</button> -->
          <swiper
            class="swiper"
            indicator-color="#f7f7f7"
            indicator-active-color="#fff"
            @change="currentChange"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
          >
            <!-- <block > -->
            <swiper-item v-for="(item,index) in imgUrl" :key="index">
              <image @click="test" :src="item" class="slide-image" />
              <!-- <button @click="test">tes{{index}}t</button> -->
            </swiper-item>
            <!-- </block> -->
          </swiper>
          <div class="dots-list">
            <div
              v-for="(item,index) in imgUrl"
              :key="index"
              class="dots-item"
              :class="{active:activeIndex==index}"
            ></div>
          </div>
          <div class="detail-radius"></div>
        </div>
      </div>
      <!--详情页主要信息-->
      <div class="detail-info clearfix boxshadow">
        <div class="fl detail-info-main">
          <div class="detail-info-flex">
            <div class="detail-info-left">
              <h1 class="detail-info-title">
                <!-- <i class="blf4"></i> -->
                <span class="detail-info-ztitle">{{detailData.name}}</span>
              </h1>
              <div class="detail-price">
                <span class="start-text">人均：</span>
                <span class="money-sign">¥&nbsp;</span>
                <span class="show-price">{{detailData.priceShow}}</span>
                <div class="subName-text" v-for="(item, index) in detailData.labels" :key="index">{{item}}</div>
              </div>
            </div>
            <div class="address-detail" @click="getLocation">
              <img src="" alt="">
              <div class="address-text">到这里</div>
            </div>
          </div>
          <div class="detail-ydxz" @click="toMustKnow(detailData.noticeid)">
            <div class="ydxz-text">预订须知</div>
            <div class="ydxz-text1">详情</div>
          </div>
          <div class="arrow-detail">&#155;</div>
          <div class="block-hr"></div>
          <div class="pingfeng">
            <div :class="{xingxing:true, buliang:false}"></div>
            <div :class="{xingxing:true, buliang:false}"></div>
            <div :class="{xingxing:true, buliang:false}"></div>
            <div :class="{xingxing:true, buliang:false}"></div>
            <div :class="{xingxing:true, buliang:true}"></div>
            <div class="pingfen-num">{{detailData.avgScore}}<span style="font-size:12px">分</span></div>
            <div class="pinglun">{{detailData.countComment}}条评论</div>
          </div>
          <div class="arrow-detail1">&#155;</div>
        </div>
      </div>
      <!--优惠券-->
      <div class="detail-info-content">
        <div class="hotel-info-item hotel-none-border" v-if="twoCoupon.length">
          <div class="hotel-info-label">领优惠券</div>
          <div class="hotel-info-value">
            <div>
              <div class="hotel-info-coupon" @click="goCoupon" v-for="(item, index) in twoCoupon" :key="index">满{{item.targetAmout}}减{{item.amount}}</div>
            </div>
            <div class="hotel-info-arrow">&#155;</div>
          </div>
        </div>
        <div class="hotel-info-item" @click="calling">
          <div class="hotel-info-label">咨询电话</div>
          <div class="hotel-info-value">
            <div class="hotel-info-bold">{{detailData.linkTel}}</div>
            <div class="hotel-info-arrow">&#155;</div>
          </div>
        </div>
      </div>

      <!-- 可选票型 -->
      <div class="block_Box">
        <div class="block_title">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可选票型
          <img class="title_icon" src="https://cdn.51dmq.com/ui/um/kexuan.png" alt>
        </div>
        <div class="cTicket_box" v-for="(val, index) in ticketType" :key="index">
          <div class="cTicket_title">{{val.name}}</div>
          <div class="cTicket_price"><span class="cTicket_span">¥&nbsp;</span>{{val.priceList[0]}}<span class="cTicket_span">.{{val.priceList[1]}}</span></div>
          <div class="lable_box">
            <div class="cTicket_lableTitle" @click='ticketNotice(val)'>预订须知</div>
            <!-- <span class="cTicket_lableContent">可以叠加使用</span> -->
          </div>
          <div class="cTicket_numBox">
            <div :class="{cTicket_numBtn1:true, cTicket_enable:val.num<1}" @click="toMin(index)">-</div>
            <div class="cTicket_numShow">{{val.num}}</div>
            <div :class="{cTicket_numBtn2:true, cTicket_enable:false}" @click="toAdd(index)">+</div>
          </div>
        </div>
      </div>

      <!-- 美食介绍 -->
      <div class="block_Box">
        <div class="block_title">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;美食介绍
          <img class="title_icon" src="https://cdn.51dmq.com/ui/um/xiangqing.png" alt>
        </div>
        <div class="jqDetail_contentBox">
          <wx-parse :contentstr="detailData.content"></wx-parse>
        </div>
      </div>

      <div class="fnIconBox">
        <div class="fnContent">
          <div class="fnIcon_optBox">
            <img class="fnIcon_img" src="https://cdn.51dmq.com/ui/um/jiemudan.png" alt>
            <div class="fnIcon_text">节目单</div>
          </div>
          <div class="fnIcon_optBox">
            <img class="fnIcon_img" src="https://cdn.51dmq.com/ui/um/meishi.png" alt>
            <div class="fnIcon_text">美食</div>
          </div>
          <div class="fnIcon_optBox">
            <img class="fnIcon_img" src="https://cdn.51dmq.com/ui/um/songli.png" alt>
            <div class="fnIcon_text">宋礼</div>
          </div>
          <div class="fnIcon_optBox">
            <img class="fnIcon_img" src="https://cdn.51dmq.com/ui/um/gonglue.png" alt>
            <div class="fnIcon_text">攻略</div>
          </div>
          <div class="fnIcon_optBox">
            <img class="fnIcon_img" src="https://cdn.51dmq.com/ui/um/daolang.png" alt>
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
        <div :class="{footBuyBtn_buy:true, footBtn_false_buy:false}" @click="buyNow">立即订购</div>
        <div :class="{footBuyBtn_add:true, footBtn_false_add:false}" @click="goUrl('pages/order/car/main')">加入购物车</div>
      </div>

      <!-- 订购须知弹框 -->
      <div class="mustBox" :animation="animationData_back" v-if="showMust" @click="toCloseMustKnow">
        <div class="must_contentBox" :animation="animationData_content" @click.stop>
          <div class="must_Title">预定须知</div>
          <div class="must_mainBox">
              <wx-parse :contentstr="noticeStr"></wx-parse>
          </div>
          <div class="must_closeBtn" @click="toCloseMustKnow">关闭</div>
        </div>
      </div>

      <!-- 评论弹框 -->
      <div class="plBox">
        
      </div>

      <!--预订弹框-->
      <div class="toast-box">
        <div v-if="show" @click="closeModal" class="mask"></div>
        <div :animation="animationData" class="modal" catchtouchmove="’true’">
          <slot name="header">
            <div class="section playDate">
              <div class="pxkx-text">
                <span class="name">可选时间</span>
                <i @click="closeModal" class="fr close xx-icon icon-guanbi2"></i>
              </div>
              <div class="picker-box">
                <div class="playDate-text">游玩时间</div>
                <div class="date-select-box">
                  <picker
                    mode="date"
                    :value="playDate"
                    :start="startDate"
                    @change="bindDateChange"
                    class="date-picker"
                  >
                    <div class="picker">{{playDate}}</div>
                  </picker>
                  <span class="xx-icon icon-iconfont-jiantou jiantou-svg"></span>
                </div>
              </div>
            </div>
            <div class="modal-head clearfix">
              可选票型
              <span
                v-if="isSinglebuy=='2'"
                class="single-notice"
                :class="{active:addNum>1}"
              >(一次只能预定一种票型)</span>
            </div>
          </slot>
          <div class="modal-content">
            <scroll-view
              :style="{'height': '265px'}"
              :scroll-y="true"
              @scrolltolower="scrolltolower"
              @scroll="scroll"
            >
              <div class="order-px">
                <div v-if="itemData.length>0" class="px-ul">
                  <div v-for="(item,index) in itemData" :key="index" class="px-li clearfix">
                    <div class="clearfix">
                      <div class="px-left">
                        <p class="px-name two-line">{{ item.nickName }}</p>
                        <p class="px-price">
                          <span class="money-sign">¥&nbsp;</span>
                          <span class="nowprice">{{ item.priceSettle }}</span>
                          <span class="oriprice">{{ item.merchantLinePrice }}</span>
                        </p>
                        <p
                          class="ydxz"
                          @click="goUrl('pages/scenic/detail/orderInfo/main?id='+item.id+'&playDate='+playDate)"
                        >预订须知</p>
                      </div>
                      <div class="px-right">
                        <span class="number">{{item.num}}</span>
                        <span
                          class="sub"
                          :class="{sub0:item.num==0}"
                          @click.stop="sub(index, item)"
                        >-</span>
                        <span class="add" @click.stop="add(index, item)">+</span>
                      </div>
                    </div>
                    <div v-if="item.timeReserveListArr.length>0" class="fsyy-ul clearfix">
                      <div
                        v-for="(iet, ide) in item.timeReserveListArr"
                        :key="ide"
                        :class="{active: ide==timeIndexArr[index]}"
                        class="fsyy-li"
                        @click="selectedTime(iet, ide,index)"
                      >{{iet.startTime}} - {{iet.endTime}}</div>
                    </div>
                    <div v-if="item.showTimeTips" class="fsyy-tips">当前游玩日期没有可选时间段，换个日期试试</div>
                  </div>
                </div>
                <!--没有数据-->
                <div v-else class="noData">
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
                    <em class="totalPrice" id="totalPrice">{{totalPrice}}</em>
                  </span>
                </div>
              </div>
            </div>
            <div class="next-right fr">
              <template v-if="authorization">
                <span v-if="number>0" class="next-btn" @click="checkIfgo">下一步</span>
                <span v-else class="next-btn next-btn2">下一步</span>
              </template>
              <button
                v-else
                open-type="getUserInfo"
                @getuserinfo="getUserInfo"
                class="authorization-btn"
              >下一步</button>
            </div>
          </div>
        </div>
      </div>
      <!--预订弹框-->

      <!-- 购票提醒 -->
      <div v-if="noticeShow" @click="fail" class="notice">
        <div class="body">
          <div class="title">购票提醒</div>
          <div class="content">
            <div class="content-box">
              <wx-parse :contentstr="noticeStr"></wx-parse>
            </div>
          </div>
          <div class="footer clearfix">
            <span @click.stop="fail" class="fl fail">不同意</span>
            <span @click.stop="success" class="fr success">同意</span>
          </div>
        </div>
      </div>
      <!-- 购票提醒 -->
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import navbar from "@/components/navbar";
import recommend from '@/components/recommend';
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
    recommend
  },
  data() {
    return {
      productCodes: '',
      productCode: '',
      twoCoupon: [],
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
      cities: "",//推荐产品  城市id
      parkIds: '',//推荐产品  景区id
      productCodess: '',//推荐产品  产品id
      ifShow: false,
      dateChoose:[
        {
          date:'11/25',
          price:'320.00'
        },
        {
          date:'11/26',
          price:'320.00'
        },
        {
          date:'11/27',
          price:'320.00'
        },
        {
          date:'11/28',
          price:'320.00'
        },
        {
          date:'11/29',
          price:'320.00'
        },
        {
          date:'11/30',
          price:'320.00'
        },
        {
          date:'12/01',
          price:'320.00'
        },
        {
          date:'12/02',
          price:'320.00'
        }
      ],
      dateNow:0,
      ticketType:[],
      remenList:[
        {
          pic:'',
          name:'我是名字',
          price:320,
          saled:100
        },
        {
          pic:'',
          name:'我是名字',
          price:320,
          saled:100
        },
        {
          pic:'',
          name:'我是名字',
          price:320,
          saled:100
        },
        {
          pic:'',
          name:'我是名字',
          price:320,
          saled:100
        }
      ]
    };
  },
  methods: {
    calling() {
      wx.makePhoneCall({
        phoneNumber: this.detailData.linkTel,
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    },
    buyNow() {
      let ticketType = [];
      this.ticketType.some(item=>{
        if(item.num)
        ticketType.push(item)
      });
      if(ticketType.length){
        wx.setStorageSync('ticketType', ticketType);
        this.goUrl('pages/repast/order/main');
      }
    },
    getLocation() {
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
        }
      })
    },
    ticketNotice(val) {
      this.toMustKnow(val.bookingNotice);
    },
    toMustKnow(val){
      this.noticeStr = val;
      this.showMust=true;
      setTimeout(()=>{
        this.animation_back.opacity(1).step();
        this.animation_content.bottom(0).step();
        this.animationData_back = this.animation_back.export();
        this.animationData_content = this.animation_content.export();
      });
    },
    toCloseMustKnow(){
      this.animation_back.opacity(0).step();
      this.animationData_back = this.animation_back.export();
      this.animation_content.bottom('-800rpx').step();
      this.animationData_content = this.animation_content.export();
      setTimeout(()=>{
        this.showMust=false;
      }, 600);
    },
    toMin(index){
      if(this.ticketType[index].num>=1)this.ticketType[index].num--;
    },
    toAdd(index){
      /*this.ticketType.map((item,inde)=>{
        if(index!=inde)
        item.num = 0;
      })*/
      this.ticketType[index].num++;
    },
    getUserInfo(e) {
      if (e.mp.detail.userInfo) {
        //授权成功
        this.authorization = true;
        //huancu
        setUserInfo().then(res => {
          if (this.number > 0) {
            this.checkIfgo();
          }
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
    goUrl(path) {
      this.navigatePageTo(this.router + path);
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
      if(res.status == 200) {
        this.twoCoupon = res.data.rows.splice(0,2);
      }
    },
    goCoupon() {
      this.goUrl('pages/member/coupon/mycoupon/main?productCode='+this.productCodes+'&distributionPath='+0)
    }
  },
  onLoad() {
    // 推荐产品id 和code
    this.productCodess = this.$root.$mp.query.productCode
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

    this.playDate = this.getCurDate();
    let _this = this,
      recommendFlag = _this.$root.$mp.query.recommendFlag,
      leagureId = wx.getStorageSync("WxXjscUserInfo").leaguerId,
      payOrderNo = _this.$root.$mp.query.payOrderNo;

    let detailUrl = api.repast.detail.main,
      commentUrl = api.main.comment.list;
    if (recommendFlag && leagureId && payOrderNo) {
      var pd = getData(detailUrl, {
        // wayType: _this.wayType,
        id: _this.$root.$mp.query.id,
        merchantInfoId: merchantInfoId,
        recommendFlag: recommendFlag,
        payOrderNo: payOrderNo,
        leaguerId: leagureId
      });
    } else {
      var pd = getData(detailUrl, {
        // wayType: _this.wayType,
        id: _this.$root.$mp.query.id,
        merchantInfoId: merchantInfoId
      });
    }
    let pc = getData(commentUrl, {
      //   wayType: _this.wayType,
      productType: "eatery",
      productCode: _this.$root.$mp.query.productCode,
      merchantInfoId: merchantInfoId
    });
    wx.showLoading({
      title: "加载中..."
    });
    Promise.all([pd, pc])
      .then(result => {
        console.log(result);
        _this.productCodes = [];
        result[0].data.merchantRepastCouponVos.map(item=>{
          let priceSettle = item.priceSettle?item.priceSettle:0;
          priceSettle = priceSettle.toFixed(2);
          item.priceList = priceSettle.split('.');
          item.num = 0;
          _this.productCodes.push(item.productCode);
        });
        // 推荐产品 城市id
        this.cities = result[0].data.cityId?result[0].data.cityId:''
        wx.setStorageSync("wxxcx_citys", this.cities);
        if(this.productCodess && this.productCodess != ''){
          this.ifShow = true
        }
        wx.setStorageSync('xjsc_merchantProductCode', this.productCodess)
        // 查询优惠券
        _this.searchCoupon({
          productCodes: _this.productCodes.join(','),
          merchantInfoId: merchantInfoId,
          distributionPath: 0, // 4：个人中心
          currPage: 1,
          pageSize: 1000
        },_this.searchCouponCB);
        _this.detailData = result[0].data;
        _this.ticketType = _this.detailData.merchantRepastCouponVos;
        _this.commentData = result[1].data;
        _this.imgUrl = result[0].data.merchantPictureLibVo.wapUrl
          ? result[0].data.merchantPictureLibVo.wapUrl.split(",")
          : [];
        if (result[0].data.labels != "") {
          result[0].data.labels = result[0].data.labels.split(",");
        }
        _this.couponsList = result[0].data.merchantRepastCouponVos;
        // _this.testHeight = Math.round(_this.couponsList.length) * 1212;

        // _this.scenicDetail = result[0].data.content.replace(/<\/?[>]*>/g, "");
        _this.scenicDetail = result[0].data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
        // _this.orderDetail = result[0].data.noticeid.replace(/<\/?[>]*>/g, "");
        _this.orderDetail = result[0].data.noticeid.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
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
        wx.setStorageSync('eateryInfo', _this.detailData);
        wx.showShareMenu({
          withShareTicket: true
        })
        wx.hideLoading();
      })
      .catch(error => {});
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
    // total() {
    //   let _this = this,
    //     sum = 0;
    //   _this.number = 0;
    //   _this.itemData.forEach((item, index) => {
    //     _this.number += item.num;
    //     sum += item.num * item.priceSettle;
    //   });
    //   return sum.toFixed(2);
    // }
  },
  onUnload() {
    this.closeModal();
    this.detailData.latitudeLongitude = [];
  },
  onShow() {
    this.closeModal();
    this.getAllSetting();
  },
  onReady() {
    // setTimeout(() => {
    //   let _this = this;
    //   const query = wx.createSelectorQuery();
    //   query
    //     .select("#test-height")
    //     .boundingClientRect(function(rect) {
    //     //   console.log(rect);
    //       _this.testHeight = rect.top;
    //     })
    //     .exec();
    // }, 500);
  }
};
</script>

<style lang="scss" scoped>
.detail-warp {
  width: 100%; background-color: #f7f7f7; font-family: PingFangSC-Regular, sans-serif;
  .notice {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.3); display: flex; justify-content: center; align-items: center; z-index: 750; font-family: PingFangSC-Regular, sans-serif;
    .body {
      width: 90%; background: #ffffff; border-radius: 2px;
      .title {
        text-align: center; color: #413838; font-size: 16px; height: 30px; line-height: 30px;
      }
      .content {
        padding: 15px 10px; border-top: 0.5px solid #eeeee7; font-size: 16px; font-family: PingFangSC-Regular, sans-serif; color: #413838; word-break: break-all; word-wrap: break-word;
        .content-box {
          overflow: auto; max-height: 200px;
          .img-box {
            padding: 0;
          }
        }
      }
      .footer {
        border-top: 0.5px solid #eeeee7;
        .fail {
          color: #413838; font-size: 16px; height: 49px; line-height: 49px; text-align: center; width: 50%;
        }
        .success {
          color: #fff; background: #f05b47; font-size: 16px; height: 49.5px; line-height: 49.5px; text-align: center; width: 50%;
        }
      }
    }
  }
  .noData {
    .nodata-svg {
      font-size: 34.5px; color: #cbcbcb;
    }
    .nodata-text {
      font-size: 16px;
    }
  }
  .swiper-box {
    width: 100%; height: 221.5px;
    .swiper-container {
      position: relative; height: 221.5px;
      .detail-radius {
        color:red; width:100%; height:5px; background:white; border-radius:5px 5px 0 0; position:absolute; bottom:0; left:0; z-index:500;
      }
      .swiper {
        width: 100%; height: 221.5px;
        image {
          width: 100%; height: 221.5px;
        }
      }
      .dots-list {
        position: absolute; width: 100%; bottom: 9px; left: 0px; display: flex; justify-content: center;
        .dots-item {
          height: 5px; width: 5px; margin: 0 5px; border-radius: 50%; background: #fff; opacity: 0.5;
        }
        .dots-item.active {
          background: #fff; opacity: 1;
        }
      }
    }
  }
  .detail-info {
    width: 100%; height: 120px; background-color: #fff;
    .detail-info-main {
      width: 100%; height: 130px; position: relative;
      .detail-info-flex {
        height: 70px;
        padding-left: 12px;
        padding-right: 18px;
        border-bottom: 0.5px solid #f0f2f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .address-detail {
          img {
            width: 15px;
            height: 15px;
          }
          .address-text {
            line-height: 24px;
            color: #333;
            font-size: 12px;
          }
        }
      }
      .detail-info-title {
        line-height: 24px;
        padding-bottom: 10px;
        .detail-info-ztitle {
          font-size: 18px; color: #413838; display: inline-block; vertical-align: middle; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: 287px;
        }
      }
      .detail-info-ftitle {
        font-size: 12px; color: rgba(65, 56, 56, 0.68); margin-left: 15px; margin-top: 7.5px; margin-right: 7.5px; line-height: 20px;
      }
      .detail-price {
        line-height: 20px;
        .subName-text {
          display:inline-block;
          vertical-align: top;
          height: 19px; position:relative; color:#ef0017; font-size:10px; padding-left:5px; padding-right:8px; border-radius:9px; margin-left:10px; border:0.5px solid #ef0017;
        }
        .money-sign {
          display:inline-block;
          vertical-align: baseline;
          font-size: 12px; color: #ef0017;
        }
        .show-price {
          display:inline-block;
          vertical-align: baseline;
          font-weight:900; font-size: 18px; color: #ef0017; margin-left: 3px;
        }
        .start-text {
          display:inline-block;
          vertical-align: baseline;
          font-size: 12px; color: #ababab; margin-left: 4px;
        }
        .origin-price {
          display:inline-block;
          vertical-align: baseline;
          font-size: 12px; color: #999; text-decoration: line-through; margin-left: 6px;
        }
      }
      .detail-ydxz {
        padding-left: 15px; height: 45px;
        .ydxz-text {
          line-height: 30px;
          font-size: 16px; color: #333;
        }
        .ydxz-text1 {
          line-height: 10px;
          font-size: 10px; color:#999;
        }
      }
      .arrow-detail {
        position:absolute; bottom:20px; left:155px; font-size:26px; font-weight:100; color:#ababab;
      }
      .arrow-detail1 {
        position:absolute; bottom:20px; right:0; font-size:26px; font-weight:100; color:#ababab;
      }
      .block-hr {
        width:1px; height:35px; background:#E4E4E4; position:absolute; bottom:18px; left:175px;
      }
      .pingfeng {
        width:170px; height:45px; position:absolute; bottom:12px; right:0;
        .xingxing {
          width:15px; height:15px; display:inline-block; margin-right:3px; margin-top:3px; border-radius:3px; background:#ef0017 url(https://cdn.51dmq.com/ui/um/xingxing.png) no-repeat; background-size:80% 80%; background-position:1.8px 1.8px;
        }
        .buliang {
          background:#dfdfdf url(https://cdn.51dmq.com/ui/um/xingxing.png) no-repeat; background-size:80% 80%; background-position:1.8px 1.8px;
        }
        .pingfen-num {
          display:inline-block; font-size: 18px; position:relative; top:-2px; color:#ef0017; margin-left:8px;
        }
        .pinglun {
          font-size:10px; color:#999;
        }
      }
    }
    .detail-info-location {
      width: 60px; height: 123.5px; background-color: #fafafa; display: block;
      .detail-gotoLocetion {
        width: 21.5px; height: 20px; margin-top: 50px; margin-left: 19.5px;
        .location-icon {
          width: 21.5px; height: 20px;
        }
      }
    }
    .auth-btn {
      padding: 0; text-align: left; background-color: #fafafa; width: 60px; height: 123.5px; border-radius: 0; border: none;
      image {
        display: block; margin-top: 50px; margin-left: 19.5px; width: 21.5px; height: 20px;
      }
    }
    .auth-btn::after {
      border: none;
    }
  }
  .detail-info-content {
    background-color: #fff; margin-top: 10px; color:#333; position:relative;
    .hotel-info-item {
      display: flex;
      line-height: 45px;
      color: #333;
      border-top: 0.5px solid #f0f2f7;
      padding: 0px 10px;
      align-items: center;
      .hotel-info-label {
        width: 58px;
        padding-left: 10px;
        text-align: left;
        font-size: 12px;
      }
      .hotel-info-coupon {
        display: inline-block;
        vertical-align: middle;
        background-image: url('https://cdn.51dmq.com/ui/order/yhq-bg.png');
        background-repeat: no-repeat;
        background-size: 100%;
        width: 77px;
        height: 20px;
        line-height: 20px;
        text-indent: 18px;
        color: #fff;
        font-size: 10px;
        margin-right: 12px;
        box-shadow: 0px 2.5px #fde6e9;
      }
      .hotel-info-value {
        font-size: 14px;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .hotel-info-arrow {
          font-size: 20px;
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
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.3); z-index: 700;
  }
  .toast-box {
    .modal {
      padding-bottom: 49px; position: fixed; left: 0; bottom: -100%; width: 100%; border-top-left-radius: 4px; border-top-right-radius: 4px; background: #f7f7f7; z-index: 710;
      .modal-head {
        color: #413838; font-size: 18px; font-family: PingFangSC-Medium, sans-serif; padding: 0 15px; height: 56.5px; line-height: 56.5px;
        .single-notice {
          color: #999; font-size: 14px; padding-left: 5px;
        }
        .single-notice.active {
          color: #f05b47;
        }
      }
      .playDate {
        color: #413838; font-size: 14px;
        .pxkx-text {
          padding: 0 15px; display: flex; height: 56.5px; justify-content: space-between; align-items: center;
          .name {
            font-size: 18px; color: #413838; font-family: PingFangSC-Medium, sans-serif;
          }
          .close {
            font-size: 23px; color: #b2b2b2;
          }
        }
        .picker-box {
          width: calc(100% - 28px); display: flex; justify-content: space-between; align-items: center; background-color: #fff; padding-left: 15px; padding-right: 13px; height: 45px;
          .playDate-text {
            font-size: 16px;
          }
          .date-select-box {
            display: flex; align-items: center; justify-content: space-between;
            .date-picker {
              height: 34px; margin-right: 4px; line-height: 34px; border-radius: 2px; padding-left: 80px;
            }
            .jiantou-svg {
              font-size: 12px; color: #f05b47;
            }
          }
          .icon-rili {
            position: absolute; left: 172px; top: 9px;
          }
        }
        .date-title {
          margin-right: 2px;
        }
      }
      .modal-content {
        height: 265px; padding-top: 20px; background-color: #fff;
        .order-px {
          padding: 0 20px 0 15px;
          .px-ul {
            width: 100%;
            .px-li {
              width: 100%; margin-bottom: 22px;
              .px-left {
                display: inline-block; vertical-align: middle;
              }
              .px-right {
                display: inline-block; vertical-align: middle; float: right;
              }
              .px-tips {
                width: 100%; font-size: 12px; color: #ff6363;
              }
              .px-name {
                width: 200px; color: #413838; font-size: 16px;
              }
              .px-price {
                margin-top: 2px;
                .money-sign {
                  font-size: 12px; color: #fc4150; margin-right: 3px;
                }
                .nowprice {
                  font-size: 18px; color: #fc4150; margin-right: 10px;
                }
                .oriprice {
                  font-size: 12px; color: #767676; text-decoration: line-through;
                }
              }
              .px-right {
                .number {
                  font-size: 18px; color: #413838; display: inline-block; vertical-align: middle; margin-right: 18px;
                }
                .sub {
                  color: rgba(255, 99, 99, 1); font-size: 18px; border: 1px solid rgba(255, 99, 99, 1); border-right: none; height: 29px; line-height: 28px; width: 44px; text-align: center; display: inline-block; vertical-align: middle; border-top-left-radius: 3px; border-bottom-left-radius: 3px;
                }
                .add {
                  color: rgba(255, 99, 99, 1); font-size: 18px; border: 1px solid #ff6363; height: 29px; line-height: 28px; width: 44px; text-align: center; display: inline-block; vertical-align: middle; border-top-right-radius: 3px; border-bottom-right-radius: 3px;
                }
                .sub0 {
                  border: 1px solid rgba(255, 99, 99, 0.35) !important; border-right: none !important; color: rgba(255, 99, 99, 0.35) !important;
                }
              }
              .ydxz {
                font-size: 12px; color: #00699e; margin-top: 5px;
              }
              .fsyy-ul {
                .fsyy-li {
                  float: left; font-size: 12px; color: #413838; border-radius: 3px; border: 1px solid #e4e4e4; text-align: center; padding: 5px; margin: 5px 5px 0 0;
                }
                .active {
                  border: 1px solid #19a0f0; color: #19a0f0;
                }
              }
              .fsyy-tips {
                color: #f66; font-size: 12px; padding: 5px 0;
              }
            }
          }
        }
      }
      .next-step {
        position: absolute; left: 0; bottom: 0; width: 100%; height: 49px; background-color: #fff;
        .next-left {
          width: 50%; height: 100%; display: flex; align-items: center;
          .choose-label {
            color: #413838; font-size: 13px; margin-right: 15px; display: inline-block;
          }
          .choose-num-box {
            padding-left: 15px;
            .choose-num {
              color: #413838; font-size: 13px; display: inline-block;
            }
          }
          .total-price {
            padding-left: 15px; line-height: 16px; margin-top: 2px;
            .choose-num {
              display: inline-block; vertical-align: middle;
              .money-sign {
                display: inline-block; vertical-align: middle; color: #fc4150; font-size: 12px; margin-right: 4px;
              }
              .totalPrice {
                display: inline-block; color: #fc4150; font-size: 18px; line-height: 16px;
              }
            }
          }
        }
        .next-right {
          width: 50%; height: 100%;
          .next-btn {
            width: 100%; text-align: center; background-color: #f05b47; color: #fff; height: 49px; line-height: 49px; display: block; font-size: 16px;
          }
          .next-btn2 {
            background-color: #cbcbcb;
          }
        }
      }
    }
  }
}

.block_Box {width:calc(100% - 30px); background:white; margin-top:10px; padding:15px 15px; position:relative;}
.block_title {height:24px; line-height:24px; font-size:18px; padding-top:2px; margin-bottom:10px; position:relative;}
.title_icon {width:24px; height:24px; position:absolute; left:0; top:0}

.cTicket_box {width:225px; padding:11px 0; position:relative;}
.cTicket_title {width:100%; font-size:18px; color:#413838; overflow:hidden}
.cTicket_price {font-size:22px; font-weight:900; color:#ef0017}
.cTicket_span {font-size:14px; color:#ef0017; font-weight:500;}
.lable_box {width:100%; font-size:12px; margin-top:3px;}
.cTicket_lableTitle {display:inline-block; margin-right:8px; border-radius:3px; background:#fef2f3; color:#ef0017; padding:2px 4px;}
.cTicket_lableContent {color:#ababab;}

.cTicket_numBox {width:98px; height:30px; position:absolute; left:235px; top:50%; transform:translate(0, -50%); -webkit-transform:translate(0, -50%);}
.cTicket_numBtn1 {width:30px; height:30px; text-align:center; color:#ef0017; border:1px solid #ef0017; line-height:30px; border-radius:5px 0 0 5px; position:absolute; left:0; top:0}
.cTicket_numBtn2 {width:30px; height:30px; text-align:center; color:#ef0017; border:1px solid #ef0017; line-height:30px; border-radius:0 5px 5px 0; position:absolute; right:0; top:0}
.cTicket_enable {color:#ffabbf; border:2px solid #ffabbf;}
.cTicket_numShow {width:34px; height:34px; text-align:center; line-height:34px; font-size:16px; position:absolute; left:34px;}

.fnIconBox {width:calc(100% - 20px); background:white; margin-top:10px; padding:20px 10px; position:relative}
.fnContent {width:100%; display:flex; justify-content: space-around;}
.fnIcon_optBox {width:60px; height:80px; text-align:center; position:relative;}
.fnIcon_img {width:40px; height:40px;}
.fnIcon_text {width:60px; height:24px; line-height:24px; font-size:16px; color:#413838; display:inline-block; position:absolute; left:0; bottom:0;}

.jqDetail_contentBox {width:100%; margin-top:15px;}
.jqDetail_title {height:30px; line-height:30px; font-size:18px;}
.jqDetail_text {width:100%; line-height:24px; font-size:16px; color:#413838; margin-top:10px;}

.rmProduct_Box {width:100%; overflow-x:auto;}
.rmProduct_content {height:320rpx;}
.rmProduct_optBox {width:300rpx; margin-right:20rpx; display:inline-block; position:relative;}
.rmProduct_optBox_last {margin-right:0;}
.rmProduct_imgBox {width:300rpx; height:180rpx; background:#9C9C9C; border-radius:5px; overflow:hidden;}
.rmProduct_img {width:300rpx; height:180rpx;}
.rmProduct_title {font-size:16px; font-weight:900; color:#413838; margin-top:16rpx;}
.rmProduct_subBox {width:100%; font-size:12px; color:#ef0017; margin-top:20rpx;}
.rmProduct_price {display:inline-block; font-size:18px; color:#ef0017; font-weight:900;}
.rmProduct_saled {display:inline-block; float:right; margin-right:20rpx; margin-top:6rpx; color:#ababab;}

.footBox {width:100%; height:60px; background:white; position:fixed; left:0; bottom:0; z-index:30;}
.carBox {width:80px; height:60px; position:absolute; left:0; top:0;}
.footCarImg {width:26px; height:26px; margin-left:24px; margin-top:8px; background:url(https://cdn.51dmq.com/ui/um/buy.png) no-repeat; background-size:26px 26px;}
.footCar_imgFalse {background:url(https://cdn.51dmq.com/ui/um/buy1.png) no-repeat; background-size:26px 26px;}
.footCarText {text-align:center; font-size:14px; color:#413838; margin-top:2px;}
.footCar_false {color:#ababab;}
.footBuyBtn_buy {width:100px; height:36px; font-size:16px; text-align:center; line-height:38px; border-radius:16px; float:right; margin-top:13px; margin-right:15px; background-image: linear-gradient(to right, #ef0017 , #f7416c); color:white;}
.footBtn_false_buy {background:#ababab;}
.footBuyBtn_add {width:100px; height:32px; font-size:16px; text-align:center; line-height:32px; border:2px solid #ef0017; border-radius:16px; float:right; margin-top:13px; margin-right:10px; color:#ef0017;}
.footBtn_false_add {border:2px solid #ababab; color:#ababab;}

.mustBox {width:100%; height:100%; background:rgba(0,0,0,.35); opacity:1; position:fixed; left:0; top:0; z-index:100000000}
.must_contentBox {width:100%; height:400px; background:white; border-radius:5px 5px 0 0; position:fixed; left:0; bottom:-800rpx;}
.must_Title {width:calc(100% - 40px); height:80rpx; margin-left:20px; margin-top:20rpx; line-height:80rpx; font-size:18px; font-weight:900; border-bottom:1px solid #e0e0e0;}
.must_mainBox {width:calc(100% - 40px); height:540rpx; margin-top:20rpx; margin-left:20px; overflow-y:auto; position:relative;}
.must_text {line-height:26px; font-size:16px; color:#413838;}
.must_closeBtn {width:70%; height:70rpx; border-radius:45rpx; border:2px solid #ef0017; text-align:center; line-height:70rpx; margin-left:15%; margin-top:40rpx; font-size:16px; color:#ef0017}
</style>
