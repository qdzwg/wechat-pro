<template>
  <div class="home"
       id="home"
       v-bind:style="{'background': isColorOrBg=='bg'? 'url('+renovationPageBack+') top center no-repeat' : renovationPageBack, 'background-size': isColorOrBg=='bg' ? 'contain' : '' ,width:homeWidth+'px'}">
    <navbar :backShow='false'
            :title='renovationPageName'></navbar>
    <template v-if='pageShow'>
      <custom-com v-if="componentShow"
                  @parkNameChange='getUsePage'
                  :cityName='parkName'
                  :cityList='parkList'
                  :dataList="dataList"></custom-com>
      <div v-else
           :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':((tabContentHeight+navBarHeight)*1.5+'px')}">



        <div class="swiper-container">
          <swiper class="swiper"
                  indicator-color='#f7f7f7'
                  indicator-active-color='#fff'
                  @change='currentChange'
                  :indicator-dots="indicatorDots"
                  :autoplay="autoplay"
                  :interval="interval"
                  :duration="duration">
            <block v-for="(item,index) in imgUrls"
                   :key='index'>
              <swiper-item v-if="item.isLink"
                           @click="goUrl(item.newLink)">
                <image :src="item.picAddr"
                       class="slide-image"
                       width="355"
                       height="150" />
              </swiper-item>
              <swiper-item v-else>
                <image :src="item.picAddr"
                       class="slide-image"
                       width="355"
                       height="150" />
              </swiper-item>
            </block>
          </swiper>
          <div class="dots-list">
            <div v-for='(item,index) in imgUrls'
                 :key='index'
                 class="dots-item"
                 :class="{ active: activeIndex==index }"></div>
          </div>
          <div class="search-box">
            <div class="search-warper">
              <div class="select-box">
                <div class="com-selectBox">
                  <div class="com-sContent"
                       @click="selectToggle">
                    <div class="com-sTxt">{{nowText}}</div>
                    <image src="http://statics.lotsmall.cn/wx/img/arrow-left-icon.png"
                           class="com-sImg"
                           :animation="animationData" />
                  </div>
                  <div class="com-sList"
                       v-if="selectShow">
                    <div v-for="(item,index) in selectArray"
                         :key="index"
                         class="com-sItem"
                         @click="setText(index)">{{item.text}}</div>
                  </div>
                </div>
              </div>
              <input @confirm='goOperation'
                     class="search-input"
                     v-model="seachName"
                     placeholder-class="place-holder"
                     placeholder="搜索" />
              <i class="xx-icon icon-ico-search search-icon"
                 @click="goOperation"></i>
            </div>
            <div class="shadow-bottom shadow-line"></div>
          </div>
        </div>
        <div class="shadow-bottom">
          <div class="nav-list">
            <div @click="goUrl('pages/scenic/list/main')"
                 class="nav-item">
              <div class="img-item">
                <img class="img"
                     src="http://statics.lotsmall.cn/wx/img/park.png"
                     alt="">
              </div>
              <div class="nav-title">门票预定</div>
            </div>
            <div @click="goUrl('pages/hotel/list/main')"
                 class="nav-item">
              <div class="img-item">
                <img class="img"
                     src="http://statics.lotsmall.cn/wx/img/hotel.png"
                     alt="">
              </div>
              <div class="nav-title">酒店住宿</div>
            </div>
            <div @click="goUrl('pages/goods/list/main?mode=goods')"
                 class="nav-item">
              <div class="img-item">
                <img class="img"
                     src="http://statics.lotsmall.cn/wx/img/cart.png"
                     alt="">
              </div>
              <div class="nav-title">商店商品</div>
            </div>
            <div @click="goUrl('pages/strategy/list/main')"
                 class="nav-item">
              <div class="img-item">
                <img class='img'
                     src="http://statics.lotsmall.cn/wx/img/strategy.png"
                     alt="">
              </div>
              <div class="nav-title">攻略</div>
            </div>
            <div @click="goUrl('pages/ai_p/main')"
                 class="nav-item">
              <div class="img-item">
                <img class="img"
                     src="http://statics.lotsmall.cn/wx/img/ai_p.png"
                     alt="">
              </div>
              <div class="nav-title">AI拍一拍</div>
            </div>
          </div>
        </div>
        <div class="recommend-box shadow-bottom">
          <div class="recommend-title">
            <span class="left-line"></span>
            <span class="text">精品推荐</span>
          </div>
          <div v-for='(item,index) in fineItems'
               :key='index'
               class="recommend-list"
               v-if="item.businessType=='mdse'||item.businessType=='ticket'||item.businessType=='room'"
               @click="goDetailUrl(item.businessType,item.merchantProdcutId,item.productCode)">
            <div class="recommend-item">
              <img class='recommend-item-img'
                   :src="item.linkMobileImg"
                   alt="">
              <div class="recommend-item-info">
                <div class="recommend-item-info-name">{{item.businessType=="ticket" ||item.businessType=="room"?item.parkNickName : item.nickName}}</div>
                <div class="recommend-item-price-detail clearfix">
                  <div class="price-info fl">
                    <span>￥</span>
                    <span class="price-num">{{item.businessType=='mdse'?item.priceShow:item.parkPriceShow}}</span>
                    <span class="text">起</span>
                  </div>
                  <span v-if="item.parkVirtualSale!=0&&item.virtualSale!=0"
                        class="buy-num fr">{{item.businessType=="ticket" ||item.businessType=="room"? item.parkVirtualSale : item.virtualSale}}人购买</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='tab-test'
             class="tab-box clearfix">
          <scroll-view scroll-x="true"
                       class="tab-h"
                       :class='{fixed:isFixed}'
                       :scroll-left="scrollLeft">
            <div class="tab-item"
                 :class='{active:currentTab==0}'
                 @click="swichNav(0)">
              <div class="tab-item-name">景区门票</div>
            </div>
            <div class="tab-item"
                 :class='{active:currentTab==1}'
                 @click="swichNav(1)">
              <div class="tab-item-name">酒店住宿</div>
            </div>
            <div class="tab-item"
                 :class='{active:currentTab==2}'
                 @click="swichNav(2)">
              <div class="tab-item-name">特色商品</div>
            </div>
          </scroll-view>
          <swiper class="tab-content"
                  v-bind:style="{ minHeight: testHeight + 'rpx' }"
                  :current="currentTab"
                  @change='switchTab'
                  duration="300">
            <!-- 门票 -->
            <swiper-item>
              <scroll-view :scroll-y='isFixed'
                           @scrolltoupper='scrollFn'
                           v-bind:style="{ minHeight: testHeight + 'rpx' }"
                           class="tab-content-list">
                <div class="tab-content-item"
                     v-for='(it,i) in ticketList'
                     :key='i'
                     :class='{"m-r-20":i%2==0}'
                     @click="goDetailUrl(it.businessType,it.merchantProdcutId,it.productCode)">
                  <div class="top-img">
                    <img class="tab-content-img"
                         :src="it.linkMobileImg"
                         alt="">
                  </div>
                  <div class="tab-content-item-info">
                    <div class="tab-content-title">
                      {{it.nickName}}
                    </div>
                    <div class="tab-content-detail clearfix">
                      <div class="buy-price">
                        <span class="unit">￥</span>
                        <span class="price">{{it.priceShow}}</span>
                        <span class="text">/人</span>
                      </div>
                      <div v-if="it.virtualSale!=0"
                           class="buy-num">{{it.sellNum}}人已购买</div>
                    </div>
                  </div>
                </div>
              </scroll-view>
            </swiper-item>
            <!-- //酒店 -->
            <swiper-item>
              <scroll-view :scroll-y='isFixed'
                           @scrolltoupper='scrollFn'
                           v-bind:style="{ minHeight: testHeight + 'rpx' }"
                           class="tab-content-list">
                <div class="tab-content-item"
                     v-for='(it,i) in roomList'
                     :key='i'
                     :class='{"m-r-20":i%2==0}'
                     @click="goDetailUrl(it.businessType,it.merchantProdcutId,it.productCode)">
                  <div class="top-img">
                    <img class="tab-content-img"
                         :src="it.linkMobileImg"
                         alt="">
                  </div>
                  <div class="tab-content-item-info">
                    <div class="tab-content-title">
                      【{{it.parkNickName}}】 {{it.nickName}}
                    </div>
                    <div class="tab-content-detail clearfix">
                      <div class="buy-price">
                        <span class="unit">￥</span>
                        <span class="price">{{it.priceShow}}</span>
                        <span class="text">/人</span>
                      </div>
                      <div v-if="it.virtualSale!=0"
                           class="buy-num">{{it.sellNum}}人已购买</div>
                    </div>
                  </div>
                </div>
              </scroll-view>
            </swiper-item>
            <!-- 商品 -->
            <swiper-item>
              <scroll-view :scroll-y='isFixed'
                           @scrolltoupper='scrollFn'
                           v-bind:style="{ minHeight: testHeight + 'rpx' }"
                           class="tab-content-list">
                <div class="tab-content-item"
                     v-for='(it,i) in mdseList'
                     :key='i'
                     :class='{"m-r-20":i%2==0}'
                     @click="goDetailUrl(it.businessType,it.merchantProdcutId,it.productCode)">
                  <div class="top-img">
                    <img class="tab-content-img"
                         :src="it.linkMobileImg"
                         alt="">
                  </div>
                  <div class="tab-content-item-info">
                    <div class="tab-content-title">
                      {{it.nickName}}
                    </div>
                    <div class="tab-content-detail clearfix">
                      <div class="buy-price">
                        <span class="unit">￥</span>
                        <span class="price">{{it.priceShow}}</span>
                        <span class="text">起</span>
                      </div>
                      <div v-if="it.virtualSale!=0"
                           class="buy-num">{{it.virtualSale}}人已购买</div>
                    </div>
                  </div>
                </div>
              </scroll-view>
            </swiper-item>
          </swiper>
        </div>
      </div>

    </template>
    <vue-tab-bar v-if="navShow"
                 :pageData='navigationData'
                 @fetch-index="clickIndexNav"
                 :selectNavIndex='selectNavIndex'></vue-tab-bar>
    <!-- <coupon-list ref='coupontest'></coupon-list> -->
  </div>
</template>

<script>
// import Calendar from "mpvue-calendar";
// import couponList from "@/components/couponList";
import { getData, postData, host, merchantInfoId } from "@/common/common.js";
// import upng from "@/common/upng-js/UPNG.js";
import navbar from "@/components/navbar";
import customCom from "@/components/customCom/index";
import vueTabBar from "@/components/customCom/vueTabBar"; //底部导航
// 引入SDK核心类
var QQMapWX = require('@/common/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'YWDBZ-Z23KX-42F4V-TEILJ-ISOE7-EZFAM'//申请的开发者秘钥key
});
export default {
  components: {
    navbar,
    vueTabBar,
    customCom
  },
  data () {
    return {
      homeWidth: null,
      pageShow: false,
      seachName: "",
      selectShow: false, //初始option不显示
      nowText: "门票", //初始内容
      animationData: {}, //右边箭头的动画
      date: null,
      testsrc: null,
      animation: {},
      testHeight: "400",
      preTop: "",
      userInfo: {},
      imgUrls: [], //banner
      fineItems: [], //精品推荐
      isFixed: false, //tab是否固定在顶部
      //   indicatorDots: false,
      //   autoplay: false,
      //   interval: 2500,
      //   duration: 500,
      //   activeIndex: 0,
      scrollLeft: 0,
      currentTab: 0,
      scrollHeight: null, //滚动高度
      imgWidth: null,
      imgHeight: null,
      ticketList: [],
      roomList: [],
      mdseList: [],
      base64: "",
      selectArray: [
        {
          value: "park",
          text: "门票"
        },
        {
          value: "hotel",
          text: "酒店"
        },
        {
          value: "mdse",
          text: "商品"
        },
        {
          value: "strategy",
          text: "攻略"
        }
      ],
      navigationData: {},
      selectNavIndex: 0,
      dataList: [],
      componentShow: false,
      navShow: false,
      renovationPageName: "",
      renovationPageBack: "",
      isColorOrBg: ''
    };
  },
  onLoad () {
    //判断服务是否过期
    getData(this.api.aiPapi.selectServiceUse, {
      merchantInfoId: merchantInfoId,
      serviceType: "wxxcx,pyp,guide,dzfp"
    }).then(res => {
      wx.setStorageSync("getServiceUse_wxxcx", res.data.wxxcx);
      wx.setStorageSync("getServiceUse_pyp", res.data.pyp);
      wx.setStorageSync("getServiceUse_guide", res.data.guide);
      wx.setStorageSync("getServiceUse_dzfp", res.data.dzfp);
    });

    //获取定位
    this.getLocationCity();
    
    wx.getSystemInfo({
      success: res => {
        
        this.homeWidth = res.screenWidth
      }
    });
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onPageScroll: function (obj) {
    //页面滚动监听
    // console.log(obj.scrollTop);
    // console.log(obj.scrollTop)
    // if (obj.scrollTop > this.scrollHeight) {
    //   this.isFixed = true;
    // } else if (obj.scrollTop < this.scrollHeight - 50) {
    //   this.isFixed = false;
    // }
    // const query = wx.createSelectorQuery();
    // query.select("#topleftBar").boundingClientRect();
    // query.selectViewport().scrollOffset();
    // query.exec(function(res) {
    //     console.log(res)
    // });
    // query.select("#topbar-box").boundingClientRect();
    // query.selectViewport().scrollOffset();
    // query.exec(function(res) {
    //     // console.log(res)
    // });
  },
  methods: {
    getLocationCity() {
      let _this = this;
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
          // 调用sdk接口
          qqmapsdk.reverseGeocoder({
              location: {
                  latitude: res.latitude,
                  longitude: res.longitude
              },
              success: function (res) {
                //获取当前地址成功
                  console.log(res);
                  if(res.result&&res.result.address_component){
                    _this.cityName = res.result.address_component.city;
                  }
                  getData("/merchant/api/merchantRenovationToc/getCityPark", {
                    cityName: _this.cityName,
                  }).then(res => {
                    if(res.status == 200) {
                      _this.parkList = res.parks;
                      _this.cityId = res.city?res.city.id:'';
                      _this.cityName = res.city?res.city.cityName:'杭州市';
                      wx.setStorageSync("Wxxcx_cityids", _this.cityId);
                      _this.parkName = _this.cityName;
                    }
                    _this.getUsePage('');
                  });
              },
              fail: function (res) {
                  console.log('获取当前地址失败');
                  _this.getUsePage('');
              }
          });
        },
        fail: (res)=>{
          console.log('wx.getLocation fail:',res)
          wx.chooseLocation({
            success: function(e) {
            //允许打开定位
              console.log('wx.chooseLocation success:',res)
            },
            fail: () => {
              //不允许打开定位
              console.log('wx.chooseLocation fail:',res)
              _this.getLocationSetting();
            }
          })
        }
      })
    },
    // 授权定位
    getLocationSetting() {
      let _this = this;
      wx.getSetting({
        success: (res) => {
          console.log('wx.getSetting success:',res)
          if (!res.authSetting['scope.userLocation']) {
            //未授权
            wx.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success: function (res) {
                if (res.cancel) {
                  //取消授权
                  wx.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1000
                  })
                } else if (res.confirm) {
                  //确定授权，通过wx.openSetting发起授权请求
                  wx.openSetting({
                    success: function (res) {
                      if (res.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        //再次授权，调用wx.getLocation的API
                        _this.getLocationCity();
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        },
        fail: (res) => {
          console.log('wx.getSetting fail:',res)
        }
      })
    },
    getUserInfo() {
      let _this = this;
      // 查看是否授权
      wx.getSetting({
        success: function(res) {
          if (res.authSetting["scope.userInfo"]) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                _this.userInfo = res.userInfo;
                _this.show = true;
                console.log("微信返回用户信息",res)
              }
            });
          } else {
            wx.setStorageSync(
              "xjsc_2018_order_url_asds",
              getCurrentPages().pop().__route__
            );
            wx.reLaunch({
              url: "/pages/authorization/main"
            });

            // wx.redirectTo({
            //   url: "/pages/authorization/main"
            // });
          }
        }
      });
    },
    getUsePage(name) {
      //底部导航
      getData(this.api.aiPapi.getUsePage, {
        merchantInfoId: merchantInfoId,
        pageType: "navigationPage",
        cityName: this.cityName,
        parkName: name,
        useRange: "small"
      }).then(res => {
        wx.setStorageSync("getNavigationData", JSON.parse(res.data.content));
        this.navigationData = JSON.parse(res.data.content);
        if (this.navigationData && this.navigationData.range) {
          this.navigationData.range.map(item => {
            if (item == "homepage") {
              this.navShow = true;
            }
          });
        }
      });
      //自定义首页
      getData(this.api.aiPapi.getUsePage, {
        merchantInfoId: merchantInfoId,
        pageType: "mianPage",
        cityName: this.cityName,
        parkName: name,
        useRange: "small"
      }).then(res => {      
        if (res.data && res.data.content != "") {       
          this.dataList = JSON.parse(res.data.content);        
          console.log(this.dataList)   
          this.renovationPageName = res.data.renovationPageName;        
          
          if(res.data.renovationPageBack){
            this.renovationPageBack = res.data.renovationPageBack;
            if(res.data.renovationPageBack.indexOf('//') > 0){
              this.isColorOrBg = 'bg'
            } else {
              this.isColorOrBg = 'color'
            }     
          }
          this.componentShow = true;        
        } else {
          this.getOldData();
        }
        this.pageShow = true;
      });
    },
    //option的显示与否
    selectToggle () {
      var nowShow = this.selectShow; //获取当前option显示的状态
      //创建动画
      if (nowShow) {
        this.animation.rotate(0).step();

        this.animationData = this.animation.export();
      } else {
        this.animation.rotate(90).step();
        this.animationData = this.animation.export();
      }

      this.selectShow = !nowShow;
    },
    //设置内容
    setText (i) {
      //   console.log(i);
      var nowData = this.selectArray; //当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowText = nowData[i].text; //当前点击的内容
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      (this.selectShow = false),
        (this.nowText = nowText),
        (this.animationData = this.animation.export());
    },
    goOperation () {
      if (this.nowText == "门票") {
        this.navigatePageTo(
          this.router + "pages/scenic/list/main?name=" + this.seachName
        );
        this.seachName = "";
      } else if (this.nowText == "商品") {
        this.navigatePageTo(
          this.router + "pages/goods/list/main?name=" + this.seachName
        );
        this.seachName = "";
      } else if (this.nowText == "攻略") {
        this.navigatePageTo(
          this.router + "pages/strategy/list/main?name=" + this.seachName
        );
        this.seachName = "";
      } else if (this.nowText == "酒店") {
        this.navigatePageTo(
          this.router + "pages/hotel/list/main?name=" + this.seachName
        );
        this.seachName = "";
      }
      // 聚合搜索
      // this.navigatePageTo(
      //      this.router + "pages/result/main?name=" + this.seachName
      //     );


    },
    bindDateChange () { },
    formSubmit: function (e) {
      console.log("form发生了submit事件，携带数据为：", e.mp.detail.value);
    },
    goUrl (path) {
      this.navigatePageTo(this.router + path);
    },
    goDetailUrl (type, id, code) {
      if (type == "mdse") {
        type = "goods";
      } else if (type == "ticket") {
        type = "scenic";
      } else if (type == "room") {
        type = "hotel";
      }
      let path =
        "pages/" + type + "/detail/main?id=" + id + "&productCode=" + code;
      this.navigatePageTo(this.router + path);
    },
    switchTab (e) {
      if (e.mp.detail.source == "touch") {
        this.currentTab = e.mp.detail.current;
      }

      // this.checkCor();
    },
    scrollFn (e) {
      this.isFixed = false;
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
      if (this.currentTab > 2 && this.currentTab <= 5) {
        this.scrollLeft = 331;
      } else if (this.currentTab > 5) {
        this.scrollLeft = 662;
      } else {
        this.scrollLeft = 0;
      }
    },
    swichNav (index) {
      if (index == this.currentTab) {
        return false;
      } else {
        this.currentTab = index;
      }
      if (index == 0) {
        this.testHeight = Math.round(this.ticketList.length / 2) * 400;
      } else if (index == 1) {
        this.testHeight = Math.round(this.roomList.length / 2) * 400;
      } else if (index == 2) {
        this.testHeight = Math.round(this.mdseList.length / 2) * 400;
      }
    },
    bindViewTap () {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },
    currentChange (test) {
      //轮播图下标改变
      this.activeIndex = test.mp.detail.current;
    },
    getOldData () {
      getData(
        this.api.main.findPicInfo + "?merchantInfoId=" + merchantInfoId
      ).then(res => {
        if (res.data.mainPageTop && res.data.mainPageTop.length) {
          let wholeLink;
          res.data.mainPageTop.forEach((item, index) => {
            if (res.data.mainPageTop[index].picLink) {
              console.log(res.data.mainPageTop[index].picLink);
              res.data.mainPageTop[index].isLink = true;
              if (
                res.data.mainPageTop[index].picLink.indexOf(
                  "http://wap.lotsmall.cn"
                ) > -1
              ) {
                wholeLink = res.data.mainPageTop[index].picLink
                  .replace(/http:\/\/wap.lotsmall.cn/, "")
                  .split("/");
              } else if (
                res.data.mainPageTop[index].picLink.indexOf(
                  "https://wap.lotsmall.cn"
                ) > -1
              ) {
                wholeLink = res.data.mainPageTop[index].picLink
                  .replace(/https:\/\/wap.lotsmall.cn/, "")
                  .split("/");
              } else {
                res.data.mainPageTop[index].isLink = false;
                this.imgUrls = res.data.mainPageTop;
              }
              console.log(wholeLink[1]);
              switch (wholeLink[1]) {
                case "list":
                  wholeLink[2] = wholeLink[2].split("?")[0];
                  wholeLink[2] =
                    wholeLink[2] == "shop" ? "goods" : wholeLink[2];
                  wholeLink[2] =
                    wholeLink[2] == "ticket" ? "scenic" : wholeLink[2];
                  res.data.mainPageTop[index].newLink =
                    "pages/" + wholeLink[2] + "/list/main";
                  break;
                case "coupons":
                  res.data.mainPageTop[index].newLink =
                    "pages/member/receiveCoupon/main";
                  break;
                case "detail":
                  if (wholeLink[2] == "strategy") {
                    res.data.mainPageTop[index].newLink =
                      "pages/" +
                      wholeLink[2] +
                      "/detail/main?id=" +
                      wholeLink[3];
                  } else if (wholeLink[2] == "shop") {
                    res.data.mainPageTop[index].newLink =
                      "pages/goods/detail/main?id=" +
                      wholeLink[3] +
                      "&code=" +
                      wholeLink[4];
                  } else if (wholeLink[2] == "ticket") {
                    res.data.mainPageTop[index].newLink =
                      "pages/scenic/detail/main?id=" +
                      wholeLink[3] +
                      "&productCode=" +
                      wholeLink[4];
                  }
                  break;
              }
            } else {
              res.data.mainPageTop[index].isLink = false;
            }
          });
          this.imgUrls = res.data.mainPageTop;
        }
        // wx.hideLoading();
      });
      getData(this.api.main.merchant.listMerchantPushInfo, {
        merchantInfoId: merchantInfoId,
        templementId: 1 //当前微信端只有一个首页模板，任意填写了1
      }).then(res => {
        let _this = this;
        this.fineItems = res.data.fine;
        this.ticketList = [];
        this.roomList = [];
        this.mdseList = [];
        if (res.data.sellWell && res.data.sellWell.length) {
          res.data.sellWell.forEach(item => {
            if (item.businessType == "ticket") {
              this.ticketList.push(item);
            } else if (item.businessType == "room") {
              this.roomList.push(item);
            } else if (item.businessType == "mdse") {
              this.mdseList.push(item);
            }
          });
        }
        _this.testHeight = Math.round(this.ticketList.length / 2) * 400;
      });
    }
  },

  onShow () {
    wx.hideTabBar();
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    });
    this.getUserInfo()
    this.setText(0);
  }
};
</script>

<style lang='scss'>
.home {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  .swiper-container {
    position: relative;
    margin-bottom: 29px;
    height: 149px;
    .swiper {
      width: 100%;
      height: 149px;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .dots-list {
      position: absolute;
      width: 100%;
      bottom: 22px;
      left: 0px;
      display: flex;
      justify-content: center;
      .dots-item {
        height: 5px;
        width: 5px;
        margin: 0 5px;
        border-radius: 50%;
        background: #f7f7f7;
      }
      .dots-item.active {
        background: #fff;
      }
    }
    .search-box {
      position: absolute;
      width: 100%;
      bottom: -17.5px;
      height: 34px;

      .search-warper {
        position: relative;
        width: 316px;
        margin: 0 auto;
        border-radius: 2px;
        background: #fff;
        // text-align: center;
        .place-holder {
          font-family: PingFangSC-Regular, sans-serif;
          color: #acacac;
          padding-left: 76px;
          font-size: 14px;
        }
        .search-input {
          font-family: PingFangSC-Regular, sans-serif;
          color: #413838;
          font-size: 14px;
        }
        .select-box {
          width: 70px;
          height: 34px;
          border-radius: 2px;
          position: absolute;
          top: 0;
          left: 0;

          .com-selectBox {
            width: 70px;
            .com-sContent {
              border-radius: 2px;
              background: #fff;
              font-size: 16px;
              position: relative;
              height: 34px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .com-sImg {
                width: 5px;
                height: 10px;
                transition: all 0.3s ease;
                margin-right: 7.5px;
              }
              .com-sTxt {
                // line-height: 34px;
                // height: 18.5px;
                padding-left: 20px;
                font-size: 14px;
                font-family: PingFangSC-Regular, sans-serif;
                color: #413838;
              }
            }

            .com-sList {
              background: #fff;
              width: 70px;
              position: absolute;
              top: 42px;
              left: 0;
              box-sizing: border-box;
              z-index: 3;
              max-height: 120px;
              overflow: auto;
              box-shadow: 0 0 10px #e1e1e1;
              top: 40px;
              .com-sItem {
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-top: 1px solid #e9e8e8;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                font-family: PingFangSC-Regular, sans-serif;
                color: #413838;
              }
              .com-sItem:first-child {
                border-top: none;
              }
            }
          }
        }
        input {
          height: 35px;
          line-height: 35px;
          padding-left: 75px;
          font-size: 14px;
          padding-right: 35px;
        }
        .search-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 22px;
          color: rgb(196, 196, 196);
          z-index: 999;
        }
      }
      .shadow-line {
        margin: 0 auto;
        width: 316px;
      }
    }
  }
  .nav-list {
    // display: flex;
    background: #ffffff;
    // flex-wrap:wrap ;
    // justify-content: space-around;
    margin-bottom: 10px;
    padding-bottom: 5px;
    .nav-item {
      display: inline-block;
      width: 20%;
      text-align: center;
      height: 93.5px;
      padding-top: 20px;
      text-align: center;
      .img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
      .nav-title {
        font-size: 14px;
        color: #413737;
      }
    }
  }
  .recommend-box {
    background: #fff;
    margin-bottom: 10px;
    .recommend-title {
      padding: 20px 15px;
      .text {
        font-size: 18px;
        font-family: PingFangSC-Medium, sans-serif;
        color: #413838;
      }
    }
    .recommend-list {
      padding: 0 10px;
      .recommend-item {
        .recommend-item-img {
          height: 133px;
          width: 100%;
        }
        .recommend-item-info {
          .recommend-item-info-name {
            font-family: PingFangSC-Regular, sans-serif;
            font-size: 16px;
            color: #413838;
            // width: 239px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding: 5px 0px;
          }
          .recommend-item-price-detail {
            padding-bottom: 20px;
            .price-info {
              float: left;
              color: #fc4150;
              font-size: 12px;
              font-family: PingFangSC-Semibold, sans-serif;
              .price-num {
                font-size: 18px;
                padding: 0 5px;
                padding-left: 0;
              }
              .text {
                font-size: 12px;
                font-family: PingFangSC-Regular, sans-serif;
                color: #5c5c5c;
              }
            }
            .buy-num {
              font-size: 12px;
              color: #999999;
              font-family: PingFangSC-Regular, sans-serif;
              float: right;
              margin-top: 7px;
            }
          }
        }
      }
    }
  }
  .tab-box {
    padding: 10px 0;
    // background: #fff;
    width: 100%;
    .tab-h {
      width: 100%;
      padding: 0 22px;
      box-sizing: border-box;
      overflow: hidden;
      line-height: 40px;
      font-size: 16px;
      white-space: nowrap;
      background: #fff;
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
      }
    }
    .tab-h.fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
    }
    .tab-item {
      margin: 0 10px;
      font-size: 14px;
      font-family: PingFangSC-Medium, sans-serif;
      display: inline-block;
      width: calc(33.3% - 20px);
      text-align: center;
      color: #999999;
      margin-bottom: 5px;
      .tab-item-name {
        margin: 0 17.5px;
      }
    }
    .tab-item.active {
      color: #f05b47;
      position: relative;
    }
    .tab-item.active::after {
      content: "";
      display: block;
      height: 2px;
      width: 100%;
      background: #f05b47;
      position: absolute;
      bottom: 0;
      border-radius: 1px;
    }

    .tab-content {
      padding-left: 15px;
      margin-top: 16px;
      .tab-content-list {
        .tab-content-item {
          display: inline-block;
          width: 165px;
          margin-bottom: 19px;
          .top-img {
            height: 102px;
            width: 165px;
            .tab-content-img {
              width: 100%;
              height: 100%;
            }
          }

          .tab-content-item-info {
            padding: 7.5px 9px 10px;
            border: 0.5px solid #e9e9e9;
            border-top: none;
            .tab-content-title {
              height: 32.5px;
              line-height: 17.5px;
              font-size: 12px;
              color: #413838;
              font-family: PingFangSC-Regular, sans-serif;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .tab-content-detail {
              margin-top: 10px;
              font-family: PingFangSC-Regular, sans-serif;
              color: #fc4150;
              position: relative;
              .unit {
                font-size: 12px;
              }
              .price {
                font-size: 18px;
                margin-left: 2.5px;
                margin-right: 4px;
              }
              .text {
                font-size: 10px;
                color: #5c5c5c;
              }
              .buy-num {
                position: absolute;
                right: 0;
                bottom: 2.5px;
                font-size: 10px;
                color: #999999;
              }
            }
            .buy-num {
              font-size: 10px;
            }
          }
        }
        .tab-content-item.m-r-20 {
          margin-right: 14px;
        }
      }
    }
    .scoll-h {
      height: 100%;
    }
  }
}
</style>
