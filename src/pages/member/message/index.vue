<template>
  <div class="message"
       :style="[{height:'calc(100vh - '+(navContentHeight+navBarHeight+'px')+')'}]">
    <div :style="{'margin-top':(navContentHeight+navBarHeight+'px'),'margin-bottom':(tabContentHeight+navBarHeight+'px')}">
      <navbar title='宋城集团'></navbar>
      <div class="message-wrap">
        <div class="content-t">
          <div class="title">问题描述</div>
          <textarea name="feedback" id="feedback" cols="30" rows="10" minlength="20" maxlength="500" placeholder="请填写您要反馈的意见或建议20~500字"></textarea>
        </div>
        <form action="" class="form-wrap">
          <div class="form-t">
            <input type="text" placeholder="姓名" name="username">
            <input type="number" placeholder="联系电话" name="userphone">
          </div>
          <button>提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from "@/components/navbar";
  export default {
    components: {
      navbar
    },
    data() {
      return {
       
      };
    },
    onLoad() {
      this.swiperHeight =
        res.windowHeight - 39 - (this.navContentHeight + this.navBarHeight);
    },
    onUnload() { },
    onHide() {

    },
    computed: {

    },
    methods: {
      
    }
  }

</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .message{
    background:#eff1f6;
    .message-wrap{
      font-family: PingFang SC Regular;
      .content-t{
        padding-left: 10px;
        background: #fff;
      }
      .form-t{
        padding-left: 10px;
        background: #fff;
      }
      .title{
        position: relative;
        color:#333333;
        font-size: 16px;
        font-family: PingFang SC Medium;
        height: 50px;
        line-height: 50px;
        padding-right: 10px;
        border-bottom: 1px solid #ececec;
        padding-left: 20px;
        &::before{
          position: absolute;
          left: 5px;
          top:0;
          color:#ff0000;
          content: '*';
          display: inline-block;
        }
      }
      textArea{
        padding-top: 10px;
        padding-left: 5px;
        margin-right: 10px;
        width: calc(100% - 20px);
        height: 165px;
        font-size: 14px;
        color:#999;
      }
      .form-wrap{
        display: block;
        width: 100%;
        color:#333333;
        margin-top: 10px;
        input{
          height: 50px;
          font-size: 14px;
          font-family: PingFang SC Medium;
          &::placeholder{
            line-height: 25px;
          }
          border:1px solid transparent;
          outline: none;
          padding-left: 10px;
          line-height: 25px;
          &:first-of-type{
            border-bottom: 1px solid #ececec;
          }
        }
        button{
          margin-top: 24px;
          display: block;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: 25px;
          margin-left: 10px;
          margin-right: 10px;
          color:#fff;
          background: linear-gradient(to right,#ef0018,#f7406c);
          width:calc(100% - 20px);
        }
      }
    }
  }
</style>
