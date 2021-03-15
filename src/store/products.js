export default {
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, data) {
      state.products = data
    },
  },
  actions: {
    async fetchProducts({ commit }, category) {
      try {
        const url = `https://projects.koptyakov.ru/shop-server/products.php?category=${category}`
        const data = await fetch(url)
          .then((response) => {
            if (response.status !== 200) {
              console.log('[Error] Status Code: ' + response.status)
            }
            return response.json()
          })
          .then((json) => {
            const data = JSON.parse(json)
            return data
          })
        commit('setProducts', data || [])
        return data
      } catch (e) {
        console.log('[Error]: ', e)
      }
      return null
    },
  },
  getters: {
    getProducts: (state) => state.products,
    getProductsByCategory: (state) => (id) => {
      console.log(JSON.stringify(state.products, null, ' '))
      return state.products.filter((product) => {
        return product.category.find((cat) => cat.id === id)
      })
    },
  },
}
