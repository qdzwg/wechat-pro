<template>
    <div class="commitEdit"
         :style="[{height:'calc(100vh - '+(navContentHeight+navBarHeight+'px')+')'}]">
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px')}">
            <navbar title='宋城集团'></navbar>
            <div class="commitEdit-inner">
                <form action="">
                    <input v-if="selectPage == 0"
                           type="text"
                           v-model="userInfo.realName"
                           placeholder="请输入您的姓名"
                           name="name">
                    <input v-if="selectPage == 1"
                           type="text"
                           v-model="userInfo.mobile"
                           placeholder="请输入您的手机号"
                           name="tel">
                    <input v-if="selectPage == 2"
                           type="text"
                           v-model="userInfo.idcard"
                           placeholder="请输入您的身份证号"
                           name="idcard">
                    <input v-if="selectPage == 3"
                           type="text"
                           v-model="userInfo.email"
                           placeholder="请输入您的邮箱"
                           name="email">
                    <div class="save-input"
                         @click="saveInfo">
                        确认修改
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { getData, postData, merchantInfoId } from "@/common/common";
    import navbar from "@/components/navbar";
    export default {
        components: {
            navbar
        },
        data() {
            return {
                selectPage: 0,
                userInfo: {
                    realName: '',
                    mobile: '',
                    idcard: '',
                    email: ""
                }
            };
        },
        onLoad() {
            this.selectPage = this.$root.$mp.query.page;
        },
        onUnload() { },
        onHide() {

        },
        filters: {

        },
        computed: {

        },
        methods: {
            getParam(index) {
                if (index == 0) {
                    return "realName"
                } else if (index == 1) {
                    return "mobile"
                } else if (index == 2) {
                    return "idcard"
                } else if (index == 3) {
                    return "email"
                }
            },
            //身份证校验
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

            saveInfo() {
                let _this = this;
                let tag = _this.getParam(this.selectPage)
                let params = {};
                console.log("tag", tag)
                console.log("this.userInfo[tag]", this.userInfo[tag])
                params[tag] = this.userInfo[tag]
                console.log("tag", params)
                let validate = 'realName';
                let validateMsg = "姓名"
                if (this.selectPage == 1) {
                    validate = 'mobile';
                    validateMsg = '手机号'
                } else if (this.selectPage == 2) {
                    validate = 'idcard';
                    validateMsg = '身份证'
                } else if (this.selectPage == 3) {
                    validate = 'email';
                    validateMsg = '邮箱'
                }
                if (_this.userInfo[validate] == "") {
                    wx.showToast({
                        title: `${validateMsg}不能为空`,
                        duration: 2000,
                        icon: "none"
                    });
                    return
                }
                if (_this.userInfo.mobile != "") {
                    if (!/^1[3-9][0-9]{9}$/.test(_this.userInfo.mobile)) {
                        wx.showToast({
                            title: "手机号格式不正确",
                            duration: 2000,
                            icon: "none"
                        });
                        return false;
                    }
                }

                if (_this.userInfo.idcard != "") {
                    if (!this.isIdCardNo(_this.userInfo.idcard)) {
                        wx.showToast({
                            title: "身份证号格式不正确",
                            duration: 2000,
                            icon: "none"
                        });
                        return false;
                    }
                }
                if (_this.userInfo.email != "") {
                    if (
                        !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
                            _this.userInfo.email
                        )
                    ) {
                        wx.showToast({
                            title: "邮箱格式不正确",
                            duration: 2000,
                            icon: "none"
                        });
                        return false;
                    }
                }
                postData('/leaguer/api/userLeaguer/manage/leaguerUpdate', params).then(res => {
                    console.log('保存修改用户信息', res)
                    if (res.status == 200) {
                        wx.setStorageSync("WxXjscchangeUserInfo",res)
                        console.log("---------------------")
                        _this.navigatePageTo(this.router + "pages/member/edit/main")
                    }
                })
            },
            getBottom(index) {
                //触底，页面已经请求过，并且有数据才能触底，直接判断当前页码和this.pageLimt[index]的大小比对
                this.pageList[index]++;
            },
            toggleTab(tag, i) {
                console.log('aaaaaaaaaaaaaa', i)
                this[tag] = i;
            },
            switchTab(e) {
                console.log(e.target.current)
                this.showTime = e.target.current + 1
            },
            toggleHeart(item) {
                item.on = !item.on
                // e.currentTarget.dataset.heart = !e.currentTarget.dataset.heart
            },
        }
    }

</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .commitEdit {
        background: #eff1f6;
        .commitEdit-inner {
            input {
                background: #fff;
                padding-left: 15px;
                height: 50px;
                line-height: 25px;
                border: 1px solid transparent;
                color: #999999;
                font-size: 14px;
                font-family: PingFang SC Medium;
            }
            .save-input {
                margin-left: 10px;
                margin-right: 10px;
                height: 50px;
                line-height: 50px;
                border-radius: 25px;
                margin-top: 40px;
                text-align: center;
                background: linear-gradient(to right, #ef0017, #f73f6b);
                font-size: 14px;
                color: #fff;
                font-family: PingFang SC Bold;
                font-size: 18px;
            }
        }
    }
</style>
