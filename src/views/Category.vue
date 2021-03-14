<template>
  <div class="container">
    <Loader v-if="loading" />
    <div v-else class="products">
      <h1 v-if="categoryName" class="products--title">{{categoryName}}</h1> 
      <h1 v-else class="products--title">Категория не найдена</h1>

      <div v-if="products" class="products--layout">
        <div 
          v-for="product in prods"
          :key="product.id"
          class="products--item"
        >
          <div class="products--item-pic">
            <img :src="product.pic" alt="" class="products--item-img">
          </div>
          <div class="products--item-info">
            <h3 class="products--item-title">
              {{ product.name }}
            </h3>
            <div class="products--item-bottom">
              <span class="products--item-price">
                {{ product.price }}₽
              </span>
              <div v-show="product.quantity" class="products--item-quant">
                <span class="products--item-cart">В корзине</span>
                <button
                  @click="lessCart(product)"
                  class="btn products--item-change products--item-change__less"
                >
                  <svg width="9" height="2" viewBox="0 0 9 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.799988 0.449997H8.79999V1.75H0.799988V0.449997Z" fill="#333333"/>
                  </svg>
                </button>
                <span class="products--item-quantity">{{product.quantity}}</span>
                <button
                  @click="moreCart(product)"
                  class="btn products--item-change products--item-change__more"
                >
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.60001 5.96H5.52001V10.26H4.07001V5.96H0.0100098V4.61H4.07001V0.339996H5.52001V4.61H9.60001V5.96Z" fill="#333333"/>
                  </svg>
                </button>
              </div>

              <button v-show="!product.quantity" @click="addToCart(product)" class="btn products--item-btn">В корзину</button>
            
            </div>
          </div>
        </div>

      </div>
      <p v-else-if="categoryName">Нет товаров</p>
    </div>
    
    
  </div>
</template>

<script>
import Loader from "@/components/common/Loader"
export default {
  data() {
    return {
      products: null,
      categoryId: 0,
      categoryName: '',
      loading: true,
      url: ''
    }
  },
  computed: {
    productsInCart() {
      // console.log(this.$store.getters.getCartProductIds);
      return this.$store.getters.getCartProductIds
    },
    prods() {
      return this.products.map(item => {
        const cartInfo = this.productsInCart.filter(prod => prod.id === item.id)
        return {
          ...item,
          quantity: cartInfo.length ? cartInfo[0].quantity : 0
        }        
      })
    }
  },
  methods: {
    
    addToCart(product){
      const item = {
        productId: product.id, 
        name: product.name, 
        quantity: 1,
        price: product.price,
        pic: product.pic
      }
      this.$store.dispatch('addToCart', item)
    },

    lessCart(product){
      product.quantity -= 1
      if (product.quantity > 0){
        this.updateCartItem(product)
      }
      else{
        this.$store.dispatch('removeItem', product.id)
      }
      
    },
    moreCart(product){
      product.quantity += 1
      this.updateCartItem(product)
    },

    updateCartItem(product){
      const item = {
        productId: product.id, 
        name: product.name, 
        quantity: product.quantity,
        price: product.price,
        pic: product.pic
      }
      this.$store.dispatch('updateCartItem', item)
    },
    async updateProducts(){
      this.loading = true
      this.categoryId = this.$store.getters.getCategoryInfoByUrl(this.url).id
      this.categoryName = this.$store.getters.getCategoryInfoByUrl(this.url).name
      const productList = await this.$store.dispatch('fetchProducts', this.url) || {}
      this.products = productList.length ? productList : null
      
      this.loading = false

    }
  },
  async mounted() {
    this.url = this.$route.params.id
    this.updateProducts()
  },
  watch: {
    $route() {
      this.url = this.$route.params.id
      this.updateProducts(this.url)
    }
  },
  components: {
    Loader
  }
}
</script>