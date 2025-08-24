<template>
  <navbar title="Book 列表" backgroundColor="rgba(23, 111, 87, 1)" @height-calculated="handleHeightCalculated" />
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
</template>

<script setup lang="ts">
import { BookDTO } from '@/types';
import { bookListApi } from '@/utils/http';
import { computed, onMounted } from 'vue';
import { ref } from 'vue';
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

// navbar高度状态
const navbarHeight = ref(180) // 默认值
// 处理navbar高度计算完成事件
const handleHeightCalculated = (height: number) => {
  navbarHeight.value = height + 20 // 高度 + 20rpx间距
  console.log('接收到navbar高度:', height, '计算后高度:', navbarHeight.value)
}

const maskContentStyle = computed(() => ({
  '--navbar-height': navbarHeight + 'rpx'
}))

const bookList = ref<BookDTO[]>([])

// 获取书单数据
async function getBookList() {
  try {
    // 默认书单
    const defaultBookDTO: BookDTO = {
      id: 'default',
      bookName: '默认倒数本',
      bookIcon: '/static/main/clock.png'
    }

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
    const defaultBookDTO: BookDTO = {
      id: 'default',
      bookName: '默认倒数本',
      bookIcon: '/static/main/clock.png'
    }
    bookList.value = [defaultBookDTO]
  }
}
onMounted(() => {
  getBookList()
})

// 处理书单点击事件
const handleBookClick = (book: BookDTO) => {
  console.log('选择了书单:', book)

  // 发送事件给原来的页面
  uni.$emit('bookSelected', book)

  // 返回上一个页面
  uni.navigateBack()
}
</script>

<style scoped lang="scss">
.mask-content {
  top: var(--navbar-height, 180rpx);
  left: 0;
  right: 0;
  bottom: 0;
  // background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  padding: 20rpx;
}

.book-list {
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  max-height: 80vh;
  overflow-y: auto;
}

.book-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
  }
}

.card-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}

.book-name {
  font-size: 16px;
  color: #333;
}

.empty-tip {
  text-align: center;
  padding: 40rpx;
}

.empty-text {
  color: #999;
  font-size: 14px;
}
</style>