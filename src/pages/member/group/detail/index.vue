<template>
    <div class="group-detail">
        <navbar title='查看拼团'></navbar>
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
            <div class="detail-nostatus bg-w boxshadow">
                <p class="detail-no">
                    <span class="no-title">订单编号：</span>
                    <span class="no-text">2018083013551564786130</span>
                </p>
                <p class="detail-status">
                    <span class="no-title status-title">订单状态：</span>
                    <span class="status-text">已完成</span>
                </p>
            </div>

            <!-- 默认地址 -->
            <div class="receiver-info boxshadow" @click="goUrl('pages/goods/address/main')">
                <div class="left">
                    <i class="xx-icon icon-shouhuodizhi address-svg"></i>
                    <div class="default-receiver">
                        <div class="name-tel">
                            <div class="name">
                                <span class="text">收货人:</span>
                                陈小帅陈小帅陈小
                            </div>
                            <div class="tel">
                                1888888888
                            </div>
                        </div>
                        <div class="address">地址:文三路199号阿萨达十大撒大所</div>
                    </div>
                </div>
            </div>

            <!---->
            <div class="waitpay m-b-10 boxshadow bg-w">
                <div class="waitpay-info">
                    <img class="img" src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg" alt="">
                    <div class="info">
                        <div class="two-line info-text">
                            武警号冲天武装直升飞机武装侦察特警武警号冲天武装直升飞机武装侦察特警
                            武警号冲天武装直升飞机武装侦察特警武警号冲天武装直升飞机武装侦察特警
                        </div>
                        <div class="spec-price clearfix">
                            <div class="spec-list fl">
                                <span class="spec-item">规格一</span>
                                <span class="spec-item">规格一</span>
                                <span class="spec-item">规格一</span>
                            </div>
                            <div class="price-info fr">
                                <div class="price">￥66.00</div>
                                <div class="num clearfix">
                                    <span class='fr'>111</span>
                                    <span class="unit fr">x</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pay">
                        <div class="pay-money">
                            <span class="text">商品金额:</span>
                            <span>￥66.00</span>
                        </div>
                        <div class="pay-btn" @click="goUrl('pages/member/group/refund/main')">
                            退款详情
                        </div>
                    </div>
                </div>
            </div>

            <!-- 订单总计 -->
            <div class="order boxshadow bg-w">
                <div class="clearfix item">
                    <span class="fl">邮费</span>
                    <div class="fr">
                        <span class="unit">￥</span>
                        <span class="price">104.00</span>
                    </div>
                </div>
                <div class="clearfix item">
                    <span class="fl">优惠金额</span>
                    <div class="fr">
                        <span class="unit">￥</span>
                        <span class="price">104.00</span>
                    </div>
                </div>
            </div>

            <!--实付金额-->
            <div class="pay-sum bg-w boxshadow m-b-10">
                <p class="total-sum">
                    <span class="sum-title">应付金额</span>
                    <span class="sum-text">¥66.00</span>
                </p>
                <p class="order-date">
                    <span class="date-title">下单日期：</span>
                    <span class="date-text">2018-08-30 14:39:20</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from "@/components/navbar";
export default {
  components: {
    navbar
  },
  data() {
    return {};
  },
  methods: {
    goUrl(path) {
      this.navigatePageTo(this.router + path);
    }
  }
};
</script>

<style lang="scss">
.group-detail {
  width: 100%;
  .detail-nostatus {
    padding: 15px;
    .detail-no {
      height: 20px;
      line-height: 20px;
      .no-title,
      .no-text {
        font-size: 12px;
        color: #413838;
      }
    }
    .detail-status {
      height: 20px;
      line-height: 20px;
      .no-title {
        font-size: 12px;
        color: #413838;
      }
      .status-text {
        color: #f05b47;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  .receiver-info {
    background: #fff;
    margin: 10px 0;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      // width: 340px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .address-svg {
        margin-left: 15px;
        margin-right: 9.5px;
        font-size: 20px;
        color: #413838;
        font-weight: 700;
      }
      .default-receiver {
        font-size: 13px;
        color: #413838;
        font-family: PingFangSC-Medium, sans-serif;
        width: 300px;
        .name-tel {
          display: flex;
          justify-content: space-between;
          .name {
            width: 190px;
            .text {
              margin-right: 11px;
            }
            .name-text {
              // width: 155px;
            }
          }
          .tel {
          }
        }
        .address {
          margin-top: 8px;
        }
      }
    }
  }
  .waitpay {
    padding: 0 15px;
    height: 160.5px;
    padding-top: 20px;
    .orderdate {
      margin-bottom: 18px;
      font-size: 12px;
      color: #413838;
      font-family: PingFangSC-Medium, sans-serif;
      .text {
        margin-right: 8px;
      }
    }
    .waitpay-info {
      .img {
        height: 80px;
        width: 80px;
        float: left;
      }
      .info {
        margin-left: 92px;
        .info-text {
          font-size: 14px;
          color: #413838;
          font-family: PingFangSC-Semibold, sans-serif;
          margin-bottom: 8px;
        }
        .spec-price {
          // display: flex;
          // justify-content: space-between;
          .spec-list {
            line-height: 9px;
            .spec-item {
              font-size: 11px;
              color: #999999;
              font-family: PingFangSC-Medium, sans-serif;
              margin-right: 12px;
            }
          }
          .price-info {
            color: #5c5c5c;
            font-family: PingFangSC-Medium, sans-serif;
            .price {
              font-size: 14px;
            }
            .num {
              font-size: 15px;
              .unit {
                font-size: 12px;
                margin-right: 6px;
                margin-top: 3px;
              }
            }
          }
        }
      }
      .pay {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .pay-money {
          font-size: 14px;
          color: #f05b47;
          font-family: PingFangSC-Semibold, sans-serif;
          .text {
            color: #413838;
            margin-right: 8px;
          }
        }
        .pay-btn {
          // background: #f05b47;
          border: 0.5px solid #f05b47;
          color: #f05b47;
          text-align: center;
          height: 32px;
          line-height: 32px;
          padding: 0 9px;
          border-radius: 2px;
          font-size: 14px;
          font-family: PingFangSC-Medium, sans-serif;
        }
      }
    }
  }
  .order {
    height: 47.5px;
    background: #fff;
    margin: 10px 0;
    padding: 20px 13px 20px 15px;
    font-size: 14px;
    font-family: PingFangSC-Medium, sans-serif;
    color: #413838;
    .item {
      margin-bottom: 10px;
      .fr {
        color: #999999;
        .unit {
          color: #f05b47;
          font-size: 14px;
        }
        .price {
          color: #f05b47;
          font-size: 14px;
        }
      }
    }
  }
  .pay-sum {
    width: 100%;
    height: 40px;
    padding: 17px 0;
    .total-sum {
      text-align: right;
      height: 20px;
      line-height: 20px;
      padding-right: 15px;
      .sum-title {
        font-size: 14px;
        color: #413838;
        margin-right: 20px;
      }
      .sum-text {
        font-size: 14px;
        color: #f05b47;
        font-weight: bold;
      }
    }
    .order-date {
      text-align: right;
      height: 20px;
      line-height: 20px;
      padding-right: 15px;
      .date-title {
        font-size: 12px;
        color: #413838;
      }
      .date-text {
        font-size: 12px;
        color: #413838;
      }
    }
  }
}
</style>


