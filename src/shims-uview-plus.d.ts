// src/shims-uview-plus.d.ts
declare module 'uview-plus' {
  import { Plugin } from 'vue'
  const uviewPlus: Plugin
  export default uviewPlus
}

// 声明组件类型（可选，按需扩展）
declare module 'uview-plus/components/*' {
  import { Component } from 'vue'
  const component: Component
  export default component
}