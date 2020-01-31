<template>
  <div>
    <web-view :src="src"></web-view>
  </div>
</template>

<script>
// import { getData, postData, host, merchantInfoId } from "@/common/common.js";
// import api from "@/api/api";
export default {
  // components: {
  //   search,
  //   navbar
  // },
  data() {
    return {
      src: ""
    };
  },
  onLoad() {
    this.src = decodeURIComponent(this.$root.$mp.query.src);
    console.log(this.src)
  },
  onUnload() {},
  onReachBottom() {},
  mounted() {},
  methods: {},
  onShow() {}
};
</script>

<style lang='scss'>
</style>
