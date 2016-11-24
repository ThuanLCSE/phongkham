import * as actType from '../constant/ActionTypes';
import cookie from 'react-cookie';

// import auth from '../services/Authentication'; 
const defaultState = {
	doctorId: cookie.load('doctorId'),
	doctorName: null,
    error: 'not auth'
  };


export default function todos(stateData = defaultState, actionResult) {
   // console.log('reduce auth call')
  switch (actionResult.type) {
    case actType.SIGN_IN:    
		return {
			doctorId: actionResult.doctor?actionResult.doctor.id:null,
			doctorName: actionResult.doctor?actionResult.doctor.fullname:null,
			error: actionResult.error
		};      
	case actType.SIGN_OUT:   
		return 	{	
	        	error: 'not auth'
	        }; 
    case actType.CHECK_AUTH:   
		return 	{	
	        	error: actionResult.error
	        };   
	 //index page
    default: 
      return stateData
  }
}