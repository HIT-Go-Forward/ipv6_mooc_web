//axios 拦截器
import axios from 'axios'
import {Message} from 'element-ui'
// import {Loading,Message} from 'element-ui'
import handleData from './utils'


axios.defaults.withCredentials=true;
// axios.defaults.timeout=10000

var loadingInstance
axios.interceptors.request.use((config)=>{
    return config
},error=>{
    loadingInstance.close()
    Message.error({
        message:"请求超时"
    })
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    console.log(response)
    console.log(handleData(response))
    return handleData(response);
},error=>{
    // loadingInstance.close()
    Message.error({
        message:"加载失败"
    })
    console.log(error)
    return {data:{data:"网络错误",status:404}}
})


export default axios
