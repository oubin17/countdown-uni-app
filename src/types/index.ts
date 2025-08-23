/**
 * 项目类型定义统一导出
 */

// 导出所有数据模型类型
export * from './date'
export * from './user'
export * from './api'

// 组件相关类型
export interface NavbarProps {
  title: string
  backgroundColor?: string
}

export interface MaskOverlayProps {
  show: boolean
  navbarHeight?: number
}

// 菜单项类型
export type MenuType = 'home' | 'search' | 'setting' | 'about'

// 平台类型
export type Platform = 'h5' | 'mp-weixin' | 'mp-alipay' | 'mp-baidu' | 'mp-qq' | 'mp-toutiao' | 'app'

// 主题类型
export type ThemeType = 'light' | 'dark' | 'auto'