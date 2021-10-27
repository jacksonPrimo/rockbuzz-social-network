<template>
  <div>redirecting</div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'simple',
  mounted(){
    this.$router.push({ name: 'feed' })
  }
})
</script>
