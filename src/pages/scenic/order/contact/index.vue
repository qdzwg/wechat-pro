<template>
  <div class="link-edit-box">
    <navbar title='编辑联系人'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
    <div class="info-list bg-w">
      <div class="info-item">
        <div class="info-title">姓名</div>
        <input placeholder-class='input-style' placeholder="必须和证件上的名字一致" v-model="name">
      </div>
      <div class="info-item">
        <div class="info-title">手机号</div>
        <input placeholder-class='input-style' placeholder="请填写手机号码" v-model="phone">
      </div>
      <div class="info-item">
        <div class="info-title">身份证</div>
        <input placeholder-class='input-style' placeholder="请填写身份证号" v-model="certNo">
      </div>
      <face-recognition :porsrc="faceUrls" @getImgUrl="getUrl"></face-recognition>
    </div>
    <!---->
    <div class="fb-height"></div>
    <div class="finish-box">
      <span class="finish-btn" @click="saveContacts">完成</span>
    </div>
    <!---->
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import { getData, postData, merchantInfoId, host } from "@/common/common";
import sha1 from "sha1";
import faceRecognition from "@/components/faceRecognition";
import navbar from "@/components/navbar"
let wecropper;
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 50;
export default {
  data() {
    return {
      name: "",
      phone: "",
      certNo: "",
      faceUrls: "",
      porsrc: "",
      cFlag: true,
      showCropper: false,
      cropperOpt: {
        id: "cropper",
        width,
        height,
        scale: 2.5,
        zoom: 8,
        cut: {
          x: (width - 220) / 2,
          y: (height - 220) / 2,
          width: 220,
          height: 220
        }
      },
      isface: false,
      base64: "",
      bUrl: "",
      isIos: false
    };
  },
  components: {
    faceRecognition,
    navbar
  },
  computed: {},
  methods: {
    getUrl(arr) {
      this.faceUrls = arr;
    },
    goUrl(path) {
      this.navigatePageTo(this.router + path);
    },
    saveContacts() {
      // console.log(this.$root.$mp.query.id);
      this.cFlag = true;
      if (this.name == "") {
        this.cFlag = false;
        wx.showToast({
          title: "联系人姓名不能为空！",
          duration: 2000,
          icon: "none"
        });
        return;
      }
      if (this.phone == "") {
        this.cFlag = false;
        wx.showToast({
          title: "联系人手机号不能为空！",
          duration: 2000,
          icon: "none"
        });
        return;
      } else {
        if (this.checkMobile(this.phone)) {
          this.flag = false;
          wx.showToast({
            title: "请输入正确的手机号码！",
            duration: 2000,
            icon: "none"
          });
          return;
        }
      }
      if (this.cFlag) {
        let saveUrl = api.contacts.saveContacts;
        postData(saveUrl, {
          id: this.$root.$mp.query.id,
          leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
          name: this.name,
          phone: this.phone,
          certNo: this.certNo,
          faceUrl: this.faceUrls
        }).then(res => {
          console.log(res);
          wx.showToast({
            title: res.message,
            duration: 2000,
            icon: "none"
          });
          if (res.status == "200") {
            setTimeout(() => {
              wx.navigateBack({ delta: 1 });
            }, 2000);
          }
        });
      }
    }
  },
  onLoad() {},
  onShow() {
    wecropper = this.$refs.cropper;
    let editUrl = api.contacts.selectContactsById;
    getData(editUrl, {
      id: this.$root.$mp.query.id
    }).then(res => {
      this.name = res.data.name;
      this.phone = res.data.phone;
      this.certNo = res.data.certNo;
      this.faceUrls = res.data.faceUrl;
    });
  }
};
</script>

<style lang="scss">
.link-edit-box {
  box-shadow: 0px -5px 10px #fafafa;
  margin-top: 5px;
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
  .info-list {
    padding: 0 0 0 15px;
    .face-box {
      .info-item {
        .camera-icon {
          margin-left: 35px;
        }
        .preview-img{
          margin-left: 35px;
        }
      }
    }
    .info-item:last-child {
      border: none;
    }
    .info-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      color: #413838;
      // margin-bottom: 10px;
      height: 53px;
      border-bottom: 0.5px solid #eeeeef;

      .preview-img {
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }
      .info-title {
        margin-right: 10px;
        width: 50px;
        font-family: PingFangSC-Regular, sans-serif;
      }
      .input-style {
        color: rgba(65, 56, 56, 0.5);
        font-size: 14px;
        font-family: PingFangSC-Regular, sans-serif;
      }
      input {
        width: 240px;
        padding-left: 35px;
        font-family: PingFangSC-Regular, sans-serif;
      }
      .camera-icon {
        width: 30px;
        height: 26.5px;
      }
      .camera-tips {
        color: rgba(65, 56, 56, 0.5);
        margin-left: 10px;
      }
    }
  }
  .fb-height {
    height: 58.5px;
  }
  .finish-box {
    position: fixed;
    height: 49px;
    width: 100%;
    bottom: 0;
    left: 0;
    .finish-btn {
      border: none;
      width: 100%;
      height: 49px;
      line-height: 49px;
      background-color: #f05b47;
      color: #fff;
      text-align: center;
      font-size: 16px;
      border-radius: none;
      display: block;
    }
  }
}
</style>
