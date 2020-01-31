<template>
  <div class="calendar-wrapper">    
    <div class="calendar">
      <Calendar
        v-if='showcData'
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
</template>

<script>
  import Calendar from '../../src/mpvue-calendar'
  import '../../src/browser-style.css'
  // import {holiday} from './holiday'
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  export default {
    data () {
      return {
        settingData: [],
        value: [],
        isrange: false,
        weekSwitch: false,
        ismulti: false,
        dataInfo: {},
        monFirst: true,
        clean: true, //简洁模式
        lunar: true, //显示农历
        // events: {'2019-2-7':'今日备注', '2019-2-8':'一条很长的明日备注'},
        events: {},
        // tileContent: holiday,
        renderValues: [],
        disabledArray: [],
        almanacs: {},
        showcData:true        
      }
    },
    components: {
      Calendar
    },    
    mounted(){
      let myDate = new Date();
      let lFullYear = myDate.getFullYear();
      let lFullMonth = (myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1);
      let lFullDay = myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate()
      let curDate = lFullYear + '-' + lFullMonth + '-' + lFullDay;
      for(let i =0; i < this.settingData.length; i++){
        if(new Date(curDate).getTime() == new Date(this.settingData[i].date).getTime()){
          let firstValue = this.settingData[i].date.split('-');
          let firstYear = firstValue[0], firstMonth = firstValue[1].replace(/\b(0+)/gi,""), firstDay = firstValue[2].replace(/\b(0+)/gi,"");
          this.value = [Number(firstYear), Number(firstMonth), Number(firstDay)]; 
          return;
        }else{
          let firstValue = this.settingData[0].date.split('-');
          let firstYear = firstValue[0], firstMonth = firstValue[1].replace(/\b(0+)/gi,""), firstDay = firstValue[2].replace(/\b(0+)/gi,"");
          this.value = [Number(firstYear), Number(firstMonth), Number(firstDay)];          
        }
      }         
      this.handelRenderValues();
    },
    methods: {       
      switchMode(data){
        this.weekSwitch = !this.weekSwitch;
        setTimeout(() => {
          this.$refs.calendar.renderer(2019, 1); //渲染2018年8月份
        }, 0)
      },
      handelRenderValues(data){
        if (this.ismulti) {
          this.renderValues = this.value.map(v => v.join('-'))
        } else if (this.isrange) {
          const values = [];
          const valueData = data || this.value;
          this.value.forEach((v, i) => {
            values.push(v.join('-'));
            if (!i) {
              values.push('~');
            }
          });
          this.renderValues = values;
        } else {          
          this.renderValues = [this.value.join('-')];          
        }
      },
      multiMode(value){
        this.ismulti = true;
        this.isrange = false;
        this.value = [[year, month, 16], [year, month, 18]];
        this.handelRenderValues();
        this.$refs.calendar.renderer(year, month);
      },
      rangeMode(value){
        this.ismulti = false;
        this.isrange = true;
        this.value = [[year, month, 16], [year, month, 22]];
        this.handelRenderValues();
        this.$refs.calendar.renderer(year, month);
      },
      valueMode(value){
        this.ismulti = false;
        this.isrange = false;
        this.value = [year, month, 16];
        this.handelRenderValues();
        this.$refs.calendar.renderer(year, month);
      },
      selectMonth(month,year){
        console.log(year,month)
      },
      prev(y, m, w){
        console.log(y, m, w)
      },
      next(year, month, week){
        console.log(year, month, week)
      },
      selectYear(year){
        console.log(year)
      },
      setToday() {
        this.$refs.calendar.setToday();
      },
      dateInfo() {
        const info = this.$refs.calendar.dateInfo(2018, 8, 23);
        this.dataInfo = info;
        console.log(info);
      },
      renderer() {
        this.$refs.calendar.renderer(2018, 8); //渲染2018年8月份
      },
      select(val, val2) {
        if (this.isrange) {
          this.handelRenderValues([val, val2]);
        } else if (this.ismulti) {
          this.handelRenderValues(val);
        } else {
          this.handelRenderValues([val]);
        }
        // console.log(val);
        console.log(val2);
      }
    }
  }
</script>

<style>
  @import './style.css';
</style>
