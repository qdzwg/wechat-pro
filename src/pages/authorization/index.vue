<template>
  <div class="authorization">
    <navbar :backShow='false' title='授权'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <div class="authorization-tips-box">
        <p class="authorization-tips">需要获得你的授权才能提供后续服务</p>
        <p class="authorization-get">
          <span class="authorization-dot">·</span>
          <span class="authorization-text">获得你的公开信息（昵称、头像等）</span>
        </p>
      </div>
      <p class="gotoauth">
        <button open-type="getUserInfo" @getuserinfo='getUserInfo' class="gotoauth-btn">去授权</button>
        <button open-type="cancel" @click='cancel' class="cancel-btn">取消</button>
      </p>
    </div>
  </div>
</template>

<script>
import { getData, postData, host, merchantInfoId } from "@/common/common.js";
import navbar from "@/components/navbar";
export default {
  components: {
    navbar
  },
  data() {
    return {
      flag: null,
      userInfo: {}
    };
  },
  mounted() {},

  methods: {
    getUserInfo(e) {
      let _this = this;
      // 查看是否授权
      if (e.mp.detail.userInfo) {
        //同意授权
        // 获取用户信息缓存本地

        wx.login({
          success: function(res) {
            // success
            let _this = this;
            if (res.code) {
              wx.request({
                url: host + "/leaguer/api/authApi/wxMiniProgramLogin",
                data: {
                  code: res.code, //授权码
                  merchantInfoId: merchantInfoId //店铺id
                },
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function(res) {
                  console.log(res)
                  wx.setStorageSync("WxXjscUserInfo", res.data.data);
                  // _this.flag = false;
                  let url = wx.getStorageSync("xjsc_2018_order_url_asds");

                  wx.reLaunch({
                    url: "/" + url
                  });
                },
                fail: function() {
                  // fail
                },
                complete: function() {
                  // complete
                }
              });
            } else {
              console.log("授权页面获取授权码失败");
            }
          },
          fail: function() {
            // fail
            console.log("授权页面获取授权码失败");
          },
          complete: function() {
            // complete
            console.log("授权页面获取授权码完成");
          }
        });
      } else {
        //拒绝授权
        // _this.flag = false;
        wx.navigateTo({
          url: "/pages/index/main"
        });
        //  wx.navigateBack();
      }
      // wx.getSetting({
      //   success: function(res) {
      //     if (res.authSetting["scope.userInfo"]) {
      //       wx.getUserInfo({
      //         success: function(res) {
      //           wx.navigateBack({
      //             delta: 1
      //           });
      //         }
      //       });
      //     }
      //   }
      // });
    },
    cancel() {
      wx.navigateTo({
        url: "/pages/index/main"
      });
    }
  },
  onHide() {
    if (this.flag) {
      // wx.switchTab({
      //   url: "/pages/index/main"
      // });
    }
  },
  onLoad() {
    // this.flag = true;
    // let flag = wx.getStorageSync("wxsjsc_2018_9_29_SDZS8_8ASD");
    // if (flag) {
    //   // wx.switchTab({
    //   //   url: "/pages/index/main"
    //   // });
    // }
    // wx.removeStorageSync("wxsjsc_2018_9_29_SDZS8_8ASD");
  },
  onShow() {},
  onUnload() {
    // if (this.flag) {
    //   wx.setStorageSync("wxsjsc_2018_9_29_SDZS8_8ASD", true);
    //   setTimeout(function() {
    //     wx.switchTab({
    //       url: "/pages/index/main"
    //     },3000);
    //   });
    // }
    // wx.redirectTo({
    //   url: "/pages/index/main"
    // });
  }
};
</script>

<style lang='scss'>
.authorization {
  .authorization-tips-box {
    width: 315px;
    margin: 20px auto;
    box-shadow: 0 0 2px #f6f6f6;
    background: #fff;
    border-radius: 2px;
    padding: 15px;
    .authorization-tips {
      color: #413838;
      font-size: 14px;
      border-top: 0.5px solid #eeeee7;
      padding-top: 15px;
      height: 30px;
      line-height: 30px;
    }
    .authorization-get {
      font-size: 13px;
      color: #5c5c5c;
      height: 30px;
      line-height: 30px;
      .authorization-dot {
        font-size: 25px;
        margin-right: 8px;
        display: inline-block;
        vertical-align: middle;
      }
      .authorization-text {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .gotoauth {
    .gotoauth-btn,
    .cancel-btn {
      width: 345px;
      margin: 20px auto 0;
      border: none;
      background: #f05b47;
      border-radius: 2px;
      color: #fff;
      text-align: center;
      font-size: 16px;
      height: 44px;
      line-height: 44px;
    }
    .cancel-btn {
      background: #fff;
      color: #413838;
    }
  }
}
</style>
