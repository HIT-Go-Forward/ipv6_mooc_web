
export default function handleData(data){
    let handledData = {data:{data:data.data.data,status:parseInt(data.data.status/100),detail:data.data.status%100}}
    switch (data.data.status) {
        case 20000: console.log("操作全部成功");break;
        case 20001: console.log("操作部分成功");break;
        case 20002: console.log("查询的结果为不存在");break;
        case 20003: console.log("查询的结果为已存在");break;
        case 40000: console.log("请求缺少必须参数");break;
        case 40001: console.log("请求传递的参数值错误");break;
        case 40002: console.log("因请求数据错误导致的数据库无法写入");break;
        case 40003: console.log("验证不通过");break;
        case 40300: console.log("请求无权访问该action");break;
        case 40301: console.log("请求的操作被禁止执行");break;
        case 40302: console.log("待定");break;
        case 40400: console.log("请求的资源不存在");break;
        case 50000: console.log("服务器运行错误");break;
        case 50001: console.log("服务器本地文件写入错误");break;
        case 50002: console.log("因服务器mapper等配置文件引起的错误");break;
        default: console.log("status 未知");
    }
    return handledData;
}