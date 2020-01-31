<template>
  <div class="nav-bar">
    <div :style="{'margin-top':navBarHeight+'px'}" class="nav-bar-content">
      <div @click="back" v-if='backShow' :style="{'line-height':navContentHeight+'px','height':navContentHeight+'px'}" class='nav-bar-arrow'>
        <i class="xx-icon  icon-back nav-bar-icon">
        </i>
      </div>
      <div :style="{'line-height':navContentHeight+'px','height':navContentHeight+'px'}" class="nav-bar-text">{{title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: null
    };
  },
  created() {
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    backShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back() {
      wx.navigateBack({
        delta: 1
      });
    }
  }
};
</script>
<style lang='scss'>
.nav-bar {
  position: fixed;
  width: 100%;
  top: 0;
  background-image: linear-gradient(to right, #f7426c, #ef0017);
  z-index: 9999999;
  /*background: #fff;*/
  box-sizing: border-box;
  .nav-bar-content {
    position: relative;
    .nav-bar-text {
      color:white;
      font-weight:900;
      // height: 49px;
      // line-height: 49px;
      text-align: center;
      font-size: 18.5px;
    }
    .nav-bar-arrow {
      position: absolute;
      left: 0;
      top: 0;
      // height: 49px;
      // line-height: 49px;
      padding-left: 10px;
      padding-right: 20px;
      .nav-bar-icon {
        font-size: 21px;
        color: #000;
      }
    }
  }
}
</style>

