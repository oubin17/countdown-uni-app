<template>
  <navbar title="添加 Book" backgroundColor="rgba(23, 111, 87, 1)" />
  <view class="book-content">
    <view class="book-card">
      <view class="input-row">
        <img src="/static/book/bookName.png" alt="book name icon" class="input-icon" />
        <up-input v-model="bookForm.bookName" placeholder="请输入书名" border="none" clearable></up-input>
      </view>
      <view class="input-row">
        <img src="/static/book/bookIcon.png" alt="book icon" class="input-icon" />
        <up-input v-model="bookForm.bookIcon" placeholder="请输入图标" border="none" clearable></up-input>
      </view>
    </view>
    <view class="submit-container">
      <up-button type="primary" :loading="loading" @click="handleSubmit" class="submit-btn"
        :custom-style="buttonStyle">提交</up-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BookDTO } from '@/types/date'
import { addBookApi } from '@/utils/http'

// 表单数据
const bookForm = ref<BookDTO>({
  id: '',
  bookName: '',
  bookIcon: ''
})

// 加载状态
const loading = ref(false)

// 按钮样式（内联样式方式确保兼容性）
const buttonStyle = {
  backgroundColor: 'rgba(23, 111, 87, 1)',
  borderRadius: '50rpx',
  border: 'none',
  width: '100%'
}

// 提交处理函数
const handleSubmit = async () => {
  // 验证表单
  if (!bookForm.value.bookName.trim()) {
    uni.showToast({
      title: '请输入书名',
      icon: 'none'
    })
    return
  }

  if (!bookForm.value.bookIcon.trim()) {
    uni.showToast({
      title: '请输入图标',
      icon: 'none'
    })
    return
  }

  try {
    loading.value = true

    // 调用添加书单API
    await addBookApi(bookForm.value)

    // 提交成功提示
    uni.showToast({
      title: '添加成功',
      icon: 'success'
    })

    // 延迟跳转到首页并清空队列
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/main/main'
      })
    }, 1500)

  } catch (error) {
    console.error('添加书单失败:', error)
    uni.showToast({
      title: '添加失败，请重试',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.book-content {
  background: $main-bg-color;
  min-height: 100vh;
  padding: 20px 0 0 0;
  // padding: 20upx;

  .book-card {
    background: #fff;
    border-radius: 20px;
    margin: 0 20px 20px 20px;
    padding: 20px;
    box-shadow: 0 2px 8px #eee;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: 15rpx;
    padding-bottom: 10rpx;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  .input-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .submit-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 70rpx;
    padding: 0 20px;
  }

  // .submit-btn {
  //   width: 100%;
  //   background: rgba(64, 68, 70, 1) !important;
  //   border-radius: 50rpx !important;

  // :deep(.u-button) {
  //   background-color: rgba(64, 68, 70, 1) !important;
  //   background: rgba(64, 68, 70, 1) !important;
  //   border-radius: 50rpx !important;
  //   border: none !important;
  // }

  // :deep(.u-button__text) {
  //   color: #fff !important;
  // }
  // }

  // }

  // 全局样式穿透（不受 scoped 限制）
}
</style>
