<template>
    <div class="topleftBar" id="topleftBar" :class="'topleftBar-'+pageData.pageInteraction">

        <div class="topbar-box" v-if="pageData.type=='productGroup1'">
            <!-- 下划线 -->
            <div class="topbar" v-if="pageData.menuType=='type1'">
                <div class="topbar-item" :class="{active:currentTab==index}" @click="swichNav(index)" v-for="(item,index) in pageData.list" :key="index">
                    <div class="topbar-item-name">{{item.groupName}}</div>
                </div>
            </div>
            <!-- 方角 -->
            <div class="topbar tpd" v-if="pageData.menuType=='type2'">
                <div class="topbar-item" :class='{active2:currentTab==index}' @click="swichNav(index)" v-for="(item,index) in pageData.list" :key="index">
                    <div class="topbar-item-name">{{item.groupName}}</div>
                    <div :class='{botBar:currentTab==index}' :style="{left:pageData.list.length<=3?'45%':'40%'}"></div>
                </div>
            </div>
            <!-- 圆角 -->
            <div class="topbar tpd2" v-if="pageData.menuType=='type3'">
                <div class="topbar-item" :class='{active3:currentTab==index}' @click="swichNav(index)" v-for="(item,index) in pageData.list" :key="index">
                    <div class="topbar-item-name">{{item.groupName}}</div>
                </div>
            </div>
            <!-- 单列 -->
            <div id="topbar-box" v-for="(item,index) in pageData.list" :key="index" v-if="currentTab==index">
                <div @click="goUrl(ele.businessType,ele.merchantProdcutId,ele.productCode)" class="product-box" v-if="pageData.listType=='type1'" v-for="(ele,i) in pageData.list[index].data" :key="i">

                    <div class="product-img">
                        <img :src="ele.linkMobileImg" alt="">
                    </div>
                    <div class="main-heading">
                        {{ele.nickName}}
                    </div>
                    <div class="subhead">
                        <span class="icon-yuan" :style="{color:ele.priceShow?'#fc4150':'transparent'}">￥</span> {{ele.priceShow}}
                    </div>
                </div>
            </div>
            <!-- 双列 -->
            <swiper id="topbar-box" v-if="pageData.listType=='type2'" v-bind:style="{minHeight:testHeight+'rpx',paddingTop:10+'px'}" :current="currentTab" @change='switchTab' duration="300">
                <swiper-item v-for="(item,index) in pageData.list" :key="index">
                    <scroll-view v-bind:style="{minHeight:testHeight+'rpx'}">
                        <div class="paoductSide">
                            <div @click="goUrl(ele.businessType,ele.merchantProdcutId,ele.productCode)"  class="product-box" v-for="(ele,i) in pageData.list[index].data" :key="i">

                                <div class="product-img">
                                    <img :src="ele.linkMobileImg" alt="">
                                </div>
                                <div class="main-heading">
                                    {{ele.nickName}}
                                </div>
                                <div class="subhead">
                                    <span class="icon-yuan" :style="{color:ele.priceShow?'#fc4150':'transparent'}">￥</span> {{ele.priceShow}}
                                </div>
                            </div>
                        </div>
                    </scroll-view>
                </swiper-item>
            </swiper>
            <!-- 横划 -->
            <div id="topbar-box" class="shuffling" v-if="pageData.listType=='type3'">
                <scroll-view class="shuffling-content" v-for="(item,index) in pageData.list" :key="index" v-if="currentTab==index" scroll-x="true" @scrolltolower="scrolltolower" @scrolltoupper="scrolltoupper" @scroll="scroll" scroll-with-animation="true" v-bind:style="{width:scrollWidth+'rpx'}">
                    <div @click="goUrl(ele.businessType,ele.merchantProdcutId,ele.productCode)"  class="product-box" v-for="(ele,i) in pageData.list[index].data" :key="i">
                        <div class="product-img">
                            <img :src="ele.linkMobileImg" alt="">
                        </div>
                        <div class="main-heading">
                            {{ele.nickName}}
                        </div>
                        <div class="subhead">
                            <span class="icon-yuan" :style="{color:ele.priceShow?'#fc4150':'transparent'}">￥</span> {{ele.priceShow}}
                        </div>
                    </div>
                </scroll-view>
            </div>
        </div>

        <!-- 普通左侧  跟active5区分-->
        <div class="tab-box clearfix" v-if="pageData.type=='productGroup2'">
            <div class="topbar-left-box" v-if="pageData.menuType=='type1'">
                <div class="topbar-left" :class="{active4:currentIndex==index}" @click="swichNav(index)" v-for="(item,index) in pageData.list" :key="index">
                    <div class="topbar-left-name">{{item.groupName}}</div>
                </div>
            </div>
            <!-- 普通左侧   跟active4区分-->
            <div class="topbar-left-box" v-if="pageData.menuType=='type2'">
                <div class="topbar-left" :class="{active5:currentIndex==index}" @click="swichNav(index)" v-for="(item,index) in pageData.list" :key="index">
                    <div class="topbar-left-name">{{item.groupName}}</div>
                </div>
            </div>
            <!-- 内容带圆角的 -->
              <div class="topbar-left-box tab-bgc" v-if="pageData.menuType=='type3'">
                <div class="topbar-left" :class="{active6:currentIndex==index}" @click="swichNav(index)" v-for="(item,index) in pageData.list" :key="index">
                    <div class="topbar-left-name">{{item.groupName}}</div>
                </div>
            </div>
            <!-- 内容带圆角的 -->
             <scroll-view v-if="pageData.menuType=='type3'" class="topbar-scroll" :class="{bgc:pageData.list.length<3}" scroll-y='true' v-bind:style="{height:tabBoxHeight+'px'}" :scroll-into-view='viewId' scroll-with-animation="true">
                <div class="top-radius radius" v-for="(item,index) in pageData.list" :key="index" :id="'list-'+index">
                    <div class="group-title">{{item.groupName}}</div>
                    <div id="group-content"  @click="goUrl(ele.businessType,ele.merchantProdcutId,ele.productCode)" class="group-content" v-for="(ele,i) in item.data" :key="i">
                        <div class="group-content-item first clearfix">
                            <img :src="ele.linkMobileImg" alt="">
                            <div class="text">{{ele.nickName}}</div>
                        </div>
                    </div>
                </div>
            </scroll-view>
            <!-- 普通内容 -->
            <scroll-view v-else :scroll-into-view='viewId' class="topbar-left-content1" :class="{bgc:pageData.list.length<3}" scroll-y="true" v-bind:style="{height:tabBoxHeight+'px'}" scroll-with-animation="true">
                <div class="topbar-left-content radius" v-for="(item,index) in pageData.list" :key="index" :id="'list-'+index">
                    <div class="group-title">{{item.groupName}}</div>
                    <div @click="goUrl(ele.businessType,ele.merchantProdcutId,ele.productCode)"  class="group-content" v-for="(ele,i) in item.data" :key="i">
                        <div class="group-content-item first clearfix">
                            <img :src="ele.linkMobileImg" alt="">
                            <div class="text">{{ele.nickName}}</div>
                            <!-- <div v-if="ele.businessType=='mdse'" class="shopCar" @click="setShopcar">
                                <i class="xx-icon icon-jiahao shopindex"></i>
                            </div> -->
                        </div>
                    </div>
                </div>
            </scroll-view>
        </div>
    </div>
</template>
<script>
// import { getData } from "@/common/common";
export default {
  props: {
    pageData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      scrollLeft: 0,
      scrollHeight: 500,
      tabBoxHeight: 439,
      scrollWidth: 750,
      currentTab: 0,
      isFixed: false,
      viewId: "",
      testHeight: 400,
      flag: true, //控制计算第一个业态高度（刚开始计算）
      rightLiTops: [],
      tabHeight: null,
      tops: [],
      scrollY: null,
      currentIndex: 0,
      scrollTop: null
    };
  },
  onPageScroll: function(obj) {
    //页面滚动监听
    // console.log(obj.scrollTop);
    // console.log(obj.scrollTop)
    let _this = this;
    this.scrollTop = obj.scrollTop;

    // _this.throttle(
    //   _this.scrollTopFn(this.scrollTop, this.scrollHeight, this),
    //   1500
    // )();
  },
  onReady() {
    let _this = this;
    if (
      this.pageData.type == "productGroup1" &&
      this.pageData.pageInteraction == "type2"
    ) {
      setTimeout(function() {
        const query = wx.createSelectorQuery();
        query.select(".topleftBar-type2").boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function(res) {
          //   console.log(res);
          _this.scrollHeight = res[0].top;
        });
      }, 1000);
    }

    if (this.pageData.type == "productGroup2") {
      setTimeout(function() {
        const query = wx.createSelectorQuery();
        query.select("#topleftBar").boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function(res) {
          // console.log(res)
          _this.scrollHeight = res[0].top;
        });
        //   //   获取分组到页面顶部的距离
        query
          .select(".tab-box")
          .boundingClientRect(function(rect) {
            // console.log(rect);
            _this.tabHeight = rect.top;
          })
          .exec();

        //   获取每一组的高度（需要减去分组到页面顶部的距离）
        query
          .selectAll(".radius")
          .boundingClientRect(function(rect) {
            // console.log(rect);
            // _this.rightLiTops = rect;
            let arr = [];
            let top = 0;
            rect.forEach(ele => {
              top += ele.height;
              //   top += ele.bottom - ele.top;
              //   top += ele.height;
              arr.push(top);
              //   arr.shift()
            });

            _this.tops = arr;
          })
          .exec();
        //左侧导航的右边高度
        query
          .selectAll(".topbar-left")
          .boundingClientRect(function(rect) {
            let num = 0;
            rect.forEach(ele => {
              num = ele.height * 10 + 5;
            });
            _this.tabBoxHeight = num;
            // console.log(_this.tabBoxHeight)
          })
          .exec();
      }, 1000);
    }
    if (this.flag) {
      _this.testHeight =
        Math.round(this.pageData.list[0].data.length / 2) * 424;
    }
  },
  watch: {
    // currentIndex(newval, oldval) {
    //   let _this = this;
    //   if (_this.tops[oldval] < _this.scrollY <= _this.tops[oldval + 1]) {
    //     return newval;
    //   }
    // }
  },
  methods: {
    goUrl(type, id, code) {
      if (type != "") {
        let url = this.linkDetailObj[type];
        if (type == "shop" || type == "mdse") {
          this.navigatePageTo(
            this.router + url + "?id=" + id + "&code=" + code
          );
        } else if (type == "strategy") {
          this.navigatePageTo(this.router + url + "?id=" + id);
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
          } else {
          this.navigatePageTo(
            this.router + url + "?id=" + id + "&productCode=" + code
          );
        }
        
      } else {
      }
    },
    switchTab(e) {
      if (e.mp.detail.source == "touch") {
        this.currentTab = e.mp.detail.current;
      }
    this.flag = false;
      this.testHeight =
        Math.round(this.pageData.list[this.currentTab].data.length / 2) * 424;
      // this.checkCor();
    },
    scrolltoupper() {
      if (this.currentTab > 0) {
        this.currentTab--;
      }
    },
    scrolltolower() {
      if (this.currentTab == this.pageData.list.length - 1) {
      } else {
        this.currentTab++;
      }
    },
    scrollTopFn(h, t, that) {
      let _this = that;
      if (h + (_this.navContentHeight + _this.navBarHeight) > t) {
        //   console.log(111)
        if (_this.pageData.pageInteraction == "type2") {
          // console.log(222)
          _this.isFixed = true;
        }
      } else if (h < t + 50) {
        //   console.log(333)
        _this.isFixed = false;
      }
    },
    throttle(after, wait) {
      /*option说明：after [回调函数]; 
                  wait  [周期性执行回调间隔时间ms]
     */
      var timer;
      var isScroll; //是否正在执行回调
      return function() {
        if (isScroll) return; //在回调函数未执行完以前
        isScroll = true;
        timer && clearTimeout(timer);
        timer = setTimeout(function() {
          after && after();
          isScroll = false;
          timer = null;
        }, wait);
      };
    },
    scrollFn(h, arr, that) {
      //   console.log(e);
      let _this = that;
      //   console.log(h,arr,that)
      _this.viewId = "";
      for (let i = 0; i < arr.length - 1; i++) {
        // console.log(i);
        if (h >= arr[i] && h < arr[i + 1]) {
          _this.currentIndex = i + 1;
          return false;
        }
        //这里有else有问题，会出现第二个之后不能选中
        if (h < arr[0]) {
          _this.currentIndex = 0;
          return false;
        }
      }
    },
    scroll(e) {
      let _this = this;
      let height = e.mp.detail.scrollTop;
      // console.log(this)
      //   _this.throttle(_this.scrollFn(height, this.tops, this), 300)();
    },
    swichNav(index, test) {
      let _this = this;
      if (index == this.currentTab) {
        return false;
      } else {
        this.currentTab = index;
        this.currentIndex = index;
        this.viewId = "list-" + index;
      }
      this.flag = false;
      this.testHeight =
        Math.round(this.pageData.list[index].data.length / 2) * 424;

      //   if (
      //     this.pageData.type == "productGroup1" &&
      //     this.scrollTop > this.scrollHeight
      //   ) {
      //     wx.pageScrollTo({
      //       scrollTop: _this.scrollHeight - 70,
      //       duration: 500
      //     });
      //   }
    },
    setShopcar() {}
  }
};
</script>
<style lang='scss'>
.topleftBar {
  width: 100%;
  .topbar-box {
    width: 100%;
    margin: 5px 0;
    .product-box {
      width: 100%;
      padding: 15px 0 5px 0;
      //   margin-bottom:10px;
      .product-img {
        width: 98%;
        height: 140px;
        margin: 0 auto;
        position: relative;
        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .main-heading {
        // width: 98%;
        height: 24px;
        margin: 8px auto;
        padding: 0 9px;
        line-height: 24px;
        font-size: 16px;
        color: #413838;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .subhead {
        width: 78px;
        height: 17px;
        padding: 0 9px;
        line-height: 17px;
        font-size: 18px;
        color: #fc4150;
        .icon-yuan {
          font-size: 12px;
        }
      }
    }
    .paoductSide {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .product-box {
        width: 49.8%;
        background-color: #fff;
        padding: 10px 0 5px 0;
        .product-img {
          width: 98%;
          height: 140px;
          margin: 0 auto;
          image {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .main-heading {
          //   width: 98%;
          height: 24px;
          margin: 8px auto;
          padding: 0 9px;
          font-size: 14px;
          line-height: 24px;
          color: #413838;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .subhead {
          width: 78px;
          height: 17px;
          padding: 0 9px;
          line-height: 10px;
          font-size: 16px;
          color: #fc4150;
          .icon-yuan {
            font-size: 12px;
          }
        }
      }
    }

    .shuffling {
      //   width: 200%;
      margin-top: 10px;
      .shuffling-content {
        display: flex;
        white-space: nowrap;
        .product-box {
          display: inline-block;
          width: 160px;
          background-color: #fff;
          padding: 15px 0 5px 0;
          .product-img {
            width: 98%;
            height: 110px;
            margin: 0 auto;

            image {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .main-heading {
            // width: 98%;
            height: 24px;
            margin: 8px auto;
            padding: 0 9px;
            font-size: 12px;
            line-height: 24px;
            color: #413838;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .subhead {
            width: 78px;
            height: 17px;
            padding: 0 9px;
            line-height: 17px;
            font-size: 10px;
            font-size: 18px;
            color: #fc4150;
            .icon-yuan {
              font-size: 12px;
            }
          }
        }
      }
    }
    .topbar {
      width: 100%;
      padding: 10px 10px;
      box-sizing: border-box;
      //   overflow: hidden;
      line-height: 40px;
      font-size: 16px;
      white-space: nowrap;
      background: #fff;
      display: flex;
      //   box-shadow: 0.5px 0.5px 5px #d8d6d6;
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
      }
      .topbar-item {
        flex: 1;
        // text-overflow: ellipsis;
        // overflow: hidden;
        // white-space: nowrap;
        font-size: 14px;
        font-family: PingFangSC-Medium, sans-serif;
        display: inline-block;
        // width: calc(25%);
        text-align: center;
        color: #413838;
        .topbar-item-name {
          // text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .topbar-item.active {
        color: #f05b47;
        position: relative;
      }
      .topbar-item.active::after {
        content: "";
        display: block;
        height: 2px;
        // text-align: center;
        width: 100%;
        background: #f05b47;
        position: absolute;
        // left:12.5%;
        bottom: 0;
        border-radius: 1px;
      }
      .topbar-item.active2 {
        color: #fff;
        background-color: #f05b47;
        position: relative;
      }
      .topbar-item > .botBar {
        width: 0;
        height: 0;
        border: 7px solid#f05b47;
        border-color: #f05b47 transparent transparent transparent;
        position: absolute;
        bottom: -11.5px;
        left: 45%;
      }
      .topbar-item.active3 {
        color: #fff;
        background-color: #f05b47;
        border-radius: 20px;
      }
      .topbar-left {
        display: block;
      }
    }
    .topbar.fixed {
      position: fixed;
      //   top: 65px;
      left: 0;
      z-index: 99;
    }
    .tpd {
      padding: 0px;
    }
    .tpd2 {
      padding: 5px 10px;
    }
  }
  .tab-box {
    width: 100%;
    margin: 5px 0;
    .topbar-left-box {
      width: 65px;
      font-size: 12px;
      background: #fff;
      float: left;
      .topbar-left {
        font-family: PingFangSC-Medium, sans-serif;
        width: 100%;
        height: 40px;
        // text-align: center;
        color: #999999;
        border-bottom: 0.5px solid #eeeee7;
        display: flex;
        align-items: center;
        .topbar-left-name {
          display: -webkit-box !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          word-wrap: break-word !important;
          white-space: normal !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          //   line-height: 40px;
          margin-left: 9px;
        }
      }
      .topbar-left:last-child {
        border-bottom: 0px;
      }
      .topbar-left.active4 {
        color: #fff;
        background-color: #f05b47;
      }
      .topbar-left.active5 {
        // color: #fff;
        // background-color: #f05b47;
        // text-align: center;
        // line-height: 30px;
        // margin: 5px auto;
        // width: 60px;
        // height: 30px;
        // border-radius: 15px;
        position: relative;
      }
      .topbar-left.active5::before {
        content: "";
        display: block;
        height: 30px;
        width: 2px;
        background: #f05b47;
        position: absolute;
        right: 0;
        top: 12.5%;
        border-radius: 1px;
      }
      .topbar-left.active6 {
        color: #413838;
        background-color: #fff;
        padding-right: 11px;
      }
    }
    .topbar-left-box.fixed {
      position: fixed;
      //   top: 64px;
      left: 0;
      z-index: 99;
    }
    .tab-bgc {
      color: #cdcdcd;
    }
    .bgc {
      background-color: #fff;
    }
    .topbar-left-content1,
    .topbar-scroll {
      width: 301px;
      float: right;
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
      }

      .topbar-left-content,
      .top-radius {
        width: 100%;
        background-color: #fff;
        color: #a0a0a0;
        margin-right: 4px;
        margin-bottom: 10px;

        .group-title {
          font-size: 14px;
          font-family: PingFangSC-Medium, sans-serif;
          padding-left: 10px;
          line-height: 40px;
          border-bottom: 0.5px solid #eeeee7;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .group-content {
          width: 100%;
          font-size: 14px;
          .group-content-item {
            padding-bottom: 15px;
            position: relative;
            image {
              width: 106px;
              height: 68px;
              display: inline-block;
              padding-left: 10px;
              padding-top: 5px;
              float: left;
            }
            .text {
              float: left;
              width: 150px;
              margin-left: 10px;
              padding-left: 10px;
              display: inline-block;
              //   height: 24px;
              line-height: 24px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .shopCar {
              position: absolute;
              right: 10px;
              bottom: 15px;
              color: #fc4150;
              width: 20px;
              height: 20px;
              font-size: 25px;
            }
          }
          .first {
            padding-top: 15px;
          }
        }
      }
    }
    .topbar-scroll {
      .top-radius {
        border-radius: 10px;
      }
    }
  }
}
</style>
