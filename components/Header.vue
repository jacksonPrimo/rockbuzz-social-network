<template>
  <nav class="bg-white fixed w-full z-10">
    <div class="mx-auto px-4 sm:px-6 lg:px-12">
      <div v-if="!expandSearchBar" class="flex items-center justify-between h-16">
        <div class="block md:hidden">
          <a href="/">
            <img class="h-8 w-8" src="../static/icon.svg" alt="Workflow">
          </a>
        </div>
        <div class="flex items-baseline space-x-4">
          <a href="/" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
            <fa icon="home"/>
            <span class="hidden md:inline">Home</span>
          </a>
          <a href="/" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
            <fa icon="bell"/>
            <span class="hidden md:inline">Notifications</span>
          </a>
          <a href="/" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
            <fa icon="hashtag"/>
            <span class="hidden md:inline">Discover</span>
          </a>
          <a :href="nickName" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
            <fa icon="user"/>
            <span class="hidden md:inline">Me</span>
          </a>
        </div>
        <div class="hidden md:block">
          <a href="/">
            <img class="h-8 w-8" src="../static/icon.svg" alt="Workflow">
          </a>
        </div>
        <div class="flex items-baseline space-x-4">
          <div ref="search_container" class="flex">
            <label for="search" class="hidden md:inline rounded-l md:bg-gray-200 py-2 px-3 text-gray-400 leading-tight">
              <fa icon="search"/>
            </label>
            <label 
              for="search" 
              class="inline md:hidden rounded hover:bg-gray-200 py-2 px-3 text-gray-400 leading-tight" 
              @click="expandSearchBar = !expandSearchBar"
            >
              <fa icon="search"/>
            </label>
            <input
              id="search" 
              v-model="searchValue"
              class="hidden md:block rounded-r bg-gray-200 appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text" 
              placeholder="search twitter"
              @keyup.enter="search"
            >
          </div>
          <div class="md:hidden block relative">
            <a class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium" @click="expandMenu = !expandMenu">
              <fa icon="ellipsis-h"/>
            </a>
            <div v-if="expandMenu" class="absolute flex flex-col bg-white min-w-2 min-h-16 border border-gray-300 rounded-lg">
              <a href="/" class="text-gray-400 px-3 py-2 text-sm font-medium">
                <fa icon="comments"/>
              </a>
              <a href="/" class="text-gray-400 px-3 py-2 text-sm font-medium">
                <fa icon="cog"/>
              </a>
              <a href="/" class="text-gray-400 px-3 py-2 text-sm font-medium">
                <fa icon="pen"/>
              </a>
            </div>
          </div>
          <div class="md:block hidden">
            <a href="/" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
              <fa icon="comments"/>
            </a>
            <a href="/" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
              <fa icon="cog"/>
            </a>
            <a href="/" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
              <fa icon="pen"/>
            </a>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center justify-between h-16 w-full">
        <div ref="search_container" class="flex w-full">
          <label for="search" class="rounded-l bg-gray-200 py-2 px-3 text-gray-400 leading-tight">
            <fa icon="search"/>
          </label>
          <input
            id="search"
            v-model="searchValue"
            class="rounded-r bg-gray-200 appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="search twitter"
            @keyup.enter="search"
          >
        </div>
        <div class="py-2 px-3 text-gray-400" @click="expandSearchBar = !expandSearchBar">
          <fa icon="times"/>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    nickName: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    expandSearchBar: false,
    expandMenu: false,
    searchValue: '',
  }),
  methods: {
    search(){
      this.$router.push({ name: 'search', query: {description: this.searchValue } })
    }
  }
})
</script>
<style scoped>
</style>