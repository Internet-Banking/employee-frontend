import {ActionTypes, TOKEN_STATE} from '../constants'
import {action, jwt} from '../utils'
import {auth} from '../services'

export const initApp = () => {
  return action.create(ActionTypes.INIT_APP, async () => {
    const token = auth.getToken()

    if (!token) return {isSuccess: true, undefined}

    const state = jwt.getTokenState(token)
    try {
      if (state === TOKEN_STATE.INVALID || state === TOKEN_STATE.EXPIRED) {
        // auth.removeToken()
        return {isSuccess: false, error: {message: `Token is ${state.toLowercase()}`}}
      }

      return {isSuccess: true, token}
    }
    catch (error) {
      auth.removeToken()
      return {isSuccess: false, error: {message: 'Failed to fetch'}}
    }
  })
}
