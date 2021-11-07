<template>
  <div class="sales-radar">
    <div class="sales-radar-inner">
      <vue-echarts :options="options" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesRadar',
  data () {
    return {
      options: {}
    }
  },
  props: {
    data: Object
  },
  methods: {
    update() {
      if (!this.data || !this.data.salesRadar) {
        return
      }
      const { indicator, data } = this.data.salesRadar
      // 渲染echarts雷达图
      this.options = {
        radar: {
          name: {},
          indicator
        },
        tooltip: {},
        series: [
          {
            name: '运营指标',
            type: 'radar',
            data
          }
        ]
      }
    }
  },
  watch: {
    data() {
      this.update()
    }
  }
}
</script>

<style lang="scss" scoped>
  .sales-radar {
    position: absolute;
    top: 3250px;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 800px;
    padding: 25px 25px 0;
    box-sizing: border-box;

    .sales-radar-inner {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .05);
    }
  }
</style>
