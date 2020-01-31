<template>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'padding-bottom':(tabContentHeight+navBarHeight+'px')}" class="custom-page">
        <!-- <div> -->
            <div v-for='(item,index) in dataList' :class="{'mb10':!item.hideBottom}" :key='index'>
                <title v-if="item.category=='title'" :pageData='item.data'></title>
                <signage v-if="item.category=='shopinfo'" :pageData='item.data'></signage>
                <product v-if="item.category=='product'" :pageData='item.data'></product>
                <topleft-bar v-if="item.category=='productGroup'" :pageData='item.data'></topleft-bar>
                <auxblank v-if="item.category=='subBlank'" :pageData='item.data'></auxblank>
                <auxline v-if="item.category=='subline'" :pageData='item.data'></auxline>
                <notice v-if="item.category=='notice'" :pageData='item.data'></notice>
                <text-item v-if="item.category=='text'" :pageData='item.data'></text-item>
                <search v-if="item.category=='search'" @parkNameChange='parkNameChange' :parkName='cityName' :parkList='cityList' :pageData='item.data'></search>
                <rich-text v-if="item.category=='richText'" :pageData="item.data"></rich-text>
                <photo-ads v-if="item.category=='banner'" :pageData='item.data'></photo-ads>
                <by-navigation v-if="item.category=='navigation'" :pageData='item.data'></by-navigation>
                <free-layout v-if="item.category=='freeLayout'" :pageData='item.data'></free-layout>
                <layer v-if="item.category=='layer'" :pageData="item.data"></layer>
                <strategy v-if="item.category=='strategy'"
                          :listType="item.data.listType"
                          :pageData="item.data"></strategy>
                <strategy-group v-if="item.category=='strategyGroup'" :pageData="item.data"></strategy-group>

                <!-- <swiper class="photoAds-item" :class="{width:pageData.imgFill=='white'}" indicator-color='#f4aaa0' indicator-active-color='#f05b47' @change='currentChange' :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration">
                  <block v-for="(item,index) in pageData.list" :key="index">
                      <swiper-item @click='gourl(item)'>
                          <div v-if="pageData.hideText=='F'" class="text">
                              <span style="margin-left:10px;">{{item.title}}</span>
                              </div>
                          <img :src="item.picAddr" alt="">
                      </swiper-item>
                  </block>
              </swiper> -->
            </div>
        <!-- </div> -->
    </div>
</template>

<script>
import navbar from "@/components/navbar";//顶部栏
import signage from "@/components/customCom/signage"; //店招
import title from "@/components/customCom/title"; //标题
import product from "@/components/customCom/productSC"; //产品
import topleftBar from "@/components/customCom/productGroupSC"; //产品分组
// import topleftBar from "@/components/customCom/topleftBar"; //产品分组
import auxblank from "@/components/customCom/auxblank"; //辅助空白
import auxline from "@/components/customCom/auxline"; //辅助线
import notice from "@/components/customCom/notice"; //公告
import textItem from "@/components/customCom/text"; //文本
import search from "@/components/customCom/searchCity"; //搜索
import richText from "@/components/customCom/richtext"; //富文本
import photoAds from "@/components/customCom/photoAds"; //图片广告(轮播图)
import byNavigation from "@/components/customCom/byNavigation"; //图文导航
import vueTabBar from "@/components/customCom/vueTabBar"; //底部导航
import freeLayout from "@/components/customCom/freeLayout"; //自由布局
import layer from "@/components/customCom/layer"; //弹框广告
import strategy from "@/components/customCom/strategy";//攻略
import strategyGroup from "@/components/customCom/strategyGroup";//攻略分组
import { getData, postData, merchantInfoId } from "@/common/common";
import api from "@/api/api";
export default {
    props:{
        cityList:{
            type:Array,
            default(){
                return []
            }
        },
        cityName:{
            type:String,
            required:true,
            default(){
                return ''
            }
        },
        dataList:{
            type:Array,
            required:true,
            default(){
                return []
            }
        }
    },
  components: {
    navbar,
    signage,
    title,
    product,
    topleftBar,
    auxblank,
    auxline,
    notice,
    textItem,
    search,
    richText,
    photoAds,
    byNavigation,
    freeLayout,
    vueTabBar,
    layer,
    strategy,
    strategyGroup
  },
  data() {
    return {
      selectNavIndex: 0,
      navigationData:{},
    };
  },
  onShow() {
   const query = wx.createSelectorQuery();
    query.select("#topleftBar").boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res) {
        // console.log(res)
    });
    query.select("#topbar-box").boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res) {
    });
  },
  methods: {
      parkNameChange(name) {
      this.$emit("parkNameChange",name );
      }
  }
};
</script>

<style lang='scss'>
.custom-page {
  height:auto;
  padding: 0px 13px;
  //   background-color: #fff;
}
</style>
