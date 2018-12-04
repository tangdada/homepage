// 用户
const INIT_ACCOUNT = 'user/INIT_ACCOUNT'
const LOGOUT = 'user/LOGOUT'

export default {
	[LOGOUT] (state, data) {
    state.accountInfo = {
    }
  },

  [INIT_ACCOUNT] (state, data) {
    state.accountInfo = data
  },
}