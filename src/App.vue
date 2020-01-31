<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    let logs;
    if (mpvuePlatform === "my") {
      logs = mpvue.getStorageSync({ key: "logs" }).data || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync({
        key: "logs",
        data: logs
      });
    } else {
      logs = mpvue.getStorageSync("logs") || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync("logs", logs);
    }
  },
  log() {
    console.log(`log at:${Date.now()}`);
  }
};
</script>

<style>
/* // @import url('./../assets/font/iconfont.css'); */
@import url("./assets/font/iconfont.css");
/* // @import url("./../../assets/font/iconfont.css"); */
page {
  background: #ffffff;
  height: 100%;
  /* //   padding-bottom: 60px; */
  overflow-x: hidden;
  /* //   border-top:0.5px solid rgba(124, 124, 124, 0.2); */
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
/* //授权按钮 */
.authorization-btn {
  border-radius: 0;
  border: none;
  background: #f05b47;
  color: #fff;
  font-family: PingFangSC-Regular, sans-serif;
  font-size: 16px;
  height: 49px;
  line-height: 49px;
}
.topShadow {
  width: 100%;
  height: 1rpx;
  background-color: rgba(146, 144, 144, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
/* this rule will be remove */
/* // * {
//   transition: width 2s;
//   -moz-transition: width 2s;
//   -webkit-transition: width 2s;
//   -o-transition: width 2s;
// } */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
}
.shadow-bottom {
  box-shadow: 0 2.5px 4px 2.5px rgba(242, 242, 242, 0.5);
}
/*css reset*/
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
caption {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  vertical-align: baseline;
}

body {
  font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
  /* min-height: 100%; */
  height: auto;
  position: relative;
}
html {
  font-size: 20px;
  /* min-height: 100%; */
  height: auto;
}
ol,
ul {
  list-style: none;
}
table {
  border-collapse: collapse;
}
caption,
th,
td {
  font-weight: normal;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
}
blockquote,
q {
  quotes: "" "";
}
a {
  text-decoration: none;
}
input {
  vertical-align: middle;
}
img {
  border: none;
  vertical-align: middle;
}
input[type="text"],
input[type="password"] {
  outline: medium;
}
input[type="submit"],
input[type="reset"],
input[type="button"],
button,
input[type="number"] {
  -webkit-appearance: none;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  font-size: 0;
  line-height: 0;
}
.clearfix {
  display: inline-block;
}
.clearfix {
  display: block;
}
html,
body {
  -webkit-text-size-adjust: none;
}
.body-ce {
  background-color: #cecece;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="text"]::-webkit-inner-spin-button,
input[type="password"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  border-radius: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

.fr {
  float: right;
}
.fl {
  float: left;
}
.tr {
  text-align: right;
}
.ofh {
  overflow: hidden;
}
.ml10 {
  margin-left: 1rem;
}
.mt10 {
  margin-top: 1rem;
}
.w100 {
  width: 100%;
}

.color1 {
  color: #999;
}
.none {
  display: none;
}
.one-line {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.two-line {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.page-line {
  width: 100%;
  height: 10px;
}
.blf4 {
  width: 2px;
  height: 16.5px;
  margin-right: 8px;
  background-color: #f05b47;
  display: inline-block;
  vertical-align: middle;
}
.boxshadow {
  box-shadow: 0 2.5px 4.5px 0 rgba(242, 242, 242, 0.95);
}
.float-layer {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
}
.order-total {
  background-color: #fff;
  height: 58.5px;
}
.mb10 {
  margin-bottom: 10px;
}
.bg-w {
  background: #ffffff;
}
.m-t-10 {
  margin-top: 10px;
}
.m-b-10 {
  margin-bottom: 10px;
}
.m-l-10 {
  margin-left: 10px;
}
.h49 {
  height: 49px;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 700;
}

.noData {
  width: 130px;
  margin: 10px auto;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  color: #999;
}
.noData ._i {
  color: #f05b47;
  font-size: 15px;
  line-height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.noData .nodata-text {
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  line-height: 20px;
  /* // margin-left: 10px; */
  text-shadow: 1px 2px 2px #fff;
}
.contact-nodata {
  width: 100%;
}
.overflow {
  overflow: hidden;
  height: 100%;
}
</style>
