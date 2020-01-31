<template>
  <div class="scenic-warper">
    <navbar title='演出列表'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <search ref='search'
              :name="keyword"
              @getData='search'>
      </search>
      <template v-if='listData.length||loading'>
        <div class="scenic-list">
          <div  v-for='(item,index) in listData'
               v-if="item.isParkTicket=='T'"
               :key='index'
               @click="goUrl('pages/show/detail/main?id='+item.id+'&productCode='+item.productCode)"
               class="scenic-item shadow-bottom">
               <!-- +"&merchantParkId="+item.id+ -->
            <div class="scenic-imgBox">
              <img class="scenic-img" :src="item.linkMobileImg" alt>
            </div>
            <div class="scenic-info">
              <div class="name-add">
                <div class="scenic-title">{{item.nickName}}</div>
                <div class="scenic-distance">
                  <div class="distance-option" v-for="(val, i) in item.extendsParam4Arr">{{val}}</div>
                </div>
              </div>
              <div class="price-info">
                <div v-if="item.virtualSale!=0" class="buy-num">已售{{item.virtualSale}}份</div>
                <div class='start-price'>
                  <span class="unit">￥</span>
                  <span class="price">{{item.priceShow}}</span>
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
import api from "@/api/api";
import navbar from "@/components/navbar";
export default {
  components: {
    search,
    navbar
  },
  data () {
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
    goUrl (path) {
      this.navigatePageTo(this.router + path);
    },
    search (keyword) {
      this.currPage = 1;
      this.keyword = keyword;
      this.listData = [];
      this.pulldownLoading();
    },
    gotoGame (path) {
      this.reLaunchPageTo(this.router + path);
    },
    pulldownLoading () {
      let _this = this;
      let url = api.ticket.list.pagelist;
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
        let arr=res.data.rows.map(val=>{
          let json=Object.assign({}, val);
          if(val.extendsParam4){
            json.extendsParam4Arr=val.extendsParam4.split(',');
          }else{
            json.extendsParam4Arr=[];
          };
          return json;
        })
        _this.listData = _this.listData.concat(arr);
        _this.totalPage = res.data.pages;
        _this.loading = false;
        console.log(_this.listData);
      });
    }
  },
  onReachBottom () {
    let _this = this;
    _this.currPage = _this.currPage + 1;
    if (_this.currPage <= _this.totalPage) {
      this.pulldownLoading();
    }
    console.log(_this.currPage);
  },
  onLoad () {
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
  onUnload () {
    this.openOff = true;
    this.listData = [];
    this.$refs.search.keyword = "";
    this.keyword = "";
    this.currPage = 1;
  },
  onShow () { }
};
</script>

<style lang="scss">
.scenic-warper {
    font-family: PingFangSC-Regular, sans-serif;
  .no-data {
    font-size: 18px;
    color: #999;
    padding-top: 40%;
    text-align: center;
  }
  .scenic-list {
    text-indent: 5rpx;
    .scenic-item {
      border-bottom:1px solid #e5e5e5;
      padding:3px 0 13px 0;
      background: #fff;
      margin-bottom: 1px;
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
      .scenic-imgBox {
        width:120px;
        height:110px;
        margin-left:15px;
        border-radius:5px;
        overflow:hidden;
        box-shadow:0px 2px 5px #B9B9B9;
        .scenic-img {
          width:120px; height:110px;
        }
      }
      .scenic-info {
        // box-sizing: content-box;
        // display: inline-block;
        width: 230px;
        height: 102px;
        padding: 0px 12px;
        .name-add {
          height: 90px;
          overflow: hidden;
          .scenic-title {
            padding-right: 12px;
            color: #413838;
            font-family: PingFangSC-Medium, sans-serif;
            font-size: 18px;
            color:#3B3B3B;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .scenic-distance {
            line-height:18px;
            font-size: 10px;
            font-family: PingFangSC-Regular, sans-serif;
            margin-top:5px;
            .distance-option {
              height:19px;
              float:left;
              margin-right:5px;
              margin-bottom:5px;
              padding-left:4px;
              padding-right:5px;
              border-radius:8px;
              border:1px solid #E9E9E9;
              color:#FF8B59;
            }
          }
        }
        .price-info {
          position: relative;
          .buy-num {
            padding:1px 3px;
            color: #ababab;
            font-size: 10px;
            font-family: PingFangSC-Regular, sans-serif;
            float:left;
            background-image: linear-gradient(to right, #efefef, white);
          }
          .start-price {
            position: relative;
            float:right;
            color: #fc4150;
            right: 0;
            bottom: 8px;
            .unit {
              font-size: 12px;
              font-family: PingFangSC-Semibold, sans-serif;
            }
            .price {
              font-size: 20px;
              font-weight:900;
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
