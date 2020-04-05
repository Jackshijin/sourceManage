<template>
  <div id="bar-chart" style="width:90%;height:400px;"></div>
</template>

<script>
import echarts from 'echarts'
const animationDuration = 6000
export default {

  data () {
    return {
      options: {
        title: {
          text: '故障情况统计',
          left: 'center',
          bottom: '10'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 20,
          left: '2%',
          right: '8%',
          // bottom: '3%',
          containLabel: true
        },
        toolbox: {
          right: 20,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'Classroom',
          type: 'bar',
          stack: 'bugs',
          barWidth: '60%',
          data: [30, 25, 45, 20, 50, 10, 23],
          animationDuration
        }, {
          name: 'Places',
          type: 'bar',
          stack: 'bugs',
          barWidth: '60%',
          data: [10, 8, 20, 12, 11, 30, 40],
          animationDuration
        }, {
          name: 'Library',
          type: 'bar',
          stack: 'bugs',
          barWidth: '60%',
          data: [10, 6, 8, 13, 15, 30, 25],
          animationDuration
        }, {
          name: 'Others',
          type: 'bar',
          stack: 'bugs',
          barWidth: '60%',
          data: [20, 52, 20, 33, 39, 33, 22],
          animationDuration
        }]
      }
    }
  },
  methods: {
    init () {
      let myChart = echarts.init(document.getElementById('bar-chart'))
      myChart.setOption(this.options)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">

</style>
