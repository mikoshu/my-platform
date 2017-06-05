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
    overflow: hidden;
    padding:0 25px;
    .tab-last,.tab-next{
      position:absolute;
      top:4px;
      width:14px;
      height:13px;
      cursor: pointer;
      z-index:9;
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
    overflow-y: scroll; 
    .tab-con{
      height:100%;
      iframe{
        width:100%;
        height:100%;
      }
    }
  }
  .dn{
    display:none;
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
          <el-menu-item-group v-for="(group,i) in groupMenu" :title="group.title" key='group.title'>
            <el-menu-item v-for="(val,index) in group.content" :index="val.url" :data-title="val.name" :data-href="val.url" :data-index="(i*groupMenu[i>0?i-1:i].content.length)+index" :key="index" @click='toTab' >
              <i :class="val.icon"></i>{{val.name}}
            </el-menu-item>
          </el-menu-item-group>

          <!-- <el-menu-item-group title="分组一">
            <el-menu-item index="1" data-href="test1.html" data-title="测试1" data-index="0" @click='toTab'><i class="el-icon-message"></i>测试一</el-menu-item>
            <el-menu-item index="2" data-href="test2.html" data-title="测试2" data-index="1" @click='toTab'><i class="el-icon-message"></i>测试二</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组二">
            <el-menu-item index="3" data-href="test3.html" data-title="测试3" data-index="2" @click='toTab'><i class="el-icon-message"></i>测试三</el-menu-item>
            <el-menu-item index="4" data-href="test4.html" data-title="测试4" data-index="3" @click='toTab'><i class="el-icon-message"></i>测试四</el-menu-item>
          </el-menu-item-group> -->
        </el-menu>
      </el-col> 
      <el-col :span="21">
        <div class="tab-row">
          <span class="tab-last" @click="tabToNext"></span>
          <div class="tab-head-con" ref="tabRow">
            <ul class="clearfix" ref="tabHead" :style="{left: tabLeft+'px',width: ulWidth+'px'}">
              <li v-if="tabHeads.length != 0" v-for="(val,i) in tabHeads" :class="[val.index == tabIndex? 'is-active' : '' ]" :data-index="val.index" :data-url="val.url" :key="i" @click="clickTab" >
                {{val.name}}
                <i @click="closeTab" :data-url="val.url" ></i>
              </li>
              <li v-if="tabHeads.length == 0" class="is-active">
                {{defaultTab.name}}
                <i @click="closeTab" :data-url="defaultTab.url" ></i>
              </li>
              
            </ul>
          </div>
          <span class="tab-next" @click="tabToLast"></span>
        </div>
        <div class="tab-content">
          <div class="tab-con" v-if="tabHeads.length != 0" v-for="(val,i) in tabHeads" :class="val.index == tabIndex ? '' : 'dn' ">
            <iframe :src="'./'+val.url" frameborder="0"></iframe>
          </div>
          <div class="tab-con" v-if="tabHeads.length == 0" >
            <iframe :src="defaultTab.url" frameborder="0"></iframe>
          </div>
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
      group: true,
      groupMenu:[
        {
          title: '分组1',
          content: [
            {
              name: '测试1',
              url: 'pages/test1.html',
              icon: 'el-icon-message'
            },
            {
              name: '测试2',
              url: 'test2.html',
              icon: 'el-icon-message'
            }
          ]
        },
        {
          title: '分组2',
          content: [
            {
              name: '测试3',
              url: 'test3.html',
              icon: 'el-icon-message'
            },
            {
              name: '测试4',
              url: 'test4.html',
              icon: 'el-icon-message'
            },
            {
              name: '测试5',
              url: 'test5.html',
              icon: 'el-icon-message'
            },
            {
              name: '测试6',
              url: 'test6.html',
              icon: 'el-icon-message'
            }
          ]
        }
      ],
      defaultTab: {
        name: '测试1',
        url: 'test1.html'
      },
      tabIndex: 0,
      tabHeads: [],
      isHas: false,
      hash: '',
      tabsWidth: 137,
      ulWidth: 137,
      tabRowWidth: 0,
      tabLeft: 0
    }
  },
  methods:{
    toTab: function(e){
      const obj = {
        name: e.$el.getAttribute('data-title'),
        url: e.$el.getAttribute('data-href'),
        index: e.$el.getAttribute('data-index')
      }
      this.tabIndex = obj.index;
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
        this.ulWidth = this.tabHeads.length * this.tabsWidth;
      }
      this.isHas = false;
      
    },
    clickTab: function(e){
      const index = e.target.getAttribute('data-index');
      const url = e.target.getAttribute('data-url');
      this.tabIndex = index;
      window.location.href = '#'+ url;
    },
    closeTab: function(e){
      const url = e.target.getAttribute('data-url');
      this.tabHeads.map((val,i) => {
        if(val.url == url){
          this.tabHeads.splice(i,1);
        }
      });
      setTimeout(()=>{
        this.tabIndex = this.tabHeads.length-1
        console.log(this.tabIndex)
      },500);
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
    }
  },
  mounted: function(){
    const hash = location.hash.replace(/^#/, '');

    window.addEventListener('hashchange', function(e, triggered) { // 绑定hash值
      const hash = location.hash.replace(/^#/, ''); 
    }.bind(this));

    this.hash = hash;
    const row = this.$refs.tabRow;
    this.tabRowWidth = row.clientWidth;
    this.tabHeads.map((val,i) => {
      if(hash == val.url){
        this.tabIndex = i;
      }
    });
    // if(hash != ''){
    //   console.log(hash)
    //   this.tabHeads.map((val,i) => {
    //     if(hash == val.url){
    //       this.tabIndex = i;
    //       this.defaultTab = val;
    //     }
    //   });
    // }
    
  }
}
</script>


