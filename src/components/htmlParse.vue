<template>
  <div class="img-box">
    <wxParse :imageProp='config' :content="contentstr" @preview="preview" @navigate="navigate" />
  </div>
</template>

<script>
import wxParse from "mpvue-wxparse";

export default {
  components: {
    wxParse
  },
  props: {
    contentstr: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      article: "",
      config: {
        mode: "widthFix"
      }
    };
  },
  watch: {
    contentstr: function(val) {
      this.article = val;
    }
  },
  created() {
    console.log("showzzz");
  },
  destroyed() {
    this.contentstr = ''
    console.log('del')
  },
  methods: {
    preview(src, e) {
      // do something
    },
    navigate(href, e) {
      // do something
    }
  }
};
</script>

<style lang='scss'>
/* @import url("~mpvue-wxparse/src/wxParse.css"); */
/* .img-box {
  image {
    width: 100%;
  }
} */
.img-box {
  padding: 0 15px;
  // width: 100;
  image {
    width: 100% !important;
    // height: auto !important;
  }
}
</style>