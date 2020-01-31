<template>
    <div class="slect-box">
        <div class="com-selectBox">
    <div class="com-sContent" @bindchange="selectToggle">
        <div class="com-sTxt">{{nowText}}</div>
        <image src="/static/img/arrow-left-icon.png"  class="com-sImg"  :animation="animationData"></image>
    </div>
    <div class="com-sList" v-if="selectShow">
        <div v-for="(item,index) in propArray"  :key="index" class="com-sItem" @bindchange="setText">{{item.text}}</div>
    </div>
</div>
    </div>
</template>


<script>
export default {
  prop: {
    propArray: {
      type: Array
    }
  },

  data() {
    return {
      propArray: [
        {
          id: 1,
          text: "哈哈"
        },
        {
          id: 2,
          text: "嘿嘿"
        }
      ],
      selectShow: false, //初始option不显示
      nowText: "请选择", //初始内容
      animationData: {} //右边箭头的动画
    };
  },
  computed: {},
  methods: {
    //option的显示与否
    selectToggle: function() {
      var nowShow = this.selectShow; //获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
         duration: 500,
        timingFunction: "ease"
      });
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        });
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        });
      }
      this.setData({
        selectShow: !nowShow
      });
    },
    //设置内容
    setText: function(e) {
      var nowData = this.properties.propArray; //当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.index; //当前点击的索引
      var nowText = nowData[nowIdx].text; //当前点击的内容
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      this.setData({
        selectShow: false,
        nowText: nowText,
        animationData: this.animation.export()
      });
    }
  }
};
</script>

<style scoped lang="scss">
.select-box {
}
.com-selectBox {
  width: 60px;

  .com-sContent {
    border: 1px solid #e2e2e2;
    background: white;
    font-size: 16px;
    position: relative;
    height: 30px;
    line-height: 30px;

    .com-sImg {
      position: absolute;
      right: 10px;
      top: 11px;
      width: 16px;
      height: 9px;
      transition: all 0.3s ease;
    }
    .com-sTxt {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 20px 0 6px;
      font-size: 14px;
    }
  }

  .com-sList {
    background: white;
    width: inherit;
    position: absolute;
    border: 1px solid #e2e2e2;
    border-top: none;
    box-sizing: border-box;
    z-index: 3;
    max-height: 120px;
    overflow: auto;

    .com-sItem {
      height: 30px;
      line-height: 30px;
      border-top: 1px solid #e2e2e2;
      padding: 0 6px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
    .com-sItem:first-child {
  border-top: none;
}
  }
}

</style>


