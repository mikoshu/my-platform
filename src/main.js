// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login from './login'
//import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //router,
  data:{
    temp: 'Login'
  },
  //template: this.temp,
  methods:{
    logined(val){
        console.log(val)
        this.temp = 'App';
    }
  },
  components: { 
    App,
    Login
  },
  mounted(){
    const hash = location.hash.replace(/^#/, '');
    console.log(hash)
    if(hash != 'login'){
        console.log(document.cookie)
        if(sessionStorage.username){
            this.temp = 'App';
        }
    }else{
        this.temp = 'Login';
    }
    

    //setTimeout(()=>{this.temp = 'App'},3000)
  }
})
