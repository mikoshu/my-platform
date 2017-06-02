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
    background:#73c3b1;
}
.menu-content{
  height: calc(100vh - 100px);
  .el-col{
    height:100%;
  }
  .side-bar{
    background:#555a59;
    .el-menu{
      background:#555a59;
      text-align:left;
      .is-active{
        color: #20a0ff;
      }
      li{
        color:#fff;
      }
    }
  }

  .tab-row{
    position:relative;
    height:21px;
    background:#efeff4;
    border-bottom:1px solid #ccc;
    &:after,&:before{
      content:"";
      position:absolute;
      top:4px;
      width:14px;
      height:13px;
      cursor: pointer;
      &:hover{
        opacity:.8;
      }
    }
    &:after{
      right:1px;
      background:url(./images/tab-140-120.gif) no-repeat -99px -60px;
    }
    &:before{
      left:1px;
      background:url(./images/tab-140-120.gif) no-repeat -80px -60px;
    }
    ul{
      width:100%;
      padding:0 20px 0 30px;
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

}


</style>

<template>
  <div class="menu-main">
    <el-row class="top-banner">
    
    </el-row>
    <el-row class="menu-content">
      <el-col :span="3" class="side-bar" >
        <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo"  >
          <el-menu-item-group title="分组一">
            <el-menu-item index="1" data-href="test1.html" data-title="测试1" @click='toTab'><i class="el-icon-message"></i>导航一</el-menu-item>
            <el-menu-item index="2" data-href="test2.html" data-title="测试2" @click='toTab'><i class="el-icon-message"></i>导航二</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组二">
            <el-menu-item index="3" data-href="test3.html" data-title="测试3" @click='toTab'><i class="el-icon-message"></i>导航三</el-menu-item>
            <el-menu-item index="4" data-href="test4.html" data-title="测试4" @click='toTab'><i class="el-icon-message"></i>导航四</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col> 
      <el-col :span="21">
        <div class="tab-row">
          <ul class="clearfix">
            <li v-if="tabHeads.length != 0" v-for="(val,i) in tabHeads" :class="[tabIndex == i ? 'is-active' : '' ]" :data-index="i" :key="i" @click="clickTab" >
              {{val.name}}
              <i></i>
            </li>
            <li v-if="tabHeads.length == 0" class="is-active">
              {{defaultTab.name}}
              <i></i>
            </li>
            
          </ul>
        </div>
      </el-col>  
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      defaultTab: {
        name: '测试1',
        url: 'test1.html'
      },
      tabIndex: 0,
      tabHeads: [],
      isHas: false,
      hash: ''
    }
  },
  methods:{
    toTab: function(e){
      const obj = {
        name: e.$el.getAttribute('data-title'),
        url: e.$el.getAttribute('data-href')
      }
      window.location.href = '#'+ obj.url;
      this.tabHeads.map((val,i) => {
        if(val.url == obj.url){
          console.log('已存在该目录');
          this.isHas = true;
        }
      });

      if(!this.isHas){
        console.log(this.isHas)
        this.tabHeads.push(obj);
        this.isHas = false;
        console.log(this.tabHeads)
      }
      
    },
    clickTab: function(e){
      const index = e.target.getAttribute('data-index');
      window.location.href = '#'+ this.tabHeads[index].url;
    }
  },
  mounted: function(){
    const hash = location.hash.replace(/^#/, '');

    window.addEventListener('hashchange', function(e, triggered) { // 绑定hash值
      const hash = location.hash.replace(/^#/, ''); 
    }.bind(this));

    this.hash = hash;
    this.tabHeads.map((val,i) => {
      if(hash == val.url){
        this.tabIndex = i;
      }
    });
    if(hash == ''){
      this.tabHeads.push(this.defaultTab);
    }else{
      console.log(hash)
      this.tabHeads.map((val,i) => {
        if(hash == val.url){
          this.tabIndex = i;
          this.defaultTab = val;
        }
      });
    }
    
  }
}
</script>


