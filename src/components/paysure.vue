<template>
  <div class="toast-box pay-sure">
    <div v-if='payShow' @click='closePayModal' class="mask"></div>
    <div :animation="payAnimationData" class="modal pay-modal">
      <div class="modal-content pay-sure">
        <div class="pay-money bg-w  m-b-10 boxshadow">
          <span class="title">支付金额:</span>
          <span>￥{{totalPrice}}</span>
        </div>
        <div class="pay-way bg-w boxshadow">
          <div class="pay-info">
            <i class="xx-icon icon-iconfont-weixin1 pay-svg fl"></i>
            <span class="pay-name fr">微信支付</span>
          </div>
          <radio class="payway-radio" :checked="true" />
        </div>
        <div class="pay-btn" @click="wxpay">去支付</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getData, merchantInfoId } from "@/common/common";
export default {
  props: {
    totalPrice: {
      type: Number,
      default: null,
      url: ""
    },
    canClose: {
      //默认是在弹框后不能关闭
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      payShow: false,
      payAnimation: null,
      payAnimationData: {},
      data: {},
      flag: true
    };
  },
  onLoad() {
    this.payAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    });
  },
  methods: {
    openPayModal() {
      this.payShow = true;
      this.payAnimation.bottom("0rpx").step();
      this.payAnimationData = this.payAnimation.export();
    },
    closePayModal() {
      console.log(this.canClose);

      if (this.canClose) {
        this.payShow = false;
        this.payAnimation.bottom("-335rpx").step();
        this.payAnimationData = this.payAnimation.export();
      }
    },
    justClosePayModal() {
      this.payShow = false;
      this.payAnimation.bottom("-335rpx").step();
      this.payAnimationData = this.payAnimation.export();
    },
    wxpay() {
      //微信支付
      let _this = this;

      if (this.canClose) {
      }
      // this.flag = false;
      getData(this.api.main.pay.goPay, this.data).then(res => {
        if (res.payLink == false) {
          wx.navigateTo({
            url:
              "/pages/paymentSuccess/main?orderId=" +
              this.data.payOrderNo +
              "&from=pay"
          });
          return;
        }
        let payData = JSON.parse(res.data);
        // 唤醒微信支付
        wx.requestPayment({
          timeStamp: payData.timestamp,
          nonceStr: payData.noncestr,
          package: payData.packagestr,
          signType: payData.signtype,
          paySign: payData.paysign,
          success: function(res) {
            _this.closePayModal();
            wx.showToast({
              title: "支付成功!",
              icon: "none",
              duration: 1500,
              success: function() {
                setTimeout(() => {
                  _this.navigatePageTo(
                    _this.router +
                      "pages/paymentSuccess/main?orderId=" +
                      _this.data.payOrderNo
                  );
                }, 1500);
              }
            });
          },
          fail: function(res) {}
        });
      });
    },
    test() {}
  }
};
</script>
<style scoped lang='scss'>
.pay-sure {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
  }
  .modal {
    position: relative;
    height: 250px;
    position: fixed;
    left: 0;
    bottom: -100%;
    width: 100%;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    background: #fff;
    // padding-top: 20px;
    z-index: 1100;
    .modal-head {
      margin-top: 14px;
      padding: 0 15px 0 15px;
      .goods-info {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .goods-img {
          height: 50px;
          width: 50px;
        }
        .price-spec {
          width: 243px;
          margin-left: 17px;
          overflow: hidden;
          .price-info {
            margin-bottom: 5px;
            color: #fc4150;
            font-family: PingFangSC-Semibold, sans-serif;
            .price {
              font-size: 18px;
            }
            .unit {
              font-size: 12px;
            }
          }
          .spec {
            font-size: 12px;
            color: #999999;
            font-family: PingFangSC-Medium, sans-serif;
            .text {
              padding-right: 10px;
            }
          }
        }
      }
      .close {
        font-size: 16.5px;
        color: #b2b2b2;
        padding: 7.5px;
      }
    }
    .modal-content {
      // height: 345px;
      overflow-y: scroll;
      .address-list {
        .address-item {
          padding: 10px 15px;
          font-size: 16px;
          color: #413838;
          font-family: PingFangSC-Medium, sans-serif;
          .address {
            margin-left: 7px;
          }
          .select-btn {
            background: #19a0f0;
            color: #fff;
            padding: 3px 5px;
            border-radius: 2px;
          }
        }
      }
    }
    .pay-sure {
      background: transparent;
      .pay-money {
        height: 55px;
        line-height: 55px;
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Medium, sans-serif;

        color: #fc4150;
        .title {
          color: #020403;
          margin-right: 10px;
        }
      }
      .pay-way {
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 55px;
        .pay-info {
          height: 55px;
          line-height: 55px;
          .pay-svg {
            color: #1aad19;
            font-size: 30px;
            margin-right: 10px;
          }
          .pay-name {
            font-size: 14px;
            font-family: PingFangSC-Medium, sans-serif;
            color: #020403;
          }
        }
        .payway-radio {
          color: #1aad19;
          transform: scale(0.7);
        }
      }
      .pay-btn {
        height: 49px;
        line-height: 49px;
        background: #1aad19;
        color: #fff;
        text-align: center;
      }
    }
  }
  .modal.pay-modal {
    background: #f7f7f7;
    height: 167.5px;
  }
}
</style>
