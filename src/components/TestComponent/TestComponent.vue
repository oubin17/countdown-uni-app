<template>
  <view>
    我是navbar组件。
    <slot></slot>
    <view>父组件传参：name={{ props.name }}</view>
    <view>content={{ props.content }}</view>
    <button @click="handleChange">点击</button>
  </view>

</template>

<script setup lang="ts">


const props = defineProps({
  name: {
    type: String,
    default: 'navbar'
  },
  content: {
    type: String,
    default: 'navbar'
  }
})

const emit = defineEmits(['changeData'])
const handleChange = () => {
  emit('changeData', '子组件传参')
}
</script>

<style scoped></style>