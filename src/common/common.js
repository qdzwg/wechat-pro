let Promise = require('es6-promise')
let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}

// 正式
const merchantInfoId = extConfig.merchantInfoId ? extConfig.merchantInfoId : '7'
const host = 'https://lotsmall.51dmq.com'

// 测试
// const merchantInfoId = extConfig.merchantInfoId ? extConfig.merchantInfoId : '249'
// const host = 'http://scdevwww.lotsmall.cn'

wx.setStorageSync('xjsc_merchantInfoId', merchantInfoId)

//新用户授权成功后获取用户信息并缓存在本地-保证是授权成功后使用,才能返回完整的用户信息
function setUserInfo() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: function(res) {
                if (res.code) {
                    wx.request({
                        url: host + "/leaguer/api/authApi/wxMiniProgramLogin",
                        data: {
                            code: res.code,
                            merchantInfoId: merchantInfoId
                        },
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function(res) {
                            wx.setStorageSync("WxXjscUserInfo", res.data.data);
                            resolve()
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
            }
        });
    })

}


//  验证用户某个权限是否授权
function isauthorization(scopeType) {
    console.log(scopeType)
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: result => {
                if (result.authSetting["scope." + scopeType]) {
                    //已经授权
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        });
    })

}


//验证用户是否授权，
function validateAuthorize(scopeType, fun) {
    var _this = this;
    wx.hideLoading(); //关闭弹框
    wx.getSetting({ //获取用户授权状态（查看是否授权）
        success: result => {
            if (result.authSetting["scope." + scopeType]) { //已经授权
                fun();
            } else { //未授权，引导用户授权
                // wx.authorize({
                //   scope: "scope." + scopeType,
                //   success() { //用户同意授权
                //     fun();
                //   },
                //   fail() { //用户不同意授权

                //   }
                // });
                // wx.showModal({ //弹框提示，强制用户授权
                //   title: "提示",
                //   content: "请到个人中心授权以便为你提供更好的服务",
                //   // content:"需要获得你的授权才能提供后续服务",
                //   success: function () {
                //     // wx.redirectTo({
                //     //   url: '/pages/member/main'
                //     // })
                //     // wx.navigateTo({
                //     //   url: '/pages/member/main'
                //     // })
                //     wx.navigateTo({
                //       url: '/pages/authorization/main'
                //     })           
                //   }
                // });
                // console.log('/pages/authorization/main')
                // wx.navigateTo({
                //   url: '/pages/authorization/main'
                // })
                // console.log(getCurrentPages().pop().__route__)
                wx.setStorageSync('xjsc_2018_order_url_asds', getCurrentPages().pop().__route__)
                wx.reLaunch({
                    url: '/pages/authorization/main'
                });

            }
        }
    });
}


//回传服务器个人信息
function transferUserInfo() {
    wx.getUserInfo({
        success: function(res) {
            wx.request({
                url: host + '/leaguer/api/authApi/updateLeaguer',
                data: {
                    openId: wx.getStorageSync('WxXjscUserInfo').openId,
                    nickName: res.userInfo.nickName,
                    headImg: res.userInfo.avatarUrl,
                    merchantInfoId: merchantInfoId
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: function(res) {
                    console.log('用户信息更新成功！')
                }
            })
        }
    })
}



function getData(url, data = {}, flag = true) { //url(必传), data(非)
    return new Promise(function(resolve, reject) {
        //获取店铺id,在页面创建app.vuecreate中处理了打开小程序的时候回清除本地店铺id wx_xjsc_merchantInfoId_2018_ad_212_id

        requestData()

        function requestData() {
            data = Object.assign(data, {
                merchantInfoId: merchantInfoId,
                // testss: wx.getStorageSync('wx_xjsc_merchantInfoId_2018_ad_212_id')
            })
            var userInfo = wx.getStorageSync('WxXjscUserInfo')
            if (flag) {
                wx.showLoading({
                    title: '加载中',
                })
            }
            wx.request({
                url: host + url,
                data: data,
                header: {
                    'content-type': 'application/json', // 默认值
                    'access-token': userInfo.token ? userInfo.token : '',
                },
                success: (resdata) => {
                    console.log("---------接口------", host + url);
                    console.log("-----接口返回----", JSON.stringify(resdata));
                    // 判断token是否存在和过期 过期请求登录接口
                    // console.log(resdata)
                    if (resdata.data.status == 400) {

                        wx.login({ //获取授权码
                            success: function(res) {
                                console.log('>>>>>>>>>>>>>>>>>>>|||>>>>>>>>>>>>>>>>>>>>>>')
                                console.log(res.code)
                                if (res.code) {
                                    //请求后端接口判断新老用户（老用户已经授权，直接第三方登录，新用户授权之后才能做第三方登录），
                                    // 如果是老用户后台直接做掉第三方登录并放回openid，session_key及token，如果是新用户,判断是否授权，如果没有，先授权，再做第三方登录
                                    wx.request({
                                        url: host + '/leaguer/api/authApi/wxMiniProgramLogin',
                                        data: {
                                            code: res.code, //授权码
                                            merchantInfoId: merchantInfoId //店铺id
                                        },
                                        header: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        method: 'POST',
                                        success: function(userRes) {
                                            //缓存本地信息
                                            console.log('==============================================')
                                            console.log(userRes)
                                            wx.setStorageSync('WxXjscUserInfo', userRes.data.data)
                                            if (userRes.data.data && userRes.data.data.token) {
                                                console.log('----------------------')
                                                console.log(123)
                                                    //老用户，如果是老用户返回openid，session_key及token
                                                    //将信息缓存本地，供需要的时候使用
                                                transferUserInfo() //回传用户信息
                                                    //获取tolen后，重新发起请求
                                                wx.request({
                                                    url: host + url,
                                                    data: data,
                                                    header: {
                                                        'content-type': 'application/json', // 默认值
                                                        'access-token': userRes.data.data.token,
                                                    },
                                                    success: (secondData) => {
                                                        wx.hideLoading(); //关闭弹框
                                                        resolve(secondData.data)
                                                    },
                                                    fail: (error) => {
                                                        wx.hideLoading(); //关闭弹框
                                                        resolve(secondData.data)
                                                    }
                                                })
                                            } else { //新用户，需要先授权，再做第三方登录
                                                console.log('----------------------')
                                                console.log('false')
                                                validateAuthorize('userInfo', function() {
                                                    //授权成功后的回调
                                                    wx.getUserInfo({
                                                        success: function(res) {
                                                            wx.request({ //第三方登录
                                                                url: host + '/leaguer/api/userLeaguer/thirdLogin',
                                                                data: {
                                                                    openId: userRes.data.data.openid,
                                                                    nickName: res.userInfo.nickName,
                                                                    headImg: res.userInfo.avatarUrl,
                                                                    channel: 'WXXCX',
                                                                    merchantInfoId: merchantInfoId
                                                                },
                                                                method: 'post',
                                                                header: {
                                                                    'content-type': 'application/x-www-form-urlencoded'
                                                                },
                                                                success: function(thirdRes) {
                                                                    // 返回openid，session_key及token
                                                                    //将信息缓存本地，供需要的时候使用
                                                                    wx.setStorageSync('WxXjscUserInfo', thirdRes.data.data)
                                                                        //重新发起请求
                                                                    wx.request({
                                                                        url: host + url,
                                                                        data: data,
                                                                        header: {
                                                                            'content-type': 'application/json', // 默认值
                                                                            'access-token': thirdRes.data.data.token,
                                                                        },
                                                                        success: (secondData) => {
                                                                            wx.hideLoading(); //关闭弹框
                                                                            if (secondData.data.status == 200) {
                                                                                //请求成功!
                                                                                resolve(secondData.data)
                                                                            } else {
                                                                                reject(secondData.data)
                                                                                wx.showToast({
                                                                                    title: secondData.data && secondData.data.message ? secondData.data.message : '',
                                                                                    icon: "none",
                                                                                    duration: 2000
                                                                                });
                                                                            }
                                                                        },
                                                                        fail: (error) => {
                                                                            wx.hideLoading(); //关闭弹框
                                                                            resolve(secondData.data)
                                                                        }
                                                                    })
                                                                },
                                                                fail: function() {
                                                                    reject(resdata.data)
                                                                    console.log('登录失败')
                                                                }
                                                            })
                                                        }
                                                    })

                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    } else {
                        wx.hideLoading(); //关闭弹框
                        if (resdata.data.status == 200) {
                            //请求成功!
                            resolve(resdata.data)
                        } else {
                            reject(resdata.data)
                            wx.showToast({
                                title: resdata.data && resdata.data.message ? resdata.data.message : '',
                                icon: "none",
                                duration: 2000
                            });
                        }
                    }
                },
                fail: (res) => {
                    // console.log('res',res)
                    wx.hideLoading(); //关闭弹框
                    // console.log('++++++++++++错误信息++++++++++++++')
                    // console.log(res)
                    wx.showModal({
                        showCancel: false,
                        // title: '出错啦',
                        content: '努力加载中...'
                    })
                }
            })
        }




    })

}
//post请求接口
function postData(url, data = {}, flag = true) {
    return new Promise((resolve, reject) => {
        //获取店铺id,在页面创建app.vuecreate中处理了打开小程序的时候回清除本地店铺id wx_xjsc_merchantInfoId_2018_ad_212_id
        // let loaclMerchantInfoId = wx.getStorageSync('wx_xjsc_merchantInfoId_2018_ad_212_id')
        // if (!loaclMerchantInfoId) {
        //   //本地没有店铺ID
        //   wx.request({
        //     url: host + '/merchant/api/merchantAdvManage/findPicInfo',
        //     data: {
        //       merchantInfoId: merchantInfoId
        //     },
        //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //     header: {
        //       'content-type': 'application/json', // 默认值
        //     },
        //     success: function (res) {
        //       wx.setStorageSync('wx_xjsc_merchantInfoId_2018_ad_212_id', 'zzzzz')
        //       requestData()
        //     },
        //     fail: function () {
        //       // fail
        //     }
        //   })
        // } else {
        //   requestData()
        // }
        requestData()

        function requestData() {
            if (flag) {
                wx.showLoading({
                    title: "加载中",
                });
            }
            data = Object.assign(data, {
                merchantInfoId: merchantInfoId,
                // testzzz: wx.getStorageSync('wx_xjsc_merchantInfoId_2018_ad_212_id')
            })
            var userInfo = wx.getStorageSync('WxXjscUserInfo');
            // console.log("000000000000000000000000000000000000000000000");
            // console.log(data);
            // console.log(userInfo);
            wx.request({
                url: host + url,
                data: data,
                method: "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded', // 默认值
                    'access-token': userInfo.token ? userInfo.token : ""
                },
                success: (resdata) => {
                    console.log("---------接口------", host + url);
                    console.log("-----接口返回----", JSON.stringify(resdata));
                    // 判断token是否过期或者不存在，过期请求下面接口
                    if (resdata.data.status == 400) {
                        //获取授权码code，用来请求拿个人信息（包括token,openId,session_key）的下面的接口，判断是新用户还是老用户
                        wx.login({
                            success: (res) => {
                                // console.log("2222222222222222222222222222222222222222" + res)
                                if (res.code) {
                                    wx.request({
                                        url: host + 'leaguer/api/authApi/wxMiniProgramLogin',
                                        data: {
                                            code: res.code,
                                            merchantInfoId: merchantInfoId
                                        },
                                        header: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        method: "POST",
                                        success: (userRes) => {
                                            //缓存本地信息
                                            wx.setStorageSync('WxXjscUserInfo', userRes.data.data);
                                            // 老用户
                                            if (userRes.data.data.token) {
                                                transferUserInfo() //回传用户信息给后台接口方法
                                                    //重新发起请求
                                                wx.request({
                                                    url: host + url,
                                                    data: data,
                                                    method: "POST",
                                                    header: {
                                                        'content-type': 'application/x-www-form-urlencoded', // 默认值
                                                        'access-token': userRes.data.data.token
                                                    },
                                                    success: (secondData) => {
                                                        wx.hideLoading(); //关闭弹框
                                                        resolve(resdata.data);
                                                    },
                                                    fail(error) {
                                                        wx.hideLoading(); //关闭弹框
                                                        resolve(resdata.data);
                                                    }
                                                })
                                            } else { //新用户，需要先授权，再做第三方登录
                                                // 先授权
                                                validateAuthorize('userInfo', () => { //授权方法               
                                                    wx.getUserInfo({
                                                        success: (res) => {
                                                            //第三方登录
                                                            wx.request({
                                                                url: host + 'leaguer/api/userLeaguer/thirdLogin',
                                                                data: {
                                                                    openId: userRes.data.data.openid,
                                                                    nickName: res.userInfo.nickName,
                                                                    headImg: res.userInfo.avatarUrl,
                                                                    channel: 'WXXCX',
                                                                    merchantInfoId: merchantInfoId
                                                                },
                                                                header: {
                                                                    'content-type': 'application/x-www-form-urlencoded'
                                                                },
                                                                method: "POST",
                                                                //第三方登录成功回调
                                                                success: (thirdRes) => {
                                                                    wx.setStorageSync('WxXjscUserInfo', thirdRes.data.data)
                                                                        //重新发起请求
                                                                    wx.request({
                                                                        url: host + url,
                                                                        data: data,
                                                                        method: "POST",
                                                                        header: {
                                                                            'content-type': 'application/x-www-form-urlencoded', // 默认值
                                                                            'access-token': thirdRes.data.data.token
                                                                        },
                                                                        success: (secondData) => {
                                                                            wx.hideLoading(); //关闭弹框
                                                                            if (secondData.data.status == 200) {
                                                                                //请求成功!
                                                                                resolve(secondData.data)
                                                                            } else {
                                                                                reject(secondData.data)
                                                                                wx.showToast({
                                                                                    title: secondData.data && secondData.data.message ? secondData.data.message : '',
                                                                                    icon: "none",
                                                                                    duration: 2000
                                                                                });
                                                                            }
                                                                        },
                                                                        fail(error) {
                                                                            wx.hideLoading(); //关闭弹框
                                                                            resolve(resdata.data);
                                                                        }
                                                                    })
                                                                },
                                                                //第三方登录失败
                                                                fail: (error) => {
                                                                    console.log(error);
                                                                    console.log('登录失败')
                                                                }
                                                            })
                                                        }
                                                    })
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    } else {
                        wx.hideLoading(); //关闭弹框
                        if (resdata.data.status == 200) {
                            //请求成功!
                            resolve(resdata.data)
                        } else {
                            reject(resdata.data)
                            wx.showToast({
                                title: resdata.data && resdata.data.message ? resdata.data.message : '',
                                icon: "none",
                                duration: 2000
                            });
                        }
                    }

                },
                fail: function(error) {
                    // console.log('++++++++++++错误信息++++++++++++++')
                    // console.log(error)
                    wx.hideLoading();
                    wx.showModal({
                        showCancel: false,
                        // title: '出错啦',
                        content: '努力加载中...'
                    })
                },
                complete: function() {

                }
            })
        }


    })
}

//验证表单数据
function getTest(type, index, value) {
    let Fdata, Illegal = new RegExp("[`~!@#$^&*()=|{}':'\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'、？\\s]");
    if (!value) {
        return Fdata = {
            flag: index,
            tips: '这里是必填项'
        }
        return;
    } else {
        if (Illegal.test(value)) {
            return Fdata = {
                flag: index,
                tips: '包含非法字符'
            }
        }
    }

    if (value && !Illegal.test(value)) {
        if (type == "linkname") {
            return Fdata = {
                flag: -1,
                tips: ''
            }
        } else if (type == 'tel') {
            let rule = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
            if (!rule.test(value)) {
                return Fdata = {
                    flag: index,
                    tips: '请输入正确的手机号'
                }
            } else {
                return Fdata = {
                    flag: -1,
                    tips: ''
                }
            }
        } else if (type == 'idcard') {
            if (!isIdCardNo(value)) {
                return Fdata = {
                    flag: index,
                    tips: '请输入正确的身份证号码'
                }
            } else {
                return Fdata = {
                    flag: -1,
                    tips: ''
                }
            }
        }

    }



}

//身份证验证
function isIdCardNo(num) {

    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
        return false;
    }
    // check and set value
    for (let i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
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
    } else { // length is 15
        // check date
        var date6 = idNumber.substring(6, 12);
        if (isDate6(date6) == false) {

            return false;
        }
    }
    return true;

}
/**
 * 判断是否为"YYYYMMDD"式的时期
 * 
 */
function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1700 || year > 2500) return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
    if (month < 1 || month > 12) return false
    if (day < 1 || day > iaMonthDays[month - 1]) return false
    return true
}
// 计算总价
function getTotalPrice(count, price) {
    var totalprice = (parseFloat(price) * count).toFixed(2).toString();
    console.log(parseFloat(price), count, totalprice)
    return totalprice;
}
// 修改日期格式
// 改一下日历的格式
function changeDateType(year, month, day) {
    let y = year;
    let m = month;
    if (m < 10) m = "0" + m;
    let d = day;
    if (d < 10) d = "0" + d;
    return y + "-" + m + "-" + d;
}

function getSystemInfo() {
    wx.getSystemInfo({
        success: function(res) {
            console.log("res:", res.windowWidth)
            console.log("res:", res.windowHeight)
        }
    })
}


function httptest(url, data = {}, method = 'get') {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method ? method : 'get',
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}




module.exports = {
    setUserInfo, //设置用户信息
    isauthorization,
    host,
    merchantInfoId,
    getData: getData, //get请求拿数据
    getTest: getTest, //表单验证
    postData: postData, //post请求拿数据
    changeDateType: changeDateType, //
    getTotalPrice: getTotalPrice, //计算总价
    getSystemInfo: getSystemInfo // 获取手机信息
}