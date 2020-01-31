<template>
  <div>
    <navbar title='攻略详情'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <div class="title">{{mainData.name}}</div>
      <br>
      <video :src="mainData.vedioAddr"
               v-if="mainData.vedioAddr"
               class="videoClass"
               autoplay="autoplay">
          您的浏览器不支持 video 标签。
      </video>
      <img class="picClass" :src="mainData.picAddr" alt="" v-if="!mainData.vedioAddr">
      <div class="musicBoxClass">
        <audio :src="mainData.musicAddr"
                 class="musicClass"
                 controls="controls"
                 v-if="mainData.musicAddr">
        </audio>
      </div>
    </div>
    <div class="contentClass" v-for="(val, index) in mainData.contentVoList" :key="index">
      <div class="contentTitle">{{val.subHeading}}</div>
      <div v-html="val.content"></div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import { getData, postData, merchantInfoId } from "@/common/common";
import navbar from "@/components/navbar";
export default {
  components: {
    navbar
  },
  data () {
    return {
      mainData:{
        contentVoList:[]
      }
    };
  },
  methods: {},
  onShow () {
    let _this = this;
    let raidersDeUrl = '/merchant/api/merchantStrategy/getMerchantStrategyByIdNew';
    getData(
      raidersDeUrl,
      {
        merchantStrategyId: _this.$root.$mp.query.id
      },
      false
    ).then(res => {
      if (res.status == 200) {
        this.mainData=res.data;
      }
    });
  },
  onLoad () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onUnload () {
    this.mainData = {contentVoList:[]};
  }
};
</script>

<style scoped>
.title {width:94%; text-align:center; font-size:16px; margin-left:3%; line-height:40px;}
.picClass {width:94%; position:relative; left:3%;}
.videoClass {width:94%; height:180px; position:relative; left:3%;}
.musicBoxClass {width:94%; position:relative; left:3%;}
.musicClass {position:relative; left:50%; transform:translate(-50%, 0);}
.contentClass {width:94%; margin-top:10px; position:relative; left:3%;}
.contentTitle {font-size:14px; line-height:30px;}
</style>
