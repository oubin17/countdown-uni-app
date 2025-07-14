<template>
  <navbar title="问答页面"></navbar>
  <view>
    <view class="content">
      111
    </view>

  </view>
  <button @click="toSearch">
    按钮
  </button>
</template>

<script setup lang="ts">

const toSearch = () => {
  uni.navigateTo({
    url: '/pages/search/index'
  })
}
</script>

<style scoped>
/* 样式由navbar组件的占位元素提供，不需要额外设置margin */
</style>