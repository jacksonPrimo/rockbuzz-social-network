<template>
  <div v-if="userAuthenticated" class="w-full h-screen relative">
    <Header :nick-name="userAuthenticated.nickName"/>
    <div class="min-h-screen px-4 sm:px-6 lg:px-12 bg-gray-200 pt-16">
      <div class="flex flex-col align-center justify-center md:flex-row justify-between py-2">
        <div class="md:fixed left-12 w-12/12 md:w-3/12 rounded-lg">
          <div class="rounded border border-gray-300 bg-white mb-2 flex flex-col p-2">
            <h2 class="text-2xl text-gray-500">Trends</h2>
            <span v-for="(trend, index) in trends" :key="index" class="py-1 text-gray-700">
              <fa icon="hashtag"/> {{trend}}
            </span>
          </div>
        </div>
        <div class="w-12/12 md:w-5/12 rounded-lg border border-gray-300 bg-white mx-0 md:mx-auto">
          <Nuxt/>
        </div>
        <div class="md:fixed right-12 w-12/12 md:w-3/12 rounded-lg">
          <div class="rounded border border-gray-300 bg-white mb-2 flex flex-col p-4">
            <h2 class="text-2xl text-gray-500 pt-2 pb-3">Who To Follow</h2>
            <div v-for="(stf, index) of sugestionsToFollow" :key="index" class="flex space-x-3 my-2">
              <div class="w-3/12">
                <img
                  class="rounded-full w-12 h-12" 
                  :src="stf.profileImage ? stf.profileImage : '/profile.svg'"
                  alt="profile"
                >
              </div>
              <div class="w-9/12 flex justify-between w-full">
                <div class="flex flex-col mr-auto">
                  <span class="text-gray-700">{{stf.fullName}}</span>
                  <router-link :to="'/profile/' + stf.nickName" class="text-gray-500">{{stf.nickName}}</router-link>
                </div>
                <div class="flex items-center justify-end">
                  <button class="bg-gray-200 py-0 px-2 rounded-full">
                    follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Header from '@/components/Header.vue'
export default Vue.extend({
  components: { Header },
  data: ()=> ({
    trends: [],
    sugestionsToFollow: []
  }),
    computed: {
  ...mapGetters({
      userAuthenticated: 'auth/userAuthenticated',
      authenticated: 'auth/authenticated'
    })
  },
  beforeMount(){
    if(!this.authenticated){
      this.$router.push({path: '/'})
    }
  },
  mounted(){
    this.getSugestionToFollow(this.userAuthenticated.id)
    this.$axios.$get('/trends').then(resp => {
      this.trends = resp
    })
  },
  methods: {
    getSugestionToFollow(userId: string){
      this.$axios.$get(`/sugestion-to-follow/${userId}`).then(resp => {
        this.sugestionsToFollow = resp
      })
    }
  }
})
</script>
