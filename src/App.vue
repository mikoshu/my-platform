<style lang='scss'>
@import 'css/common.scss';
.menu-main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.top-banner{
    height:100px;
    background:#1d2533;
    .logo{
      position: absolute;
      left:37px;
      top:24px;
      height: 45px;
      padding-left:50px;
      line-height: 45px;
      color:#fff;
      //background: url(./images/logo.png) left center no-repeat;
      font-size:24px;
      font-family: "微软雅黑";
    }
    .user{
      position: absolute;
      top:0;
      right:20px;
      line-height:100px;
      height:100px;
      dl{
        dd{
          float:left;
          width:50px;
          height:100px;
          //background: url(./images/icon-user.png) center no-repeat;
        }
        dt{
          float:left;
          color:#8492a6;
          font-size:16px;
          font-family: "微软雅黑";
        }
      }
    }
}
.menu-content{
  height: calc(100vh - 100px);
  .el-col{
    height:100%;
  }
  .side-bar{
    height:100%;
    background:#fff;
    overflow-y: auto;
    .el-menu{
      background:#fff;
      text-align:left;

      .is-active{
        color: #20a0ff;
      }
      li{
        color:#535455;
        font-size:14px;

      }
      .el-submenu .el-menu-item{
        line-height: 40px;
        height:40px;
      }
      .el-submenu__title{
        background: #f5f6f8;
        height:40px;
        line-height: 40px;
        span{
          display: inline-block;
          width:35px;
          height:40px;
          vertical-align: middle;
        }

      }
    }
  }

  .tab-row{
    position:relative;
    height:21px;
    background:#efeff4;
    border-bottom:1px solid #ccc;
    overflow: hidden;
    padding:0 25px;
    .tab-last,.tab-next{
      position:absolute;
      top:4px;
      width:14px;
      height:13px;
      cursor: pointer;
      z-index:12;
      &:hover{
        opacity:.8;
      }
    }
    .tab-next{
      right:1px;
      background:url(./images/tab-140-120.gif) no-repeat -99px -60px;
    }
    .tab-last{
      left:1px;
      background:url(./images/tab-140-120.gif) no-repeat -80px -60px;
    }
    ul{
      position:relative;
      width:100%;
      text-align: left;
      @include transition(left .5s);
      .is-active{
        background:url(./images/tab-140-120.gif) no-repeat -1px -30px;
        z-index:9;

      }
      li{
        position:relative;
        float:left;
        width:137px;
        height:20px;
        margin-top: 1px;
        margin-left:-12px;
        text-align: left;
        font-size:12px;
        line-height: 20px;
        padding:0 16px;
        background:url(./images/tab-140-120.gif) no-repeat -1px -5px;
        cursor: pointer;
        i{
          position:absolute;
          right:15px;
          top:4px;
          width:13px;
          height:13px;
          background:url(./images/tab-140-120.gif) no-repeat -20px -80px;
          &:hover{
            background:url(./images/tab-140-120.gif) no-repeat 0px -80px;
          }
        }
      }
    }
  }

  .tab-content{
    width:100%;
    height:calc(100vh - 121px);
    text-align: left;
    padding-left:15px;
    background:#efeff4;
    .tab-con{
      height:100%;
      overflow-y: scroll;
      background: #fff;
    }
    .el-dialog__footer,.el-message-box__btns{
      text-align: center;
    }


  }
  .dn{
    display:none;
  }



}

.el-loading-mask .el-loading-spinner .circular{
  animation: loading-rotate 2s linear infinite;
  -webkit-animation: loading-rotate 2s linear infinite;
  -moz-animation: loading-rotate 2s linear infinite;
}

@keyframes loading-rotate {
  100%{transform:rotate(360deg); -webkit-transform:rotate(360deg) }
}

.bread-menu {
        padding: 20px 20px 0 20px;
        font-size:13px;
        a{
          display: inline-block;
          margin-right:5px;
          color:#000;
          &:hover{
            transition:color .15s;
            color:#5da1f7;
          }
        }
        span{
          color:#97a8be;
        }
    }

.block{
      margin-top:30px;
  }

  .search-box{
      text-align: left;
      padding:20px;
      label{
          margin:0 10px;
      }
      .input{
          width:100px;
      }
      .input2{
          width:150px;
      }
  }
  .center{
      text-align: center;
      th{
        text-align:center;
      }
  }
</style>

<template>
  <div class="menu-main">
    <div class="top-banner">
      <a href="javascript:;" class="logo">后台管理系统</a>
      <div class="user">
        <dl class="clearfix">
          <dd></dd>
          <dt>您好，<span>{{username}}</span></dt>
        </dl>
      </div>
    </div>
    <el-row class="menu-content">
      <el-col :span="3" class="side-bar" >

        <el-menu mode="vertical"  :default-active="defaultActive" class="el-menu-vertical-demo" >
          <el-submenu v-for="(group,i) in groupMenu" :index="i.toString()" :key="i">
            <template slot="title"><span :class="group.class"></span>{{group.title}}</template>
            <el-menu-item v-for="(val,index) in group.content" :index="val.url" :data-title="val.name" :data-href="val.url" :data-index="getIndex(i,index)" :key="getIndex(i,index)" @click='toTab'  >
              {{val.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>

      <el-col :span="21">
        <div class="tab-row">
          <span class="tab-last" @click="tabToNext"></span>
          <div class="tab-head-con" ref="tabRow">
            <ul class="clearfix" ref="tabHead" :style="{left: tabLeft+'px',width: ulWidth+'px'}">
              <li v-if="tabHeads.length != 0" v-for="(val,i) in tabHeads" :class="[val.url == hash? 'is-active' : '' ]"  :data-url="val.url" :key="i" @click="clickTab" >
                {{val.name}}
                <i @click.stop="closeTab" :data-url="val.url" ></i>
              </li>
            </ul>
          </div>
          <span class="tab-next" @click="tabToLast"></span>
        </div>
        <div class="tab-content">
          <div class="tab-con" v-for="(val,i) in tabHeads" :class="val.url == hash ? '' : 'dn' " :key="val.url">
            <component :is='val.url.split("?")[0]' :url="val.url" @change="changeCon" @reload="reload" > </component>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import page1 from './views/page1.vue';
import page2 from './views/page2.vue';
import page3 from './views/page3.vue';
import page4 from './views/page4.vue'
import page5 from './views/page5.vue'

export default {
  name: 'app',
  data(){
    return {
      username: 'admin',
      group: true,
      groupMenu:[
        {
          title: '基础内容',
          class: 'menu-icon-1',
          content: [
            {
              name: '表格',
              url: 'page1',
              icon: 'el-icon-menu'
            },
            {
              name: '表单',
              url: 'page2',
              icon: 'el-icon-message'
            }
          ]
        },
        {
          title: '接口用法',
          class: 'menu-icon-2',
          content: [
            {
              name: '新闻列表',
              url: 'page3',
              icon: 'el-icon-upload'
            }
          ]
        },
        {
          title: '图表',
          class: "menu-icon-3",
          content: [
            {
              name: '柱形图',
              url: 'page4',
              icon: ''
            },
            {
              name: '地图图表',
              url: 'page5',
              icon: ''
            }
          ]
        }
      ],
      tabHeads: [

      ],
      routers:[ // 注册组件信息
        {
          name: '表格',
          url: 'page1',
          active: 'page1'
        },
        {
          name: '表单',
          url: 'page2',
          active: 'page2'
        },
        {
          name: '新闻列表',
          url: 'page3',
          active: 'page3'
        },
        {
          name: '柱形图',
          url: 'page4',
          active: 'page4'
        },
        {
          name: '地图图表',
          url: 'page5',
          active: 'page5'
        }

      ],
      isHas: false,
      hash: '',
      tabsWidth: 137,
      ulWidth: 137,
      tabRowWidth: 0,
      tabLeft: 0,
      defaultActive: '',
      //defaultOpened: [0,1,2,3,4,5],
      hash:'',
      defalutOpened: 'page1', // 默认打开页面url
    }
  },
  methods:{
    toTab: function(e){
      const obj = {
        name: e.$el.getAttribute('data-title'),
        url: e.$el.getAttribute('data-href'),
      }
      var index = 0;
      window.location.href = '#'+ obj.url;
      this.tabHeads.map((val,i) => {
        if(val.url == obj.url){
          //console.log('已存在该目录');
          this.isHas = true;
          index = i;
        }
      });

      if(!this.isHas){
        this.tabHeads.push(obj);
        this.ulWidth = (this.tabHeads.length) * this.tabsWidth;
        if(this.ulWidth > this.tabRowWidth){
          this.tabLeft = this.tabRowWidth - this.ulWidth;
        }
      }else{
        if((this.tabsWidth * index) < Math.abs(this.tabLeft)){
          this.tabLeft = -(this.tabsWidth * index - 20);
        }else if((this.tabsWidth * index) > this.tabRowWidth){
          this.tabLeft = this.tabRowWidth - (this.tabsWidth * index);
        }
      }
      this.isHas = false;

    },
    changeCon(obj){ // 修改打开的tab
      window.location.href = '#'+ obj.url;
      this.tabHeads.map((val,i) => {
        if(val.url == obj.url){
          this.isHas = true;
        }
      });

      if(!this.isHas){
        this.ulWidth = this.tabHeads.length * this.tabsWidth;
      }
      this.isHas = false;
    },
    reload(obj){ // 重新载入组件
      let index;
      this.tabHeads.map((val,i) => {
        if(val.url == obj.url){
          this.isHas = true;
          index = i;
        }
      });
      if(this.isHas){
        this.tabHeads.splice(index,1);
      }
      this.$nextTick(function(){
        window.location.href = '#'+ obj.url;
      })
    },
    clickTab: function(e){
      const url = e.target.getAttribute('data-url');
      window.location.href = '#'+ url;
    },
    closeTab: function(e){
      const url = e.target.getAttribute('data-url');
      this.tabHeads.map((val,i) => {
        if(val.url == url){
          this.tabHeads.splice(i,1);
        }
      });

      //setTimeout(()=>{
      //this.nextTick(()=>{

      //})
      this.$nextTick().then(()=>{
        window.location.href = '#'+this.tabHeads[this.tabHeads.length-1].url;
      })

      //},500);
    },
    tabToLast: function(e){
      const dom = this.$refs.tabHead;
      const row = this.$refs.tabRow;
      this.tabRowWidth = row.clientWidth;
      const nowWidth = this.tabsWidth * this.tabHeads.length;
      if(this.tabLeft > this.tabRowWidth - nowWidth ){
        this.tabLeft -= this.tabsWidth
      }
    },
    tabToNext: function(e){
      const dom = this.$refs.tabHead;
      const row = this.$refs.tabRow;
      this.tabRowWidth = row.clientWidth;
      if(this.tabLeft < 0 ){
        this.tabLeft += this.tabsWidth
      }
    },
    getIndex(i,index){
      //(i*groupMenu[i>0?i-1:i].content.length)+index
      let x = 0;
      if(i == 0){
        x = index;
      }else{
        for(let n=0;n < i;n++){
          x += parseInt(this.groupMenu[n].content.length)
        }
        x += index;
      }
      return x
    }
  },
  components:{
    page1,
    page2,
    page3,
    page4,
    page5
  },
  mounted: function(){
    var self = this;
    // if(localStorage.username != undefined){
    //   this.username = localStorage.username;
    // }else{
    //   this.$message('请先登录！');
    //   window.location.href = login.html;
    // }

    var hash = location.hash.replace(/^#/, '');
    if(hash == ''){
        window.location.href = '#'+ this.defalutOpened
    }

    const row = this.$refs.tabRow; // 获取tabrow 宽度
    this.tabRowWidth = row.clientWidth;

    window.addEventListener('hashchange', function(e, triggered) { // 绑定hash值
      var hash = location.hash.replace(/^#/, '');
      self.hash = hash;
      if(hash == ''){
        window.location.href = '#'+ this.defalutOpened
      }else{
        var isExist = false;
        this.defaultActive = hash
        for(var key=0;key<this.routers.length;key++){
          if(this.routers[key].url == hash.split('?')[0]){
            this.tabHeads.map((val,i)=>{
              if(val.url == hash){
                isExist = true
              }
            })
            if(!isExist){
              this.tabHeads.push({
                url: hash,
                name: this.routers[key].name
              })
              this.ulWidth = this.tabHeads.length * this.tabsWidth;
              this.defaultActive = this.routers[key].active;
              isExist = false;

            }
            return
          }
        }


      }
    }.bind(this));

    this.hash = hash;
    //hash = hash.split('?')[0];

    if(hash != ''){
      for(var key=0;key<this.routers.length;key++){
        if(this.routers[key].url == hash.split('?')[0]){
            this.tabHeads.push({
              url: hash,
              name: this.routers[key].name
            })
            this.ulWidth = this.tabHeads.length * this.tabsWidth;
            this.defaultActive = this.routers[key].active;
          return
        }
      }
      this.ulWidth = this.tabHeads.length * this.tabsWidth;
    }else{
      this.defaultActive = this.defalutOpened;
    }

  }
}
</script>


