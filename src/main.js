import Vue from 'vue'
import App from './App'
// import store from './store'
import api from './api/api'
import { getData } from "@/common/common";

// Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'
Vue.mixin({
    data() {
        return {
            service: '',
            router: '/',
            imgSrc: '/',
            api,
            buttonClicked: false,
            navBarHeight: null,
            navContentHeight: 49,
            tabContentHeight: 40,
            linkUrlObj: {
                ticket: 'pages/scenic/list/main',
                hotel: "pages/hotel/list/main",
                shop: "pages/goods/list/main",
                repast: "pages/repast/list/main",
                route: "pages/route/list/main",
                home: "pages/index/main",
                strategy: "pages/strategy/list/main",
                shopcart: "pages/shoppingCart/main",
                personal: "pages/member/main",
                order: "pages/member/order/main",
                coupon: "pages/member/youhuiquan/main",
                receivecoupons: "pages/member/receiveCoupon/main",
                accountcenter: "pages/member/edit/main",
                groupbooking: "pages/groupbooking/list/main",
                publicservice: "pages/publicservice/list/main",
                parkcard: "pages/parkcard/list/main",
                ai_p: "pages/ai_p/main",
                custompage: 'pages/customPage/main',
                show: 'pages/show/list/main',
                programme: 'pages/member/show/main'
            },
            linkDetailObj: {
                ticket: 'pages/scenic/detail/main',
                hotel: "pages/hotel/detail/main",
                room: "pages/hotel/detail/main",
                shop: "pages/goods/detail/main",
                mdse: "pages/goods/detail/main",
                repast: "pages/repast/detail/main",
                route: "pages/route/detail/main",
                strategy: "pages/strategy/detail/main",
                ai_p: "pages/ai_p/detail/main",
                groupbooking: "pages/groupbooking/detail/main",
                publicservice: "pages/publicservice/detail/main",
                parkcard: "pages/parkcard/detail/main",

            },
            iconData: {
                home: "icon-nav-home",
                order: "icon-nav-orders",
                personal: "icon-member",
                shopcart: "icon-shopping-car",
                custompage: "icon-pintu",
                ticket: "icon-nav-ticket",
                hotel: "icon-nav-hotel",
                shop: "icon-nav-goods",
                strategy: "icon-nav-raiders",
                route: "icon-nav-tours",
                repast: "icon-nav-foods",
                ai_p: "icon-AIpaiyipai"
            },
        }
    },
    // onUnload() {
    //   if (this.$options.data) {
    //     Object.assign(this.$data, this.$options.data())
    //   }
    // },
    onShow() {
        // wx.hideTabBar()
    },
    methods: {
        mathNum(val) {
            Math.round(+val)
        },
        getLeaguerInfo(cb) {
            getData('/leaguer/api/userLeaguer/manage/leaguerInfo', {
                leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId
            }).then(res => {
                if(res.status == 200){
                    cb&&cb(res)
                }
            })
        },
        outFilter(html) {
            let dd = html.replace(/<[^>]+>/g, "");
            let dds = dd.replace(/(^\s*)|(\s*$)/g, "");
            let test = dds.replace(/&nbsp;/ig, "");
            return test
        },
        goNavurl(item) {
            let linkUrl = item.linkUrl
            let id = item.customPageId ? item.customPageId : ''
            if (linkUrl != "customlink") {
                let url = this.linkUrlObj[linkUrl];
                if (linkUrl == "custompage") {
                    //自定义页面
                    if (wx.getStorageSync("getServiceUse_wxxcx") == true) {
                        url = url + "?id=" + id;
                    } else {
                        wx.showModal({
                            title: "提示",
                            content: "未购买服务或服务过期",
                        });
                        return
                    }
                } else if (linkUrl == 'ai_p') {
                    if (wx.getStorageSync("getServiceUse_pyp") == true) {

                    } else {
                        wx.showModal({
                            title: "提示",
                            content: "未购买服务或服务过期",
                        });
                        return
                    }

                } else if (linkUrl == 'guide') {
                    wx.showModal({
                        title: "提示",
                        content: "此服务暂未开放",
                    });
                    return
                } else if (linkUrl == 'groupbooking') {
                    wx.showToast({
                        title: '我的拼团暂未开发',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else if (linkUrl == 'parkcard') {
                    wx.showToast({
                        title: '公园年卡暂未开发',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else if (linkUrl == 'publicservice') {
                    wx.showToast({
                        title: '公共服务暂未开发',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else if (linkUrl == 'theater') {
                    wx.showToast({
                        title: '剧院暂未开发',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                }
                this.goLinkUrl(this.router + url);
            } else {
                //自定义页面
                let xjsc_merchantInfoId = wx.getStorageSync('xjsc_merchantInfoId')
                    // console.log("自定义链接跳转")
                    // console.log(item)
                let url = item.customLinkurl
                let arr = []
                let addressReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
                    //判断是不是网址
                if (addressReg.test(url)) {
                    let ticketReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/ticket\/-?[1-9]\d*\/-?\w*\?m_id=-?[1-9]\d*/
                    let routeReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/route\/-?[1-9]\d*\/-?\w*\?m_id=-?[1-9]\d*/
                    let hotelReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/hotel\/-?[1-9]\d*\/-?\w*\?m_id=-?[1-9]\d*/
                    let shopReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/shop\/-?[1-9]\d*\/-?\w*\?m_id=-?[1-9]\d*/
                    let repastReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/repast\/-?[1-9]\d*\/-?\w*\?m_id=-?[1-9]\d*/
                    let strategyReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/strategy\/-?[1-9]\d*\?m_id=-?[1-9]\d*/
                        //判断是什么页面
                    let flag = true
                    let type = ''
                    if (ticketReg.test(url)) {
                        type = 'ticket'
                    } else if (routeReg.test(url)) {
                        type = 'route'
                    } else if (hotelReg.test(url)) {
                        type = 'hotel'
                    } else if (shopReg.test(url)) {
                        type = 'shop'
                    } else if (repastReg.test(url)) {
                        type = 'repast'
                    } else if (strategyReg.test(url)) {
                        type = 'strategy'
                    } else {
                        //只是普通的网页地址，小程序端不做处理
                        flag = false
                    }

                    if (flag && type) {
                        arr = url.match(/\d+/g)
                            // console.log(arr,type)
                        if (arr.length && arr.length >= 1 && arr[arr.length - 1] == xjsc_merchantInfoId) {
                            //对饮的店铺id和当前小程序的店铺id是否相同
                            if (type == 'ticket') {
                                this.navigatePageTo('/pages/scenic/detail/main?id=' + arr[0] + '&productCode=' + 'park' + arr[1])
                            } else if (type == 'route') {
                                this.navigatePageTo('/pages/route/detail/main?id=' + arr[0] + '&productCode=' + 'route' + arr[1])
                            } else if (type == 'hotel') {
                                this.navigatePageTo('/pages/hotel/detail/main?id=' + arr[0] + '&productCode=' + 'hotel' + arr[1])
                            } else if (type == 'shop') {
                                this.navigatePageTo('/pages/goods/detail/main?id=' + arr[0] + '&productCode=' + 'MS' + arr[1])
                            } else if (type == 'repast') {
                                this.navigatePageTo('/pages/repast/detail/main?id=' + arr[0] + '&productCode=' + 'eatery' + arr[1])
                            } else if (type == 'strategy') {
                                this.navigatePageTo('/pages/strategy/detail/main?id=' + arr[0])
                            }
                        } else {
                            //
                            console.log("请检查店铺id是否相同")
                        }
                    }

                }
                // reg.test(url)
                // console.log(reg.test(url))
                // if(reg.test(url)){
                //   //满足条件
                //   console.log("门票详情页面")
                //   console.log(url.match(/\d+/g))
                // }
            }
        },
        goUthorization() {
            wx.setStorageSync(
                "xjsc_2018_order_url_asds",
                getCurrentPages().pop().__route__
            );
            wx.reLaunch({
                url: "/pages/authorization/main"
            });
        },
        tabNavurl(item) {
            // linkUrl, id, customTel
            let linkUrl = item.linkUrl,
                id = item.customPageId,
                customTel = item.customTel;
            //   let arr = ["personalpage", "orderpage", "homepage", "shopcartpage"]
            let obj = {
                home: "homepage",
                shopcart: "shopcartpage",
                personal: "personalpage",
                order: "orderpage",
                custompage: "custompage",
            }
            console.log(wx.getStorageSync('getNavigationData'))
            let range = wx.getStorageSync('getNavigationData').range;
            let flag = true //默认是跳转 
            if (obj[linkUrl]) {
                if (range.indexOf(obj[linkUrl]) > -1) {
                    //重载
                    flag = false
                } else {
                    //跳转
                    flag = true
                }
            } else {
                flag = true
            }
            console.log('***********************************')
            console.log(flag,linkUrl);
            if (linkUrl != "customlink") {
                let url = this.linkUrlObj[linkUrl];
                if (linkUrl == "custompage") {
                    //自定义页面
                    if (wx.getStorageSync("getServiceUse_wxxcx") == true) {
                        url = url + "?id=" + id;
                    } else {
                        wx.showModal({
                            title: "提示",
                            content: "未购买服务或服务过期",
                        });
                        return
                    }
                } else if (linkUrl == 'ai_p') {
                    if (wx.getStorageSync("getServiceUse_pyp") == true) {

                    } else {
                        wx.showModal({
                            title: "提示",
                            content: "未购买服务或服务过期",
                        });
                        return
                    }

                } else if (linkUrl == 'guide') {
                    wx.showModal({
                        title: "提示",
                        content: "此服务暂未开放",
                    });
                    return
                } else if (linkUrl == 'groupbooking') {
                    wx.showToast({
                        title: '我的拼团暂未开发',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else if (linkUrl == 'parkcard') {
                    wx.showToast({
                        title: '公园年卡暂未开发',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else if (linkUrl == 'publicservice') {
                    wx.showToast({
                        title: '公共服务暂未开发',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else if (linkUrl == 'theater') {
                    wx.showToast({
                        title: '剧院暂未开发',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else if (linkUrl == 'customtel') {
                    wx.makePhoneCall({
                        phoneNumber: customTel
                    })
                }
                if (flag) {
                    wx.navigateTo({
                        url: '/' + url
                    })
                } else {
                    wx.reLaunch({
                        url: '/' + url
                    })
                }

                //   this.goLinkUrl(this.router + url);
            } else {
                //自定义页面
                let xjsc_merchantInfoId = wx.getStorageSync('xjsc_merchantInfoId')
                    // console.log("自定义链接跳转")
                    // console.log(item)
                let url = item.customLinkurl
                let arr = []
                let addressReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
                    //判断是不是网址
                if (addressReg.test(url)) {
                    let ticketReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/ticket\/-?[1-9]\d*\/-?\w*\?m_id=-?[1-9]\d*/
                    let routeReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/route\/-?[1-9]\d*\/-?\w*\?m_id=-?[1-9]\d*/
                    let hotelReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/hotel\/-?[1-9]\d*\/-?\w*\?m_id=-?[1-9]\d*/
                    let shopReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/shop\/-?[1-9]\d*\/-?\w*\?m_id=-?[1-9]\d*/
                    let repastReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/repast\/-?[1-9]\d*\/-?\w*\?m_id=-?[1-9]\d*/
                    let strategyReg = /(http|https):\/\/(wap|testwap).lotsmall.cn\/detail\/strategy\/-?[1-9]\d*\?m_id=-?[1-9]\d*/
                        //判断是什么页面
                    let flag = true
                    let type = ''
                    if (ticketReg.test(url)) {
                        type = 'ticket'
                    } else if (routeReg.test(url)) {
                        type = 'route'
                    } else if (hotelReg.test(url)) {
                        type = 'hotel'
                    } else if (shopReg.test(url)) {
                        type = 'shop'
                    } else if (repastReg.test(url)) {
                        type = 'repast'
                    } else if (strategyReg.test(url)) {
                        type = 'strategy'
                    } else {
                        //只是普通的网页地址，小程序端不做处理
                        flag = false
                    }

                    if (flag && type) {
                        arr = url.match(/\d+/g)
                            // console.log(arr,type)
                        if (arr.length && arr.length >= 1 && arr[arr.length - 1] == xjsc_merchantInfoId) {
                            //对饮的店铺id和当前小程序的店铺id是否相同
                            if (type == 'ticket') {
                                this.navigatePageTo('/pages/scenic/detail/main?id=' + arr[0] + '&productCode=' + 'park' + arr[1])
                            } else if (type == 'route') {
                                this.navigatePageTo('/pages/route/detail/main?id=' + arr[0] + '&productCode=' + 'route' + arr[1])
                            } else if (type == 'hotel') {
                                this.navigatePageTo('/pages/hotel/detail/main?id=' + arr[0] + '&productCode=' + 'hotel' + arr[1])
                            } else if (type == 'shop') {
                                this.navigatePageTo('/pages/goods/detail/main?id=' + arr[0] + '&productCode=' + 'MS' + arr[1])
                            } else if (type == 'repast') {
                                this.navigatePageTo('/pages/repast/detail/main?id=' + arr[0] + '&productCode=' + 'eatery' + arr[1])
                            } else if (type == 'strategy') {
                                this.navigatePageTo('/pages/strategy/detail/main?id=' + arr[0])
                            }
                        } else {
                            //
                            console.log("请检查店铺id是否相同")
                        }
                    }

                }
                // reg.test(url)
                // console.log(reg.test(url))
                // if(reg.test(url)){
                //   //满足条件
                //   console.log("门票详情页面")
                //   console.log(url.match(/\d+/g))
                // }
            }
        },
        goLinkUrl(url) {
            // console.log(key,this.linkUrlObj[key])      
            this.navigatePageTo(url);

        },
        newroot() { //
            return this.$root.$mp
        },
        navigatePageTo(url) {
            let _this = this
            if (!this.buttonClicked) {
                _this.buttonClicked = true
                setTimeout(function() {
                    _this.buttonClicked = false
                }, 500)
                wx.navigateTo({
                    url: url
                })
            }
        },
        reLaunchPageTo(url) {
            wx.reLaunch({
                url: url
            })
        },
        setStorageSync(name, data) {
            wx.setStorageSync(name, data)
        },
        getStorageSync(name) {
            return wx.getStorageSync(name)
        },
        searchCoupon(params,cb) {
            // params:{"totalPrice":10,"deductions":[{"productCode":"商品编码","num":"数量","price":"商品单价"}]}
            getData(this.api.main.marketing.searchCoupon, params).then(res => {
                cb&&cb(res)
            });
        },
        // 查抵扣信息接口
        bonusDeductionUsingGET(params,cb) {
            console.log(params)
            // params:{"totalPrice":10,"deductions":[{"productCode":"商品编码","num":"数量","price":"商品单价"}]}
            getData("/leaguer/api/leaguer/pubs/bonus/deduction", params).then(res => {
                cb&&cb(res)
            });
        },
        //手机号验证
        checkMobile(val) {
            if (!/^1[34578]\d{9}$/.test(val)) {
                return true;
            }
        },
        //身份证验证
        checkIdCard(vla) {
            if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(vla)) {
                return true;
            }
        }

    },
    created() {
        // console.log('wx')
        // this.service = wxService
        wx.getSystemInfo({
            success: res => {
                // console.log(res);
                this.navBarHeight = res.statusBarHeight
            }
        });

    }
})
const app = new Vue(App)
app.$mount()