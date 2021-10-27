<template>
  <div>
    {{description}}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'default',
  computed: {
    description(){
      return this.$route.query.description
    }
  }
})
</script>
