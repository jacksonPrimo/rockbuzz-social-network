<template>
  <div class="p-2 border-b border-gray-300">
    <div class="flex">
      <div class="pl-0 md:pl-4 w-2/12">
        <img
          class="rounded-full w-16 h-16" 
          :src="tweet.user.profileImage ? tweet.user.profileImage : '/profile.svg'" 
          alt="profile"
        >
      </div>
      <div class="w-10/12">
        <div class="flex space-x-1">
          <span class="text-gray-700">{{tweet.user.fullName}}</span>
          <span class="text-gray-500">{{tweet.user.nickName}}</span>
        </div>
        <div>
          <p>{{tweet.description}}</p>
          <img v-if="tweet.image" class="rounded-lg" :src="tweet.image" alt="tweet">
        </div>
        <div class="flex pt-2 space-x-3">
          <button class="bg-transparent border-0 text-gray-500 mr-auto">
            Expand
          </button>
          <button class="bg-transparent border-0 text-gray-500">
            <fa icon="share" class="hover:text-blue-500"/> Reply
          </button>
          <button class="bg-transparent border-0 text-gray-500">
            <fa icon="retweet" class="hover:text-blue-500"/> Retweet
          </button>
          <button class="bg-transparent border-0 text-gray-500">
            <fa icon="star" class="hover:text-yellow-500"/> Favorite
          </button>
          <button class="bg-transparent border-0 text-gray-500 relative" @click="showMore = !showMore">
            <fa icon="ellipsis-h"/> More
              <div v-if="showMore" class="bottom-12 md:bottom-6 right-0 absolute flex flex-col bg-white w-24 min-h-16 border border-gray-300">
                <a href="#" class="text-gray-500 px-3 py-2 text-sm font-medium border-b border-gray-300">
                  more 1
                </a>
                <a href="#" class="text-gray-500 px-3 py-2 text-sm font-medium border-b border-gray-300">
                  more 2
                </a>
              </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    tweet: {
      type: Object,
      default: () => {
        return {
          id: '',
          userId: '',
          descriprion: '',
          image: '',
          user: {
            id: '',
            profileImage: null,
            nickName: '',
            fullName: ''
          }
        }
      }
    }
  },
  data: () => ({
    showMore: false,
  })
})
</script>