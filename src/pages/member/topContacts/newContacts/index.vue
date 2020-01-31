<template>
  <div class="newContacts">
    <navbar title='添加联系人'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      <div class="topShadow"></div>
      <div class="section">
        <div class="section-title">姓名</div>
        <input placeholder-class="place-holder" class="input-text input-content" maxlength="10" v-model="name" placeholder="须与证件上的姓名一致" />
      </div>
      <div class="section">
        <div class="section-title">手机号</div>
        <input placeholder-class="place-holder" name="phone" type="number" maxlength="11" class="input-text input-content" v-model="phone" placeholder="请填写手机号" />
      </div>
      <div class="section">
        <div class="section-title">身份证</div>
        <input placeholder-class="place-holder" class="input-text input-content" type="idcard" maxlength="18" v-model="certNo" placeholder="请填写身份证号码" />
      </div>
      <div class="section">
        <face-recognition :porsrc="faceUrl" @getImgUrl="getUrl"></face-recognition>
      </div>

      <div class="btn-area" @click="formSubmit" v-if="name&&phone">
        <button class="btn-area">完成</button>
      </div>
      <div class="btn-area-disabled" v-else>
        <button class="btn-area-disabled">完成</button>
      </div>
    </div>
    </div>
</template>

<script>
// Use Vuex
import api from "@/api/api";
import { getData, postData, merchantInfoId, host } from "@/common/common";
import sha1 from "sha1";
import faceRecognition from "@/components/faceRecognition";
import navbar from "@/components/navbar";
export default {
  components: {
    faceRecognition,
    navbar
  },
  data() {
    return {
      subShow: "hidden",
      type: "add",
      name: "",
      phone: "",
      certNo: "",
      faceUrl: "",
      id: "",
      leaguerId: "",
      route: ""
    };
  },
  onShow() {
    if (this.$root.$mp.query.id) {
      this.type = "edit";
      getData(this.api.contacts.selectContactsById, {
        id: this.$root.$mp.query.id
      }).then(res => {
        this.id = res.data.id;
        this.leaguerId = wx.getStorageSync("WxXjscUserInfo").leaguerId;
        this.name = res.data.name;
        this.phone = res.data.phone;
        this.certNo = res.data.certNo;
        this.faceUrl = res.data.faceUrl;
      });
    } else if (this.$root.$mp.query.route) {
      this.route = this.$root.$mp.query.route;
      //   this.name = "";
      //   this.phone = "";
      //   this.certNo = "";
      //   this.faceUrl = "";
    }
  },
  onUnload() {
    this.id = "";
    this.name = "";
    this.phone = "";
    this.certNo = "";
    this.faceUrl = "";
  },
  methods: {
    getUrl(arr) {
      this.faceUrl = arr;
    },
    isIdCardNo(num) {
      var factorArr = new Array(
        7,
        9,
        10,
        5,
        8,
        4,
        2,
        1,
        6,
        3,
        7,
        9,
        10,
        5,
        8,
        4,
        2,
        1
      );
      var parityBit = new Array(
        "1",
        "0",
        "X",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2"
      );
      var varArray = new Array();
      var intValue;
      var lngProduct = 0;
      var intCheckDigit;
      var intStrLen = num.length;
      var idNumber = num;
      // initialize
      if (intStrLen != 15 && intStrLen != 18) {
        return false;
      }
      // check and set value
      for (let i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < "0" || varArray[i] > "9") && i != 17) {
          return false;
        } else if (i < 17) {
          varArray[i] = varArray[i] * factorArr[i];
        }
      }

      if (intStrLen == 18) {
        // check date
        var date8 = idNumber.substring(6, 14);
        if (isDate8(date8) == false) {
          return false;
        }
        // calculate the sum of the products
        for (let i = 0; i < 17; i++) {
          lngProduct = lngProduct + varArray[i];
        }
        // calculate the check digit
        intCheckDigit = parityBit[lngProduct % 11];
        // check last digit
        if (varArray[17] != intCheckDigit) {
          return false;
        }
      } else {
        // length is 15
        // check date
        var date6 = idNumber.substring(6, 12);
        if (isDate6(date6) == false) {
          return false;
        }
      }
      return true;
      function isDate8(sDate) {
        if (!/^[0-9]{8}$/.test(sDate)) {
          return false;
        }
        var year, month, day;
        year = sDate.substring(0, 4);
        month = sDate.substring(4, 6);
        day = sDate.substring(6, 8);
        var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year < 1700 || year > 2500) return false;
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
          iaMonthDays[1] = 29;
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > iaMonthDays[month - 1]) return false;
        return true;
      }
    },
    formSubmit() {
      let _this = this;
      if (this.name == "") {
        wx.showModal({
          title: "提示",
          content: "请填写姓名"
        });
        return false;
      }
      if (this.phone == "") {
        wx.showModal({
          title: "提示",
          content: "请填写手机号"
        });
        return false;
      }
      if (!/^1[3-9][0-9]{9}$/.test(this.phone)) {
        wx.showModal({
          title: "提示",
          content: "手机号格式不正确"
        });
        return false;
      }
      if (this.certNo != "") {
        if (!this.isIdCardNo(this.certNo)) {
          wx.showModal({
            title: "提示",
            content: "身份证号码格式不正确"
          });
          return false;
        }
      }

      postData(this.api.contacts.saveContacts, {
        id: this.id,
        leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
        name: this.name,
        phone: this.phone,
        certNo: this.certNo,
        faceUrl: this.faceUrl
      }).then(res => {
        if (res.status == 200) {
          wx.showToast({
            title: "操作成功",
            icon: "success",
            duration: 2000
          });
          if (_this.route == "orderBack") {
            let url = wx.getStorageSync("xjsc_2018_order_url_linkman");
            let obj = {};
            obj = {
              name: _this.name,
              phone: _this.phone,
              certNo: _this.certNo,
              faceUrl: _this.faceUrl
            };
            wx.setStorageSync("xjsc_2018_linkMan", obj);
            wx.navigateBack(_this.router + url);
          } else {
            wx.navigateBack(_this.router + "pages/member/topContacts/main");
          }
          _this.name = "";
          _this.phone = "";
          _this.certNo = "";
          _this.faceUrl = "";
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
.newContacts {
  width: 100%;
  .cropper-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 701;
    background: rgba(0, 0, 0, 0.95);
  }
  .cropper-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #e5e5e5;
  }

  .cropper-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  .cropper-buttons .upload,
  .cropper-buttons .getCropperImage {
    width: 50%;
    text-align: center;
  }

  .cropper {
    position: absolute;
    top: 0;
    left: 0;
  }

  .cropper-buttons {
    background-color: rgba(0, 0, 0, 0.95);
    color: #04b00f;
  }
  .topShadow {
    width: 100%;
    height: 0.5px;
    background-color: rgba(146, 144, 144, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .section {
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: #fff;
    width: 100%;
    height: 53px;
    line-height: 53px;
    padding: 0 15px;
    border-bottom: 0.5px solid #eeeee7;
    .face-box {
      .info-item {
        .camera-icon {
          margin-left: 8px;
        }
      }
    }
    .section-title {
      width: 50px;
      font-size: 14px;
      color: #413838;
    }
    input.input-content {
      font-size: 14px;
      color: #413838;
    }
    .input-text {
      padding-left: 35px;
    }
    .place-holder {
      font-size: 14px;
      color: #999;
    }

    .img-camera-show {
      padding-left: 35px;
      width: 40px;
      height: 40px;
      image {
        display: block;
        width: auto;
        height: 40px;
      }
    }
    .img-camera {
      padding-left: 35px;
      width: 29px;
      height: 25.5px;
    }
  }
  .section view {
    margin-right: 10px;
  }
  .btn-area {
    width: 100%;
    height: 49px;
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0;
    background-color: #f05b47;
    color: #fff;
    text-align: center;
    line-height: 49px;
    font-size: 16px;
  }
  button::after {
    border-radius: 0;
    border: none;
  }
  .btn-area-disabled {
    width: 100%;
    height: 49px;
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0;
    background-color: #cbcbcb;
    color: #fff;
    text-align: center;
    line-height: 49px;
    font-size: 16px;
  }
  .canvas-hide {
    position: fixed;
    right: -100%;
    top: 0;
  }
}
</style>
