<template>
    <div class="signage">
        <img class="bgc-img" :src="pageData.backUrl" alt="">
        <div class="signage-box clearfix">
            <div class="signage-img fl">
                <img class="signage-img-item" :src="pageData.logoUrl" alt="">
            </div>
            <div class="signage-item fl" v-bind:style="{color:pageData.textColor}">
                <div class="title">
                    <div class="signage-text">{{pageData.name}}</div> 
                    <div class="customer" v-if="pageData.tel" @click="getPhone(pageData.tel)">
                <i class="xx-icon icon-dianhua customer-icon"></i>
            </div>
                    </div>
                <div class="subhead">{{pageData.introduction}}</div>
            </div>
            
        </div>
    </div>
</template>


<script>
export default {
  props: {
    pageData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  methods: {
    getPhone(num) {
      wx.makePhoneCall({
        phoneNumber: num //拨通号码
      });
    }
  }
};
</script>


<style lang="scss">
.signage {
  width: 100%;
  //   padding-top: 60px;
  //   padding-bottom: 10px;
  background-color: #fff;
  position: relative;
  .bgc-img {
    width: 100%;
    height: 160px;
  }
  .signage-box {
    width: 100%;
    position: absolute;
    bottom: 10px;
    left: 0;
    .signage-img {
      width: 25%;
      
      .signage-img-item {
        width: 75px;
        height: 75px;
        display: block;
        margin: 0 auto;
      }
    }
    .signage-item {
      width: 73.5%;
      height: 80px;
      color: #413838;
    //   padding-bottom:5px;
      .title {
        font-size: 18px;
        line-height: 27px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .signage-text{
             display: inline-block;
             padding-top:-10px;
        }
        .customer {
      width: 7%;
      height: auto;
      line-height: 27px;
      font-size: 20px;
      color: #f05b47;
      text-align: left;
      margin-left:5px;
      display: inline-block;
      .customer-icon{
          font-size: 18px;
      }
    }
      }
      .subhead {
        font-size: 12px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    
  }
}
</style>


