# 基于element-ui带tab切换的后台框架

> 改页面不使用vue-router插件

## 使用方法

``` bash
# 安装依赖
npm install

# 开启服务 localhost:8080
npm run dev

# 打包编译
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 添加侧边栏方法

``` javascript
// 先在 App.vue 里引入组件
import page1 from './views/page1.vue'
import page2 from './views/page2.vue'
import page3 from './views/page3.vue'
import page4 from './views/page4.vue'
import page5 from './views/page5.vue'

// 在 data 里建立 groupMenu 数组

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
]

//在data里创建 routers 数组，该数组用于记录组件的信息，url 值为组件名称， active 值为组件对应的hash值，可以与url不同

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

]

//在App.vue里创建components属性引用组件

components:{
  page1,
  page2,
  page3,
  page4,
  page5
}

// 在原demo里可直接修改以上属性不用从新添加--

```
