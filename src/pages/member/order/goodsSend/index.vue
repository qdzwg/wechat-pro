<template>
  <div class="add-address">
    <navbar title='发货信息'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <input type="text">
      <div class="receiver info m-t-10 m-b-10 bg-w boxshadow">
        <span class="info-title">物流公司</span>
        <div class="express-box">
          <picker class='picker-select' @change="bindPickerChange" :value="index" :range="expressList">
            <div v-if='index' class="picker">
              {{expressList[index]}}
            </div>
            <div v-else class="picker please-select">
              请选择物流公司
            </div>
          </picker>
        </div>
      </div>
      <div class="receiver info m-t-10 m-b-10 bg-w boxshadow">
        <span class="info-title">物流单号</span>
        <input placeholder="请填写物流单号" v-model='expressCode' maxlength="30" class="info-input" type="text">
      </div>
      <div class="receiver info m-t-10 m-b-10 bg-w boxshadow">
        <span class="info-title">退货说明</span>
        <input placeholder="请填写退货说明" v-model='remark' class="info-input" type="text">
      </div>
      <!-- <div class="receiver info m-t-10 m-b-10 bg-w boxshadow detail-address">
      <span class="info-title">退货说明</span>
      <input placeholder="请填写退货说明" v-model='remark' class="info-input" type="text">
    </div> -->
      <select-address @setShow='setShow' @setAddress='getAddress' ref='address'></select-address>
      <div @click='submit' class="add-sure">提交申请</div>
      <!-- <picker @change="bindPickerChange" :value="index" :range="expressList">
      <div class="picker">
        当前选择：{{expressList[index]}}
      </div>
    </picker> -->
    </div>
</div>
</template>

<script>
import { getData, postData, merchantInfoId } from "@/common/common";
import selectAddress from "@/components/selectAddress";
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      index: null,
      selectShow: false,
      expressType: "", //快递类型
      remark: "", //说明
      expressCode: "", //物流单号
      orderRefundNo: "", //退单号
      expressList: [],
      realExpressData: []
    };
  },
  components: {
    selectAddress,
    navbar
  },
  onShow() {
    // console.log(this.$root.$mp.query.orderRefundNo);
    getData(this.api.main.express).then(res => {
      // console.log(res)
      // console.log(res.data)
      this.realExpressData = res.data;
      this.expressList = [];
      res.data.forEach(element => {
        this.expressList.push(element.value);
      });
    });
  },
  methods: {
    bindPickerChange(e) {
      // console.log("picker发送选择改变，携带值为", e);
      // console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      this.expressType = this.realExpressData[e.mp.detail.value].key;
      // console.log(this.expressType)
      this.index = e.mp.detail.value;
    },
    select(value) {
      this.expressType = value;
      this.selectShow = !this.selectShow;
      // console.log(this.expressType)
    },
    selectExpress() {
      this.selectShow = !this.selectShow;
    },
    submit() {
      if (!this.expressType) {
        wx.showToast({
          title: "请选择物流公司",
          duration: 2000,
          icon: "none"
        });
        return false;
      }
      if (!this.expressCode) {
        wx.showToast({
          title: "请填写物流单号",
          duration: 2000,
          icon: "none"
        });
        return false;
      }
      postData(this.api.member.order.retreatSendGoods, {
        expressType: this.expressType,
        remark: this.remark,
        expressCode: this.expressCode,
        orderRefundNo: this.$root.$mp.query.orderRefundNo
      }).then(res => {
        wx.showToast({
          title: "请填写物流单号",
          duration: 2000,
          icon: "none",
          success() {
            wx.navigateBack();
          }
        });
      });
    },
    getAddress(sheng, shi, qu) {
      // this.show = true;
      console.log(sheng, shi, qu);
      this.addressStr = sheng.areaName + "-" + shi.areaName + "-" + qu.areaName;
      this.areaName = sheng.areaName + shi.areaName + qu.areaName;
      this.province = sheng.areaCode;
      this.city = shi.areaCode;
      this.area = qu.areaCode;
    },
    setShow() {
      this.show = true;
      console.log("zzzzz");
    },
    openselectaddress() {
      this.$refs.address.open();
      this.show = false;
    },
    goUrl(path) {
      this.navigatePageTo(this.router + path);
    },
    back() {
      wx.navigateBack();
    }
  }
};
</script>

<style lang="scss">
.add-address {
  .info {
    height: 53.5px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: #413838;
    font-size: 14px;
    font-family: PingFangSC-Medium, sans-serif;
    .info-title {
      padding-left: 16px;
      width: 75px;
    }
    .express-box {
      width: 80%;
      height: 35px;
      .picker-select {
        height: 100%;
        width: 100%;
        .picker {
          height: 35px;
          width: 100%;
          line-height: 35px;
        }
        .please-select {
          color: #999;
        }
      }
    }
    .info-input {
      width: 253px;
      padding-right: 10px;
    }
    .address {
      width: 253px;
      padding-right: 10px;
      display: inline-block;
    }
    .input-style {
      color: #999999;
      z-index: 600;
    }
    .jiantou-svg {
      // margin-right: 13px;
      color: #f05b47;
      font-size: 9px;
      font-weight: 700;
    }
  }
  .detail-address {
    min-height: 48px;
    height: auto;
    padding-top: 20px;
    align-items: flex-start;
    .info-area {
      margin-top: 3px;
      line-height: 24px;
      height: 48px;
      width: 203px;
      padding-right: 60px;
      z-index: 0;
    }
  }
  .add-sure {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #f05b47;
    text-align: center;
    height: 49px;
    line-height: 49px;
    color: #fff;
    font-size: 18px;
    font-family: PingFangSC-Medium, sans-serif;
  }
}
</style>
