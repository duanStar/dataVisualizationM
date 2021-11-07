<template>
  <div class="sales-pie">
    <div class="sales-pie-inner">
      <div class="sales-pie-item">
        <div class="sales-pie-item-inner">
          <vue-echarts :options="options1"></vue-echarts>
        </div>
      </div>
      <div class="sales-pie-item">
        <div class="sales-pie-item-inner">
          <vue-echarts :options="options2"></vue-echarts>
        </div>
      </div>
      <div class="sales-pie-item">
        <div class="sales-pie-item-inner">
          <vue-echarts :options="options3"></vue-echarts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesPie',
  data() {
    return {
      options1: {},
      options2: {},
      options3: {}
    }
  },
  props: {
    data: Object
  },
  methods: {
    createOptions(title, value, data) {
      return {
        title: [{
          text: title,
          textStyle: {
            color: 'rgba(255, 255, 255, .3)',
            fontSize: 12
          },
          top: 3
        }, {
          text: value,
          textStyle: {
            color: 'rgb(255, 255, 255)',
            fontSize: 16,
            fontWeight: 500
          },
          top: '43%',
          left: '32%'
        }],
        label: {
          show: false
        },
        tooltip: {
          trigger: 'item',
          formatter(params) {
            return `${params.data.name}<br>${params.data.value}`
          }
        },
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['65%', '80%'],
            data: [{
              name: '数据',
              value: data[0],
              itemStyle: {
                color: 'rgb(0, 140, 217)'
              },
              labelLine: {
                show: false
              },
              emphasis: {
                labelLine: {
                  show: false
                },
                label: {
                  show: false
                }
              }
            },
            {
              name: '数据',
              value: data[1],
              itemStyle: {
                color: 'rgb(35, 69, 145)'
              },
              labelLine: {
                show: false
              },
              emphasis: {
                labelLine: {
                  show: false
                },
                label: {
                  show: false
                }
              }
            }]
          }
        ]
      }
    },
    update() {
      if (!this.data || !this.data.salePie) {
        return
      }
      const data = this.data.salePie
      data.forEach((item, index) => {
        this[`options${index + 1}`] = this.createOptions(item.title, item.total, item.data)
      })
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
  .sales-pie {
    position: absolute;
    top: 1450px;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 400px;
    padding: 25px 12.5px 0;
    box-sizing: border-box;
    .sales-pie-inner {
      display: flex;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .05);
      .sales-pie-item {
        flex: 0 0 33.33%;
        width: 33.33%;
        height: 100%;
        padding: 0 12.5px;
        box-sizing: border-box;
        .sales-pie-item-inner {
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, .05);
        }
      }
    }
  }
</style>
