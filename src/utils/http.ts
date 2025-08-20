// 通用 HTTP 工具类，支持多环境配置（uni-app专用）
import envConfig from '@/env.config'
const ENV = (import.meta.env.MODE as 'development' | 'production') || 'development'
const BASE_URL = envConfig[ENV].baseURL

interface ApiResponse<T> {
  success: boolean
  errorType: string
  errorCode: string
  errorContext: string | null
  data: T
  extendInfo?: any
}

export function httpRequest<T = any>({
  url,
  method = 'GET',
  data = {},
  header = {},
  params = {}
}: {
  url: string
  method?: 'GET' | 'POST'
  data?: any
  header?: Record<string, any>
  params?: Record<string, any>
}): Promise<T> {
  // 拼接 params 到 url
  let fullUrl = BASE_URL + url
  if (params && Object.keys(params).length > 0) {
    const query = Object.entries(params)
      .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      .join('&')
    fullUrl += (url.includes('?') ? '&' : '?') + query
  }
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token') || ''
    uni.request({
      url: fullUrl,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        'X-TENANT-ID': envConfig[ENV].tenantId,
        'ODK-TOKEN': token,
        ...header
      },
      success: (res) => {
        const result = res.data as ApiResponse<T>
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.errorContext || '接口错误')
        }
      },
      fail: (err) => {
        reject('网络错误')
      }
    })
  })
}

// 登录接口示例
export function loginApi(loginId: string, identifyValue: string) {
  return httpRequest({
    url: '/user/login',
    method: 'POST',
    data: {
      loginId,
      loginType: '1',
      identifyType: '1',
      identifyValue
    }
  })
}

// 获取数据列表接口示例
export function dataListApi(bookId: string) {
  return httpRequest({
    url: '/countdown/date/list',
    method: 'GET',
    params: {
      bookId
    }
  })
}