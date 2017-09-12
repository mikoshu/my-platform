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
                window.location.href="index.html";
            }
        },
        mounted(){

        }
    }
</script>
