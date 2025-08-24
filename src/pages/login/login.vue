<template>
  <!-- Toast 组件（保留原有，备用） -->
  <u-toast ref="toast" />
  <navbar title="账号密码登录" />
  <div class="login-container">
    <h2 class="login-title">账号密码登录</h2>
    <p class="login-desc">请使用已注册的账号密码</p>
    <!-- 手机号输入框 -->
    <LoginInput v-model="phone" type="phone" placeholder="请输入手机号" />
    <!-- 密码输入框 -->
    <LoginInput v-model="password" type="password" placeholder="请输入6-12位密码" />
    <!-- 登录按钮 -->
    <u-button class="login-btn" :disabled="!canLogin" @click="handleLogin" shape="circle" :customStyle="loginBtnStyle">
      登 录
    </u-button>
    <!-- 自定义图片弹窗 -->
    <ImgToast v-model:show="showImgToast" :imgUrl="imgToastUrl" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LoginInput from '@/components/login/LoginInput.vue'
import ImgToast from '@/components/toast/ImgToast.vue'
import { loginApi } from '@/utils/http'
import { encryptWithPublicKey } from '@/utils/encrypt'


const phone = ref('')
const password = ref('')

const canLogin = computed(() => phone.value.length >= 6 && password.value.length >= 6)

const toast = ref()
const showImgToast = ref(false)
const imgToastUrl = ref('')

function showImgOnlyToast(url: string) {
  imgToastUrl.value = url
  showImgToast.value = true
}

async function handleLogin() {
  try {
    // 使用工具类加密密码
    const encryptedPwd = encryptWithPublicKey(password.value)
    const data = await loginApi(phone.value, encryptedPwd)
    uni.setStorageSync('userInfo', data)
    uni.setStorageSync('token', data.token)
    showImgOnlyToast('/static/login/login-success.png')
    // 登录成功后跳转到 main 页面并清空队列
    setTimeout(() => {
      uni.reLaunch({ url: '/pages/main/main' })
    }, 1500)

  } catch (e) {
    showImgOnlyToast('/static/login/login-failed.png')
  }
}

const loginBtnStyle = 'margin-top:60rpx;font-size:36rpx;border-radius:100rpx;background:rgba(107,78,255,1);color:#fff;width:100%;height:96rpx;';
</script>

<style scoped lang="scss">
.login-container {
  padding: 40px 20px 0 20px;
  background: $main-bg-color;
  min-height: 100vh;
}

.login-title {
  text-align: center;
  font-size: 64rpx;
  font-weight: bold;
  margin: 80rpx 0 60rpx 0;
}

.login-desc {
  text-align: center;
  font-size: 24rpx;
  font-weight: 400;
  letter-spacing: 0rpx;
  line-height: 24rpx;
  color: rgba(114, 119, 122, 1);
  margin-bottom: 132rpx;
}

.login-btn {
  width: 100%;
  margin-top: 60rpx;
  font-size: 18rpx;
  border-radius: 24rpx;
  background: rgba(107, 78, 255, 1);
}
</style>