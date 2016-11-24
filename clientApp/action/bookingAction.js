import * as types from '../constant/ActionTypes';
import * as apiUri from '../constant/ApiUri';
import restApi from "../service/restAPI.js";

export const register = function(data){ 
	console.log('action pat call');
	return function (dispatch) {
	  	return restApi.post(apiUri.PatientRegister, data).then((response) => { 
	       dispatch({	
		  			type: types.BOOK_NEW,
		       		error: 'success',
			       	user: response.user
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.BOOK_NEW,
		       		error: err.responseText
			    });
		});
	}; 
} 
export const viewCurrentAmount = function(){
	
	console.log('action regis call');
	return function (dispatch) {
	  	return restApi.get(apiUri.CurrentAmount).then((response) => {
	  
	       dispatch({	
		  			type: types.CURRENT_AMOUNT,
		       		error: 'cancel success',
			       	count: response.count
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.CURRENT_AMOUNT,
		       		error: err.responseText
			    });
		});
	}; 
}

export const cancelRegister = function(){ 
	console.log('action regis call');
	return function (dispatch) {
	  	return restApi.get(apiUri.PatientCancel).then((response) => { 
	       dispatch({	
		  			type: types.CANCEL_BOOKING,
		       		error: response.message
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.CANCEL_BOOKING,
		       		error: err.responseText
			    });
		});
	}; 
} 

export const removeBooking = function(data){ 
	 
	return function (dispatch) {
	  	return restApi.post(apiUri.PatientRemove,data).then((response) => { 
	       dispatch({	
		  			type: types.REMOVE_BOOKING,
		       		error: response.message
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.REMOVE_BOOKING,
		       		error: err.responseText
			    });
		});
	}; 
}
export const viewRegisterInfo = function(){ 
	console.log('action call');
	return function (dispatch) {
	  	return restApi.get(apiUri.PatientInfo).then((response) => {  
	       dispatch({	
		  			type: types.BOOKING_INFO,
		       		error: 'success',
		       		user: response.user
			    });
	    }).catch((err) => {  
	    	console.log(err); 
	        dispatch({
	        		type: types.BOOKING_INFO,
		       		error: err.responseText
			    });
		});
	}; 
}
export const editRegisterInfo = function(data){ 
	console.log('action call');
	return function (dispatch) {
	  	return restApi.post(apiUri.PatientEdit,data).then((response) => {  
	       dispatch({	
		  			type: types.EDIT_BOOKING,
		       		error: 'success',
		       		user: response.user
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.EDIT_BOOKING,
		       		error: err.responseText
			    });
		});
	}; 
}
export const listAll = function(){ 
	console.log('action book call');
	return function (dispatch) {
	  	return restApi.get(apiUri.PatientList).then((response) => {
	    	
	       dispatch({	
		  			type: types.PATIENT_LIST, 
			       	patients: response.users,
			       	error: response.message
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.PATIENT_LIST,
		       		error: err
			    });
		});
	}; 
} 
export const treatedPatient = function(data){  
	
	return function (dispatch) {
	  	return restApi.post(apiUri.PatientRemove,data).then((response) => { 
	       dispatch({	
		  			type: types.TREAT_PATIENT,
		       		error: 'remove success',
		       		patientId: data.patientId
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.TREAT_PATIENT,
		       		error: err.responseText
			    });
		});
	}; 
} 

export const resetAllBooking = function(data){  
	
	return function (dispatch) {
	  	return restApi.get(apiUri.BookingReset).then((response) => { 
	       dispatch({	
		  			type: types.RESET_BOOKING,
		       		error: 'remove success'
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.RESET_BOOKING,
		       		error: err.responseText
			    });
		});
	}; 
} 