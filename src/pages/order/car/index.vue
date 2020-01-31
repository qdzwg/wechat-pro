<template>
  <div class="info-order"
       :class="{overflow:canScroll}">
    <navbar title='填写订单信息'></navbar>
    <div class="info-order-body">
      <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
        <div class="info-order-block">
          <div class="order-info-list">
            <div class="info-order-title">跟团游标题·5A级风景名胜区</div>
            <div class="order-play-date">
              <div class="order-play-date-item">
                <div class="order-play-date-detail">
                  <span class="order-play-date-label">出游日期</span><span>2019/11/08</span>
                </div>
                <div class="order-play-date-modify">修改</div>
              </div>
            </div>
          </div>
          <div class="other-product-info-list">
            <div class="other-product-info-item">
              <div class="other-product-info-detail">
                <div class="other-product-info-item-title">景区成人票（亲子游）</div>
                <div class="other-product-info-item-price">
                  99.00元
                  <div class="other-product-info-item-unit">/份</div>
                </div>
              </div>
              <div class="other-product-info-operate">
                <numSpinner v-model="num"
                                :min="0"
                                :max="isRealName=='T'?20:9999"
                                :precision="0"
                                @on-change="changeNum"></numSpinner>
              </div>
            </div>
          </div>
          <div class="order-info-total">
            <span>合计</span>
            <div>
              <i>￥</i>
              99.00元
            </div>
          </div>
        </div>
        <div class="info-order-block">
          <div class="order-info-list">
            <div class="info-order-title">宋城景区酒店</div>
            <div class="order-play-date">
              <div class="order-play-date-item">
                <div class="order-play-date-detail">
                  <span class="order-play-date-label">入住日期</span><span>2019/11/08</span>
                </div>
                <div class="order-play-date-modify">修改</div>
              </div>
            </div>
          </div>
          <div class="other-product-info-list">
            <div class="other-product-info-item">
              <div class="other-product-info-detail">
                <div class="other-product-info-item-title">景区成人票（亲子游）</div>
                <div class="other-product-info-item-price">
                  99.00元
                  <div class="other-product-info-item-unit">/份</div>
                </div>
              </div>
              <div class="other-product-info-operate">
                <numSpinner v-model="num"
                                :min="0"
                                :max="isRealName=='T'?20:9999"
                                :precision="0"
                                @on-change="changeNum"></numSpinner>
              </div>
            </div>
          </div>
          <div class="order-info-total">
            <span>合计</span>
            <div>
              <i>￥</i>
              99.00元
            </div>
          </div>
        </div>
        <div class="buyer-info info-order-block">
          <div class="info-head buy-info-item">
            <div class="head-title">
              <!-- <span class="line"></span> -->
              <span class="text">出游人信息</span>
              <!-- <span class="link-tips">（用于接收出票信息）</span> -->
            </div>
            <div></div>
            <!-- <img src="http://statics.lotsmall.cn/wx/img/icon-contact.png"
                class="contacter-icon"
                @click="openModal"> -->
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-title">姓名</div>
              <input type="text"
                    placeholder-class='input-style'
                    maxlength="10"
                    placeholder="须与证件上的名字一致"
                    v-model="buyerName">
            </div>
            <div class="info-item">
              <div class="info-title">联系电话</div>
              <input placeholder-class='input-style'
                    maxlength="11"
                    placeholder="用于接收出票信息"
                    v-model="buyerMobile">
            </div>
            <div class="info-item">
              <div class="info-title">证件类型</div>
              <div>
                <div class="info-radio">
                  <div class="info-radio-select"></div>
                </div>
                <div class="info-radio-label info-radio-label28">身份证</div>
                <div class="info-radio">
                  <div class="info-radio-select"></div>
                </div>
                <div class="info-radio-label">护照</div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-title">证件号码</div>
              <input placeholder-class='input-style'
                    placeholder="请填写身份证号码"
                    v-model="buyerIdNo">
            </div>
          </div>
        </div>
        <div class="dt-bottom-height"></div>
        <div class="bottom-box">
          <div class="left-warper">
            <div class="bottom-label">总额</div>
            <div class="bottom-price-unit">￥</div>
            <div class="bottom-price-number">99.00</div>
            <!-- <div class="bottom-price-coupon">优惠费用 
              <div class="bottom-price-coupon-number">￥100.0</div>
            </div> -->
          </div>
          <div class="right-warper"
              @click="subForm">
            加入购物车
          </div>
        </div>

        <!--联系人弹框-->
        <div class="toast-box">
          <div v-if='show'
              @click="closeModal"
              class="mask"></div>
          <div :animation="animationData"
              class="modal">
            <slot name='header'>
              <div class="modal-head clearfix">
                <i @click="closeModal"
                  class="fr close xx-icon icon-guanbi2"></i>
              </div>
            </slot>
            <div class="modal-content">
              <scroll-view :style="{'height': '345px'}"
                          :scroll-y="true"
                          @scrolltolower="scrolltolower"
                          @scroll="scroll">
                <div v-if="contactList.length"
                    class="contacter-ul">

                  <div v-for="(item, index) in contactList"
                      :key="index"
                      class="contacter-li">
                    <div class="c-li-left">
                      <p class="contacter-name"
                        @click="fillContact(item.name,item.phone,item.certNo)">{{item.name}}</p>
                      <p class="contacter-tel"
                        @click="fillContact(item.name,item.phone,item.certNo)">
                        <span class="contacter-label"><img src="http://statics.lotsmall.cn/wx/img/icon-tel.png"
                              class="tel-icon"></span>
                        <span class="tel-text">{{item.phone}}</span>
                      </p>
                      <p class="contacter-idcard">
                        <span v-if="item.certNo"
                              class="contacter-label"
                              @click="fillContact(item.name,item.phone,item.certNo)"><img src="http://statics.lotsmall.cn/wx/img/icon-idcard.png"
                              class="idcard-icon"></span>
                        <span v-if="item.certNo"
                              class="idcard-text"
                              @click="fillContact(item.name,item.phone,item.certNo)">{{item.certNo}}</span>
                        <span v-else
                              class="add-information"
                              @click="goUrl('pages/scenic/order/contact/main?id='+item.id)">信息不全，点击补充</span>
                      </p>
                    </div>
                    <div class="c-li-right">
                      <img src="http://statics.lotsmall.cn/wx/img/icon-edit.png"
                          class="edit-icon"
                          @click="goUrl('pages/scenic/order/contact/main?id='+item.id)">
                      <img src="http://statics.lotsmall.cn/wx/img/icon-del.png"
                          class="del-icon"
                          @click="delContact(item.id)">
                    </div>
                  </div>

                </div>
                <div v-else
                    class="noData contact-nodata">
                  <i class="xx-icon icon-iconfont-gantanhaom"></i>
                  <span class="nodata-text">暂无常用联系人，请前往个人中心添加！</span>
                </div>

              </scroll-view>
            </div>
            <div v-if="contactList.length==0"
                class="fixed-bottom"
                @click="goLinkman">
              去添加
            </div>
          </div>

        </div>
        <!--联系人弹框-->

        <!--支付弹框-->
        <div class="toast-box">
          <div v-if='payShow'
              @click='closePayModal'
              class="mask"></div>
          <div :animation="payAnimationData"
              class="modal pay-modal">
            <div class="modal-content pay-sure">
              <div class="pay-money bg-w  m-b-10 boxshadow">
                <span class="title">支付金额:</span>
                <span>￥{{totalprice}}</span>
              </div>
              <div class="pay-way bg-w boxshadow">
                <div class="pay-info">
                  <i class="xx-icon icon-iconfont-weixin1 pay-svg fl"></i>
                  <span class="pay-name fr">微信支付</span>
                </div>
                <radio class="payway-radio"
                      :checked="true" />
              </div>
              <div class="pay-btn"
                  @click="wxpay">去支付</div>
            </div>
          </div>
        </div>
        <!--支付弹框-->
        <!--优惠券弹框-->
        <div class="toast-box">
          <div v-if='couponShow'
              @click='closeCouponModal'
              class="mask"></div>
          <div :animation="couponAnimationData"
              class="coupon-modal">
            <div class="modal-content">
              <div class="couponBody"
                  :style="{'top':(navContentHeight+navBarHeight+'px')}">
                <div class="couponBodyTab">
                  <div class="couponList inner coupons_list">
                    <div v-if="couponList.length>0"
                        class="item-ul">

                      <div v-for="(item, index) in couponList"
                          :key="index"
                          class="item-li boxshadow">
                        <div class="left">
                          <div class="name">{{item.name}}</div>
                          <div class="price">
                            <span class="unit">￥</span>
                            <span class="num">{{item.amount}}</span>
                          </div>
                        </div>
                        <div class="date-use">
                          <div class="date">
                            <span class="title">可用时间：</span>
                            <span class="text"
                                  v-if="item.validityDateType=='relative'">领取后{{item.relativeDay}}天失效</span>
                            <span v-else
                                  class="text">{{item.validStartDate}} 至 {{item.validEndDate}}</span>
                          </div>
                          <div class="use">
                            <p v-if="item.useThreshold=='F'">
                              使用条件：无限制
                            </p>
                            <p v-else>
                              使用条件：满{{item.targetAmout}}元可用
                            </p>
                          </div>
                        </div>
                        <div class="right fr">
                          <span class="right-btn"
                                @click="useCoupon(item)">立即使用</span>
                        </div>
                      </div>

                    </div>
                    <div v-else
                        class="noData">
                      <span class="nodata-text">暂无优惠信息</span>
                    </div>
                    <span v-if="couponList.length>0"
                          class="btn cancle-coupon-choice"
                          @click="Undontuse">不使用优惠券</span>
                    <span class="btn cancle-coupon-choice"
                          @click="dontuse">返回</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import api from "@/api/api";
import { getData, postData, merchantInfoId, host } from "@/common/common";
import navbar from "@/components/navbar";
import numSpinner from "@/components/numSpinner";
// import upng from "@/common/upng-js/UPNG.js";
import sha1 from "sha1";
export default {
  components: {
    navbar,
    numSpinner
  },
  data () {
    return {
      subFormShow: true,
      couponName: "", //优惠券名称
      couponUserType: "", //优惠券  优惠活动
      couponUserNum: "", //优惠券使用门槛
      animation: null,
      animationData: {},
      show: false,
      ticketType: [],
      sumnum: 0,
      totalprice: 0,
      buyerName: "",
      buyerMobile: "",
      buyerIdNo: "",
      src: "",
      flag: true,
      payShow: false,
      payAnimation: null,
      payAnimationData: {},
      orderNo: null, //订单号
      orderInfo: "",
      beginDate: "",
      endDate: "",
      imgWidth: null,
      imgHeight: null,
      contactList: [],
      couponList: [],
      couponShow: false,
      couponAnimation: null,
      couponAnimationData: {},
      couponCode: "", //优惠券code
      orderId: "",
      flagModal: true, //点击其他地方，支付弹框不要消失
      canScroll: false //是否允许页面滑动
    };
  },
  computed: {},
  methods: {
    openModal () {
      this.canScroll = true;
      this.show = true;
      this.animation.bottom("0rpx").step();
      this.animationData = this.animation.export();
    },
    closeModal () {
      this.canScroll = false;
      this.show = false;
      this.animation.bottom("-944rpx").step();
      this.animationData = this.animation.export();
    },

    scrolltolower () { },
    scroll (e) { },
    goUrl (path) {
      this.navigatePageTo(this.router + path);
    },
    goLinkman () {
      wx.setStorageSync(
        "xjsc_2018_order_url_linkman",
        getCurrentPages().pop().__route__
      );
      this.navigatePageTo(
        this.router +
        "pages/member/topContacts/newContacts/main?route=" +
        "orderBack"
      );
    },
    //获取下单数量和总金额
    // getPrice(val, code) {
    //   let pArr = [];
    //   this.sumnum = 0;
    //   let tprice = 0;
    //   this.ticketType.forEach((item, index) => {
    //     let priceSettle = item.singleSum;
    //     if (item.modelCode == code) {
    //       priceSettle =
    //         priceSettle * item.num - val > 0 ? priceSettle * item.num - val : 0;
    //     }

    //     if (val && code && item.modelCode == code) {
    //       this.sumnum += item.num;
    //       tprice += priceSettle;
    //     } else {
    //       this.sumnum += item.num;
    //       tprice += priceSettle * item.num;
    //     }
    //   });
    //   this.totalprice = tprice.toFixed(2);
    //   // this.totalprice = tprice - val > 0 ? tprice - val : 0;
    //   return this.totalprice;
    // },
    getPrice (obj) {
      this.totalprice = 0;
      this.sumnum = 0;
      if (obj == 0) {
        this.ticketType.forEach((item, index) => {
          this.totalprice += item.singleSum * item.num;
          this.sumnum += item.num;
        });
        this.totalprice = this.totalprice.toFixed(2);
        return this.totalprice;
      } else {
        switch (obj.applyType) {
          case "all":
          case "type":
            let duseCprice = 0;
            this.ticketType.forEach((item, index) => {
              duseCprice += item.num * item.singleSum;
              this.sumnum += item.num;
            });
            this.totalprice =
              duseCprice > obj.amount ? duseCprice - obj.amount : 0;
            this.totalprice = this.totalprice.toFixed(2);
            return this.totalprice;
            break;
          case "used":
            let dusetotalprice = 0,
              ucoupontotalp = 0,
              duseCouponprice;
            for (let i = 0; i < this.ticketType.length; i++) {
              dusetotalprice +=
                this.ticketType[i].singleSum * this.ticketType[i].num;
              for (let j = 0; j < obj.productInfos.length; j++) {
                if (
                  this.ticketType[i].modelCode ==
                  obj.productInfos[j].productCode
                ) {
                  ucoupontotalp +=
                    this.ticketType[i].singleSum * this.ticketType[i].num;
                }
              }
            }
            duseCouponprice = dusetotalprice - ucoupontotalp;
            ucoupontotalp =
              ucoupontotalp > obj.amount ? ucoupontotalp - obj.amount : 0;
            this.totalprice = ucoupontotalp + duseCouponprice;
            this.totalprice = this.totalprice.toFixed(2);
            break;
        }
      }
    },
    //支付
    wxpay () {
      //微信支付
      let _this = this;
      this.flagModal = false;
      let extendParamJson = JSON.stringify({
          orderInfo: this.orderInfo,
          openId: wx.getStorageSync("WxXjscUserInfo").openId
        });
      getData(this.api.main.pay.goPay, {
        accountId: merchantInfoId,
        extendParamJson:extendParamJson,
        operateId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
        payOrderNo: this.orderNo,
        paySum: this.totalprice,
        payType: this.payType,
        userType: "C",
        wayType: 6
      }).then(res => {
        if (res.payLink == false) {
          wx.navigateTo({
            url:
              "/pages/paymentSuccess/main?orderId=" +
              _this.orderNo +
              "&from=pay"
          });
          return;
        }
        let payData = JSON.parse(res.data);

        wx.requestPayment({
          timeStamp: payData.timestamp,
          nonceStr: payData.noncestr,
          package: payData.packagestr,
          signType: payData.signtype,
          paySign: payData.paysign,
          success: function (res) {
            wx.navigateTo({
              url:
                "/pages/paymentSuccess/main?orderId=" +
                _this.orderNo +
                "&from=pay"
            });
          },
          fail: function (res) { }
        });
      });
    },
    //支付弹框
    openPayModal () {
      this.canScroll = true;
      this.payShow = true;
      this.payAnimation.bottom("0rpx").step();
      this.payAnimationData = this.payAnimation.export();
    },
    closePayModal () {
      this.canScroll = false;
      if (this.flagModal == false) {
        this.payShow = false;
        this.payAnimation.bottom("-944rpx").step();
        this.payAnimationData = this.payAnimation.export();
      }
    },

    //优惠券弹框
    openCouponModal () {
      this.couponShow = true;
      this.handlecToggle(0);
    },
    closeCouponModal () {
      this.couponShow = false;
      this.handlecToggle(-375);
    },
    handlecToggle (num) {
      this.couponAnimation.right(num * 2 + "rpx").step();
      this.couponAnimationData = this.couponAnimation.export();
    },

    //表单验证
    checkMobile (val) {
      if (!/^1[345789]\d{9}$/.test(val)) {
        return true;
      }
    },
    checkIdcard (val) {
      if (
        !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
          val
        )
      ) {
        return true;
      }
    },
    subForm () {
      this.flag = true;
      if (!this.buyerName) {
        this.flag = false;
        wx.showToast({
          title: "联系人姓名不能为空！",
          duration: 2000,
          icon: "none"
        });
      }
      if (!this.buyerMobile) {
        this.flag = false;
        wx.showToast({
          title: "联系人手机号不能为空！",
          duration: 2000,
          icon: "none"
        });
      } else {
        if (this.checkMobile(this.buyerMobile)) {
          this.flag = false;
          wx.showToast({
            title: "请输入正确的手机号码！",
            duration: 2000,
            icon: "none"
          });
        }
      }
      if (this.buyerIdNo != "") {
        if (this.checkIdcard(this.buyerIdNo)) {
          this.flag = false;
          wx.showToast({
            title: "请输入正确的身份证号码！",
            duration: 2000,
            icon: "none"
          });
        }
      }
      // this.subFormShow = false;
      if (this.flag) {
        let modelCodes = [];
        let amounts = [];
        let paySum = 0;
        let formData = {
          modelCodes: "",
          leaguerId: "",
          buyerName: this.buyerName,
          buyerMobile: this.buyerMobile,
          buyerIdNo: this.buyerIdNo,
          merchantInfoId: merchantInfoId,
          amounts: "",
          wayType: 6,
          orderType: "hotel",
          marketingType: "",
          paySum: 0,
          startTime: this.beginDate,
          endTime: this.endDate,
          couponCode: this.couponCode
        };

        this.ticketType.forEach((item, index) => {
          modelCodes.push(item.modelCode);
          amounts.push(item.num);
          paySum += item.singleSum * item.num;
        });
        formData.paySum = paySum.toFixed(2);
        formData.modelCodes = modelCodes.join(",");
        formData.amounts = amounts.join(",");

        let _url = api.order.saveOrder;
        postData(_url, formData).then(
          result => {
            // this.subFormShow = true;
            if (result.status != "200") {
              wx.showToast({
                title: result.message,
                duration: 2000,
                icon: "none"
              });
            } else {
              this.orderNo = result.data.payOrderNo;
              this.orderInfo = result.data.orderDescription;
              this.orderId = result.data.id;
               getData("/merchant/api/merchantPayType/getMerchantPayType", {
                  businessType: "WXXCX"
                }).then(res => {
                  this.payType = JSON.parse(res.message)[0];
                  this.openPayModal(); //打开支付确认
                });
            }
          },
          reject => {
            // this.subFormShow = true;
          }
        );
      }
    },
    //常用联系人对接
    getContacts () {
      let cListUrl = this.api.contacts.getContactsList;
      let obj = {};
      if (wx.getStorageSync("WxXjscUserInfo").leaguerId) {
        obj = {
          leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId
        };
      }
      getData(cListUrl, obj).then(res => {
        this.contactList = res.data;
      });
    },
    //删除常用联系人
    delContact (id) {
      let _this = this;
      wx.showModal({
        title: "确定此删除联系人吗？",
        success: function (res) {
          if (res.confirm) {
            let delUrl = api.contacts.deleteContacts;
            getData(delUrl, {
              id: id
            }).then(res => {
              wx.showToast({
                title: res.message,
                duration: 2000
              });
              _this.getContacts();
            });
          } else if (res.cancle) {
          }
        }
      });
    },
    //常用联系人填充取票联系人
    fillContact (name, phone, certNo) {
      this.buyerName = name;
      this.buyerMobile = phone;
      this.buyerIdNo = certNo;
      this.closeModal();
    },
    //下单获取优惠券列表
    getCoupons () {
      this.openCouponModal();
      let couponUrl = this.api.main.marketing.useCoupons;
      let cpArr = [],
        modelprice = "";
      this.ticketType.forEach((item, index) => {
        cpArr.push(item.modelCode + "-" + item.singleSum * item.num);
      });
      modelprice = cpArr.join(",");
      getData(couponUrl, {
        userId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
        merchantInfoId: merchantInfoId,
        moldCodes: modelprice
      }).then(res => {
        this.couponList = res.data;
        this.couponList.forEach((item, index) => {
          // item.validStartDate = item.validStartDate.substr(0, 10);
          // item.validEndDate = item.validEndDate.substr(0, 10);
          item.amount = item.amount >= 1 ? item.amount.toFixed(2) : item.amount;
          return;
        });
      });
    },
    //使用优惠券
    useCoupon (obj) {
      this.couponCode = obj.code;
      // this.getPrice(obj.amount, obj.productCode);
      this.getPrice(obj);
      this.couponUserType = obj.useThreshold;
      if (this.couponUserType == "T") {
        this.couponUserNum = obj.targetAmout;
      }
      this.couponName = obj.name;
      this.closeCouponModal();
    },
    //返回
    dontuse (code) {
      // this.couponCode = "";
      // this.getPrice();
      this.closeCouponModal();
    },
    //不使用优惠券
    Undontuse () {
      this.couponCode = "";
      // this.getPrice(0);
      this.couponUserType = "";
      this.couponName = "";
      this.couponUserNum = "";
      this.closeCouponModal();
    }
  },

  onLoad () {
    //下单页面拦截授权
    let tUrl = api.member.info;
    getData(tUrl, {});
    //弹框动画
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    });
    this.payAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    });
    this.couponAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    });
    //获取缓存入住和离店日期
    this.beginDate = wx.getStorageSync("beginDate");
    this.endDate = wx.getStorageSync("endDate");
    //获取缓存票型信息
    let arr = [];
    arr = wx.getStorageSync("ticketType");

    this.ticketType = arr;

    // this.getPrice(0);
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onUnload () {
    this.flagModal = false;
    // this.closePayModal();
    this.closeModal();
    this.couponCode = "";
    // this.getPrice();
    this.couponUserType = "";
    this.couponName = "";
    this.couponUserNum = "";
    // this.closeCouponModal();
    if (wx.getStorageSync("xjsc_2018_linkMan")) {
      wx.removeStorageSync("xjsc_2018_linkMan");
    }
  },
  onShow () {
    this.flagShow = false;
    if (wx.getStorageSync("xjsc_2018_linkMan")) {
      let linkmanObj = wx.getStorageSync("xjsc_2018_linkMan");
      this.buyerName = linkmanObj.name;
      this.buyerMobile = linkmanObj.phone;
      this.buyerIdNo = linkmanObj.certNo;
    }
    this.getContacts();
    this.closeModal();
    this.closePayModal();
    this.closeCouponModal();
  }
};
</script>

<style lang="scss">
.info-order-body {
  background-color: #999;
  padding: 10px 0px;
  .info-order-block {
    background-color: #fff;
    border-radius: 5px;
    padding: 0px 9.5px;
    margin: 0px 10px 10px;
    .order-info-list {
      line-height: 39px;
      padding: 10px 0px;
      border-bottom: 0.5px solid #e2e2e2;
      .info-order-title {
        font-size: 19px;
        color: #333;
      }
      .info-order-sub-title {
        font-size: 16px;
        line-height: 36px;
      }
      .order-play-date{
        .order-play-date-item {
          font-size: 13px;
          line-height: 33px;
          padding-right: 8px;
          display: flex;
          justify-content: space-between;
          .order-play-date-detail {
            color: #333;
            .order-play-date-label {
              color: #999;
              margin-right: 18px;
            }
            .order-play-date-price {
              color: #ef0017;
            }
          }
          .order-play-date-number {
            color: #666;
          }
          .order-play-date-modify {
            color: #3399ff;
          }
        }
      }
    }
    .order-info-total {
      display: flex;
      justify-content: space-between;
      color: #333;
      line-height: 42px;
      div {
        color: #ef0017;
        font-size: 14px;
        i {
          font-size: 12px;
          display: inline;
        }
      }
    }
    .info-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      line-height: 45px;
      .head-title {
        .line {
          height: 16.5px;
          width: 2px;
          border-radius: 0.5px;
          display: inline-block;
          background: #f05b47;
          margin-right: 8px;
        }
        .text {
          display: inline-block;
          color: #413838;
          font-size: 18px;
          font-family: PingFangSC-Semibold, sans-serif;
        }
        .link-tips {
          font-size: 12px;
          color: #767676;
        }
      }
      .contacter-icon {
        width: 17px;
        height: 17px;
        position: absolute;
        top: -10px;
        right: -13px;
        padding: 15px;
      }
    }
    .buy-info-item {
      border-bottom: 0.5px solid #f0f2f7;
    }
  }
  .buyer-info {
    padding-left: 10px;
    padding-right: 0px;
  }
  .other-product-info-wrap {
    border: 5px solid #f0d9e0;
    margin: 0px 7.5px 10px;
    border-radius: 7.5px;
    .other-product-info {
      padding-left: 10px;
      border: 0.5px solid #ef0017;
      background-color: #fff;
      border-radius: 5px;
      .other-product-info-title {
        color: #333;
        line-height: 42px;
        padding-bottom: 2px;
        font-size: 16px;
        border-bottom: 0.5px solid #f0f2f7;
        .other-product-info-title-con {
          display: inline;
        }
      }
    }
  }
  .other-product-info-list {
    .other-product-info-item {
      display: flex;
      border-bottom: 0.5px solid #e2e2e2;
      padding-bottom: 12.5px;
      justify-content: space-between;
      .other-product-info-detail {
        line-height: 40px;
        padding-bottom: 8px;
        .other-product-info-item-title {
          color: #333;
          font-size: 15px;
        }
        .other-product-info-item-price {
          line-height: 24px;
          color: #ef0017;
          font-size: 13px;
          .other-product-info-item-unit {
            color: #999;
            display: inline;
          }
        }
      }
      .other-product-info-operate {
        padding-top: 40px;
      }
    }
  }
  .info-list {
    .info-list-title {
      height: 20px;
      line-height: 20px;
      .title-text {
        color: #413838;
        font-weight: bold;
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
      }
      .del-yk-icon {
        width: 12px;
        height: 13.5px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 15px;
      }
    }
    .info-item:last-child {
      border-bottom: none;
    }
    .info-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 13px;
      color: #333;
      position: relative;
      line-height: 45px;
      border-bottom: 0.5px solid #eeeee7;
      .info-radio, .info-radio-label {
        display: inline-block;
        vertical-align: middle;
      }
      .info-radio-label28 {
        margin-right: 28px;
      }
      .info-radio {
        margin-right: 6px;
        border-radius: 50%;
        width: 16.5px;
        height: 16.5px;
        text-align: center;
        border: 0.5px solid #a7a7a7;
        .info-radio-select {
          width: 6.5px;
          display: inline-block;
          vertical-align: top;
          margin-top: 5px;
          height: 6.5px;
          border-radius: 50%;
          background-color: #ef0017;
        }
      }
      .coupon-select {
        display: flex;
        flex-grow: 1;
        padding-right: 7.5px;
        justify-content: space-between;
      }
      .coupon-info-detail {
        flex-grow: 1;
        .coupon-info-detail-text {
          color: #333;
          font-size: 13px;
          span {
            color: #ef0017;
            display: inline-block;
          }
        }
        .coupon-info-detail-core {
          .coupon-core {
            margin-left: 8px;
            margin-right: 12px;
          }
          span, .coupon-info-detail-input {
            display: inline-block;
            vertical-align: middle;
          }
          .coupon-core {
            margin-left: 6px;
            margin-right: 10px;
          }
          .coupon-number {
            margin-left: 6px;
            margin-right: 0px;
          }
          .coupon-core, .coupon-number {
            width: 75px;
            height: 30px;
            line-height: 30px;
            border: 0.5px solid #bfbfbf;
            border-radius: 1px;
          }
        }
      }
      .info-title {
        width: 75px;
        font-family: PingFangSC-Regular, sans-serif;
      }
      .preview-img {
        width: 30px;
        height: 30px;
      }
      .input-style {
        color: rgba(65, 56, 56, 0.5);
        font-size: 14px;
        font-family: PingFangSC-Regular, sans-serif;
      }
      input {
        width: 255px;
      }
      .coupon-svg {
        font-size: 12px;
        color: #f05b47;
      }
      .coupons-icon {
        width: 9px;
        color: #f05b47;
        padding-left: 6.5px;
      }
      .camera-icon {
        width: 30px;
        height: 26.5px;
      }
      .camera-tips {
        color: rgba(65, 56, 56, 0.5);
        margin-left: 10px;
        font-size: 12px;
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
      .have-coupon {
        color: #3399ff;
        font-size: 13px;
      }
    }
    .info-item-core {
      align-items: top;
    }
    .info-item:last-child {
      margin-bottom: 0;
    }
  }
  .add-tourist {
    padding-left: 8px;
    .add-yk {
      width: 16px;
      height: 16px;
      display: inline-block;
      vertical-align: middle;
    }
    .yk-text {
      font-size: 14px;
      color: #f05b47;
      display: inline-block;
      vertical-align: middle;
      margin-left: 8px;
    }
  }
  .coupon-warper {
    background: #ffffff;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-top: 0;
    padding-right: 0px;
  }
  .dt-bottom-height {
    height: 50px;
  }
  .bottom-box {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 50px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    border-top: 0.5px solid #e5e5e5;
    align-items: center;
    line-height: 50px;
    font-family: PingFangSC-Regular, sans-serif;
    background: #ffffff;
    z-index: 700;
    .left-warper {
      margin-left: 15px;
      color: #ef0017;
      .bottom-label {
        font-size: 13px;
        display: inline;
        color: #333;
      }
      .bottom-price-unit {
        font-size: 12px;
        display: inline;
        margin: 0px 2px;
      }
      .bottom-price-number {
        font-size: 19px;
        margin-right: 15px;
        display: inline;
      }
      .bottom-price-coupon {
        font-size: 10px;
        line-height: 15px;
        padding: 0px 2px;
        vertical-align: middle;
        background-color: #fde7e9;
        border-radius: 7.5px;
        height: 15px;
        display: inline-block;
        .bottom-price-coupon-number {
          margin-left: 2px;
          text-decoration: line-through;
          display: inline;
        }
      }
    }
    .right-warper {
      margin-right: 10px;
      font-size: 12px;
      line-height: 35px;
      border-radius: 17.5px;
      text-align: center;
      width: 100px;
      color: #fff;
      background: -webkit-linear-gradient(left, #f01127 , #f74068); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #f01127, #f74068); /* Opera 11.1 - 12.0 */  
      background: -moz-linear-gradient(right, #f01127, #f74068); /* Firefox 3.6 - 15 */ 
      background: linear-gradient(to right, #f01127 , #f74068); /* 标准的语法 */ 
    }
  }

  .toast-box {
    .fixed-bottom {
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      width: 100%;
      background: #f05b47;
      color: #fff;
      font-size: 16px;
      height: 49px;
      line-height: 49px;
      font-family: PingFangSC-Regular, sans-serif;
    }
    .modal {
      position: fixed;
      left: 0;
      bottom: -100%;
      width: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background: #fff;
      height: 400px;
      // padding-top: 20px;
      z-index: 710;
      .modal-head {
        // padding: 0 15px 15px 15px;
        .close {
          font-size: 16.5px;
          color: #b2b2b2;
          padding: 15px;
          font-size: 23px;
        }
      }
      .modal-content {
        // height: 345px;
        overflow-y: scroll;
        .contacter-ul {
          padding-left: 15px;
          padding-right: 20px;
          .contacter-li {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            .c-li-left {
              width: 260px;
              .contacter-label {
                width: 17px;
                display: inline-block;
                vertical-align: middle;
              }
              .contacter-name {
                font-size: 14px;
                color: #413838;
              }
              .contacter-tel {
                height: 20px;
                line-height: 20px;
                .tel-icon {
                  width: 7.5px;
                  height: 11px;
                  display: block;
                }
                .tel-text {
                  font-size: 12px;
                  color: rgba(65, 56, 56, 0.7);
                  display: inline-block;
                  vertical-align: middle;
                }
              }
              .contacter-idcard {
                height: 20px;
                line-height: 20px;
                .idcard-icon {
                  width: 10.5px;
                  height: 8.5px;
                  display: block;
                }
                .idcard-text {
                  font-size: 12px;
                  color: rgba(65, 56, 56, 0.7);
                  display: inline-block;
                  vertical-align: middle;
                }
              }
            }
            .c-li-right {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .edit-icon {
                // float:right;
                width: 19px;
                height: 19.5px;
              }
              .del-icon {
                width: 16.5px;
                height: 18.5px;
                margin-left: 20px;
              }
            }
            .add-information {
              color: #f05b47;
              font-size: 11px;
            }
          }
        }
      }
    }
    .pay-modal {
      background: #f7f7f7;
      height: 167.5px;
      .pay-sure {
        background: transparent;
        .pay-money {
          height: 55px;
          line-height: 55px;
          text-align: center;
          font-size: 16px;
          font-family: PingFangSC-Regular, sans-serif;

          color: #fc4150;
          .title {
            color: #020403;
            margin-right: 10px;
          }
        }
        .pay-way {
          padding: 0 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 55px;
          .pay-info {
            height: 55px;
            line-height: 55px;
            .pay-svg {
              color: #1aad19;
              font-size: 30px;
              margin-right: 10px;
            }
            .pay-name {
              font-size: 14px;
              font-family: PingFangSC-Regular, sans-serif;
              color: #020403;
            }
          }
          .payway-radio {
            color: #1aad19;
            transform: scale(0.7);
          }
        }
        .pay-btn {
          height: 49px;
          line-height: 49px;
          background: #1aad19;
          color: #fff;
          text-align: center;
        }
      }
    }
    .camera-modal {
      background: #fff;
      height: 169px;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      padding-top: 0;
      .camera-content {
        background-color: #fff;
        .camera-do-ul {
          background-color: #fff;
          .camera-do-li {
            height: 55px;
            line-height: 55px;
            text-align: center;
            color: #020403;
            font-size: 16px;
            background-color: #fff;
          }
          .h10 {
            height: 10px;
            box-shadow: 0 10px 5px 0 rgba(242, 242, 242, 0.95);
          }
          .bb05 {
            border-bottom: 0.5px solid #d1d1d1;
            box-sizing: border-box;
          }
          .h49 {
            height: 49px;
            line-height: 49px;
          }
        }
      }
    }
    .coupon-modal {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      height: 100%;
      background: #fff;
      z-index: 710;
      overflow-y: scroll;
      .modal-content {
        .couponBody {
          position: absolute;
          // top: 69px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #f7f7f7;
          .coupons_list {
            padding-top: 12px;
            .item-ul {
              padding: 0 8px;
              .item-li {
                margin-bottom: 20px;
                height: 144px;
                background: url("http://statics.lotsmall.cn/wx/img/coupons-bg.png")
                  center center no-repeat;
                background-size: 100%;
                position: relative;
                .left {
                  display: inline-block;
                  width: 273px;
                  .name {
                    margin-top: 7px;
                    color: #fff;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, sans-serif;
                    padding-left: 14px;
                  }
                  .price {
                    padding-left: 40px;
                    color: #fff;
                    margin-top: 6px;
                    margin-bottom: 9px;
                    font-family: PingFangSC-Regular, sans-serif;
                    .unit {
                      font-size: 18px;
                    }
                    .num {
                      font-size: 35px;
                    }
                  }
                }
                .date-use {
                  position: absolute;
                  left: 15px;
                  bottom: 5px;
                  font-size: 9px;
                  color: #fff;
                  font-family: PingFangSC-Semibold, sans-serif;
                  .date {
                    margin-bottom: 2.5px;
                  }
                  .use {
                    margin-bottom: 5px;
                  }
                }
                .right {
                  height: 103px;
                  display: inline-block;
                  width: calc(100% - 273px);
                  text-align: center;
                  position: relative;
                  .right-btn {
                    border: none;
                    width: 66px;
                    height: 25px;
                    line-height: 25px;
                    border-radius: 2px;
                    background: #fff;
                    font-size: 14px;
                    color: #f05b47;
                    font-family: PingFangSC-Regular, sans-serif;
                    margin-top: 44px;
                    display: block;
                  }
                }
              }
            }
            .btn {
              display: block;
              color: #413838;
              border-radius: 6px;
              width: 90%;
              height: 38px;
              line-height: 38px;
              margin-left: 5%;
              text-align: center;
              font-size: 15px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(245, 245, 245, 0.5);
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
  .canvas-hide {
    position: fixed;
    right: -100%;
    top: 0;
  }
}
</style>
