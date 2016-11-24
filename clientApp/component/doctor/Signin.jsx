import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';



// import styles from '../../css/doctor.css';

class Signin extends React.Component {
    constructor(props) {
      super(props); 
	    this.state = {}; 
	    this.state.username = 'bacsiDuc'; 
	    this.state.password = 'ringking';
	    this.doctorSignin = this.doctorSignin.bind(this);
	    this.updateUsername = this.updateUsername.bind(this);
	    this.updatePassword = this.updatePassword.bind(this);
    };
    doctorSignin(e){ 
    	 e.preventDefault(); 
    	 var data = {
    	 	username : this.state.username,
    	 	password: this.state.password
    	 } 
    	this.props.signInSubmit(data); 
    
    };
    updateUsername(e){
    	this.setState({username: e.target.value});
    };
    updatePassword(e){
    	this.setState({password: e.target.value});
    };
	render() {
 	 return (  
          <Paper className="form-material" zDepth={4} >

          <h2>Đăng nhập</h2> 
	        
            <div className="form-item"> 
            <i className="fa fa-ambulance label-icon" aria-hidden="true"></i>
              <TextField
               hintText="bác sĩ"
               value={this.state.username}
               onChange={this.updateUsername}
                floatingLabelText="Tên tài khoản"/>  
              </div>
            <div className="form-item">
            <i className="fa fa-address-card-o label-icon" aria-hidden="true"></i>
               <TextField
               hintText="mật khẩu"
               type="password"
               value={this.state.password}
               onChange={this.updatePassword}
                floatingLabelText="Mật khẩu"/>  
	              	  
            </div>
            <br/>
            <div className="item-middle">
             <RaisedButton label="Đăng nhập" primary={true} 
             onClick={this.doctorSignin}/>
            </div>
              <br/>
              
              <p className="error"><i className="fa fa-warning" aria-hidden="true"></i> {this.props.error === 'not auth'?'Nhập tài khoản hợp lệ':''}</p>
          </Paper>
		)
	};
}
export default  Signin;
