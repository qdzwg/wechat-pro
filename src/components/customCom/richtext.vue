<template>
    <div class="richtext" v-bind:style="{backgroundColor:pageData.backgroundColor}">
        <wxParse :imageProp='config' :content="pageData.content" @preview="preview" @navigate="navigate" />
    </div>
</template>
<script>
import wxParse from "mpvue-wxparse";
export default {
  components: {
    wxParse
  },
  props: {
    pageData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      article: "<div>我是富文本</div>",
      config: {
        mode: "widthFix"
      }
    };
  },
  watch: {
    pageData: function(val) {
      this.article = val;
    }
  },
  created() {
    // console.log("showzzz");
  },
  destroyed() {
    this.pageData = "";
    console.log("del");
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
.richtext {
  padding:0 5px;
  font-size:14px;
  color:#999;
  background-color: #fff;
  image {
    width: 100% !important;
    // height: auto !important;
  }
}
</style>
