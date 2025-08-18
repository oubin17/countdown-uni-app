<template>
  <navbar title="倒数日" />
  <div class="main-content">
    <div class="card" v-for="item in events" :key="item.id">
      <div class="card-left">
        <div class="card-title">
          <span>{{ item.title }}</span>
        </div>
        <div class="card-date">{{ item.date }}</div>
        <img :src="item.icon" alt="icon" class="card-icon" />
      </div>
      <div class="card-right">
        <span class="card-status">{{ item.statusText }}</span>
        <div class="card-days">
          <span class="days-num">{{ item.days }}</span>
          <span class="days-unit">天</span>
        </div>
      </div>
    </div>
    <div class="mini-list">
      <div class="mini-card" v-for="mini in miniEvents" :key="mini.id">
        <div class="mini-left">
          <img :src="mini.icon" class="mini-icon" />
          <div class="mini-left">
            <span class="mini-date">距离</span>
            <span class="mini-label">{{ mini.title }}</span>
            <span class="mini-date">{{ mini.statusText }}</span>
          </div>
        </div>

        <div class="mini-right">
          <div class="mini-days">{{ mini.days }}</div>
          <div class="mini-unit">{{ mini.unit }}</div>
        </div>


      </div>
    </div>

    <div class="add-btn">
      <img src="/static/normal/ask.png" alt="add" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/navbar/navbar.vue'

const events = ref([
  {
    id: 1,
    title: '毕业典礼',
    statusText: '还有',
    date: '2025年8月1日',
    icon: '/static/main/clock.png',
    days: 2213
  },
  {
    id: 2,
    title: '生日宴会',
    statusText: '已经',
    date: '2024年8月1日',
    icon: '/static/main/clock.png',
    days: 10
  }
])

const miniEvents = ref([
  {
    id: 1,
    icon: '/static/main/clock.png',
    title: '生日',
    statusText: '还有',
    days: 56,
    unit: '天'
  },
  {
    id: 2,
    icon: '/static/main/clock.png',
    title: '毕业典礼',
    statusText: '已经',
    days: 100,
    unit: '天'
  }
])
</script>

<style scoped lang="scss">
.main-content {
  background: #f7f8fa;
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
    padding: 10px;
  }
}

.mini-list {

  background: #f7f8fa;
}

.mini-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.mini-icon {
  width: 50rpx;
  height: 50rpx;
  margin-right: 8px;
}

.mini-label {
  flex: 1;
  text-align: center;
  color: #555;
  font-size: 18px;
  font-weight: bold;
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
    background: #6b4eff;
    min-width: 60rpx;
    color: #fff;
    height: 100%;

  }

  .mini-unit {
    width: 60rpx;
    background: #6b4eff;
    height: 100%;
    color: #888;
  }

}



.add-btn {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.add-btn img {
  width: 48px;
  height: 48px;
  opacity: 0.5;
}
</style>