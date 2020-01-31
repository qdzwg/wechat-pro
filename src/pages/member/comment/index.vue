<template>
    <div class="commitEdit"
         :style="[{height:'calc(100vh - '+(navContentHeight+navBarHeight+'px')+')'}]">
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px')}">
            <navbar title='评论'></navbar>
            <form action="">
                <textarea name=""
                          id=""
                          cols="30"
                          rows="10"
                          v-model="commentContent"
                          placeholder="填写评论"></textarea>
                <div class="commontScore">
                    <span class="score-tip">满意度评分</span>
                    <div class='container'>
                        <div v-for="(item,index) in evaluations"
                             :key="index">
                            <div class='card-item'>
                                <!-- <div class='item-title'>
                                    <div class='image-container title-image'>
                                        <image :src='item.image'></image>
                                    </div>
                                    <div class='title-text'>{{item.name}}</div>
                                </div> -->
                                <div class='item-content'>
                                    <!-- <div class='image-container content-image'>
                                        <img :src="evaluationImgUrl"></img>
                                    </div> -->
                                    <div class='contet-text content-body'>
                                        <div v-for="(it,i) in starMap"
                                             :key="i">
                                            <div class='image-container'
                                                 @click='chooseStar(it)'>
                                                <img v-if="item.star >= i + 1"
                                                     :src='starCheckedImgUrl'>
                                                </img>
                                                <img v-if='item.star < i + 1'
                                                     :src='starUnCheckedImgUrl'></img>
                                            </div>
                                        </div>
                                        <text class='note'>{{item.note}}</text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="isAnonymous">
                    <input @click="checkboxSlect"
                           type="checkbox">
                    <span>匿名评论</span>
                </div>
                <button class="saveComments"
                        type="submit"
                        @click.prevent="saveComment">提交评论</button>
            </form>
        </div>
    </div>
</template>

<script>
    import api from "@/api/api";
    import { getData, postData, merchantInfoId } from "@/common/common";
    import navbar from "@/components/navbar";
    export default {
        components: {
            navbar
        },
        data() {
            return {
                orderDetailInfo: {},
                evaluationImgUrl: "https://s1.ax1x.com/2018/08/05/PDM8Bj.png",
                starCheckedImgUrl: "https://s1.ax1x.com/2018/08/05/PDQ0it.png",
                starUnCheckedImgUrl: "https://s1.ax1x.com/2018/08/05/PDQdII.png",
                // 建议内容
                opinion: "",
                starMap: [
                    { key: 1, value: '非常差' },
                    { key: 2, value: '差' },
                    { key: 3, value: '一般' },
                    { key: 4, value: '好' },
                    { key: 5, value: '非常好' },
                ],
                evaluations: [
                    {
                        id: 0,
                        name: "满意度评分",
                        image: "https://s1.ax1x.com/2018/08/05/PDMN40.png",
                        star: 0,
                        note: ""
                    }
                ],
                score: 0,
                commentContent: "",
                hasComment: false,
                id: "",//更新评论的id
                isAnonymous: false//匿名评论
            };
        },
        onLoad() {
            },
        onShow(){
            this.initData()
        },
        onHide(){
            this.commentContent = '';
            this.id = '';
            this.hasComment = false;
            this.score = 0,
            this.isAnonymous=false;
            this.evaluations[0].star=0;
            this.evaluations[0].note='';
            this.orderDetailInfo = {};
        },
        onUnload() { },
        methods: {
            checkboxSlect(e) {
                this.isAnonymous = !this.isAnonymous
            },
            getCommentInfo() {
                getData('/merchant/api/merchantProdComments/getMerchantProdCommentsNew', {
                    merchantInfoId: merchantInfoId,
                    id: this.orderDetailInfo.orderDetailVoList[0].goodsDependId,
                    productType: this.orderDetailInfo.orderType
                }).then(res => {
                    console.log('看看res', res)
                    if (res.status == 200) {
                        if (res.data[0] && res.data[0].content) {
                            this.commentContent = res.data[0].content
                            this.score = res.data[0].score
                            this.evaluations[0].star = this.score
                            this.id = res.data[0].id
                            this.hasComment = true
                        } else {
                            this.hasComment = false
                        }
                    }
                })
            },
            initData() { //获取订单信息
                console.log("----------------------订单详情")
                getData(this.api.order.detail, {
                    merchantInfoId: merchantInfoId,
                    payOrderNo: this.$root.$mp.query.payOrderNo,
                    wayType: 1
                }).then(res => {
                    //获取订单详情
                    console.log("获取订单详情", res);
                    this.orderDetailInfo = res.data
                    if (res.status == 200) {
                        this.getCommentInfo()
                    }
                })

            },
            chooseStar(e) {
                console.log(e)
                const star = e.key;
                this.evaluations[0].star = star;
                this.score = star
                this.evaluations[0].note = e.value;

            },
            saveComment() {
                if (this.commentContent == '') {
                    wx.showToast({
                        title: '请填写评论',
                        icon: "none",
                        duration: 2000
                    });
                    return
                }
                if (this.score == 0) {
                    wx.showToast({
                        title: '请选择评分',
                        icon: "none",
                        duration: 2000
                    });

                    return
                }
                let orderInfoContents = this.orderDetailInfo.orderDetailVoList[0]
                let saveUrl;
                let params = {
                    goodsCode: orderInfoContents.modelCode,
                    score: this.score,
                    content: this.commentContent,
                    enabled: "T",
                    productName: orderInfoContents.orderInfo,
                    productType: this.orderDetailInfo.orderType,
                    isAnonymous: this.isAnonymous ? "T" : "F",//匿名评论
                    orderNo: orderInfoContents.orderNo
                }
                if (this.hasComment) { //是否已经评论
                    saveUrl = '/merchant/api/merchantProdComments/updateComment'//更新评论
                    params.id = this.id
                } else {
                    saveUrl = '/merchant/api/merchantProdComments/saveComment' //保存评论
                }
                postData(saveUrl,params).then(res => {
                    if (res.status == 200) {
                        wx.showToast({
                            title: '评论成功',
                            duration: 2000,
                            success(data) {
                                let setTimeoutid = setTimeout(()=>{
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                    clearTimeout(setTimeoutid)
                                },2000)
                            }
                        })
                    }
                }).catch(err => {
                    console.log("ERROR", err)
                })
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
    textarea {
        padding: 5px 10px;
        display: block;
        width: 100%;
        background: #fff;
        font-size: 14px;
    }
    .isAnonymous {
        margin-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 14px;
    }
    .saveComments {
        margin-top: 20px;
    }
    .commontScore {
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 15px;
        .score-tip {
            display: inline-block;
            font-size: 14px;
            height: 35px;
            line-height: 35px;
            color: #333;
            vertical-align: middle;
        }
    }
    .commitEdit {
        background: #eff1f6;
        .container {
            height: 35px;
            line-height: 35px;
            margin-left: 10px;
            display: inline-block;
            vertical-align: middle;
        }
        .card .card-item {
            // margin-bottom: 25rpx;
            // border: 5rpx solid #888;
            // border-radius: 20rpx;
            // padding: 25rpx;
            vertical-align: middle;
            background-color: white;
        }

        .card-item .item-title,
        .card-item .item-content {
            height: 35px;
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: nowrap;
        }

        .card-item .item-title {
            border-bottom: 1rpx solid #eee;
            padding-bottom: 25rpx;
            align-items: center;
            line-height: 70rpx;
            font-weight: 700;
        }

        .card-item .item-content {
            // padding-top: 25rpx;
            line-height: 70rpx;
        }

        .card-item .image-container {
            margin-right: 25rpx;
            width: 40rpx;
            display: flex;
            align-items: center;
        }

        .card-item .title-image {
            height: 40rpx;
        }

        .card-item .content-image {
            height: 70rpx;
        }

        .card-item .image-container image {
            width: 40rpx;
            height: 40rpx;
        }

        .card-item .title-text,
        .card-item .content-text {
            width: 575rpx;
        }

        /* feedback.wxss */
        .card-item .content-body {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .card-item .content-body .note {
            line-height: 70rpx;
            font-size: 30rpx;
        }
    }
</style>
