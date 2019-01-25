//axios 拦截器
import axios from 'axios'
import {Loading,Message} from 'element-ui'

axios.defaults.withCredentials=true;
axios.defaults.timeout=5000

var loadingInstance
axios.interceptors.request.use((config)=>{
    loadingInstance = Loading.service({fullscreen:true})
    return config
},error=>{
    loadingInstance.close()
    Message.error({
        message:"请求超时"
    })
    return Promise.reject(error)
})

axios.interceptors.response.use(data=>{
    loadingInstance.close()
    return data
},error=>{
    loadingInstance.close()
    Message.error({
        message:"加载失败"
    })
    return Promise.reject(error)
})

export default axios
