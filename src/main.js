import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "@/components/common/toast";

Vue.config.productionTip = false
/**
 *非父子组件之间的通信，选择用事件总线
 * this.$bus.$emit('事件名称',参数)
 * this.$bus.$on('事件名称',回调函数)
 */
Vue.prototype.$bus = new Vue()

Vue.use(toast)
/**/
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
