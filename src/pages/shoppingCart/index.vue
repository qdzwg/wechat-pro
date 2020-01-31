<template>
    <div class="cart-warp">
        <navbar :backShow='!componentShow' title='购物车'></navbar>
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px')}">
            <div class="topShadow"></div>
            <div v-if='list.length&&manageShow' class="clearfix edit-warper bg-w">
                <!-- <i  class="xx-icon icon-iconfont-xie editor-svg fr"></i> -->
                <span @click="edit" v-if='!flag' class="edit-warper-text fr">管理</span>
                <span @click="complete" v-else class="edit-warper-text fr">完成</span>
            </div>
            <div class="goods-list">
                <checkbox-group v-if='list.length'>
                    <label class="checkbox" v-for='(item,index)  in list' :key='index' v-if='item.show'>
                        <div class="goods-item boxshadow" @click.stop="selectCheck(index)">
                            <!-- <div class="top-warper" :class="{'transition-test':hasanimtion}" :style="item.txtStyle" @touchstart="touchS" @touchmove="touchM" @touchend="touchE" :data-index="index"> -->
                            <div class="top-warper transition-test" :style="item.txtStyle" @touchstart="touchS" @touchend="touchE" :data-index="index">
                                <div class="fl img-warper">
                                    <checkbox :value='item.id' :checked="item.checked" class="goods-radio" />
                                    <img class="goods-img" :src="skuInfo[index].linkImg" alt="">
                                </div>
                                <div class="goods-info">
                                    <div class="info-box">
                                        <div class="goods-title two-line">
                                            {{skuInfo[index].nickName || item.productName}}
                                        </div>
                                        <div class="spec-ul one-line">

                                            <span v-for='(it,i) in item.specArr' :key='i' class="spec-li">{{it}}</span>
                                            <!-- <span class="spec-li">规格一</span>
                    <span class="spec-li">规格一</span> -->
                                        </div>
                                    </div>
                                    <div class="goods-price">
                                        <div class="price">
                                            <span class="unit">￥</span>
                                            <span class="num">{{skuInfo[index].sellPrice}}</span>
                                        </div>
                                        <div class="buy-num clearfix">
                                            <div class="count-box fr">
                                                <span v-if='item.num>1' @click.stop="sub(index)" class="sub handle-span">-</span>
                                                <span v-else @click.stop="stop" class="sub handle-span  disabled">-</span>
                                                <span v-if="item.num<item.stockNum" @click.stop="add(index)" class="add handle-span">+</span>
                                                <span v-else @click.stop="stop" class="add handle-span disabled">+</span>
                                            </div>
                                            <div class="show-num fr">
                                                {{item.num}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bottom-warper clearfix">
                                <div @click.stop="del(item.mdseDetailId,index)" class="remove fr">删除</div>
                            </div>
                        </div>

                        <!-- <radio :value="item" checked="{{item.checked}}"/>{{item.value}} -->
                    </label>
                </checkbox-group>
                <div class='no-mdse' v-else>
                    请添加购物车商品
                </div>
            </div>
            <div class="go-pay" v-bind:style="{bottom:componentShow?'49'+px:'0'}">
                <div class="left fl">
                    <div class="select-all">
                        <checkbox-group v-if='list.length' @change="toggleSelectAll" class="group-select">
                            <label class="checkbox" v-for='(item,index) in selectAll' :key='index'>
                                <checkbox :value='item.value' :checked="item.checked" class="allselect-radio" />
                                <span class="text">全选</span>
                            </label>
                        </checkbox-group>
                    </div>

                    <div class="pay-money">
                        <span class="text">总额:</span>
                        <span class="total-price">
                            ￥{{total}}
                        </span>
                    </div>

                </div>
                <div @click="balance" v-if='num>0' class="right">结算{{num>0?('(' + num + ')'):''}}</div>
                <div v-else class="right disabled">结算</div>
            </div>
        </div>
        <vue-tab-bar v-if="componentShow" :pageData='navigationData' @fetch-index="clickIndexNav" :selectNavIndex='selectNavIndex'></vue-tab-bar>
    </div>

</template>

<script>
// Use Vuex
import { getData, postData, merchantInfoId } from "@/common/common";
import navbar from "@/components/navbar";
import vueTabBar from "@/components/customCom/vueTabBar"; //底部导航
export default {
  components: {
    navbar,
    vueTabBar
  },
  data() {
    return {
      pageData: {},
      manageShow: true,
      hasanimtion: true,
      selectAll: [{ value: 1, checked: false }],
      delBtnWidth: 62, //删除按钮宽度单位（rpx）
      startX: null, //记录其实x值
      startY: null, //起始Y值
      num: 0,
      list: [],
      flag: false, //默认全部关闭
      skuInfo: [
        {
          nickName: "",
          sellPrice: "",
          linkMobileImg: ""
        }
      ],
      componentShow: false,
      navigationData: {},
      selectNavIndex: 3
    };
  },
  computed: {
    total() {
      let sum = 0;
      this.num = 0;
      this.list.forEach((element, index) => {
        if (element.checked && element.show) {
          this.num++;
          sum += element.num * this.skuInfo[index].sellPrice;
        }
      });
      return sum.toFixed(2);
    }
  },
  onLoad() {
    // getData(this.api.aiPapi.getUsePage, {
    //   merchantInfoId: merchantInfoId,
    //   pageType: "navigationPage",
    //   useRange: "small"
    // }).then(res => {
    //   // console.log(res);
    //   this.navigationData = JSON.parse(res.data.content);
    //   this.navigationData.range.map(item=>{
    //       if(item=='shopcartpage'){
    //           this.componentShow = true;
    //       }
    //   })
      
    // });


    this.navigationData = wx.getStorageSync("getNavigationData");
        this.navigationData.range.map(item => {
          if (item == "shopcartpage") {
            this.componentShow = true;
          }
        });
  },
  onShow() {
    this.manageShow = true;
    this.initData();
    this.selectAll = [{ value: 1, checked: false }];
    this.flag = false;
  },
  methods: {
    initData() {
      let skuCodes = "";
      let _this = this;
      getData(this.api.main.cart.list, {
        userID: wx.getStorageSync("WxXjscUserInfo").leaguerId,
        merchantInfoName: "111"
      }).then(res => {
        if (res.data.cartItemDtos && res.data.cartItemDtos.length) {
          let codeArr = [];
          res.data.cartItemDtos.forEach((item, index) => {
            res.data.cartItemDtos[index].show = true;
            res.data.cartItemDtos[index].checked = false;
            let arr = [];
            item.specParam.split(",").forEach(item => {
              var key = Object.keys(JSON.parse(item))[0];
              arr.push(JSON.parse(item)[key]);
            });
            res.data.cartItemDtos[index].txtStyle = "left:0";
            res.data.cartItemDtos[index].specArr = arr;
            codeArr.push(item.modelCode);
          });
          getData(this.api.member.order.getMerchantMdseDetailByCode, {
            modelCodes: codeArr.join(","),
            merchantInfoId: wx.getStorageSync("WxXjscUserInfo").leaguerId
          }).then(result => {
            // for(let i = 0;i<15;i++){
            //   res.data.cartItemDtos = res.data.cartItemDtos.concat(res.data.cartItemDtos)
            //   result.data = result.data.concat(result.data)
            // }
            _this.pageData = res.data.cartDto;
            _this.list = res.data.cartItemDtos ? res.data.cartItemDtos : [];
            _this.skuInfo = result.data;
          });
        } else {
          this.list = res.data.cartItemDtos ? res.data.cartItemDtos : [];
        }
      });
    },
    del(id, index) {
      getData(this.api.main.cart.delete, {
        mdseDetailIds: id,
        userID: wx.getStorageSync("WxXjscUserInfo").leaguerId
      }).then(res => {
        if (res.success) {
          this.list[index].show = false;
          this.list[index].checked = false;
          let flag = true;
          //默认全选
          //判断是否有没选中的
          let num = 0;
          this.list.forEach(item => {
            if (!item.checked && item.show) {
              flag = false;
            }
            if (item.show) {
              num++;
            }
          });
          //如果删除后长度为0也是不显示全选
          if (!num) {
            flag = false;
            this.manageShow = false;
          }
          //全部checked都是true
          this.selectAll[0].checked = flag;
          wx.showToast({
            title: "删除成功!",
            duration: 1000,
            icon: "success"
          });
        }
      });
    },
    stop() {},
    balance() {
      //结算
      //购物车跳转支付详情页面
      var arr = [];
      this.list.forEach((element, index) => {
        if (element.checked) {
          var obj = {
            img: this.skuInfo[index].linkImg,
            specStrArr: element.specArr,
            name: this.skuInfo[index].nickName
              ? this.skuInfo[index].nickName
              : this.list[index].productName,
            sellPrice: this.skuInfo[index].sellPrice,
            num: element.num,
            modelCode: element.modelCode,
            productCode: element.productCode,
            mdseDetailId: element.mdseDetailId
          };
          arr.push(obj);
        }
      });
      wx.setStorageSync("mdse2018_info_95", arr);
      this.navigatePageTo(this.router + "pages/goods/pay/main?balance=cart");
    },
    selectCheck(index) {
      this.list[index].checked = !this.list[index].checked;
      var flag = true;
      //判断是否有没选中的
      this.list.forEach(item => {
        if (!item.checked) {
          flag = false;
        }
      });
      //全部checked都是true
      this.selectAll[0].checked = flag;
    },
    edit() {
      if (this.flag) {
        this.list.forEach((item, index) => {
          this.list[index].txtStyle = "left:0rpx";
        });
      } else {
        this.list.forEach((item, index) => {
          this.list[index].txtStyle = "left:-124rpx";
        });
      }
      this.flag = !this.flag;
      // console.log(this.list);
    },
    complete() {
      if (this.flag) {
        var arr = [];
        this.list.forEach((item, index) => {
          this.list[index].txtStyle = "left:0rpx";
          if (item.show) {
            //未删除的判断
            let obj = {
              cartID: item.cartID,
              merchantInfoId: item.merchantInfoId,
              productCode: item.productCode,
              productName: item.productName,
              salePrice: this.skuInfo[index].sellPrice,
              productAmount: item.num,
              productSpecJson: this.skuInfo[index].specParam
            };
            arr.push(obj);
          }
        });
        console.log(arr);
        let url = this.api.main.cart.updata;
        getData(url, {
          merchantInfoName: this.pageData.merchantInfoName,
          userID: this.pageData.userID,
          CartItemDtoJsonArray: JSON.stringify(arr)
        });
        //更新购物车
        // [ { "cartID": "cart777101", "merchantInfoId": 777, "productID": 278303, "productCode": "SP201803150923", "productName": "测试票型C", "salePrice": 25.95, "productAmount": 999, "productSpecJson": "{\n \"颜色\": \"GREEN\",\n \"尺码\": \"M\"\n}" }, { "cartID": "cart777101", "merchantInfoId": 777, "productID": 278301, "productCode": "SP201803150921", "productName": "测试票型A", "salePrice": 25.95, "productAmount": 999, "productSpecJson": "{\n \"颜色\": \"blue\",\n \"尺码\": \"M\"\n}" } ]
        // this.list.forEach((item, index) => {});
      } else {
        this.list.forEach((item, index) => {
          this.list[index].txtStyle = "left:-124rpx";
        });
      }
      this.flag = !this.flag;
    },
    //手指刚放到屏幕触发
    touchS: function(e) {
      this.hasanimtion = false;
      //判断是否只有一个触摸点
      if (e.touches.length == 1) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
      }
    },
    //触摸时触发，手指在屏幕上每移动一次，触发一次
    touchM: function(e) {
      var that = this;
      if (e.touches.length == 1) {
        //记录触摸点位置的X坐标
        var moveX = e.touches[0].clientX;
        //计算手指起始点的X坐标与当前触摸点的X坐标的差值
        var disX = this.startX - moveX;
        //delBtnWidth 为右侧按钮区域的宽度
        var delBtnWidth = this.delBtnWidth;
        var txtStyle = "";
        if (disX == 0 || disX < 0) {
          //如果移动距离小于等于0，文本层位置不变
          // if (Math.abs(disX) > delBtnWidth / 2) {

          // }
          txtStyle = "left:0px";
        } else if (disX > 0) {
          //移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "px";
          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "px";
          }
        }
        //获取手指触摸的是哪一个item
        var index = e.currentTarget.dataset.index;
        this.list[index].txtStyle = txtStyle;
      }
    },
    touchE: function(e) {
      this.hasanimtion = true;
      var that = this;
      if (e.mp.changedTouches.length == 1) {
        //手指移动结束后触摸点位置的X坐标
        var endX = e.mp.changedTouches[0].clientX;
        var endY = e.mp.changedTouches[0].clientY;
        //触摸开始与结束，手指移动的距离
        var disX = this.startX - endX;
        var disY = this.startY - endY;
        // 比较disX和disY绝对值大小判断用户是上下滑动还是左右滑动;

        if (Math.abs(disX) > Math.abs(disY)) {
          var delBtnWidth = this.delBtnWidth;
          //如果距离小于删除按钮的1/2，不显示删除按钮
          var txtStyle =
            disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
          //获取手指触摸的是哪一项
          var index = e.currentTarget.dataset.index;
          this.list[index].txtStyle = txtStyle;
        } else if (Math.abs(disX) < Math.abs(disY)) {
        } else {
        }
      }
    },
    toggleSelectAll(e) {
      if (e.mp.detail.value.length) {
        //全选
        this.selectAll[0].checked = true;
        this.list.forEach((item, index) => {
          this.list[index].checked = true;
        });
      } else {
        //取消全选
        this.selectAll[0].checked = false;
        this.list.forEach((item, index) => {
          this.list[index].checked = false;
        });
      }
    },
    radioChange(e) {
      console.log("radio发生change事件，携带value值为：", e.mp.detail.value);
      console.log(this.list);
    },
    sub(index) {
      if (this.list[index].num > 0) {
        this.list[index].num--;
      }
    },
    add(index) {
      if (this.list[index].num < this.list[index].stockNum) {
        this.list[index].num++;
      }
    }
  }
};
</script>

<style lang="scss">
.cart-warp {
  .topShadow {
    width: 100%;
    height: 0.5px;
    background-color: rgba(146, 144, 144, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  checkbox .wx-checkbox-input {
    border-radius: 50%; /* 圆角 */
    // width: 40rpx; /* 背景的宽 */
    // height: 40rpx; /* 背景的高 */
  }
  /* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
  checkbox .wx-checkbox-input.wx-checkbox-input-checked {
    border-color: #f05b47;
    background: #f05b47;
  }
  /* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
  checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
    border-radius: 50%; /* 圆角 */
    // width: 40rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
    // height: 40rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
    // line-height: 40rpx;
    text-align: center;
    font-size: 26rpx; /* 对勾大小 30rpx */
    color: #fff; /* 对勾颜色 白色 */
    background: transparent;
    transform: translate(-50%, -50%) scale(1);
    -webkit-transform: translate(-50%, -50%) scale(1);
  }
  .edit-warper {
    // padding-bottom: 15px;
    // font-size: 16px;
    position: fixed;
    left: 0;
    top: 69px;
    width: 100%;
    z-index: 999;
    .edit-warper-text {
      padding: 15px;
      font-size: 16px;
      color: #413838;
      font-family: PingFangSC-Regular, sans-serif;
    }
  }
  padding-bottom: 49px;
  .jiantou-svg {
    margin-right: 13px;
    color: #f05b47;
    font-size: 9px;
    font-weight: 700;
  }
  .goods-list {
    padding-top: 51px;
    .no-mdse {
      font-size: 14px;
      color: #413838;
      font-family: PingFangSC-Regular, sans-serif;
      text-align: center;
      padding: 15px 0px;
    }
    .goods-item {
      height: 120px;
      margin: 10px 0;
      background: #fff;
      position: relative;
      .top-warper {
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        // padding-left: 10px;
        // padding-right: 20px;
        height: 100%;
        width: 100%;
        .img-warper {
          height: 100%;
          width: 135px;
          display: flex;
          align-items: center;
          .goods-radio {
            transform: scale(0.7);
            margin-right: 7px;
            margin-left: 10px;
          }
          .goods-img {
            // padding-top: 20px;
            width: 80px;
            height: 80px;
          }
        }

        .goods-info {
          padding-top: 18.5px;
          margin-left: 135px;
          margin-right: 20px;
          .info-box {
            height: 60px;
            .goods-title {
              // height: 34px;
              font-size: 14px;
              color: #413838;
              font-family: PingFangSC-Regular, sans-serif;
            }
            .spec-ul {
              .spec-li {
                font-size: 11px;
                color: #989898;
                font-family: PingFangSC-Regular, sans-serif;
                margin-right: 13px;
              }
            }
          }
          .goods-price {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
              color: #fc4150;
              font-size: 18px;
              font-family: PingFangSC-Regular, sans-serif;
              .unit {
                font-size: 12px;
              }
              .num {
                margin-left: 3px;
              }
            }
            .buy-num {
              color: #999999;
              font-size: 15px;
              // font-family: PingFangSC-Medium, sans-serif;
              // align-items: flex-end;
              .x {
                font-size: 12px;
                margin-right: 6px;
              }
              .show-num {
                height: 30px;
                line-height: 30px;
                font-size: 18px;
                color: #413838;
                font-family: PingFangSC-Regular, sans-serif;
              }
              .count-box {
                margin-left: 16px;
                height: 28px;
                text-align: center;
                font-size: 18px;
                color: #ff6363;
                .handle-span {
                  text-align: center;
                  display: inline-block;
                  line-height: 29px;
                  height: 29px;
                  border: 1px solid #ff6363;
                  width: 44px;
                }
                .handle-span.disabled {
                  color: #ffc9c9;
                  border-color: #ffc9c9;
                }
                .sub {
                  border-right: none;
                  border-top-left-radius: 2.5px;
                  border-bottom-left-radius: 2.5px;
                }
                .add {
                  border-top-right-radius: 2.5px;
                  border-bottom-right-radius: 2.5px;
                }
              }
            }
          }
        }
      }
      .transition-test {
        transition: left 0.3s;
        -moz-transition: left 0.3s; /* Firefox 4 */
        -webkit-transition: left 0.3s; /* Safari 和 Chrome */
        -o-transition: left 0.3s; /* Opera */
      }

      .bottom-warper {
        height: 120px;
        .remove {
          font-size: 18px;
          height: 120px;
          line-height: 120px;
          color: #fff;
          width: 62px;
          background: #f05b47;
          text-align: center;
        }
      }
    }
    .goods-item:first-child {
      margin-top: 0;
    }
  }
  .go-pay {
    position: fixed;
    height: 49px;
    left: 0;
    bottom: 45px;
    width: 100%;
    background: #f05b47;
    .left {
      height: 100%;
      // padding-left: 41px;
      // padding-right: 11.5px;
      width: 243px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      .select-all {
        // display: flex;
        // align-items: center;
        .group-select {
          height: 49px;
          line-height: 49px;
        }
        position: relative;
        padding-left: 10px;
        .allselect-radio {
          transform: scale(0.7);
          // position: absolute;
          // top: 13px;
          // left: 10px;
        }
        .text {
          width: 30px;
          // position: absolute;
          // top: 15px;
          // left: 40px;
          color: #5c5c5c;
          font-size: 14px;
          font-family: PingFangSC-Regular, sans-serif;
        }
      }
      .pay-money {
        margin-right: 12px;
        color: #fc4150;
        font-size: 16px;
        line-height: 49px;
        font-family: PingFangSC-Regular, sans-serif;
        .text {
          margin-right: 8px;
        }
      }
      .free {
        .free-text {
          color: #999999;
          font-size: 12px;
          font-family: PingFangSC-Regular, sans-serif;
        }
      }
    }
    .right {
      height: 100%;
      line-height: 49px;
      margin-left: 243px;
      color: #fff;
      font-size: 18px;
      font-family: PingFangSC-Regular, sans-serif;
      text-align: center;
    }
    .right.disabled {
      color: #fff;
      background: #cccccc;
    }
  }
}
</style>
