export default {
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    addToCart(state, item) {
      state.cart.push(item)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeItem(state, id) {
      state.cart = state.cart.filter(item => item.productId !== id)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateCart(state) {
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateCartItem(state, updatedItem) {
      console.log(state.cart);
      state.cart = state.cart.map(item => item.productId === updatedItem.productId ? updatedItem : item)
      console.log(state.cart);
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
    
  },
  actions: {
    addToCart(state, item){
      state.commit("addToCart", item);
    },
    removeItem(state, id){
      state.commit("removeItem", id);
    },
    updateCart(state){
      state.commit("updateCart");
    },
    updateCartItem(state, updatedItem){
      console.log(updatedItem);
      state.commit("updateCartItem", updatedItem);
    }
  },
  getters: {
    getCart: state => state.cart,
    getCartProductIds: state => {
      return state.cart.map(item => {
          return {
            id: item.productId,
            quantity: item.quantity
          }
        } 
      )
    }
  }
}