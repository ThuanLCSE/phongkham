"use strict";

import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import Doctor from './component/Doctor.jsx';

import Patient from './component/Patient.jsx';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware   } from 'redux';
import rootReducer from './store/rootReducer.js'; 
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); 

let store = createStore(
	rootReducer,
  	applyMiddleware(thunk)
  );
 
ReactDom.render(
  	 <Provider store = {store}>
     <MuiThemeProvider>
  	 	<Router history={browserHistory} >
               <Route path="/" component={Patient} />  
               <Route path="doctor"
                  component={Doctor}/>
      </Router> 
      </MuiThemeProvider>
 </Provider>
	,document.getElementById('root'));

