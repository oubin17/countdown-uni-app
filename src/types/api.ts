/**
 * 通用API相关的类型定义
 */

// API响应基础结构
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp?: number
}

// 分页请求参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应数据
export interface PaginationResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// HTTP请求方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// 请求配置
export interface RequestConfig {
  url: string
  method?: HttpMethod
  data?: any
  params?: Record<string, any>
  headers?: Record<string, string>
}