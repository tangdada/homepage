/*
 * @Author: LT
 * @Date: 2018-03-26 18:12:07
 * @Last Modified by: chu
 * @Last Modified time: 2018-06-22 10:10:19
 */
 /**
 * 基于 iView + Axios 的异步请求封装
 *   以提供 日志打印、错误处理、方法判断、统一请求参数类型、设置Loading状态 等功能
 * 调用示例：
 *   import Api from '../api'
 *   Api.getWxConfig(config).then(res => {}).catch(e => {})
 *
 * 参数说明：
 * config [Object]:
 *  config.data [Object] 请求的数据，统一为 JSON 对象
 *  config.logger [Boolean] 是否打印日志 默认 true
 *  config.catchError [Boolean] 是否捕捉错误并显示错误消息
 *  config.loading [Boolean] 全屏的 loading 状态，默认 true, 配置 stateName 后将失效
 *  config.urlData [Array] 请求地址中要拼接的参数对象，拼接顺序为数组顺序 例 xx/user/${id}/${name}
 *  config.stateName [String] 请求过程中需要更新的 loadding 状态名称 （需要 context 配置）
 *  config.context [Object] 当前页面实例 this （当配置了 stateName 时，context 必填）
 *  config.contentType [String] post 提交的数据格式 multipart/form-data | application/x-www-form-urlencoded | application/json (默认)
 *  config.urlParams [Object] 当使用post请求，有post数据，并且有url params数据时使用
 */
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { baseConfig } from './config'


// 全局设置
axios.defaults.baseURL = baseConfig.baseUrl + ''
axios.defaults.timeout = 60*60*1000
axios.defaults.responseType = 'json'
axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = baseConfig.xsrfToken
axios.defaults.xsrfHeaderName = baseConfig.xsrfToken

// 防重复提交token
var UNIQUE_SUBMIT_TOKEN = 'unique-submit-token'

// 请求拦截处理
axios.interceptors.request.use(function (config) {
  const contentType = config.contentType
  if (config.method === 'post') {
    if (contentType === 'application/x-www-form-urlencoded') {
      // 使用该arrayFormat选项来指定输出数组的格式  https://github.com/ljharb/qs  例如 要使用 arr[]=b的形式来传递参数
      /*  qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
          // 'a[0]=b&a[1]=c'
          qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
          // 'a[]=b&a[]=c'
          qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
          // 'a=b&a=c'
       */
      config.data = qs.stringify(config.data, {
        arrayFormat: 'brackets'
      })
    } else if (contentType === 'multipart/form-data') {
      var formData = new FormData()
      formData.append('file', config.data)
      config.data = formData
    }
    config.headers['Content-Type'] = (contentType || 'application/json')
  }
  if (localStorage.getItem('UNIQUE_SUBMIT_TOKEN')) {
    config.headers[UNIQUE_SUBMIT_TOKEN] = localStorage.getItem('UNIQUE_SUBMIT_TOKEN')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截处理
axios.interceptors.response.use(function (config) {
  if (config.headers[UNIQUE_SUBMIT_TOKEN]) {
    localStorage.setItem('UNIQUE_SUBMIT_TOKEN', config.headers[UNIQUE_SUBMIT_TOKEN])
  }
  return config
}, function (error) {
  let res = error.response;
  if (res && res.headers[UNIQUE_SUBMIT_TOKEN]) {
    localStorage.setItem('UNIQUE_SUBMIT_TOKEN', res.headers[UNIQUE_SUBMIT_TOKEN])
  }
  return Promise.reject(error)
})

const createAsyncRequest = apiConfig => {
  // 将每个业务 api 地址转为方法
  Object.keys(apiConfig).forEach(v => {
    const urlInfo = apiConfig[v].split(' ')

    const method = urlInfo[0].toLowerCase()
    const isGet = method === 'get'

    // 请求参数处理
    apiConfig[v] = (config = {}) => {
      const {
        data = {}, urlData = [], urlParams = {}, contentType = 'application/json',
        context = null, catchError = true, stateName = ''
      } = config

      const options = {}
      options.contentType = contentType
      options.params = {}

      // stateName 与 context 必需同时存在
      if (stateName && !context) throw new Error('[fetch.js warn]: context is requred!')

      // 拼接URL
      let url = urlInfo[1]
      if (urlData.length) url = `${url}/${urlData.join('/')}`

      // 处理 get请求参数
      if (isGet && Object.keys(data).length) options.params = data
      if (Object.keys(urlParams).length) options.params = urlParams

      // 返回 Promise对象
      return axios[method](url, isGet ? options : data, !isGet && options)
        .then(res => res.data)
        .then(res => {
          return res
        })
        .catch(e => {

          const status = e && e.response && e.response.status || ''
          const errText = e && e.response && e.response.data && (e.response.data.text || e.response.data.info)

          if (status) {
            status === 403 && console.warn(url + ' 403 无权限')
            status === 401 && console.warn(url + ' 401 未登录')
            status === 400 && console.warn(url + ' 400 请求参数错误')
            status === 500 && console.warn(url + ' 500 服务器错误')
          }
          if (errText) {
            catchError && console.log(errText)
            if (errText.indexOf('未登录') > -1) {
              // 清空用户信息
              window.__VUE_STORE.commit(window.__VUE_TYPES.LOGOUT, {})
              // 跳转至登录页
              window.__VUE_ROUTE.push({ name: 'login' })
            }
            throw e.response.data
          } else {
            console.log(e)
            catchError && console.log(e && e.message || '服务器繁忙')
            throw e.response.data
          }
        })
    }
  })
  return apiConfig
}

export default createAsyncRequest
