<template>
    <div class="program">
        <div class="program-list">
          <div class="program-item" @click='goPro(item)' :class="!index?'itemBorderNone':''" v-for="(item,index) in pageData.list" :key="index">
            <div class="program-select">
              <span v-if="item.tagTitle" :style="{color: item.tagColor,backgroundColor: item.tagBgColor}">{{item.tagTitle}}</span>
            </div>
            <div class="program-title">{{item.title}}</div>
            <div class="program-detail-wraper"><span class="program-detail" :class="!index?'program-detail-block':''">{{item.subtitle}}</span></div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    pageData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    goPro(item) {
      if(item.linkUrl){
        this.goNavurl(item);
      }
    },
  }
};
</script>
<style lang='scss'>
.program {
  width: 100%;
  .program-list {
    display: flex;
    flex-wrap: nowrap;
    border-radius: 10px;
    border: 2px solid #e5e5e5;
    text-align: center;
    .program-item {
      flex-grow: 1;
      border-left: 2px solid #e5e5e5;
      padding-bottom: 6px;
      &:first {
        border-left: none;
      }
      .program-select {
        text-align: right;
        margin-top: 4px;
        height: 10px;
        span {
          text-align: center;
          vertical-align: top;
          display: inline-block;
          border-radius: 3px;
          background-color: #fea82f;
          border-bottom-left-radius: 0px;
          color: #fff;
          width: 23px;
          font-size: 8px;
          margin-right: 3px;
        }
      }
      .program-title {
        color: #444;
        font-size: 14px;
        font-weight: bold;
        line-height: 18px;
        padding-bottom: 2px;
      }
      .program-detail {
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        line-height: 18px;
        padding: 0px 10px;
        border-radius: 10px;
        color: #999;
      }
      .program-detail-wraper {
        line-height: 18px;
      }
      .program-detail-block {
        background-color: #f73f69;
        color: #fff;
      }
    }
    .itemBorderNone {
      border-left: none;
    }
  }
}
</style>
