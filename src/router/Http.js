import axios from 'axios';
import Cookies from 'js-cookie';  
import Base from '@/Base64'; 
import router from "@/router";
//1.新建axios实例 封装axios
const instance = axios.create({
    baseURL: 'http://192.168.1.84:8081/admin', //url
    timeout: 5000,//请求超时
});

// 2.拦截器的配置
// 2.1 请求拦截

// 添加请求拦截器  记得return
instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    // 给每个请求添加token
    config.headers['AdminToken'] = Cookies.get('token');
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


// 2.2 响应拦截 记得return
// 添加响应拦截器---无限刷新令牌，无痛刷新，令牌刷新
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 1.获取到登录的账户和密码
  // 2.重新登录
  // 3.把重新登录之后的token重新赋值给请求头（使用aysnc---await）
  let errno = response.data.errno  //拿到响应数据
  if( errno == 10001 || errno == 10006){ 
    let form = eval("("+ Base.decode(Cookies.get("from")) +")")//获取存储导cookies中的内容
    if(form.rempassword === true){  //如果是记住密码重新刷新令牌
      return login(response) //调用函数刷新令牌
    }else{   //否则跳回到登录页面
      router.replace('/')
    }
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

async function login(response){
  let form = eval("("+ Base.decode(Cookies.get("from")) +")")
  let res = await instance({
    method:'get',
    params:{
      _gp : 'admin',
      _mt : 'admin',
      username : form.user,
      password : form.checkPass,
      verifyCode : '666666'
    }
  })
  if(res.data.errmsg == '成功'){
    let expires = new Date(new Date() * 1 + 1200* 1000);//设置时间 20min
    Cookies.set("token", res.data.data, { expires: expires });//重新存储token
    response.config.headers['AdminToken'] = res.data.data; //重新给请求头添加token
    return await axios(response.config) //重新请求axios
  }
}