<template>
  <div class="scenic-warper">
    <!-- <search ref='search' @getData='search'></search> -->
    <navbar title='酒店列表'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <div @click="showCalendar" class="hotel-date clearfix">
        <div class="date-box ">
          <span class="date-label">入住</span>
          <span class="date-text">{{beginDate}}</span>
          <i class="xx-icon icon-rili"></i>
        </div>
        <div class="date-box">
          <span class="date-label">离店</span>
          <span class="date-text">{{endDate}}</span>
          <i class="xx-icon icon-rili"></i>
        </div>
      </div>

      <div v-if="show" class="mask" @click="hideCalendar"></div>
      <div :animation="animationData" class="calendar-box">
        <calendar @select="select" ref='leave' :range="range" :lunar="lunar" :begin="begin"></calendar>
      </div>
      <template v-if='listData.length'>
        <div class="scenic-list">
          <div v-for='(item,index) in listData' :key='index' @click="goUrl('pages/hotel/detail/main?id='+item.id+'&productCode='+item.productCode+'&endDate='+endDate+'&beginDate='+beginDate)" class="scenic-item shadow-bottom">
            <img class="scenic-img" :src="item.linkMobileImg" alt="">
            <div class="scenic-info">
              <div class="name-add">
                <div class="scenic-title">{{item.nickName}}</div>
                <div class="scenic-distance clearfix">
                  <!-- <i class="xx-icon icon-shouhuodizhi distance-icon fl"></i> -->
                  <span class="fl">{{item.areaName}}</span>
                  <span v-if="item.hotelLevel&&item.hotelLevel!=0" class="hotel-star"> {{item.hotelLevel}}星</span>
                </div>
                <div class="hotel-labels">
                  <div class="hotel-label" v-for="(ite, ind) in item.labels" :key="ind">
                    <span class="label-icon">&#10003;</span>
                    <span class="label-text">{{ite}}</span>
                  </div>
                </div>
              </div>
              <div class="price-info">
                <div v-if="item.fictSaleNum!=0" class="buy-num">{{item.fictSaleNum}} 人已购买</div>
                <div class='start-price'>
                  <span class="unit">￥</span>
                  <span class="price">{{item.extendsParamOne}}</span>
                  <span class="text">起</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-text">
          <span v-if='loading'>加载中...</span>
          <span v-else>已加载完成</span>
        </div>
      </template>
      <template v-else>
        <div class="no-data">暂无数据</div>
      </template>

    </div>
  </div>
</template>

<script>
import { getData, postData, merchantInfoId } from "@/common/common";
import search from "@/components/search";
import calendar from "@/components/calendar";
import api from "@/api/api";
import navbar from "@/components/navbar";
export default {
  components: {
    search,
    calendar,
    navbar
  },
  data() {
    return {
      logs: [],
      loading: false,
      keyword: "",
      listData: [],
      currPage: 1,
      pageSize: "10",
      wayType: 1,
      canpulldown: true,
      totalPage: null,
      keyword: "",
      openOff: true,
      beginDate: this.GetDateStr(0),
      endDate: this.GetDateStr(1),
      val: [],
      val2: [],
      range: true,
      lunar: true,
      animation: null,
      animationData: {},
      show: false,
      begin: this.GetbDate()
    };
  },
  methods: {
    goUrl(path) {
      this.$refs.leave.rangeBegin = [];
      this.$refs.leave.rangeEnd = [];
      this.$refs.leave.init();
      this.navigatePageTo(this.router + path);
    },
    search(keyword) {
      this.currPage = 1;
      this.keyword = keyword;
      this.listData = [];
      this.pulldownLoading();
    },
    gotoGame(path) {
      this.reLaunchPageTo(this.router + path);
    },
    pulldownLoading(para) {
      let _this = this;
      let url = api.hotel.list.pagelist;
      _this.loading = true;
      getData(
        url,
        {
          corporateType: 'SC',
          wayType: _this.wayType,
          pageSize: _this.pageSize,
          currPage: _this.currPage,
          merchantInfoId: merchantInfoId,
          modelName: _this.keyword,
          beginDate: _this.beginDate,
          endDate: _this.endDate
        },
        false
      ).then(res => {
        res.data.rows.map(item=>{
          item.labels = item.labels?JSON.parse(item.labels):[];
        })
        if (para == 1) {
          _this.listData = res.data.rows;
        } else {
          _this.listData = _this.listData.concat(res.data.rows);
        }
        // _this.listData = _this.listData.concat(res.data.rows);
        _this.totalPage = res.data.pages;
        _this.loading = false;
      });
    },
    //获取当前日期格式yyyy-mm-dd
    GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var mm = m < 10 ? "0" + m : m;
      var d = dd.getDate();
      var dd = d < 10 ? "0" + d : d;
      return y + "-" + mm + "-" + dd;
    },
    //获取当前日期格式[yyyy,mm,dd]
    GetbDate() {
      var dd = new Date();
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var d = dd.getDate();
      return [y, m, d];
    },
    //日历选择
    showCalendar() {
      this.show = true;
      this.handleToggle(69);
    },
    hideCalendar() {
      this.show = false;
      this.handleToggle(-500);
    },
    handleToggle(num) {
      this.animation.top(num * 2 + "rpx").step();
      this.animationData = this.animation.export();
    },
    select(val, val2, mpvc) {
      console.log("准备发起请求！");
      this.beginDate = this.processingDate(val);
      this.endDate = this.processingDate(val2);
      wx.setStorageSync("selectBegin", this.processingDate(val));
      wx.setStorageSync("selectEnd", this.processingDate(val2));
      this.pulldownLoading(1);
      this.hideCalendar();
    },
    processingDate(obj) {
      let month = obj[1] + 1,
        day = obj[2];
      return (
        obj[0] +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (day < 10 ? "0" + day : day)
      );
    }
  },
  onReachBottom() {
    let _this = this;
    _this.currPage = _this.currPage + 1;
    if (_this.currPage <= _this.totalPage) {
      this.pulldownLoading();
    }
  },
  onLoad() {
    //弹框动画
    let _this = this;
    _this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    });
    wx.showShareMenu({
      withShareTicket: true
    })
    // _this.beginDate = _this.GetDateStr(0);
    // _this.endDate = _this.GetDateStr(1);
    // if (_this.$root.$mp.query.name && _this.$root.$mp.query.name != "") {
    //   _this.openOff = false;
    //   _this.currPage = 1;
    //   _this.keyword = _this.$root.$mp.query.name;
    //   _this.listData = [];
    //   _this.pulldownLoading();
    // } else {
    //   if (_this.openOff) {
    //     _this.openOff = false;
    //     _this.pulldownLoading();
    //   }
    // }
  },
  onUnload() {
    this.openOff = true;
    this.listData = [];
    this.keyword = "";
    this.currPage = 1;
    this.hideCalendar();
    wx.removeStorageSync("selectBegin");
    wx.removeStorageSync("selectEnd");
    this.$refs.leave.rangeBegin = [];
    this.$refs.leave.rangeEnd = [];
    this.$refs.leave.init();
  },
  onShow() {
    // if (this.openOff) {
    //   this.openOff = false;
    //   this.pulldownLoading();
    // }
    this.hideCalendar();
    this.beginDate = this.GetDateStr(0);
    this.endDate = this.GetDateStr(1);
    // this.listData = [];
    // this.pulldownLoading(1);
    // this.select(this.beginDate,this.endDate,0);
    if (this.$root.$mp.query.name && this.$root.$mp.query.name != "") {
      this.openOff = false;
      this.currPage = 1;
      this.keyword = _this.$root.$mp.query.name;
      this.listData = [];
      this.pulldownLoading();
    } else {
      this.pulldownLoading(1);
    }
  }
};
</script>

<style lang="scss">
.scenic-warper {
  .no-data {
    font-size: 18px;
    color: #999;
    padding-top: 40%;
    text-align: center;
  }
  .scenic-list {
    text-indent: 5rpx;
    .scenic-item {
      background: #fff;
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
      .scenic-img {
        height: 100px;
        width: 156px;
      }
      .scenic-info {
        // box-sizing: content-box;
        // display: inline-block;
        width: 195px;
        min-height: 92px;
        padding: 4px 12px 0px;
        .hotel-labels {
          .hotel-label {
            display: inline-block;
            vertical-align: top;
            line-height: 16px;
            .label-icon {
              color: #42cd18;
              border: 0.5px solid #42cd18;
              border-radius: 50%;
              font-size: 8px;
              text-align: center;
              vertical-align: middle;
              display: inline-block;
              width: 15px;
              height: 15px;
              line-height: 16px;
            }
            .label-text {
              font-size: 10px;
              display: inline-block;
              vertical-align: middle;
              margin-right: 10px;
              color: #999;
              margin-left: 4px;
            }
          }
        }
        .name-add {
          min-height: 68px;
          overflow: hidden;
          .scenic-title {
            padding-right: 12px;
            color: #413838;
            font-family: PingFangSC-Medium, sans-serif;
            font-size: 16px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .scenic-distance {
            font-size: 10px;
            color: #f05b47;
            font-family: PingFangSC-Regular, sans-serif;
            padding-top: 3px;
            padding-bottom: 4px;
            .fl {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .distance-icon {
              display: inline;
            }
            .hotel-star {
            }
          }
        }

        .price-info {
          position: relative;
          .buy-num {
            color: #ababab;
            font-size: 10px;
            font-family: PingFangSC-Regular, sans-serif;
          }
          .start-price {
            position: absolute;
            color: #fc4150;
            right: 0;
            bottom: -2px;
            .unit {
              font-size: 12px;
              font-family: PingFangSC-Semibold, sans-serif;
            }
            .price {
              font-size: 18px;
              font-family: PingFangSC-Semibold, sans-serif;
              padding-right: 4px;
            }
            .text {
              font-size: 10px;
              color: #ababab;
              font-family: PingFangSC-Regular, sans-serif;
            }
          }
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 700;
  }
  .calendar-box {
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 710;
  }
  .hotel-date {
    height: 54px;
    .date-box {
      width: 173px;
      height: 34px;
      line-height: 34px;
      margin-left: 10px;
      float: left;
      background-color: #fff;
      color: #413838;
      margin-top: 10px;
      .date-label {
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 12px;
      }
      .date-text {
        font-size: 13px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 12px;
      }
      .icon-rili {
        float: right;
        margin-top: 2px;
        display: inline-block;
        vertical-align: top;
        margin-right: 12px;
        color: #999;
        font-size: 17px;
      }
    }
  }

  .bottom-text {
    text-align: center;
    color: #acacac;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>
