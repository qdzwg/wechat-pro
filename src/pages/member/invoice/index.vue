<template>
  <div class="invoice-wrap">
    <navbar title="电子发票"></navbar>
    <div class="invoiceList" :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <!-- <button @click="goUrl('pages/member/invoice/invoicePay/main')">pay</button> -->
      <!-- <button @click="goUrl('pages/member/invoice/invoiceDetail/main')">detail</button> -->
      <div class="state-ul bg-w">
        <div class="state-li" :class="{active:currentindex=='0'}" @click="select('all',0)">
          <div class="state-title">未开票</div>
        </div>
        <div class="state-li" :class="{active:currentindex=='1'}" @click="select('success',1)">
          <div class="state-title">已开票</div>
        </div>
      </div>
      <swiper
        class="state-content"
        :current="currentindex"
        @change="switchTab"
        :style="{height:swiperHeight+'px'}"
      >
        <swiper-item>
          <scroll-view
            class="content-item"
            scroll-y
            style="height: 100%;"
            @scrolltolower="lower(0)"
          >
            <div v-if="listData[0].length" class="item-ul">
              <div class="item-box" v-for="(item,index) in listData[0] " :key="index">
                <div class="item-l">
                  <div class="item-li pay-no">支付订单号：{{item.payOrderNo}}</div>
                  <div
                    v-for="(ele,i) in item.infoList"
                    :key="i"
                    class="item-li"
                  >消费明细：{{ele.orderInfo}} ×{{ele.num}}</div>
                  <div class="item-li">消费时间：{{item.payTime}}</div>
                  <div class="item-li">订单总额：{{item.paySum}}</div>
                  <div class="item-li">可开总额：{{item.checkSum}}</div>
                </div>
                <div class="btn-pay item-r" @click="test(item)">开票</div>
              </div>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view
            class="content-item"
            scroll-y
            style="height: 100%;"
            @scrolltolower="lower(1)"
          >
            <div v-if="listData[1].length" class="item-ul">
              <div class="item-box" v-for="(item,index) in listData[1] " :key="index">
                <div class="item-l">
                  <div class="item-li">订单号：{{item.payOrderNo}}</div>
                  <div class="item-li">开票时间：{{item.invoiceTime}}</div>
                  <div class="item-li">开票状态：{{item.status}}</div>
                  <div class="item-li">开票金额：{{item.nontaxAmount}}元</div>
                </div>
                <div
                  class="btn-pay btn-detail item-r"
                  @click="goUrl('pages/member/invoice/invoiceDetail/main?payOrderNo=' + item.payOrderNo)"
                >查看详情</div>
              </div>
            </div>
            <div v-else class="no-data">暂无数据</div>
          </scroll-view>
        </swiper-item>
      </swiper>
      <div class="uesr-btn" @click="show=true">开票说明</div>
      <div v-if="show" class="invoice-info-mask" @click="show=false"></div>
      <div class="invoice-info" :class="{on:show}">
        <div class="box">
          <div class="title">开票说明</div>
          <span class="back" @click="show=false">
            <i class="xx-icon icon-guanbi2"></i>
          </span>
          <ul>
            <li>
              <div class="dot-bar">
                <i class="dot"></i>
              </div>
              <div>部分商品或不支持开具发票，如有特殊需求，请向商家客服咨询。</div>
            </li>
            <li>
              <div class="dot-bar">
                <i class="dot"></i>
              </div>
              <div>开票金额为用户实际支付的金额（不含订单内不支持开具发票的商品实付金额）</div>
            </li>
            <li>
              <div class="dot-bar">
                <i class="dot"></i>
              </div>
              <div>单笔支付订单只支持开具一种类型的发票且不可重复开（订单明细全部核销完成才可开票）</div>
            </li>
            <li>
              <div class="dot-bar">
                <i class="dot"></i>
              </div>
              <div>暂不支持补开纸质发票、增值税专用发票</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getData, postData, host, merchantInfoId } from "@/common/common.js";
import navbar from "@/components/navbar";
// import vueTabBar from "@/components/customCom/vueTabBar"; //底部导航
export default {
  components: {
    navbar
    // vueTabBar
  },
  onUnload() {
    this.show = false;
    this.currentindex = 0;
    this.listData = [[], []];
    this.pageLimt = [null, null];
    this.pageList = [1, 1];
  },
  onHide() {
    // this.show = false;
    // this.currentindex = 0;
    // this.listData = [[], []];
    // this.pageLimt = [null, null];
    this.show = false;
    this.currentindex = 0;
    this.listData = [[], []];
    this.pageLimt = [null, null];
    this.pageList = [1, 1];
  },
  data() {
    return {
      show: false,
      userInfo: {},
      currentindex: 0,
      listData: [[], []],
      pageList: [1, 1],
      pageLimt: [null, null],
      pullup: true,
      activestate: "",
      swiperHeight: null
    };
  },
  onLoad() {},
  onShow() {
    this.userInfo = wx.getStorageSync("WxXjscUserInfo");
    this.getList(0);
    this.getList(1);
    var res = wx.getSystemInfoSync();
    this.swiperHeight =
      res.windowHeight -
      40 -
      (this.navContentHeight + this.navBarHeight) -
      49.5;
  },
  methods: {
    test(item) {
      this.goUrl(
        "pages/member/invoice/invoicePay/main?payOrderNo=" + item.payOrderNo
      );
    },
    lower(index) {
      this.pageList[index]++;
      if (this.pageList[index] <= this.pageLimt[index]) {
        // console.log(this.pageList);
        this.getList(index);
      }
    },
    goUrl(path) {
      this.navigatePageTo(this.router + path);
    },
    getDetail(num) {
      this.$router.push("/invoiceDetail?payOrderNo=" + num);
    },
    switchTab(e) {
      console.log(e);
      let i = e.mp.detail.current;
      this.currentindex = i;
      // if (!this.listData[i].length) {
      //   this.getList(i);
      // }
    },
    select(state, index) {
      this.activestate = state;
      this.currentindex = index;
      // this.getList(index);
    },
    getBottom(index) {
      this.pageList[index]++;
      if (this.pageList[index] <= this.pageLimt[index]) {
        // console.log(this.pageList);
        this.getList(index);
      }
    },
    getList(index) {
      // console.log(this.userInfo);
      let _this = this;
      let url = "/marketing/api/marketElectronicInvoices/pageInvoiceReq";
      let data = {
        currPage: _this.pageList[index],
        pageSize: 6,
        membersId: this.userInfo.leaguerId,
        flag: index
      };
      getData(url, data).then(res => {
        _this.pageLimt[index] = res.data.pages;
        if (res.data.rows) {
          // this.listData[index] = this.listData[index].concat(res.data.rows);
          this.$set(
            this.listData,
            index,
            this.listData[index].concat(res.data.rows)
          );
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.invoice-wrap {
  .invoiceList {
    width: 100%;
    //  overflow: hidden;
    .state-ul {
      display: flex;
      justify-content: center;
      font-size: 15px;
      color: #5c5c5c;
      font-family: PingFangSC-Regular, sans-serif;
      background-color: #fff;
      .state-li {
        width: 163px;
        text-align: center;
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
        border-radius: 1px;
        width: 100%;
        background: #f05b47;
        position: absolute;
        bottom: 0;
        border-radius: 1px;
      }
    }
    .state-content {
      .content-item {
        height: 100%;
        touch-action: none;
        .no-data {
          font-size: 14px;
          text-align: center;
          color: #413838;
          font-family: PingFangSC-Regular, sans-serif;
          padding: 25px 0;
        }
        .item-ul {
          .item-box {
            background-color: #fff;
            padding: 20px 15px;
            font-size: 12px;
            margin: 10px 0;
            color: #5c5c5c;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .item-l {
              flex: 1;
            }
            .item-li {
              line-height: 30px;
              // overflow: hidden; /*超出部分隐藏*/
              // white-space: nowrap; /*不换行*/
              // text-overflow: ellipsis; /*超出部分文字以...显示*/
              &.pay-no {
                font-weight: 600;
                font-size: 13px;
              }
            }
            .btn-pay {
              width: 65px;
              text-align: center;
              line-height: 30px;
              height: 30px;
              font-size: 13px;
              border-radius: 2px;
              background-color: #f05b47;
              color: #fff;
            }
            .btn-detail {
              background-color: #fff;
              color: #f05b47;
              border: 1px solid #f05b47;
              top: 35%;
            }
          }
        }
      }
    }
    .uesr-btn {
      width: 100%;
      height: 49px;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      text-align: center;
      line-height: 49px;
      font-size: 16px;
      border-top: 0.5px solid #eee;
    }
    .box {
      background-color: #fff;
      .back {
        position: absolute;
        top: 5px;
        right: 20px;
        color: #5c5c5c;
        i {
          font-size: 25px;
        }
      }
      .title {
        font-size: 16px;
        text-align: center;
        line-height: 49px;
      }
      ul {
        li {
          padding: 10px;
          color: #5c5c5c;
          font-size: 12px;
          display: flex;
          span {
            flex: 1;
            padding-left: 8px;
          }
          .dot-bar {
            height: 16px;
            align-items: center;
            display: flex;
            width: 10px;
            .dot {
              display: inline-block;
              width: 4px;
              height: 4px;
              border-radius: 2px;
              background: #413838;
            }
          }
        }
      }
    }
  }
  .invoice-info-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .invoice-info {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: -350px;
    transition: all 0.5s;
    &.on {
      bottom: 0;
    }
  }
}
</style>


