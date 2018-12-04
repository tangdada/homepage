/**
 * 数据过滤或格式化
 * 单独提取出来，是为了多项目，多环境通用，比如：可以将此代码做版本管理，发布至NPM，多项目安装使用一份filter
 */
import moment from 'moment'
moment.locale('zh-cn')

const filters = {
  // 金额，symbol(￥)
  money (value, symbol = '') {
    if (value === undefined || value === null) {
      return ''
    }
    var flag = ''
    if (value < 0) {
      value = Math.abs(value)
      flag = '-'
    }
    return flag + symbol + (value / 100).toFixed(2)
  },
  // 金额,symbol(￥),区分正负
  moneyAddSymbol (value, symbol = '￥') {
    if (value === undefined || value === null) {
      return ''
    }
    var flag = ''
    if (value > 0) {
      flag = '+'
    }
    if (value < 0) {
      value = Math.abs(value)
      flag = '-'
    }
    return flag + symbol + (value / 100).toFixed(2)
  },
  formatPrice (num) {
    return (num / 100).toFixed(2)
  },
  formatDateTime (data, str) {
    if (!data) return ''
    if (!(data instanceof Date)) data = new Date(data)
    return moment(data).format(str || 'YYYY-MM-DD HH:mm:ss')
  },
  formatDate (data, str) {
    if (!(data instanceof Date)) data = new Date(data)
    return moment(data).format(str || 'L')
  },
  dateFromNow (data, str) {
    if (!(data instanceof Date)) data = new Date(data)
    return moment(data).fromNow()
  },
  marriageStatus (value) {
    if (value === 0) {
      value = '未婚'
    } else if (value === 1) {
      value = '已婚'
    } else if (value === -1) {
      value = '空'
    }
    return value
  },
  percent (value) {
    const temp = (value * 100).toFixed(2)
    return temp + '%'
  },
}

export default {
  install: Vue => {
    Object.keys(filters).forEach(v => Vue.filter(v, filters[v]))
  },
}
