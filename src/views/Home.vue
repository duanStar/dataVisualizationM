<template>
  <div class="home" v-if="!loading">
    <div class="datav-wrapper">
    </div>
    <TopHeader />
    <SalesBar :data="data"/>
    <SalesLine :data="data" />
    <SalesPie :data="data"/>
    <SalesMap />
    <SalesSun :data="data"/>
    <SalesRadar :data="data"/>
  </div>
  <div class="home" v-else>
    <div class="loading-wrapper">{{loadingText}}</div>
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader'
import SalesBar from '../components/SalesBar'
import SalesLine from '../components/SalesLine'
import SalesPie from '../components/SalesPie'
import SalesMap from '../components/SalesMap'
import SalesSun from '../components/SalesSun'
import SalesRadar from '../components/SalesRadar'
import { getScreenMobileData } from '../api'

export default {
  name: 'Home',
  components: {
    TopHeader,
    SalesBar,
    SalesLine,
    SalesPie,
    SalesMap,
    SalesSun,
    SalesRadar
  },
  data() {
    return {
      loading: true,
      loadingText: '加载中',
      data: null,
      task: null
    }
  },
  mounted() {
    this.task && clearInterval(this.task)
    this.task = setInterval(() => {
      if (this.loadingText === '加载中...') {
        this.loadingText = '加载中'
      } else {
        this.loadingText += '.'
      }
    }, 1000)
    getScreenMobileData().then(res => {
      this.loading = false
      this.task && clearInterval(this.task)
      this.$nextTick(() => {
        this.data = res
      })
    }).catch(err => {
      this.loading = false
      this.task && clearInterval(this.task)
      console.log(err)
    })
  },
  destroyed() {
    this.task && clearInterval(this.task)
  }
}
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    height: 100%;
    .datav-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1336px;
      z-index: 1;
      background: url("https://www.youbaobao.xyz/datav-res/datav/datav-mobile-bg.jpg") no-repeat;
      background-size: 100%;
    }
  }
  .loading-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: #fff;
  }
</style>
