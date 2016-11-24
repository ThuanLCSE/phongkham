import React from 'react'; 
import * as bookingAction from '../action/bookingAction.js';
import BookingForm from './booking/bookingForm.jsx'; 
import * as weekTimeAction from '../action/weekTimeAction.js';
import BookingDetail from './booking/bookingInfo.jsx'; 

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Patient extends React.Component {
    constructor(props) {
      super(props); 

      this.state= { 
         inputBookingForm: false,
         user: {
          name: '',
          phone: '',
          address: '',
          bookingNumber: 0
         },
         bookingDetail: false,
         datedModal: false
      };  
      this.bookNew = this.bookNew.bind(this);
      this.userNotRegister = this.userNotRegister.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this); 
      this.viewBookingForm = this.viewBookingForm.bind(this); 
      this.bookingForm = this.bookingForm.bind(this);
      this.bookingDetail = this.bookingDetail.bind(this);
      this.viewAmount = this.viewAmount.bind(this);
      this.submitEditBooking = this.submitEditBooking.bind(this);
      this.formatTime = this.formatTime.bind(this);
      this.showNearestShift = this.showNearestShift.bind(this);
      this.modalDateBooking = this.modalDateBooking.bind(this);

      this.viewBookingDetail = this.viewBookingDetail.bind(this);
      this.cancelBooking = this.cancelBooking.bind(this); 
      this.bookingBtn = this.bookingBtn.bind(this);
      this.bookingDone = this.bookingDone.bind(this);
      this.submitBookingBtn = this.submitBookingBtn.bind(this);
      this.viewDetailBtn = this.viewDetailBtn.bind(this);
       
       this.props.bookingAct.viewRegisterInfo();
       this.props.bookingAct.viewCurrentAmount();
       this.props.weekTimeAct.getNearestShift(); 
    };  
     componentDidUpdate(prevProps, prevState) {  
      if (!this.state.datedModal && this.props.bookingResult.user !== null &&
        this.props.weekTimeResult.nearShift.weekDay){
        $('#dateBooking').modal('show');
        this.setState({datedModal: true});
      }
    }
     viewBookingDetail(){
      // this.props.bookingAct.viewRegisterInfo();
      this.setState({user: this.props.bookingResult.user});
      this.setState({bookingDetail: true});
     }
    handleInputChange(attr, value){
      var newUser = this.state.user;
      newUser[attr] = value;
      this.setState({user: newUser}); 
    }
    viewBookingForm(){
      this.setState({bookingDetail: false});
    	this.setState({inputBookingForm: true});
    }
    bookingBtn(){
      return(
        <button type="button" data-toggle="collapse" data-target="#inputBooking"
             aria-expanded="false" aria-controls="inputBooking" 
        className="btn-round btn btn-primary" onClick = {this.viewBookingForm}>
            Bóc số
           </button>
        )
    }
    submitBookingBtn(){
      var submitForm= this.bookNew;
      if (this.props.bookingResult.user !== null){
          submitForm = this.submitEditBooking; 
      }
      return (
        <button className="btn-round btn btn-primary" type="button"
        onClick={submitForm}>
          Đồng ý<br/>
        </button>
        )
    }
    userNotRegister(){

    	return (
        <div className="item-middle">
           {this.state.inputBookingForm?this.submitBookingBtn():this.bookingBtn()}
           {this.showNearestShift()} 
    			
        </div>
    		)
    }
    bookNew(){ 

      var registerData = {};
      var newUser = {};
      newUser.name = this.state.user.name;
      newUser.phone = this.state.user.phone;
      newUser.address = this.state.user.address;
      registerData.user = newUser; 
      if (newUser.name && newUser.phone){
        this.props.bookingAct.register(registerData);
        $('#inputBooking').collapse('hide');
        this.setState({inputBookingForm: false});
      } 
    }
    submitEditBooking(){ 
      var registerData = {};
      var newUser = {};
      newUser.name = this.state.user.name;
      newUser.phone = this.state.user.phone;
      newUser.address = this.state.user.address;
      registerData.user = newUser; 
      this.props.bookingAct.editRegisterInfo(registerData);
      $('#inputBooking').collapse('hide');
      this.setState({inputBookingForm: false});
    }
    bookingForm(){
       
    	return (
    			 <div className="collapse" id="inputBooking">
              <div>
            <BookingForm handleChange={this.handleInputChange} 
                      user = {this.state.user}/>
            </div>
          </div>
    		)
    }
    modalDateBooking(nearShift,time){
      var today = (new Date());      
      return(
        <div className="modal fade" id="dateBooking" tabIndex="-1" 
               role="dialog" aria-labelledby="dateBooking"> 
                  <div className="modal-content modal-middle">
                    <div className="modal-header">
                      Phòng khám BS.Đức
                    </div>
                    <div className="modal-body">
                      Hẹn gặp bạn vào
                      {nearShift.nightShift?' buổi tối ':null}
                      {nearShift.morningShift?' buổi sáng ':null}
                      {nearShift.weekDayNumber === today.getDay()?'hôm nay':nearShift.weekDay}
                      (ngày {today.getDate()}/{today.getMonth()})
                      từ {this.formatTime(time.start)} đến {this.formatTime(time.end)}  <br/>
                      Địa chỉ: 42, đường 2/4, phường Vĩnh Hải, Nha Trang
                    </div>

                    <div className="item-middle">
                      Nhớ đến đúng giờ nhé!<br/>
                       Cám ơn và hẹn gặp bạn!<br/>
                      <button type="button" className="btn btn-primary"
                       data-dismiss="modal">Đồng ý</button> 
                    </div>
                  </div> 
              </div>
        )
    }
    editBookingBtn(){
         return(
           <button className="btn btn-primary btn-round" type="button" data-toggle="collapse" data-target="#inputBooking"
             aria-expanded="false" aria-controls="inputBooking" onClick = {this.viewBookingForm}>
                Sửa thông tin
             </button>
        )
    }
    viewDetailBtn(){
      return(
          <button className="btn btn-primary btn-round" onClick = {this.viewBookingDetail}>
                Xem thông tin 
           </button> 
        )
    }
    bookingDone(){
       let nearShift = this.props.weekTimeResult.nearShift; 
      let time = nearShift.morningShift?nearShift.morningShift:nearShift.nightShift;
      var today = (new Date());       
        return (
          <div className="item-middle">
          {this.modalDateBooking(nearShift,time)}
              <div className="message-box">
                  <div className="mini-corner" onClick = {this.cancelBooking}>
                  <i className="fa fa-close fa-fw" aria-hidden="true"></i>
                   Hủy số thứ tự
                 </div> 
                 Thời gian khám: <br/>
                 Từ {this.formatTime(time.start)} đến {this.formatTime(time.end)}
                 {nearShift.nightShift?' tối ':null}
                  {nearShift.morningShift?' sáng ':null}
                   {nearShift.weekDayNumber === today.getDay()?'hôm nay':nearShift.weekDay} 
                   ngày ({today.getDate()}/{today.getMonth()}) <br/>
                   Số thứ tự của bạn: {this.props.bookingResult.user.bookingNumber}<br/> 
              </div> 
              {this.state.inputBookingForm?this.submitBookingBtn():(
                this.state.bookingDetail?this.editBookingBtn():this.viewDetailBtn()
                )}
              <br/>
               
          </div>
        )
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
    showNearestShift(){
      let nearShift = this.props.weekTimeResult.nearShift;
      let bookedAmount = this.props.bookingResult.currentBookingAmount;
      let time = nearShift.morningShift?nearShift.morningShift:nearShift.nightShift;
      if (nearShift && time){
      return (
          <div className="">
            <div className="message-box">
              Bác sĩ sẽ làm việc vào {nearShift.weekDayNumber === (new Date()).getDay()?'Hôm nay':nearShift.weekDay} 
                {nearShift.nightShift?'buổi tối':null}
                {nearShift.morningShift?'buổi sáng':null}: {this.formatTime(time.start)} đến {this.formatTime(time.end)} 
                
            </div> 
          </div>
        )
      } else {
        return (
            <div>
            Bác sĩ đang có bận công việc dài hạn! <br/>
            Xin thông cảm! <br/> 
            Cám ơn bạn
            </div>
          )
      }
    }
    cancelBooking(){ 
      this.props.bookingAct.cancelRegister();
      this.setState({bookingDetail: false});
    }
     
    bookingDetail(){
      return(
          <div>
            <BookingDetail user={this.props.bookingResult.user}/> 
          </div>
        )
    }
    titleBar(){
      return (
          <label className="title-bar item-middle">
            Phòng khám <br/>
            BS. Lương Công Đức <br/>
            hân hạnh chào đón quý khách
          </label> 
        )
    }
    viewAmount(){
      this.props.bookingAct.viewCurrentAmount();
    }
    render(){
       
    	return(
          <div>    
            {this.titleBar()}
            {this.bookingForm()} 
            {this.state.bookingDetail?this.bookingDetail():null} 
      			{(this.props.weekTimeResult.nearShift.weekDay && this.props.bookingResult.user)?this.bookingDone():this.userNotRegister()}  
      			  
            
          </div>
    		)
    }
}

const mapStateToProps = state => ({  
  weekTimeResult: state.weekTime,
	bookingResult: state.booking
});

const mapDispatchToProps = dispatch => ({  
  weekTimeAct: bindActionCreators(weekTimeAction, dispatch),
	bookingAct: bindActionCreators(bookingAction, dispatch)
});
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Patient); 
