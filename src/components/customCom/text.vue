<template>
    <div class="custext" v-bind:style="{fontSize:pageData.fontSize,color:pageData.textColor,textAlign:pageData.position,backgroundColor:pageData.backgroundColor}">
        <div class="custext-box" @click='gourl(pageData)'>
            {{pageData.content}}
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
.custext {
  width: 100%;
  .custext-box {
    width: 98%;
    height:auto;
    line-height: 20px;
    padding: 5px 5px;
    word-wrap: break-word;
    word-break: normal;
  }
}
</style>
