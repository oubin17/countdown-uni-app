<template>
  <navbar title="倒数日" backgroundColor="rgba(23, 111, 87, 1)" @show-mask="handleShowMask"
    @height-calculated="handleHeightCalculated" />
  <div class="main-content">
    <div class="card" v-for="item in dateList" :key="item.id">
      <div class="card-left">
        <div class="card-title">
          <span>{{ item.description }}</span>
        </div>
        <div class="card-date">{{ item.targetDate }}</div>
        <img :src="item.icon" alt="icon" class="card-icon" />
      </div>
      <div class="card-right">
        <span class="card-status">{{ item.statusText }}</span>
        <div class="card-days">
          <span class="days-num">{{ item.leftDays }}</span>
          <span class="days-unit">天</span>
        </div>
      </div>
    </div>
    <div class="mini-list">
      <div class="mini-card" v-for="mini in miniDateList" :key="mini.id">
        <div class="mini-left">
          <img :src="mini.icon" class="mini-icon" />
          <div class="mini-left2">
            <span class="mini-date">距离</span>
            <span class="mini-label">{{ mini.description }}</span>
            <span class="mini-date">{{ mini.statusText }}</span>
          </div>
        </div>

        <div class="mini-right">
          <div class="mini-days">{{ mini.leftDays }}</div>
          <div class="mini-unit">天</div>
        </div>
      </div>
    </div>

    <div class="add-btn" @click="handleAddClick">
      <img src="/static/main/add.png" alt="add" class="btn-icon" />
    </div>
  </div>

  <!-- 遮罩层组件 -->
  <MaskOverlay v-model:show="showMask" :navbar-height="navbarHeight" @book-click="handleBookClick" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Navbar from '@/components/navbar/navbar.vue'
import MaskOverlay from '@/components/mask/MaskOverlay.vue'
import { dataListApi } from '@/utils/http'
import type { DateDTO, BookDTO } from '@/types'

// 使用导入的类型
const dateList = ref<DateDTO[]>([])
const miniDateList = ref<DateDTO[]>([])
// 遮罩层显示状态
const showMask = ref(false)
// navbar高度状态
const navbarHeight = ref(180) // 默认值


// 处理navbar的show-mask事件
const handleShowMask = () => {
  showMask.value = true
}

// 处理navbar高度计算完成事件
const handleHeightCalculated = (height: number) => {
  navbarHeight.value = height + 20 // 高度 + 20rpx间距
  console.log('接收到navbar高度:', height, '计算后高度:', navbarHeight.value)
}


onMounted(() => {
  getDateListByBook('')
})

// 处理书单点击
const handleBookClick = (book: BookDTO) => {
  console.log('书单点击:', book)
  // 根据选中的书单重新获取数据
  getDateListByBook(book.id)
}

// 处理添加按钮点击
const handleAddClick = () => {
  uni.navigateTo({
    url: '/pages/date/dateadd'
  })
}

// 根据书单ID获取数据
async function getDateListByBook(bookId: string) {
  try {
    // 获取数据
    const res = await dataListApi(bookId)

    const list = (res.dateDTOList || []).map((item: DateDTO) => ({
      ...item,
      statusText: item.leftDays > 0 ? '还有' : '已经',
      icon: '/static/main/clock.png',
      leftDays: Math.abs(item.leftDays)
    }))
    dateList.value = list.slice(0, 2)
    miniDateList.value = list.slice(2)
  } catch (error) {
    console.error('获取书单数据失败:', error)
    uni.showToast({
      title: '获取数据失败',
      icon: 'none'
    })
  }
}

</script>

<style scoped lang="scss">
.main-content {
  background: $main-bg-color;
  min-height: 100vh;
  padding: 20px 0 0 0;
}

.card {
  background: #fff;
  border-radius: 20px;
  margin: 0 20px 20px 20px;
  padding: 20px;
  box-shadow: 0 2px 8px #eee;
  display: flex;
  justify-content: space-between;

  .card-left {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-right {
    /* width: 50%; */
    text-align: right;
  }

  .card-title {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    font-weight: bold;
  }

  .card-status {
    color: #888;
    font-size: 18px;
  }

  .card-date {
    color: #888;
    font-size: 16px;
    margin: 8px 0;
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

  .card-days {
    /* display: flex; */
    align-items: baseline;
    font-size: 48px;
    font-weight: bold;
    margin-top: 10px;
  }

  .days-num {
    color: #222;
  }

  .days-unit {
    font-size: 20px;
    color: #888;
    margin-left: 4px;
  }

}


.mini-card {
  background: #fff;
  border-radius: 20px;
  margin: 0 20px 10px 20px;

  box-shadow: 0 2px 8px #eee;
  display: flex;
  justify-content: space-between;

  .mini-left {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 2px 10px;

    .mini-icon {
      width: 50rpx;
      height: 50rpx;
      margin-right: 8px;
    }

    .mini-left2 {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 2px 10px;

      .mini-label {
        flex: 1;
        text-align: center;
        color: #555;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  .mini-right {
    margin: 0px;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    justify-content: center;
    align-items: center;

    .mini-days {
      flex: 1;
      display: flex;
      justify-content: center;
      /* 水平居中 */
      align-items: center;
      /* 垂直居中 */
      background: rgba(109, 96, 168, 1);
      min-width: 60rpx;
      color: #fff;
      height: 100%;
      padding: 0 8px;

    }

    .mini-unit {
      width: 60rpx;
      display: flex;
      justify-content: center;
      /* 水平居中 */
      align-items: center;
      /* 垂直居中 */
      background: rgba(78, 45, 92, 1);
      height: 100%;
      color: #888;
      border-radius: 0 20px 20px 0;
      padding: 0 8px;
    }

  }




}






.add-btn {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 150rpx;

  .btn-icon {
    width: 100rpx;
    height: 100rpx;
  }
}
</style>