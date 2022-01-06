import * as Types from './types'
export const defaultState = {
  isLogin:false
}
export default (state, action) => {
  switch (action.type){
    case Types.TOGGLE_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin
      }
    default:return defaultState
  }
}

export const toggleLogin = (isLogin) => ({
  type: Types.TOGGLE_LOGIN,
  isLogin:isLogin
})