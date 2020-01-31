<template>
    <div class="product">
        <template v-if="pageData.listType=='type1'">
            <div @click="goUrl(item.businessType,item.merchantProdcutId,item.productCode)" class="product-box"  v-for="(item,index) in pageData.list" :key="index">
                <!-- 无标签 -->
                <div class="product-img" v-if="pageData.productTag==''">
                    <img :src="item.linkMobileImg" alt="">
                </div>
                <!-- 自定义标签 -->
                  <div class="product-img" v-if="pageData.productTag=='type4'">
                    <div class="hotsale hotCustom">
                        <img :src="pageData.tagUrl" alt="">
                    </div>
                    <img :src="item.linkMobileImg" alt="">
                </div>
                    <!-- 精品 -->
                 <div class="product-img" v-if="pageData.productTag=='fine'">
                    <div class="hotsale">
                        <img src="http://statics.lotsmall.cn/wx/img/hot1.png" alt="">
                    </div>
                    <img :src="item.linkMobileImg" alt="">
                </div>
                <!-- 热销 -->
                 <div class="product-img" v-if="pageData.productTag=='type2'">
                    <div class="hotsale">
                        <img src="http://statics.lotsmall.cn/wx/img/product2.png" alt="">
                    </div>
                    <img :src="item.linkMobileImg" alt="">
                </div>
                    <!-- 特惠 -->
                <div class="product-img" v-if="pageData.productTag=='type1'">
                    <div class="hotsale">
                        <img src="http://statics.lotsmall.cn/wx/img/hot3.png" alt="">
                    </div>
                    <img :src="item.linkMobileImg" alt="">
                </div>
                    <!-- 新品 -->
                 <div class="product-img" v-if="pageData.productTag=='type3'">
                    <div class="hotsale newhot">
                        <img src="http://statics.lotsmall.cn/wx/img/hot4.png" alt="">
                    </div>
                    <img :src="item.linkMobileImg" alt="">
                </div>
                <div class="product-sc-block">
                  <div class="product-sc-title">
                    <span class="product-sc-title-top">TOP</span>
                    <span class="product-sc-title-con">{{item.name}}</span>
                  </div>
                  <div class="product-sc-detail">{{item.name}}</div>
                </div>
                <!-- <div class="main-heading">
                    {{item.name}}
                </div>
                <div class="subhead">
                     <span class="icon-yuan" :style="{color:item.priceShow?'#fc4150':'transparent'}">￥</span> {{item.priceShow}}
                </div> -->
            </div>
        </template>
        <!-- 左右结构 -->
        <div class="paoductSide " v-if="pageData.listType=='type2'">
            <div class="product-box" @click="goUrl(item.businessType,item.merchantProdcutId,item.productCode)"  v-for="(item,index) in pageData.list" :key="index">
                <div class="product-img">
                    <div class="hotsale" :class="{newhot:pageData.productTag=='type3'}" v-if="pageData.productTag&&pageData.productTag!='type4'">
                        <img v-if="pageData.productTag=='fine'" src="http://statics.lotsmall.cn/wx/img/hot1.png" alt="">
                        <img v-if="pageData.productTag=='type2'" src="http://statics.lotsmall.cn/wx/img/product2.png" alt="">
                        <img v-if="pageData.productTag=='type1'" src="http://statics.lotsmall.cn/wx/img/hot3.png" alt="">
                        <img v-if="pageData.productTag=='type3'" src="http://statics.lotsmall.cn/wx/img/hot4.png" alt="">
                    </div>
                    <div class="hotsale hotCustom" v-if="pageData.productTag=='type4'">
                        <img :src="pageData.tagUrl" alt="">
                    </div>
                    <img :src="item.linkMobileImg" alt="">
                </div>
                <div class="main-heading">
                    {{item.name}}
                </div>
                <div class="subhead">
                     <span class="icon-yuan" :style="{color:item.priceShow?'#fc4150':'transparent'}">￥</span> {{item.priceShow}}
                   <!-- <span class="icon-yuan">￥</span> {{item.parkPriceShow?item.parkPriceShow:item.priceShow}} -->
                </div>
            </div>
        </div>
        <!-- 左右滑动 -->
        <div class="shuffling" v-if="pageData.listType=='type3'">
            <scroll-view scroll-x="true" class="shuffling-content" v-bind:style="{width:750+'rpx'}">
                <div class="product-box" @click="goUrl(item.businessType,item.merchantProdcutId,item.productCode)"  v-for="(item,index) in pageData.list" :key="index">
                    <div class="product-img">
                        <div class="hotsale" :class="{newhot:pageData.productTag=='type3'}" v-if="pageData.productTag&&pageData.productTag!='type4'">
                        <img v-if="pageData.productTag=='fine'" src="http://statics.lotsmall.cn/wx/img/hot1.png" alt="">
                        <img v-if="pageData.productTag=='type2'" src="http://statics.lotsmall.cn/wx/img/product2.png" alt="">
                        <img v-if="pageData.productTag=='type1'" src="http://statics.lotsmall.cn/wx/img/hot3.png" alt="">
                        <img v-if="pageData.productTag=='type3'" src="http://statics.lotsmall.cn/wx/img/hot4.png" alt="">
                    </div>
                    <div class="hotsale hotCustom" v-if="pageData.productTag=='type4'">
                        <img :src="pageData.tagUrl" alt="">
                    </div>
                         <img :src="item.linkMobileImg" alt="">
                    </div>
                    <div class="main-heading">
                        {{item.name}}
                    </div>
                    <div class="subhead">
                         <span class="icon-yuan" :style="{color:item.priceShow?'#fc4150':'transparent'}">￥</span> {{item.priceShow}}
                        <!-- <span class="icon-yuan">￥</span> {{item.parkPriceShow?item.parkPriceShow:item.priceShow}} -->
                    </div>
                </div>
            </scroll-view>
        </div>
    </div>
</template>
<script>
// import { getData } from "@/common/common";
export default {
  props: {
    pageData: {
      type: Object,
      default: {}
    }
  },
  methods: {
      goUrl(type,id,code){
          if(type!=''){
            let url=this.linkDetailObj[type]
          if(type=='shop'||type=='mdse'){
              this.navigatePageTo(this.router + url+'?id='+id+'&code='+code);
          }else if(type=='strategy'){
              this.navigatePageTo(this.router + url+'?id='+id);
          } else if (type == 'groupbooking') {
            wx.showToast({
              title: '我的拼团暂未开发',
              icon: 'none',
              duration: 2000
            })
            return
          }
          else if (type == 'parkcard') {
            wx.showToast({
              title: '公园年卡暂未开发',
              icon: 'none',
              duration: 2000
            })
            return
          }
          else if (type == 'publicservice') {
            wx.showToast({
              title: '公共服务暂未开发',
              icon: 'none',
              duration: 2000
            })
            return
          }
          else{
              this.navigatePageTo(this.router + url+'?id='+id+'&productCode='+code);
          }  
          }else{

          }

      },
  }
};
</script>
<style lang='scss'>
.product {
  width: 100%;
  .product-box {
    width: 100%;
    background-color: #fff;
    padding: 10px 0 5px 0;
    .product-img {
      width: 98%;
      height: 140px;
      margin: 0 auto;
      position: relative;
      image {
        width: 100%;
        height: 100%;
        display: block;
      }
      .hotsale {
        width: 40px;
        height: 40px;

        position: absolute;
        top: 5px;
        left: 5px;
        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    //   .hotCustom {
    //     border: 0.5px dashed #ccc;
    //   }
      .newhot {
        top: 0px;
        left: 0px;
      }
    }
    .product-sc-block {
      border-bottom: 1px solid #e9e9e9;
      padding: 0px 15px;
    }
    .product-sc-title {
      line-height: 30px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .product-sc-title-top {
        line-height: 18px;
        width: 32px;
        font-size: 12px;
        border-top-left-radius: 10px 12px;
        text-align: center;
        padding-right: 4px;
        color: #fff;
        background-color: #f1142c;
        margin-right: 6px;
      }
      .product-sc-title-con {
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: bold;
        color: #333;
        font-size: 16px;

        white-space: nowrap;
      }
    }
    .product-sc-detail {
      color: #999;
      line-height: 30px;
      padding-bottom: 6px;
      font-size: 12px;
    }
    .main-heading {
      width: 98%;
      height: 24px;
      margin: 8px auto;
      padding: 0 9px;
      line-height: 24px;
      font-size: 16px;
      color: #413838;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .subhead {
      width: 78px;
      height: 17px;
      padding: 0 9px;
      line-height: 17px;
      font-size: 18px;
      color: #fc4150;
      .icon-yuan {
        font-size: 12px;
      }
    }
  }

  .paoductSide {
    width: 100%;
    display: flex;
     flex-wrap: wrap;
    justify-content: space-between;
    .product-box {
      width: 49.8%;
      background-color: #fff;
      padding: 15px 0 5px 0;
      .product-img {
        width: 98%;
        height: 140px;
        margin: 0 auto;

        image {
          width: 100%;
          height: 100%;
          display: block;
        }
        .hotsale {
          width: 40px;
          height: 40px;

          position: absolute;
          top: 5px;
          left: 5px;
          image {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        // .hotCustom {
        //   border: 0.5px dashed #ccc;
        // }
        .newhot {
          top: 0px;
          left: 0px;
        }
      }
      .main-heading {
      width: 98%;
      height: 24px;
      margin: 8px auto;
      padding: 0 9px;
      line-height: 24px;
      font-size: 16px;
      color: #413838;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .subhead {
      width: 78px;
      height: 17px;
      padding: 0 9px;
      line-height: 17px;
      font-size: 18px;
      color: #fc4150;
      .icon-yuan {
        font-size: 12px;
      }
    }
    }
  }
  .shuffling {
    width: 100%;
    .shuffling-content {
      display: flex;
      white-space: nowrap;
      .product-box {
        display: inline-block;
        width: 160px;
        background-color: #fff;
        padding: 15px 0 5px 0;
        .product-img {
          width: 98%;
          height: 110px;
          margin: 0 auto;

          image {
            width: 100%;
            height: 100%;
            display: block;
          }
          .hotsale {
            width: 40px;
            height: 40px;

            position: absolute;
            top: 5px;
            left: 5px;
            image {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        //   .hotCustom {
        //     border: 0.5px dashed #ccc;
        //   }
          .newhot {
            top: 0px;
            left: 0px;
          }
        }
       .main-heading {
      width: 98%;
      height: 24px;
      margin: 8px auto;
      padding: 0 9px;
      line-height: 24px;
      font-size: 14px;
      color: #413838;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .subhead {
      width: 78px;
      height: 17px;
      padding: 0 9px;
      line-height: 10px;
      font-size: 16px;
      color: #fc4150;
      .icon-yuan {
        font-size: 12px;
      }
    }
      }
    }
  }
}
</style>
