<style lang="scss">
    .content{
      .city-input{
        width:200px;
      }
      .edit-city{
        width:300px;
        p{
          margin: 15px auto;
        }
        h3{
          margin-top:25px;
        }
        .name{
          display:inline-block;
          width:85px;
          text-align: right;
        }
        .pop-footer{
          text-align: center;
        }
      }
    }
</style>

<template>
    <div class="content">
        <div class="search-box">
            <label>
                城市：
                <el-select class="input2" v-model="city_id" :placeholder="defaultCity" @change="select">
                    <el-option key="0" label="全部" value="0" ></el-option>
                    <el-option
                      v-for="item in province"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </label>
            <label>
                是否授权：
                <el-select class="input2" v-model="is_authorized" placeholder="全部" @change="select2">
                    <el-option key="0" label="全部" value="0" ></el-option>
                    <el-option key="1" label="已授权" value="1" ></el-option>
                    <el-option key="2" label="未授权" value="2" ></el-option>
                </el-select>
            </label>
            <label>
                <el-button class="input" type="primary" icon="search"  @click="search">搜索</el-button>
            </label>

        </div>

        <el-table
        :data="tableData"
        border
        style="width: 100%"
        >
            <el-table-column
              prop="province_name"
              label="省份"
              sortable
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="city_name"
              label="城市"
              sortable
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="community_num"
              label="小区数"
              align="center"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="device_num"
              label="楼宇对讲机数"
              align="center"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="resident_num"
              label="用户数"
              align="center"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="is_authorized"
              label="是否授权"
              :formatter="authorized"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
                <template scope="scope">
                    <el-button type="primary" size="small" icon="edit" @click="edit(scope.$index,scope.row)" >修改</el-button>
                </template> 
            </el-table-column>
          </el-table>

            <div class="block center">
              <el-pagination
                layout="prev, pager, next"
                :total="total" @current-change="currentChange" :page-size="size" >
              </el-pagination>
            </div>

            <el-dialog
            title="授权城市修改"
            :visible.sync="showPop"
            size="tiny"
            custom-class="edit-city"
            top="30%"
            >
              <p>省份：<el-input class="city-input" v-model="popProvince" disabled="disabled"></el-input></p>
              <p>城市：<el-input class="city-input" v-model="popCity" disabled="disabled"></el-input></p>
              <h3>广告位配置</h3>
              <p>
                <span class="name">楼宇对讲机：</span>
                <el-checkbox v-model="position1">主屏幕</el-checkbox>
              </p>
              <p>
                <span class="name">App：</span>
                <el-checkbox v-model="position2">闪屏</el-checkbox>
                <el-checkbox v-model="position3">Banner</el-checkbox>
              </p>

              <p class="pop-footer" slot="footer">
                <el-button type="primary" @click="changeCityPosition">确定</el-button>
                <el-button type="default" @click="showPop = false">取消</el-button>
              </p>

            </el-dialog>

    </div>
</template>

<script>
import Client from '../js/client';
//import axios from 'axios';
    export default {
        data(){
            return{
                city_id: "",
                province_id: '',
                defaultCity: '',
                is_authorized: "",
                province: [],
                tableData: [],
                page: 1,
                total: 0,
                size: 10,
                showPop: false,
                popCity: '',
                popCityId: '',
                popProvince: '',
                popProvinceId: '',
                position1: '',
                position2: '',
                position3: ''
            }
        },
        methods:{
            select: function(value){
                this.$message(value+'')
            },
            select2(val){
                this.$message(val+'')
            },
            search(){
                var self = this;
                new Client().client({
                    url: '/api/v2/ads/positions/city/query',   
                    type: 'GET',
                    params:{
                        province_id: self.province_id,
                        city_id: self.city_id,
                        is_authorized: self.is_authorized,
                        page: self.page,
                        rows: self.size,
                        size: self.size
                    },
                    showLoading: true,
                    withCredentials: true
                }).then(function(resp){
                    self.tableData = resp.data.data.rows;
                    self.total = resp.data.data.total;
                });
            },
            currentChange(page){
                this.page = page;
                this.search();
            },
            edit(index,row){
              this.showPop = true;
              const id = row.city_id;
              var self = this;
              this.position1 = false;
              this.position2 = false;
              this.position3 = false;
              new Client().client({
                url: '/api/v2/ads/positions/city/'+id,
                showLoading: true
              }).then(function(resp){
                if(resp.data.code == 1){
                  const data = resp.data.data;
                  self.popProvince = data.province_name;
                  self.popProvinceId = data.province_id;
                  self.popCity = data.city_name;
                  self.popCityId = data.city_id;
                  data.position_types.map((val,i)=>{
                    self['position'+val] = true;
                  });
                }else{
                  self.$message(resp.data.msg);
                }
              });
            },
            authorized(row){
                return ['','已授权','未授权'][row.is_authorized];
            },
            changeCityPosition: function(){
              var self = this;
              var data = {
                "city_id": self.popCityId,
                "city_name": self.popCity,
                "province_id": self.popProvinceId,
                "province_name": self.popProvince
              }
              for(let i=0; i<4;i++){
                if(self["position"+i]){
                  data["array_datas["+(i-1)+"].id"] = i;
                } 
              }

              new Client().client({
                url: '/api/v2/ads/positions/city/update',
                method: 'post',
                data: data,
                showLoading: true
              }).then((resp) => {
                const data = resp.data;
                if(data.code == 1){
                  self.$message(data.msg);
                  self.showPop = false;
                }else{
                  self.$message(data.msg);
                }
              })
            }
        },
        mounted(){
            var self = this;
            this.search();
            //this.changeCityPosition()
            new Client().client({
                url: '/api/v2/ads/positions/provinces/0/citys',
                type: 'GET',
                params:{
                    status: 1
                }
            }).then(function(resp){
                self.province = resp.data.data
                self.province.map((val,i)=>{
                  if(val.name == self.defaultCity){
                    self.city_id = val.id;
                    self.province_id = val.province_id;
                    self.search()
                  }
                })

            })
        }
    }
</script>