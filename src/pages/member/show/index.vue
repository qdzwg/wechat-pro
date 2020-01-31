<template>
    <div class="show"
         :style="[{height:'calc(100vh - '+(navContentHeight+navBarHeight+'px')+')'}]">
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px')}">
            <navbar title='宋城集团'></navbar>
            <div class="show-top-bg">
                <img src="https://cdn.51dmq.com/ui/showImg/show_bg.png"
                     alt="">
                <div class="order-status">待消费</div>
            </div>
            <div class="show-tab">
                <div class="types">
                    <span :class="showTab == 1?'on':''"
                          @click="toggleTab('showTab',1)">节目列表</span>
                    <span :class="showTab == 2?'on':''"
                          @click="toggleTab('showTab',2)">我的节目</span>
                </div>
                <div class="times"
                     v-show="showTab == 1">
                    <span :class="showTime == item.num?'on':''"
                          @click="toggleTab('showTime',item.num)"
                          v-for="(item,index) in timeList"
                          :key=index>
                        <p>{{item.ctime}}</p>
                        <p>（{{item.time}}）</p>
                    </span>
                </div>
                <swiper v-if="showTab == 1"
                        @change="switchTab"
                        :current="(showTime - 1)"
                        :style="{height:'calc(100vh - 202px - '+(navContentHeight+navBarHeight+'px')+')'}">
                    <swiper-item v-for="(item,index) in listData"
                                 :key="index">
                        <scroll-view scroll-y>
                            <div class="show-wrap-ul"
                                 v-for="(it,i) in item"
                                 :key="i">
                                <div class="item-show">
                                    <div class="info">
                                        <p>{{it.showTime}}</p>
                                        <p>{{it.name}}</p>
                                        <p>地点：{{it.address}}{{it.subFlag}}</p>
                                    </div>
                                    <div class="heart"
                                         @click="toggleHeart(it)">
                                        <i v-if="flagArr[index].flag[i].subFlag"
                                           class="care on"></i>
                                        <i v-else
                                           class="noCare"></i>
                                    </div>
                                </div>
                            </div>
                        </scroll-view>
                    </swiper-item>
                </swiper>
                <div v-else
                     :style="{height:'calc(100vh - 157px - '+(navContentHeight+navBarHeight+'px')+')','overflow-y':'scroll'}">
                    <scroll-view scroll-y
                                 @scrolltolower='getBottom(0)'>
                        <div class="show-wrap-ul"
                             v-for="(item,index) in swiperList"
                             :key="index">
                            <div class="item-show">
                                <div class="info">
                                    <p>{{item.showTime}}</p>
                                    <p>{{item.showName}}</p>
                                    <p>地点：{{item.parkName}}</p>
                                </div>
                                <div class="heart">
                                    <i class="care on"></i>
                                </div>
                            </div>
                        </div>
                    </scroll-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from "@/components/navbar";
    import api from "@/api/api";
    import { getData, postData, host, merchantInfoId } from "@/common/common.js";
    export default {
        components: {
            navbar
        },
        data() {
            return {
                // bottomShow: false,
                // pageShow: true, //去除个人中心过来的过度效果
                // isShow: true,
                // activestate: "WAIT_PAY",
                listData: [[], [], []],
                // pageLimt: [null, null, null, null, null], //初始化页面页数限制
                timeList: [
                    { time: "09:00-11:59", num: 1, ctime: "上午" },
                    { time: "12:00-16:59", num: 2, ctime: "下午" },
                    { time: "17:00-23:00", num: 3, ctime: "晚上" },
                ],
                swiperList: [],
                showTab: 1,
                showTime: 1,
                pageList: [1, 1, 1, 1, 1],
                flagArr: [{
                    flag: []
                }, {
                    flag: []
                }, {
                    flag: []
                }],//改变订阅状态  因为双向绑定问题 
                // swiperHeight: null,
                // payMoney: null,
                // payOrderNo: null,
                // orderDescription: null,
                // payIndex: null,
                // isSwitch: false, //是否个人中心跳转过来,保证不会触发switch中的getList
                // navigationData: {},
                // selectNavIndex: 1
            };
        },
        onLoad() {
            this.showTab = this.$root.$mp.query.tab || 1
            if (new Date().getHours() < 12) {
                this.showTime = 1
            } else if ((12 <= new Date().getHours()) && (new Date().getHours() < 17)) {
                this.showTime = 2
            } else {
                this.showTime = 3
            }
            // this.swiperHeight =
            //   res.windowHeight - 39 - (this.navContentHeight + this.navBarHeight);
            //   this.getShowList(this.timeList[0].time)
            this.init()
            this.getMyList()

        },
        onrefresh() {
            this.onLoad();
        },
        onUnload() { },
        onHide() {

        },
        methods: {
            getMyList() {
                let _this = this
                getData('/merchant/webapi/programmmeOrderApi/order', {}).then(res => {
                    console.log("我的节目单列表", res)
                    _this.swiperList = res.data
                })
            },
            init() {
                let _this = this
                this.timeList.forEach((item, index) => {
                    console.log(item, index)
                    this.getShowList(item.time, index)
                })
            },
            // initFlagArr(data, i, flagArrI, _this) {
            //     let obj = { subFlag: false };
            //     _this.flagArr[flagArrI]['flag'] = [];
            //     for (var i = 0; i < data.length; i++) {
            //         _this.flagArr[flagArrI]['flag'].push(obj)
            //     }
            //     _this.flagArr[flagArrI]['flag'][i].subFlag = data[i].subFlag
            // },
            getShowList(time, i) {
                let listUrl = api.member.show.list
                console.log("listUrl", listUrl, time, i)
                getData(listUrl, {
                    showTime: time
                }).then(res => {
                    console.log('res------------------------', res, i)
                    this.listData[i] = res.data
                    this.flagArr[i]['flag'] = res.data
                    // let _this = this
                    // res.data.forEach((item, index) => {
                    //     _this.initFlagArr(res.data, index, i, _this)
                    // }, res, _this, i)
                    // console.log('==========initflag===========', this.flagArr)
                    wx.setStorageSync('xjsc_templateId', res.templateId)
                }).catch(err => {
                    console.log("err", err)
                })
            },
            getBottom(index) {
                //触底，页面已经请求过，并且有数据才能触底，直接判断当前页码和this.pageLimt[index]的大小比对
                console.log("触底了")
                this.pageList[index]++;
            },
            toggleTab(tag, i) {
                console.log('aaaaaaaaaaaaaa', i)
                this[tag] = i;
                if (i == 2) {//点击我的节目重新获取数据
                    this.getMyList()
                }
            },
            switchTab(e) {
                console.log(e.target.current)
                this.showTime = e.target.current + 1
            },
            toggleHeart(item) {
                console.log("点击", item)
                if (!this.isHasCare()) {
                    this.requestMsg(item).then(res => {
                        console.log("订阅", res)
                        this.careShow(item.id, item)
                    }).catch(err => {
                        consolel.log('订阅error', err)
                    })
                } else {
                    wx.showToast({
                        title: '已经订阅',
                        duration: 1000,
                        success(data) {

                        }
                    })
                }
                // e.currentTarget.dataset.heart = !e.currentTarget.dataset.heart
            },
            isHasCare() {
                //微信强制每次授权
                return false;
                // let templateId = wx.getStorageSync('xjsc_templateId')
                // // let templateId = "Tk7Sec71wnVQH4Sj_UhUGr07M_lpnd-kYrHXGl-aqPY"
                // console.log("---------templeId-------",templateId)
                // getData(api.member.show.isSubTemplateId, {
                //     templateId: templateId
                // }).then(res => {
                //     console.log("节目单结果", res)
                //     if (res.status == 200) {
                //         return res.success
                //     } else {
                //         return true
                //     }
                // })
            },
            careShow(programmeId, selectItem) {
                let _this = this;
                let careUrl = api.member.show.subscribe
                getData(careUrl, {
                    programmeId: programmeId
                }).then(res => {
                    console.log("看一下care结果 ", res)
                    let title = "订阅成功"
                    if (!res.status == 200) {
                        selectItem.subFlag = false
                    }
                    selectItem.subFlag = true;
                    this.init()
                    console.log("订阅之后的item", selectItem)
                    wx.showToast({
                        title: title,
                        duration: 1000,
                        success(data) {
                            // _this.init(1)
                            // _this.init()
                            // _this.updateInit()
                        }
                    })


                }).catch(err => {
                    console.log("err", err)
                })
            },
            requestMsg(item) {//订阅 或者 拒绝
                return new Promise((resolve, reject) => {
                    var tmplId = wx.getStorageSync('xjsc_templateId')
                    // console.log('temlId', tmplId)
                    //Tk7Sec71wnVQH4Sj_UhUGr07M_lpnd-kYrHXGl-aqPY
                    console.log("订阅templeId1", tmplId)
                    console.log("订阅templeId2", [tmplId])
                    wx.requestSubscribeMessage({
                        tmplIds: [tmplId],
                        success: (res) => {
                            console.log("-----------------", res)
                            if (res[tmplId] === 'accept') {
                                resolve()
                                // wx.showToast({
                                //     title: '订阅OK！',
                                //     duration: 1000,
                                //     success(data) {
                                //         //成功

                                //         resolve()
                                //     }
                                // })
                            }
                        },
                        fail(err) {
                            //失败
                            console.error('onsole.log("看看ding订阅resxjsc_templateId",wx.getStorageSync失败', err);
                            reject()
                        }
                    })
                }, item)
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
    .show {
        position: relative;
        background: #eff1f6;
        .show-top-bg {
            display: inline-block;
            width: 100vw;
            height: 130px;
            font-size: 0;
            background-size: 100% 100%;
            img {
                display: inline-block;
                width: 100%;
                height: 100%;
                overflow: hidden;
                font-size: 12px;
            }
        }
        .show-tab {
            position: absolute;
            width: 100%;
            top: 110px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            overflow: hidden;
            background: #fff;
            .types {
                display: block;
                height: 45px;
                line-height: 45px;
                background: #f42c50;
                color: #fff;
                span {
                    position: relative;
                    font-family: PingFang SC bold;
                    font-size: 15px;
                    display: inline-block;
                    width: 50%;
                    text-align: center;
                    &.on {
                        &::after {
                            position: absolute;
                            display: inline-block;
                            width: 43px;
                            background: #fff;
                            height: 4px;
                            content: "";
                            bottom: 0;
                            border-radius: 2px;
                            left: calc(50% - 21.5px);
                            display: inline-block;
                        }
                    }
                }
            }
            .show-wrap-ul {
                .item-show {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 102.5px;
                    border-bottom: 1px solid #ccc;
                    margin-left: 20px;
                    padding-right: 24px;
                    .info {
                        max-width: 85%;
                        white-space: nowrap;
                        overflow: hidden;
                        p {
                            display: block;
                            width: 100%;
                            font-size: 15px;
                            color: #333333;
                            font-family: PingFang SC Medium;
                            &:first-of-type {
                                margin-bottom: 2px;
                            }
                            &:nth-of-type(2) {
                                font-family: PingFang SC Bold;
                                margin-bottom: 5px;
                            }
                            &:nth-of-type(3) {
                                font-family: PingFang SC Regular;
                                font-size: 11px;
                                color: #999999;
                            }
                        }
                    }
                    i {
                        display: inline-block;
                        width: 22.5px;
                        height: 22.5px;
                        overflow: hidden;
                        &.care {
                            background: url("https://cdn.51dmq.com/ui/showImg/heart.png")
                                no-repeat center;
                            background-size: 100% 100%;
                        }
                        &.noCare {
                            background: url("https://cdn.51dmq.com/ui/showImg/heart_grey.png")
                                no-repeat center;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            swiper {
                swiper-item {
                    height: 100%;
                    overflow: hidden;
                    overflow-y: scroll;
                }
            }
            .times {
                text-align: center;
                border-bottom: 1px solid #eee;
                box-sizing: border-box;
                box-shadow: 0 1px 1px 1.5px #eee;
                span {
                    display: inline-block;
                    width: 33%;
                    padding-top: 7.5px;
                    padding-bottom: 7.5px;
                    border-right: 1px solid #eeeeee;
                    font-family: PingFang SC Medium;
                    &:last-of-type {
                        border-right: 1px solid transparent;
                    }
                    p {
                        &:first-of-type {
                            display: block;
                            font-size: 13px;
                            color: #333333;
                        }
                        &:last-of-type {
                            font-size: 10px;
                        }
                    }
                    &.on {
                        p {
                            color: #ef0017;
                        }
                    }
                }
            }
        }
    }
</style>
