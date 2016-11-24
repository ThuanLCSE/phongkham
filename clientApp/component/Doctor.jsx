import React from 'react'; 
import * as bookingAction from '../action/bookingAction.js';
import * as doctorAction from '../action/doctorAction.js';
import * as weekTimeAction from '../action/weekTimeAction.js';
import SignIn from './doctor/Signin.jsx'; 
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import PatientList from './patient/PatientList.jsx';
import WeekTimeList from './weekTime/WeekTimeList.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import styles from '../../css/doctor.css';

class Doctor extends React.Component {
    constructor(props) {
      super(props); 

      this.state= { 
        view: 'home'
      };     
      this.listAllWeekDay = this.listAllWeekDay.bind(this);
      this.signInForm = this.signInForm.bind(this);
       this.timeList = this.timeList.bind(this);  
      this.authenticatedPart = this.authenticatedPart.bind(this);
      this.patientList = this.patientList.bind(this);
      this.removeAllPatient = this.removeAllPatient.bind(this);
      this.listAllPatient = this.listAllPatient.bind(this);
      this.signOut = this.signOut.bind(this); 
      this.handleChange = this.handleChange.bind(this);
    }; 
    removeAllPatient(){
      this.props.bookingAct.resetAllBooking();
    } 
  signOut(){
    this.setState({view: 'home'})
    this.props.doctorAct.signOut();
  }
  signInForm(){
    return (
       <SignIn signInSubmit={this.props.doctorAct.signIn} 
       error={this.props.doctorResult.error} /> 
      );
  } 
  listAllWeekDay(){
    this.props.weekTimeAct.listAll();
  }
  listAllPatient(){
    this.props.bookingAct.listAll();
  }
  patientList(){
    let style={
      fontSize: '1.5em'
    }
    return (
      <div>  
        <PatientList refreshList={this.listAllPatient}
            error = {this.props.bookingResult.error}
            treatPatient={this.props.bookingAct.treatedPatient} 
            patients={this.props.bookingResult.patients} />
            <div className="item-right">
               <RaisedButton label="Về nhà! Xóa toàn bộ" 
               onClick = {this.removeAllPatient}
                labelPosition="before"
                icon={
                  <i className="fa fa-home" aria-hidden="true"></i>
                }
               secondary={true} style={style} /> 
               <br/>
               <br/>
            </div>
      </div>    
    );
  }
  timeList(){
    return (
      <div> 
        <WeekTimeList refreshList={this.listAllWeekDay}
        weekTimeAct={this.props.weekTimeAct} 
        weekTimeRes={this.props.weekTimeResult} />
      </div>    
    );
  }
  handleChange(event, index, value){
    this.setState({view: value}); 
    if (this.state.view === 'bookingDay'){

    }
  }

  authenticatedPart(doctor){
    return (
        <div className="message-box">
           <i className="fa fa-user" aria-hidden="true"></i> {doctor.doctorName}
            <FlatButton
              label="Thoát"
               onClick = {this.signOut}
              primary={true}
              icon={<i className="fa fa-times" aria-hidden="true"></i>} /> 
              <br/>
            <DropDownMenu value={this.state.view} onChange={this.handleChange}> 
              <MenuItem value={'home'} primaryText="Trang chu" />
              <MenuItem value={'bookingDay'} primaryText="Lịch làm việc" />
              <MenuItem value={'patient'} primaryText="Người đăng ký" /> 
            </DropDownMenu> 
           
        </div>
      )
  }  
  render() { 
    let bien = {
      ok: true
    }
    let styles = {
      block: {
        maxWidth: 250,
      },
      toggle: {
        marginBottom: 16,
      }};
    let dtResult = this.props.doctorResult;
    return (  
          <div>   
           
            {!dtResult.doctorName?this.signInForm():null}
            {dtResult.doctorName?this.authenticatedPart(dtResult):null} 
             {this.state.view === 'bookingDay'?this.timeList(): null }
             {this.state.view === 'patient'?this.patientList():null}
          </div>
    )
  };
}

const mapStateToProps = state => ({ 
   doctorResult: state.auth,
   weekTimeResult: state.weekTime,
   bookingResult: state.booking
});

const mapDispatchToProps = dispatch => ({ 
    doctorAct: bindActionCreators(doctorAction, dispatch),
    weekTimeAct: bindActionCreators(weekTimeAction, dispatch),
    bookingAct: bindActionCreators(bookingAction, dispatch)
});
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Doctor); 
