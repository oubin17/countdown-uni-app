<template>
  <up-navbar title="个人中心" :placeholder="true" :autoBack="false" :bgColor="navbarBgColor">
    <template #left>
      <view class="u-nav-slot" @click="handleLeftClick">
        <up-icon :name="iconName" color="#fff"></up-icon>
      </view>
    </template>
  </up-navbar>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

// 响应式数据
const iconName = ref('home');

// 从 uni.scss 中获取导航栏颜色变量
const navbarBgColor = computed(() => {
  // 通过CSS变量获取uni.scss中定义的$main-navbar-color值
  return 'var(--main-navbar-color)';
});

// 检查页面栈数量并设置图标
const checkPageStack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    iconName.value = 'arrow-left';
    // iconName.value = 'list';
  } else {
    iconName.value = 'list';
  }
};

// 处理左侧图标点击
const handleLeftClick = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    // 页面栈大于1，执行返回操作
    uni.navigateBack();
  } else {
    // 页面栈等于1，跳转到首页
    uni.reLaunch({
      url: '/pages/index/index' // 根据你的首页路径调整
    });
  }
};

// 组件挂载时检查页面栈
onMounted(() => {
  checkPageStack();
});
</script>

<style scoped lang="scss"></style>