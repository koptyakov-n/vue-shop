import Vue from 'vue'
import Vuex from 'vuex'
import catalog from './catalog'
import cart from './cart'
import products from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    catalog,
    cart,
    products,
  },
})
