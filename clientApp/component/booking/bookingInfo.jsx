import React from 'react';  

class bookingForm extends React.Component {
  constructor(props) {
    super(props);  
  }
  render() { 
    return ( 
      <div className="message-box">
        Họ và tên: <label>{this.props.user.name}</label> <br/>
        Số điện thoại: <label>{this.props.user.phone}</label> <br/>
        Địa chỉ: <label>{this.props.user.address}</label>  <br/>
        </div>
      );
  }
  }

export default bookingForm;
