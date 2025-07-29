<template>
  <u-popup :show="show" mode="center" :overlay="false" @close="close"
    customStyle="background:transparent;box-shadow:none;">
    <img :src="imgUrl" style="width:150rpx;height:150rpx;display:block;margin:0 auto;" />
  </u-popup>
</template>

<script setup lang="ts">
import { watch, toRef } from 'vue'

const props = defineProps<{
  show: boolean
  imgUrl: string
}>()
const emit = defineEmits(['update:show'])

const showRef = toRef(props, 'show')

function close() {
  emit('update:show', false)
}

watch(showRef, (val) => {
  if (val) {
    setTimeout(() => {
      close()
    }, 1500)
  }
})
</script>