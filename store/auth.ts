const jwt = require('jsonwebtoken')
export const state = () => ({
  token: null,
})
export const getters = {
  authenticated: (state: any): boolean => !!state.token,
  userAuthenticated: (state: any) => {
    if(state.token){
      const data = jwt.decode(state.token)
      return data
    }
  },
}
export const actions = {
  signIn(context: any, token: string){
    context.commit('signIn', token)
  },
  signOut(context: any){
    context.commit('signOut')
  }
}
export const mutations = {
  signIn(state: any, token: string) {
    state.token = token
  },
  signOut(state: any) {
    state.token = null
  },
}