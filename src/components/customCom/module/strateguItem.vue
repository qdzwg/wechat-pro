<template>
  <div
    class="item"
    @click.stop="goDetail"
    :class="{'side-item':type=='sideslip','sigle-item':type=='singleRow','biserial-item':type=='biserial'}"
  >
    <div class="img-bar">
      <img class="p-img" :src="showImg" alt mode="scaleToFill" />
      <tag-list :arr="arr"></tag-list>
    </div>
    <div class="item-info">
      <div
        class="title"
      >{{pageData.name}}</div>
      <div class="user">
        <img class="head-img" v-if="pageData.headImg" :src="pageData.headImg" alt />
        <span class="name">{{pageData.nickName}}</span>
      </div>
      <div class="item-dots">
        <div class="item-dot"></div>
        <div class="item-dot"></div>
        <div class="item-dot"></div>
      </div>
    </div>
  </div>
</template>
<script>
import tagList from "./tagList";
// import Emitter from "../../../../mixins/emitter";
// import { parse } from "path";
export default {
  // mixins: [Emitter],
  components: {
    tagList
  },
  props: {
    cureenIndex: {
      type: String | Number,
      default: 0
    },
    menuType: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => []
    },
    category: {
      type: String
    },
    tagArr: {
      type: Array,
      default: []
    },
    imgSrc: {
      type: String,
      default: ""
    },
    itemData: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: "sideslip"
    }
  },
  methods: {
    goDetail() {
      if (this.category == "strategy") {
        this.navigatePageTo('/pages/strategy/strategyDetail/main?source=strategy&id='+this.pageData.merchantStrategyId )
      } else {
        this.setStorageSync('xj_czc_strategy_detail_data_20191017',{
          list: this.list,
          menuType: this.menuType,
          listType: this.type
        })
        //分组
        this.navigatePageTo('/pages/strategy/strategyDetail/main?source=strategyGroup&id='
          +this.pageData.merchantStrategyId
          +"&detailIndex="
          + this.cureenIndex)
      }
    }
  },
  computed: {
    showTime() {
      let time = "";
      if (this.pageData.createTime) {
        let date = new Date(this.pageData.createTime);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        time = year + "年" + month + "月" + day + "日";
      }
      return time;
    },
    showImg() {
      return this.imgUrl
        ? this.imgUrl
        : this.pageData.picAddr
        ? this.pageData.picAddr
        : "";
    }
  },
  watch: {
    tagArr(val) {
      this.arr = val;
    },
    imgSrc(val) {
      this.imgUrl = val;
    },
    itemData(val) {
      this.pageData = val;
    }
  },
  data() {
    return {
      arr: this.tagArr,
      imgUrl: this.imgSrc,
      pageData: this.itemData
    };
  }
};
</script>
<style lang="scss" scoped>
.item {
  box-sizing: border-box;
  padding: 0 5px;
  width: 100%;
  .img-bar {
    .tag {
      color: #fff;
      font-size: 10px;
    }
  }
  .title {
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  .user {
    font-size: 10px;
    color: #999;
    height: 20px;
    line-height: 20px;
  }
  .item-info {
    position: relative;
  }
  .item-dots {
    line-height: 85px;
    position: absolute;
    right: 10px;
    top: 0px;
    bottom: 0px;
    .item-dot {
      margin-left: 4px;
      display: inline-block;
      vertical-align: top;
      margin-top: 30px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #ccc;
    }
  }
}
.strategy-page {
  .biserial-item {
    &:nth-child(2n) {
      /*margin-left: 10px;*/
    }
  }
}
.biserial-item {
  width: 50%;
  float: left;
  margin-bottom: 10px;
  &.h-m {
    margin-bottom: 0;
  }
  .img-bar {
    height: 100px;
    .p-img {
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
  .item-info {
    height: 85px;
    background: #fff;
    padding-top: 10px;
    .user {
      padding-left: 10px;
    }
    .title {
      margin-bottom: 10px;
      padding: 0 10px;
      word-break: break-all;
      height: 35px;
      line-height: 18px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
.side-item {
  width: 130px;
  float: left;
  .img-bar {
    height: 80px;
    .t-l {
      left: -16px;
      top: 2px;
    }
    .tag {
      height: 20px;
      line-height: 20px;
      width: 56px;
    }
  }
  .item-info {
    .title {
      margin-top: 10px;
    }
  }
}
.sigle-item {
  float: none;
  margin-bottom: 10px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  .img-bar {
    height: 140px;
    .p-img {
      border-bottom-right-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }
  .item-info {
    height: 65px;
    background: #fff;
    padding-top: 10px;
    .title {
      margin-bottom: 8px;
      padding: 0 10px;
      box-sizing: border-box;
      display: -webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .user {
      padding: 0 5px;
      box-sizing: border-box;
      .name {
        // width: calc(100% - 22px);
        flex: 1;
        display: -webkit-box;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }
}
</style>
