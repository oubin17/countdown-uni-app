/**
 * 日期相关的数据模型
 */

// 日期数据传输对象
export interface DateDTO {
  id: string
  bookId: string
  description: string
  targetDate: string
  leftDays: number
  icon: string
  statusText: string
}

export interface BookDTO {
  id: string
  bookName: string
  bookIcon: string
}

// 日期列表API响应
export interface DateListResponse {
  dateDTOList: DateDTO[]
  total?: number
}

// 日期创建请求
export interface CreateDateRequest {
  description: string
  targetDate: string
  bookId?: string
}

// 日期更新请求
export interface UpdateDateRequest extends Partial<CreateDateRequest> {
  id: string
}