/**
 * 用户相关的数据模型
 */

// 用户信息接口
export interface UserInfo {
  id: string
  username: string
  email?: string
  phone?: string
  avatar?: string
  createTime?: string
}

// 登录请求
export interface LoginRequest {
  phone: string
  password: string
}

// 登录响应
export interface LoginResponse {
  token: string
  userInfo: UserInfo
  expiresIn?: number
}