import createApi from './fetch'

const apis = {
  getAccountById: 'get /user/showUser',

  addComment: 'post /comment/add',
  getCommentByArticleId: 'get /comment/all',
}

export default createApi(apis)
