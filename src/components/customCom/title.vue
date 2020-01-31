<template>
    <div class="title">
        <div class="title-box clearfix" v-bind:style="{color:pageData.titleColor,backgroundColor:pageData.backgroundColor}">
            <div class="main-heading" :class="{width:pageData.navigationName==''}" v-bind:style="{textAlign:pageData.position,fontSize:pageData.titleFontSize+'px'}">
               <span v-if="!pageData.titlePic" style="margin-left:5px;">{{pageData.title}}</span> 
               <img v-else :src="pageData.titlePic" alt="">
            </div>
            <div v-if="pageData.subtitle" class="subhead" :class="{width:pageData.navigationName==''}" v-bind:style="{textAlign:pageData.position}">
               <span style="margin-left:5px;"></span> {{pageData.subtitle}}
            </div>
            <div class="title-nav" @click='gourl(pageData)' v-if="pageData.navigationName!=''">
                <span class="navname">{{pageData.navigationName}}</span>
                <i class="xx-icon icon-more icon-navname" :style="{color:pageData.nameColor,backgroundColor:pageData.nameBgColor}"></i>
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
  methods: {
    gourl(item) {
        if(item.linkUrl){
            this.goNavurl(item);
        }
      
    },
  }
};
</script>
<style lang='scss'>
.title {
  width: 100%;
  .title-box {
    width: 100%;
    background-color: #fff;
    padding: 10px 0;
    // text-align: right;
    position: relative;
    .main-heading {
      width: 80%;
      height: auto;
      // margin:0 auto;
      padding-left:9px;
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      img {
        width: 100px;
        height: 30px;
        margin-right: 10px;
      }
    //   line-height: 24px;
    }
    .subhead {
      width: 80%;
      height: 17px;
      // margin:5px auto;
      padding: 0 9px;
      line-height: 17px;
      font-size: 12px;
    }
    .width{
        width:100%;
        padding:0;
    }
    .title-nav {
      position: absolute;
      top: 50%;
      right: 6px;
      font-size: 12px;
      margin-top: -8px;
      .icon-navname {
        border-radius: 50%;
        margin-left: 4px;
        font-size: 12px;
        display: inline-block;
      }
    }
    .font-left {
      text-align: left;
    }
    .font-center {
      text-align: center;
    }
    .font-right {
      text-align: right;
    }
  }
}
</style>
