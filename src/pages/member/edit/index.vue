<template>
    <div class="preson-info"
         :style="[{height:'calc(100vh - '+(navContentHeight+navBarHeight+'px')+')'}]">
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px')}">
            <navbar title='宋城集团'></navbar>
            <div class="info">
                <div class="info-t">
                    <a class="item-li">
                        <span>头像</span>
                        <span>
                            <img v-if="userInfo.avatarUrl"
                                 :src=userInfo.avatarUrl
                                 alt="">
                            <img v-else
                                 src="https://cdn.51dmq.com/ui/showImg/sex_nan.png"
                                 alt="">
                            <i></i>
                        </span>
                    </a>
                    <a class="item-li">
                        <span>
                            昵称
                        </span>
                        <span>
                            {{userInfo.nickName}}
                            <i></i>
                        </span>
                    </a>
                </div>
                <div class="info-m">
                    <a class="item-li"
                       @click="goUrl('pages/member/edit/editName/main?page=0')">
                        <span>姓名</span>
                        <span>
                            {{userInfo.name}}
                            <i></i>
                        </span>
                    </a>
                    <a class="item-li"
                       @click="goUrl('pages/member/edit/editName/main?page=1')">
                        <span>手机号</span>
                        <span>
                            {{userInfo.phone || ''}}
                            <i></i>
                        </span>
                    </a>
                    <a class="item-li"
                       @click="goUrl('pages/member/edit/editName/main?page=2')">
                        <span>身份证</span>
                        <span>
                            {{userInfo.idCard}}
                            <i></i>
                        </span>
                    </a>
                </div>
                <div class="info-f">
                    <a class="item-li">
                        <span>生日</span>
                        <span>
                            <picker mode='date'
                                    :value="calendarConfig.selectProduceDate"
                                    :start="calendarConfig.startProduceDate"
                                    :end="calendarConfig.endProduceDate"
                                    @change="dateChange">
                                <div class="calendar">{{userInfo.birthday||calendarConfig.selectProduceDate}}</div>
                            </picker>
                            <i></i>
                        </span>
                    </a>
                    <a class="item-li"
                       @click="saveImg">
                        <span>性别</span>
                        <span>
                            {{userInfo.sex || "男"}}
                            <i></i>
                        </span>
                    </a>
                    <a class="item-li"
                       @click="goUrl('pages/member/edit/editName/main?page=3')">
                        <span>常用邮箱</span>
                        <span>
                            {{userInfo.email ||'请填写正确的邮箱地址'}}
                            <i></i>
                        </span>
                    </a>
                </div>
                <div class="upload-wrap"
                     v-show="maskShow"
                     :class="maskShow?'show':''">
                    <div class="btn-wrap">
                        <span @click="saveImg(1)">取消</span>
                        <span @click="saveSex">确定</span>
                    </div>
                    <div class="sex-select">
                        <div class="img"
                             @click="toggleSex(1)">
                            <img v-if="selectSexNan"
                                 src="https://cdn.51dmq.com/ui/showImg/sex_nan_select.png">
                            <img v-else
                                 src="https://cdn.51dmq.com/ui/showImg/sex_nan.png"
                                 alt="">
                            <span>男</span>
                        </div>
                        <div class="img"
                             @click="toggleSex(2)">
                            <img v-if="selectSexNan"
                                 src="https://cdn.51dmq.com/ui/showImg/sex_nv.png"
                                 alt="">
                            <img v-else
                                 src="https://cdn.51dmq.com/ui/showImg/sex_nv_select.png"
                                 alt="">
                            <span>女</span>
                        </div>
                    </div>
                    <!-- <div class="upload">
                        <span @click="uploadImg">本地上传</span>
                        <input type="file">
                    </div> -->
                </div>
            </div>

        </div>
        <div class="mask"
             v-show="maskShow || calendarShow">
        </div>
    </div>
</template>

<script>
    import { getData, postData, merchantInfoId } from "@/common/common";
    import navbar from "@/components/navbar";
    var moment = require('moment');
    export default {
        components: {
            navbar
        },
        data() {
            let _this = this;
            return {
                maskShow: false,//选择头像插件
                selectSexNan: true,
                midSex: true,
                calendarConfig: {
                    startProduceDate: '1900-01-01',
                    endProduceDate: "2019-12-30",
                    selectProduceDate: "2019-12-12"
                },
                userInfo: {
                    nickName: '',
                    avatarUrl: "",
                    birthday: "",
                    phone: '',
                    name: '',
                    idCard: '',
                    sex: '',
                    email: ''
                }
            };
        },

        onLoad() {
            let _this = this
            _this.calendarConfig.selectProduceDate = moment().format('YYYY-MM-DD')
            wx.getUserInfo({
                success: function (res) {
                    console.log("res.userInfos", res.userInfo)
                    _this.userInfo.nickName = res.userInfo.nickName;
                    _this.userInfo.avatarUrl = res.userInfo.avatarUrl;
                }
            });
            getData('/leaguer/api/userLeaguer/manage/leaguerInfo', {
                leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId
            }).then(res => {
                let resData = res
                if(wx.getStorageSync("WxXjscchangeUserInfo")){
                    resData = wx.getStorageSync("WxXjscchangeUserInfo")
                }
                console.log("allInfo", res)
                this.userInfo.name = resData.data.realName;
                this.userInfo.phone = resData.data.mobile;
                this.userInfo.birthday = resData.data.birthday.slice(0,10);
                this.userInfo.idCard = resData.data.idcard;
                this.userInfo.sex = resData.data.sex;
                this.userInfo.email = resData.data.email;
                this.selectSexNan = resData.data.sex == "男";
                this.midSex = resData.data.sex == "男";
            })
            // this.swiperHeight =
            //   res.windowHeight - 39 - (this.navContentHeight + this.navBarHeight);


        },
        onUnload() { },
        onHide() {

        },
        computed: {
            selectProduceDates() {
                return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
            }

        },
        mounted() {
            console.log(this.selectProduceDates)
        },
        methods: {
            undateInfos() {
                getData('/leaguer/api/userLeaguer/manage/leaguerInfo', {
                    leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId
                }).then(res => {
                    console.log("allInfo", res)
                    this.userInfo.name = res.data.realName;
                    this.userInfo.phone = res.data.mobile;
                    this.userInfo.birthday = res.data.birthday.slice(0,10);
                    this.userInfo.idCard = res.data.idcard;
                    this.userInfo.sex = res.data.sex;
                    this.userInfo.email = res.data.email;
                    this.selectSexNan = res.data.sex == "男";
                    this.midSex = res.data.sex == "男";
                })
            }
            ,
            saveSex() {
                let params = {};
                let _this = this;
                params.sex = this.selectSexNan ? '男' : '女'
                postData('/leaguer/api/userLeaguer/manage/leaguerUpdate', params).then(res => {
                    if (res.status == 200) {
                        wx.showToast({
                            title: '修改成功',
                            duration: 1000,
                            success(data) {
                                _this.userInfo.sex = params.sex
                                _this.saveImg()
                            }
                        })
                    }
                })

            },
            toggleSex(i) {
                if (i == 1) {
                    this.selectSexNan = true;

                } else if (i == 2) {
                    this.selectSexNan = false;
                }
                // this.selectSexNan = !this.selectSexNan
            },
            goUrl(path) {
                this.navigatePageTo(this.router + path);
            },
            uploadImg() {
                let that = this;
                wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album'],
                    success(res) {
                        console.log(res)
                        that.maskShow = !that.maskShow
                        if (res.errMsg == "chooseImage:ok") {
                            //成功
                            postData('/leaguer/api/userLeaguer/manage/leaguerUpdate', { headImg: res.tempFiles[0].path }).then(res => {
                                console.log("修改页面", res)
                            })
                        }
                    }
                })
            },
            dateChange(e) {
               let _this = this;
                this.calendarConfig.selectProduceDate = e.mp.detail.value;
                let params = {
                    birthday: moment(e.mp.detail.value).format('YYYY/MM/DD')
                }
                postData('/leaguer/api/userLeaguer/manage/leaguerUpdate', params).then(res => {
                    console.log('保存修改用户信息', res)
                    if (res.status == 200) {
                        wx.showToast({
                            title: '修改成功',
                            duration: 1000,
                            success(data) {
                              _this.undateInfos()
                            }
                        })
                    }
                })
            },

            toggleMask(tag) {
                this[tag] = !this[tag]
            },
            saveImg(i) {
                if (i == 1) {
                    this.selectSexNan = this.midSex
                }
                this.toggleMask('maskShow')
            }
        }
    }

</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .preson-info {
        background: #eff1f6;
        .info {
            .info-m {
                margin-top: 10px;
                background: #fff;
            }

            .item-li {
                ._picker {
                    display: inline-block;
                    width: 162rpx;
                    overflow: hidden;
                    vertical-align: middle;
                }
                font-family: PingFang SC Medium;
                padding-left: 10px;
                padding-right: 10px;
                border-bottom: 1px solid #efefef;
                font-size: 14px;
                color: #666666;
                margin-left: 10px;
                display: inline-block;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 50px;
                span {
                    &:last-of-type {
                        color: #333333;
                    }
                    i {
                        display: inline-block;
                        width: 12px;
                        height: 24px;
                        margin-left: 2px;
                        margin-right: 5px;
                        background: url("https://cdn.51dmq.com/ui/showImg/jiantou.png")
                            no-repeat center;
                        background-size: 100% 100%;
                    }
                }
            }
            .info-t {
                background: #fff;
                &:first-of-type {
                    span {
                        &:last-of-type {
                            img {
                                display: inline-block;
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                overflow: hidden;
                            }
                        }
                    }
                }
            }
            .info-f {
                background: #fff;
                margin-top: 10px;
                .item-li {
                    &:last-of-type {
                        span {
                            &:last-of-type {
                                color: #666;
                            }
                        }
                    }
                }
            }
            .upload-wrap {
                position: fixed;
                width: 100vw;
                bottom: -275px;
                height: 275px;
                z-index: 101;
                background: #fff;
                &.show {
                    transform: translateY(-275px);
                    -webkit-transform: translateY(-275px);
                    animation: myrotate 0.7s ease 1;
                    -webkit-animation: myrotate 0.7s ease 1;
                }

                @keyframes myrotate {
                    0% {
                        transform: translateY(0);
                    }

                    100% {
                        transform: translateY(-275px);
                    }
                }

                @-webkit-keyframes myrotate {
                    0% {
                        -weikit-transform: translateY(0);
                    }

                    100% {
                        -weikit-transform: translateY(-275px);
                    }
                }
                .btn-wrap {
                    font-size: 17px;
                    display: flex;
                    justify-content: space-between;
                    color: #999999;
                    margin-left: 10px;
                    margin-right: 10px;
                    padding: 22.5px;
                    span {
                        display: inline-block;
                        &:last-of-type {
                            color: #3ba8ff;
                        }
                    }
                }
                .sex-select {
                    display: flex;
                    justify-content: space-between;
                    font-family: PingFang SC Medium;
                    margin-top: 15px;
                    margin-left: 10px;
                    margin-right: 10px;
                    padding-left: 70px;
                    padding-right: 70px;
                    .img {
                        img {
                            display: block;
                            width: 75px;
                            height: 75px;
                            overflow: hidden;
                            border-radius: 50%;
                        }
                        span {
                            display: block;
                            width: 75px;
                            height: 47.5px;
                            line-height: 47.5px;
                            text-align: center;
                            font-size: 17px;
                            color: #333333;
                        }
                    }
                }
                .upload {
                    span {
                        display: block;
                        position: absolute;
                        border-top: 1px solid #eee;
                        width: 100vw;
                        bottom: 0;
                        height: 47.5px;
                        line-height: 47.5px;
                        text-align: center;
                        z-index: 2;
                    }
                    input {
                        position: absolute;
                        width: 100vw;
                        bottom: 0;
                        height: 47.5px;
                        z-index: 1;
                    }
                }
            }
        }
        .mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 100;
            background: rgba(0, 0, 0, 0.3);
        }
    }
</style>
