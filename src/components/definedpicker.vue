<template>
  <div class="address-select">
    <div v-if='show' @click.stop="closed" class="mask"></div>
    <div :animation="animationData" class="address-box">
      <div class="handle-box clearfix">
          <button class="cancel fl" @click="closed">取消</button>
        <button class="sure fr" @click="sure">确定</button>
        
      </div>
      <picker-view class="selectlist" indicator-style="height: 50px;" style="width: 100%; height: 300px;" @change="bindChange">
        <picker-view-column class="select-column">
          <div v-for="(item,index) in arr" :key='index' style="line-height: 50px">{{item[props]}}</div>
        </picker-view-column>
      </picker-view>
    </div>
  </div>
</template>

<script>
// Use Vuex
import { getData, merchantInfoId } from "@/common/common";
export default {
  data() {
    return {
      index: 0,
      show: false,
      animation: null,
      animationData: {},
    };
  },
  watch: {
    select(val) {
      console.log(val)
      if(val){
        this.open()
      }else{
        this.close()
      }
    }
  },
  props: {
    props: {
      type: String,
      default: "nickName"
    },
    select: {
      type: Boolean,
      default: false
    },
    arr: {
      type: Array,
      default: []
    },
  },
  methods: {
    open() {
      this.show = true;
      this.animation.bottom("0rpx").step();
      this.animationData = this.animation.export();
    },
    close() {
      this.show = false;
      this.animation.bottom("-800rpx").step();
      this.animationData = this.animation.export();
    },
    closed() {
      this.close()
      this.$emit("pickerCancel");
    },
    sure() {
      this.$emit("pickerChange",this.arr.length?this.arr[this.index]:null);
    },
    bindChange(e) {
      const val = e.mp.detail.value;
      this.index = val?val[0]:null;
    }
  },
  onLoad() {
    this.animation = wx.createAnimation({
      //初始化动画
      duration: 500,
      timingFunction: "ease"
    });
  }
};
</script>

<style lang="scss">
.address-select {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 700;
  }
  .address-box {
    // height: 200px;
    position: fixed;
    left: 0;
    bottom: -100%;
    width: 100%;
    z-index: 710;
    background: #fff;
    .selectlist {
      .select-column {
        text-align: center;
        font-size: 14px;
      }
    }
    .handle-box {
      padding: 0 15px;
      .sure {
        font-size: 14px;
        margin-top: 10px;
        margin-right: 10px;
      }
      .cancel {
        font-size: 14px;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>
