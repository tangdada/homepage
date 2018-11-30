import createApi from './fetch'

const apis = {
  getAccountById: 'get /user/showUser',
}

export default createApi(apis)
