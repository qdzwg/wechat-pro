<template>
    <div v-if="contentShow"
         class="member-wrap"
         v-bind:style="{'background-color':memberData.pageSetData.color?'#eff1f6':memberData.pageSetData.color}">
        <navbar :backShow="false"
                :title="memberData.pageSetData.title"></navbar>
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px')}">
            <div class="member-banner">
                <template v-if="show">
                    <div class="bg-img"
                         style="">
                        <img src="https://cdn.51dmq.com/ui/showImg/member_bg2.png" />
                        <!-- <img
              :src="memberData.contentData.imgUrl?memberData.contentData.imgUrl:personCenterBg?personCenterBg:'http://statics.lotsmall.cn/wx/img/default-memberbg.jpg'"
            />-->
                    </div>
                    <!-- 登录 -->
                    <div class="member-info"
                         v-bind:style="{textAlign:memberData.contentData.position}"
                         v-if="isLogin">
                        <p class="member-touxiang"
                           :class="{fl:memberData.contentData.position=='left',fr:memberData.contentData.position=='right',cer:memberData.contentData.position=='center'}"
                           @click="goUrl('pages/member/edit/main')">
                            <img :src="userInfo.avatarUrl" />
                        </p>
                        <div class="detail">
                            <p class="member-name">
                                <em>Hi~</em>
                                {{userInfo.nickName}}
                            </p>
                            <p class="member-jifen">
                                积分
                                <em>{{score||0}}</em>
                            </p>
                        </div>
                    </div>
                    <i class="member-set"
                       v-if="isLogin"
                       @click="goUrl('pages/member/edit/main')"></i>
                    <!-- 未登录 -->
                    <div class="noLogin"
                         v-else>
                        <h1>Hi~宋城·欢迎您！</h1>
                        <h2>给您带来好心情</h2>
                        <a href="javascript:;"
                           @click="logins">登录/注册</a>
                    </div>
                </template>
                <!-- <template v-else>
        <button open-type="getUserInfo" @getuserinfo='getUserInfo'>授权</button>
        </template>-->
            </div>
            <!-- <button @click="goUrl('pages/testpage/list/main')">艾比入口</button> -->
            <div class="member-nav boxshadow">
                <p class="my-order">
                    我的订单
                    <span @click="goswitchTab('')">全部订单</span>
                    <!-- <span @click="goswitchTab('all')">全部订单</span> -->
                </p>
                <div class="nav-ul">
                    <!-- <div class="nav-li" @click="goswitchTab('all')">
            <img src="http://statics.lotsmall.cn/wx/img/order-icon.png" class="order-icon" />
            <p class="order-text nav-li-text">全部订单</p>
          </div>-->
                    <div class="nav-li"
                         @click="goswitchTab('WAIT_PAY')">
                        <img src="https://cdn.51dmq.com/ui/showImg/fukuan-icon.png"
                             class="fukuan-icon" />
                        <p class="fukuan-text nav-li-text">待支付</p>
                    </div>
                    <div class="nav-li"
                         @click="goswitchTab('WAIT_CONSUME')">
                        <img src="https://cdn.51dmq.com/ui/showImg/xiaofei-icon.png"
                             class="xiaofei-icon" />
                        <p class="xiaofei-text nav-li-text">待出行</p>
                    </div>
                    <div class="nav-li"
                         @click="goswitchTab('FINISH')">
                        <img src="https://cdn.51dmq.com/ui/showImg/gouxuan-icon.png"
                             class="gouxuan-icon" />
                        <p class="gouxuan-text nav-li-text">已完成</p>
                    </div>
                    <div class="nav-li"
                         @click="goswitchTab('REFUNDING')">
                        <img src="https://cdn.51dmq.com/ui/showImg/shouhou-icon.png"
                             class="shouhou-icon" />
                        <p class="shouhou-text nav-li-text">退款</p>
                    </div>
                </div>
            </div>
            <div class="coupons-box my-coupons-box boxshadow">
                <div class="coupons-ul">
                    <div class="coupons-li clearfix"
                         @click="goUrl('pages/member/coupon/main?tab=2')">
                        <i></i>
                        <div class="coupons-flex">
                            <span class="item-title">优惠券</span>
                            <span>
                                <em class="coupons">{{couponsNum}}个</em>
                                <img src="http://statics.lotsmall.cn/wx/img/arrow-left-icon.png"
                                     class="arrow-left-icon" />
                            </span>
                        </div>
                    </div>
                    <div class="coupons-li clearfix"
                         @click="goUrl('pages/member/show/main?tab=2')">
                        <i></i>
                        <div class="coupons-flex">
                            <span class="item-title">我的节目</span>
                            <img src="http://statics.lotsmall.cn/wx/img/arrow-left-icon.png"
                                 class="arrow-left-icon" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="member-item boxshadow clearfix" @click="goUrl('pages/member/group/main')">
                <span class="item-title">我的拼团</span>
                <img src="http://statics.lotsmall.cn/wx/img/arrow-left-icon.png" class="arrow-left-icon">
            </div>-->
            <div class="coupons-box boxshadow">
                <div class="coupons-ul">
                    <!-- <div class="coupons-li clearfix"
                         @click="goUrl('pages/member/coupon/mycoupon/main')">
                        <i></i>
                        <span class="item-title">我的优惠券</span>
                        <img src="http://statics.lotsmall.cn/wx/img/arrow-left-icon.png"
                             class="arrow-left-icon" />
                    </div>
                    <div class="coupons-li clearfix"
                         @click="goUrl('pages/member/coupon/mycoupon/main')">
                        <i></i>
                        <span class="item-title">领取优惠券</span>
                        <img src="http://statics.lotsmall.cn/wx/img/arrow-left-icon.png"
                             class="arrow-left-icon" />
                    </div> -->
                    <div class="coupons-li clearfix"
                         @click="callSmb(tel)">
                        <!-- <div class="coupons-li clearfix" @click="goUrl('pages/member/topContacts/main')"> -->
                        <i></i>
                        <div>
                            <span class="item-title">客服中心</span>
                            <em class="tel">{{tel}}</em>
                        </div>
                        <!-- <img src="http://statics.lotsmall.cn/wx/img/arrow-left-icon.png"
                            class="arrow-left-icon" /> -->
                    </div>
                    <!-- <div class="coupons-li clearfix" @click="goUrl('pages/webView/main?src=' + url)">
                        <i></i>
                        <span class="item-title">投诉建议</span>
                        <img
                        src="http://statics.lotsmall.cn/wx/img/arrow-left-icon.png"
                        class="arrow-left-icon"/>
                    </div> -->
                    <div v-if="dzfpShow"
                         class="coupons-li clearfix"
                         @click="goUrl('pages/member/invoice/main')">
                        <i></i>
                        <span class="item-title">电子发票</span>
                        <img src="http://statics.lotsmall.cn/wx/img/arrow-left-icon.png"
                             class="arrow-left-icon" />
                    </div>
                </div>
            </div>

            <!-- <div class="member-item boxshadow" @click="goUrl('pages/paymentFail/main')">
            <span class="item-title">支付失败</span>
      </div>-->
            <!-- <div class="h49"></div> -->
        </div>
        <um-author ref="um_author"
                   @success="getCoupons"></um-author>
        <vue-tab-bar v-if="componentShow"
                     :pageData="navigationData"
                     @fetch-index="clickIndexNav"
                     :selectNavIndex="selectNavIndex"></vue-tab-bar>
    </div>
</template>
<script>
    import { getData, postData, host, merchantInfoId } from "@/common/common.js";
    import navbar from "@/components/navbar";
    import umAuthor from '@/components/author';
    import vueTabBar from "@/components/customCom/vueTabBar"; //底部导航
    export default {
        components: {
            navbar,
            vueTabBar,
            umAuthor
        },
        data() {
            return {
                show: false,
                userInfo: {},
                personCenterBg: "",
                navigationData: {},
                selectNavIndex: 2,
                memberData: {},
                componentShow: false,//是否展示底部导航
                contentShow: false,
                url: "",
                dzfpShow: false,
                isLogin: true,
                score: '',
                couponsNum: 0,
                tel: '400-888-9888'//客服电话
            };
        },
        onLoad() {

            //sea  接口
            // getData('/leaguer/api/order/manage/orderPage?currPage=0&pageSize=10&merchantInfoId=245',{orderStatus:'3,14'}).then(res=>{
            //   console.log("接口",res)
            // })
            let _this = this;
            wx.login({
                success: function (res) {
                    console.log(res);
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
                            method: "POST",
                            success: function (userRes) {
                                let opendId = userRes.data.data.openId;
                                // getData(
                                //   "/merchant/api/merchantWholeMarket/getMerchantWholeMarket"
                                // ).then(res => {
                                //   let corpCode = res.data.marketDisAccount;
                                //   // getData('/qyyxcs.sendinfo.com.cn/wap/enterPromote.htm',{
                                //   //   wayType:1,
                                //   //   flag:'3',
                                //   //   corpCode:corpCode,
                                //   //   openId:opendId,
                                //   //   ixmgUrl:''
                                //   // })
                                //   let userInfo = wx.getStorageSync("WxXjscUserInfo");
                                //   wx.request({
                                //     url: "http://qyyxcs.sendinfo.com.cn/wap/enterPromote.htm",
                                //     data: {
                                //       merchantInfoId: merchantInfoId,
                                //       wayType: 1,
                                //       flag: "3",
                                //       corpCode: corpCode,
                                //       openId: opendId,
                                //       ixmgUrl: ""
                                //     },
                                //     method: "GET",
                                //     header: {
                                //       "content-type": "application/json", // 默认值
                                //       "access-token": userInfo.token ? userInfo.token : ""
                                //     },
                                //     method: "GET",
                                //     success: function(res) {
                                //       console.log(res);
                                //       _this.url = encodeURIComponent(
                                //         "http://qyyxcs.sendinfo.com.cn/wap/loginWapAuthor.htm?username=" +
                                //           res.data.username +
                                //           "&password=" +
                                //           res.data.password
                                //       );
                                //     }
                                //   });
                                //   // _this.url = encodeURIComponent(
                                //   //   "https://testwap.lotsmall.cn/member/salesPromotion?m_id=" +
                                //   //     wx.getStorageSync("xjsc_merchantInfoId") +
                                //   //     "&isQy=T&openId=" +
                                //   //     opendId +
                                //   //     "&corpCode=" +
                                //   //     corpCode
                                //   // );
                                //   console.log(_this.url);
                                // });
                            }
                        });
                    }
                }
            });

            console.log(this.url);
            this.navigationData = wx.getStorageSync("getNavigationData");
            this.navigationData.range.map(item => {
                if (item == "personalpage") {
                    this.componentShow = true;
                }
            });
            //获取积分
            getData('/leaguer/api/bonus/get', {
                leaguerInfoId: wx.getStorageSync("WxXjscUserInfo").leaguerId
            }).then(res => {
                this.score = res.data
                console.log("获取积分", res)
            }).catch(err => {
                if (err.status == 410) this.$refs.um_author.toShowDate();
            });
            //获取优惠券
            getData('/marketing/api/marketingCoupon/listCouponDetailVoPage', {
                currPage: 1,
                pageSize: 10000,
                status: 1,
                userId: wx.getStorageSync("WxXjscUserInfo").leaguerId
            }).then(res => {
                console.log("============res", res)
                if (res.status == 200) {
                    this.couponsNum = res.data.total
                }
            }).catch(error => {
                if (error.status == 410) this.$refs.um_author.toShowDate();
                console.log("error", error)
            })
            getData(this.api.aiPapi.getUsePage, {
                merchantInfoId: merchantInfoId,
                pageType: "centerPage",
                useRange: "small"
            }).then(res => {
                this.memberData = JSON.parse(res.data.content);
                this.contentShow = true;
                console.log("这是memberdata", this.memberData);
            }).catch(error => {
                console.log("error", error)
                if (error.status == 410) this.$refs.um_author.toShowDate();
            })

            getData(
                this.api.main.findPicInfo + "?merchantInfoId=" + merchantInfoId
            ).then(res => {
                this.personCenterBg = res.data.mainPageTop[0].picAddr;
            }).catch(error => {
                console.log("error", error)
                if (error.status == 410) this.$refs.um_author.toShowDate();
            })
            //推广
            // getData("/marketing/api/marketElectronicInvoices/enabledInvoiceReq").then(
            //   res => {
            //     this.dzfpShow = res.data && res.data.flag == 1;
            //   }
            // );
        },
        onShow() {
            // getData(
            //   this.api.main.findPicInfo + "?merchantInfoId=" + merchantInfoId
            // ).then(res => {
            //   this.personCenterBg = res.data.personCenterBg[0].picAddr;
            //   console.log(this.personCenterBg)
            // });
            this.getUserInfo();
            this.ToLogin()
        },
        methods: {

            callSmb(phone) {
                wx.makePhoneCall({
                    phoneNumber: phone
                })
            },
            toCoupon() {
                wx.navigateTo({
                    url: "/pages/member/coupon/main"
                })
            },
            logins() {
                console.log("aaaaaaaaaaaaaaaa")
                wx.navigateTo({
                    url: "/pages/member/main?flag=true"
                });
            },
            ToLogin() {
                console.log(this.$root.$mp.query)
                if (this.$root.$mp.query.flag == 'true') {
                    this.isLogin = true
                    // console.log("-----------",this.isLogin)
                }
            },
            getUserInfo() {
                let _this = this;
                // 查看是否授权
                wx.getSetting({
                    success: function (res) {
                        if (res.authSetting["scope.userInfo"]) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                            wx.getUserInfo({
                                success: function (res) {
                                    _this.userInfo = res.userInfo;
                                    _this.show = true;
                                    console.log("微信返回用户信息", res)
                                }
                            });
                        } else {
                            wx.setStorageSync(
                                "xjsc_2018_order_url_asds",
                                getCurrentPages().pop().__route__
                            );
                            wx.reLaunch({
                                url: "/pages/authorization/main"
                            });

                            // wx.redirectTo({
                            //   url: "/pages/authorization/main"
                            // });
                        }
                    }
                });
            },
            goUrl(path) {
                this.navigatePageTo(this.router + path);
            },
            goswitchTab(state) {
                wx.setStorageSync("wxxjsc_orderstate_2019_9_18", state);
                wx.navigateTo({
                    url: "/pages/member/order/main"
                });
            }
        }
    };
</script>
<style lang='scss'>
    .member-wrap {
        font-family: PingFang SC Medium;
        width: 100%;
        height: calc(100vh - 80px);
        position: relative;
        .member-banner {
            width: 100%;
            position: relative;
            // background-color: #fff;
            .noLogin {
                position: absolute;
                top: 33.5px;
                left: 33.5px;
                color: #fff;
                h1 {
                    display: block;
                    font-size: 21px;
                    letter-spacing: 3px;
                }
                h2 {
                    font-family: PingFang SC Regular;
                    display: block;
                    font-size: 12px;
                    margin-top: 5px;
                    margin-bottom: 18px;
                }
                a {
                    display: inline-block;
                    width: 100px;
                    height: 38px;
                    line-height: 38px;
                    text-align: center;
                    font-size: 16px;
                    color: #ef0017;
                    background: #fff;
                    border-radius: 19px;
                }
            }

            .bg-img {
                width: 100%;
                height: 210px;
                z-index: 1;
                // background: linear-gradient(to right,#f7426c,#ef0118);
                // border-bottom-left-radius: 30%;
                // border-bottom-right-radius: 30%;
            }
            image {
                width: 100%;
                height: 100%;
            }
            .member-set {
                position: absolute;
                top: 37.5px;
                right: 16.5px;
                display: inline-block;
                width: 22.5px;
                height: 22.5px;
                background: url("https://cdn.51dmq.com/ui/showImg/icon_set_right.png")
                    no-repeat bottom;
                background-size: 100% auto;
                z-index: 2;
            }
            .member-info {
                position: absolute;
                top: 30px;
                left: 34px;
                text-align: center;
                z-index: 2;
                font-family: Adobe 黑体 Std R;

                .member-touxiang {
                    // position: absolute;
                    // top: 34px;
                    // left: 30px;
                    vertical-align: middle;
                    display: inline-block;
                    width: 59.5px;
                    height: 59.5px;
                    background-color: #fff;
                    border-radius: 50%;
                    padding: 2px;
                    text-align: center;
                    // margin: 0 auto;
                    image {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .detail {
                    vertical-align: middle;
                    display: inline-block;
                    margin-left: 15px;
                    color: #fff;
                    text-align: left;
                    max-width: 215px;
                    overflow: hidden;
                    white-space: nowrap;
                    .member-name {
                        max-width: 215px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        display: block;
                        height: 37.5px;
                        line-height: 37.5px;
                        color: #fff;
                        font-weight: bold;
                        font-size: 21px;
                        em {
                            display: inline-block;
                            font-weight: normal;
                            letter-spacing: 2px;
                        }
                    }
                    .member-jifen {
                        display: block;
                        font-size: 12px;
                        em {
                            display: inline-block;
                            margin-left: 5px;
                            font-size: 15px;
                            font-weight: bold;
                        }
                    }
                }
                .cer {
                    margin: 0 auto;
                }
            }
        }
        .member-nav {
            position: relative;
            margin-left: 10px;
            margin-right: 10px;
            box-sizing: border-box;
            top: -55px;
            width: calc(100% - 20px);
            border-radius: 5px;
            background-color: #fff;
            z-index: 100;
            .my-order {
                font-family: PingFang SC Bold;
                font-size: 16px;
                color: #413838;
                height: 23px;
                line-height: 23px;
                font-weight: bold;
                padding: 15px;
                span {
                    float: right;
                    font-family: PingFang SC Regular;
                    color: #999999;
                    height: 23px;
                    line-height: 23px;
                    font-size: 12px;
                    &::after {
                        display: inline-block;
                        content: "";
                        vertical-align: text-bottom;
                        margin-left: 5px;
                        background: url("http://statics.lotsmall.cn/wx/img/arrow-left-icon.png");
                        background-size: 100% 100%;
                        width: 8px;
                        height: 15px;
                    }
                }
            }
            .nav-ul {
                width: 100%;
                padding-left: 7.5px;
                padding-right: 7.5px;
                .nav-li {
                    width: calc((100% - 15px) / 4);
                    display: inline-block;
                    // vertical-align: middle;
                    text-align: center;
                    .order-icon {
                        width: 18px;
                        height: 20px;
                        vertical-align: middle;
                    }
                    .fukuan-icon {
                        width: 32.5px;
                        height: 30px;
                        vertical-align: middle;
                    }
                    .xiaofei-icon {
                        width: 34px;
                        height: 29px;
                        vertical-align: middle;
                    }
                    .gouxuan-icon {
                        width: 32px;
                        height: 30px;
                        vertical-align: middle;
                    }
                    .shouhou-icon {
                        width: 29px;
                        height: 30px;
                        vertical-align: middle;
                    }
                    .nav-li-text {
                        position: relative;
                        font-size: 12px;
                        color: #5c5c5c;
                        margin-top: 13px;
                        margin-bottom: 12.5px;
                        &::after {
                            position: absolute;
                            top: calc(50% - 4px);
                            right: 0;
                            display: inline-block;
                            width: 1px;
                            height: 10px;
                            content: "";
                            background: #ccc;
                        }
                    }
                    &:last-of-type {
                        .nav-li-text {
                            &::after {
                                display: inline-block;
                                width: 1px;
                                height: 10px;
                                content: "";
                                background: unset;
                            }
                        }
                    }
                }
            }
        }
        .member-item {
            height: 53px;
            line-height: 53px;
            margin-top: 10px;
            background-color: #fff;
            .item-title {
                margin-left: 15px;
                font-size: 14px;
                color: #413838;
                float: left;
            }
            .arrow-left-icon {
                width: 5px;
                height: 10px;
                float: right;
                margin-top: 22px;
                margin-right: 13px;
            }
        }
        .coupons-box {
            margin-top: 10px;
            padding-left: 10px;
            padding-right: 10px;
            &.my-coupons-box {
                margin-top: -45px;
                .coupons-ul {
                    > .coupons-li {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .coupons-flex {
                            display: flex;
                            width: calc(100% - 20px);
                            justify-content: space-between;
                            align-items: center;
                        }
                        &:first-of-type {
                            i {
                                background: url("https://cdn.51dmq.com/ui/showImg/icon_member_02.png")
                                    no-repeat top;
                                background-size: 100% auto;
                                background-position: 0 3px;
                            }
                        }
                        &:nth-of-type(2) {
                            i {
                                width: 17.5px;
                                height: 17.5px;
                                background: url("https://cdn.51dmq.com/ui/showImg/icon_member_02.png")
                                    no-repeat;
                                background-size: 100% auto;
                                background-position: 0 -38.5px;
                            }
                        }
                    }
                }
            }
            .coupons-ul {
                border-radius: 5px;
                overflow: hidden;
                .coupons-li {
                    position: relative;
                    width: 100%;
                    height: 53px;
                    line-height: 53px;
                    vertical-align: middle;
                    /* margin-top: 10px; */
                    background-color: #fff;
                    em {
                        &.tel {
                            display: inline-block;
                            font-style: unset;
                            line-height: 53px;
                            font-size: 13px;
                            float: right;
                            margin-right: 42px;
                            color: #333333;
                        }
                        &.coupons {
                            display: inline-block;
                            font-style: unset;
                            color: #ff3e3e;
                            font-size: 16px;
                            line-height: 53px;
                            font-family: PingFang SC Heavy;
                            // vertical-align: text-bottom;
                            // float: right;
                            margin-top: 0px;
                            // margin-right: 13px;
                            margin-right: 3px;
                        }
                    }
                    .item-title {
                        font-size: 14px;
                        color: #413838;
                        float: left;
                        margin-left: 41px;
                    }
                    .arrow-left-icon {
                        // float: right;
                        // margin-top: 20px;
                        // margin-right: 13px;
                        width: 8px;
                        height: 15px;
                    }
                    i {
                        position: absolute;
                        left: 10px;
                        top: 17.75px;
                        display: inline-block;
                        width: 20px;
                        height: 17.5px;
                    }
                    &:nth-of-type(1) {
                        i {
                            width: 16px;
                            height: 17.5px;
                            background: url("https://cdn.51dmq.com/ui/showImg/icon_member_02.png")
                                no-repeat;
                            background-size: 100% auto;
                            background-position: 0px -161px;
                        }
                    }
                    &:nth-of-type(2) {
                        i {
                            width: 17.5px;
                            height: 17.5px;
                            background: url("https://cdn.51dmq.com/ui/showImg/icon_member_02.png")
                                no-repeat;
                            background-position: -0.5px -133px;
                            background-size: 100% auto;
                        }
                    }
                    &:nth-of-type(3) {
                        i {
                            width: 19px;
                            height: 15px;
                            background: url("https://cdn.51dmq.com/ui/showImg/icon_member_02.png")
                                no-repeat;
                            background-position: 0px -196px;
                            background-size: 100% auto;
                        }
                    }
                    &:nth-of-type(4) {
                        i {
                            width: 17.5px;
                            height: 15px;
                            background: url("https://cdn.51dmq.com/ui/showImg/icon_member_02.png")
                                no-repeat bottom;
                            background-size: 100% auto;
                        }
                    }
                }
            }
        }
    }
</style>


