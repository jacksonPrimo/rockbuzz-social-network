<template>
  <div class="w-screen h-screen flex justify-center">
    <form class="bg-gray-200 w-9/12 flex flex-col justify-center items-center" @submit.prevent="login">
      <img class="h-8 w-8" src="../static/icon.svg" alt="Workflow">
      <div class="my-2 flex flex-col">
        <label for="email">email</label>
        <input id="email" v-model="email" class="rounded" type="email">
      </div>
      <div class="my-2 flex flex-col">
        <label for="password">senha</label>
        <input id="password" v-model="password" class="rounded" type="password">
      </div>
      <div class="text-center">
        <button class="bg-blue-400 text-white p-2 rounded shadow">Entrar</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'empty',
  data: ()=> ({
    email: '',
    password: ''
  }),
  beforeMount(){
    const token = localStorage.getItem('token')
    if(token) {
      this.$store.dispatch('auth/signIn', token)
      this.$router.push({ name: 'feed' })
    }
  },
  methods: {
    async login(){
      try {
        const resp = await this.$axios.$get('auth/signin')
        this.$store.dispatch('auth/signIn', resp)
        this.$router.push({name: 'feed'})
      } catch(error){
        console.log(error)
      }
    }
  },
})
</script>
