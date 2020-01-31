<template>
  <div>
    <div class="search-box">
      <div class="search-city">
        <span @click="parkListChange" class="search-city-name">{{parkName}}</span>
        <span @click="parkListChange" class="search-border"></span>
      </div>
        <div class="search-warper" v-bind:style="{background:pageData.backgroundColor,borderColor:pageData.borderColor,height:pageData.height*2+'rpx','--radius':pageData.height+'px'}" :class="{fillet:pageData.type=='search2'}">
           <i class="xx-icon icon-ico-search icon-search" @click="goOperation" v-bind:style="{'--top':(pageData.height*0.35<10?pageData.height*0.35:pageData.height*0.35+2)+'rpx'}"></i>
            <input @confirm='goOperation' class="search-input" v-bind:style="{color:pageData.textColor,height:pageData.height*2+'rpx',lineHeight:pageData.height*2+'rpx',textAlign:pageData.position}" v-model="seachName" placeholder-class="place-holder" :placeholder="pageData.placeholder?pageData.placeholder:'请输入您要搜索的产品'" />
        </div>
    </div>
    <definedPicker :select='parkListShow' @pickerCancel='pickerCancel' :arr='parkList' @pickerChange='parkNameChange'></definedPicker>
  </div>
</template>
<script>
import { getData } from "@/common/common";
import definedPicker from "@/components/definedpicker";
export default {
  components: {
      definedPicker,
  },
  props: {
    parkList: {
      type: Object,
      default: {}
    },
    parkName: {
      type: Object,
      default: {}
    },
    pageData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
        seachName: "",
        cityId: "",
        merchantParkId: null,
        parkListShow: false,
    };
  },
  onShow() {
    
  },
  onLoad() {
    this.cityId = wx.getStorageSync("Wxxcx_cityids")
  },
  methods: {
    pickerCancel() {
      this.parkListShow = false;
    },
    parkNameChange(item) {
      this.parkName = item.nickName;
      this.merchantParkId = item.id;
      this.pickerCancel()
      this.$emit("parkNameChange", this.parkName );
    },
    parkListChange() {
      this.parkListShow = true;
    },
    goOperation() {
      console.log(this.cityId,this.seachName);
      let str = "&cityId=" + this.cityId;
      if(this.merchantParkId){
        str = "&merchantParkId=" + this.merchantParkId
      }
      this.navigatePageTo(
        this.router + "pages/result/main?name=" + this.seachName + str
      );
    }
  }
};
</script>
<style lang='scss'>
.search-box {
  padding: 10px 0px;
  display: flex;
  align-items: center;
  .selectlist {
    .select-column {
      text-align: center;
      font-size: 14px;
    }
  }
  .search-city {
    font-size: 16px;
    line-height: 34px;
    position: relative;
    .search-city-list {
      max-height: 200px;
      position: absolute;
      top: 100%;
      left: 0px;
      right: 0px;
      background-color: #fff;
      font-size: 14px;
      .search-city-item {
        word-break: break-all;
        white-space: wrap;
      }
    }
    span {
      vertical-align: middle;
      display: inline-block;
      text-align: center;
      color: #fff;
    }
    .search-border {
      margin-left: 4px;
      padding: 0px;
      border: 4px solid transparent;
      border-top: 4px solid #fff;
    }
    .search-city-name {
      white-space: nowrap;
      width: 75px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .fillet {
    border-radius: var(--radius);
  }
  .search-warper {
    position: relative;
    margin-left: 10px;
    width: 252px;
    border: none;
    border-radius: 5px;
    .place-holder {
      font-family: PingFangSC-Regular, sans-serif;
      color: #acacac;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .search-input {
      font-family: PingFangSC-Regular, sans-serif;
      color: #999999;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    input {
    //   height: 35px;
    //   line-height: 35px;
      padding-left: 35px;
      font-size: 14px;
      padding-right: 35px;
    }
    .icon-search {
        // width:15px;
      position: absolute;
      top:var(--top);
      left: 8px;
      font-size: 20px;
      font-weight: 700;
      color: #999999;
    //   z-index: 999;
    }
  }
}
</style>
