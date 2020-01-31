<template>
  <div class="order-list">
    <navbar title='我的拼团'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <div class='state-ul bg-w boxshadow m-b-10'>
        <div class="state-li" :class='{active:activestate=="all"}' @click="select('all',0)">
          <div class="state-title">全部拼团</div>
        </div>
        <div class="state-li" :class='{active:activestate=="waitgroup"}' @click="select('waitgroup',1)">
          <div class="state-title">待成团</div>
        </div>
        <div class="state-li" :class='{active:activestate=="overgroup"}' @click="select('overgroup',2)">
          <div class="state-title">已成团</div>
        </div>
        <div class="state-li" :class='{active:activestate=="failgroup"}' @click="select('failgroup',3)">
          <div class="state-title">拼团失败</div>
        </div>
      </div>
      <swiper @change='switchTab' :style='{height:swiperHeight+"px"}' class="state-content" :current='currentindex'>
        <swiper-item v-for="(item,index) in listData" :key='index'>
          <scroll-view scroll-y class="content-item">
            <div class="item-ul">

              <div class="waitpay m-b-10 boxshadow bg-w">
                <div class="waitpay-info">
                  <img class="img" src="http://statics.lotsmall.cn/wx/img/group-img.png" alt="">
                  <div class="info">
                    <div class="two-line info-text">
                      武警号冲天武装直升飞机武装侦察特警武警号冲天武装直升飞机武工队春日升飞机武工队春日升飞机武工队春日
                    </div>
                    <div class="spec-price clearfix">
                      <div class="group-price fl">
                        <span class="money-sign">¥</span>
                        <span class="money-num">66.00</span>
                      </div>
                      <div class="group-status fr">
                        拼团成功
                      </div>
                    </div>
                    <div class="spec-list">
                      <span class="spec-item">两人团</span>
                    </div>
                    <div class="group-todo">
                      <span class="order-detail" @click="goUrl('pages/member/order/detail/main')">
                        查看订单
                      </span>
                      <span class="group-detail" @click="goUrl('pages/member/group/detail/main')">
                        拼团详情
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="waitpay m-b-10 boxshadow bg-w">
                <div class="waitpay-info">
                  <img class="img" src="http://statics.lotsmall.cn/wx/img/group-img.png" alt="">
                  <div class="info">
                    <div class="two-line info-text">
                      武警号冲天武装直升飞机武装侦察特警武警号冲天武装直升飞机武工队春日升飞机武工队春日升飞机武工队春日
                    </div>
                    <div class="spec-price clearfix">
                      <div class="group-price fl">
                        <span class="money-sign">¥</span>
                        <span class="money-num">66.00</span>
                      </div>
                      <div class="group-status fr">
                        拼团成功
                      </div>
                    </div>
                    <div class="spec-list">
                      <span class="spec-item">两人团</span>
                    </div>
                    <div class="group-todo">
                      <span class="order-detail" @click="goUrl('pages/member/order/detail/main')">
                        查看订单
                      </span>
                      <span class="group-detail" @click="goUrl('pages/member/group/detail/main')">
                        拼团详情
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </scroll-view>
        </swiper-item>
      </swiper>
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
    return {
      activestate: "all",
      listData: [1, 2, 3, 4],
      currentindex: 0,
      swiperHeight: null
    };
  },
  created() {
    var res = wx.getSystemInfoSync();
    this.swiperHeight = res.windowHeight - 39;
  },
  methods: {
    switchTab(e) {
      // console.log(e.mp.detail.current)
      this.currentindex = e.mp.detail.current;
      if (e.mp.detail.current == 0) {
        this.activestate = "all";
      } else if (e.mp.detail.current == 1) {
        this.activestate = "waitgroup";
      } else if (e.mp.detail.current == 2) {
        this.activestate = "overgroup";
      } else if (e.mp.detail.current == 3) {
        this.activestate = "failgroup";
      }
    },
    select(state, index) {
      this.activestate = state;
      this.currentindex = index;
    },
    gotoGame(path) {
      this.reLaunchPageTo(this.router + path);
    },
    increment() {
      this.$store.commit("increment");
    },
    decrement() {
      this.$store.commit("decrement");
    },
    goUrl(path) {
      this.navigatePageTo(this.router + path);
    },
    goreLaunch(path) {
      this.reLaunchPageTo(this.router + path);
    }
  }
};
</script>

<style lang="scss">
.order-list {
  .state-ul {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    color: #5c5c5c;
    font-family: PingFangSC-Medium, sans-serif;
    .state-li {
      .state-title {
        padding: 10px 6px;
      }
    }
    .state-li.active {
      color: #f05b47;
      position: relative;
    }
    .state-li.active::after {
      content: "";
      display: block;
      height: 2px;
      width: 100%;
      background: #f05b47;
      position: absolute;
      bottom: 0;
      border-radius: 1px;
    }
  }
  .state-content {
    height: 100%;
    .content-item {
      height: 100%;
      .item-ul {
        .waitpay {
          padding: 0 15px;
          height: 160.5px;
          padding-top: 20px;
          padding-bottom: 14px;
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
                height: 22px;
                line-height: 22px;
                overflow: hidden;
                .group-price {
                  .money-sign {
                    color: #fc4150;
                    font-size: 12px;
                  }
                  .money-num {
                    color: #fc4150;
                    font-size: 18px;
                    margin-left: 2px;
                  }
                }
                .group-status {
                  color: #fc4150;
                  font-size: 12px;
                }
              }
              .spec-list {
                height: 12.5px;
                line-height: 12.5px;
                .spec-item {
                  font-size: 11px;
                  color: #999999;
                  font-family: PingFangSC-Medium, sans-serif;
                  margin-right: 12px;
                }
              }
              .group-todo {
                text-align: right;
                margin-top: 8px;
                .order-detail,
                .group-detail {
                  font-size: 12px;
                  color: #f05b47;
                  margin-left: 15px;
                  border: 1px solid #f05b47;
                  height: 25px;
                  line-height: 25px;
                  padding: 0 8px;
                  display: inline-block;
                  vertical-align: middle;
                  border-radius: 2px;
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
                background: #f05b47;
                color: #fff;
                text-align: center;
                height: 25.5px;
                line-height: 25.5px;
                padding: 0 9px;
                border-radius: 2px;
                font-size: 12px;
                font-family: PingFangSC-Medium, sans-serif;
              }
            }
          }
        }
        //全部订单
        .item-li {
          height: 108px;
          padding: 0 15px;
          padding-top: 20px;
          .img {
            padding-bottom: 20px;
            display: flex;
            justify-content: space-between;
            .item-img-box {
              display: flex;
              align-items: center;
              .state-img {
                margin-right: 8px;
                height: 25px;
                width: 25px;
                border-radius: 50%;
              }
              .title {
                font-size: 14px;
                color: #413838;
                font-family: PingFangSC-Medium, sans-serif;
              }
            }
            .item-text {
              font-size: 14px;
              color: #f05b47;
              font-family: PingFangSC-Medium, sans-serif;
            }
            .item-text.close {
              color: #413838;
            }
          }
          .name-price {
            padding-bottom: 8px;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            .name {
              color: #413838;
              font-family: PingFangSC-Semibold, sans-serif;
              font-weight: 500;
            }
            .price {
              color: #5c5c5c;
              font-family: PingFangSC-Medium, sans-serif;
            }
          }
          .use-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .time {
              font-size: 12px;
              color: #5c5c5c;
              font-family: PingFangSC-Medium, sans-serif;
              .text {
                margin-right: 7px;
              }
            }
            .num-detail {
              display: flex;
              align-items: center;
              .num {
                font-size: 14px;
                color: #5c5c5c;
                font-family: PingFangSC-Medium, sans-serif;
              }
              .detail-look {
                font-size: 12px;
                color: #f16c5a;
                font-family: PingFangSC-Medium, sans-serif;
                height: 25.5px;
                border: 0.5px solid #f16c5a;
                border-radius: 2px;
                line-height: 25.5px;
                padding: 0 8px;
                margin-left: 24px;
              }
              .detail-look.close {
                color: #5c5c5c;
                border-color: #5c5c5c;
              }
            }
          }
        }
      }
    }
  }
}
</style>
