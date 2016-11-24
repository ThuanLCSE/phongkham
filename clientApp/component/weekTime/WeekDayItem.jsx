import React, { Component, PropTypes } from 'react';
import WeekDayShift from './WeekDayShift.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';


export default class WeekDay extends Component {
	constructor(props) {
      super(props);   
      this.state = {
      	editShift: false
      }
      this.editShift = this.editShift.bind(this);
      this.displayShift = this.displayShift.bind(this);
      this.cancelAllShift = this.cancelAllShift.bind(this);
      this.submitUpdate = this.submitUpdate.bind(this);
      this.formatTime = this.formatTime.bind(this);
    };
    editShift(){
    	this.setState({editShift: true});
    }
    cancelAllShift(){
      this.props.weekTimeAct.cancelAllShift(this.props._id);
    }
    formatTime(time){
      let hour = Math.round(time -0.5);
      let minute = Math.round((time % 1)*60);
      return (
          <label>
            {hour}h{(minute<10?'0':'')}{minute}
          </label>
        )
    }
    displayShift(shift){
      let hour = Math.round(shift.start -0.5);
      let minute = (shift.start % 1)*60;
      return (
          <z>
            từ {this.formatTime(shift.start)} đến {this.formatTime(shift.end)} 
          </z>
        );
    }
    submitUpdate(submitData){
      this.props.updateShift(submitData);
      this.setState({editShift: false});
    }
   render() {
    let day = this.props;  
    let style = {
      height: this.state.editShift ? '25em' : '5em'
    }
      return (
         <ListItem
         style={style}
          className="list-item"
          primaryText={day.weekDay} 
          rightAvatar={ 
            <div className="btn-group" role="group" aria-label="...">
              <button type="button" className="btn btn-primary"
              onClick = {this.editShift} >Sửa</button>
              <button type="button" className="btn btn-danger"
              onClick = {this.cancelAllShift}>Nghỉ</button> 
            </div>
          }> 
          { this.state.editShift ? null: (
            <p className="info-list">
              Sáng: {day.morningShift?this.displayShift(day.morningShift):'Không có ca sáng'} <br/>
              Tối: {day.nightShift?this.displayShift(day.nightShift):'Không có ca tối'}
            </p>
          )} 
          <div className="edit-list">
         	 {this.state.editShift ? 
         	 	<WeekDayShift  
            weekDay = {day}
         	 	submitUpdate={this.submitUpdate} 
            ></WeekDayShift>: null} 
          </div>
          </ListItem>   
      )
   }
}