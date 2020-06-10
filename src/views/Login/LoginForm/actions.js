import {action} from '../../../utils'
import {ActionTypes} from '../../../constants'
import {api, auth} from '../../../services'

export const submitLogin = (payload) => {
  return action.create(ActionTypes.LOGIN, async () => {
    const {remember} = payload
    delete payload.remember

    const response = await api.post('employee/login', payload)
    const {isSuccess, data} = response
    isSuccess && auth.saveToken(data.token, remember)
    return response
  })
}
