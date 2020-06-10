import {combineReducers} from 'redux'
import initialized from './initialization'
import error from './error'
import employee from './employee'

export default combineReducers({initialized, employee, error})
