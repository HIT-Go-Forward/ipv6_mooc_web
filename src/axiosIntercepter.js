//axios 拦截器
import axios from 'axios'
import {Loading,Message} from 'element-ui'
import handleData from './utils'


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

axios.interceptors.response.use((response) => {
    loadingInstance.close()
    console.log(response)
    console.log(handleData(response))
    return handleData(response);
},error=>{
    loadingInstance.close()
    Message.error({
        message:"加载失败"
    })
    return Promise.reject(error)
})


export default axios
