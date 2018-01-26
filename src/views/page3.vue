<style lang="scss">
    .news{
      padding:20px;
      ul{
        padding:20px 100px;
      }
      .news-top{
        line-height:36px;
        padding:0 100px;
        h2{
          float:left;
        }
      }
      .refresh{
        float:right;
      }
      li{
        margin-top:20px;
        line-height:36px;
        a{
          color:#000;

        }
        .btn{
          float:right;
        }
      }
      .right{
        float:right;
        margin-right:100px;
        margin-bottom:30px;
        margin-top:30px;
      }
      .pop{
        width:800px;
        height:700px;

        h3{
          text-align:center;
          font-weight:bold;
          font-size:16px;
        }
        .news-content{
          height:480px;
          overflow: auto;
          padding:0 10px;
        }
        .desc{
          color:#ccc;
          text-align:center;
          margin: 10px 0;
          span{
            display:inline-block;
            margin:0 10px;
          }
        }
        p{
          margin-bottom:15px;
          line-height:30px;
          img{
            display:block;
            margin: 0 auto auto auto;
          }
        }

      }
    }
</style>

<template>
    <div class="news">
      <div class="news-top clearfix">
        <h2>调用新闻接口</h2>
        <el-button type="primary" class="refresh" @click="search">刷新列表...</el-button>
      </div>

      <ul>
        <li v-for="(val,index) in list" class="clearfix" >
          <a href="javascript:;" @click="check(index)">{{'【'+val.src+'】 '+val.title}}</a>
          <el-button size="small" type="primary" class="btn" @click="check(index)" >查看详情</el-button>
        </li>
      </ul>
      <el-button icon="plus" type="primary" @click="add" class="right" >加载更多...</el-button>
      <el-dialog
        title="新闻详情"
        :visible.sync="showPop"
        custom-class="pop"
        >
        <h3>{{title}}</h3>
        <div class="desc">
          <span>{{src}}</span>
          <span>{{time}}</span>
        </div>
        <div v-html="content" class="news-content"></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="showPop = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import Client from '../js/client';

    export default {
        data(){
            return{
                token: '4f3164bda0542ff76c6e7dcf614eab4f',
                page: 1,
                size: 10,
                list:[],
                showPop: false,
                title: '',
                content: '',
                src: '',
                time:''
            }
        },
        methods:{
          search(){
            var self = this;
            Client({
              url: '/api/news',
              params:{
                channel:'头条',
                num: self.size,
                start: self.page,
                appkey: self.token
              },
              showLoading: true
            }).then((resp)=>{
              var data = resp.data;
              if(data.code == '10000'){
                self.list = data.result.result.list;
              }
            })
          },
          add(){
            this.size += 10;
            this.search();
          },
          check(index){
            console.log(index)
            this.title = this.list[index].title;
            this.content = this.list[index].content;
            this.src = this.list[index].src;
            this.time = this.list[index].time;
            this.showPop = true;
          }
        },
        mounted(){
          this.search();
        }
    }
</script>
