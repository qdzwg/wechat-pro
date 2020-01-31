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
      </div>
      <!---->
      <div class="fb-height"></div>
      <div class="finish-box">
        <span class="finish-btn" @click="saveContacts">完成</span>
      </div>
      <!---->

      <div class="info-item" @click="gotoUpload">
        <div class="info-title">人脸照</div>
        <img v-if="porsrc" :src="porsrc" class="preview-img" :class="{rotate: isIos==true}" />
        <img v-else src="http://statics.lotsmall.cn/wx/img/camera-icon.png" class="camera-icon">
        <span v-if="porsrc" class="camera-tips">（用于非实名票刷脸入园）</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import { getData, postData, merchantInfoId, host } from "@/common/common";
import navbar from "@/components/navbar";

export default {
  components: {
    navbar
  },
  data() {
    return {
      name: "",
      phone: "",
      certNo: "",
      faceUrl: "",
      cFlag: true,
      faceUrls: ""
    };
  },
  computed: {},
  methods: {
    goUrl(path) {
      this.navigatePageTo(this.router + path);
    },
    saveContacts() {
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
          certNo: this.certNo
        }).then(res => {
          // console.log(res);
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
    let editUrl = api.contacts.selectContactsById;
    getData(editUrl, {
      id: this.$root.$mp.query.id
    }).then(res => {
      this.name = res.data.name;
      this.phone = res.data.phone;
      this.certNo = res.data.certNo;
    });
  }
};
</script>

<style lang="scss">
.link-edit-box {
  box-shadow: 0px -5px 10px #fafafa;
  margin-top: 5px;
  .info-list {
    padding: 10px 28px 14px 28px;
    .info-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      color: #413838;
      margin-bottom: 10px;
      .faceImg {
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }
      .info-title {
        width: 77px;
        font-family: PingFangSC-Medium, sans-serif;
      }
      .input-style {
        color: rgba(65, 56, 56, 0.5);
        font-size: 14px;
        font-family: PingFangSC-Medium, sans-serif;
      }
      input {
        width: 240px;
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
    height: 58.5px;
    width: 100%;
    bottom: 0;
    left: 0;
    .finish-btn {
      border: none;
      width: 100%;
      height: 58.5px;
      line-height: 58.5px;
      background-color: #f05b47;
      color: #fff;
      text-align: center;
      font-size: 20px;
      border-radius: none;
      display: block;
    }
  }
}
</style>
