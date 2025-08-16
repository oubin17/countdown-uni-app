// 多环境配置文件，可扩展
export default {
  development: {
    baseURL: 'http://127.0.0.1:8080/odk-mix/api',
    tenantId: 'ODK-COUNTDOWN'
  },
  production: {
    baseURL: 'https://your-prod-domain.com/odk-mix/api',
    tenantId: 'ODK-COUNTDOWN'
  }
}
