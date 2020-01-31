<template>
    <div class="search-box">
        <div class="search-warper" v-bind:style="{background:pageData.backgroundColor,borderColor:pageData.borderColor,height:pageData.height*2+'rpx','--radius':pageData.height+'px'}" :class="{fillet:pageData.type=='search2'}">
           <i class="xx-icon icon-ico-search icon-search" @click="goOperation" v-bind:style="{'--top':(pageData.height*0.35<10?pageData.height*0.35:pageData.height*0.35+2)+'rpx'}"></i>
            <input @confirm='goOperation' class="search-input" v-bind:style="{color:pageData.textColor,height:pageData.height*2+'rpx',lineHeight:pageData.height*2+'rpx',textAlign:pageData.position}" v-model="seachName" placeholder-class="place-holder" :placeholder="pageData.placeholder?pageData.placeholder:'请输入您要搜索的产品'" />
            
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
        seachName:""
    };
  },
  onShow() {
  },
  methods: {
    goOperation() {
      this.navigatePageTo(
        this.router + "pages/result/main?name=" + this.seachName
      );
    }
  }
};
</script>
<style lang='scss'>
.search-box {
  width: 100%;

  .fillet {
    border-radius: var(--radius);
  }
  .search-warper {
    position: relative;
    width: 345px;
    margin: 0 auto;
    border: 0.5px solid #cbcbcb;
    .place-holder {
      font-family: PingFangSC-Regular, sans-serif;
      color: #acacac;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .search-input {
      font-family: PingFangSC-Regular, sans-serif;
      color: #999999;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    input {
    //   height: 35px;
    //   line-height: 35px;
      padding-left: 15px;
      font-size: 14px;
      padding-right: 35px;
    }
    .icon-search {
        // width:15px;
      position: absolute;
      top:var(--top);
      right: 8px;
      font-size: 20px;
      font-weight: 700;
      color: #999999;
    //   z-index: 999;
    }
  }
}
</style>
