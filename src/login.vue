<style lang='scss'>
@import 'css/common.scss';
    .login{
        width:100%;
        height:100vh;
        background:#ccc;
        .login-box{
            position: absolute;
            left:50%;
            top:50%;
            @include transform(translate(-50%,-50%));
            width:400px;
            background:rgba(0,0,0,.6);
            border-radius:10px;
            .icon{
                width:60px;
            }
            .w100{
                width:100%;
            }
            .con{
                padding:30px;
            }
            .mt-10{
                margin-top:10px;
            }
        }
    }
</style>

<template>
    <div class="login">
        <div class="login-box">
            <div class="con">
                <el-input type="text" class="mt-10" v-model="name"  >
                    <el-button slot="prepend" class="icon" icon="edit"></el-button>
                </el-input>
                <el-input type="password" class="mt-10" v-model="pwd" >
                    <el-button slot="prepend" class="icon" icon="check" ></el-button>
                </el-input>
                <el-button type="primary" class="w100 mt-10" @click="login" >登录</el-button>
            </div>
            
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default{
        data(){
            return{
                name: '',
                pwd: ''
            }
        },
        methods:{
            login(){
                var self = this;
                console.log(this.name,this.pwd)
                axios({
                    url: '/api/v2/ads/login',
                    method: 'post',
                    data:{
                        username: self.name,
                        password: self.pwd,
                        system_id: 2,
                        remember_me: 1
                    },
                    transformRequest: [function (data) {
                        // Do whatever you want to transform the data
                        let ret = ''
                        for (let it in data) {
                          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(resp){
                    const data = resp.data;
                    if(data.code == 1){
                        sessionStorage.username = data.data.user_name;
                        setTimeout(()=>{
                            self.$emit('logined');
                        },2000)
                    }
                    self.$message(data.msg);
                })
            }
        },
        mounted(){

        }
    }
</script>