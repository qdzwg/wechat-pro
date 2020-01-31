<template>
    <div class="face-box">
        <div class="info-item" @click="uploadTap">
            <div class="info-title">人脸照</div>
            <!-- <img v-if="porsrc" :src="porsrc" class="preview-img" /> -->
            <img v-if="porsrc" :src="porsrc" class="preview-img" :class="{rotate: isIos}" />
            <img v-else src="http://statics.lotsmall.cn/wx/img/camera-icon.png" class="camera-icon">
            <span class="camera-tips">（用于非实名票刷脸入园）</span>
        </div>
        <div v-show="showCropper" class="cropper-box">
            <mpvue-cropper ref="cropper" :option="cropperOpt" @ready="cropperReady" @beforeDraw="cropperBeforeDraw" @beforeImageLoad="cropperBeforeImageLoad" @beforeLoad="cropperLoad">
            </mpvue-cropper>
            <div class="cropper-buttons">
                <div class="upload" @click.stop="retakePhoto">
                    重拍
                </div>
                <div class="getCropperImage" @click.stop="getCropperImage">
                    生成图片
                </div>
            </div>
            <div class="close-btns">
              <div class="" @click.stop="closeCropper">
                <i class="close-cropper xx-icon icon-iconfont-pxchaxian"></i>
              </div>              
            </div>            
        </div>
    </div>
</template>

<script>
import api from "@/api/api";
import { getData, postData, merchantInfoId, host } from "@/common/common";
// import upng from "@/common/upng-js/UPNG.js";
import sha1 from "sha1";
import MpvueCropper from "@/components/mpvue-cropper";
let wecropper;
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 80;
export default {
  props: {
    porsrc: {
      type: String,
      default: ""
    }
  },
  components: {
    MpvueCropper
  },
  data() {
    return {
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
  onShow() {
      this.checkIsIos();
    wecropper = this.$refs.cropper;
  },
  methods: {
    //人脸图片裁剪
    cropperReady(...args) {
      console.log("cropper ready!");
    },
    cropperBeforeImageLoad(...args) {
      console.log("before image load");
    },
    cropperLoad(...args) {
      console.log("image loaded");
    },
    cropperBeforeDraw(...args) {
      // Todo: 绘制水印等等
    },
    //拍摄按钮点击
    uploadTap() {
      let _this = this;
      wx.showActionSheet({
        itemList: ["拍照", "从手机相册选取"],
        success: function(res) {
          _this.choosePhotoAction(res.tapIndex);
        }
      });
    },
    //人脸拍照
    choosePhotoAction(tp) {
      const self = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: tp == 1 ? ["album"] : ["camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          self.showCropper = true;
          const src = res.tempFilePaths[0];
          self.$refs.cropper.pushOrigin(src);
        }
      });
    },
    //重新拍照
    retakePhoto() {
      const _this = this;
      _this.showCropper = false;
      _this.uploadTap();
    },
    //裁剪照片
    getCropperImage() {
      wx.showLoading({
        title: "加载中"
      });
      let _this = this;
      wecropper
        .getCropperBase64()
        .then(src => {
          _this.bUrl = src;
          // 4. base64编码
          let base64 = src.replace(/data:image\/image\/\w+;base64,/, "");
          // console.log(base64);
          _this.base64 = base64;
          //爱笔人脸识别对接
          let aibeeUrl = "https://sendinfo.aibee.cn/face/v1/getQuality",
            Ts = parseInt(new Date().getTime() / 1000),
            ApiSecret = "JvfD4SIzL7nm9od9fmosLkVakUoq1tqd";
          wx.request({
            url: aibeeUrl,
            data: { photo: base64 },
            method: "POST",
            header: {
              "Aibee-Auth-ApiKey": "3htkHXEu9MfcMb2JsQLlIxGDLKyZyaV8",
              "Aibee-Auth-Sign": sha1(
                JSON.stringify({ photo: base64 }) + Ts + ApiSecret
              ),
              "Aibee-Auth-Timestamp": Ts,
              "content-type": "application/json;charset=utf-8",
              json: true,
              open_timeout: 0
            },
            success: function(resaibee) {
              _this.showCropper = false;
              if (resaibee.data.error_no != 0) {
                wx.showToast({
                  title: resaibee.data.error_msg,
                  icon: "none",
                  duration: 2000
                });
              } else {
                //回传java后台base64照片
                wx.request({
                  url: host + "/admin/api/ui/uplodeBase64",
                  data: base64,
                  method: "POST",
                  header: {
                    "content-type": "application/json"
                  },
                  success: function(res) {
                    _this.porsrc = res.data.message;
                    _this.checkIsIos();
                    wx.hideLoading();
                    _this.$emit("getImgUrl", _this.porsrc);
                  },
                  fail: function() {},
                  complete: function() {}
                });
              }
            },
            fail: function() {},
            complete: function() {}
          });
        })
        .catch(e => {
          console.error("获取图片失败");
        });
    },
    //关闭裁剪层
    closeCropper() {      
      let _this = this;
      _this.showCropper = false;
    },
    //判断客户端是否是iOS或者Android手机移动端
    checkIsIos() {
      let _this = this;
      wx.getSystemInfo({
        success: function(res) {
          console.log(res)
          if (res.platform == "ios") {
            _this.isIos = true;
          } else {
            _this.isIos = false;
          }
        }
      });
    }
  }
};
</script>


<style lang="scss">
.face-box {
  .info-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #413838;
    position: relative;
    .info-title {
      width: 77px;
      font-family: PingFangSC-Regular, sans-serif;
    }

    .preview-img {
      width: 30px;
      height: 30px;
      margin-left: 5px;
    }
    .input-style {
      color: rgba(65, 56, 56, 0.5);
      font-size: 14px;
      font-family: PingFangSC-Regular, sans-serif;
    }
    input {
      width: 240px;
    }
    .coupon-svg {
      font-size: 12px;
      color: #f05b47;
    }
    .coupons-icon {
      width: 9px;
      color: #f05b47;
      padding-left: 15px;
    }
    .camera-icon {
      width: 30px;
      height: 26.5px;
    }
    .rotate {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      -o-transform: rotate(180deg);
    }
    .camera-tips {
      color: rgba(65, 56, 56, 0.5);
      margin-left: 10px;
      font-size: 14px;
    }
    .setLink {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 13px;
      color: rgba(65, 56, 56, 0.6);
      border: 1px solid rgba(65, 56, 56, 0.5);
      padding: 2px 5px;
      border-radius: 4px;
    }
  }

  .cropper-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 701;
    background: rgba(0, 0, 0, 0.95);
    ._canvas {
      z-index: 705;
      margin-top: 50px;
    }
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
    z-index: 730;
  }

  .cropper-buttons .upload,
  .cropper-buttons .getCropperImage {
    width: 50%;
    text-align: center;
  }
  .close-btns {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 999999;
    width: 25px;
    height: 28px;
    .close-cropper {
      font-size: 25px;
      color: #ffffff;
    }
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
}
</style>


