<template>
  <view class="nav">
    <view :style="{ height: statusBarHeight + 'rpx', background: props.background }"></view>
    <view :style="{ height: navbarHeight + 'rpx', color: props.color }" class="navbar">
      <view class="back-icon" @click="handleBackClick">
        <image v-if="pageStacks > 1" src="../../static/back.png"></image>
        <image v-else src="../../static/normal/home.png"></image>
      </view>
    </view>

  </view>

</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'

const props = defineProps({
  //背景颜色
  background: {
    type: String,
    default: 'rgba(255,255,255,1)'
  },
  //字体颜色
  color: {
    type: String,
    default: 'rgba(0,0,0,1)'
  },
  //字体大小
  fontSize: {
    type: String,
    default: "32"
  },
  iconWidth: {
    type: String,
    default: "116"
  },
  iconHeight: {
    type: String,
    default: "38"
  },
})
const system = computed(() => {
  const { system } = uni.getSystemInfoSync()
  return system
})

// 计算状态栏高度
const statusBarHeight = computed(() => {
  const statusBarHeight = uni.getWindowInfo()
  return statusBarHeight.statusBarHeight * 2
})

// 计算导航栏高度
const navbarHeight = computed(() => {
  const isiOS = system.value.indexOf('iOS') > -1
  const navbarHeight = isiOS ? 44 : 48
  return navbarHeight * 2
})

//页面栈数量
const pageStacks = computed(() => {
  const pageStacks = getCurrentPages()
  return pageStacks.length
})

// 处理返回按钮点击
const handleBackClick = () => {
  if (pageStacks.value > 1) {
    uni.navigateBack()
  } else {
    uni.switchTab({
      url: '/pages/index/index'
    })
  }
}

</script>

<style scoped>
.nav {
  display: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}

.back-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  margin-left: 20rpx;
  margin-top: 10rpx;
}

.back-icon image {
  width: 40rpx;
  height: 40rpx;
  object-fit: contain;
}
</style>