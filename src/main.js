import '@/init'
import Vue from 'vue'
import App from './App.vue'
import store from '@/store';
import router from '@/router';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueLoading)

Vue.prototype.$spinner = {
  color: "seagreen",
  backgroundColor: "grey",
  blur: "9px",
  height: 100,
  width: 100
};

Vue.config.productionTip = false
new Vue({
  store,
  router,
  VueLoading,
  render: h => h(App),
}).$mount('#app')
