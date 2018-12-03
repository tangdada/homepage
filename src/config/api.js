import createApi from './fetch'

const apis = {
  getAccountById: 'get /user/showUser',

  addComment: 'post /comment/add',
  getCommentByArticleId: 'get /comment/all',

  addArticle: 'post /news/add',
  getArticle: 'get /news/all',
  getArticleById: 'get /news/getNews',
}

export default createApi(apis)
