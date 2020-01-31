<template>
    <div class="custom-page">
        <navbar :backShow='!componentShow' :title='renovationPageName'></navbar>
        <custom-com
        @parkNameChange='parkNameChange'
        :cityList="cityList"
        :cityName="cityName"
        v-if="listShow" :dataList="dataList"></custom-com> 
        <vue-tab-bar v-if="componentShow" :pageData='navigationData' @fetch-index="clickIndexNav" :selectNavIndex='selectNavIndex'></vue-tab-bar>
    </div>
</template>

<script>
import navbar from "@/components/navbar";//顶部栏
import vueTabBar from "@/components/customCom/vueTabBar"; //底部导航
import customCom from "@/components/customCom/index";
import { getData, postData, merchantInfoId } from "@/common/common";
import api from "@/api/api";
export default {
  components: {
    navbar,
    customCom,
    vueTabBar
  },
  props:{
    cityName: {
      type: String,
      default: ''
    },
    cityList: {
      type: Array,
      default: []
    }
  },
  onLoad() {
       getData(
        this.api.aiPapi.getUsePage ,{
            merchantInfoId:merchantInfoId,
            pageType:"navigationPage",
            useRange:"small"
        }
      ).then(res => {
        // console.log(res);
        this.navigationData=JSON.parse(res.data.content)
        this.navigationData.range.map(item=>{
          if(item=='custompage'){
              this.componentShow = true;
          }
      })
      });

    //     getData(
    //     this.api.aiPapi.getUsePage ,{
    //         merchantInfoId:merchantInfoId,
    //         pageType:"mianPage",
    //         useRange:"small"
    //     }
    //   ).then(res => {
    //     // console.log(res);
    //     this.dataList=JSON.parse(res.data.content)
    //     this.componentShow=true
    //   });

    // console.log(this.$root.$mp.query.id)
      getData(
        this.api.aiPapi.getRenovationById + "?id=" + this.$root.$mp.query.id
      ).then(res => {
        // console.log(res);
        this.dataList=JSON.parse(res.data.content)
        this.renovationPageName=res.data.renovationPageName
         this.listShow=true
      });
      
    
  },
  methods: {
      parkNameChange(name) {
      this.$emit("parkNameChange",name);
      }
  },
  data() {
    return {
      selectNavIndex: 0,
      navigationData:{},
      componentShow:false,
      listShow:false,
      dataList:[],
      renovationPageName:"",
    };
  },
  onShow() {
    //   this.list.map(item=>{
    //  item.data=item.data.replace(
    //       /.jpg/g,
    //       ".jpg?imageMogr2/thumbnail/750x/strip/quality/40"
    //     );
    //   })
  },
  methods: {}
};
</script>

<style lang='scss'>
.custom-page {
  width: 100%;
  //   background-color: #fff;
}
</style>
