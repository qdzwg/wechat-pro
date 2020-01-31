<template>
  <div class="more_date_class" :style="{height:'calc(100% - '+navBarHeight+'px)', top:navBarHeight+'px'}" :animation="animationData_date">
    <div class="more_date_Tb" :style="{height:navContentHeight+'px'}">   <!-- 头部 -->
      <i class="xx-icon icon-back nav-bar-icon" :style="{lineHeight:navContentHeight+'px'}" @click="toCloseDate"></i>
      <span class="more_date_Title" :style="{lineHeight:navContentHeight+'px'}">{{title}}</span>
    </div>
    <div class="more_date_Month">  <!-- 月份 -->
      <div :class="{more_date_Moption:true, more_date_Mnow:date.monthNow==val.m}" v-for="(val, index) in monthList" :key="val.show+index" @click="toChooseMonth(val)">{{val.show}}<div class="more_date_Mthis" v-show="date.monthNow==val.m"></div></div>
    </div>
    <div class="more_date_Week">  <!-- 星期 -->
      <div class="more_date_Woption">日</div>
      <div class="more_date_Woption">一</div>
      <div class="more_date_Woption">二</div>
      <div class="more_date_Woption">三</div>
      <div class="more_date_Woption">四</div>
      <div class="more_date_Woption">五</div>
      <div class="more_date_Woption">六</div>
    </div>
    <div class="more_date_Date">  <!-- 日期 -->
      <div :class="{more_date_Doption:true, more_date_Doption_enabled:!val.enabled, more_date_Today:val.full==today, more_date_Now:val.full==choosedDate, more_date_Dunshow:val.y===null}" v-for="(val, index) in dayList" :key="date.monthNow+index" @click="toChooseDate(val, val.enabled)">{{val.d}}</div>
    </div>
    <button class="more_date_btn" @click="toCloseDate">返回</button>
  </div>
</template>

<script>
export default {
  // date:装有当前选中日期数据的对象,   title:标题,   lastToday:有该prop属性代表日历有效期从当前日期开始,当前日期之前的日期会变灰失效
  props:['date', 'title', 'lastToday'],
  data() {
    return {
      animation_date: null,
      animationData_date: {},
      choosedDate:'', // 选中的日期
      today:'', // 当前日期
      todayChuo:null, // 当天时间戳
      dayList:[], // 日期展示数组
      monthList:[] // 月份展示数组
    };
  },
  watch:{
    'date.monthNow':function(val){
      this.getDayList(this.date.yearNow, val);
    },
    'date.dayNow':function(){
      this.choosedDate=`${this.date.yearNow}-${this.date.monthNow}-${this.date.dayNow}`;
    }
  },
  methods:{
    toChooseDate(obj, bl){
      if(!bl)return;
      this.date.dayNow=obj.d;
      this.choosedDate=obj.full;
      this.$emit('selectDay', obj);
    },
    toShowDate(){
      this.animation_date.left('0').step(0);
      this.animationData_date = this.animation_date.export();
    },
    toCloseDate(){
      this.animation_date.left('100%').step(0);
      this.animationData_date = this.animation_date.export();
    },
    toChooseMonth(val){
      this.date.yearNow=val.y;
      this.date.monthNow=val.m;
    },
    showM(val){
      if(val=='01')return '一月';
      if(val=='02')return '二月';
      if(val=='03')return '三月';
      if(val=='04')return '四月';
      if(val=='05')return '五月';
      if(val=='06')return '六月';
      if(val=='07')return '七月';
      if(val=='08')return '八月';
      if(val=='09')return '九月';
      if(val=='10')return '十月';
      if(val=='11')return '十一月';
      if(val=='12')return '十二月';
    },
    getMaxDage(y, m){
      return new Date(y, m, 0).getDate();
    },
    getDayList(year, month){
      let arr_d=[];
      for(let i=1; i<this.getMaxDage(year, Number(month))+1; i++){
        let full=`${year}-${month}-${i>9?i+'':'0'+i}`;
        arr_d.push({
          y:year,
          m:month,
          d:i>9?i+'':'0'+i,
          week:new Date(year, Number(month)-1, i).getDay(),
          date:`${month}-${i>9?i+'':'0'+i}`,
          full,
          enabled:this.lastToday!==undefined?(new Date(full).getTime()>=this.todayChuo?true:false):true
        });
      };
      for(let i=0; i<new Date(year, Number(month)-1, 1).getDay(); i++){
        arr_d.unshift({y:null, m:null, d:null, week:null, full:null});
      };
      this.dayList=arr_d;
    },
    getMonthList(year, month){
      let arr_m=[];
      for(let i=0; i<5; i++){
        let mo=Number(month)+i;
        if(mo>12){
          let m=mo-12>9?mo-12+'':'0'+(mo-12);
          arr_m.push({y:year+1, m, show:this.showM(m), full:`${year+1}-${this.showM(m)}`});
        }else{
          let m=mo>9?mo+'':'0'+mo;
          arr_m.push({y:year, m, show:this.showM(m), full:`${year}-${this.showM(m)}`});
        };
      };
      this.monthList=arr_m;
    }
  },
  onLoad() {
    this.animation_date = wx.createAnimation({
      duration: 300,
      timingFunction: "ease"
    });
    let date=new Date();
    let monthNow=date.getMonth()+1>9?date.getMonth()+1+'':'0'+(date.getMonth()+1);
    this.today=`${date.getFullYear()}-${monthNow}-${date.getDate()>9?date.getDate()+'':'0'+date.getDate()}`;
    this.todayChuo=new Date(this.today).getTime();

    this.date.yearNow=this.date.yearNow?this.date.yearNow:date.getFullYear();
    this.date.monthNow=this.date.monthNow?this.date.monthNow:monthNow;
    this.date.dayNow=this.date.dayNow?(Number(this.date.dayNow)>9?Number(this.date.dayNow)+'':'0'+Number(this.date.dayNow)):(date.getDate()>9?date.getDate()+'':'0'+date.getDate());

    this.choosedDate=`${this.date.yearNow}-${this.date.monthNow}-${this.date.dayNow}`;
    this.getMonthList(this.date.yearNow, monthNow);
    this.getDayList(this.date.yearNow, this.date.monthNow);
  },
  onShow() {
    
  }
};
</script>

<style lang="scss">
.more_date_class {width:100%; background:white; overflow:hidden; font-size:14px; position:fixed; left:100%; z-index:100000000}
.more_date_Tb {width:100%; background-image:linear-gradient(to right, #f7426c, #ef0017); text-align:center; position:relative;}
.more_date_Title {color:white; font-size:18.5px; font-weight:900;}
.nav-bar-icon {font-size: 21px;color: #000; position:absolute; left:10px; top:0;}
.more_date_btn {margin-top:40px;}
.more_date_Month {width:100%; height:40px; line-height:40px; position:relative;}
.more_date_Moption {width:20%; height:40px; float:left; text-align:center; position:relative;}
.more_date_Mnow {color:#f01127;}
.more_date_Mthis {width:50%; height:3px; background:#f01127; position:absolute; left:25%; bottom:0;}
.more_date_Week {width:100%; height:35px; line-height:35px; color:white; background:black; position:relative;}
.more_date_Woption {width:14.28%; height:35px; float:left; text-align:center;}
.more_date_Date {width:90%; font-size:12px; margin-top:10px; padding-bottom:4px; box-shadow:0px 1px 10px #EAEAEA; position:relative; left:5%;}
.more_date_Doption {width:13%; height:45px; margin-left:1.1%; margin-top:4px; line-height:20px; border-radius:3px; text-align:center; display:inline-block; position:relative}
.more_date_Doption_enabled {color:#C2C2C2}
.more_date_Today {box-shadow:1px 1px #F8E2AC,-1px -1px #F8E2AC,-1px 1px #F8E2AC,1px -1px #F8E2AC;}
.more_date_Now {background:#2F4FDF; color:white;}
.more_date_Dunshow {opacity:0;}
</style>