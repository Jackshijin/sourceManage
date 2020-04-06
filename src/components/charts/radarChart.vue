<template>
  <div id="radarChart" style="width:100%;height:400px;"></div>
</template>

<script>

const echarts = require('echarts')
export default {
  data () {
    return {
      options: {
        title: {
          text: '使用率对比分析'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: 'Common', max: 10000 },
            { name: 'Media', max: 20000 },
            { name: 'Library', max: 20000 },
            { name: 'Meeting-room', max: 20000 },
            { name: 'Places', max: 20000 },
            { name: 'Others', max: 20000 }
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Planned Using', 'Actual Using']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: [7000, 7000, 12000, 11000, 10000, 14000],
              name: 'Planned Using'
            },
            {
              value: [8000, 9000, 10000, 15000, 13000, 11000],
              name: 'Actual Using'
            }
            // {
            //   value: [5500, 11000, 12000, 15000, 12000, 12000],
            //   name: 'Actual Spending'
            // }
          ],
          animationDuration: 3000
        }]
      }
    }
  },
  mounted () {
    this.chartInit()
  },
  methods: {
    chartInit () {
      let myChart = echarts.init(document.getElementById('radarChart'))
      myChart.setOption(this.options)
    }
  }
}
</script>

<style lang="scss">

</style>
