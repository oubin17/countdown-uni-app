<template>
  <div class="login-input">
    <u-input v-model="inputValue" :type="inputType" :placeholder="placeholder" clearable
      :maxlength="type === 'phone' ? 11 : 12" :customStyle="customInputStyle">
      <!-- 自定义前缀图标和区号 -->
      <template #prefix>
        <span v-if="type === 'phone'" class="prefix-group">
          <img src="/static/login/phone.png" alt="phone" class="input-icon" />
          <span class="prefix">+86</span>
        </span>
        <img v-else-if="type === 'password'" src="/static/login/lock.png" alt="lock" class="input-icon" />
      </template>
      <!-- 密码可见切换，仅密码输入时显示 -->
      <template v-if="type === 'password'" #suffix>
        <u-icon :name="showPwd ? 'eye' : 'eye-off'" size="20" @click.stop="showPwd = !showPwd" />
      </template>
    </u-input>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
const props = defineProps({
  modelValue: String,
  type: { type: String, default: 'phone' }, // 'phone' | 'password'
  placeholder: String,
})
const emit = defineEmits(['update:modelValue'])
const showPwd = ref(false)
const inputValue = ref(props.modelValue || '')

watch(() => props.modelValue, val => {
  inputValue.value = val || ''
})
watch(inputValue, val => {
  emit('update:modelValue', val)
})
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPwd.value ? 'text' : 'password'
  }
  return 'number'
})

const customInputStyle = 'height:70rpx;border-radius:100rpx;background:#fff;border:1px solid #fff;';
</script>

<style scoped>
.login-input {
  margin-bottom: 18px;
}

.login-uinput {
  width: 100%;
}

.prefix-group {
  display: flex;
  align-items: center;
}

.input-icon {
  width: 44rpx;
  height: 44rpx;
  margin-right: 16rpx;
  vertical-align: middle;
}

.prefix {
  font-size: 26rpx;
  margin-right: 16rpx;
  display: flex;
  align-items: center;

  font-weight: 400;
  letter-spacing: 0px;
  line-height: 20rpx;
  color: rgba(51, 51, 51, 1);
  text-align: left;
  vertical-align: middle;

}
</style>
