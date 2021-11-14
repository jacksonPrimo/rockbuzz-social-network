<template>
  <div class="w-screen h-screen flex justify-center">
    <form class="bg-gray-200 w-9/12 flex flex-col justify-center items-center" @submit.prevent="login">
      <div class="my-2 flex flex-col">
        <label for="email">email</label>
        <input id="email" v-model="email" type="email">
      </div>
      <div class="my-2 flex flex-col">
        <label for="password">senha</label>
        <input id="password" v-model="password" type="password">
      </div>
      <div class="text-center">
        <button class="bg-blue-400 text-white p-2 rounded">Entrar</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
export default Vue.extend({
  layout: 'empty',
  data: ()=> ({
    email: '',
    password: ''
  }),
  computed: {
  ...mapGetters({
      authenticated: 'auth/authenticated'
    })
  },
  watch: {
    authenticated(){
      if(this.authenticated){
        this.$router.push({ name: 'feed' })
      }
    }
  },
  mounted(){
    if(this.authenticated){
      this.$router.push({ name: 'feed' })
    }
  },
  methods: {
    ...mapActions({
      signin: 'auth/signIn'
    }),
    async login(){
      try {
        const resp = await this.$axios.$get('/auth/signin')
        this.signin(resp)
      } catch(error){
        console.log(error)
      }
    }
  },
})
</script>
