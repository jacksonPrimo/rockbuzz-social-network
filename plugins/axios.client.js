export default function ({$axios /*, store, redirect */}){
  $axios.onRequest(request=>{
    const token = localStorage.getItem('token')
    if(token){
      request.headers.common.Authorization = `Bearer ${token}`
    }
  })
}