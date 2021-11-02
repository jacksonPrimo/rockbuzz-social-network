<template>
  <div class="w-full h-screen relative">
    <Header :nick-name="userAuthenticated.nickName"/>
    <div class="min-h-screen px-4 sm:px-6 lg:px-12 bg-gray-200 pt-16">
      <div class="flex flex-col align-center justify-center md:flex-row justify-between py-2">
        <div class="md:fixed left-12 w-12/12 md:w-3/12 rounded-lg">
          <div class="rounded border border-gray-300 bg-white pb-2 mb-2">
            <div v-if="!userAuthenticated.coverImage" class="bg-gray-400 h-16"></div>
            <img v-else :src="userAuthenticated.coverImage" alt="cover">
            <div class="flex flex-col items-center">
              <img
                class="relative bottom-6 rounded-full w-20 h-20 border-4 border-white"
                :src="userAuthenticated.profileImage ? userAuthenticated.profileImage :'/profile.svg'" 
                alt="profile"
              >
              <div class="flex flex-col items-center">
                <span class="text-gray-700">{{userAuthenticated.fullName}}</span>
                <span class="text-gray-500">{{userAuthenticated.nickName}}</span>
              </div>
              <div class="flex">
                <div class="flex flex-col items-center px-1 text-gray-600">
                  <span>Tweets: </span>
                  <span class="text-black">{{userAuthenticated.tweets}}</span>
                </div>
                <div class="flex flex-col items-center px-1 text-gray-600">
                  <span>Following: </span>
                  <span class="text-black">{{userAuthenticated.following}}</span>
                </div>
                <div class="flex flex-col items-center px-1 text-gray-600">
                  <span>Followers: </span>
                  <span class="text-black">{{userAuthenticated.followers}}</span>
                </div>
              </div>
            </div>
          </div>
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
import Header from '@/components/Header.vue'
import axios from '@/services/axios.service'
export default Vue.extend({
  components: { Header },
  data: ()=> ({
    userAuthenticated: {
      id: '',
      profileImage: '',
      nickName: '',
      fullName: '',
      tweets: '',
      following: '',
      followers: '' 
    },
    trends: [],
    sugestionsToFollow: []
  }),
  mounted(){
    axios.get('/auth/user-authenticated').then(resp => {
      this.userAuthenticated = resp.data.user
      this.getSugestionToFollow(this.userAuthenticated.id)
    })
    axios.get('/trends').then(resp => {
      this.trends = resp.data
    })
  },
  methods: {
    getSugestionToFollow(userId: string){
      axios.get(`/sugestion-to-follow/${userId}`).then(resp => {
        this.sugestionsToFollow = resp.data
      })
    }
  }
})
</script>
