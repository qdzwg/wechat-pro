<template>
  <div class="address-select">
    <div v-if='show' @click.stop="close" class="mask"></div>
    <div :animation="animationData" class="address-box">
      <div class="handle-box clearfix">
          <button class="cancel fl" @click="cancel">取消</button>
        <button class="sure fr" @click="sure">确定</button>
        
      </div>
      <picker-view class="selectlist" indicator-style="height: 50px;" style="width: 100%; height: 300px;" @change="bindChange">
        <picker-view-column class="select-column">
          <div v-for="(item,index) in shengs" :key='index' style="line-height: 50px">{{item.areaName}}</div>
        </picker-view-column>
        <picker-view-column class="select-column">
          <view v-for="(item,index) in shis" :key='index' style="line-height: 50px">{{item.areaName}}</view>
        </picker-view-column>
        <picker-view-column class="select-column">
          <view v-for="(item,index) in qus" :key='index' style="line-height: 50px">{{item.areaName}}</view>
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
      show: false,
      animation: null,
      animationData: {},
      oldVal: [0, 0, 0], //用于前后对比
      shengs: [],
      shis: [],
      qus: [],
      value: [0, 0, 0] //指定第几项
    };
  },
  methods: {
    open() {
      this.show = true;
      this.animation.bottom("0rpx").step();
      this.animationData = this.animation.export();
    },
    close() {
      this.show = false;
      this.$emit("setShow");
      this.animation.bottom("-800rpx").step();
      this.animationData = this.animation.export();
    },
    sure() {
      this.close();
      if (this.shengs.length && this.shis.length && this.qus.length) {
        this.$emit(
          "setAddress",
          this.shengs[this.oldVal[0]],
          this.shis[this.oldVal[1]],
          this.qus[this.oldVal[2]]
        );
      } else {
        wx.showToast({
          title: "没有选择完整省市区!",
          duration: 1000,
          icon: "none"
        });
      }
    },
    cancel() {
      this.close();
    },
    bindChange(e) {
      const val = e.mp.detail.value;
      val.forEach((item, index) => {
        //找到变化的是那个
        if (item != this.oldVal[index]) {
          if (index == 0) {
            //省改变
            // this.value = [val[0], 0, 0];
            getData(
              "/admin/api/area/selectByPcode",
              {
                parentCode: this.shengs[val[0]].areaCode
              },
              false
            ).then(res => {
              this.shis = res.data;
              getData(
                "/admin/api/area/selectByPcode",
                {
                  parentCode: this.shis[val[1]].areaCode
                },
                false
              ).then(res => {
                this.qus = res.data;
              });
            });
            this.qus = []; //置空区
          } else if (index == 1) {
            //市改变
            // this.value = [val[0], val[1], 0];
            getData(
              "/admin/api/area/selectByPcode",
              {
                parentCode: this.shis[val[1]].areaCode
              },
              false
            ).then(res => {
              this.qus = res.data;
            });
          } else if (index == 2) {
            //区改变
            // this.value = val;
          }
          this.oldVal = val;
          return false;
        }
      });
    }
  },
  onLoad() {
    this.animation = wx.createAnimation({
      //初始化动画
      duration: 500,
      timingFunction: "ease"
    });
    //默认北京市-市辖区-东城区
    //省
    getData("/admin/api/area/selectByPcode", {}, false).then(res => {
      this.shengs = res.data;
    });
    //市
    getData(
      "/admin/api/area/selectByPcode",
      {
        parentCode: "110000"
      },
      false
    ).then(res => {
      this.shis = res.data;
    });
    //区
    getData(
      "/admin/api/area/selectByPcode",
      {
        parentCode: "110100"
      },
      false
    ).then(res => {
      this.qus = res.data;
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
