import axios from 'axios';
import QS from 'qs';
import { Loading,Message } from 'element-ui';
export default client;
var loading;

axios.interceptors.request.use(function (config) {
    if(config.showLoading){
        loading = Loading.service({ fullscreen: true });
    }
    if(config.data && !config.noData ){
        config.data = QS.stringify(config.data);
    }
    return config;
    }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

    // Add a response interceptor
axios.interceptors.response.use(function (response) {
    if(typeof(loading) == 'object'){
        loading.close();
    }
    // Do something with response data
    return response;
    }, function (error) {
    // Do something with response error
    if(typeof loading == 'object'){
        loading.close();
    }
    Message({
        message: error.response.status + ' ' + error.response.statusText
    })
    return Promise.reject(error);
});


function client(obj){
    return axios(obj)
    .then(function(resp){
        console.log(resp)
        // if(resp.data.code == '11012'){
        //     Message({
        //         message: '登录超时，请重新登录！'
        //     });
        //     setTimeout(()=>{
        //         window.location.href = 'login.html';
        //     },1000)
        // }else{
        //     return Promise.resolve(resp.data)
        // }
        return Promise.resolve(resp)
    })
}


