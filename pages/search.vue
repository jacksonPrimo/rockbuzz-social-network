<template>
  <div>
    <div class="rounded bg-white mb-2 flex flex-col p-4">
      <div v-if="searchResults.length">
        <h2 class="text-2xl text-gray-500 pt-2 pb-3">Results</h2>
        <div v-for="(result, index) of searchResults" :key="index" class="flex space-x-3 my-3" data-test-id="search-result">
          <div class="w-3/12">
            <img
              class="rounded-full w-12 h-12" 
              :src="result.profileImage ? result.profileImage : '/profile.svg'"
              alt="profile"
            >
          </div>
          <div class="w-9/12 flex justify-between w-full">
            <div class="flex flex-col mr-auto">
              <span class="text-gray-700">{{result.fullName}}</span>
              <router-link :to="'/profile/' + result.nickName" class="text-gray-500">{{result.nickName}}</router-link>
            </div>
            <div class="flex items-center justify-end">
              <button class="bg-gray-200 py-0 px-2 rounded-full">
                follow
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else data-test-id="not-result">
        <h2 class="text-center text-2xl text-gray-500 pt-2 pb-3">sorry we didn't find any results <fa icon="sad-tear"/></h2>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  layout: 'complete',
  data: ()=>({
    searchResults: []
  }),
  computed: {
    description(){
      return this.$route.query.description
    },
    ...mapGetters({
      authenticated: 'auth/authenticated'
    }),
  },
  watch: {
    description() {
      (this as any).search()
    }
  },
  mounted(){
    (this as any).search()
  },
  methods: {
    search(){
      this.$axios
      .$get(`/users/${this.description}`)
      .then((resp: any) => {
        this.searchResults = resp
      })
    }
  }
})
</script>
