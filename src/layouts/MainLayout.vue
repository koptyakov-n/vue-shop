<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="main-layout">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import Loader from '@/components/common/Loader'
import Navbar from '@/components/common/Navbar'

export default {
  name: 'main-layout',
  data() {
    return {
      loading: true,
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchCatalog')
    this.loading = false
  },
  components: {
    Loader,
    Navbar,
  },
}
</script>
