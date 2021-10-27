<template>
  <div>
    <div class="border-b border-gray-300 pl-4 pt-2 pb-5">
      <h1 class="text-3xl text-gray-500">Tweets</h1>
    </div>
    <div>
      <Tweet v-for="(tweet, index) of tweets" :key="index" :tweet="tweet"/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from '@/services/axios.service'
export default Vue.extend({
  layout: 'default',
  data: ()=> ({
    tweets: []
  }),
  mounted(){
    axios.get('/tweets').then(resp => {
      this.tweets = resp.data
    })
  },
})
</script>