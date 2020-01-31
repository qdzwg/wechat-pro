<template>
  <div class="orderInfo-box">
    <navbar title='评论'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <div class="date_title">游客评价({{'12'}})</div>
      <div class="date_content" v-for="(val, index) in commentList">
        <img class="date_img" src="https://cdn.51dmq.com/ui/um/touxiang.png" alt>
        <div class="date_name">{{'adugen'}}</div>
        <div class="date_time">{{'2019-12-12 08:08:08'}}</div>
        <div class="date_textContent">I'm a NB, not a SB, I'm very NB, NB very much! WaHaaaaa...</div>
        <div class="date_picBox">
          <div class="date_picImgBox" :style="{width:imgList.length*160+'rpx'}">
            <img class="date_picImg" :src="_val" alt v-for="(_val, _index) in imgList">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import { getData, postData, merchantInfoId, host } from "@/common/common";
import wxParse from "@/components/htmlParse";
import navbar from "@/components/navbar";

export default {
  components: {
    navbar,
    wxParse
  },
  data() {
    return {
      commentList:[1,2,3,4,5,6],
      imgList:['https://cdn.51dmq.com/ui/um/touxiang.png','https://cdn.51dmq.com/ui/um/touxiang.png','https://cdn.51dmq.com/ui/um/touxiang.png','https://cdn.51dmq.com/ui/um/touxiang.png','https://cdn.51dmq.com/ui/um/touxiang.png','https://cdn.51dmq.com/ui/um/touxiang.png','https://cdn.51dmq.com/ui/um/touxiang.png','https://cdn.51dmq.com/ui/um/touxiang.png']
    };
  },
  methods:{
    
  },
  onLoad() {

  },
  onShow() {
    
  }
};
</script>

<style scoped>
.orderInfo-box {width:100%; height:100%; background-color: #fff;}
.orderInfo-content {height:20px; line-height:20px; font-size:12px;}
.date_title {padding-left:13px; height:46px; line-height:46px; font-size:18px; font-weight:900; border-bottom:1px solid #f0f2f7;}
.date_content {width:calc(100% - 26px); padding:15px 13px 25px; border-bottom:1px solid #f0f2f7; position:relative;}
.date_img {border-radius:50%; width:30px; height:30px; display:inline-block; margin-right:12px;}
.date_name {width:130px; height:30px; line-height:30px; font-size:16px; display:inline-block;}
.date_time {height:30px; line-height:30px; float:right; font-size:14px; color:#999999;}
.date_textContent {width:100%; line-height:22px; margin-top:15px; font-size:16px; color:#535353;}
.date_picBox {width:100%; height:140rpx; margin-top:15px; overflow-x:auto;}
.date_picImgBox {height:140rpx;}
.date_picImg {width:140rpx; height:140rpx; margin-right:20rpx;}
</style>

