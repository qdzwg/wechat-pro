<template>
    <div class="freeLayout">
        <!-- 两左两右 -->
        <div class="free-box" v-if="pageData.type=='freeLayout1'">
            <div @click='gourl(item)' class="free-item" v-for="(item,index) in pageData.list" :key="index">
                <img :src="item.picAddr" alt="">
            </div>
        </div>
        <!-- 一行两图 -->
        <div class="free-box" v-if="pageData.type=='freeLayout2'">
            <div @click='gourl(item)' class="free-item" v-for="(item,index) in pageData.list" :key="index">
                <img :src="item.picAddr" alt="">
            </div>
        </div>
        <!-- 一行三图 -->
        <div class="free-box" v-if="pageData.type=='freeLayout3'">
            <div @click='gourl(item)' class="free-item" :class="{free3:pageData.type=='freeLayout3'}" v-for="(item,index) in pageData.list" :key="index">
                <img :src="item.picAddr" alt="">
            </div>
        </div>
        <!-- 一上两下 -->
        <div class="free-box" v-if="pageData.type=='freeLayout4'">
            <div @click='gourl(pageData.list[0])' class="free-top">
                <img :src="pageData.list[0].picAddr" alt="">
            </div>
            <div class="free-bottom">
                <img @click='gourl(pageData.list[1])' :src="pageData.list[1].picAddr" alt="">
                <img @click='gourl(pageData.list[2])' :src="pageData.list[2].picAddr" alt="">
            </div>
        </div>
        <!-- 一左两右 -->
        <div class="free-left-box clearfix" v-if="pageData.type=='freeLayout6'">
            <div class="free-left fl">
                <img @click='gourl(pageData.list[0])' :src="pageData.list[0].picAddr" alt="">
            </div>
            <div class="free-right fr">
                <img @click='gourl(pageData.list[1])' :src="pageData.list[1].picAddr" alt="">
                <img @click='gourl(pageData.list[2])' :src="pageData.list[2].picAddr" alt="">
            </div>
        </div>
        <!-- 一左三右 -->
        <div class="free-left-box clearfix" v-if="pageData.type=='freeLayout5'">
            <div class="free-left fl" :class="{freeHieght:pageData.type=='freeLayout5'}">
                <img @click='gourl(pageData.list[0])' :src="pageData.list[0].picAddr" alt="">
            </div>
            <div class="free-right fr" :class="{freeHieght:pageData.type=='freeLayout5'}">
                <img @click='gourl(pageData.list[1])' class="free-lay" :src="pageData.list[1].picAddr" alt="">
                <img @click='gourl(pageData.list[2])' class="free-lay" :src="pageData.list[2].picAddr" alt="">
                <img @click='gourl(pageData.list[3])' class="free-lay" :src="pageData.list[3].picAddr" alt="">
            </div>
        </div>
        <!-- 一左轮播两右 -->
        <div class="free-left-box clearfix" v-if="pageData.type=='freeLayout7'">
            <div class="free-left free-left7 fl">
                <swiper
                  class="free-left-swiper"
                  :class="{width:pageData.imgFill=='white'}" indicator-color='#f4aaa0' indicator-active-color='#f05b47' @change='currentChange'  :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration">
                    <block v-for="(item,index) in pageData.casaulList" :key="index">
                        <swiper-item @click='gourl(item)'>
                            <img :src="item.picAddr" alt="">
                        </swiper-item>
                    </block>
                </swiper>
                <div class="dots-list">
                    <div v-for='(item,index) in pageData.list' :key='index' class="dots-item" :class="{ active: activeIndex==index }"></div>
                </div>
            </div>
            <div class="free-right free-right7 fr">
                <img @click='gourl(pageData.list[0])' :src="pageData.list[0].picAddr" alt="">
                <img @click='gourl(pageData.list[1])' :src="pageData.list[1].picAddr" alt="">
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

  data() {
    return {
      indicatorDots: true,
      circular: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      activeIndex: 0
    };
  },
  methods: {
    gourl(item) {
      if(item.linkUrl){
            this.goNavurl(item);
        }
    },
    currentChange(test) {
      //轮播图下标改变
      this.activeIndex = test.mp.detail.current;
    }
  }
};
</script>

<style lang="scss">
.freeLayout {
  width: 100%;
  .free-box {
    width: 100%;
    height: auto;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .free-item {
      flex-direction: column;
      width: 49%;
      height: 173px;
      padding: 5px 0;
    }
    .free3 {
      width: 33%;
      height: 114px;
    }
    & image {
      width: 100%;
      height: 100%;
      display: inline-block;
    }

    .free-top {
      width: 100%;
      padding: 0 3px;
      height: 173px;
      margin-bottom: 5px;
      & image {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
    .free-bottom {
      width: 100%;
      height: auto;
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      & image {
        width: 48.5%;
        height: 125px;
        display: inline-block;
      }
    }
  }
  .free-left-box {
    width: 100%;
    height: auto;
    background-color: #fff;
    box-sizing: border-box;
    .free-left {
      width: 64.5%;
      height: 234px;;
      box-sizing: border-box;
      padding-left: 3px;
      position: relative;
      .dots-list {
        position: absolute;
        top: 12.5px;
        right: 10px;
        display: flex;
        justify-content: center;
        .dots-item {
          height: 7.5px;
          width: 7.5px;
          margin: 0 4px;
          border-radius: 50%;
          background: #fff;
        }
        .dots-item.active {
          background: #ffb119;
          border-radius: 5px;
          width: 13.5px;
        }
      }
      & image {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      .free-left-swiper {
        height: 234px;
        overflow: hidden;
        border-radius: 10px 0px 0px 10px;
      }
    }
    .free-right {
      width: 34.5%;
      height: 234px;
      background-color: #fff;
      padding-right: 3px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & image {
        height: 49%;
        flex: -1;
        width: 100%;
        display: inline-block;
      }
    }
    .free-left7, .free-right7 {
      width: 50%;
    }
    .free-right7 {
      img:first-child {
        border-radius: 0px 10px 0px 0px;
      }
      img:last-child {
        border-radius: 0px 0px 10px 0px;
      }
    }
    .freeHieght {
      height: 272px;
      box-sizing: border-box;

      .free-lay {
        box-sizing: border-box;
        flex: -1;
        height: 32.5%;
      }
    }
  }
}
</style>

