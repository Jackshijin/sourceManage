<template>
  <div id="pie-chart" style="width:100%;height:400px;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      options: {
        title: {
          text: '文章公告内容分析'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Notices', 'Consultation', 'Recruitment', 'Bugs', 'Sharing']
        },
        series: [
          {
            name: 'Weekly Articles About',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 320, name: 'Consultation' },
              { value: 240, name: 'Sharing' },
              { value: 149, name: 'Recruitment' },
              { value: 100, name: 'Notices' },
              { value: 59, name: 'Bugs' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      }
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      let myChart = echarts.init(document.getElementById('pie-chart'))
      myChart.setOption(this.options)
    }
  }
}
</script>

<style lang="scss">

</style>
