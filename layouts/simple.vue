<template>
  <div class="w-full h-screen">
    <Header/>
    <div class="min-h-screen px-4 sm:px-6 lg:px-12 bg-gray-200">
      <Nuxt/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'
export default Vue.extend({
  components: { Header }
})
</script>
