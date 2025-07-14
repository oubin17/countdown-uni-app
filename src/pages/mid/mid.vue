<template>
  <view class="content">
    <!-- <navbar name="navbar 组件 父组件传给子组件" :content="data" /> -->
    <TestComponent name="navbar 组件 子组件传给父组件" :content="data" @changeData="changeData">
      <view>我是插槽内容</view>

    </TestComponent>
  </view>
</template>

<script setup lang="ts">

import TestComponent from '@/components/TestComponent/TestComponent.vue'
import { ref } from 'vue'
const data = ref('动态传参')

const changeData = (e: any) => {
  data.value = e
}
</script>

<style scoped></style>