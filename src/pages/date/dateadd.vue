<template>
  <navbar title="添加 Date" backgroundColor="rgba(23, 111, 87, 1)" />
  <view class="date-content">
    <view class="date-card">
      <view class="input-row">
        <img src="/static/date/datename.png" alt="date name icon" class="input-icon" />
        <up-input v-model="dateForm.description" placeholder="请输入事件名称" border="none" clearable></up-input>
      </view>
      <picker mode="date" :value="dateForm.targetDate" @change="onDateChange" :start="minDate" :end="maxDate">
        <view class="input-row">
          <img src="/static/date/targetdate.png" alt="date icon" class="input-icon" />
          <view class="date-display">
            <text v-if="dateForm.targetDate" class="date-text">{{ dateForm.targetDate }}</text>
            <text v-else class="placeholder-text">请选择目标日期</text>
          </view>
        </view>
      </picker>
      <view class="input-row" @click="goToBookList">
        <img src="/static/date/bookName.png" alt="book icon" class="input-icon" />
        <view class="book-display">
          <text v-if="selectedBook" class="book-text">{{ selectedBook.bookName }}</text>
          <text v-else class="placeholder-text">请选择倒数本</text>
        </view>
      </view>
    </view>
    <view class="submit-container">
      <up-button type="primary" :loading="loading" @click="handleSubmit" class="submit-btn"
        :custom-style="buttonStyle">提交</up-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { DateDTO, BookDTO } from '@/types';
import { addDateApi } from '@/utils/http';
import { ref, onMounted } from 'vue';

const dateForm = ref<DateDTO>({
  id: '',
  bookId: '',
  description: '',
  targetDate: '',
  icon: '',
  leftDays: 0,
  statusText: ''
})
// 加载状态
const loading = ref(false)

// 日期选择器相关
const minDate = '1900-01-01' // 最小日期
const maxDate = '2100-12-31' // 最大日期

// 显示日期选择器（触发 picker 组件）
const showDatePicker = () => {
  // 直接点击会触发 picker 组件
  // 不需要手动触发，picker 组件会自动响应点击事件
}

// 日期改变事件
const onDateChange = (e: any) => {
  dateForm.value.targetDate = e.detail.value
}

// 选择的书单
const selectedBook = ref<BookDTO | null>(null)

// 跳转到书单列表
const goToBookList = () => {
  uni.navigateTo({
    url: '/pages/book/booklist?from=dateadd'
  })
}

// 监听页面显示，处理从书单列表返回的数据
onMounted(() => {
  // 监听从书单列表页面返回的事件
  uni.$on('bookSelected', (book: BookDTO) => {
    selectedBook.value = book
    dateForm.value.bookId = book.id
    console.log('选择的书单:', book)
  })
})

// 提交处理函数
const handleSubmit = async () => {
  // 验证表单
  if (!dateForm.value.description.trim()) {
    uni.showToast({
      title: '请输入事件名称',
      icon: 'none'
    })
    return
  }

  if (!dateForm.value.targetDate.trim()) {
    uni.showToast({
      title: '请选择目标日期',
      icon: 'none'
    })
    return
  }

  if (!dateForm.value.bookId.trim()) {
    uni.showToast({
      title: '请选择倒数本',
      icon: 'none'
    })
    return
  }

  try {
    loading.value = true

    // 调用添加书单API
    await addDateApi(dateForm.value)

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
    }, 500)

  } catch (error) {
    console.error('添加 date 失败:', error)
    uni.showToast({
      title: '添加失败，请重试',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

// 按钮样式（内联样式方式确保兼容性）
const buttonStyle = {
  backgroundColor: 'rgba(23, 111, 87, 1)',
  borderRadius: '50rpx',
  border: 'none',
  width: '100%'
}
</script>

<style scoped lang="scss">
.date-content {
  background: $main-bg-color;
  min-height: 100vh;
  padding: 20px 0 0 0;
  // padding: 20upx;

  .date-card {
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
    cursor: pointer;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  .date-display {
    flex: 1;
    padding: 12rpx 0;

    .date-text {
      color: #333;
      font-size: 16px;
    }

    .placeholder-text {
      color: #c8c9cc;
      font-size: 16px;
    }
  }

  .book-display {
    flex: 1;
    padding: 12rpx 0;

    .book-text {
      color: #333;
      font-size: 16px;
    }

    .placeholder-text {
      color: #c8c9cc;
      font-size: 16px;
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

}
</style>