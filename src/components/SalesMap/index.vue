<template>
  <div class="sales-map">
    <div class="sales-map-inner">
      <div id="map_container"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesMap',
  mounted() {
    const cities = [
      '北京',
      '天津',
      '上海',
      '重庆',
      '石家庄',
      '太原',
      '呼和浩特',
      '哈尔滨',
      '长春',
      '沈阳',
      '济南',
      '南京',
      '合肥',
      '杭州',
      '南昌',
      '福州',
      '郑州',
      '武汉',
      '长沙',
      '广州',
      '南宁',
      '西安',
      '银川',
      '兰州',
      '西宁',
      '乌鲁木齐',
      '成都',
      '贵阳',
      '昆明',
      '拉萨',
      '海口'
    ]
    const cityCenter = this.$mapv.utilCityCenter.getCenterByCityName('北京')
    const map = this.$initMap({
      center: [cityCenter.lng, cityCenter.lat],
      zoom: 5,
      style: this.$purpleStyle,
      tilt: 0
    })
    const data = []
    const random = 500
    const targetCity = this.$mapv.utilCityCenter.getCenterByCityName('北京')
    const nodeData = [
      {
        x: targetCity.lng,
        y: targetCity.lat
      }
    ]
    const edgeData = []
    for (let i = 0; i < random; i++) {
      const startCity = this.$mapv.utilCityCenter.getCenterByCityName(
        cities[parseInt(Math.random() * cities.length)]
      )
      nodeData.push({
        x: startCity.lng + 5 - 10 * Math.random(),
        y: startCity.lat + 5 - 10 * Math.random()
      })
      edgeData.push({
        source: i + 1,
        target: 0
      })
    }
    const bundling = this.$mapv
      .utilForceEdgeBundling()
      .nodes(nodeData)
      .edges(edgeData)
    const results = bundling()
    for (let i = 0; i < results.length; i++) {
      const lines = results[i]
      const coordinates = []
      for (let j = 0; j < lines.length; j++) {
        coordinates.push([lines[j].x, lines[j].y])
      }
      data.push({
        geometry: {
          type: 'LineString',
          coordinates
        }
      })
    }

    const view = new this.$mapvgl.View({ map })
    const lineLayer = new this.$mapvgl.LineLayer({
      data,
      color: 'rgba(55, 50, 250, .5)',
      blend: 'lighter'
    })
    view.addLayer(lineLayer)
    const linePointLayer = new this.$mapvgl.LinePointLayer({
      size: 8,
      speed: 30,
      color: 'rgba(255, 255, 0, 0.6)',
      animationType: this.$mapvgl.LinePointLayer.ANIMATION_TYPE_UNIFORM_SPEED,
      shapeType: this.$mapvgl.LinePointLayer.SHAPE_TYPE_CIRCLE,
      blend: 'lighter',
      data
    })
    view.addLayer(linePointLayer)
  }
}
</script>

<style lang="scss" scoped>
  .sales-map {
    position: absolute;
    top: 1850px;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 600px;
    padding: 25px 25px 0;
    box-sizing: border-box;
    .sales-map-inner {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .05);
      #map_container {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
