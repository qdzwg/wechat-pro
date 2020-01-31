<template>
    <div>
        <div class="address-select">
            <div v-if='show'
                 @click.stop="closed"
                 class="mask"></div>
            <div :animation="animationData"
                 class="address-box">
                <div class="handle-box clearfix">
                    <button class="cancel fl"
                            @click="closed">取消</button>
                    <button class="sure fr"
                            @click="sure">确定</button>

                </div>
                <picker-view class="selectlist"
                             indicator-style="height: 50px;"
                             style="width: 100%; height: 300px;"
                             @change="bindChange">
                    <picker-view-column class="select-column">
                        <div v-for="(item,index) in arr"
                             :key='index'
                             style="line-height: 50px">{{item[props]}}</div>
                    </picker-view-column>
                </picker-view>
            </div>
        </div>
        <div class='toast-box'
             v-show="isHidden">
            <div class='toastbg'></div>
            <div class='showToast'>
                <div class='toast-title'>
                    <text>核销</text>
                </div>
                <div class='toast-main' :class="toastErr?'toast-err':''">
                    <div class='toast-input'>
                        <input placeholder='输入核销码'
                               type="password"
                               v-model="password"></input>
                    </div>
                </div>
                <div class='toast-button'>
                    <div class='button1'>
                        <button @click='cancel'>取消</button>
                    </div>
                    <div class='button2'>
                        <button @click='confirm'>确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { postData, merchantInfoId } from "@/common/common.js";
    import moment from 'moment';
    export default {
        data() {
            return {
                isHidden: false,
                password: '',
                index: 0,
                show: false,
                animation: null,
                animationData: {},
                toastErrFlag:false//输入框样式
            };
        },
        props: {
            toastErr:{
                type:Boolean,
                default:false
            },
            writeOffFlag: {
                type: Boolean,
                default: false
            },
            props: {
                type: String,
                default: "nickName"
            },
            select: {
                type: Boolean,
                default: false
            },
            arr: {
                type: Array,
                default: []
            },
        },
        watch: {
            toastErr(val){
                this.toastErrFlag = val
            },
            writeOffFlag(val) {
                console.log('传入的', val)
                return this.isHidden = val
            },
            select(val) {
                console.log(val)
                if (val) {
                    this.open()
                } else {
                    this.close()
                }
            }
        },
        onLoad() {
            this.animation = wx.createAnimation({
                //初始化动画
                duration: 500,
                timingFunction: "ease"
            });
        },
        onShow() {

        },
        onHide(){
            this.password = ''
        },
        update: {

        },
        methods: {
            cancel() {
                this.isHidden = false;
                this.$emit('writeOffShow')
            },
            confirm() {
                if (!this.password) {
                    wx.showToast({
                        title: "请输入核销密码",
                        icon: "none",
                        duration: 2000
                    });
                    return
                }
                this.$emit('writeOffs', this.password)
            },
            open() {
                this.show = true;
                this.animation.bottom("0rpx").step();
                this.animationData = this.animation.export();
            },
            close() {
                this.show = false;
                this.animation.bottom("-800rpx").step();
                this.animationData = this.animation.export();
            },
            closed() {
                this.close()
                this.$emit("pickerCancel");
            },
            sure() {
                this.$emit("pickerChange", this.arr.length ? this.arr[this.index] : null);
            },
            bindChange(e) {
                const val = e.mp.detail.value;
                this.index = val ? val[0] : null;
            }
        }
    };
</script>
<style lang='scss' scoped>
    .address-select {
        .mask {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 700;
        }
        .address-box {
            // height: 200px;
            position: fixed;
            left: 0;
            bottom: -100%;
            width: 100%;
            z-index: 710;
            background: #fff;
            .selectlist {
                .select-column {
                    text-align: center;
                    font-size: 14px;
                }
            }
            .handle-box {
                padding: 0 15px;
                .sure {
                    font-size: 14px;
                    margin-top: 10px;
                    margin-right: 10px;
                }
                .cancel {
                    font-size: 14px;
                    margin-top: 10px;
                    margin-left: 10px;
                }
            }
        }
    }
    .toast-box {
        width: 100%;
        height: 100%;
        opacity: 1;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 10000;
    }

    .toastbg {
        opacity: 0.2;
        background-color: black;
        position: absolute;
        width: 100%;
        min-height: 100vh;
    }

    .showToast {
        position: absolute;
        opacity: 1;
        width: 250px;
        left: calc(50% - 125px);
        top: 200px;
    }

    .toast-title {
        padding-left: 5%;
        background-color: #fff;
        border-bottom: 1px solid #dddddd;
        font-size: 18px;
        color: #333333;
        text-align: center;
        padding-top: 2vh;
        padding-bottom: 2vh;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }

    .toast-main {
        padding-top: 17.5px;
        padding-bottom: 35px;
        background-color: white;
        text-align: center;
        &.toast-err{
            input{
                // border:1px solid #ef0017;
                // border-radius: 6px;
            }
        }
    }

    .toast-input {
        margin-left: 17.5px;
        margin-right: 17.5px;
        height: 45px;
        line-height: 45px;
        border: 1px solid transparent;
        background: #f5f5f5;
        color: #cccccc;
        text-align: left;
        font-family: PIngFang SC Regular;
        font-size: 12px;
        border-radius: 6px;
        input {
            height: 45px;
            padding-left: 13px;
            line-height: 22.5px;
        }
    }

    .toast-button {
        display: flex;
    }

    .button1 {
        width: 50%;
    }

    .button2 {
        width: 50%;
    }

    .button1 button {
        width: 100%;
        background-color: white;
        color: #ef0017;
        background: #fef2f3;
        border-radius: 0px;
        font-size: 17px;
        font-family: PingFang SC Medium;
        border-bottom-left-radius: 6px;
    }

    .button2 button {
        width: 100%;
        background: #ef0017;
        color: #fff;
        border-radius: 0px;
        font-family: PingFang SC Medium;
        font-size: 17px;
        border-bottom-right-radius: 6px;
    }

    .picker {
        padding-top: 1vh;
        padding-bottom: 1vh;
    }
</style>

