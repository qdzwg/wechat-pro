<template>
  <!--详情页轮播图开始-->
  <div>
    <!-- {{num}} -->
    <div class="swiper-container">
      <!-- <button @click.stop="test">zzzz</button> -->
      <swiper class="swiper" indicator-color='#f7f7f7' indicator-active-color='#fff' @change='currentChange' :autoplay="autoplay" :interval="interval" :duration="duration">
        <!-- <block > -->
        <swiper-item v-for="(item,index) in imgUrl" :key='index'>
          <image @click="test" :src="item" class="slide-image" />
          <!-- <button @click="test">tes{{index}}t</button> -->
        </swiper-item>
        <!-- </block> -->
      </swiper>
      <div class="dots-list">
        <div v-for='(item,index) in imgUrl' :key='index' class="dots-item" :class="{active:activeIndex==index}"></div>
      </div>
    </div>

    <!-- <button @click="test">zz</button>
    <div @click="num++">asdsaddsaas</div> -->
  </div>

  <!--详情页轮播图结束-->
</template>
<script>
export default {
  data() {
    return {
      num: 0,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      activeIndex: 0,
      indicatorDots: false
    };
  },
  onShow() {
    console.log("zzzz");
  },
  onHide() {
    console.log(11);
  },
  props: {
    imgUrl: {
      type: Array,
      default: []
    }
  },
  methods: {
    test() {
      console.log("zz");
    },
    currentChange(test) {
      //轮播图下标改变
      console.log(test);
      this.activeIndex = test.mp.detail.current;
    }
  }
};
</script>
<style lang="scss">
.swiper-container {
  position: relative;
  height: 221.5px;
  .swiper {
    width: 100%;
    // height: 221.5px;
    height: 221.5px;
    image {
      width: 100%;
      height: 221.5px;
    }
  }
  .dots-list {
    position: absolute;
    width: 100%;
    bottom: 9px;
    left: 0px;
    display: flex;
    justify-content: center;
    .dots-item {
      height: 5px;
      width: 5px;
      margin: 0 5px;
      border-radius: 50%;
      background: #fff;
      opacity: 0.5;
    }
    .dots-item.active {
      background: #fff;
      opacity: 1;
    }
  }
}
</style>


