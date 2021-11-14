<template>
  <div>
    <div v-if="!userNotFound">
      <div v-if="!user.coverImage" class="bg-gray-400 h-24"></div>
      <img v-else :src="user.coverImage" alt="cover">
      <div class="relative bottom-4">
        <div class="ml-5">
          <img
            class="rounded-full w-32 h-32 border-4 border-white" 
            :src="user.profileImage ? user.profileImage :'/profile.svg'" 
            alt="profile"
          >
          <p class="text-gray-700 text-xl">{{user.fullName}}</p>
          <p class="text-gray-500">{{user.nickName}}</p>
          <div class="space-x-2">
            <span>{{user.following.length}} Following</span>
            <span>{{user.followers.length}} Followers</span>
          </div>
        </div>
      </div>
      <div v-if="isUserAuthenticated" class="flex">
        <div :class="{'active': content == 'tweets'}" class="w-3/12 item-menu" @click="content = 'tweets'">
          <span>Tweets</span>
        </div>
        <div :class="{'active': content == 'favorites'}" class="w-3/12 item-menu" data-test-id="favorite-option" @click="content = 'favorites'; getFavorites()">
          <span>Favoritos</span>
        </div>
        <div :class="{'active': content == 'following'}" class="w-3/12 item-menu" @click="content = 'following'">
          <span>Following</span>
        </div>
        <div :class="{'active': content == 'followers'}" class="w-3/12 item-menu" @click="content = 'followers'">
          <span>Followers</span>
        </div>
      </div>
      <div v-else class="flex">
        <div :class="{'active': content == 'tweets'}" class="w-4/12 item-menu" @click="content = 'tweets'">
          <span>Tweets</span>
        </div>
        <div :class="{'active': content == 'following'}" class="w-4/12 item-menu" @click="content = 'following'">
          <span>Following </span>
        </div>
        <div :class="{'active': content == 'followers'}" class="w-4/12 item-menu" @click="content = 'followers'">
          <span>Followers</span>
        </div>
      </div>
      <div v-if="content == 'tweets'">
        <div v-for="(tweet, index) of tweets" :key="index">
          <span v-if="isUserAuthenticated" class="ml-2 text-gray-400 text-sm">
            Você retweetou <fa icon="retweet"/>
          </span>
          <span v-else class="ml-2 text-gray-400 text-sm">
            {{user.fullName}} retweetou <fa icon="retweet"/>
          </span>
          <Tweet :tweet="tweet" :user-auth-id="userAuthenticated.id"/>
        </div>
      </div>
      <div v-if="content == 'favorites'">
        <div v-if="favorites.length">
          <div v-for="(tweet, index) of favorites" :key="index" data-test-id="favorite">
            <Tweet :tweet="tweet" :user-auth-id="userAuthId"/>
          </div>
        </div>
        <div v-else>
          <h1 class="pt-4 text-center text-2xl text-gray-300">Não há favoritos ainda</h1>
        </div>
      </div>
      <div v-if="content == 'following'" class="px-2">
        <div v-if="user.following.length">
          <div v-for="(result, index) of user.following" :key="index" class="flex space-x-3 my-3">
            <div class="w-2/12">
              <img
                class="rounded-full w-12 h-12" 
                :src="result.profileImage ? result.profileImage : '/profile.svg'"
                alt="profile"
              >
            </div>
            <div class="w-10/12 flex justify-between w-full">
              <div class="flex flex-col mr-auto">
                <span class="text-gray-700">{{result.fullName}}</span>
                <router-link :to="'/profile/' + result.nickName" class="text-gray-500">{{result.nickName}}</router-link>
              </div>
              <div class="flex items-center justify-end">
                <button class="border border-gray-200 py-0 px-2 rounded-full">
                  following
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h2 class="text-center text-2xl text-gray-500 pt-2 pb-3">this user still doesn't follow anyone<fa icon="sad-tear"/></h2>
        </div>        
      </div>
      <div v-if="content == 'followers'" class="px-2">
        <div v-if="user.followers.length">
          <div v-for="(result, index) of user.following" :key="index" class="flex space-x-3 my-3">
            <div class="w-2/12">
              <img
                class="rounded-full w-12 h-12" 
                :src="result.profileImage ? result.profileImage : '/profile.svg'"
                alt="profile"
              >
            </div>
            <div class="w-10/12 flex justify-between w-full">
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
        <div v-else>
          <h2 class="text-center text-2xl text-gray-500 pt-2 pb-3">this user has no followers yet<fa icon="sad-tear"/></h2>
        </div>        
      </div>
    </div>
    <div v-if="userNotFound" class="py-11">
      <h1 class="text-center text-2xl text-red-200">User Not Found</h1>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex';
export default Vue.extend({
  layout: 'simple',
  data: ()=>({
    user: {
      id: '',
      profileImage: '',
      nickName: '',
      fullName: '',
      tweets: 0,
      following: [],
      followers: []
    },
    userNotFound: true,
    content: 'tweets',
    tweets: [],
    favorites: []
  }),
  computed:{
    isUserAuthenticated(){
      if(this.user.id === this.userAuthenticated.id) return true
      else return false
    },
    ...mapGetters({
      userAuthenticated: 'auth/userAuthenticated'
    })
  },
  mounted(){
    const { nickName } = this.$route.params;
    if(!nickName) this.$router.push('/feed')
    this.$axios.$get(`/profile/${nickName}`)
      .then(resp=>{
        this.user = resp.user
        this.userNotFound = false
      })
      .catch(() => {
        this.userNotFound = true
      })
    this.$axios.$get('/tweets').then(resp => {
        this.tweets = resp
    })
  },
  methods: {
    getFavorites(){
      this.$axios.$get(`/tweets/favorites/${this.userAuthenticated.id}`).then(resp => {
        this.favorites = resp
      })
    }
  }
})
</script>
<style scoped>
.item-menu {
  text-align: center;
  color: rgba(75, 85, 99, 1);
}
.item-menu:hover {
  cursor: pointer;
  border-bottom: 8px solid rgb(59, 122, 211);
  border-radius: 0.25rem;
}
.item-menu.active {
  border-bottom: 8px solid rgb(59, 122, 211);
  border-radius: 0.25rem;
}
</style>
