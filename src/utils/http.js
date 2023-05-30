import axios from "axios"


axios.defaults.baseURL = "http://101.34.108.131:2333"

axios.interceptors.request.use(res=>{
    return res
})
axios.interceptors.response.use(res=>{
    return res.data
})


export default axios