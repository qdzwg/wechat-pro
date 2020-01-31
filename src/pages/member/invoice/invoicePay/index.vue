<template>
  <div class="invoice-pay-warper">
    <navbar title="申请开票"></navbar>
    <div
      :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px'),}"
      class="invoicePay"
    >
      <div class="section">
        <div class="section-title">发票种类</div>
        <div class="input-text">普通发票（电子）</div>
      </div>
      <div class="section">
        <div class="section-title">抬头类型</div>
        <div class="input-text">
          <radio-group class="radio-group" @change="radioChange">
            <label class="radio" v-for="(item,index) in items" :key="index">
              <radio
                color="#f05b47"
                class="radio-select"
                :value="item.value"
                :checked="item.checked"
              />
              {{item.name}}
            </label>
          </radio-group>
        </div>
      </div>
      <div class="section">
        <div class="section-title">发票抬头</div>
        <input
          v-if="buyCategory=='0'"
          placeholder-class="place-holder"
          class="input-text input-content"
          v-model="buyDutyName"
          placeholder="请填写企业名称或单位名称"
        />
        <input
          v-if="buyCategory=='1'"
          placeholder-class="place-holder"
          class="input-text input-content"
          v-model="buyDutyName"
          placeholder="个人/非企业性单位"
        />
      </div>
      <div class="section" v-if="buyCategory=='0'">
        <div class="section-title">企业税号</div>
        <input
          placeholder-class="place-holder"
          class="input-text input-content"
          v-model="buyDutyNo"
          placeholder="请填写企业税号"
        />
      </div>
      <div class="section">
        <div class="section-title">手机号码</div>
        <input
          placeholder-class="place-holder"
          class="input-text input-content"
          v-model="receiveMobile"
          placeholder="请填写手机号码"
        />
      </div>
      <div class="section">
        <div class="section-title">邮箱地址</div>
        <input
          placeholder-class="place-holder"
          class="input-text input-content"
          v-model="receiveEmail"
          placeholder="请填写邮箱地址"
        />
      </div>
      <div class="section" v-if="buyCategory=='0'">
        <div class="section-title">单位地址</div>
        <input
          placeholder-class="place-holder"
          class="input-text input-content"
          v-model="buyAddress"
          placeholder="请填写单位地址"
        />
      </div>
      <div class="section" v-if="buyCategory=='0'">
        <div class="section-title">电话号码</div>
        <input
          placeholder-class="place-holder"
          class="input-text input-content"
          v-model="buyTel"
          placeholder="请填写电话号码"
        />
      </div>
      <!-- <div class="section" v-if="buyCategory=='0'">
            <div class="section-title">开户银行</div>
            <input placeholder-class="place-holder" class="input-text input-content" v-model="accName" placeholder="请填写开户银行">
      </div>-->
      <div class="section" v-if="buyCategory=='0'">
        <div class="section-title">银行账户</div>
        <input
          placeholder-class="place-holder"
          class="input-text input-content"
          v-model="buyBankNo"
          placeholder="请填写银行账户"
        />
      </div>
      <div class="i-t-b">
        <div class="tr">
          <div class="td">消费内容/规格型号</div>
          <div class="td">金额(元)</div>
          <div class="td">税率</div>
        </div>
        <div v-for="(item,index) in tableData" :key="index" class="tr item">
          <div class="td">{{item.orderInfo?item.orderInfo:''}}</div>
          <div class="td">{{(item.paySum||item.paySum==0)?item.paySum:''}}</div>
          <div class="td">{{(item.rate||item.rate==0)?item.rate:''}}</div>
        </div>
        <!-- <div class="tr">
          <div class="td">1</div>
          <div class="td">2</div>
          <div class="td">3</div>
        </div>-->

        <!-- <table class="invoice-apply-table">
          <tr>
            <td>消费内容/规格型号</td>
            <td class="money">金额(元)</td>
            <td class="rate">税率</td>
          </tr>
          <tr v-for="(item,index) in tableData" :key="index">
            <td>{{item.orderInfo?item.orderInfo:''}}</td>
            <td>{{(item.paySum||item.paySum==0)?item.paySum:''}}</td>
            <td>{{(item.rate||item.rate==0)?item.rate:''}}</td>
          </tr>
        </table>-->
      </div>
      <div class="text-info">根据税务总局要求，除企业之外的所有个人消费者、个体工商户以及行政机关、事业单位、社会团体等非企业性单位均无需提供纳税人识别号。</div>
      <div class="footer">
        <div class="footer-l">
          <!-- <span class="text">合计：</span> -->
          <span class="text"></span>
          <div class="price">
            <span v-if="invoiceAmount||totalInvoiceAmount" class="unit">￥</span>
            <span class="num">
              <template v-if="tableData.length==1">{{invoiceAmount}}</template>
              <template v-else>{{totalInvoiceAmount}}</template>
            </span>
          </div>
        </div>
        <div @click="save" class="footer-r">提交</div>
      </div>
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
      items: [
        { name: "公司抬头", value: "0", checked: true },
        { name: "个人/其他", value: "1", checked: false }
      ],
      invoiceAmount: "",
      totalInvoiceAmount: "",
      buyCategory: "0",
      buyDutyName: "",
      buyDutyNo: "",
      buyAddress: "",
      buyTel: "",
      buyBankNo: "",
      receiveMobile: "",
      receiveEmail: "",
      payOrderNo: "",
      tableData: [],
      test: "1"
    };
  },
  onLoad() {
    // console.log(this.$root.$mp);
    getData("/marketing/api/marketElectronicInvoices/rateInvoiceReq", {
      payOrderNo: this.$root.$mp.query.payOrderNo,
      merchantInfoId: merchantInfoId
    }).then(res => {
      this.tableData = res.data;
    });
  },
  onUnload() {
    this.items = [
      { name: "公司抬头", value: "0", checked: true },
      { name: "个人/其他", value: "1", checked: false }
    ];
    this.invoiceAmount = "";
    this.buyCategory = "0";
    this.buyDutyName = "";
    this.buyDutyNo = "";
    this.buyAddress = "";
    this.buyTel = "";
    this.buyBankNo = "";
    this.receiveMobile = "";
    this.receiveEmail = "";
    this.payOrderNo = "";
    this.tableData = [];
    this.test = 1;
  },
  onShow() {},
  methods: {
    radioChange(e) {
      console.log(e);
      //   console.log("radio发生change事件，携带value值为：", e.detail.value);
      this.buyCategory = e.mp.detail.value;
      this.items.forEach(item => {
        item.checked = item.value == this.buyCategory;
      });
    },
    showInfo(info) {
      wx.showToast({
        title: info,
        duration: 1500,
        icon: "none"
      });
    },
    save() {
      // if (!this.tableData.length) {
      //   // this.$vux.toast.text("缺少明细列表", "middle");
      //   this.showInfo("缺少明细列表")
      //   return false;
      // }
      //必填验证
      console.log(this.buyCategory);
      // if (!this.buyCategory) {
      //   // this.$vux.toast.text("请选择抬头类型", "middle");
      //    this.showInfo("请选择抬头类型")
      //   return false;
      // } else

      if (!this.buyDutyName) {
        // this.$vux.toast.text("请填写发票抬头", "middle");
        this.showInfo("请填写发票抬头");
        return false;
      } else if (!this.buyDutyNo && this.buyCategory == 0) {
        // this.$vux.toast.text("请填写企业税号", "middle");
        this.showInfo("请填写企业税号");
        return false;
      } else if (!this.receiveMobile) {
        // this.$vux.toast.text("请填写手机号码", "middle");
        this.showInfo("请填写手机号码");
        return false;
      }

      //字段长度限制
      if (this.buyDutyName && this.buyDutyName.length > 48) {
        // this.$vux.toast.text("发票抬头长度不能超过48位", "middle");
        this.showInfo("发票抬头长度不能超过48位");
        return false;
      }

      if (this.receiveEmail && this.receiveEmail.length > 50) {
        // this.$vux.toast.text("邮箱地址长度不能超过50位", "middle");
        this.showInfo("邮箱地址长度不能超过50位");
        return false;
      }
      if (this.buyTel && this.buyCategory == 0 && this.buyTel.length > 15) {
        // this.$vux.toast.text("电话号码长度不能超过15位", "middle");
        this.showInfo("电话号码长度不能超过15位");
        return false;
      }

      if (
        this.buyAddress &&
        this.buyCategory == 0 &&
        this.buyAddress.length > 40
      ) {
        // this.$vux.toast.text("单位地址长度不能超过40位", "middle");
        this.showInfo("单位地址长度不能超过40位");
        return false;
      }

      if (
        this.buyDutyNo &&
        this.buyCategory == 0 &&
        (this.buyDutyNo.length < 6 || this.buyDutyNo.length > 20)
      ) {
        // this.$vux.toast.text("企业税号长度不能少于6大于20位", "middle");
        this.showInfo("企业税号长度不能少于6大于20位");
        return false;
      }

      //格式验证
      if (!/^1[34578]\d{9}$/.test(this.receiveMobile)) {
        // this.$vux.toast.text("手机号码格式错误", "middle");
        this.showInfo("手机号码格式错误");
        return false;
      }

      if (
        this.receiveEmail &&
        !/[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
          this.receiveEmail
        )
      ) {
        // this.$vux.toast.text("邮箱地址格式错误", "middle");
        this.showInfo("邮箱地址格式错误");
        return false;
      }

      if (
        this.buyCategory == 0 &&
        this.buyBankNo &&
        !/^([1-9]{1})(\d{14}|\d{18})$/.test(this.buyBankNo)
      ) {
        // this.$vux.toast.text("银行账号址格式错误", "middle");
        this.showInfo("银行账号址格式错误");
        return false;
      }
      let data = {
        buyCategory: this.buyCategory,
        buyDutyName: this.buyDutyName,
        buyDutyNo: this.buyDutyNo,
        buyAddress: this.buyAddress,
        buyTel: this.buyTel,
        buyBankNo: this.buyBankNo,
        receiveMobile: this.receiveMobile,
        receiveEmail: this.receiveEmail,
        payOrderNo: this.$root.$mp.query.payOrderNo
      };
      let url = "/marketing/api/marketElectronicInvoices/createInvoiceReq";
      getData(url, data).then(res => {
        if (res.status == 200) {
          wx.showToast({
            title: "开票成功",
            icon: "success",
            duration: 1500,
            success: function() {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                });
              }, 1500);
            }
          });
        } else {
          wx.showToast({
            title: res.message,
            icon: "success",
            duration: 1500
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.invoice-pay-warper {
  padding-bottom: 49px;
  .text-info {
    font-size: 12px;
    color: #999;
    padding: 20px 15px;
    // margin-bottom: 49px;
  }
  .invoicePay {
    .section {
      display: flex;
      align-items: center;
      flex-direction: row;
      // width: 100%;
      height: 53px;
      line-height: 53px;
      padding: 0 10px;
      background-color: #fff;
      border-bottom: 0.5px solid #eeeee7;
      .cropper-label {
        width: 29px;
        height: 25.5px;
      }
      .section-title {
        width: 70px;
        font-size: 14px;
        color: #413838;
      }
      input.input-content {
        font-size: 14px;
        color: #413838;
      }
      .input-text {
        padding-left: 10px;
        padding-right: 15px;
        outline: none;
        border: none;
        flex: 1;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #413838;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .radio-select {
          transform: scale(0.8);
        }
        .test {
          background: url("http://statics.lotsmall.cn/wx/img/coupons-bg.png");
          width: 50px;
          height: 50px;
        }
        .radio-box {
          display: flex;
          align-items: center;
          margin-right: 10px;
          input {
            display: none;
          }
          label {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 1px solid #aaa;
            border-radius: 50%;
            position: relative;
          }
          label::after {
            cursor: pointer;
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
          }
          input:checked + label {
            border-color: transparent;
          }
          input:checked + label::after {
            background: url("http://statics.lotsmall.cn/wx/img/coupons-bg.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            transform: scale(1.4);
          }
          .name {
            margin-left: 5px;
            font-size: 14px;
            color: #413838;
          }
        }
      }
      .price {
        color: red;
      }
      .place-holder {
        font-size: 14px;
        color: #999;
      }
    }
    .footer {
      z-index: 99999;
      position: fixed;
      width: 100%;
      display: flex;
      // height: 49px;
      align-items: center;
      background: #fff;
      left: 0;
      bottom: 0;
      .footer-l {
        width: 50%;
        display: flex;
        align-items: center;
        .price {
          color: #f05b47;
          .unit {
            font-size: 12px;
          }
          .num {
            font-size: 18px;
          }
        }
        .text {
          font-size: 13px;
          color: #413838;
          margin-left: 12px;
          margin-right: 5px;
        }
        .num {
        }
      }
      .footer-r {
        border: none;
        cursor: pointer;
        width: 50%;
        text-align: center;
        color: #fff;
        background: #f05b47;
        height: 49px;
        line-height: 49px;
        font-size: 16px;
      }
      // height: 49px;
      // line-height: 49px;
      // text-align: center;
      // color: #fff;
      // background: #f05b47;
      // left: 0;
      // bottom: 0;
      // font-size: 16px;
    }
    .i-t-b {
      margin-top: 10px;
      background: #fff;
      width: 100%;
      .tr {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #eaeaea;
        &:last-child {
          border-bottom: none;
        }
        .td {
          flex: 1;
          justify-content: center;
          padding: 15px 0;
          text-align: center;
          color: #413838;
          font-size: 14px;
        }
      }
    }
    .invoice-apply-table {
      width: 100%;

      tr {
        &:last-child {
          td {
            border: none;
          }
        }
        td {
          border-bottom: 1px solid #eeeee7;
          padding: 15px 10px;
          color: #413838;
          text-align: center;
          font-size: 14px;
          &:first-child {
            text-align: left;
          }
        }
        .money {
          min-width: 70px;
        }
        .rate {
          min-width: 70px;
        }
      }
    }
  }
}
</style>