<template>
  <view class="navbar-container" :style="navbarStyle">
    <view class="back-icon" @click="handleBackClick">
      <image v-if="pageStacks > 1" src="../../static/navbar/back.png"></image>
      <image v-else src="../../static/navbar/home.png"></image>
    </view>
    <view class="title-wrapper">
      <view class="title">{{ props.title }}</view>
    </view>
  </view>
  <!-- 提供一个占位元素，高度等于导航栏高度，确保内容不被遮挡 -->
  <view class="navbar-placeholder" :style="placeholderStyle"></view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  //背景颜色
  title: {
    type: String,
    default: '默认页'
  },
});

//页面栈数量
const pageStacks = computed(() => {
  return getCurrentPages().length;

})

// 处理返回按钮点击
const handleBackClick = () => {
  if (pageStacks.value > 1) {
    uni.navigateBack();
  } else {
    uni.switchTab({
      url: '/pages/index/index'
    })
  }
}

// 定义状态栏高度和导航栏高度
const statusBarHeight = ref(0);
const navbarHeight = ref(0);
const platform = ref('');
const totalHeight = ref(0);

// 计算导航栏样式
const navbarStyle = computed(() => {
  return {
    marginTop: `${statusBarHeight.value}rpx`,
    height: `${navbarHeight.value}rpx`,
  };
});

// 计算占位元素样式
const placeholderStyle = computed(() => {
  return {
    height: `${totalHeight.value}rpx`
  };
});

// 在组件挂载时获取系统信息
onMounted(() => {
  try {
    // 获取系统信息
    const systemInfo = uni.getSystemInfoSync();
    // 状态栏高度（px转换为rpx）
    statusBarHeight.value = (systemInfo?.statusBarHeight || 0) * 2; // px转rpx，一般是2倍关系
    // 获取平台信息
    platform.value = systemInfo.platform;

    // 根据平台设置导航栏高度
    if (platform.value === 'android') {
      navbarHeight.value = 90; // 安卓导航栏高度
    } else if (platform.value === 'ios') {
      navbarHeight.value = 88; // iOS导航栏高度
    } else {
      navbarHeight.value = 88; // 默认导航栏高度
    }

    // 计算总高度
    totalHeight.value = statusBarHeight.value + navbarHeight.value;

    console.log('平台:', platform.value);
    console.log('状态栏高度:', statusBarHeight.value, 'rpx');
    console.log('导航栏高度:', navbarHeight.value, 'rpx');
    console.log('总高度:', totalHeight.value, 'rpx');
  } catch (e) {
    console.error('获取系统信息失败:', e);
    // 设置默认值
    navbarHeight.value = 88;
    totalHeight.value = 88;
  }
});

// 定义方法  
const rightClick = () => {
  console.log('rightClick');
};

const leftClick = () => {
  console.log('leftClick');
};
</script>

<style scoped lang="less">
.navbar-container {
  position: fixed; // 固定定位，使导航栏固定在页面顶部
  top: 0; // 距离顶部0
  left: 0; // 距离左侧0
  right: 0; // 距离右侧0，与left:0配合实现宽度100%
  z-index: 999; // 设置较高的层级，确保导航栏显示在其他内容之上

  .back-icon {
    position: absolute; // 绝对定位
    left: 0; // 靠左对齐
    top: 50%; // 垂直方向居中
    transform: translateY(-50%); // 向上偏移自身高度的一半，实现完美居中
    display: flex; // 使用flex布局
    align-items: center; // 垂直居中
    justify-content: center; // 水平居中
    width: 80rpx; // 设置宽度
    height: 80rpx; // 设置高度
    margin-left: 20rpx; // 左侧外边距
    z-index: 1000; // 设置较高的层级，确保导航栏显示在其他内容之上

    image {
      width: 50rpx; // 图标宽度
      height: 50rpx; // 图标高度
      object-fit: contain; // 保持图片比例，确保完整显示
    }
  }

  .title-wrapper {
    position: absolute; // 绝对定位
    left: 0; // 左侧对齐
    right: 0; // 右侧对齐，与left:0配合实现宽度100%
    top: 0; // 顶部对齐
    bottom: 0; // 底部对齐，与top:0配合实现高度100%
    display: flex; // 使用flex布局
    align-items: center; // 垂直居中
    justify-content: center; // 水平居中

    .title {
      font-size: 34rpx;
      font-weight: 500;
      color: #333;
    }
  }


}

.navbar-placeholder {
  width: 100%;
}
</style>