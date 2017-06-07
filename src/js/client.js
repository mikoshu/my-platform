import axios from 'axios';
import QS from 'qs';
import { Loading } from 'element-ui';
export default client;

var loading;
axios.interceptors.request.use(function (config) {
    if(config.isLoading){
        loading = Loading.service({ fullscreen: true });
    }
    if(config.data){
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
    if(typeof loading == 'function'){
        loading.close();
    }
    return Promise.reject(error);
});   

function client(obj){
    return axios(obj)
    .then(function(resp){
        if(resp.status == '302'){
            //location.href = '#login'
        }else{
            return Promise.resolve(resp)
        }
    })
}

