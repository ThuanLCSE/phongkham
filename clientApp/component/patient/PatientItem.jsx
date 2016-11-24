import React, { Component, PropTypes } from 'react';  
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

export default class PatientItem extends Component {
	constructor(props) {
      super(props);   
      this.state = {
      	editShift: false
      }
      this.treatPatient = this.treatPatient.bind(this);
    
    };
  	treatPatient(patientId){
  		var submitData=  {};
  		submitData.patientId = patientId;
  		this.props.treatPatient(submitData);
  	}
   render() {
     let style = {
      height: '14em',
      margin: '0.6em'
    }
      return (
      	<Paper zDepth={2} 
             style={style} >
              <table className="table table-striped"> 
                <thead>
                <tr>
                  <th>Số thứ tự</th>
                  <th><span className="label label-default">{this.props.bookingNumber}</span></th> 
                </tr>
              </thead>  
                <tbody>
                  <tr>
                    <td>Họ & tên</td>
                    <td>{this.props.name}</td> 
                  </tr>
                  <tr>
                    <td>Điện thoại</td>
                    <td>{this.props.phone}</td> 
                  </tr>
                  <tr>
                    <td>Địa chỉ</td>
                    <td>{this.props.address}</td> 
                  </tr>
                </tbody>
              </table> 
              <div className="item-right" >
                <FlatButton
                  className="ios-button"
                  label="Khám xong"
                  labelPosition="before"
                  secondary={true}
                  onClick={() => this.treatPatient(this.props._id)}  
                  icon={
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  }/> 
              </div>
          </Paper> 
          
          
          
        
      )
   }
}