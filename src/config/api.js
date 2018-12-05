import createApi from './fetch'

const apis = {
  getAccountById: 'get /user/showUser',
  getAccountInfo: 'get /user/getInfo',
  login: 'post /user/login',
  register: 'post /user/add',

  addComment: 'post /comment/add',
  getCommentByArticleId: 'get /comment/all',
  updateComment: 'post /comment/updateSelective',

  addArticle: 'post /news/add',
  getArticle: 'get /news/all',
  getArticleById: 'get /news/getNews',
}

export default createApi(apis)
