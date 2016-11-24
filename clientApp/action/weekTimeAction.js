import * as types from '../constant/ActionTypes';
import * as apiUri from '../constant/ApiUri';
import restApi from "../service/restAPI.js";

export const listAll = function(){ 
	console.log('action week call');
	return function (dispatch) {
	  	return restApi.get(apiUri.WkTimeListAll).then((response) => {
	    	
	       dispatch({	
		  			type: types.SHOW_WEEK_TIME, 
			       	weekTime: response
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.SHOW_WEEK_TIME,
		       		error: err
			    });
		});
	}; 
} 
export const updateShiftInDay = function(data){  
	return function (dispatch) {
	  	return restApi.post(apiUri.WkDayCreateShift,data).then((response) => {
	    	
	       dispatch({	
		  			type: types.UPDATE_SHIFT, 
			       	error: response.message,
			       	weekDay: response.weekDay
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.UPDATE_SHIFT,
		       		error: err
			    });
		});
	}; 
} 

export const cancelAllShift = function(weekDayId){  
	var data =  submitData= {
      weekDayId: weekDayId,
      morningShift : null,
      nightShift: null
    };  
	return function (dispatch) {
	  	return restApi.post(apiUri.WkDayCreateShift,data).then((response) => {
	    	
	       dispatch({	
		  			type: types.UPDATE_SHIFT, 
			       	error: response.message
			    });
	    }).catch((err) => {   
	        dispatch({
	        		type: types.UPDATE_SHIFT,
		       		error: err
			    });
		});
	}; 
} 

export const getNearestShift = function(){ 	
	return function (dispatch) {
	  	return restApi.get(apiUri.WkTimeNearest).then((response) => {
	    	
	       dispatch({	
		  			type: types.NEAR_SHIFT,
		  			shift: response.shift
			    });
	    }).catch((err) => {   
	    	console.log(err);
	        dispatch({
	        		type: types.NEAR_SHIFT,
		       		error: err
			    });
		});
	}; 
} 