<template>
    <div class="order-detail">
        <navbar title='订单详情'></navbar>
        <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
            <!-- <div class="topShadow"></div> -->
            <div class="order-top boxshadow">
                <div class="state"
                     :class="{complate:orderNum=='4',over:orderNum=='5'}">
                    <div class="order-top-bg wait_pay"
                         v-if="orderNum == 0">
                        <div class="order-status">待支付</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 3">
                        <div class="order-status">待消费</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 1">
                        <div class="order-status">待发货</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 2">
                        <div class="order-status">待收货</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 8">
                        <div class="order-status">异常订单</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 9">
                        <div class="order-status">订单待确认</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 10">
                        <div class="order-status">部分入住</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 13">
                        <div class="order-status">Noshow</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 14">
                        <div class="order-status">预定成功</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 16">
                        <div class="order-status">全部入住</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 17">
                        <div class="order-status">待接单</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 18">
                        <div class="order-status">已接单</div>
                    </div>
                    <div class="order-top-bg toPlay"
                         v-if="orderNum == 24">
                        <div class="order-status">服务中</div>
                    </div>
                    <div class="order-top-bg complete_pay"
                         v-if="orderNum == 4">
                        <div class="order-status">已完成</div>
                    </div>
                    <div class="order-top-bg complete_pay"
                         v-if="orderNum == 5">
                        <div class="order-status">已关闭</div>
                    </div>
                    <div class="order-top-bg complete_pay"
                         v-if="orderNum == 12">
                        <div class="order-status">已取消</div>
                    </div>
                    <div class="order-top-bg complete_pay"
                         v-if="orderNum == 15">
                        <div class="order-status">已拒绝</div>
                    </div>
                    <div class="order-top-bg complete_pay"
                         v-if="orderNum == 19">
                        <div class="order-status">已拒接</div>
                    </div>
                    <div class="order-top-bg complete_pay"
                         v-if="orderNum == 22">
                        <div class="order-status">交易成功</div>
                    </div>
                    <div class="order-top-bg complete_pay"
                         v-if="orderNum == 23">
                        <div class="order-status">交易失败</div>
                    </div>
                    <div class="order-top-bg toReturn"
                         v-if="orderNum == 6">
                        <div class="order-status">退款</div>
                    </div>
                    <div class="order-top-bg toReturn"
                         v-if="orderNum == 7">
                        <div class="order-status">已退款</div>
                    </div>
                    <div class="order-top-bg toReturn"
                         v-if="orderNum == 11">
                        <div class="order-status">部分退房</div>
                    </div>
                    <div class="order-top-bg toReturn"
                         v-if="orderNum == 20">
                        <div class="order-status">退款审核中</div>
                    </div>
                    <div class="order-top-bg toReturn"
                         v-if="orderNum == 21">
                        <div class="order-status">智游宝发起退单</div>
                    </div>
                    <div class="text">
                        <!-- 待付款 -->
                        <!-- <i v-if="orderNum=='0'"
                           class="xx-icon icon-iconfont-yizhifu1 state-svg"></i> -->
                        <!-- 待发货 -->
                        <!-- <i v-if="orderNum=='1'"
                           class="xx-icon icon-daifahuo state-svg"></i> -->
                        <!-- 待收货 -->
                        <!-- <i v-if="orderNum=='2'"
                           class="xx-icon icon-daishouhuo state-svg"></i> -->
                        <!-- 待消费 -->
                        <!-- <i v-if="orderNum=='3'"
                           class="xx-icon icon-qrcode state-svg"></i> -->
                        <!-- 退款中 -->
                        <!-- <i v-if="orderNum=='6'"
                           class="xx-icon icon-tuikuan- state-svg"></i> -->
                        <!-- 已关闭 -->
                        <!-- <i v-if="orderNum=='5'"
                           class="xx-icon icon-guanbi2 state-svg"></i> -->
                        <!-- 已完成 -->
                        <!-- <i v-if="orderNum=='4'"
                           class="xx-icon icon-yuanxingxuanzhong state-svg"></i>
                        <div class="content"> {{pageData.orderStateName}}</div> -->
                        <!-- {{pageData.orderType}}{{orderNum}} -->
                    </div>

                    <template v-if="pageData.orderType=='hotel'">
                        <!-- 酒店 -->
                        <!-- 订单待确认 -->
                        <!-- <div v-if="orderNum=='9'"
                             class="notice">等待酒店确认房间，超时未确认将自动取消订单</div> -->
                        <!-- 待支付 -->
                        <!-- <div v-if="orderNum=='0'"
                             class="notice">{{hour}}小时{{min}}分{{seconds}}秒后订单自动关闭</div> -->
                        <!-- 待消费 -->
                        <!-- <div v-if="orderNum=='3'"
                             class="notice">凭电子二维码可直接检票入住</div> -->
                        <!-- 退款中 -->
                        <!-- <div v-if="orderNum=='6'"
                             class="notice">您已发起退款,等待商家审核确认 </div> -->
                        <!-- 已经完成 -->
                        <!-- <div v-if="orderNum=='4'"
                             class="notice">订单已成交,期待您再次光临</div> -->
                        <!-- 已关闭   -->
                        <!-- <div v-if="orderNum=='5'"
                             class="notice">订单被取消或支付超时自动关闭</div> -->
                    </template>

                    <template v-if="pageData.orderType=='park'||pageData.orderType=='show'||pageData.orderType=='eatery'||pageData.orderType=='route'">
                        <!-- 景区门票 -->
                        <!-- 订单异常 -->
                        <!-- <div v-if="orderNum=='8'"
                             class="notice">订单状态异常，请询问店铺客服</div> -->
                        <!-- 待支付 -->
                        <!-- <div v-if="orderNum=='0'"
                             class="notice">{{hour}}小时{{min}}分{{seconds}}秒后订单自动关闭</div> -->
                        <!-- 待消费 -->
                        <!-- <div v-if="orderNum=='3'&&pageData.orderType=='park'"
                             class="notice">凭电子二维码可直接检票入园</div>
                        <div v-if="orderNum=='3'&&pageData.orderType=='eatery'"
                             class="notice">凭订单到店消费</div>
                        <div v-if="orderNum=='3'&&pageData.orderType=='route'"
                             class="notice">凭订单到指定地点集合</div> -->
                        <!-- 退款中 -->
                        <!-- <div v-if="orderNum=='6'"
                             class="notice">您已发起退款,等待商家审核确认</div> -->
                        <!-- 已经完成 -->
                        <!-- <div v-if="orderNum=='4'"
                             class="notice">订单已成交,期待您再次光临</div> -->
                        <!-- 已关闭   -->
                        <!-- <div v-if="orderNum=='5'"
                             class="notice">订单被取消或支付超时自动关闭</div> -->
                    </template>

                    <template v-if="pageData.orderType=='mdse'">
                        <!-- 商品 -->
                        <!-- 待支付 -->
                        <div v-if="orderNum=='0'"
                             class="notice">{{hour}}小时{{min}}分{{seconds}}秒后订单自动关闭</div>
                        <!-- 待发货 -->
                        <div v-if="orderNum=='1'"
                             class="notice">商家正在为您精心挑选货品</div>
                        <!-- 待收货 -->
                        <div v-if="orderNum=='2'"
                             class="notice">商品正在向您狂奔而来</div>
                        <!-- 退款中 -->
                        <div v-if="orderNum=='6'"
                             class="notice">您已发起退款，等待商家审核确认</div>
                        <!-- 已完成   -->
                        <div v-if="orderNum=='4'"
                             class="notice">订单已成交，期待您再次光临</div>
                        <!-- 已关闭   -->
                        <div v-if="orderNum=='5'"
                             class="notice">订单被取消或支付超时自动关闭</div>
                    </template>

                </div>
            </div>
            <div class="orderDetailInner">
                <!-- 酒店 -->
                <template v-if="pageData.orderType=='hotel'">
                    <!-- <div class="play-time boxshadow">
                        <span class="title">{{(pageData.payStatus==0 || !pageData.orderNo)?'':"订单编号："+pageData.orderNo}}</span>
                        <span class="text" v-if='iswaitpay'>{{"待支付"}}</span>
                        <span class="text" v-else>{{"待消费"}}</span>
                    </div> -->
                    <orderStatus :payStatus='pageData.payStatus' :orderNo='pageData.orderNo' :orderNum="orderNum"></orderStatus>
                    <div v-for="(item, index) in pageData.orderDetailVoList"
                         :key="index"
                         class="repast-order-name">
                        <p class="name">{{item.orderInfo}}{{item.orderTypeName}}</p>
                        <div class="order-price clearfix">
                            <span class="price fl">联系人</span>
                            <span class="amount fr">{{pageData.linkName}}</span>
                        </div>
                        <div class="order-price clearfix">
                            <span class="price fl">价格</span>
                            <span class="amount fr">￥{{item.price}}</span>
                        </div>
                        <div class="order-price clearfix">
                            <span class="price fl">数量</span>
                            <span class="amount fr">×{{item.amount}}</span>
                        </div>
                        <!-- <div class="order-price clearfix">
                                <span class="price fl">出游日期</span>
                                <span class="amount fr" >{{pageData.startTime}}</span>
                            </div> -->
                    </div>
                    <!-- <div class="hotel-time boxshadow">
                        <div class="time-info">
                            <span class="title">入住时间</span>
                            <span class="time">{{pageData.startDate}}</span>
                        </div>
                        <div class="time-info">
                            <span class="title">离店时间</span>
                            <span class="time">{{pageData.endDate}}</span>
                        </div>
                    </div> -->
                    <!-- <div class="list-item"
                         v-for='(item,index) in pageData.orderDetailVoList'
                         :key='index'>
                        <div class="head-item">
                            <div class="head two-line">{{item.orderInfo}}</div>
                            <div class="clearfix price-num">
                                <div class='fl price'>
                                    <span class="unit">￥</span>
                                    <span class="price-num">{{item.price}}</span>
                                </div>
                                <div class="fr num">
                                    <span class="x">x</span>
                                    <span class="detail-num">{{item.amount}}</span>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="info-item"> -->
                    <!-- 待消费-退票中-已完成 -->
                    <!-- <div v-if="orderNum=='3'||orderNum=='4'||orderNum=='6'"
                             class="check-info">
                            <div class="info">
                                <span class="check-state">已检票</span>
                                <span class="num">{{pageData.orderDetail[0].checkAmount }}</span>
                            </div>
                            <div class="info">
                                <span class="check-state">已退票</span>
                                <span class="num">{{pageData.orderDetail[0].refundAmount}}</span>
                            </div>
                        </div>
                    </div> -->

                    <!-- //联系人 -->
                    <!-- <div class="info-item">
                        <div class="clearfix item">
                            <span class="fl left-title">姓名</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkName}}</span>
                            </div>
                        </div>
                        <div class="clearfix item">
                            <span class="fl left-title">手机号</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkMobile}}</span>
                            </div>
                        </div>
                        <div class="clearfix item">
                            <span class="fl left-title">身份证</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkIdcard}}</span>
                            </div>
                        </div>
                    </div> -->
                    <div class="order-detail-info border-bottom-radious boxshadow">
                        <div class="orderno-date ">
                            <span class="text">酒店总金额:</span>
                            <span class="content">￥{{pageData.orderSum}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">优惠券抵扣:</span>
                            <span class="content">￥{{pageData.couponSum!=0?('-' + pageData.couponSum):0}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">积分抵扣:</span>
                            <span class="content">￥{{pageData.dedutionMoney&&pageData.dedutionMoney!=0?('-' + pageData.dedutionMoney):0}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">应付金额:</span>
                            <span class="content red">￥{{pageData.paySum}}</span>
                        </div>
                        <!-- //退款状态-退款金额展示 -->
                        <div v-if="refundData.refundSum&&pageData.orderStatus=='6'"
                             class="orderno-date ">
                            <span class="text">预退金额:</span>
                            <span class="content red">￥{{refundData.refundSum}}</span>
                        </div>
                        <!-- //已完成-退款金额展示 -->
                        <div v-if="pageData.refundSum"
                             class="orderno-date ">
                            <span class="text">退款金额:</span>
                            <span class="content red">￥{{pageData.refundSum}}</span>
                        </div>
                    </div>
                </template>
                <template v-if="(pageData.orderType=='park'||pageData.orderType=='show')">
                    <!-- //景区门票 -->
                    <orderStatus :payStatus='pageData.payStatus' :orderNo='pageData.orderNo' :orderNum="orderNum"></orderStatus>
                    <!-- <div class="play-time m-b-10 boxshadow">
                        <span class="title">游玩日期</span>
                        <span class="text">{{pageData.startDate}}</span>
                    </div> -->
                    <!-- 门票信息 -->
                    <div>
                        <div class="list-item"
                             v-for='(item,index) in pageData.orderDetailVoList'
                             :key='index'>
                            <div class="head-item">
                                <div class="head two-line commonLineHeight">{{item.orderInfo}}</div>
                                <div class="fsyy-time"
                                     v-if="fsStartTime&&fsEndTime&&!iswaitpay">
                                    预约时间：{{fsStartTime}} - {{fsEndTime}}
                                </div>
                                <div class="clearfix item">
                                    <span class="fl left-title">联系人</span>
                                    <div class="fr right-content">
                                        <span>{{pageData.linkName}}</span>
                                    </div>
                                </div>
                                <div class="clearfix price-num">
                                    <div class='fl price'>
                                        <span class="unit">单价</span>
                                    </div>
                                    <div class="fr num">
                                        <span class="detail-num">{{item.price}}</span>
                                    </div>
                                </div>
                                <div class="clearfix price-num">
                                    <div class='fl price'>
                                        <span class="unit">数量</span>
                                        <!-- <span class="price-num">{{item.price}}</span> -->
                                    </div>
                                    <div class="fr num">
                                        <span class="x">x</span>
                                        <span class="detail-num">{{item.amount}}</span>
                                    </div>
                                </div>
                                <div class="clearfix price-num">
                                    <div class='fl price'>
                                        <span class="unit">出游日期</span>
                                        <!-- <span class="price-num">{{item.price}}</span> -->
                                    </div>
                                    <div class="fr num">
                                        <!-- <span class="x">x</span> -->
                                        <span class="detail-num">{{pageData.startDate}}</span>
                                    </div>
                                </div>
                            </div>
                            <template v-if="orderNum==0">
                                <!-- <div v-if='item.orderDetailModels&&item.orderDetailModels.length'
                                     class="info-item"> -->
                                    <!-- //实名制非实名制区别 -->
                                    <!-- //待付款 -->
                                    <!-- <div class="real-user-item"
                                         v-for="(it,i) in item.orderDetailModels"
                                         :key='i'>
                                        <div class="item user-sort-name">
                                            <span> 实名游客{{i+1}}</span>
                                        </div>
                                        <div class="clearfix item">
                                            <span class="fl left-title">姓名</span>
                                            <div class="fl right-content">
                                                <span>{{it.linkMan}}</span>
                                            </div>
                                        </div>
                                        <div class="clearfix item">
                                            <span class="fl left-title">身份证</span>
                                            <div class="fl right-content">
                                                <span>{{it.idcardNo}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                            </template>
                            <template v-else>
                                <!-- <div v-if='pageData.odmList&&pageData.odmList.length'
                                     class="info-item"> -->
                                    <!-- //实名制非实名制区别 -->
                                    <!-- //非待付款 -->
                                    <!-- <div class="real-user-item"
                                         v-for="(it,i) in pageData.odmList"
                                         :key='i'>
                                        <div class="item user-sort-name">
                                            <span> 实名游客{{i+1}}</span>
                                            <span v-if="it.refunding=='T'"
                                                  style="color:#f05b47"
                                                  class="fr">退票中</span>
                                            <span v-if="it.refunded=='T'"
                                                  style="color:#f05b47"
                                                  class="fr">已退票</span>
                                            <span v-if="it.checked=='T'"
                                                  style="color:#f05b47"
                                                  class="fr">已检票</span>
                                        </div>
                                        <div class="clearfix item">
                                            <span class="fl left-title">姓名</span>
                                            <div class="fl right-content">
                                                <span>{{it.linkMan}}</span>
                                            </div>
                                        </div>
                                        <div class="clearfix item">
                                            <span class="fl left-title">身份证</span>
                                            <div class="fl right-content">
                                                <span>{{it.idcardNo}}</span>
                                            </div>
                                        </div>
                                    </div> -->
                                <!-- </div> -->
                            </template>
                        </div>
                    </div>
                    <!-- <div class="info-item"> -->
                    <!-- 待消费-退票中-已完成 -->
                    <!-- <div v-if="orderNum=='3'||orderNum=='4'||orderNum=='6'"
                            class="check-info">
                            <div class="info">
                                <span class="check-state">已检票</span>
                                <span class="num">{{pageData.orderDetail[0].checkAmount }}</span>
                            </div>
                            <div class="info">
                                <span class="check-state">已退票</span>
                                <span class="num">{{pageData.orderDetail[0].refundAmount}}</span>
                            </div>
                        </div>
                    </div> -->
                    <!-- //联系人 -->
                    <!-- <div class="info-item">
                        <div class="clearfix item">
                            <span class="fl left-title">联系人</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkName}}</span>
                            </div>
                        </div>
                        <div class="clearfix item">
                            <span class="fl left-title">手机号</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkMobile}}</span>
                            </div>
                        </div>
                        <div class="clearfix item">
                            <span class="fl left-title">身份证</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkIdcard}}</span>
                            </div>
                        </div>
                        <div v-if="pageData.faceUrl"
                            class="clearfix item face-item">
                            <span class="fl left-title">人脸照</span>
                            <div class="fl right-content face-content">
                                <img class="face-img"
                                    :src="pageData.faceUrl"
                                    alt="">
                            </div>
                        </div>
                    </div> -->
                    <div class="order-detail-info border-bottom-radious boxshadow">
                        <div class="orderno-date ">
                            <span class="text">商品金额:</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.orderSum}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">优惠券抵扣:</span>
                            <span class="content">￥{{pageData.couponSum!=0?('-' + pageData.couponSum):0}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">积分抵扣:</span>
                            <span class="content">￥{{pageData.dedutionMoney&&pageData.dedutionMoney&&pageData.dedutionMoney!=0?('-' + pageData.dedutionMoney):0}}</span>
                        </div>
                        <!-- <div class="orderno-date ">
                            <span class="text">优惠券抵扣</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.couponSum}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">积分抵扣</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.dedutionMoney}}</span>
                        </div> -->
                        <div class="orderno-date ">
                            <span class="text">应付金额</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{pageData.paySum}}</span>
                        </div>
                        <!-- //退款状态-退款金额展示 -->
                        <div v-if="refundData.refundSum&&pageData.orderStatus=='6'"
                             class="orderno-date ">
                            <span class="text">预退金额:</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{refundData.refundSum}}</span>
                        </div>
                        <!-- //已完成-退款金额展示 -->
                        <div v-if="pageData.refundSum"
                             class="orderno-date ">
                            <span class="text">退款金额:</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{pageData.refundSum}}</span>
                        </div>
                    </div>
                </template>
                <template v-if="pageData.orderType=='mdse'">
                    <!-- 商品 -->
                    <!-- 商品地址信息 -->
                    <div class="receiver-info boxshadow">
                        <div class="left">
                            <i class="xx-icon icon-shouhuodizhi address-svg"></i>
                            <div class="default-receiver">
                                <div class="name-tel">
                                    <div class="name">
                                        <span class="text">收货人:</span>
                                        {{pageData.linkName}}
                                    </div>
                                    <div class="tel">
                                        {{pageData.linkMobile}}
                                    </div>
                                </div>
                                <div class="address">地址:{{pageData.linkAddr}}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="orderNum=='2'"
                         class="express-info boxshadow">
                        <div class="text-express left3"
                             v-if="pageData.expressType=='sjtcps'">
                            <span>商家同城配送：{{pageData.expressMsg}}</span>
                        </div>
                        <div v-if="pageData.expressType!='sjtcps'"
                             class="text-express left2">
                            <span>快递：{{pageData.expressName}}</span>
                        </div>
                        <div v-if="pageData.expressType!='sjtcps'"
                             class="text-express right2">
                            <span>快递单号：{{pageData.expressNo}}</span>
                        </div>
                    </div>
                    <!-- //商品待付款 -->
                    <div v-if='iswaitpay'
                         class="goods-list boxshadow">
                        <div v-for='(item,index) in pageData.orderDetailVoList'
                             :key='index'
                             class="goods-item">
                            <img v-if="item.linkMobileImg"
                                 class="goods-img fl"
                                 :src="item.linkMobileImg"
                                 alt="">
                            <img v-else
                                 src="http://statics.lotsmall.cn/wx/img/lose.png"
                                 class="goods-img fl"
                                 alt="">
                            <div class="goods-info">
                                <div class="info-box">
                                    <div class="goods-title two-line">
                                        {{item.orderInfo}}
                                    </div>
                                    <div class="spec-ul">
                                        <span v-if='item.specArr&&item.specArr.length'
                                              v-for='(specStr,specIndex) in item.specArr'
                                              :key='specIndex'
                                              class="spec-li">{{specStr}}</span>
                                    </div>
                                </div>
                                <div class="goods-price clearfix">
                                    <div class="price fl">
                                        <span class="unit">￥</span>
                                        <span class="num">{{item.price}}</span>
                                    </div>
                                    <div class="buy-num fr">
                                        <span class="x">x</span>{{item.amount}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 非待付款状态 -->
                    <div v-else
                         class="goods-list boxshadow">
                        <div v-if='pageData.orderDetailVoList&&pageData.orderDetailVoList.length'
                             v-for='(item,index) in pageData.orderDetailVoList'
                             :key='index'
                             class="goods-item">
                            <img v-if='item.mdseDetail&&item.mdseDetail.linkImg'
                                 class="goods-img fl"
                                 :src="item.mdseDetail.linkImg"
                                 alt="">
                            <img v-else
                                 src="http://statics.lotsmall.cn/wx/img/lose.png"
                                 class="goods-img fl"
                                 alt="">
                            <div class="goods-info">
                                <div class="info-box">
                                    <div class="goods-title two-line">
                                        {{item.orderInfo}}
                                    </div>
                                    <div class="spec-ul">
                                        <span v-for='(specStr,specIndex) in pageData.specArr'
                                              :key='specIndex'
                                              class="spec-li">{{specStr}}</span>
                                    </div>
                                </div>
                                <div class="goods-price clearfix">
                                    <div class="price fl">
                                        <span class="unit">￥</span>
                                        <span class="num">{{item.price}}</span>
                                    </div>
                                    <div class="buy-num fr">
                                        <span class="x">x</span>{{item.amount}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="order-detail-info border-bottom-radious  boxshadow">
                        <div class="orderno-date ">
                            <span class="text">商品金额:</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.orderSum}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">运费:</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.postage}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">优惠券抵扣:</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.couponSum!=0?('-' + pageData.couponSum):0}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">积分抵扣:</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.dedutionMoney&&pageData.dedutionMoney!=0?('-' + pageData.dedutionMoney):0}}</span>
                        </div>
                        <div class="orderno-date clearfix">
                            <span class="text">:</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{pageData.paySum}}</span>
                        </div>
                        <div v-if="refundData.refundSum&&pageData.orderStatus=='6'"
                             class="orderno-date ">
                            <span class="text">预退金额:</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{refundData.refundSum}}</span>
                        </div>
                        <!-- 已经完成但是不是正常的完成单的时候才有退款金额 -->
                        <div v-if="pageData.refundSum"
                             class="orderno-date ">
                            <span class="text">退款金额:</span>
                            <span class="content red">￥{{pageData.refundSum}}</span>
                        </div>
                    </div>
                </template>
                <!-- 餐馆餐券 -->
                <tempalte v-if="pageData.orderType=='eatery'">
                    <div class="iswaitpay"
                         v-if="iswaitpay">
                        <orderStatus :payStatus='pageData.payStatus' :orderNo='pageData.orderNo' :orderNum="orderNum"></orderStatus>
                        <div v-for="(item, index) in pageData.orderDetailVoList"
                             :key="index"
                             class="repast-order-name">
                            <p class="name">{{item.orderInfo}}{{item.orderTypeName}}</p>
                            <div class="order-price clearfix">
                                <span class="price fl">联系人</span>
                                <span class="amount fr">{{pageData.linkName}}</span>
                            </div>
                            <div class="order-price clearfix">
                                <span class="price fl">价格</span>
                                <span class="amount fr">￥{{item.price}}</span>
                            </div>
                            <div class="order-price clearfix">
                                <span class="price fl">数量</span>
                                <span class="amount fr">×{{item.amount}}</span>
                            </div>
                            <!-- <div class="order-price clearfix">
                                <span class="price fl">出游日期</span>
                                <span class="amount fr" >{{pageData.startTime}}</span>
                            </div> -->

                        </div>
                        <!-- <div v-for="(item, index) in pageData.orderDetailVoList"
                             :key="index"
                             class="repast-order-name">
                            <p class="name">{{item.orderInfo}}</p>
                            <div class="order-price clearfix">
                                <span class="price fl">￥{{item.price}}</span>
                                <span class="amount fr">×{{item.amount}}</span>
                            </div>
                        </div>
                        <div class="info-item"
                             v-if="orderNum=='3'||orderNum=='4'||orderNum=='6'"> -->
                        <!-- 待消费-退票中-已完成 -->
                        <!-- <div class="check-info">
                                <div class="info">
                                    <span class="check-state">已检票</span>
                                    <span class="num">{{pageData.orderDetail[0].checkAmount }}</span>
                                </div>
                                <div class="info">
                                    <span class="check-state">已退票</span>
                                    <span class="num">{{pageData.orderDetail[0].refundAmount}}</span>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div v-else
                         class="unwaitpay">
                         <orderStatus :payStatus='pageData.payStatus' :orderNo='pageData.orderNo' :orderNum="orderNum"></orderStatus>
                        <!-- <div class="play-time boxshadow">
                            <span class="title">{{(pageData.payStatus==0 || !pageData.orderNo)?'':"订单编号："+pageData.orderNo}}</span>
                            <span class="text">{{"待消费"}}</span>
                        </div> -->
                        <div v-for="(item, index) in pageData.orderDetailVoList"
                             :key="index"
                             class="repast-order-name">
                            <p class="name">{{item.orderInfo}}{{item.orderTypeName}}</p>
                            <div class="order-price clearfix">
                                <span class="price fl">联系人</span>
                                <span class="amount fr">{{pageData.linkName}}</span>
                            </div>
                            <div class="order-price clearfix">
                                <span class="price fl">价格</span>
                                <span class="amount fr">￥{{item.price}}</span>
                            </div>
                            <div class="order-price clearfix">
                                <span class="price fl">数量</span>
                                <span class="amount fr">×{{item.amount}}</span>
                            </div>
                            <!-- <div class="order-price clearfix">
                                <span class="price fl">出游日期</span>
                                <span class="amount fr">{{item.modifyTime}}</span>
                            </div> -->
                        </div>
                        <!-- <div class="user-time">
                            <div class="user-item clearfix">
                                <span class="label-title fl">有效期</span>
                                <span class="time fr">{{pageData.repastCheckDate}}</span>
                            </div>
                            <div class="user-item user-top clearfix">
                                <span class="label-title fl">使用星期</span>
                                <span class="time fr">{{pageData.repastUseDate}}</span>
                            </div>
                        </div>
                        <div class="repast-order-name">
                            <p class="name">{{pageData.orderInfo}}</p>
                            <div class="order-price clearfix">
                                <span class="price fl">￥{{pageData.price}}</span>
                                <span class="amount fr">×{{pageData.amount}}</span>
                            </div>
                        </div> -->
                        <!-- <div class="info-item"
                             v-if="orderNum=='3'||orderNum=='4'||orderNum=='6'"> -->
                        <!-- 待消费-退票中-已完成 -->
                        <!-- <div class="check-info">
                                <div class="info">
                                    <span class="check-state">已检票</span>
                                    <span class="num">{{pageData.orderDetail[0].checkAmount }}</span>
                                </div>
                                <div class="info">
                                    <span class="check-state">已退票</span>
                                    <span class="num">{{pageData.orderDetail[0].refundAmount}}</span>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <!-- <div class="info-item">
                        <div class="clearfix item"
                             v-if="pageData.linkName&&pageData.linkName!=''">
                            <span class="fl left-title">联系人</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkName}}</span>
                            </div>
                        </div>
                        <div class="clearfix item"
                             v-if="pageData.linkMobile&&pageData.linkMobile!=''">
                            <span class="fl left-title">手机号</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkMobile}}</span>
                            </div>
                        </div>
                        <div class="clearfix item"
                             v-if="pageData.linkIdcard&&pageData.linkIdcard!=''">
                            <span class="fl left-title">身份证</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkIdcard}}</span>
                            </div>
                        </div>
                    </div> -->
                    <div class="order-detail-info  boxshadow border-bottom-radious">
                        <div class="orderno-date ">
                            <span class="text">商品金额:</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.orderSum}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">优惠券抵扣:</span>
                            <span class="content">￥{{pageData.couponSum!=0?('-' + pageData.couponSum):0}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">积分抵扣:</span>
                            <span class="content">￥{{pageData.dedutionMoney&&pageData.dedutionMoney!=0?('-' + pageData.dedutionMoney):0}}</span>
                        </div>
                        <!-- <div class="orderno-date ">
                            <span class="text">优惠券抵扣</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.couponSum}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">积分抵扣</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.dedutionMoney}}</span>
                        </div> -->
                        <div class="orderno-date ">
                            <span class="text">应付金额</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{pageData.paySum}}</span>
                        </div>
                        <!-- //退款状态-退款金额展示 -->
                        <div v-if="refundData.refundSum&&pageData.orderStatus=='6'"
                             class="orderno-date ">
                            <span class="text">预退金额:</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{refundData.refundSum}}</span>
                        </div>
                        <!-- //已完成-退款金额展示 -->
                        <div v-if="pageData.refundSum"
                             class="orderno-date ">
                            <span class="text">退款金额:</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{pageData.refundSum}}</span>
                        </div>
                    </div>
                </tempalte>
                <!--跟团游-->
                <template v-if="pageData.orderType =='route'">
                    <!--待支付-->
                    <div class="iswaitpay"
                         v-if="iswaitpay">
                        <!-- <div class="user-time">
                            <div class="user-item user-top clearfix">
                                <span class="label-title fl">出行日期</span>
                                <span class="time fr">{{pageData.orderDetailVoList[0].routeStartDate}}~{{pageData.orderDetailVoList[0].routeEndDate}}</span>
                            </div>
                        </div> -->
                        <!-- <div class="play-time boxshadow">
                            <span class="title"></span>
                            <span class="text">{{"待销费"}}</span>
                        </div>
                        <div v-for="(item, index) in pageData.orderDetailVoList"
                             :key="index"
                             class="repast-order-name">
                            <p class="name">{{item.orderInfo}}{{item.orderTypeName}}</p>
                            <div class="order-price clearfix">
                                <span class="price fl">￥{{item.price}}</span>
                                <span class="amount fr">×{{item.amount}}</span>
                            </div>
                        </div> -->
                        <orderStatus :payStatus='pageData.payStatus' :orderNo='pageData.orderNo' :orderNum="orderNum"></orderStatus>
                        <div v-for="(item, index) in pageData.orderDetailVoList"
                             :key="index"
                             class="repast-order-name">
                            <p class="name">{{item.orderInfo}}{{item.orderTypeName}}</p>
                            <div class="order-price clearfix">
                                <span class="price fl">联系人</span>
                                <span class="amount fr">{{pageData.linkName}}</span>
                            </div>
                            <div class="order-price clearfix">
                                <span class="price fl">价格</span>
                                <span class="amount fr">￥{{item.price}}</span>
                            </div>
                            <div class="order-price clearfix">
                                <span class="price fl">数量</span>
                                <span class="amount fr">×{{item.amount}}</span>
                            </div>
                            <div class="order-price clearfix">
                                <span class="price fl">出游日期</span>
                                <span class="amount fr">{{pageData.startDate}}</span>
                            </div>

                        </div>
                    </div>
                    <!--非待支付-->
                    <div v-else>
                        <!-- <div class="user-time">
                            <div class="user-item user-top clearfix">
                                <span class="label-title fl">出行日期</span>
                                <span class="time fr">{{pageData.startTime}}~{{pageData.endTime}}</span>
                            </div>
                        </div> -->
                        <orderStatus :payStatus='pageData.payStatus' :orderNo='pageData.orderNo' :orderNum="orderNum"></orderStatus>
                        <div v-for="(item, index) in pageData.orderDetail"
                             :key="index"
                             class="repast-order-name">
                            <p class="name">{{item.orderInfo}}{{item.orderTypeName}}</p>
                            <div class="order-price clearfix">
                                <span class="price fl">联系人</span>
                                <span class="amount fr">{{pageData.linkName}}</span>
                            </div>
                            <div class="order-price clearfix">
                                <span class="price fl">价格</span>
                                <span class="amount fr">￥{{item.price}}</span>
                            </div>
                            <div class="order-price clearfix">
                                <span class="price fl">数量</span>
                                <span class="amount fr">×{{item.amount}}</span>
                            </div>
                            <div class="order-price clearfix">
                                <span class="price fl">出游日期</span>
                                <span class="amount fr">{{pageData.startTime}}</span>
                            </div>

                        </div>
                    </div>
                    <!-- <div class="info-item">
                        
                        <div class="clearfix item">
                            <span class="fl left-title">联系人</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkName}}</span>
                            </div>
                        </div>
                        <div class="clearfix item">
                            <span class="fl left-title">手机号</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkMobile}}</span>
                            </div>
                        </div>
                        <div class="clearfix item">
                            <span class="fl left-title">身份证</span>
                            <div class="fl right-content">
                                <span>{{pageData.linkIdcard}}</span>
                            </div>
                        </div>
                    </div> -->
                    <div class="order-detail-info  boxshadow border-bottom-radious">
                        <div class="orderno-date ">
                            <span class="text">商品金额:</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.orderSum}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">优惠券抵扣:</span>
                            <span class="content">￥{{pageData.couponSum!=0?('-' + pageData.couponSum):0}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">积分抵扣:</span>
                            <span class="content">￥{{pageData.dedutionMoney&&pageData.dedutionMoney!=0?('-' + pageData.dedutionMoney):0}}</span>
                        </div>
                        <!-- <div class="orderno-date ">
                            <span class="text">优惠券抵扣</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.couponSum}}</span>
                        </div>
                        <div class="orderno-date ">
                            <span class="text">积分抵扣</span>
                            <span class="content"><em class="moneyFlat">￥</em>{{pageData.dedutionMoney}}</span>
                        </div> -->
                        <div class="orderno-date ">
                            <span class="text">应付金额</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{pageData.paySum}}</span>
                        </div>
                        <!-- //退款状态-退款金额展示 -->
                        <div v-if="refundData.refundSum&&pageData.orderStatus=='6'"
                             class="orderno-date ">
                            <span class="text">预退金额:</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{refundData.refundSum}}</span>
                        </div>
                        <!-- //已完成-退款金额展示 -->
                        <div v-if="pageData.refundSum"
                             class="orderno-date ">
                            <span class="text">退款金额:</span>
                            <span class="content red"><em class="moneyFlat">￥</em>{{pageData.refundSum}}</span>
                        </div>
                    </div>
                </template>
                <!-- <div class="order-detail-info bg-w m-b-10 boxshadow"> -->
                <!-- 除了待付款状态没有订单号别的状态下都有订单号 -->
                <!-- <div v-if="orderNum!='0'"
                         class="orderno-date clearfix m-b">
                        <span class="text bottom">订单号: {{pageData.orderNo}}</span> -->
                <!-- <span @click="copy" class="copy-btn">复制</span> -->
                <!-- </div>
                    <div class="orderno-date clearfix m-b">
                        <span class="text bottom">交易流水号: {{pageData.payOrderNo}}</span>
                    </div>
                    <div class="orderno-date clearfix m-b">
                        <span class="text bottom">下单时间: {{pageData.orderTime?pageData.orderTime:pageData.createTime}}</span>
                    </div>
                </div> -->

                <template v-if="pageData.orderType=='hotel'">
                    <!-- 酒店 -->
                    <!-- 待付款 -->
                    <div v-if="orderNum=='0'"
                         class="bottom-fixed">
                        <div class="line-5"></div>
                        <span @click.stop='openPaySure'
                              class="handle-btn red-btn">去支付</span>
                        <div class="line-5"></div>
                        <span @click="cancelOrder"
                              class="handle-btn white-btn">取消订单</span>
                    </div>
                    <!-- 待消费 -->
                    <div v-if="orderNum=='3'"
                         class="bottom-fixed">
                        <div class="line-5"></div>
                        <span @click="refund"
                              class="handle-btn red-btn">申请退款</span>
                        <!-- <span @click="lookcode"
                              class="handle-btn white-btn">查看二维码</span> -->
                    </div>
                    <!-- 已完成 -->
                    <div v-if="orderNum=='4'"
                         class="bottom-fixed">
                         <!-- <div class="line-5"></div>
                        <span v-if="isEvaluate&&pageData.isCheckOver=='T'"
                              @click="evaluate('hotel')"
                              class="handle-btn red-btn">去评价</span> -->
                        <!-- <span @click="lookcode" class="handle-btn white-btn">查看二维码</span> -->
                    </div>
                    <!-- 已关闭 -->
                    <!-- <div v-if="orderNum=='5'" class="bottom-fixed">
            <span @click="delOrder" class="handle-btn red-btn">删除订单</span>
        </div> -->
                    <!-- 退款中  门票酒店没有取消退款 -->
                    <!-- <div v-if="orderNum=='6'" class="bottom-fixed">
            <span @click="cancelRefund" class="handle-btn white-btn">取消退款</span>
            <span @click.stop="goUrl('pages/member/order/tuikuanDetail/main?orderno=' + pageData.orderNo+'&orderInfoId=' + pageData.id)" class="handle-btn red-btn">退单详情</span>
        </div> -->
                    <!-- 订单异常 -->
                    <div v-if="orderNum=='8'"
                         class="bottom-fixed">
                        <span @click="refund"
                              class="handle-btn white-btn">申请退款</span>
                        <!-- <span @click="lookcode"
                              class="handle-btn red-btn">查看二维码</span> -->
                    </div>
                </template>

                <template v-if="pageData.orderType=='park'||pageData.orderType=='show'">
                    <!-- 景区门票 -->
                    <!-- 待付款 -->
                    <div class="line-5"></div>
                    <div v-if="orderNum=='0'"
                         class="bottom-fixed">
                        <span @click.stop='openPaySure'
                              class="handle-btn red-btn">去支付</span>
                        <div class="line-5"></div>
                        <span @click="cancelOrder"
                              class="handle-btn white-btn">取消订单</span>
                    </div>
                    <!-- 待消费 -->
                    <div v-if="orderNum=='3'"
                         class="bottom-fixed">
                        <span @click="refund"
                              class="handle-btn red-btn">申请退款</span>
                        <div class="line-5"></div>
                        <span @click="goUrl('pages/index/main')"
                              class="handle-btn red-btn">返回首页</span>
                        <!-- <span @click="lookcode"
                              class="handle-btn white-btn">查看二维码</span> -->
                    </div>
                    <!--退款中 -->
                    <div v-if="orderNum=='6'"
                         class="bottom-fixed">
                        <!-- <span @click="lookcode"
                              class="handle-btn white-btn">查看二维码</span> -->
                    </div>
                    <!-- 已完成 -->
                    <div v-if="orderNum=='4'"
                         class="bottom-fixed">
                         <!-- <div class="line-5"></div>
                        <span v-if="isEvaluate&&pageData.isCheckOver=='T'"
                              @click="evaluate('park')"
                              class="handle-btn red-btn">去评价</span> -->
                        <!-- <span @click="lookcode" class="handle-btn white-btn">查看二维码</span> -->
                    </div>
                    <!-- 订单异常 -->
                    <div v-if="orderNum=='8'"
                         class="bottom-fixed">
                        <span @click="refund"
                              class="handle-btn white-btn">申请退款</span>
                        <!-- <span @click="lookcode"
                              class="handle-btn red-btn">查看二维码</span> -->
                    </div>
                </template>

                <template v-if="pageData.orderType=='mdse'">
                    <!-- 商品底部 -->
                    <div v-if="orderNum=='0'"
                         class="bottom-fixed">
                        <span @click.stop='openPaySure'
                              class="handle-btn red-btn">去支付</span>
                        <div class="line-5"></div>
                        <span @click="cancelOrder"
                              class="handle-btn white-btn">取消订单</span>
                    </div>
                    <!-- 待发货 -->
                    <div v-if="orderNum=='1'"
                         class="bottom-fixed">
                        <span @click="remind"
                              class="handle-btn red-btn">提醒发货</span>
                        <span @click="refund"
                              class="handle-btn white-btn">申请退款</span>
                    </div>
                    <!-- 待收货 -->
                    <div v-if="orderNum=='2'"
                         class="bottom-fixed">
                        <span @click="sureGet"
                              class="handle-btn red-btn">确认收货</span>
                        <span @click="refund"
                              class="handle-btn white-btn">申请退款</span>
                    </div>
                    <!-- 退款中 -->
                    <div v-if="orderNum=='6'"
                         class="bottom-fixed">
                        <!-- //退款并退货并且退款审核通过的订单不允许取消退款 -->
                        <span @click="cancelRefund"
                              v-if="!(refundData.refundType=='1'&&refundData.auditStatus=='1')"
                              class="handle-btn white-btn">取消退款</span>
                        <span @click.stop="goUrl('pages/member/order/tuikuanDetail/main?orderno=' + pageData.orderNo+'&orderInfoId='+ pageData.id)"
                              class="handle-btn red-btn">退单详情</span>
                    </div>
                    <!-- 已完成 -->
                    <div v-if="orderNum=='4'"
                         class="bottom-fixed">
                         <div class="line-5"></div>
                        <!-- <span v-if="isEvaluate&&pageData.isCheckOver=='T'"
                              @click="evaluate('mdse')"
                              class="handle-btn red-btn">去评价</span> -->
                        <span v-if="pageData.orderDetail[0].refundStatus=='2'"
                              @click.stop="goUrl('pages/member/order/tuikuanDetail/main?orderno=' + pageData.orderNo+'&orderInfoId='+ pageData.id)"
                              class="handle-btn red-btn">退单详情</span>
                    </div>
                    <!-- 已关闭 -->
                    <!-- <div v-if="orderNum=='5'" class="bottom-fixed">
            <span @click="delOrder" class="handle-btn red-btn">删除订单</span>
        </div> -->
                    <!-- 订单异常 -->
                    <div v-if="orderNum=='8'"
                         class="bottom-fixed">
                        <div class="line-5"></div>
                        <span @click="refund"
                              class="handle-btn white-btn">申请退款</span>
                    </div>
                </template>

                <template v-if="pageData.orderType=='eatery'">
                    <!-- 餐饮 -->
                    <!-- 待付款 -->
                    <div v-if="orderNum=='0'"
                         class="bottom-fixed">
                        <div class="line-5"></div>
                        <span @click.stop='openPaySure'
                              class="handle-btn red-btn">去支付</span>
                        <div class="line-5"></div>
                        <span @click="cancelOrder"
                              class="handle-btn white-btn">取消订单</span>
                    </div>
                    <!-- 待消费 -->
                    <div v-if="orderNum=='3'"
                         class="bottom-fixed">
                        <div class="line-5"></div>
                        <span @click="refund"
                              class="handle-btn red-btn">申请退款</span>
                        <!-- <span @click="lookcode"
                              class="handle-btn white-btn">查看二维码</span> -->
                    </div>
                    <!--退款中 -->
                    <div v-if="orderNum=='6'"
                         class="bottom-fixed">
                        <!-- <span @click="lookcode"
                              class="handle-btn white-btn">查看二维码</span> -->
                    </div>
                    <!-- 已完成 -->
                    <div v-if="orderNum=='4'"
                         class="bottom-fixed">
                         <!-- <div class="line-5"></div>
                        <span v-if="isEvaluate&&pageData.isCheckOver=='T'"
                              @click="evaluate('eatery')"

                              class="handle-btn red-btn">去评价</span> -->
                        <!-- <span v-if="pageData.orderDetail[0].refundStatus=='2'" @click.stop="goUrl('pages/member/order/tuikuanDetail/main?orderno=' + pageData.orderNo+'&orderInfoId='+ pageData.id)" class="handle-btn red-btn">退单详情</span> -->
                    </div>
                    <!-- 订单异常 -->
                    <div v-if="orderNum=='8'"
                         class="bottom-fixed">
                        <span @click="refund"
                              class="handle-btn white-btn">申请退款</span>
                        <!-- <span @click="lookcode"
                              class="handle-btn red-btn">查看二维码</span> -->
                    </div>
                </template>
                <template v-if="pageData.orderType=='route'">
                    <div class="line-5"></div>
                    <!-- 跟团游 -->
                    <!-- 待付款 -->
                    <div v-if="orderNum=='0'"
                         class="bottom-fixed">
                        <span @click.stop='openPaySure'
                              class="handle-btn red-btn">去支付</span>
                        <div class="line-5"></div>
                        <span @click="cancelOrder"
                              class="handle-btn white-btn">取消订单</span>
                    </div>
                    <!-- 待消费 -->
                    <div v-if="orderNum=='3'"
                         class="bottom-fixed">
                        <span @click="refund"
                              class="handle-btn red-btn">申请退款</span>
                        <div class="line-5"></div>
                        <span @click="goUrl('pages/index/main')"
                              class="handle-btn red-btn">返回首页</span>
                        <!-- <span @click="lookcode"
                              class="handle-btn white-btn">查看二维码</span> -->
                    </div>
                    <!--退款中 -->
                    <div v-if="orderNum=='6'"
                         class="bottom-fixed">
                        <!-- <span @click="lookcode"
                              class="handle-btn white-btn">查看二维码</span> -->
                    </div>
                    <!-- 已完成 -->
                    <div v-if="orderNum=='4'"
                         class="bottom-fixed">
                        <div class="line-5"></div>
                        <span @click="goUrl('pages/index/main')"
                              class="handle-btn red-btn">返回首页</span>
                        <!-- <span v-if="isEvaluate&&pageData.isCheckOver=='T'"
                              @click="evaluate('route')"
                              class="handle-btn red-btn">去评价</span> -->
                        <!-- <span v-if="pageData.orderDetail[0].refundStatus=='2'" @click.stop="goUrl('pages/member/order/tuikuanDetail/main?orderno=' + pageData.orderNo+'&orderInfoId='+ pageData.id)" class="handle-btn red-btn">退单详情</span> -->
                    </div>
                    <!-- 订单异常 -->
                    <div v-if="orderNum=='8'"
                         class="bottom-fixed">
                        <span @click="refund"
                              class="handle-btn white-btn">申请退款</span>
                        <!-- <span @click="lookcode"
                              class="handle-btn red-btn">查看二维码</span> -->
                    </div>
                </template>
                <!-- //取消退款状态待定 -->
                <!-- <div v-if="orderNum=='6'" class="bottom-fixed">
        <span @click="cancelRefund" class="handle-btn white-btn">取消退款</span>
        </div> -->
                <div v-show='show'
                     @click="closemodal"
                     class="mask">
                    <div class="modal-content"
                         :animation="animationData">
                        <div class="code-modal">
                            <div class="order">
                                订单号: {{pageData.orderNo}}
                            </div>
                            <img v-if='normal'
                                 class="testcode"
                                 :src="'data:image/jpeg;base64,' + qrcode"
                                 alt="">
                            <div class="no-code"
                                 v-else>发码失败,请联系商家或直接申请退款</div>
                            <div v-if='pageData.externalOrderNo&&normal'>
                                <div class="code-no">
                                    <span class="title">
                                        辅助码
                                    </span>
                                    <span>
                                        {{pageData.zybCode}}
                                    </span>
                                </div>
                            </div>

                            <div class="name">{{pageData.nickName}}</div>
                            <div class="clearfix date-num-info">
                                <div class="title-box fl">
                                    <div v-if="pageData.orderType=='park'||pageData.orderType=='route'"
                                         class="text">游玩日期</div>
                                    <div v-else-if="pageData.orderType=='hotel'"
                                         class="text">入住-离店</div>
                                    <div v-else-if="pageData.orderType=='eatery'"
                                         class="text">有效期</div>
                                    <div class='text'>购买数量</div>
                                </div>
                                <div class="content fr">
                                    <div v-if="pageData.orderType=='park'||pageData.orderType=='route'"
                                         class="date">{{pageData.startDate|| pageData.startTime}}</div>
                                    <div v-else-if="pageData.orderType=='hotel'"
                                         class="date">{{pageData.startDate}}-{{pageData.endDate}}</div>
                                    <div v-else-if="pageData.orderType=='eatery'"
                                         class="date">{{pageData.repastCheckDate}}</div>
                                    <div class="num-state clearfix">
                                        <span class="fl">{{pageData.amount}}张</span>
                                        <!-- 未使用状态 -->
                                        <span v-if="pageData.checkStatus=='0'"
                                              class="fr state">未使用</span>
                                        <span v-if="pageData.checkStatus=='1'"
                                              class="fr state state2">检票中</span>
                                        <span v-if="pageData.checkStatus=='2'"
                                              class="fr state state3">已使用</span>
                                        <span v-if="pageData.checkStatus=='3'"
                                              class="fr state state3">已全退</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="detail-look">
                            查看详情
                        </div>
                    </div>

                </div>
                <pay-sure :canClose='true'
                          :totalPrice='payMoney'
                          ref='paysure'></pay-sure>
            </div>
        </div>
    </div>
</template>

<script>
    // Use Vuex
    import orderStatus from '@/components/orderStatus'
    import paySure from "@/components/paysure";
    import navbar from "@/components/navbar";
    import { getData, postData, merchantInfoId } from "@/common/common";
    export default {
        components: {
            paySure,
            navbar,
            orderStatus
        },
        data() {
            return {
                normal: true,
                timeInterval: null, //定时器
                hour: null, //时
                min: null, //分
                seconds: null, //秒
                qrcode: "",
                isEvaluate: false, //默认未评价
                refundData: {},
                iswaitpay: null, //是否是待付款状态
                orderNum: null, //订单状态
                pageData: {}, //详情时间
                show: false,
                animationData: {},
                animation: null,
                payMoney: null, //弹框支付金额
                orderState: [
                    "待付款",
                    "待发货",
                    "待收货",
                    "待消费",
                    "已完成",
                    "已关闭",
                    "退款中",
                    "已退款",
                    "订单异常",
                    "订单待确认"
                ],
                weekName: ["日", "一", "二", "三", "四", "五", "六"],
                fsStartTime: '',
                fsEndTime: ''
            };
        },
        onLoad() {
            this.animation = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
            // getData('/leaguer/api/order/manage/orderQuery', {
            //     orderInfoId: 102205
            // }).then(res => {
            //     console.log("//查看数据2222222222", res)
            // })
        },
        onUnload() {
            if (this.timeInterval) {
                clearInterval(this.timeInterval);
                this.timeInterval = null;
            }
            this.refundData = {};
            this.closemodal();
            this.$refs.paysure.justClosePayModal();


            // this.listData = [[], [], [], [], []];
            // this.pageList = [1, 1, 1, 1, 1];
        },
        onShow() {
            clearInterval(this.timeInterval);
            this.initData();
            this.$refs.paysure.closePayModal();
        },

        methods: {
            sureGet() {
                //确认收货
                getData(this.api.member.order.confirmGoods, {
                    orderinfoId: this.$root.$mp.query.orderno
                }).then(res => {
                    if (res.status == 200) {
                        wx.showToast({
                            title: "确认收货成功！",
                            icon: "success",
                            duration: 1000,
                            success: function () {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    }
                });
            },
            delOrder() {
                //删除订单
                getData(this.api.member.delOrder, {
                    orderNo: this.pageData.orderNo
                }).then(res => {
                    if (res.status == 200) {
                        wx.showToast({
                            title: "删除成功！",
                            icon: "success",
                            duration: 1000,
                            success: function () {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    }
                });
            },
            evaluate(type) {
                //去评价
                let goodsCode = this.pageData.orderDetail[0].modelCode;
                console.log(this.pageData.orderDetail[0]);
                // if (type == "mdse") {
                //   //商品
                //   goodsCode = this.pageData.orderDetail[0].modelCode;
                // }
                this.goUrl('pages/member/comment/main?payOrderNo='+this.pageData.payOrderNo)
                // this.goUrl(
                //     "pages/member/order/evaluate/main?goodsCode=" +
                //     goodsCode +
                //     "&type=" +
                //     type +
                //     "&orderId=" +
                //     this.pageData.id
                // );
            },
            cancelRefund() {
                //取消退款
                let _this = this;
                getData(this.api.member.order.cancelRetreat, {
                    orderRefundNo: this.refundData.refundNo,
                    wayType: 33
                }).then(res => {
                    if (res.status == 200) {
                        wx.showToast({
                            title: "取消退款成功",
                            icon: "success",
                            duration: 2000,
                            success: function () {
                                //页面刷新
                                _this.initData();
                            }
                        });
                    }
                });
            },
            remind() {
                //商品提醒发货
                getData(this.api.member.order.warnsendgoods, {
                    orderNo: this.pageData.orderNo
                }).then(res => {
                    if (res.status == 200) {
                        wx.showToast({
                            title: "订单提醒成功",
                            icon: "success",
                            duration: 1000
                        });
                    }
                });
            },
            refund() {
                //缓存信息
                let obj = {};
                // console.log('aaaaaaaaaaaa', this.pageData)
                //酒店门票

                if (this.pageData.orderType == "park") {
                    //判断是否是实名制名票还是非实名制名票
                    obj = this.pageData.orderDetail[0].orderDetailModels.length
                        ? {
                            realNameList: this.pageData.orderDetail[0].orderDetailModels,
                            orderId: this.pageData.id, //主ID
                            orderDetailId: this.pageData.orderDetail[0].id //订单明细id
                        }
                        : {
                            num: this.pageData.orderDetail[0].leftAmount,
                            orderId: this.pageData.id, //主ID
                            orderDetailId: this.pageData.orderDetail[0].id //订单明细id
                        };
                } else if (this.pageData.orderType == "mdse") {
                    // 商品
                    obj = {
                        realNum: (this.pageData.orderSum - this.pageData.couponSum).toFixed(
                            2
                        ), //已发货-退款只能退商品价格，运费已经产生了的,
                        payNum: (
                            this.pageData.orderSum -
                            this.pageData.couponSum +
                            this.pageData.postage
                        ).toFixed(2), //未发货 商品价格-优惠券+运费
                        num: this.pageData.amount,
                        orderId: this.pageData.id, //主ID
                        orderDetailId: this.pageData.orderDetail[0].id //订单明细id
                    };
                } else if (this.pageData.orderType == "hotel") {
                    // 酒店
                    obj = {
                        num: this.pageData.orderDetail[0].leftAmount,
                        orderId: this.pageData.id, //主ID
                        orderDetailId: this.pageData.orderDetail[0].id //订单明细id
                    };
                } else if (this.pageData.orderType == "eatery" || this.pageData.orderType == 'show') {
                    obj = {
                        num: this.pageData.orderDetail[0].leftAmount,
                        orderId: this.pageData.id, //主ID
                        orderDetailId: this.pageData.orderDetail[0].id //订单明细id
                    };
                } else if (this.pageData.orderType == 'route') {
                    obj = {
                        orderDetail: this.pageData.orderDetail
                    }
                }
                console.log(obj);
                wx.setStorageSync(
                    "xjscwxrefunddata_2018_9_12",
                    Object.assign(obj, {
                        orderType: this.pageData.orderType,
                        orderState: this.orderNum
                    })
                );
                if (this.pageData.paySum > 0) {
                    this.goUrl("pages/member/order/tuikuan/main");
                } else {
                    wx.showToast({
                        title: "0元订单不允许申请退款",
                        icon: "none",
                        duration: 1500
                    });
                }
            },
            //取消订单
            cancelOrder() {
                let _this = this
                postData(this.api.member.order.cancel, {
                    payOrderNo: this.pageData.payOrderNo,
                    leaguerId: wx.getStorageSync("WxXjscUserInfo").leaguerId
                }).then(res => {
                    wx.showToast({
                        title: "订单取消成功",
                        icon: "success",
                        duration: 2000,
                        success: function () {
                            _this.initData()
                        }
                    });
                });
            },
            //复制
            copy() {
                wx.setClipboardData({
                    data: this.pageData.payOrderNo,
                    success: function () {
                        console.log("复制成功");
                    }
                });
            },
            openPaySure() {
                getData("/merchant/api/merchantPayType/getMerchantPayType", {
                    businessType: "WXXCX"
                }).then(res => {
                    this.payType = JSON.parse(res.message)[0];
                    let extendParamJson = {
                        orderInfo: this.pageData.orderDescription,
                        openId: wx.getStorageSync("WxXjscUserInfo").openId
                    }

                    this.$refs.paysure.openPayModal();
                    this.$refs.paysure.data = {
                        accountId: merchantInfoId,
                        extendParamJson: JSON.stringify(extendParamJson),
                        operateId: wx.getStorageSync("WxXjscUserInfo").leaguerId,
                        payOrderNo: this.pageData.payOrderNo,
                        paySum: this.pageData.paySum,
                        payType: this.payType,
                        userType: "C",
                        wayType: 6
                    };

                })
            },
            formatterSpec(str) {
                //格式化sku
                //{"重量":"500g"},{"多少抽":"100抽"},{"颜色":"纯白"}
                var arr = [];
                str.split(",").forEach((item, index) => {
                    arr.push(JSON.parse(item)[Object.keys(JSON.parse(item))[0]]);
                });
                return arr;
            },
            initData() {
                console.log("----------------------获取退款详情")
                let url = "";
                let data = {};
                let _this = this;
                if (this.$root.$mp.query.orderno) {
                    //非待付款
                    this.iswaitpay = false;
                    url = this.api.member.order.detail;
                    data = {
                        wayType: 1,
                        orderInfoId: this.$root.$mp.query.orderno,
                        merchantInfoId: merchantInfoId
                    };
                } else {
                    //待付款
                    this.iswaitpay = true;
                    url = this.api.order.detail;
                    data = {
                        merchantInfoId: merchantInfoId,
                        payOrderNo: this.$root.$mp.query.payOrderNo,
                        wayType: 1
                    };
                }

                getData(url, data).then(res => {
                    //获取退款详情
                    console.log("----------------------获取退款详情")
                    console.log("退款详情", res);
                    getData(this.api.member.order.refundDetail, {
                        orderCode: res.data.orderNo
                    }).then(res => {
                        res.data.refundSum =
                            res.data && res.data.refundSum ? res.data.refundSum : 0;
                        this.refundData = res.data;
                    });
                    if (this.$root.$mp.query.orderno) {
                        //非待付款

                        //酒店
                        if (res.data.orderType == "hotel") {
                            res.data.startDate = res.data.startTime.split(" ")[0];
                            res.data.endDate = res.data.endTime.split(" ")[0];
                            // res.data.moveInto = moment(res.data.endTime).diff(res.data.startTime,'days')?moment(res.data.endTime).diff(res.data.startTime,'days'): 0
                        }

                        //商品
                        if (res.data.orderType == "mdse") {
                            if (res.data.orderStatus == "3") {
                                //商品待消费状态 替换成待发货状态
                                res.data.orderStatus = "1";
                            }
                            // sku
                            res.data.specArr = this.formatterSpec(res.data.specParam);
                        }

                        //获取状态名称
                        res.data.orderStateName = this.orderState[res.data.orderStatus];
                        res.data.orderDetailVoList = res.data.orderDetail;

                        if (res.data.orderType == "park" || res.data.orderType == "show") {
                            //景区门票
                            res.data.startDate = res.data.startTime.split(" ")[0];
                            res.data.endDate = res.data.endTime
                                ? res.data.endTime.split(" ")[0]
                                : "";
                            // console.log('666666666666666666666', res.data)
                            this.fsStartTime = res.data.fsStartTime;
                            this.fsEndTime = res.data.fsEndTime;
                        }
                        //订单已经完结-正常完结和申请退款成功完结
                        if (res.data.orderStatus == "4") {
                            let goodsCode = res.data.goodsCode;
                            if (res.data.orderType == "mdse") {
                                //如果是商品
                                goodsCode = res.data.modelCode;
                                this.getisEvaluate(goodsCode);
                            } else if (res.data.orderType == "hotel") {
                                //酒店
                                goodsCode = res.data.modelCode;
                                this.getisEvaluate(goodsCode);
                            } else if (res.data.orderType == "park") {
                                //门票
                                goodsCode = res.data.modelCode;
                                this.getisEvaluate(goodsCode);
                            } else if (res.data.orderType == "route") {
                                //门票
                                goodsCode = res.data.modelCode;
                                this.getisEvaluate(goodsCode);
                            } else if (res.data.orderType == "eatery") {
                                //门票
                                goodsCode = res.data.modelCode;
                                this.getisEvaluate(goodsCode);
                            }
                        }
                        res.data.zybCode = res.data.extendParam ? JSON.parse(res.data.extendParam).zybAssistCheckNo : '';
                        this.pageData = res.data;
                        this.payMoney = res.data.paySum;
                        this.orderNum = res.data.orderStatus;

                        if (res.data.orderType == 'route') {
                            this.pageData.startTime = res.data.startTime.substring(0, 10);
                            this.pageData.endTime = res.data.endTime.substring(0, 10);
                            // let orderTypeName = ['【成人票】','【儿童票】'];
                            this.pageData.orderDetail.forEach((item, index) => {
                                // this.pageData.orderDetail[index].orderTypeName = item.detailType == '0' ? '【成人票】' : '【儿童票】';
                            });
                        }

                    } else {
                        // 待付款
                        //格式化sku

                        res.data.orderType = res.data.orderDetailVoList[0].orderType;
                        if (res.data.orderType == "mdse") {
                            res.data.orderDetailVoList.forEach((item, index) => {
                                res.data.orderDetailVoList[index].specArr = this.formatterSpec(
                                    item.specParam
                                );
                            });
                        }

                        res.data.orderStateName = this.orderState[res.data.payStatus]; //获取订单状态名称
                        //获取游玩日期周几
                        res.data.orderDetailVoList.forEach((item, index) => {
                            res.data.startDate = res.data.orderDetailVoList[index].startDate
                                ? res.data.orderDetailVoList[index].startDate.split(" ")[0]
                                : null;
                            res.data.endDate = res.data.orderDetailVoList[index].endDate
                                ? res.data.orderDetailVoList[index].endDate.split(" ")[0]
                                : null;
                        });

                        this.pageData = res.data;
                        this.payMoney = res.data.paySum;
                        this.orderNum = res.data.payStatus;
                        console.log('2222222222222222222222222222222222222', this.orderNum)
                        if (res.data.orderType == 'route') {
                            // this.pageData.startTime = res.data.startTime.substring(0,10);
                            // this.pageData.endTime = res.data.endTime.substring(0,10);
                            // let orderTypeName = ['【成人票】', '【儿童票】'];
                            this.pageData.orderDetailVoList.forEach((item, index) => {
                                // this.pageData.orderDetailVoList[index].orderTypeName = item.detailType == "0" ? '【成人票】' : '【儿童票】';
                                this.pageData.orderDetailVoList[index].routeStartDate = item.startDate.substring(0, 10);
                                this.pageData.orderDetailVoList[index].routeEndDate = item.endDate.substring(0, 10);
                            });
                        }
                        //   this.orderNum = 0; //待付款
                        //代款状态下 订单结束时间
                        // var format = data.replace(/-/g, '/')
                        // ios不能处理2018-12-11 12:12:12,只能处理2018/12/12 12:12:12
                        let test = res.data.orderCloseTime.replace(/-/g, "/");
                        let date = new Date(res.data.orderCloseTime.replace(/-/g, "/"));
                        let time = Date.parse(date);
                        let now = new Date();
                        let nowTime = Date.parse(now);
                        let closeTime = time - nowTime;
                        console.log("close", res.data.orderCloseTime);
                        if (closeTime < 0) {
                            //过期了
                            clearInterval(_this.timeInterval);
                            //订单状态前端换成已经关闭状态
                            this.orderNum = 5;
                            this.pageData.orderStateName = "已关闭";
                        } else {
                            closeTime = closeTime / 1000;
                            _this.hour = Math.floor(closeTime / 3600); //小时取整数
                            _this.min = Math.floor((closeTime - _this.hour * 60) / 60); //分取整数
                            _this.seconds = closeTime - _this.hour * 60 * 60 - _this.min * 60; //秒取整数
                        }
                        this.timeInterval = setInterval(function () {
                            now = new Date();
                            nowTime = Date.parse(now);
                            closeTime = time - nowTime;
                            if (closeTime < 0) {
                                //过期了
                                clearInterval(_this.timeInterval);
                                _this.orderNum = 5;
                                _this.pageData.orderStateName = "已关闭";
                            } else {
                                closeTime = closeTime / 1000;
                                _this.hour = Math.floor(closeTime / 3600); //小时取整数
                                _this.min = Math.floor((closeTime - _this.hour * 60) / 60); //分取整数
                                _this.seconds = closeTime - _this.hour * 60 * 60 - _this.min * 60; //秒取整数              
                            }
                        }, 1000);
                    }
                });
            },
            lookcode() {
                this.show = !this.show;
                this.animation
                    .scale(1, 1)
                    .opacity(1)
                    .step();

                postData(this.api.member.order.getQrCodeUrl, {
                    url: this.pageData.externalOrderNo
                        ? this.pageData.checkNo ? this.pageData.checkNo : ""
                        : this.pageData.payOrderNo ? this.pageData.payOrderNo : "",
                    imgWidth: 378,
                    imgHeight: 378
                }).then(
                    res => {
                        this.normal = true;
                        this.qrcode = res.message;
                        this.$nextTick(function () {
                            this.animationData = this.animation.export();
                        });
                    },
                    reject => {
                        this.normal = false;
                        this.qrcode = reject.message;
                        this.$nextTick(function () {
                            this.animationData = this.animation.export();
                        });
                    }
                );
            },
            getisEvaluate(goodsCode) {
                getData(this.api.main.comment.iscomment, {
                    goodsCode: goodsCode,
                    userInfoId: wx.getStorageSync("WxXjscUserInfo").leaguerId
                }).then(res => {
                    //判断已完成的订单是否已经评价
                    this.isEvaluate = res.data.userIfEvaluate == "T";
                });
            },
            closemodal() {
                let _this = this;
                this.animation
                    .scale(0, 0)
                    .opacity(0)
                    .step();
                this.animationData = this.animation.export();
                setTimeout(() => {
                    _this.show = false;
                }, 500);
            },
            goUrl(path) {
                this.navigatePageTo(this.router + path);
            }
        }
    };
</script>

<style lang="scss">
    body {
        height: 100vh;
        background: #eff1f6;
    }
    .line-5 {
        display: block;
        background: #eff1f6;
        height: 10px;
    }
    .order-detail {
        padding-bottom: 71px;
        background: #eff1f6;
        .topShadow {
            width: 100%;
            height: 0.5px;
            background-color: rgba(146, 144, 144, 0.2);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
        }
        .hotel-time {
            background: #fff;
            padding: 10px 15px;
            .time-info {
                height: 30px;
                font-size: 14px;
                font-family: PingFangSC-Medium, sans-serif;
                color: #413838;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title {
                    width: 50%;
                }
                .time {
                    width: 50%;
                    text-align: right;
                }
            }
        }
        .list-item {
            .head-item {
                padding: 0px 12px;
                // height: 40px;
                font-size: 13px;
                color: #333333;
                .item {
                    height: 40px;
                    line-height: 40px;
                }
                .fsyy-time {
                    font-size: 13px;
                    color: #413838;
                }
                .head {
                    // font-size: 14px;
                    // color: #413838;
                    // font-family: PingFangSC-Medium, sans-serif;

                    min-width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    color: #333333;
                    font-size: 17px;
                    text-align: left;
                    height: 35px;
                    line-height: 35px;
                }
                .price-num {
                    // margin-top: 8px;
                    font-size: 13px;
                    font-family: PingFangSC-Medium, sans-serif;
                    height: 40px;
                    line-height: 40px;
                    // color: #413838;
                    .price {
                        .unit {
                            font-size: 13px;
                            margin-right: 3px;
                        }
                        .price-num {
                            // font-size: 16px;
                        }
                    }
                    .num {
                        font-size: 13px;
                        // color: #999;
                        .x {
                            font-size: 13px;
                            margin-right: 4px;
                        }
                    }
                }
            }
        }
        .user-time {
            background-color: #fff;
            font-size: 14px;
            color: #413838;
            .user-item {
                padding: 5px 0;
                line-height: 40px;

                .label-title {
                    margin-left: 10px;
                }
                .time {
                    color: #999;
                    margin-right: 10px;
                }
            }
            .user-top {
                border-top: 0.5px solid #eee;
            }
        }
        .repast-order-name {
            // padding: 10px 0;
            .name {
                font-size: 17px;
                color: #333333;
                font-family: PingFang SC Meidum;
                margin-left: 10px;
                height: 42.5px;
                line-height: 42.5px;
            }
            .order-price {
                height: 35px;
                line-height: 35px;
                font-size: 14px;
                // padding: 5px 0;
                .price {
                    font-weight: 500;
                    margin-left: 10px;
                }
                .amount {
                    color: #999;
                    margin-right: 10px;
                }
            }
        }
        .play-time {
            background: #fff;
            padding: 0 15px;
            height: 45px;
            font-size: 13px;
            font-family: PingFangSC-Medium, sans-serif;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
                // color: #413838;
                width: unset;
                font-size: 13px;
                color: #333333;
            }
            .text {
                font-size: 12px;
                color: #cccccc;
                background: #f2f2f2;
                display: inline-block;
                width: 50px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                border-radius: 8px;
                padding-left: 2px;
                padding-right: 2px;
                // color: #999999;
            }
        }
        .info-item {
            padding: 20px 15px;
            margin-bottom: 10px;
            background: #fff;
            .real-user-item {
                margin-bottom: 5px;
            }
            .real-user-item:last-child {
                margin-bottom: 0;
            }
            .user-info {
                .select-checkbox {
                    transform: scale(0.7);
                    float: left;
                }
                .user-list {
                    margin-left: 35px;
                }
            }
            .item {
                font-size: 13px;
                color: #333333;
                height: 40px;
                line-height: 40px;
                font-family: PingFangSC-Medium, sans-serif;
                margin-top: 8px;
                .left-title {
                    width: 78px;
                }
                .right-content {
                    .text {
                        margin-right: 5px;
                    }
                    .face-img {
                        // height: 50px;
                        height: 44px;
                        width: 44px;
                    }
                }
                .face-content {
                    display: flex;
                    align-items: center;
                    height: 50px;
                }
            }
            .item:first-child {
                margin-top: 0;
            }
            .user-sort-name {
                color: #999;
            }
            .face-item {
                height: 50px;
                line-height: 50px;
            }
            .check-info {
                display: flex;
                justify-content: space-around;
                background: #fff;
                .info {
                    font-size: 14px;
                    color: #413838;
                    width: 50%;
                    font-family: PingFangSC-Medium, sans-serif;
                    text-align: center;
                    .check-state {
                    }
                    .num {
                        margin-left: 5px;
                    }
                }
            }
        }
        .bottom-fixed {
            // position: fixed;
            // left: 0;
            // bottom: 0;
            background: #eff1f6;
            // height: 71px;
            // line-height: 50px;
            // width: calc(100% - 30px);
            // padding: 0 15px;
            .handle-btn {
                height: 47.5px;
                line-height: 47.5px;
                width: 100%;
                text-align: center;
                display: block;
                border-radius: 8px;
                overflow: hidden;
                font-family: PingFangSC-Medium, sans-serif;
                font-size: 12px;
                // margin-left: 20px;
            }
            .red-btn {
                color: #ef0017;
                border-radius: 8px;
                overflow: hidden;
                font-size: 17px;
                background: #ffffff;
            }
            .white-btn {
                border-radius: 8px;
                overflow: hidden;
                background: #ffffff;
                color: #f05b47;
                font-size: 17px;
                // height: 26px;
                // line-height: 26px;
                // border: 0.5px solid #f05b47;
            }
        }
        .order-top {
            height: 135px;
            // padding: 0 15px;
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
            background: #fff;
            .state {
                // padding-top: 5px;
                color: #f05b47;
                font-family: PingFangSC-Medium, sans-serif;

                .text {
                    font-size: 16px;
                    height: 26px;
                    // line-height: 26px;
                    display: flex;
                    align-items: center;
                    .state-svg {
                        font-size: 23px;
                        display: inline;
                    }
                    .content {
                        // height: 26px;
                        // line-height: 26px;
                        display: inline-block;
                        margin-left: 5px;
                    }
                }
                .notice {
                    padding-top: 6px;
                    font-size: 14px;
                    color: #413838;
                }
            }
            .state.complate {
                color: #1aad19;
            }
            .state.over {
                color: #999;
            }
            .state-img {
                height: 45px;
                width: 45px;
            }
        }
        .orderDetailInner {
            position: absolute;
            top: 100px;
            left: 10px;
            width: calc(100% - 20px);
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
        }
        .express-info {
            min-height: 30px;
            background: #fff;

            .text-express {
                padding-left: 15px;
                line-height: 30px;
                font-size: 13px;
                color: #413838;
                font-family: PingFangSC-Medium, sans-serif;
            }
            .left3 {
                line-height: 40px;
            }
        }
        .receiver-info {
            background: #fff;
            margin: 10px 0;
            // height: 72px;
            padding: 5px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                // width: 340px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                .address-svg {
                    margin-left: 15px;
                    margin-right: 9.5px;
                    font-size: 20px;
                    color: #413838;
                    font-weight: 700;
                }
                .default-receiver {
                    font-size: 13px;
                    color: #413838;
                    font-family: PingFangSC-Medium, sans-serif;
                    width: 300px;
                    .name-tel {
                        display: flex;
                        justify-content: space-between;
                        .name {
                            width: 190px;
                            .text {
                                margin-right: 11px;
                            }
                            .name-text {
                                // width: 155px;
                            }
                        }
                        .tel {
                        }
                    }
                    .address {
                        margin-top: 8px;
                    }
                }
                .no-address {
                    font-size: 16px;
                    color: #413838;
                    font-family: PingFangSC-Medium, sans-serif;
                }
            }
        }
        .goods-list {
            background: #fff;
            margin: 10px 0;
            .goods-item {
                height: 120px;
                padding-left: 14.5px;
                padding-right: 20px;
                .goods-img {
                    padding-top: 20px;
                    width: 80px;
                    height: 80px;
                }
                .goods-info {
                    padding-top: 20px;
                    margin-left: 92px;

                    .info-box {
                        height: 57px;
                        .goods-title {
                            // height: 34px;
                            font-size: 14px;
                            color: #413838;
                            font-family: PingFangSC-Medium, sans-serif;
                        }
                        .spec-ul {
                            line-height: 16px;
                            .spec-li {
                                margin-right: 11px;
                                font-size: 13px;
                                // color: #989898;
                                font-family: PingFangSC-Medium, sans-serif;
                            }
                        }
                    }
                    .goods-price {
                        // display: flex;
                        // justify-content: space-between;
                        .price {
                            color: #fc4150;
                            font-size: 18px;
                            font-family: PingFangSC-Semibold, sans-serif;
                            .unit {
                                font-size: 13px;
                            }
                            .num {
                                margin-left: 3px;
                            }
                        }
                        .buy-num {
                            // color: #999999;
                            font-size: 15px;
                            font-family: PingFangSC-Medium, sans-serif;
                            align-items: flex-end;
                            .x {
                                font-size: 13px;
                                margin-right: 6px;
                            }
                        }
                    }
                }
            }
        }
        .order-detail-info {
            // padding: 10px 12px;

            &.border-bottom-radious {
                background: #eff1f6;
                &.orderno-date {
                    &:last-of-type {
                        padding-bottom: 5px;
                        border-bottom-right-radius: 8px;
                        border-bottom-left-radius: 8px;
                        overflow: hidden;
                    }
                }
            }
            .orderno-date {
                background: #fff;
                // font-size: 13px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 12px;
                padding-right: 12px;
                height: 35px;
                line-height: 35px;
                color: #413838;
                font-family: PingFangSC-Medium, sans-serif;
                // margin-bottom: 10px;
                .text {
                    float: left;
                    font-size: 13px;
                }
                .content {
                    float: right;
                    vertical-align: middle;
                    font-size: 16px;
                    .moneyFlat {
                        display: inline-block;
                        vertical-align: middle;
                        font-style: unset;
                        font-size: 12px;
                    }
                }
                .red {
                    color: #fc4150;
                }
                .copy-btn {
                    float: right;
                    padding: 0 5px;
                    border: 1px solid #999999;
                    border-radius: 2px;
                }
                .text.bottom {
                    font-size: 12px;
                    color: #413838;
                }
            }
            .orderno-date.m-b {
                margin-bottom: 5px;
            }
            .orderno-date:last-child {
                margin-bottom: 0;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                overflow: hidden;
            }
            .name {
                padding-top: 3px;
                padding-bottom: 12px;
                color: #413838;
                font-size: 16px;
                font-family: PingFangSC-Semibold, sans-serif;
                font-weight: 600;
            }
        }
        .mask {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0 15px;
            padding-top: 50px;
            background: #d3d3d3;
            .modal-content {
                margin-top: 118px;
                opacity: 0;
                // height: 520px;
                .code-modal {
                    // height: 520px;
                    padding-top: 23px;
                    border-radius: 2px;
                    background: #fff;
                    // height: 100%;
                    width: 100%;
                    text-align: center;
                    .order {
                        font-size: 12px;
                        color: #413838;
                        font-family: PingFangSC-Medium, sans-serif;
                        margin-bottom: 15px;
                    }
                    .testcode {
                        height: 189px;
                        width: 189px;
                        margin-bottom: 18px;
                    }
                    .no-code {
                        font-size: 16px;
                        color: #f05b47;
                        font-family: PingFangSC-Medium, sans-serif;
                        margin-bottom: 5px;
                    }
                    .name {
                        font-size: 18px;
                        color: #413838;
                        font-family: PingFangSC-Medium, sans-serif;
                        margin-bottom: 12px;
                        font-weight: 600;
                    }
                    .code-no {
                        display: inline-block;
                        font-size: 14px;
                        color: #413838;
                        font-family: PingFangSC-Medium, sans-serif;
                        height: 31.5px;
                        line-height: 31.5px;
                        padding: 0 10px;
                        border: 1px solid #413838;
                        border-radius: 2px;
                        margin-bottom: 18px;
                        .title {
                            margin-right: 10px;
                        }
                    }
                    .date-num-info {
                        display: inline-block;
                        .title-box {
                            color: #413838;
                            font-size: 14px;
                            font-family: PingFangSC-Medium, sans-serif;
                            margin-right: 25px;
                            .text {
                                margin-bottom: 16px;
                            }
                        }
                        .content {
                            font-size: 14px;
                            font-family: PingFangSC-Medium, sans-serif;
                            color: #999999;
                            .date {
                                margin-bottom: 16px;
                            }
                            .state {
                                display: inline-block;
                                height: 17.5px;
                                line-height: 17.5px;
                                background: #23d240;
                                color: #fff;
                                border-radius: 2px;
                                padding: 0 5px;
                                font-size: 12px;
                                font-family: PingFangSC-Medium, sans-serif;
                            }
                            .state2 {
                                color: #f05647;
                            }
                            .state3 {
                                color: #fff;
                                background: #999;
                            }
                        }
                    }
                }
                .detail-look {
                    height: 44px;
                    line-height: 44px;
                    background: #009ded;
                    color: #fff;
                    margin-top: 20px;
                    border-radius: 2px;
                    text-align: center;
                    font-size: 16px;
                    font-family: PingFangSC-Medium, sans-serif;
                }
            }
        }
        .order-top-bg {
            display: inline-block;
            width: 100%;
            height: 135px;
            &.wait_pay {
                background: url("https://cdn.51dmq.com/ui/showImg/wait_pay.png")
                    no-repeat center;

                background-size: 100% 100%;
            }
            &.complete_pay {
                background: url("https://cdn.51dmq.com/ui/showImg/complate_pay.png")
                    no-repeat center;

                background-size: 100% 100%;
            }
            &.toPlay {
                background: url("https://cdn.51dmq.com/ui/showImg/order-detail.jpg")
                    no-repeat center;

                background-size: 100% 100%;
            }
            &.toReturn {
                background: url("https://cdn.51dmq.com/ui/showImg/order-detail.jpg")
                    no-repeat center;

                background-size: 100% 100%;
            }

            .order-status {
                font-family: PingFang SC Bold;
                display: inline-block;
                width: 92.5px;
                height: 35px;
                line-height: 35px;
                color: #fff;
                font-size: 21px;
                text-align: center;
                margin-left: 10px;
                margin-top: 15px;
            }
        }
    }
</style>
