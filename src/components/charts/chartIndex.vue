<template>
  <div class="chart-container">
    <panel-group></panel-group>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart></line-chart>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from '../../components/charts/panelGroup'
import LineChart from '../../components/charts/lineChart'
export default {
  components: {
    PanelGroup,
    LineChart
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss">

</style>
