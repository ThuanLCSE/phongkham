import * as actType from '../constant/ActionTypes'; 
import _ from 'lodash';

const bookingState =  {
    error: '',
    user: null,
    currentBookingAmount: '',
    patients: []
  }

export default function todos(stateData = bookingState, actionResult) {
  var newState = Object.assign({}, stateData);  
  switch (actionResult.type) {
    case actType.BOOK_NEW:  
     
      newState.user = actionResult.user?actionResult.user:null;
      newState.error = actionResult.error
		  return newState;

      case actType.CANCEL_BOOKING:   
      newState.error = actionResult.error;
      newState.user = null;
      return newState;

      case actType.BOOKING_INFO:   
      newState.user = actionResult.user?actionResult.user:null;
      newState.error = actionResult.error
      return newState;

      case actType.CURRENT_AMOUNT:    
      newState.currentBookingAmount = actionResult.count?actionResult.count:0; 
      return newState;   

      case actType.EDIT_BOOKING: 
      newState.user = actionResult.user?actionResult.user:null;
      newState.error = actionResult.error
      
      case actType.PATIENT_LIST: 
      if (actionResult.patients !== null)
      {
        newState.patients = _.sortBy(actionResult.patients, 'bookingNumber', function(n) {
          return Math.sin(n);
        });
      } else {
          newState.patients = null;
      } 
      newState.error = actionResult.error
      return newState;

      case actType.TREAT_PATIENT:
      if (actionResult.error === 'remove success')
      {
         for (var i=0; i < newState.patients.length; i++) {
            if (newState.patients[i]._id == actionResult.patientId){
              newState.patients.splice(i, 1);
            }
          }
      } 
      newState.error = actionResult.error
       return newState;

      case actType.RESET_BOOKING:
       if (actionResult.error === 'remove success')
        {
          newState.patients=[];
        }

      newState.error = actionResult.error
      return newState;

	 //index page
    default:
      return stateData
  }
}