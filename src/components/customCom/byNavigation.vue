<template>
  <div class="byNavigation"
       v-bind:style="{backgroundColor:pageData.backgroundColor,color:pageData.textColor}">
    <div class="byNavigation-box"
         v-if="pageData.type=='navigation2'">
      <div @click='gourl(item)'
           :style="{width:itemWidth,'border-right':(((index+1)>=pageData.lineNum)&&((index+1)%(pageData.lineNum)==0))?'0':('2px solid ' + (pageData.borderColor? pageData.borderColor:'transparent')),'border-bottom':index+1>min?'0':('2px solid ' + (pageData.borderColor? pageData.borderColor:'transparent'))}"
           class="text"
           v-for="(item,index) in pageData.list"
           :key="index">
        {{item.title}}
      </div>
    </div>

    <div class="nav-image"
         v-if="pageData.type=='navigation1'">
      <div @click='gourl(item)'
           :style="{width:itemWidth,'border-right':(((index+1)>=pageData.lineNum)&&((index+1)%(pageData.lineNum)==0))?'0':('2px solid ' + (pageData.borderColor? pageData.borderColor:'transparent')),'border-bottom':index+1>min?'0':('2px solid ' + (pageData.borderColor? pageData.borderColor:'transparent'))}"
           class="image-text-box"
           v-for="(item,index) in pageData.list"
           :key="index">
        <img v-if="item.picAddr"
             :src="item.picAddr"
             alt="">
        <div v-else
             class="icon-box"
             :class="item.linkUrl">
          <i class="xx-icon icon-pic"
             :class="iconData[item.linkUrl]"></i>
        </div>

        <div class="image-text">{{item.title}}</div>
      </div>
    </div>
    <program v-if="pageData.type=='navigation3'" :pageData='pageData'></program>
  </div>
</template>
<script>
import { getData, merchantInfoId } from "@/common/common.js";
import program from "@/components/customCom/program"; //搜索
export default {
  components: {
    program
  },
  props: {
    pageData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {};
  },
  computed: {
    max () {
      return this.pageData.list.length;
    },
    min () {
      if (this.num2 == 0) {
        //整除
        if (this.num1 == 0) {
          //this.data.list.lenght ===0
          return 0;
        } else {
          return (this.num1 - 1) * this.pageData.lineNum;
        }
      } else {
        // 没有整除
        return this.num1 * this.pageData.lineNum;
      }
    },
    num1 () {
      //取整数
      return Math.floor(this.pageData.list.length / this.pageData.lineNum);
    },
    num2 () {
      //余数
      return this.pageData.list.length % this.pageData.lineNum;
    },
    itemWidth () {
      return 1 / this.pageData.lineNum * 100 + "%";
    }
  },
  methods: {
    gourl (item) {
      console.log(item)
      // item.linkUrl,item.customPageId
      if (item.linkUrl) {
        this.goNavurl(item);
      }
    },
    getService () { }
  }
};
</script>
<style lang='scss'>
.byNavigation {
  width: 100%;
  color: #413838;
  // box-shadow: 1px 1px 5px #e7e6e6;
  .byNavigation-box {
    width: 100%;
    line-height: 40px;
    // padding: 2px 0;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    .text {
      box-sizing: border-box;
      font-size: 14px;
      text-align: center;
    }
  }
  .nav-image {
    width: calc(100%);
    height: auto;
    // padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    // margin-right:-6.5px;
    .image-text-box {
      box-sizing: border-box;
      display: inline-block;
      text-align: center;
      font-size: 14px;
      line-height: 25px;
      padding-bottom: 6px;
      image {
        width: 44px;
        height: 44px;
        // border-radius: 4.5px;
        vertical-align: middle;
        margin-top: 10px;
      }
      .image-text {
        margin-top: 5px;
      }
      .icon-box {
        display: inline-block;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        color: #fff;
        margin-top: 10px;
        vertical-align: middle;
        background: linear-gradient(-150deg, #03d9a9, #00b38b); /* 标准的语法 */
        line-height: 44px;
        .icon-pic {
          width: 44px;
          height: 44px;
          font-size: 24px;
        }
      }
      .ticket {
        background: linear-gradient(-150deg, #89c4fa, #4a88c1); /* 标准的语法 */
        .icon-pic {
          font-size: 25px;
        }
      }
      .hotel {
        background: linear-gradient(-150deg, #fdd284, #de9613); /* 标准的语法 */
        .icon-pic {
          font-size: 23px;
        }
      }
      .shop {
        background: linear-gradient(-150deg, #03d9a9, #00b38b); /* 标准的语法 */
        .icon-pic {
          font-size: 24px;
        }
      }
      .strategy {
        background: linear-gradient(-150deg, #ff9e5f, #e66b1a); /* 标准的语法 */
        .icon-pic {
          font-size: 26px;
        }
      }
      .repast {
        background: linear-gradient(-150deg, #ffc1a0, #fb8599); /* 标准的语法 */
        .icon-pic {
          font-size: 23px;
        }
      }
    }
  }
}
</style>
