<template>
  <div class="route-wraper">
    <navbar title="跟团游列表"></navbar>
    <div :style="{'margin-top': (navContentHeight+navBarHeight+'px')}"></div>
    <search ref="search" :name="keyword" @getData="search"></search>
    <template v-if="listData.length || loading">
      <div class="route-list">
        <div
          v-for="(item, index) in listData"
          :key="index"
          @click="goUrl('pages/route/detail/main?id='+item.id+'&productCode='+item.productCode)"
          class="route-item shadow-bottom"
        >
          <div class="route-img">
            <img class="" :src="item.linkMobileImg" alt>
          </div>
          <div class="scenic-info">
            <div class="name-add">
              <div class="scenic-title">{{item.name}}</div>              
            </div>
            <div class="name-add">
              <div class="scenic-title">{{item.nickName}}</div>              
            </div>
            <div class="line-theme">
                <span v-for="(it, ind) in item.themeArr" :key="ind" class="theme-item">                  
                    {{it}}
                </span>               
            </div>
            <div class="price-info">
              <div class="buy-num">
                <span>已售{{item.salesNum}}份</span>
                <!-- <span>{{item.begAddress}} 出发</span> -->
                <!-- <span style="margin-left:5rpx">{{item.useDay}}天{{item.useNight}}夜</span> -->
              </div>
              <div class="start-price">
                <span class="unit">￥</span>
                <span class="price">{{item.priceShow}}</span>
                <span class="text">起</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-text">
        <span v-if="loading">加载中...</span>
        <span v-else>已加载完成</span>
      </div>
    </template>
    <template v-else>
      <div class="no-data">暂无数据</div>
    </template>
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
      loading: false,
      keyword: "",
      listData: [],
      currPage: 1,
      pageSize: 6,
      wayType: 1,
      totalPage: null,
      keyword: "",
      openOff: true,
      // lineTheme: []
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
    pulldownLoading() {
      let that = this;
      let reqUrl = api.route.list.pagelist;
      that.loading = true;
      getData(
        reqUrl,
        {
          pageSize: that.pageSize,
          currPage: that.currPage,
          merchantInfoId: merchantInfoId,
          modelName: that.keyword
        },
        false
      ).then(res => {
        that.listData = that.listData.concat(res.data.rows);        
        that.totalPage = res.data.pages;
        let themeList = [];
        that.listData.forEach((item, index)=>{        
          let tags = item.lineTheme.split(',');
          let tagsArr = [];          
          tags.forEach((it, ind)=>{
            // console.log(ind)
            if(ind < 2) {
              tagsArr.push(it);
            }
          })
          // that.listData[index].themeArr = item.lineTheme.split(',');
          that.listData[index].themeArr = tagsArr;
        });        
        
        that.loading = false;
      });
    }
  },
  onReachBottom() {
    let _this = this;
    _this.currPage += 1;
    if (_this.currPage <= _this.totalPage) {
      this.pulldownLoading();
    }
  },
  onLoad() {
    if (this.$root.$mp.query.name && this.$root.$mp.query.name != "") {
      //   console.log(this.$root.$mp.query.name);
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
  }
};
</script>

<style lang="scss">
.route-wraper {
  .no-data {
    font-size: 18px;
    color: #999;
    padding-top: 40%;
    text-align: center;
  }
  .bottom-text {
    text-align: center;
    color: #acacac;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .route-list {
    border-top: 0.5px solid #e5e5e5;
    text-indent: 5rpx;
    .route-item {
      background: #fff;
      margin-left: 10px;
      border-bottom: 0.5px solid #e5e5e5;
      display: flex;
      justify-content: space-around;
      padding: 10px 0px;
      .route-img {
        box-shadow: 2px 4px #eee;
        overflow: hidden;
        border-radius: 5px;
        img {
          box-shadow: -2px 4px #eee;
          width: 120px;
          height: 110px;
        }
      }
      .scenic-info {     
        width: 244px;
        height: 110px;
        box-sizing: border-box;
        position: relative;
        padding: 3px 8px 10px 8px;
        .name-add {
          max-height: 44px;
          overflow: hidden;
          line-height: 22px;
          margin-bottom: 5px;
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
          }
        }
        .line-theme{
          height: 21px;
          // line-height: 25px;
          overflow: hidden;
          margin-bottom: 8px;
          margin-left: -2px;
          line-height: 19px;
          .theme-item{
            padding: 0px 5px;
            margin-right: 10px;
            font-size: 10px;
            border-radius: 10px;
            display: inline-block;
            vertical-align: top;
            border:0.5px solid #ef0118;       
          }
          .theme-item:nth-of-type(even){
            color: #ef0118;
            background-color: #fff;
          }
          .theme-item:nth-of-type(odd){
            color: #fff;
            background-color: #ef0118;
          }
        }
        .price-info {
          position: absolute;
          bottom: 0px;
          left: 16px;
          right: 16px;
          height: 16px;
          .buy-num {
            color: #ababab;
            font-size: 10px;
            line-height: 18px;
            background: -webkit-linear-gradient(right, #eee , #fff); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #eee, #fff); /* Opera 11.1 - 12.0 */  
            background: -moz-linear-gradient(right, #eee, #fff); /* Firefox 3.6 - 15 */ 
            background: linear-gradient(to right, #eee , #fff); /* 标准的语法 */ 
            font-family: PingFangSC-Regular, sans-serif;            
            float: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
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
              font-size: 12px;
              color: #ababab;
              font-family: PingFangSC-Regular, sans-serif;
            }
          }
        }
      }
    }
  }
}
</style>

