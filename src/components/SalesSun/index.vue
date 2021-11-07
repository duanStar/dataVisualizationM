<template>
  <div class="sales-sun">
    <div class="sales-sun-inner">
      <vue-echarts :options="options" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesSun',
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
      if (!this.data || !this.data.salesSun) {
        return
      }
      const colors = ['rgb(0,211,255)', 'rgb(0,123,255)', 'rgb(0,218,234)', 'rgb(35,69,145)', '#9A2555']
      const bgColor = '#2E2733'

      const itemStyle = {
        star5: {
          color: colors[0]
        },
        star4: {
          color: colors[1]
        },
        star3: {
          color: colors[2]
        },
        star2: {
          color: colors[3]
        }
      }

      const data = this.data.salesSun

      for (let j = 0; j < data.length; ++j) {
        const level1 = data[j].children
        for (let i = 0; i < level1.length; ++i) {
          const block = level1[i].children
          const bookScore = []
          let bookScoreId
          for (let star = 0; star < block.length; ++star) {
            let style = (function (name) {
              switch (name) {
                case '5☆':
                  bookScoreId = 0
                  return itemStyle.star5
                case '4☆':
                  bookScoreId = 1
                  return itemStyle.star4
                case '3☆':
                  bookScoreId = 2
                  return itemStyle.star3
                case '2☆':
                  bookScoreId = 3
                  return itemStyle.star2
              }
            })(block[star].name)

            block[star].label = {
              color: style.color,
              downplay: {
                opacity: 0.5
              }
            }

            if (block[star].children) {
              style = {
                opacity: 1,
                color: style.color
              }
              block[star].children.forEach(function (book) {
                book.value = 1
                book.itemStyle = style

                book.label = {
                  color: style.color
                }

                let value = 1
                if (bookScoreId === 0 || bookScoreId === 3) {
                  value = 5
                }

                if (bookScore[bookScoreId]) {
                  bookScore[bookScoreId].value += value
                } else {
                  bookScore[bookScoreId] = {
                    color: colors[bookScoreId],
                    value: value
                  }
                }
              })
            }
          }

          level1[i].itemStyle = {
            color: data[j].itemStyle.color
          }
        }
      }

      // 渲染echarts旭日图
      this.options = {
        backgroundColor: bgColor,
        color: colors,
        series: [{
          type: 'sunburst',
          data,
          center: ['50%', '48%'],
          levels: [
            {},
            {
              r0: 0,
              r: 40,
              label: {
                rotate: 0
              }
            },
            {
              r0: 40,
              r: 105
            },
            {
              r: 115,
              r0: 140,
              itemStyle: {
                color: 'transparent',
                shadowColor: colors[2],
                shadowBlur: 2
              },
              label: {
                rotate: 'tangential',
                fontSize: 10
              }
            },
            {
              r: 140,
              r0: 145,
              label: {
                position: 'outside',
                textShadowColor: '#333',
                textShadowBlur: 5
              },
              itemStyle: {
                shadowColor: colors[0],
                shadowBlur: 80
              },
              downplay: {
                label: {
                  opacity: 0.3
                }
              }
            }
          ],
          label: {
            rotate: 'radial',
            color: bgColor
          },
          itemStyle: {
            borderColor: bgColor,
            borderWidth: 2
          }
        }]
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
  .sales-sun {
    position: absolute;
    top: 2450px;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 800px;
    padding: 25px 25px 0;
    box-sizing: border-box;

    .sales-sun-inner {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .05);
    }
  }
</style>
