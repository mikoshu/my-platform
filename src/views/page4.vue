<style lang="scss">
.mychart{
  width:1000px;
  height: 600px;
  margin: 10px auto auto auto;
}
</style>

<template>
  <div class="mychart" ref="chart">

  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data(){
    return {
      chartData: {
        title: {
          text: '柱形图',
          x: 'center',
          y: 10,
          textStyle: {
            color: 'red',
            fontSize: 30
          },
          show: true
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }

  },
  // computed:{
  //   chartData(){
  //     const obj = {
  //       title: {
  //         text: '柱形图',
  //       },
  //       tooltip: {},
  //       xAxis: {
  //           data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  //       },
  //       yAxis: {},
  //       series: [{
  //           name: '销量',
  //           type: 'bar',
  //           data: [5, 20, 36, 10, 10, 20]
  //       }]
  //     }
  //     return obj
  //   }
  // },
  methods:{
    setEcharts(){
      const chart = echarts.init(this.$refs['chart']);
      chart.setOption(this.chartData);
    }
  },
  watch:{
    'chartData':{
      handler (opt) {
        console.log(opt)
        this.setEcharts()
      },
      deep: true
    }
  },
  mounted(){
    this.setEcharts();
    setTimeout(()=>{
      const arr = [6,12,15,24,33,11]
      console.log(this.chartData.series[0].data)
      this.$set(this.$data.chartData.series[0],'data',arr)
      console.log(this.chartData.series[0].data)
      console.log('change')
    },3000)
  }
}
</script>
