<template>
  <div class="menu-list" :class="{'is-fixed':isFixed}">
      <span v-for="(item,index) in list" :key="index"
        @click="changeIndex(index)"
        class="menu-item"
        :class="{'active':activeIndex==index}"
        :style="{'background':activeIndex==index?activeColor:'#fff'}"
      >{{item.groupName?item.groupName:'默认名称'}}</span>
  </div>
</template>
<script>
export default {
  props: {
    isFixed: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: "#f05b47"
    },
    list: {
      type: Array,
      default: () => []
    },
    menuType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    // route() {
    //   return this.$route;
    // }
  },
  watch: {
    // route(val) {
    //   this.getLocalStorageData();
    // }
  },
  created() {
    // this.getLocalStorageData();
  },
  onLoad(){
    // this.getLocalStorageData();
  },
  methods: {
    // getLocalStorageData() {
    //   console.log(this.$root.$mp)
    //   if (this.$root.$mp.page.route == "pages/strategy/strategyDetail/main") {
    //     this.activeIndex = this.$root.$mp.query.detailIndex;
    //   }
    // },
    changeIndex(index) {
      this.activeIndex = index;
      this.$emit("indexChange", index);
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-list {
  padding: 10px 12.5px;
  &.is-fixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
  }
  .menu-item {
    display: inline-block;
    text-align: center;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    color: #666;
    margin-right: 10px;
    border-radius: 15px;
    &:last-child {
      margin-right: 0;
    }
    &.active {
      background: #ffb72f;
      color: #ffffff;
    }
  }
}
</style>
