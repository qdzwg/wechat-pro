<template>
  <div class="info-order"
       :class="{overflow:canScroll}">
    <navbar title='填写订单信息'></navbar>
    <div class="info-order-body">
      <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
        <div class="info-order-block">
          <div class="order-info-list">
            <div class="info-order-title">{{$root.$mp.query.productName}}</div>
            <div class="order-play-date">
              <div class="order-play-date-item">
                <div class="order-play-date-detail">
                  <span class="order-play-date-label">出游日期</span><span>{{dateOrigin_show}}</span>
                </div>
                <div class="order-play-date-modify" @click="toEditDate">修改</div>
              </div>
            </div>
          </div>
          <div class="order-info-list" v-for="(val, index) in buyed_ticket" :key="val.modelCodes">
            <div class="info-order-sub-title">{{val.nickName}}</div>
            <div class="order-play-date">
              <div class="order-play-date-item">
                <div class="order-play-date-detail">
                  <span class="order-play-date-price">{{val.priceSettle}}元</span>
                </div>
                <div class="order-play-date-number">数量*{{val.amounts}}</div>
              </div>
            </div>
          </div>
          <div class="order-info-total">
            <span>合计</span>
            <div>
              <i>￥</i>
              {{totalPrice}}元
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
            <div @click="idcardTypeChange" class="info-item">
              <div class="info-title">证件类型</div>
              <div>
                <span>{{idcardType==0?"身份证":(idcardType==1?"护照":(idcardType==2?"港澳通行证":"台湾通行证"))}}</span>
                <span class="search-border"></span>
              </div>
            </div>
            <div class="info-item">
              <div class="info-title">{{idcardType==0?"身份证":(idcardType==1?"护照":(idcardType==2?"港澳通行证":"台湾通行证"))}}</div>
              <input placeholder-class='input-style'
                    placeholder="请填写"
                    v-model="buyerIdNo">
            </div>
          </div>
        </div>
        
        <!-- <div class="other-product-info-wrap">
          <div class="other-product-info">
            <div class="other-product-info-title">
              <div class="other-product-info-title-con">
                可享超值套餐
              </div>
              <div class="other-product-info-attention">
                有效期：2019年11月18日当天有效
              </div>
            </div>
            <div class="other-product-info-list">
              <div class="other-product-info-item">
                <div class="other-product-info-detail">
                  <div class="other-product-info-item-title">adfasdfasdf</div>
                  <div class="other-product-info-item-price">
                    99.00元
                    <div class="other-product-info-item-unit">/份</div>
                  </div>
                </div>
                <div class="other-product-info-operate">
                  <numSpinner v-model="num"
                                :min="0"
                                :max="10"
                                :precision="0"
                                @on-change="changeNum"></numSpinner>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="coupon-warper info-list info-order-block">
          <div class="info-head buy-info-item">
            <div class="head-title">
              <span class="text">优惠政策</span>
            </div>
            <div></div>
          </div>
          <div class="info-item"
              @click="openCouponModal">
            <span class="info-title">优惠券</span>
            <div class="coupon-select">
              <span style="display:inline-block;width:100%" v-if="couponName">{{couponName}}</span>
              <span v-else class="have-coupon">您有{{couponList.length}}张优惠券</span>
              <i class="xx-icon icon-xiangyoujiantou coupon-svg coupons-icon"></i>
            </div>
          </div>
          <div class="info-item info-item-core" v-if="bonus.bonus">
            <div class="info-title">积分抵扣</div>
            <div class="coupon-info-detail">
              <!-- <div class="coupon-info-detail-text">
                可用积分
                <span>3000</span>
                ，可抵
                <span>￥30</span>
              </div> -->
              <div class="coupon-info-detail-core">
                <span>使用积分{{bonus.bonus}}</span>
                <span>抵扣￥{{bonus.price}}</span>
                <span @click='useBonusChange' class="coupon-info-detail-core-btn">{{bonus.useBonus?'不使用':'使用'}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="buyer-info info-order-block">
          <div class="info-list">
            <div class="info-item">
              <div class="info-title">备注</div>
              <input type="text"
                    placeholder-class='input-style'
                    maxlength="100"
                    placeholder="无"
                    v-model="remark">
            </div>
          </div>
        </div>
        <recommend :cities="cities"
                  :parkIds="parkIds"
                  :productCodes="productCodess"
                  :isOrder="true"
                  :ifShow="ifShow"></recommend>
        <div class="dt-bottom-height"></div>
        <div class="bottom-box">
          <div class="left-warper">
            <div class="bottom-label">总额</div>
            <div class="bottom-price-unit">￥</div>
            <div class="bottom-price-number">{{totalPrice}}</div>
            <div class="bottom-price-coupon" v-if="couponCode">优惠费用 
              <div class="bottom-price-coupon-number">￥{{couponAmount}}</div>
            </div>
          </div>
          <div class="right-warper"
              @click="subFormsubForm">
            提交订单
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
                <span>￥{{totalPrice}}</span>
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

    <um-author ref="um_author" @success="getCoupons"></um-author>
  </div>
</template>

<script>
// Use Vuex
import api from "@/api/api";
import { getData, postData, merchantInfoId, host } from "@/common/common";
import umAuthor from '@/components/author.vue';
import navbar from "@/components/navbar";
import definedPicker from "@/components/definedpicker";
import recommend from '@/components/recommend'
// import upng from "@/common/upng-js/UPNG.js";
import numSpinner from "@/components/numSpinner";
import sha1 from "sha1";
export default {
  components: {
    navbar,
    definedPicker,
    numSpinner,
    umAuthor,
    recommend
  },
  data () {
    return {
      bonus: {
        bonus: 0,
        price: 0,
        useBonus: false
      },
      idcardTypeListShow: false,
      ifShow:false,
      idcardType: 0,
      idcardTypeList: [
        {
          value: 0,
          name: "身份证"
        },
        {
          value: 1,
          name: "护照"
        },
        {
          value: 2,
          name: "港澳通行证"
        },
        {
          value: 3,
          name: "台湾通行证"
        }
      ],
      dateOrigin_show:'', // 当前所选日期
      num:0, // 超值套餐数量
      dateOrigin: '', // 当前游玩时间
      buyed_ticket: [], // 已选择要购买的票型列表
      subFormShow: true,
      couponAmount: '',
      couponName: "", //优惠券名称
      couponUserType: "", //优惠券  优惠活动
      couponUserNum: "", //优惠券使用门槛
      animation: null,
      animationData: {},
      show: false,
      ticketType: [],
      sumnum: 0,
      totalPrice: 0,
      buyerName: "",
      buyerMobile: "",
      buyerIdNo: "",
      remark: "",
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
      canScroll: false, //是否允许页面滑动
      cities:'',
      parkIds:'',
      productCodess:'',
      
    };
  },
  // computed: {
  //   _Price:function(){
  //     let num=0;
  //     this.buyed_ticket.forEach(val=>{
  //       let _num=val.priceSettle!==undefined?Number(val.priceSettle):0;
  //       num+=_num*val.amounts;
  //     });
  //     return num.toFixed(2);
  //   },
  //   dateOrigin_show:function(){
  //     return this.dateOrigin.replace(/\-/g, '/');
  //   }
  // },
  methods: {
    merchantChange(item) {
      this.idcardType = item.value;
      this.pickerCancel()
    },
    pickerCancel() {
      this.idcardTypeListShow = false;
    },
    idcardTypeChange() {
      console.log('---------------------------idcardTypeListShow')
      this.idcardTypeListShow = true;
    },
    toEditDate(){
      wx.navigateBack({
        delta: 1
      });
    },
    changeNum(num){

    },
    subFormsubForm() {
      if(this.buyerName.replace(/\s+/g, '')==''){
        wx.showToast({
          title: '姓名不能为空!',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if(this.buyerMobile.replace(/\s+/g, '')==''){
        wx.showToast({
          title: '联系电话不能为空!',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if(this.checkMobile(this.buyerMobile.replace(/\s+/g, ''))){
        wx.showToast({
          title: '联系电话格式错误!',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if(this.buyerIdNo.replace(/\s+/g, '')==''){
        wx.showToast({
          title: '身份证不能为空!',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if(this.checkIdcard(this.buyerIdNo.replace(/\s+/g, ''))&&this.idcardType==0){
        wx.showToast({
          title: '身份证格式错误!',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      let codesArr=[];
      let amountsArr=[];
      let realNamesArr=[];
      let totalPrice = 0;
      this.buyed_ticket.forEach(val=>{
        totalPrice += val.priceSettle * val.amounts;
        codesArr.push(val.modelCodes);
        amountsArr.push(val.amounts);
        realNamesArr.push({
          code:val.modelCodes,
          list:[
            {
              name:this.buyerName,
              idNo:this.buyerIdNo,
              idcardType:'ID'
            }
          ]
        });
      });

      let json={
        modelCodes:codesArr.join(','),
        amounts:amountsArr.join(','),
        leaguerId:wx.getStorageSync("WxXjscUserInfo").leaguerId || 1419,
        buyerName:this.buyerName,
        buyerMobile:this.buyerMobile,
        buyerIdNo:this.buyerIdNo,
        buyerIdNoType: this.idcardType,
        merchantInfoId:Number(merchantInfoId),
        startTime:this.dateOrigin_show.replace(/\//g, '-'),
        wayType:6,
        orderType:'park',
        marketingType:0,
        // paySum:Number(this.totalPrice),
        // realNames:JSON.stringify(realNamesArr)
        realNames:'[]',  // 实名制信息暂时传空
        couponCode: this.couponCode
      };
      if(this.remark.replace(/\s+/g, '')!=='')json.remark=this.remark;
      if(this.bonus.useBonus){
        json.deductionBonus = this.bonus.bonus;
        json.deductionMoney = this.bonus.price;
      }
      json.paySum = totalPrice.toFixed(2);
      postData(api.order.saveOrder, json).then(data=>{
        console.log(data)
        if(data.status==200){
          let orderNo = data.data.payOrderNo;
          let orderInfo = data.data.orderDescription;
          let orderId = data.data.id;
          getData("/merchant/api/merchantPayType/getMerchantPayType", {
            businessType: "WXXCX"
          }).then(res => {
            let payType = JSON.parse(res.message)[0];
            this.goUrl(`pages/order/pay/main?orderNo=${orderNo}&orderInfo=${orderInfo}&orderId=${orderId}&payType=${payType}&totalPrice=${this.totalPrice}`);
          });
        }
      });
    },
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
    getPrice (obj) {
      this.totalPrice = 0;
      this.sumnum = 0;
      if (obj == 0) {
        this.ticketType.forEach((item, index) => {
          this.totalPrice += item.priceSettle * item.amounts;
          this.sumnum += item.amounts;
        });
        this.totalPrice = this.totalPrice.toFixed(2);
      } else {
        switch (obj.applyType) {
          case "all":
          case "type":
            let duseCprice = 0;
            this.ticketType.forEach((item, index) => {
              duseCprice += item.amounts * item.priceSettle;
              this.sumnum += item.amounts;
            });
            this.totalPrice =
              duseCprice > obj.amount ? duseCprice - obj.amount : 0;
            this.totalPrice = this.totalPrice.toFixed(2);
            break;
          case "used":
            var dusetotalPrice = 0,
              ucoupontotalp = 0,
              duseCouponprice;
            for (let i = 0; i < this.ticketType.length; i++) {
              dusetotalPrice +=
                this.ticketType[i].priceSettle * this.ticketType[i].amounts;
              for (let j = 0; j < obj.productInfos.length; j++) {
                if (
                  this.ticketType[i].modelCodes ==
                  obj.productInfos[j].productCode
                ) {
                  ucoupontotalp +=
                    this.ticketType[i].priceSettle * this.ticketType[i].amounts;
                }
              }
            }
            duseCouponprice = dusetotalPrice - ucoupontotalp;
            ucoupontotalp =
              ucoupontotalp > obj.amount ? ucoupontotalp - obj.amount : 0;
            this.totalPrice = ucoupontotalp + duseCouponprice;
            this.totalPrice = this.totalPrice.toFixed(2);
            break;
          case "selleruse":
            var dusetotalPrice = 0,
              ucoupontotalp = 0,
              duseCouponprice;
            for (let i = 0; i < this.ticketType.length; i++) {
              dusetotalPrice +=
                this.ticketType[i].priceSettle * this.ticketType[i].amounts;
              for (let j = 0; j < obj.productInfos.length; j++) {
                if (
                  this.ticketType[i].modelCodes ==
                  obj.productInfos[j].productCode
                ) {
                  ucoupontotalp +=
                    this.ticketType[i].priceSettle * this.ticketType[i].amounts;
                }
              }
            }
            duseCouponprice = dusetotalPrice - ucoupontotalp;
            ucoupontotalp =
              ucoupontotalp > obj.amount ? ucoupontotalp - obj.amount : 0;
            this.totalPrice = ucoupontotalp + duseCouponprice;
            this.totalPrice = this.totalPrice.toFixed(2);
            break;
        }
      }
      let codesArr=[];
      let amountsArr=[];
      let realNamesArr=[];
      let bonusDeductionJson = {
        totalPrice: this.totalPrice,
        deductions: []
      };
      this.buyed_ticket.forEach(val=>{
        codesArr.push(val.modelCodes);
        amountsArr.push(val.amounts);
        let obj = {
          productCode: val.modelCodes,
          price: val.priceSettle,
          num: val.amounts
        };
        bonusDeductionJson.deductions.push(obj);
        realNamesArr.push({
          code:val.modelCodes,
          list:[
            {
              name:this.buyerName,
              idNo:this.buyerIdNo,
              idcardType:'ID'
            }
          ]
        });
      });

      let json={
        modelCodes:codesArr.join(','),
        amounts:amountsArr.join(','),
        leaguerId:wx.getStorageSync("WxXjscUserInfo").leaguerId,
        buyerName:this.buyerName,
        buyerMobile:this.buyerMobile,
        buyerIdNo:this.buyerIdNo,
        buyerIdNoType: this.idcardType,
        merchantInfoId:Number(merchantInfoId),
        startTime:this.dateOrigin_show.replace(/\//g, '-'),
        wayType:6,
        orderType:'park',
        marketingType:0,
        paySum:Number(this.totalPrice),
        // realNames:JSON.stringify(realNamesArr)
        bonusDeductionJson: JSON.stringify(bonusDeductionJson),
        realNames:'[]',  // 实名制信息暂时传空
        couponCode: this.couponCode
      };
      if(this.remark.replace(/\s+/g, '')!=='')json.remark=this.remark;
      this.bonusDeductionUsingGET(json,this.deductionsPrice);
    },
    useBonusChange() {
      this.bonus.useBonus = !this.bonus.useBonus;
      this.priceBonus()
    },
    priceBonus() {
      if(this.bonus.price){
        if(this.bonus.useBonus){
          this.totalPrice = this.totalPrice * 1 - this.bonus.price;
        }else{
          this.totalPrice = this.totalPrice * 1 + this.bonus.price;
        }
        this.totalPrice = this.totalPrice.toFixed(2);
      }
    },
    deductionsPrice(res) {
      if(res.data&&res.data.bonus){
        this.bonus.bonus = res.data.bonus;
        this.bonus.price = res.data.price;
        if(this.bonus.useBonus){
          this.totalPrice = this.totalPrice * 1 - this.bonus.price;
          this.totalPrice = this.totalPrice.toFixed(2);
        }
      }
      console.log(this.bonus)
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
        paySum: this.totalPrice,
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
      }else{
        return false;
      };
    },
    checkIdcard (val) {
      if (
        !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
          val
        )
      ) {
        return true;
      }else{
        return false;
      };
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
      let couponUrl = this.api.main.marketing.useCoupons;
      let cpArr = [],
        modelprice = "";
      this.ticketType.forEach((item, index) => {
        cpArr.push(item.modelCodes + "-" + item.priceSettle * item.amounts);
      });
      modelprice = cpArr.join(",");
      getData(couponUrl, {
        userId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
        merchantInfoId: merchantInfoId,
        moldCodes: modelprice
      }).then(res => {
        if(res.status==200){
          this.getPrice(0);
          this.couponList = res.data;
          this.couponList.forEach((item, index) => {
            // item.validStartDate = item.validStartDate.substr(0, 10);
            // item.validEndDate = item.validEndDate.substr(0, 10);
            item.amount = item.amount >= 1 ? item.amount.toFixed(2) : item.amount;
            return;
          });
        }else if(data.status==410){
          this.$refs.um_author.toShowDate();
        }
      }).catch(err=>{
        if(err.status == 410)this.$refs.um_author.toShowDate();
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
      this.couponAmount = obj.amount;
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
      this.getPrice(0);
      this.couponAmount = "";
      this.couponUserType = "";
      this.couponName = "";
      this.couponUserNum = "";
      this.closeCouponModal();
    },
    setLeaguerInfo(res) {
      this.fillContact(res.data.realName||'',res.data.mobile||'',res.data.idcard||'');
    }
  },

  onLoad () {
    this.getLeaguerInfo(this.setLeaguerInfo);
    //推荐产品 参数
    this.cities = wx.getStorageSync("wxxcx_citys");
    this.productCodess = wx.getStorageSync('xjsc_merchantProductCode')
    if(this.productCodess && this.productCodess != ''){
      this.ifShow = true
    }
    this.parkIds = wx.getStorageSync('xjsc_merchantParkId')
    console.log(this.$root.$mp.query)
    this.buyed_ticket=JSON.parse(this.$root.$mp.query.buyed_ticket);
    this.dateOrigin_show=this.$root.$mp.query.date;
    this.dateOrigin=this.$root.$mp.query.date;
    //下单页面拦截授权
    /*let tUrl = api.member.info;
    getData(tUrl, {});*/
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

    //获取缓存票型信息
    let arr = [];
    // arr = wx.getStorageSync("ticketType");

    this.ticketType = this.buyed_ticket;

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
    this.bonus= {
        bonus: 0,
        price: 0,
        useBonus: false
      };
    this.couponAmount = "";
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
    // this.getContacts();
    this.closeModal();
    this.closePayModal();
    this.closeCouponModal();
  },
  mounted(){
    this.$refs.um_author.toCloseDate();
    /*setTimeout(()=>{
      this.$refs.um_author.toShowDate();
    }, 1000);*/
    this.getCoupons(); // 获取优惠券
  }
};
</script>

<style lang="scss">
.info-order-body {
  background: -webkit-linear-gradient(to bottom, #000 , #f0f2f7, #f0f2f7); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(to bottom, #000, #f0f2f7, #f0f2f7); /* Opera 11.1 - 12.0 */  
  background: -moz-linear-gradient(to bottom, #000, #f0f2f7, #f0f2f7); /* Firefox 3.6 - 15 */ 
  background: linear-gradient(to bottom, #000 , #f0f2f7, #f0f2f7); /* 标准的语法 */ 
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
      line-height: 40px;
      padding-bottom: 5px;
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
        .other-product-info-attention {
          display: inline;
          color: #999;
          font-size: 10px;
          padding-left: 18px;
          // background-image: url('../../../../assets/icon/gantanhao1.png');
          background-repeat: no-repeat;
          background-position: left center;
          background-size: 10px;
        }
      }
      .other-product-info-list {
        .other-product-info-item {
          display: flex;
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
            margin-right: 10px;
            padding-top: 30px;
          }
        }
      }
    }
  }
  .hotel-list {
    margin-bottom: 10px;
    background: #ffffff;
    padding: 20px 15px;
    .hotel-item {
      padding-bottom: 11px;
      width: 100%;
      .hotel-item-main {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .hotel-info {
          display: flex;
          align-items: center;
          .hotel-name {
            width: 187px;
            padding-right: 15px;
            font-size: 14px;
            color: #413838;
            font-family: PingFangSC-Regular, sans-serif;
            display: inline-block;
            vertical-align: middle;
          }
          .hotel-num {
            font-size: 15px;
            font-family: PingFangSC-Regular, sans-serif;
            color: #767676;
            // width: 60px;
            display: inline-block;
            vertical-align: middle;
            padding-left: 15px;
            .unit {
              font-size: 12px;
            }
            .fq-idcard {
              margin-left: 10px;
              image {
                width: 15.5px;
                height: 12.5px;
              }
            }
          }
        }
        .hotel-price {
          font-size: 12px;
          color: #413838;
          font-family: PingFangSC-Regular, sans-serif;
          display: inline-block;
          vertical-align: middle;
          .price {
            font-size: 16px;
            margin-left: 4.5px;
          }
        }
      }
      .real-list-box {
        .info-list {
          padding: 0;
          .info-item {
            margin-bottom: 0;
            .info-title {
              font-size: 10px;
            }
            input {
              font-size: 10px;
            }
          }
        }
      }
    }
    .hotel-item:last-child {
      padding-bottom: 0;
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
      .search-border {
        margin-left: 4px;
        padding: 0px;
        border: 4px solid transparent;
        border-top: 4px solid #000;
        vertical-align: middle;
        display: inline-block;
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
      font-size: 16px;
      line-height: 35px;
      border-radius: 17.5px;
      text-align: center;
      width: 88px;
      color: #fff;
      background: -webkit-linear-gradient(to right, #f01127 , #f74068); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(to right, #f01127, #f74068); /* Opera 11.1 - 12.0 */  
      background: -moz-linear-gradient(to right, #f01127, #f74068); /* Firefox 3.6 - 15 */ 
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
  .coupon-info-detail-core-btn {
    display: inline-block;
    padding: 0px 10px;
    margin-left: 10px;
    line-height: 30px;
    color: #fff;
    background-color: #f05b47;
  }
  .canvas-hide {
    position: fixed;
    right: -100%;
    top: 0;
  }
}
</style>
