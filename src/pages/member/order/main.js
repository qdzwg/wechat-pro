import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
// 定义插件
// const somePlugin = {
//   install: function () {
//     Vue.mixin({
//       onUnload() {
//         if (this.$options.data) {
//           console.log(this.$data)
//           Object.assign(this.$data, this.$options.data())
//         }
//       }
//     })
//   }
// }
// // 使用插件
// Vue.use(somePlugin)
export default {
  config: {
    navigationBarTitleText: '订单列表'
  }
}
