<template>
    <div>
        <navbar title='聚合搜索'></navbar>
        <div class="result" :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
            <search :name='keyword' @getData='getResultData' ref='search'></search>
            <div id='tab-test' class="tab-box clearfix">
                <scroll-view scroll-x="true" class="tab-h" :class='{fixed:isFixed}'>
                    <div class="tab-item" v-for='(it,i) in selectArray' :key='i' :class='{active:currentTab==i}' @click="swichNav(i)">
                        <div class="tab-item-name">{{it.esType}}</div>
                    </div>
                </scroll-view>
                <swiper class="tab-content" :current="currentTab" @change='switchTab' :style='{height:swiperHeight+"px"}' duration="300">
                    <swiper-item v-for='(item,index) in selectArray' :key='index'>
                        <scroll-view @scrolltoupper='scrollFn' class="tab-content-list">
                            <div v-for='(it,i) in listData' :key='i'>
                                <div v-if="it.esType=='route'" class="tab-content-item" @click="goDetailUrl(it.esType,it.routeInfoId,it.productCode)">
                                    <div class="left-img">
                                        <div class="left-label" style="width:38px;background:url('http://statics.lotsmall.cn/wx/img/title2.png') no-repeat;background-size: contain;">跟团游</div>
                                        <img class="tab-content-img" :src="it.linkMobileImg" alt="">
                                    </div>
                                    <div class="tab-content-item-info">
                                        <div class="tab-content-title">
                                            {{it.nickName}} {{it.subtitle}}
                                        </div>
                                        <div class="tab-card">
                                            <span class="card-skyblue" v-if="it.lineTheme[0]">{{it.lineTheme[0]}}</span>
                                            <span class="card-orange" v-if="it.lineTheme[1]">{{it.lineTheme[1]}}</span>
                                            <span class="card-purple" v-if="it.lineTheme[2]">{{it.lineTheme[2]}}</span>
                                            <span class="card-green" v-if="it.lineTheme[3]">{{it.lineTheme[3]}}</span>
                                        </div>
                                        <div class="tab-tradingArea">{{it.begAddress}} 出发 {{it.useDay}}天{{it.useNight}}夜</div>
                                        <div class="tab-content-detail p-t-5">
                                            <div class="buy-price">
                                                <span class="unit">￥</span>
                                                <span class="price">{{it.priceShow}}</span>
                                                <span class="text">起/人</span>
                                            </div>
                                            <!-- <div class="buy-num p-t-8">{{it.fictSaleNum}}人已购买</div> -->
                                        </div>
                                    </div>
                                </div>
                                <div v-if="it.esType=='repast'" class="tab-content-item" @click="goDetailUrl(it.esType,it.id,it.productCode)">
                                    <div class="left-img">
                                        <div class="left-label" style="background:url('http://statics.lotsmall.cn/wx/img/title.png') no-repeat;background-size: contain;">餐饮</div>
                                        <img class="tab-content-img" :src="it.linkImg" alt="">
                                    </div>
                                    <div class="tab-content-item-info">
                                        <div class="tab-content-title">
                                            {{it.name}}
                                        </div>
                                        <div class="tab-tradingArea">{{it.tradingArea}}</div>
                                        <div class="tab-card">
                                            <span class="card-skyblue" v-if='it.firstCategoryName'>{{it.firstCategoryName}}</span>
                                            <span class="card-orange" v-if='it.secondCategoryName'>{{it.secondCategoryName}}</span>
                                            <span class="card-purple" v-if='it.thirdCategoryName'>{{it.thirdCategoryName}}</span>
                                            <span class="card-green" v-if='it.fourthCategoryName'>{{it.fourthCategoryName}}</span>
                                        </div>
                                        <div class="tab-content-detail">
                                            <div class="buy-price">
                                                <span class="des">人均：</span>
                                                <span class="unit">￥</span>
                                                <span class="price">{{it.priceShow}}</span>
                                            </div>
                                            <!-- <div class='distance'>
                                                <i class="xx-icon icon-location icon-10"></i>5km</div> -->

                                        </div>
                                    </div>
                                </div>
                                <div v-if="it.esType=='hotel'" class="tab-content-item" @click="goDetailUrl(it.esType,it.id,it.productCode)">
                                    <div class="left-img">
                                        <div class="left-label" style="background:url('http://statics.lotsmall.cn/wx/img/title.png') no-repeat;background-size: contain;">酒店</div>
                                        <img class="tab-content-img" :src="it.linkMobileImg" alt="">
                                    </div>
                                    <div class="tab-content-item-info">
                                        <div class="tab-content-title">
                                            {{it.nickName}}
                                            <i v-if='0<it.hotelLevel' class="xx-icon icon-star-full icon-16"></i>
                                            <i v-if='1<it.hotelLevel' class="xx-icon icon-star-full icon-16"></i>
                                            <i v-if='2<it.hotelLevel' class="xx-icon icon-star-full icon-16"></i>
                                            <i v-if='3<it.hotelLevel' class="xx-icon icon-star-full icon-16"></i>
                                            <i v-if='4<it.hotelLevel' class="xx-icon icon-star-full icon-16"></i>
                                        </div>
                                        <div class="tab-situation">{{it.areaName}}</div>
                                        <div class="tab-content-detail">
                                            <div class="buy-price">
                                                <span class="unit">￥</span>
                                                <span class="price">{{it.priceShow}}</span>
                                                <span class="text">起</span>
                                            </div>
                                            <!-- <div class='distance'>
                                                <i class="xx-icon icon-location icon-10"></i>5km</div> -->
                                            <div class="buy-num m-t-5">{{it.salesNum}}人已购买</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="it.esType=='park'" class="tab-content-item" @click="goDetailUrl(it.esType,it.parkInfoId,it.productCode)">
                                    <div class="left-img">
                                        <div class="left-label" style="background:url('http://statics.lotsmall.cn/wx/img/title.png') no-repeat;background-size: contain;">景区</div>
                                        <img class="tab-content-img" :src="it.linkMobileImg" alt="">
                                    </div>
                                    <div class="tab-content-item-info">
                                        <div class="tab-content-title">
                                            {{it.nickName}}
                                        </div>
                                        <div class="tab-situation">{{it.areaAddr}}   {{it.parkLevel}}A</div>
                                        <div class="tab-content-detail">
                                            <div class="buy-price">
                                                <span class="unit">￥</span>
                                                <span class="price">{{it.priceShow}}</span>
                                                <span class="text">起</span>
                                            </div>
                                            <!-- <div class='distance'>
                                                <i class="xx-icon icon-location icon-10"></i>5km</div> -->
                                            <div class="buy-num m-t-5">{{it.virtualSale}}人已购买</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="it.esType=='mdse'" class="tab-content-item" @click="goDetailUrl(it.esType,it.id,it.productCode)">
                                    <div class="left-img">
                                        <div class="left-label" style="background:url('http://statics.lotsmall.cn/wx/img/title.png') no-repeat;background-size: contain;">商品</div>
                                        <img class="tab-content-img" :src="it.linkMobileImg" alt="">
                                    </div>
                                    <div class="tab-content-item-info">
                                        <div class="tab-content-title">
                                            {{it.nickName}}
                                        </div>
                                        <div class="tab-card">
                                            <span class="card-skyblue" v-if='it.firstCategoryName'>{{it.firstCategoryName}}</span>
                                            <span class="card-orange" v-if='it.secondCategoryName'>{{it.secondCategoryName}}</span>
                                            <span class="card-purple" v-if='it.thirdCategoryName'>{{it.thirdCategoryName}}</span>
                                            <span class="card-green" v-if='it.fourthCategoryName'>{{it.fourthCategoryName}}</span>
                                        </div>
                                        <div class="tab-content-detail p-t-5">
                                            <div class="buy-price">
                                                <span class="unit">￥</span>
                                                <span class="price">{{it.priceShow}}</span>
                                                <span class="text">起</span>
                                            </div>
                                            <div class="buy-num p-t-8">{{it.virtualSale}}人已购买</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="it.esType=='strategy'" class="tab-content-item" @click="goDetailUrl(it.esType,it.id,it.productCode)">
                                    <div class="left-img">
                                        <div class="left-label" style="background:url('http://statics.lotsmall.cn/wx/img/title.png') no-repeat;background-size: contain;">攻略</div>
                                        <img class="tab-content-img" :src="it.picAddr" alt="">
                                    </div>
                                    <div class="tab-content-item-info">
                                        <div class="strategy-name">
                                            {{it.name}}
                                        </div>
                                        <div class="tab-describe">{{it.activityDetail}}</div>
                                        <div class="tab-content-detail">
                                            <div class='hadRead'>
                                                <i class="xx-icon icon-yanjing1 icon-10"></i> {{it.pv>9999?(it.pv-it.pv%1000)/10000+'万':it.pv}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </scroll-view>
                        
                    </swiper-item>

                </swiper>

                <div class="bottom-text">
                    <span v-if="loadShow">暂无数据</span>
                    <span v-if='loading'>加载中...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getData, postData, host, merchantInfoId } from "@/common/common.js";
import search from "@/components/search"; //搜索
import api from "@/api/api";
import navbar from "@/components/navbar";
export default {
  components: {
    search,
    navbar
  },
  data() {
    return {
      swiperHeight: 0,
      swiperMinHeight: null,
      loading: false,
      loadShow: false,
      listData: [],
      currPage: 1,
      totalPage: null,
      keyword: "",
      selectShow: false, //初始option不显示
      nowText: "门票", //初始内容
      animationData: {}, //右边箭头的动画
      date: null,
      testsrc: null,
      animation: {},
      preTop: "",
      motto: "Hello World",
      userInfo: {},
      imgUrls: [], //banner
      fineItems: [], //精品推荐
      isFixed: false, //tab是否固定在顶部
      indicatorDots: false,
      autoplay: false,
      interval: 2500,
      duration: 500,
      activeIndex: 0,
      scrollLeft: 0,
      currentTab: 0,
      scrollHeight: null, //滚动高度
      testList: [1, 2, 3, 4, 5, 6, 7, 8],
      productList: [1, 2, 3],
      imgWidth: null,
      imgHeight: null,
      ticketList: [],
      roomList: [],
      mdseList: [],
      base64: "",
      selectArray: []
    };
  },
  onLoad(option) {
    var res = wx.getSystemInfoSync();
    this.swiperMinHeight = res.windowHeight - 100;
    let _this = this;
    getData(
      _this.api.main.merchant.getSearchType,
      {
        merchantInfoId: merchantInfoId
      },
      false
    ).then(res => {
      console.log(res);
      _this.selectArray = res.data;
      // if (_this.selectArray.length > 1) {
      //   _this.selectArray.unshift("all");
      // }
      let arr = [];
      _this.selectArray.map(item => {
        arr.push({
          val: item,
          esType: _this.filterType(item)
        });
      });
      _this.selectArray = arr;
      _this.getList();
    });
    this.$nextTick(() => {
      if (this.$root.$mp.query.name) {
        this.keyword = this.$root.$mp.query.name
          ? this.$root.$mp.query.name
          : "";
      }
    });

    //获取用户当前的地理位置（用于计算到景区或酒店的距离）
    // wx.getLocation({
    //   type: "wgs84",
    //   success(res) {
    //        const latitude = res.latitude
    //        const longitude = res.longitude
    //     console.log(res);
    //   }
    // });
  },
  onUnload() {
    this.keyword = "";
    this.listData = [];
  },
  onReachBottom() {
    let _this = this;
    if (this.currPage < this.totalPage) {
      this.currPage = this.currPage + 1;
      this.getList();
    } else if (this.currPage == this.totalPage) {
      this.loadShow = true;
    }
  },
  mounted() {
    let _this = this;
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res);
        // console.log(res.windowHeight);
      }
    });
  },
  onPageScroll: function(obj) {
    //页面滚动监听
    // console.log(obj.scrollTop);
    // console.log(obj.scrollTop)
    // if (obj.scrollTop > this.scrollHeight) {
    //   this.isFixed = true;
    // } else if (obj.scrollTop < this.scrollHeight - 50) {
    //   this.isFixed = false;
    // }
  },
  methods: {
    getList() {
      let _this = this;
      let param = {
        currPage: _this.currPage,
        pageSize: 10,
        merchantInfoId: merchantInfoId,
        cityId: this.$root.$mp.query.cityId?this.$root.$mp.query.cityId:'',
        merchantParkId: this.$root.$mp.query.merchantParkId?this.$root.$mp.query.merchantParkId:'',
        productName: _this.keyword
      };
      if (!param.productName.length) {
        delete param.productName;
      }
      _this.loading = true;
      // if (this.currentTab == 0 && this.selectArray.length > 1) {
      // } else {
        param.productType = this.selectArray[this.currentTab].val;
      // }
      postData(_this.api.main.merchant.getSearchResult, param, false).then(
        res => {
          if(res.status == 200) {
            if(res.data&&res.data.rows){
              _this.totalPage = Math.ceil(res.data.total / 10);
              if (_this.totalPage == _this.currPage) {
                _this.loadShow = true;
              }
              let arrData=res.data.rows
              arrData.forEach(ele=>{
                  ele.esType = _this.selectArray[this.currentTab].val;
                  if(ele.activityDetail){
                    ele.activityDetail=_this.outFilter(ele.activityDetail) 
                  }   
                  if(ele.lineTheme){
                      ele.lineTheme = ele.lineTheme.split(",");
                  }
              })
              _this.listData = _this.listData.concat(arrData);
            }
            _this.swiperHeight = _this.listData.length * 110+49;
            _this.$nextTick(function() {
              _this.loading = false;
            });
          }
        }
      );
    },

    filterType(val) {
      switch (val) {
        case "park":
          return "景区";
          break;
        case "hotel":
          return "酒店";
          break;
        case "mdse":
          return "商品";
          break;
        case "route":
          return "跟团游";
          break;
        case "repast":
          return "餐饮";
          break;
        case "strategy":
          return "攻略";
          break;
        default:
          return "全部";
          break;
      }
    },
    getResultData(keyword) {
    //   console.log("getResultData", keyword);
      this.currPage = 1;
      this.currentTab = 0;
      this.loadShow = false;
      this.listData = [];
      this.keyword = keyword ? keyword : "";
      this.getList();
    },
    goUrl(path) {
      this.navigatePageTo(this.router + path);
    },
    goDetailUrl(type, id, code) {
      if (type == "mdse") {
        type = "goods";
      } else if (type == "ticket" || type == "park") {
        type = "scenic";
      }
       else if (type == "room") {
        type = "hotel";
      } else if (type == 'groupbooking') {
            wx.showToast({
              title: '我的拼团暂未开发',
              icon: 'none',
              duration: 2000
            })
            return
          }
          else if (type == 'parkcard') {
            wx.showToast({
              title: '公园年卡暂未开发',
              icon: 'none',
              duration: 2000
            })
            return
          }
          else if (type == 'publicservice') {
            wx.showToast({
              title: '公共服务暂未开发',
              icon: 'none',
              duration: 2000
            })
            return
          }
      let path =
        "pages/" + type + "/detail/main?id=" + id + "&productCode=" + code;
      this.navigatePageTo(this.router + path);
    },
    switchTab(e) {
      console.log(e);
      if (e.mp.detail.source == "touch") {
        this.currPage = 1;
        this.listData = [];
        this.currentTab = e.mp.detail.current;
        this.getList();
      }
    },
    scrollFn(e) {
      this.isFixed = false;
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。:scroll-left="scrollLeft"
    checkCor: function() {
      if (this.currentTab > 2 && this.currentTab <= 5) {
        this.scrollLeft = 331;
      } else if (this.currentTab > 5) {
        this.scrollLeft = 662;
      } else {
        this.scrollLeft = 0;
      }
    },
    swichNav(index) {
      if (index == this.currentTab) {
        return false;
      } else {
        this.currPage = 1;
        this.listData = [];
        this.currentTab = index;
        this.getList();
      }
    }
  },
  onShow() {
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    });
  }
};
</script>

<style lang='scss'>
.result {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .swiper-container {
    position: relative;
    margin-bottom: 29px;
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
    flex-grow: 1;
    // background: #fff;
    width: 100%;
    .tab-h {
      width: 100%;
      flex-shrink: 0;
      padding: 0 5px;
      box-sizing: border-box;
      overflow: hidden;
      line-height: 40px;
      font-size: 16px;
      white-space: nowrap;
      background: #fff;
      box-shadow: 1px 1px 5px #e7e6e6;
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
      margin: 0 3.5px;
      font-size: 14px;
      font-family: PingFangSC-Medium, sans-serif;
      display: inline-block;
      width: calc(20%);
      text-align: center;
      color: #999999;
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
      padding-top: 10px;
      .tab-content-item {
        display: flex;
        margin-bottom: 10px;
        background-color: #fff;
        .left-img {
          width: 156px;
          flex-shrink: 0;
          height: 100px;
          position: relative;
          image {
            width: 100%;
            height: 100%;
          }
          .left-label {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 28px;
            line-height: 25px;
            border-radius: 0px 0px 5px 0px;
            background-color: #fd405b;
            color: #fff;
            text-align: center;
            font-size: 10px;
          }
        }
        .tab-content-item-info {
          flex-grow: 1;
          padding-top: 8px;
          padding-left: 12px;
          padding-right: 9px;
          .icon-16 {
            display: inline-block;
            font-size: 16px;
          }
          .icon-10 {
            display: inline-block;
            font-size: 10px;
          }
          .tab-content-title {
            line-height: 20px;
            font-size: 16px;
            color: #413838;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .strategy-name{
             line-height: 20px;
            font-size: 16px;
            color: #413838;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden; 
          }
          .tab-situation {
            margin-top: 6px;
            line-height: 15px;
            font-size: 10px;
          }
          .tab-describe {
            display: -webkit-box;
            color: #666;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            margin-top: 6px;
            line-height: 15px;
            font-size: 10px;
          }
          .tab-tradingArea {
            color: #999;
            font-size: 12px;
            padding-top: 5px;
          }
          .tab-card {
            line-height: 13px;
            margin-top: 2px;
            text-align: left;
            font-size: 9px;
            .card-skyblue {
              color: skyblue;
              padding: 0px 3px;
              text-align: center;
              display: inline-block;
              margin-right: 5px;
              border-radius: 5px;
              border: 1px solid skyblue;
            }
            .card-orange {
              color: orange;
              padding: 0px 3px;
              margin-right: 5px;
              text-align: center;
              display: inline-block;
              border-radius: 5px;
              border: 1px solid orange;
            }
            .card-purple {
              color: #5e99ff;
              padding: 0px 3px;
              margin-right: 5px;
              text-align: center;
              display: inline-block;
              border-radius: 5px;
              border: 1px solid #5e99ff;
            }
            .card-green {
              color: #00aea8;
              padding: 0px 3px;
              margin-right: 5px;
              text-align: center;
              display: inline-block;
              border-radius: 5px;
              border: 1px solid #00aea8;
            }
          }
          .p-t-5 {
            padding-top: 5px;
          }
          .p-t-8 {
            padding-top: 8px;
          }
          .m-t-5 {
            margin-top: 3px;
          }
          .tab-content-detail {
            .hadRead {
              float: right;
              color: #a3a8ab;
              font-size: 10px;
              margin-top: 7px;
              line-height: 10px;
            }
            .distance {
              margin-top: 5px;
              color: #f05b47;
              font-size: 10px;
              line-height: 10px;
            }
            .buy-price {
              float: right;
              color: #fc4150;
              .des {
                font-size: 10px;
                color: #413838;
              }
              .unit {
                font-size: 12px;
              }
              .price {
                font-size: 18px;
                line-height: 18px;
              }
              .text {
                font-size: 9px;
                color: #999999;
              }
            }
            .buy-num {
              line-height: 10px;
              font-size: 10px;
              color: #999999;
            }
          }
        }
      }
    }
    .scoll-h {
      height: 100%;
    }
    .bottom-text {
      text-align: center;
      color: #acacac;
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
}
</style>
