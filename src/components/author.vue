<template>
    <div class="author_wrap" :style="{height:'calc(100% - '+(navBarHeight+navContentHeight)+'px)', top:(navBarHeight+navContentHeight)+'px'}" :animation="animationData_date">
        <img style="width:100%; height:440px;" src="https://cdn.51dmq.com/ui/um/backJ.png" alt="">
        <button class="author_btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号授权</button>
    </div>
</template>
<script>
    import { getData, postData, merchantInfoId } from "@/common/common.js";
    export default {
        data() {
            return {
                animation_date: null,
                animationData_date: {},
                code:''
            };
        },
        methods: {
            toShowDate(){
                console.log('toShowDate')
                this.animation_date.left('0').step(0);
                this.animationData_date = this.animation_date.export();
            },
            toCloseDate(){
                this.animation_date.left('100%').step(0);
                this.animationData_date = this.animation_date.export();
            },
            loginInit() {
                let _this = this
                wx.login({
                    success: function (res) {
                        _this.code = res.code
                    },
                    fail: function () {
                        console.log("授权页面获取授权码失败");
                    },
                    complete: function () {
                        // console.log("授权页面获取授权码完成");
                    }
                })
            },
            getPhoneNumber(e) {
                let _this = this
                postData('/leaguer/api/leaguer/pubs/mobile/decrypt', {
                    loginCode: _this.code,
                    ivStr: e.mp.detail.iv,
                    encDataStr: e.mp.detail.encryptedData,
                    merchantInfoId:merchantInfoId
                }).then(res => {
                    wx.showToast({
                      title: '授权成功!',
                      icon: 'none',
                      duration: 2000
                    });
                    this.$emit('success', '授权成功');
                    this.toCloseDate();
                }).catch(err=>{
                    wx.showToast({
                      title: '授权失败!',
                      icon: 'none',
                      duration: 2000
                    });
                });
            }
        },
        onLoad() {
            this.loginInit();
            this.animation_date = wx.createAnimation({
                duration: 300,
                timingFunction: "ease"
            });
        }
    };
</script>
<style scoped>
.author_wrap {width:100%; background:white; text-align:center; overflow:hidden; font-size:14px; position:fixed; left:100%; z-index:100000000}
.author_btn {width:80%; height:42px; margin-top:20%; line-height:44px; font-size:16px; color:white; display:inline-block; background-image: linear-gradient(to right, #ef0017, #f7416c); border-radius:25px;}
</style>