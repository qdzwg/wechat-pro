<template>
  <div class="scenic-warper">
    <navbar title='攻略列表'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
    <search ref='search' :name="keyword" @getData='search'></search>
    <template v-if='listData.length||loading'>
      <div class="raiders-list">
        <div class="list-main">
          <div v-for="(item, index) in listData" :key="index" class="page-list-li">
            <div class="li-a" @click="goUrl(item.merchantStrategyId)">
              <div class="raiders-img">
                <img :src="item.picAddr" alt="">
              </div>
              <div class="raiders-info">
                <p class="raiders-title">{{item.name}}</p>
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
import wxParse from "@/components/htmlParse";
import navbar from "@/components/navbar";

export default {
  components: {
    wxParse,
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
      canpulldown: true,
      totalPage: null,
      keyword: "",
      openOff: true
    };
  },
  methods: {
    goUrl(id) {
      this.navigatePageTo(this.router + "pages/strategy/strategyDetail/main?id=" + id);
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
      _this.loading = true;
      postData(
        '/merchant/api/merchantStrategy/merchantStrategyGridNew',
        {
          pageSize: _this.pageSize,
          currPage: _this.currPage,
          merchantInfoId: merchantInfoId,
          modelName: _this.keyword
        }
      ).then(res => {
        var imgReg = /<img.*?(?:>|\/>)/gi;
        _this.listData = _this.listData.concat(res.data.rows);
        console.log(123)
        _this.totalPage = res.data.pages;
        _this.loading = false;
      });
    }
  },
  onReachBottom() {
    let _this = this;
    _this.currPage = _this.currPage + 1;
    if (_this.currPage <= _this.totalPage) {
      _this.pulldownLoading();
    }
  },
  onLoad() {
    if (this.$root.$mp.query.name && this.$root.$mp.query.name != "") {
      this.openOff = false;
      this.currPage = 1;
      this.keyword = this.$root.$mp.query.name;
      this.listData = [];
      this.pulldownLoading();
    } else if (this.openOff) {
      this.openOff = false;
      this.pulldownLoading();
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
  .raiders-list {
    .list-main {
      .page-list-li {
        border-bottom: 1px solid #eee;
        padding: 10px;
        margin-bottom: 10px;
        background: #fff;
        box-shadow: 0 0 10px -5px rgba(0, 0, 0, 0.8);
        .li-a {
          .raiders-img {
            width: 100%;
            height: 120px;
            image {
              width: 100%;
              height: 100%;
            }
          }
          .raiders-info {
            padding: 6px 12px;
            .raiders-title {
              font-size: 15px;
              max-height: 40px;
              line-height: 20px;
              color: #413838;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .raiders-description {
              font-size: 12px;
              max-height: 40px;
              line-height: 20px;
              margin-top: 6px;
              color: #5f5a5a;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              .img-box {
                padding: 0 !important;
              }
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
