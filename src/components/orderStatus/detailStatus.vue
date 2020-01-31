<template>
    <div class="orderdate">
        <div class="date-wrap">
            <span class="model">{{itemOrderTypeName}}</span>
        </div>
        <span :class="status" class="fr state "
              v-if='orderNum == 0'>{{"待支付"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 3'>{{"待消费"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 1'>{{"待发货"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 2'>{{"待收货"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 4'>{{"已完成"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 5'>{{"已关闭"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 6'>{{"退款中"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 7'>{{"已退款"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 8'>{{"异常订单"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 9'>{{"订单待确认"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 10'>{{"部分入住"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 11'>{{"部分退房"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 12'>{{"已取消"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 13'>{{"Noshow"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 14'>{{"预定成功"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 15'>{{"已拒绝"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 16'>{{"全部入住"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 17'>{{"待接单"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 18'>{{"已接单"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 19'>{{"已拒接"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 20'>{{"退款审核中"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 21'>{{"智游宝发起退单"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 22'>{{"交易成功"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 23'>{{"交易失败"}}</span>
        <span :class="status" class="fr state "
              v-if='orderNum == 24'>{{"服务中"}}</span>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        props: {
            itemOrderTypeName: {
                type: String
            },
            orderNum: {
                type: String,
                default: ""
            },
            status:{
                type:String,
                default:"wait-play"
            }

        },
        watch: {

        },
        onLoad() {

        },
        onShow() {

        },
        update: {

        },
        methods: {

        }
    };
</script>


