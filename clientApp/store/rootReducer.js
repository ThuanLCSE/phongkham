import { combineReducers } from 'redux'
import booking from './bookingReducer'
import weekTime from './weekTimeReducer'  
import auth from './authReducer'   

const rootReducer = combineReducers({
	weekTime,
  booking,
  auth
})
// console.log('root call')
export default rootReducer