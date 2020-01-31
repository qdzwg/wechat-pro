<template>
  <div class="receiveCoupon">
    <navbar title='领取优惠券'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <template v-if='listData.length>0'>
        <div class="item-ul">
          <div class="item-li boxshadow" v-for="(item,index) in listData" :key="index" style="background: url('http://statics.lotsmall.cn/wx/img/coupons-bg.png') no-repeat;background-size: contain;">
            <div class="left fl">
              <div class="name">{{item.name}}</div>
              <div class="price">
                <span class="unit">￥</span>
                <span class="num">{{item.amount}}</span>
              </div>
            </div>
            <div class="right fr">
              <span class="right-btn" @click="getCoupon(item.code)">立即领取</span>
            </div>
            <div class="date-use clearfix">
              <div class="date">
                <span class="title">有效期：</span>
                <span class="text" v-if="item.validityDateType=='relative'">领取后{{item.relativeDay}}天失效</span>
                <span v-else class="text">{{item.validStartDate}} 至 {{item.validEndDate}}</span>
              </div>
              <div class="use">
                <span class="title">使用条件：</span>
                <span v-if="item.useThreshold=='F'" class="text">无限制</span>
                <span v-else class="text">满{{item.targetAmout}}元可用</span>

              </div>
            </div>
          </div>

        </div>
      </template>
      <template v-else>
        <div class="no-data">暂无可领取优惠券</div>
      </template>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import { getData, postData, merchantInfoId } from "@/common/common";
import navbar from "@/components/navbar";
export default {
  components: {
    navbar
  },
  data() {
    return {
      activestate: "all",
      listData: [],
      currentindex: 0,
      swiperHeight: null,
      currPage: 1,
      totalPage: 0,
      flag: true
    };
  },
  created() {
    var res = wx.getSystemInfoSync();
    this.swiperHeight = res.windowHeight - 39;
  },
  onShow() {
    if (this.flag) {
      this.currPage = 1;
      this.getList();
      this.flag = false;
    }
  },
  onUnload() {
    this.flag = true;
    this.listData = [];
  },
  onReachBottom() {
    let _this = this;
    _this.currPage = _this.currPage + 1;
    if (_this.currPage <= _this.totalPage) {
      this.getList();
    }
  },
  methods: {
    //   点击领取
    getCoupon(code) {
      getData(this.api.main.marketing.getCoupon, {
        userId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
        couponCode: code,
        merchantInfoId: merchantInfoId
      }).then(res => {
        if (res.status == 200) {
          this.navigatePageTo(this.router + "pages/member/youhuiquan/main");
        } else {
          wx.showToast({
            title: res.message,
            icon: "none",
            duration: 2000
          });
        }
      });
    },

    gotoGame(path) {
      this.reLaunchPageTo(this.router + path);
    },
    getList() {
      getData(this.api.main.marketing.couponsList, {
        merchantInfoId: merchantInfoId,
        currPage: this.currPage,
        pageSize: 10
      }).then(res => {
        if (res.status == 200) {
          this.totalPage = res.data.pages;
          this.listData = this.listData.concat(res.data.rows);
          res.data.rows.forEach(ele => {
            // ele.validStartDate = ele.validStartDate.substr(0, 10);
            // ele.validEndDate = ele.validEndDate.substr(0, 10);
            ele.amount = ele.amount >= 1 ? ele.amount.toFixed(2) : ele.amount;
          });
        } else {
          wx.showToast({
            title: res.message,
            icon: "none",
            duration: 2000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.receiveCoupon {
  width: 100%;
  height: 100%;
  .no-data{
      padding-top:10px;
      text-align: center;
      font-size: 14px;
      color:#999;
  }
  .item-ul {
    margin-top: 10px;
    padding: 0 13.5px;
    .item-li {
      margin-bottom: 20px;
      height: 139px;
      position: relative;
      .left {
        display: inline-block;
        width: 237px;
        .name {
          margin-top: 7px;
          color: #fff;
          font-size: 14px;
          font-family: PingFangSC-Medium, sans-serif;
          padding-left: 14px;
          overflow: hidden; //超出一行文字自动隐藏
          text-overflow: ellipsis; //文字隐藏后添加省略号
          white-space: nowrap; //强制不换行
        }
        .price {
          color: #fff;
          margin-top: 6px;
          margin-bottom: 9px;
          padding-left: 40px;
          font-family: PingFangSC-Semibold, sans-serif;
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
        font-family: PingFangSC-Semibold, sans-serif;
        .date {
          margin-bottom: 2.5px;
        }
        .use {
          margin-bottom: 5px;
        }
      }
      .right {
        margin-top: 44px;
        margin-right: 20px;
        text-align: center;
        .right-btn {
          border-radius: 2px;
          background: #fff;
          font-size: 14px;
          color: #f05b47;
          padding: 6px 9px;
          font-family: PingFangSC-Medium, sans-serif;
        }
      }
    }
  }
}
</style>
