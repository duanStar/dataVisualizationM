<template>
  <div class="top-header">
    <div class="title">外卖数据大屏</div>
    <div class="subtitle">移动报表</div>
    <div class="update-time">最后更新时间: 1分钟前</div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader'
}
</script>

<style lang="scss" scoped>
  .top-header {
    position: absolute;
    color: #fff;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 300px;
    padding: 50px 24px 24px;
    box-sizing: border-box;
    .title {
      font-size: 48px;
      font-weight: 500;
    }
    .subtitle {
      font-size: 36px;
      margin-top: 20px;
    }
    .update-time {
      font-size: 24px;
      font-weight: 300;
      color: rgba(255, 255, 255, .5);
      margin-top: 40px;
    }
  }
</style>
