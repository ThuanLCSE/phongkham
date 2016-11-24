import React from 'react'; 
class bookingForm extends React.Component {
  constructor(props) {
    super(props); 
    
    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
   
  } 
  propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        inputClassName: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        label: React.PropTypes.string
    }
  componentDidMount(){
   
  }
  handleName(e){
    this.props.handleChange('name',e.target.value);
  }
  handlePhone(e){
    this.props.handleChange('phone',e.target.value);
  }
  handleAddress(e){
    this.props.handleChange('address',e.target.value);
  }
  tooltipError(error){
    return (
        <div className="tooltip bottom error-tooltip" role="tooltip"> 
          <div className="tooltip-arrow"></div> 
          <div className="tooltip-inner">{error}</div> 
        </div>
      )
  }
  validName(name){
    var isValid = true; 
    var regEx = /[^.,_=+!@\\\/*()^%$#-]*/g;
    var result = regEx.exec(name);
    if (name && result && result[0] !== name){
      isValid = false;
    } 
    return isValid;
  }
  validPhone(phone){
    var isValid = true; 
    var regEx = /(\+84|0)\d{9,10}/g;
    var result = regEx.exec(phone);
    if (phone && !result){
      isValid = false;
    } else
    if (phone && result && result[0] !== phone ){
      isValid = false;
    } 
    return isValid;
  }
  render() { 
    var inputNameClass = !this.props.user.name? 'input-clean ' : 'input-dirty';
    var inputPhoneClass = !this.props.user.phone? 'input-clean' : 'input-dirty';
    var inputAddressClass = !this.props.user.address? 'input-clean' : 'input-dirty';
    return ( 
            <form className="border-form">
              <div className="input-line">
                <label htmlFor="name" className="input-label">Vui lòng nhập tên:</label> 
                <input name="name" className={inputNameClass+' name-input'}
                 type="text" value={this.props.user.name}  required 
                onChange={this.handleName}/>
                {this.validName(this.props.user.name)?null:this.tooltipError('Nhập tên hợp lệ, không ký tự đặc biệt')}
              </div>
              

             <div className="input-line">
              <label htmlFor="phone" className="input-label">Vui lòng nhập số điện thoại:</label>
               <input name="phone" className={inputPhoneClass+' phone-input'} type="text" value={this.props.user.phone}  required 
                onChange={this.handlePhone}/>
                {this.validPhone(this.props.user.phone)?null:this.tooltipError('Nhập số điện thoại hợp lệ')}
              </div>
              

              <div className="input-line">
                <label htmlFor="address" className="input-label">Địa chỉ</label>
               
                <input name="address" className={inputAddressClass} type="text" value={this.props.user.address}  required 
                onChange={this.handleAddress}/>
              </div>
                
              </form> 
      );
  }
  }

export default bookingForm;
