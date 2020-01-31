<template>
    <div class="repast-warper">
        <navbar title='餐饮列表'></navbar>
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
            <search ref='search' :name="keyword" @getData='search'></search>
            <template v-if='listData.length||loading'>
                <div class="repast-list">
                    <div v-for='(item,index) in listData' :key='index' @click="goUrl('pages/repast/detail/main?id='+item.id+'&productCode='+item.productCode)" class="repast-item shadow-bottom">
                        <img class="repast-img" :src="item.linkMobileImg" alt="">
                        <div class="tab-content-item-info">
                            <div class="tab-content-title">
                                {{item.name}}
                            </div>
                            <div class="tab-tradingArea">{{item.tradingArea}}</div>
                            <div class="tab-card" v-if="item.labels" >
                                <span v-for="(ele,i) in item.labels" :key="i" class="card-skyblue" :class="'card'+i">{{ele}}</span>
                            </div>
                            <div class="tab-content-detail">
                                <div class="buy-price">
                                    <span class="des">人均：</span>
                                    <span class="unit">￥</span>
                                    <span class="price">{{item.priceShow}}</span>
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
import api from "@/api/api";
import navbar from "@/components/navbar";
export default {
  components: {
    search,
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
      openOff: true
    };
  },
  methods: {
    goUrl(path) {
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
    pulldownLoading() {
      let _this = this;
      let url = api.repast.list.pagelist;
      _this.loading = true;
      getData(
        url,
        {
          wayType: _this.wayType,
          pageSize: _this.pageSize,
          currPage: _this.currPage,
          merchantInfoId: merchantInfoId,
          modelName: _this.keyword
        },
        false
      ).then(res => {
        _this.listData = _this.listData.concat(res.data.rows);
        res.data.rows.map(item => {
            if(item.labels!=''){
            item.labels = item.labels.split(",");
            }
        });
        _this.totalPage = res.data.pages;
        _this.loading = false;
      });
    }
  },
  onReachBottom() {
    let _this = this;
    _this.currPage = _this.currPage + 1;
    if (_this.currPage <= _this.totalPage) {
      this.pulldownLoading();
    }
    console.log(_this.currPage);
  },
  onLoad() {
    if (this.$root.$mp.query.name && this.$root.$mp.query.name != "") {
      console.log(this.$root.$mp.query.name);
      this.openOff = false;
      this.currPage = 1;
      this.keyword = this.$root.$mp.query.name;
      this.listData = [];
      this.pulldownLoading();
    } else if (this.openOff) {
      this.pulldownLoading();
      this.openOff = false;
    }
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onUnload() {
    this.openOff = true;
    this.listData = [];
    this.$refs.search.keyword = "";
    this.keyword = "";
    this.currPage = 1;
  },
  onShow() {}
};
</script>

<style lang="scss">
.repast-warper {
  .no-data {
    font-size: 18px;
    color: #999;
    padding-top: 40%;
    text-align: center;
  }
  .repast-list {
    text-indent: 5rpx;
    .repast-item {
      background: #fff;
      display: flex;
      //   justify-content: space-around;
      margin-bottom: 10px;
      .tab-content-item-info {
        flex-grow: 1;
        padding-top: 8px;
        padding-left: 12px;
        padding-right: 9px;
        width: 198px;
        .icon-16 {
          display: inline-block;
          font-size: 16px;
        }
        .icon-10 {
          display: inline-block;
          font-size: 10px;
        }
        .tab-content-title {
          line-height: 20px;
          height: 40px;
          font-size: 16px;
          color: #413838;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .strategy-name {
          line-height: 20px;
          font-size: 16px;
          color: #413838;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        .tab-situation {
          margin-top: 6px;
          line-height: 15px;
          font-size: 10px;
        }
        .tab-describe {
          display: -webkit-box;
          color: #666;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          margin-top: 6px;
          line-height: 15px;
          font-size: 10px;
        }
        .tab-tradingArea {
          color: #999;
          font-size: 12px;
          padding-top: 5px;
          height:15px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap
        }
        .tab-card {
          line-height: 15px;
          margin-top: 10px;
          height: 15px;
          font-size: 10px;
          // display: inline-block;
          //  overflow:hidden;
          // text-overflow:ellipsis;
          // white-space:nowrap;
          .card-skyblue {
            // color: skyblue;
            padding: 1px 3px;
            text-align: center;
            margin-right: 3px;
            border-radius: 3px;
            box-sizing: border-box;
            // border: 1px solid skyblue;
          }
          .card0 {
            color: skyblue;
            border: 1px solid skyblue;
          }
          .card1 {
            color: orange;
            border: 1px solid orange;
          }
          .card2 {
            color: #5e99ff;
            border: 1px solid #5e99ff;
          }
          .card3 {
            color: #00aea8;
            border: 1px solid #00aea8;
          }
        }
        .p-t-5 {
          padding-top: 5px;
        }
        .p-t-8 {
          padding-top: 8px;
        }
        .m-t-5 {
          margin-top: 3px;
        }
        .tab-content-detail {
          .hadRead {
            float: right;
            color: #a3a8ab;
            font-size: 10px;
            margin-top: 7px;
            line-height: 10px;
          }
          .distance {
            margin-top: 5px;
            color: #f05b47;
            font-size: 10px;
            line-height: 10px;
          }
          .buy-price {
            float: right;
            color: #fc4150;
            .des {
              font-size: 10px;
              color: #413838;
            }
            .unit {
              font-size: 12px;
            }
            .price {
              font-size: 18px;
              line-height: 18px;
            }
            .text {
              font-size: 9px;
              color: #999999;
            }
          }
          .buy-num {
            line-height: 10px;
            font-size: 10px;
            color: #999999;
          }
        }
      }
      .repast-img {
        height: 100px;
        width: 156px;
      }
      .repast-info {
        // box-sizing: content-box;
        // display: inline-block;
        width: 195px;
        height: 79px;
        padding: 8px 12px 9px;
        .name-add {
          height: 68px;
          overflow: hidden;
          .repast-title {
            padding-right: 12px;
            color: #413838;
            font-family: PingFangSC-Medium, sans-serif;
            font-size: 16px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .repast-distance {
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
  .bottom-text {
    text-align: center;
    color: #acacac;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>
