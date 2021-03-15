import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import quantityFilter from '@/filters/quantity.filter'

import '@/assets/style.scss'

Vue.config.productionTip = false

Vue.filter('quantityFilter', quantityFilter)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
