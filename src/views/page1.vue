<style lang="scss">
    .content{
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
    .loading{
        background-color:rgba(0,0,0,.6);
    }
    .center{
        text-align: center;
    }
</style>

<template>
    <div class="content">
        <div class="search-box">
            <label >
                姓名：
                <el-input class="input" v-model="input" placeholder="请输入姓名"></el-input>
            </label>
            <label >
                日期：
                <el-date-picker
                  class="input2"
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  @change="pickDate"
                >
                </el-date-picker>
            </label>
            <label>
                其他：
                <el-select class="input2" v-model="value" placeholder="请选择" @change="select">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </label>
            <label>
                <el-button class="input" type="primary" icon="search" :loading="isLoading" @click="loading">{{btn}}</el-button>
            </label>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        v-loading.body="isLoading"
        element-loading-text="仅在table区域加载..."
        >
            <el-table-column
              prop="date"
              label="日期"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              :formatter="formatter">
            </el-table-column>
            <el-table-column
              label="操作"
              label-class-name="center"
              class-name="center"
            >
                <template scope="scope">
                    <el-button type="primary" size="small" icon="edit" @click="edit(scope.$index,scope.row)" >编辑</el-button>
                    <el-button type="danger" size="small" >删除 <i class="el-icon-delete"></i></el-button>  
                </template> 
            </el-table-column>
          </el-table>

            <div class="block center">
              <el-pagination
                layout="prev, pager, next"
                :total="1000" @current-change="currentChange" >
              </el-pagination>
            </div>
    </div>
    
</template>

<script>
    export default{
        data() {
          return {
            input: '',
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }],
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            value: '',
            value1: '',
            isLoading: false,
            btn: '搜索'
          }
        },
        methods: {
          formatter(row, column) {
            return row.address;
          },
          currentChange: function(page){
            this.$message('当前选择第'+page+'页')
          },
          pickDate(value){
            this.$message('当前选择时间'+value)
          },
          select(value){
            this.$message('当前选择'+value)
          },
          loading(e){
            this.isLoading = true;
            this.btn = '加载中...';
            setTimeout(()=>{
                this.$message('加载完毕！');
                this.isLoading = false;
                this.btn = '搜索';
            },2000)
          },
          edit(index,row){
            this.$message('正在编辑第'+(parseInt(index)+1)+'行');
          }
        }
    }
</script>