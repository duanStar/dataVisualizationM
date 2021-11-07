<template>
  <div class="sales-line">
    <div class="sales-line-inner">
      <vue-echarts :options="options"></vue-echarts>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesBar',
  data() {
    return {
      options: {}
    }
  },
  props: {
    data: Object
  },
  methods: {
    update() {
      if (!this.data || !this.data.saleLine) {
        return
      }
      const { axis, data1, data2, data3 } = this.data.saleLine
      this.options = {
        title: {
          text: '分时访问&成交趋势图',
          textStyle: {
            color: '#fff'
          },
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: axis,
          axisLabel: {
            color: 'rgba(255, 255, 255, .3)'
          },
          axisLine: {
            show: false
          },
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: 'rgba(255, 255, 255, .3)'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .1)'
            }
          }
        },
        series: [
          {
            name: '访问量',
            type: 'line',
            data: data1,
            smooth: true,
            itemStyle: {
              opacity: 0,
              color: 'rgb(0, 163, 233)'
            }
          },
          {
            name: '成交量',
            type: 'line',
            data: data2,
            itemStyle: {
              opacity: 0,
              color: 'yellow'
            },
            smooth: true
          },
          {
            name: 'KPI',
            type: 'line',
            data: data3,
            smooth: true,
            itemStyle: {
              opacity: 0,
              color: 'red'
            }
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
  .sales-line {
    position: absolute;
    top: 950px;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 500px;
    padding: 25px 25px 0;
    box-sizing: border-box;
    .sales-line-inner {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .05);
    }
  }
</style>
