import * as actType from '../constant/ActionTypes'; 

import cookie from 'react-cookie';  

const defaultData = {
	weekTime: [],
    error: '',
    nearShift: {
      
    }
  };


export default function todos(stateData = defaultData, actionResult) {
  var newState = Object.assign({}, stateData);  
  switch (actionResult.type) {
    case actType.SHOW_WEEK_TIME:  
    newState.weekTime = actionResult.weekTime;
    newState.error = actionResult.error?actionResult.error:'';
  	 return newState; 
     
    case actType.NEAR_SHIFT:    
       newState.nearShift = actionResult.shift;
      newState.error = actionResult.error?actionResult.error:''; 
      return newState;      

    case actType.UPDATE_SHIFT:  
      for (var i=0; i < newState.weekTime.length; i++) {
        if (newState.weekTime[i]._id == actionResult.weekDay._id){
          newState.weekTime[i].morningShift = actionResult.weekDay.morningShift;
          newState.weekTime[i].nightShift = actionResult.weekDay.nightShift;
        }
      }
    return newState;      
	  
    default: 
      return stateData
  }
}