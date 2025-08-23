<template>
  <u-overlay :show="show" @click="handleClose" :z-index="1500">
    <view class="mask-content" @click.stop :style="maskContentStyle">
      <view class="book-list">
        <view class="book-item" v-for="book in bookList" :key="book.id" @click="handleBookClick(book)">
          <img :src="book.bookIcon" alt="icon" class="card-icon" />
          <text class="book-name">{{ book.bookName }}</text>
        </view>
        <view v-if="bookList.length === 0" class="empty-tip">
          <text class="empty-text">暂无书单数据</text>
        </view>
      </view>
    </view>
  </u-overlay>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, watch } from 'vue'
import type { BookDTO } from '@/types'
import { bookListApi } from '@/utils/http'

// 定义props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  navbarHeight: {
    type: Number,
    default: 180
  }
})

const bookList = ref<BookDTO[]>([])

// 默认书单对象
const defaultBookDTO: BookDTO = {
  id: '',
  bookName: '全部',
  bookIcon: '/static/main/add.png'
}

// 计算属性：动态样式
const maskContentStyle = computed(() => ({
  '--navbar-height': props.navbarHeight + 'rpx'
}))

// 定义事件
const emit = defineEmits(['update:show', 'menu-click', 'book-click'])

// 处理关闭
const handleClose = () => {
  emit('update:show', false)
}

// 获取书单数据
async function getBookList() {
  try {
    // 获取数据
    const res = await bookListApi()
    const apiBooks = (res.bookDTOList || []).map((item: BookDTO) => ({
      ...item,
      bookIcon: '/static/main/clock.png'
    }))
    // 将默认书单添加到第一个位置
    bookList.value = [defaultBookDTO, ...apiBooks]
  } catch (error) {
    console.error('获取书单失败:', error)
    // 即使获取失败，也保留默认书单
    bookList.value = [defaultBookDTO]
  }
}

// 处理书单点击
const handleBookClick = (book: BookDTO) => {
  emit('book-click', book)
  handleClose()
}

// 监听show属性变化，当遮罩显示时获取书单数据
watch(() => props.show, (newShow) => {
  if (newShow) {
    getBookList()
  }
})

</script>

<style scoped lang="scss">
.mask-content {
  position: absolute;
  top: var(--navbar-height, 180rpx);
  /* 使用CSS自定义属性，uni-app各端兼容性更好 */
  left: 20rpx;
  right: 20rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx 30rpx;
  box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.book-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.book-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx;
  border-radius: 12rpx;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #e9ecef;
  }

  &:active {
    background-color: #dee2e6;
    transform: scale(0.98);
  }

  .card-icon {
    width: 60rpx;
    height: 60rpx;
    margin-right: 8px;
    /* width: 32px; */
    /* height: 32px; */
    /* max-width: 32px;
    max-height: 32px;
    object-fit: contain;
    display: block;
    margin: 0 auto; */
  }
}

.book-name {
  font-size: 32rpx;
  color: #333;
  font-weight: 400;
  flex: 1;
}

.empty-tip {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40rpx 20rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>