<template>
  <nav class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <div v-if="!expendSearchBar" class="flex items-center justify-between h-16">
        <div class="flex items-baseline space-x-4">
          <a href="#" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
            <fa icon="home"/>
            <span class="hidden md:inline">Home</span>
          </a>
          <a href="#" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
            <fa icon="bell"/>
            <span class="hidden md:inline">Notifications</span>
          </a>
          <a href="#" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
            <fa icon="hashtag"/>
            <span class="hidden md:inline">Discover</span>
          </a>
        </div>
        <div class="flex-shrink-0">
          <a href="#">
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
              @click="expendSearchBar = !expendSearchBar"
            >
              <fa icon="search"/>
            </label>
            <input 
              id="search" 
              class="hidden md:block rounded-r bg-gray-200 appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text" 
              placeholder="search twitter"
            >
          </div>
          
          <a href="#" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
            <fa icon="comments"/>
          </a>
          <a href="#" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
            <fa icon="cog"/>
          </a>
          <a href="#" class="text-gray-400 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
            <fa icon="pen"/>
          </a>
        
        </div>
      </div>
      <div v-else class="flex items-center justify-between h-16 w-full">
        <div ref="search_container" class="flex w-full">
          <label for="search" class="rounded-l bg-gray-200 py-2 px-3 text-gray-400 leading-tight">
            <fa icon="search"/>
          </label>
          <input 
            id="search" 
            class="rounded-r bg-gray-200 appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="search twitter"
          >
        </div>
        <div class="py-2 px-3 text-gray-400" @click="expendSearchBar = !expendSearchBar">
          <fa icon="times"/>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data(){
    return {
      expendSearchBar: false
    }
  },
})
</script>
<style scoped>
</style>