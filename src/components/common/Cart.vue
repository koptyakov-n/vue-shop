<template>
  <transition name="fade-in">
    <div class="cart--layout">
      <transition name="slide-in-right">
        <div class="cart--window" v-show="open && localOpen">
          <div class="cart--header">
            <h3 class="cart--title">Ваша корзина</h3>
            <button class="btn cart--close" @click="closeHandler">
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2.59473"
                  y="0.970901"
                  width="26.6406"
                  height="3.55208"
                  rx="1"
                  transform="rotate(45 2.59473 0.970901)"
                  fill="white"
                />
                <rect
                  width="26.6406"
                  height="3.55208"
                  rx="1"
                  transform="matrix(-0.707107 0.707107 0.707107 0.707107 18.9209 0.970901)"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div v-if="cart.length" class="cart--body">
            <p class="cart--info">{{ quantity | quantityFilter }}</p>
            <ul class="cart--list">
              <li v-for="item in cart" :key="item.productId" class="cart--item">
                <div class="cart--item-pic">
                  <img
                    class="cart--item-img"
                    :src="item.pic"
                    :alt="item.name"
                  />
                </div>
                <div class="cart--item-info">
                  <h5 class="cart--item-title">{{ item.name }}</h5>
                  <div class="cart--item-bottom">
                    <div class="cart--item-quant">
                      <button
                        @click="item.quantity -= 1"
                        :disabled="item.quantity < 2"
                        class="btn cart--item-btn btn cart--item-btn__less"
                      >
                        <svg
                          width="9"
                          height="2"
                          viewBox="0 0 9 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.799988 0.449997H8.79999V1.75H0.799988V0.449997Z"
                            fill="#333333"
                          />
                        </svg>
                      </button>
                      <span class="cart--item-quantity">{{
                        item.quantity
                      }}</span>
                      <button
                        @click="item.quantity += 1"
                        class="btn cart--item-btn btn cart--item-btn__more"
                      >
                        <svg
                          width="10"
                          height="11"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.60001 5.96H5.52001V10.26H4.07001V5.96H0.0100098V4.61H4.07001V0.339996H5.52001V4.61H9.60001V5.96Z"
                            fill="#333333"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="cart--item-prices">
                      <span class="cart--item-price">{{ item.price }}</span>
                      <span class="cart--item-total"
                        >{{ +item.price * +item.quantity }}₽</span
                      >
                    </div>
                  </div>
                </div>
                <button
                  class="btn cart--item-remove"
                  @click="removeItem(item.productId)"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2.39648"
                      y="0.313931"
                      width="17.7604"
                      height="2.36806"
                      rx="0.666667"
                      transform="rotate(45 2.39648 0.313931)"
                      fill="#333333"
                    />
                    <rect
                      width="17.7604"
                      height="2.36806"
                      rx="0.666667"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 13.2806 0.313931)"
                      fill="#333333"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
          <div v-else class="cart--body">
            <span style="display: none">{{ quantity }}</span>
            <p class="cart--info">Корзина пуста</p>
          </div>
          <div v-if="cart.length" class="cart--footer">
            <div class="cart--footer-text">
              <span class="cart--footer-label">Итого</span>
              <span class="cart--footer-total">{{ total }}₽</span>
            </div>
            <button @click="submitHandler" class="btn cart--confirm">
              Оформить заказ
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['open'],
  data() {
    return {
      localOpen: true,
    }
  },
  computed: {
    total() {
      if (this.cart) {
        return this.cart.reduce(
          (value, item) => (value += +item.price * +item.quantity),
          0
        )
      } else {
        return 0
      }
    },
    quantity() {
      if (this.cart) {
        const cartQuantity = this.cart.reduce(
          (quant, item) => (quant += item.quantity),
          0
        )
        this.$emit('cart-updated', cartQuantity)
        return cartQuantity
      } else {
        this.$emit('cart-updated', 0)
        return 0
      }
    },
    cart() {
      return this.$store.getters.getCart || []
    },
  },
  methods: {
    closeHandler() {
      // this.isOpen = false
      this.localOpen = false
      setTimeout(this.closeCart, 200)
    },
    closeCart() {
      this.$emit('cart-close')
      this.localOpen = true
    },
    removeItem(id) {
      this.$store.dispatch('removeItem', id)
    },
    submitHandler() {
      const cartState = {
        ...this.cart,
        total: this.total,
        quantity: this.quantity,
      }

      const url = 'https://projects.koptyakov.ru/shop-server/confirm.php'
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(cartState),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            console.log(
              'Looks like there was a problem. Status Code: ' + response.status
            )
          }
          return response.json()
        })
        .then((json) => console.log(json))
    },
  },
  watch: {
    quantity: function () {
      this.$store.dispatch('updateCart')
    },
  },
}
</script>
