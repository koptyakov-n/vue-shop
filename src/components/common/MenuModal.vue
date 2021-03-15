<template>
  <transition name="fade-in">
    <div class="menuModal--layout">
      <transition name="slide-in-top">
        <div
          class="menuModal--window"
          :class="{ 'menuModal--window__open': open && localOpen }"
          v-show="open && localOpen"
        >
          <div class="menuModal--header">
            <h3 class="menuModal--title">Каталог</h3>
            <button class="btn menuModal--close-btn" @click="closeHandler()">
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2.59479"
                  y="0.970894"
                  width="26.6406"
                  height="3.55208"
                  rx="1"
                  transform="rotate(45 2.59479 0.970894)"
                  fill="#333333"
                />
                <rect
                  width="26.6406"
                  height="3.55208"
                  rx="1"
                  transform="matrix(-0.707107 0.707107 0.707107 0.707107 18.9209 0.970894)"
                  fill="#333333"
                />
              </svg>
            </button>
          </div>
          <div class="menuModal--body">
            <div class="menuModal--sidebar">
              <ul class="menuModal--sidebar-list">
                <li
                  v-for="(section, index) in sections"
                  :key="index"
                  @click="categoryChecked(index)"
                  :class="{
                    'menuModal--sidebar-item__active': index === checkedSection,
                  }"
                  class="menuModal--sidebar-item"
                >
                  {{ section.name }}
                </li>
              </ul>
            </div>
            <div class="menuModal--content">
              <div v-if="categories.length" class="menuModal--links">
                <div
                  class="menuModal--links-block"
                  v-for="category in categories"
                  :key="category.id"
                >
                  <h4 class="menuModal--links-title">
                    <a href="#">{{ category.name }}</a>
                  </h4>
                  <ul class="menuModal--links-list">
                    <li
                      class="menuModal--links-item"
                      v-for="subcategory in category.subcategories"
                      :key="subcategory.id"
                    >
                      <a
                        :href="`${baseUrl}category/${subcategory.url}`"
                        @click.prevent="closeHandler(subcategory.url)"
                        >{{ subcategory.name }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div v-else class="menuModal--links">
                <h4 class="menuModal--links-title">Нет категорий</h4>
              </div>
              <div class="menuModal--footer">
                <button
                  class="btn menuModal--footer-btn menuModal--footer-btn__active"
                  @click="$emit('close-modal')"
                >
                  Закрыть
                </button>
              </div>
            </div>
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
      sections: null,
      checkedSection: 0,
      categories: {},
      baseUrl: window.location.origin + this.$route.path,
    }
  },
  methods: {
    categoryChecked(id) {
      this.checkedSection = id
      this.categories = this.sections[id].categories || []
    },
    closeHandler(url = false) {
      this.localOpen = false
      setTimeout(this.closeModal, 200, url)
    },
    closeModal(url) {
      this.$emit('close-modal')
      this.localOpen = true
      if (url) {
        this.$router
          .push({ name: 'category', params: { id: url } })
          .catch(() => {})
      }
    },
  },
  async mounted() {
    this.sections = this.$store.getters.getMenu
    if (this.sections.length) {
      this.categoryChecked(0)
    }
  },
}
</script>
