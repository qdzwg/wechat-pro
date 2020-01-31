<template>
  <div class="orderInfo-box">
    <navbar title='预订须知'></navbar>
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px')}">
      sdfsdfdfsdfsdfsdfsdf
      <div class="orderInfo-content">
        <!-- <wx-parse :contentstr="orderInfo"></wx-parse> -->
        <!-- <rich-text class="richText" :nodes="orderInfo" bindtap="tap"></rich-text> -->
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import { getData, postData, merchantInfoId, host } from "@/common/common";
import wxParse from "@/components/htmlParse";
import navbar from "@/components/navbar";

export default {
  components: {
    navbar,
    wxParse
  },
  data() {
    return {
      orderInfo: ""
    };
  },
  onLoad() {},
  onShow() {
    let _this = this;
    if (!_this.$root.$mp.query.id) {
      _this.orderInfo = wx.getStorageSync("orderInfo");
    } else {
      let detailUrl = api.ticket.order.main;
      getData(detailUrl, {
        merchantParkTicketIds: _this.$root.$mp.query.id,
        playDate: _this.$root.$mp.query.playDate
      }).then(res => {
        console.log(res);
        _this.orderInfo = res.data[0].bookRemind
          ? res.data[0].bookRemind.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
          : "暂无信息";
      });
    }
  }
};
</script>

<style lang="scss">
.orderInfo-box {
  width:100%;
  height: 100%;
  position:relative;
  background-color: #fff;
  .orderInfo-content {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
}
</style>

