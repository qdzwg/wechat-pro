<template>
    <div class="scenic-search">
        <div class="scenic-search-warper shadow-bottom">
            <input @confirm='search' v-model='keyword' placeholder='请输入关键字' placeholder-class="place-holder" class='search-input'>
            <i @click="search" class="xx-icon icon-ico-search search-icon"></i>
        </div>
    </div>
</template>
<script>
import { getData } from "@/common/common";
export default {
  props: ["name"],
  data() {
    return {
      keyword: ""
    };
  },
  watch: {
    name(val) {
      this.keyword = val
    }
  },
  onLoad() {
    if (this.name) {
      this.keyword = this.name;
    }
  },
  methods: {
    search() {
      this.$emit("getData", this.keyword);
    }
  }
};
</script>
<style lang='scss'>
.scenic-search {
  padding: 13px 0px;
  .scenic-search-warper {
    background: #fff;
    position: relative;
    border-radius: 2px;
    .search-input {
      padding: 0 20px;
      padding-left: 37px;
      height: 34px;
      color: #ccc;
      font-size: 13px;
      text-align: left;
    }
    .place-holder {
      font-family: PingFangSC-Regular, sans-serif;
      color: #acacac;
      text-align: left;
      font-size: 13px;
    }
    .search-icon {
      font-size: 17.5px;
      color: #999;
      position: absolute;
      top: 8px;
      left: 15px;
    }
  }
}
</style>
