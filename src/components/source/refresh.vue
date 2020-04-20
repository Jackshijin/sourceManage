<template>
  <div></div>
</template>

<script>

export default {
  created () {
    // console.log(this.$route.query)
    this.$router.push({name: this.$route.query.name})
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
