<template>
    <div class="coupon-warper">
        <div :animation="couponAnimationData" class="coupon-modal">
            <div class="modal-content">
                <div class="couponBody" :style="{'top':(navContentHeight+navBarHeight+'px')}">
                    <div class="couponBodyTab">
                        <div class="couponList inner coupons_list">
                            <div v-if="couponList.length" class="item-ul">
                                <div v-for="(item, index) in couponList" :key="index" class="item-li boxshadow">
                                    <div class="left">
                                        <div class="name">{{item.name}}</div>
                                        <div class="price">
                                            <span class="unit">￥</span>
                                            <span class="num">{{item.amount}}</span>
                                        </div>

                                    </div>
                                    <div class="date-use">
                                        <div class="date">
                                            <span class="title">可用时间：</span>
                                            <span class="text" v-if="item.validityDateType=='relative'">领取后{{item.relativeDay}}天失效</span>
                                            <span v-else class="text">{{item.validStartDate}} 至 {{item.validEndDate}}</span>
                                        </div>
                                        <div class="use">
                                            <p v-if="item.useThreshold=='F'">
                                                使用条件：无限制
                                            </p>
                                            <p v-else>
                                                使用条件：满{{item.targetAmout}}元可用
                                            </p>
                                        </div>
                                    </div>
                                    <div class="right fr">
                                        <span class="right-btn" @click="useCoupon(item)">立即使用</span>
                                    </div>
                                </div>

                            </div>
                            <div v-else class="noData">
                                <span class="nodata-text">暂无信息</span>
                            </div>
                            <div class="btn-warper">
                                <span v-if="couponList.length>0" class="btn cancle-coupon-choice" @click="dontuse">不使用优惠券</span>
                                <span class="btn cancle-coupon-choice back" @click="closeCouponModal">返回</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      couponShow: false,
      couponAnimation: null,
      couponAnimationData: {},
      canScroll: true,
      couponList: []
    };
  },
  onLoad() {
    //优惠券动画
    this.couponAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    });
  },
  methods: {
    //优惠券弹框
    openCouponModal() {
      this.canScroll = true;
      this.couponShow = true;
      this.handlecToggle(0);
    },
    closeCouponModal() {
      //关闭优惠券
      this.canScroll = false;
      this.couponShow = false;
      this.handlecToggle(-375);
    },
    handlecToggle(num) {
      this.couponAnimation.right(num * 2 + "rpx").step();
      this.couponAnimationData = this.couponAnimation.export();
    },
    useCoupon(item) {
      // console.log(item)
      this.$emit("useCoupon", item);
      this.closeCouponModal();
    },
    dontuse() {
      //不使用
      this.$emit("dontuse");
      this.closeCouponModal();
    }
  }
};
</script>
<style lang='scss'>
.coupon-warper {
  .coupon-modal {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 710;
    overflow-y: scroll;
    .modal-content {
      .couponBody {
        position: absolute;
        // top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f7f7f7;
        // padding-top: 12px;
        .couponBodyTab {
          // padding-bottom: 96px;
          height: 100%;
        }
        .coupons_list {
          height: 100%;
          overflow: auto;
          .item-ul {
            padding: 0 8px;
            padding-bottom: 98px;
            .item-li {
              margin-bottom: 20px;
              height: 144px;
              background: url("http://statics.lotsmall.cn/wx/img/coupons-bg.png")
                center center no-repeat;
              background-size: 100%;
              position: relative;
              .left {
                display: inline-block;
                width: 273px;
                .name {
                  margin-top: 7px;
                  color: #fff;
                  font-size: 14px;
                  font-family: PingFangSC-Regular, sans-serif;
                  padding-left: 14px;
                }
                .price {
                  padding-left: 40px;
                  color: #fff;
                  margin-top: 6px;
                  margin-bottom: 9px;
                  font-family: PingFangSC-Regular, sans-serif;
                  .unit {
                    font-size: 18px;
                  }
                  .num {
                    font-size: 35px;
                  }
                }
              }
              .date-use {
                position: absolute;
                left: 15px;
                bottom: 5px;
                font-size: 9px;
                color: #fff;
                font-family: PingFangSC-Regular, sans-serif;
                .date {
                  margin-bottom: 2.5px;
                }
                .use {
                  margin-bottom: 5px;
                }
              }
              .right {
                height: 103px;
                display: inline-block;
                width: calc(100% - 273px);
                text-align: center;
                position: relative;
                .right-btn {
                  border: none;
                  width: 66px;
                  height: 25px;
                  line-height: 25px;
                  border-radius: 2px;
                  background: #fff;
                  font-size: 14px;
                  color: #f05b47;
                  font-family: PingFangSC-Regular, sans-serif;
                  margin-top: 44px;
                  display: block;
                }
              }
            }
          }
          .btn-warper {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            .btn {
              display: block;
              background: #fff;
              color: #413838;
              height: 49px;
              line-height: 49px;
              text-align: center;
              font-size: 16px;
            }
            .back {
             border-top: 1px solid #eeeee7;
            }
          }
        }
      }
    }
  }
}
</style>
