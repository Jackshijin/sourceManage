<template>
  <div class="line-chart-wrapper" id="main" style="width: 100%;height:450px;"></div>
</template>

<script>
const echarts = require('echarts')
export default {
  data () {
    return {
      option: {
        title: {
          text: '各类资源使用情况'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['普通课室', '场地', '多媒体', '图书馆资源', '其它资源']
        },
        toolbox: {
          right: 20,
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '普通课室',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 100]
          },
          {
            name: '场地',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 150]
          },
          {
            name: '多媒体',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 100]
          },
          {
            name: '图书馆资源',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '其它资源',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 650]
          }
        ]
      }
    }
  },
  methods: {
    init () {
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption(this.option)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">

</style>
