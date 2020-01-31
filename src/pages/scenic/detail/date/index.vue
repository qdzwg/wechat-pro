<template>
  <div class="orderInfo-box">
    <navbar title='更多时间'></navbar>
    <div class :style="{'margin-top': (navContentHeight+navBarHeight+'px')}">
      <div class="calendar-wrapper">    
        <div class="calendar">
          <Calendar
            :clean="clean"
            :lunar="lunar"
            ref="calendar"
            :range="isrange"
            :multi="ismulti"
            :almanacs="almanacs"        
            @select="select"
            @next="next"
            @prev="prev"
            :value="value"
            :disabled="disabledArray"
            :weekSwitch="weekSwitch"
            :events="events"
            :settingData="settingData"
          />
        </div>    
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import { getData, postData, merchantInfoId, host } from "@/common/common";
import wxParse from "@/components/htmlParse";
import navbar from "@/components/navbar";
import Calendar from '@/components/mpvue-calendar/mpvue-calendar'
import '@/components/mpvue-calendar/browser-style.css'
import '@/components/mpvue-calendar/style.css';

export default {
  components: {
    Calendar,
    navbar,
    wxParse
  },
  data() {
    return {
      value: [],
      clean: true, //简洁模式
      lunar: true, //显示农历
      isrange: false,
      ismulti: false,
      almanacs: {},
      disabledArray: [],
      weekSwitch: false,
      // events: {'2019-2-7':'今日备注', '2019-2-8':'一条很长的明日备注'},
      events: {},
      settingData: [],
    };
  },
  methods:{
    select(val1, val2){
      console.log(val1, val2)
    },
    next(){

    },
    prev(){

    }
  },
  onLoad() {},
  onShow() {
    
  }
};
</script>

<style lang="scss">
.orderInfo-box {
  width:100%;
  height: 100%;
  background-color: #fff;
  .orderInfo-content {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
}
</style>

