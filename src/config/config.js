// API 后端服务地址配置
const baseUrl = {
  // 开发环境
  dev: 'http://localhost:8080',
  // 测试环境
  test: window.useCustomizedPath ? 'http://crm-testb.mytijian.cn' : '',
  // 线上环境
  pro: ''
}

export const baseConfig = {
  baseUrl: baseUrl.dev,
  xsrfToken: 'unique-submit-token'
}