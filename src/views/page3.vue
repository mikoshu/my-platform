<style>
    
</style>

<template>
    <h3>test3</h3>
</template>

<script>
import client from '../js/client';
    export default {
        data(){
            return{
                city: '福州',
                bus: '101'
            }
        },
        methods:{

        },
        mounted(){
            var self = this;
            client({
                url: '/api/v3/ads/group?id=0&status=0&page=1&rows=10&size=10',
                type: 'GET',
                data:{
                    name: 'test',
                    pwd: 'test',
                    fuck: 'test'
                },
                isLoading: true,
                withCredentials: true
            }).then(function(resp){

                console.log('te',resp)
            });
        }
    }
</script>