<template>
    <div class="photoAds">
        <!-- 轮播 -->
        <div class="photoAds-box" v-if="pageData.type=='banner1'" :class="{hasbg: pageData.casaulBackUrl}">
            <swiper class="photoAds-item" 
              :style="{borderRadius: pageData.imgRadius=='special'?'10px':'','background': pageData.casaulBackUrl? 'url('+pageData.casaulBackUrl+') bottom center no-repeat' :'', 'background-size':pageData.casaulBackUrl?'contain':''}" 
              :class="{width:pageData.imgFill=='white'}" indicator-color='#f4aaa0' indicator-active-color='#f05b47' @change='currentChange'  :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration">
                <block v-for="(item,index) in pageData.list" :key="index">
                    <swiper-item @click='gourl(item)'>
                        <div v-if="pageData.hideText=='F'" class="text">
                             <span style="margin-left:10px;">{{item.title}}</span>
                            </div>
                        <img :src="item.picAddr" alt="">
                    </swiper-item>
                </block>
            </swiper>
            <div class="dots-list">
                <div v-for='(item,index) in pageData.list' :key='index' class="dots-item" :class="{ active: activeIndex==index }"></div>
            </div>
        </div>
        <!-- 左右滑动 -->
        <div class="photoAds-shuffling" v-if="pageData.type=='banner3'">
            <scroll-view class="shuffling-item" scroll-x="true" :class="{width:pageData.imgFill=='white'}">
                <div @click='gourl(item)' class="shuff-img" v-for="(item,index) in pageData.list" :key="index">
                    <img :src="item.picAddr" alt="">
                    <div v-if="pageData.hideText=='F'" class="text">{{item.title}}</div>
                </div>
                
            </scroll-view>
        </div>
        <!-- 一行一图 -->
        <div class="line-figure" v-if="pageData.type=='banner2'">
            <div @click='gourl(item)' class="line-figure-item" v-bind:style="{height:pageData.imgHeightAuto=='F'?173+'px':'100%'}" :class="{width:pageData.imgFill=='white'}" v-for="(item,index) in pageData.list" :key="index">
                <div v-if="pageData.hideText=='F'" class="text" v-bind:style="{bottom:pageData.imgHeightAuto=='F'?'0':'5px'}">
                    <span style="margin-left:10px;">{{item.title}}</span>
                </div>
                <img :src="item.picAddr" alt="" :mode="pageData.imgHeightAuto=='T'?'widthFix':''" v-bind:style="{height:pageData.imgHeightAuto=='F'?'100%':''}">
            </div>
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
      indicatorDots: true,
      circular: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      activeIndex: 0
    };
  },
  methods: {
    gourl(item) {
       if(item.linkUrl){
            this.goNavurl(item);
        }
    },
    currentChange(test) {
      //轮播图下标改变
      this.activeIndex = test.mp.detail.current;
    }
  }
};
</script>
<style lang='scss'>
.photoAds {
  width: 100%;
  .photoAds-box {
    position: relative;
    .photoAds-item {
      height: 192px;
      overflow: hidden;
      border-radius: 5px;
      position: relative;
      image {
        width: 100%;
        height: 192px;
        display: inline-block;
      }
      .text {
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 15px;
        background-color: rgba(31, 30, 30, 0.418);
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    .dots-list {
      position: absolute;
      width: 100%;
      bottom: 12.5px;
      left: 0px;
      display: flex;
      justify-content: center;
      .dots-item {
        height: 7.5px;
        width: 7.5px;
        margin: 0 4px;
        border-radius: 50%;
        background: #fff;
      }
      .dots-item.active {
        background: #ffb119;
        border-radius: 5px;
        width: 13.5px;
      }
    }
    
  }
  .photoAds-shuffling {
    // padding: 5px 4px;
    background-color: #fff;
    .shuffling-item {
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
      }
    }
    .shuff-img {
      margin-right:4px;
      display: inline-block;
      position: relative;
      width: 160px;
      height: 110px;
      image {
        width: 100%;
        height: 100%;
      }
      .text {
        width: 155px;
        height: 25px;
        line-height: 25px;
        margin-bottom:5px;
        color: #fff;
        font-size: 13px;
        padding-left: 5px;
        background-color: rgba(31, 30, 30, 0.418);
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }

  .line-figure {
    width: 100%;
    .line-figure-item {
      position: relative;
      margin: 0px auto;
      margin-bottom: 10px;
      overflow: hidden;
      image{
          width:100%;
      }
      .imgHeight{
          width:100%;
          mode:widthFix;
      }
      .text {
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 15px;
        background-color: rgba(31, 30, 30, 0.418);
        //   background: hsla(0,0,100%,.16);
        position: absolute;
        bottom: 5px;
        left: 0;
      }
    }
  }
  .width {
      width:98%;
      margin:0 auto;
      
  }
  .hasbg{
    .dots-list {
      bottom: 18px;
    }
    .photoAds-item{
      padding-bottom: 5px;
    }
  }
}
</style>
