<template>
    <div class="tabBar-wrap">
        <!-- {{pageData}}  -->
        <div class="tabBar-box" v-bind:style="{borderColor:pageData.backgroundLineColor,backgroundColor:pageData.backgroundColor,color:pageData.textColor}">
            <ul class="tabBar-nav" v-if="pageData.list.length > 0">
                <li class="item" v-for="(item, index) in pageData.list" @click="selectNavItem(index,item)" :key="index">
                    <!-- <web-view v-if="item.linkUrl=='customlink'" :src="item.customLinkurl"></web-view> -->

                    <div class="item-images">
                        <img v-if="item.selectImgUrl!=''&&item.defaultImgUrl!=''" :src="realIndex === index ?  item.selectImgUrl:item.defaultImgUrl" alt="iconPath">
                        <div v-else class="icon-text" v-bind:style="{color:realIndex === index?pageData.selectTextColor:pageData.textColor}">
                            <i class="xx-icon icon-text-box" :class="iconData[item.linkUrl]"></i>
                        </div>

                    </div>
                    <div class="item-text" v-bind:style="{color:realIndex === index?pageData.selectTextColor:pageData.textColor}">
                        {{item.title}}
                    </div>

                </li>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    selectNavIndex: {
      type: Number,
      default: 0
    },
    pageData: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    }
  },
  computed: {
    realIndex() {
      return this.clickIndex ? this.clickIndex : this.activeIndex;
    }
  },
  data() {
    return {
      navList: [],
      clickIndex: null,
      activeIndex: 0,
      iconData: {
        home: "icon-nav-home",
        order: "icon-nav-orders",
        personal: "icon-member",
        shopcart: "icon-shopping-car",
        customtel: "icon-bohao"
      }
    };
  },
  onLoad() {    
    //当前页面getCurrentPages().pop().__route__
    let currentPage = getCurrentPages().pop().__route__;
    this.clickIndex = wx.getStorageSync("xjsc_navigation_active_index");
    wx.removeStorageSync("xjsc_navigation_active_index");
    try {
      this.pageData.list.forEach((item, index) => {
        if (this.linkUrlObj[item.linkUrl] == currentPage) {
          this.activeIndex = index;
          //保证匹配第一个
          throw new Error("跳出循环");
        }
      });
    } catch (error) {}
  },
  methods: {
    selectNavItem(index, item) {
      console.log(item);
      // pagePath,id, customTel
      let _this = this;
      //   this.selectNavIndex = index;

      //   if (index == 0 && this.selectNavIndex == -1) {
      //     this.$emit("fetch-index", this.selectNavIndex);
      //   }
      wx.setStorageSync("xjsc_navigation_active_index", index);
      if (item.linkUrl != "") {
        _this.tabNavurl(item);
      } else {
      }

      //   let url = _this.linkUrlObj[pagePath];
      //   this.goLinkUrl(this.router + url);
    },
    bindNavigateTo(url) {
      wx.navigateTo({
        url: url
      });
    },
    bindViewTap(url) {
      wx.switchTab({
        url: url
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tabBar-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  padding: 5px 0;
  border-top: 0.5px solid #eee;
  //   background-color: #f8f8f8;
  z-index: 999;
  .tabBar-nav {
    width: 100%;
    display: flex;

    .item {
      flex: 1;
      text-align: center;
    }
    .item-text {
      font-size: 10px;
      transition: 0.24s linear;
    }
    .item-images {
      width: 23px;
      height: 23px;
      margin: 0 auto;
      text-align: center;
      transition: 0.24s linear;

      & image {
        display: inline;
        width: 100%;
        height: 100%;
      }
      .icon-text {
        font-size: 23px;
        transition: 0.24s linear;
        .icon-text-box {
          font-size: 23px;
        }
      }
    }
  }
}
</style>


