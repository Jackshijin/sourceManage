<template>
  <div class="chart-wrapper">
    <el-row>
      <el-col :span="12" class="radar-chart">
        <radar-chart></radar-chart>
      </el-col>
      <el-col :span="12" class="pei-chart">
        <pie-chart></pie-chart>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="bar-chart">
        <bar-chart></bar-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RadarChart from './radarChart'
import PieChart from './pieChart'
import BarChart from './barChart'
export default {
  components: {
    RadarChart,
    PieChart,
    BarChart
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  .bar-chart {
    margin-top: 30px;
  }
</style>
