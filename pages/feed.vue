<template>
  <div>
    <div class="border-b border-gray-300 pl-4 pt-2 pb-5">
      <h1 class="text-3xl text-gray-500">Tweets</h1>
    </div>
    <div>
      <Tweet v-for="(tweet, index) of tweets" :key="index" :tweet="tweet" :user-auth-id="userAuthId"/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from '@/services/axios.service'
export default Vue.extend({
  layout: 'default',
  data: ()=> ({
    tweets: [],
    userAuthId: ''
  }),
  mounted(){
    axios.get('/tweets').then(resp => {
      this.tweets = resp.data
    })
    axios.get('/auth/user-authenticated').then(resp => {
      this.userAuthId = resp.data.user.id
    })
  },
})
</script>