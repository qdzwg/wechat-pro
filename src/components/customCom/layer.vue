<template>
  <div v-if="isMiniApp">
    <div class="layer-box-mask" :animation="fadeAni" v-show="isShowLayer">
      <div class="layer-show-box" id="box">
        <div class="img-box" @click="gourl(pageData)">
          <img v-if="pageData.picAddr"
               mode="widthFix"
               class="img"
               :src="pageData.picAddr" id="img" :style="imgStyle"
               @load="loadImage">
          <!--<div v-else class="no-img-box">-->
            <!--<img-->
              <!--class="no-img"-->
              <!--src="http://statics.lotsmall.cn/image/20180911/20180911110321tffctw.png">-->
          <!--</div>-->
        </div>
        <!--<div v-else class="img-box">-->
        <!--<img class="no-img" src="../../../assets/images/bannertype2.png" @click="gotoTarget(pageData)">-->
        <!--</div>-->
        <div class="close">
          <span  @click.prevent.stop="close">X</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'//导入文件
  import { getData, postData, host, merchantInfoId } from "@/common/common.js";
export default {
  props: {
    pageData: {
      type: Object,
      default: {},
    }
  },
  data() {
    return {
      imgStyle:'',
      isMiniApp:false,
      fadeAni:null,
      timeOutAni:null,
      timeOutShow:null,
      isShowLayer:false,
      timeOut:null
    };
  },
  computed: {
    // dateTime () {
    //   return new Date().getTime()
    // },
  },
  watch:{
    // pageData:{
    //   handler:function(val,oldval){
    //     console.log(val.picAddr)
    //     if(val.picAddr){
    //       this.$nextTick(this.resetImgPosition())
    //     }
    //   },
    //   immediate:true
    // },
  },
  created() {
    this.init()
  },
  updated(){

  },
  mounted(){
    console.log("layer============mounted")
    // 只执行一次
    this.init()
    //  判断规定时间内是否已经弹出了设置的次数
    this.isOutRate()
    // this.init()
    // //  判断规定时间内是否已经弹出了设置的次数
    // this.isOutRate()
    // // 图片高度过高，截取头部图片
    // this.$nextTick(()=>{this.resetImgPosition()})
  },
  onShow(){
    console.log("layer============onShow")
    // 每次返回或重新进入首页时
    // this.init()
    //  判断规定时间内是否已经弹出了设置的次数
    // this.isOutRate()
  },
  onLoad(){
    console.log("layer============onLoad")
    this.init()
    // //  判断规定时间内是否已经弹出了设置的次数
    this.isOutRate()
    // // 图片高度过高，截取头部图片
    // this.$nextTick(()=>{this.resetImgPosition()})
  },
  destroyed() {
    clearTimeout(this.timeOutAni)
    clearTimeout(this.timeOutShow)
    clearTimeout(this.timeOut)
  },
  methods: {
    init(){
      this.isMiniApp = this.pageData.channel.includes('miniApp')
      // if(this.isMiniApp){
      //   this.fadeAni = this.fade(1,1000)
      // }
    },
    getCoupon(couponCode) {
        getData(this.api.main.marketing.getCoupon, {
            merchantInfoId: merchantInfoId,
            couponCode: couponCode,
            userId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
        }).then(res => {
            if (res.status == 200) {
                wx.showToast({
                    title: "领取成功",
                    icon: "none",
                    duration: 2000
                });
            }
            this.close();
        })
    },
    gourl(item) {
      // 领取优惠券
      if(item.couponCode){
        this.getCoupon(item.couponCode)
        return
      }
      if(item.linkUrl){
        this.goNavurl(item);
      }
    },
    // 图片加载完成时
    loadImage(){
      // 图片高度过高，截取头部图片
      this.$nextTick(()=>{this.resetImgPosition()})
    },
    close () {
      if(this.isShowLayer){
        if(this.timeOut){
          clearTimeout(this.timeOut)
        }
        this.isShowLayer = false;
        this.fadeAni = this.fade(0,500)
        this.setStorageSync('rateStore',{
          [moment().format("YYYY-MM-DD")]: 1,
        })
      }
    },
    // 判断规定时间内是否已经弹出了设置的次数
    isOutRate(){
      // 设置的次数
      let rate = this.pageData.rate||0;
      let nowDayStr = moment().format("YYYY-MM-DD");
      // 一天内打开的次数
      let rateStoreObj = this.getStorageSync('rateStore') || {}
      // 已经弹出的次数
      let hasRate = 0
      if(rateStoreObj[nowDayStr]){
        // 时间周期限制
        let interval = this.pageData.interval
        // 需要存储到浏览器的次数
        let rateStore = {}
        if(rateStoreObj[nowDayStr]){
          hasRate = rateStoreObj[nowDayStr]
          if(hasRate>=rate){
            // 已经弹出了设置的次数
            this.isShowLayer = false
            return
          }
          rateStore[nowDayStr]=rateStoreObj[nowDayStr]+1
        }else{
          this.searchCoupon();
        }
        this.timeOutShow = setTimeout(()=>{
          console.log("应该弹出弹框了")
          this.fadeAni = this.fade(1,500)
        },10)
      }else{
        this.searchCoupon();
      }
    },
    searchCoupon() {
      getData('/marketing/api/marketingCoupon/isLayerOfOpenPage', {
        couponCode: this.pageData.couponCode,
        userId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
      }).then(res => {
        if (res.status == 200) {
          this.isShowLayer = !res.data;
        } else {
          this.isShowLayer = true
        }
      })
    },
    // 图片高度过高，截取头部图片
    resetImgPosition(){
      let imgh = ''
      let boxh = ''
      let query = wx.createSelectorQuery()
      query.select('#img').boundingClientRect()
      query.select('#box').boundingClientRect()
      query.exec( (res) =>{
        imgh = res[0].height+50
        boxh = res[1].height
        if(imgh>boxh){
          this.imgStyle = 'margin-top:-'+(imgh-boxh) +"px"
        }
      })
    },
    // 渐入渐出动画
    fade(opacity,duration){
      let animation = wx.createAnimation({
        //持续时间1000ms
        duration: duration,
        timingFunction: 'ease',
      });
      animation.opacity(opacity).step()
      if(this.timeOutAni){
        clearTimeout(this.timeOutAni)
      }
      if(opacity == 0){
        this.timeOutAni = setTimeout(()=>{
          this.isShowLayer = false
        },duration)
      }
      return animation.export()
    }
  },
  onUnload() {
    clearTimeout(this.timeOutAni)
    clearTimeout(this.timeOutShow)
    clearTimeout(this.timeOut)
  },
};
</script>
<style lang="scss" scoped>
  .layer-box-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 10;
    transition: opacity 0.8s;
    .layer-show-box{
      box-sizing: border-box;
      position: absolute;
      top:50%;
      left: 50%;
      max-height: 75%;
      overflow: hidden;
      transform: translate(-50%,-40%);
      width: 100%;
      padding: 0 20px;
      .img-box {
        overflow: hidden;
        border-radius: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        /*background-color: #fff;*/
        text-align: center;
        padding: 0 0 40px;
        .img{
          border-radius: 10px;
          width: 100%;
        }
        .no-img-box{
          background-color: #fff;
          border-radius: 10px;
          padding: 10px 0;
        }
        .no-img {
          border-radius: 10px;
          width: 174px;
          height: 101px;
          margin-top: 30px;
          margin-right: 21px;
        }
        .no-text{
          font-size: 13px;
          color: #999;
          margin-top: 6px;
        }
      }
      .close{
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 0.693333rem;
        /*background-color: #fff;*/
        bottom: -10px;
        left: 0;
        position: absolute;
        width: 100%;
        color: #fff;
      }
    }
  }
  .layer-box-mask.show{
    opacity: 1;
  }
</style>

