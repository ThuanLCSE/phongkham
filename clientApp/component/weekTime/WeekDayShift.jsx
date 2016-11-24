import React from 'react'; 
var TimeInput = require('time-input');
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle'; 
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class WeekDayShift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      morningShiftOn: false,
      nightShiftOn: false,
      morningShift:{
        start: null,
        end: null
      },
      nightShift:{
        start: null,
        end: null
      }
    } 
    this.setMorningShift = this.setMorningShift.bind(this);
    this.setNightShift = this.setNightShift.bind(this);
    this.submitShift = this.submitShift.bind(this);
    this.handleMorningStartHour = this.handleMorningStartHour.bind(this);
    this.handleMorningEndHour = this.handleMorningEndHour.bind(this);
    this.handleNightStartHour = this.handleNightStartHour.bind(this); 
    this.handleNightEndHour = this.handleNightEndHour.bind(this); 
   
  }
  componentDidMount(){
    if (this.props.weekDay.morningShift){
      this.setState({
          morningShift: this.props.weekDay.morningShift,
          morningShiftOn: true
          });
    }
     if (this.props.weekDay.nightShift){
      this.setState({
          nightShift: this.props.weekDay.nightShift,
          nightShiftOn: true
          });
    }
  }
  setMorningShift() {
    this.setState({morningShiftOn: !this.state.morningShiftOn});
  }

  setNightShift(e) {
    this.setState({nightShiftOn: !this.state.nightShiftOn});  
  }
  handleMorningStartHour(e, date){ 
    var startTime = date.getHours()+ date.getMinutes()/60; 
    this.setState({morningShift:{
      start: startTime,
      end: this.state.morningShift.end
    }
    });
  }
  handleMorningEndHour(e,date){ 
    var endTime = date.getHours()+ date.getMinutes()/60; 
     this.setState({morningShift:{
        start: this.state.morningShift.start,
        end: endTime
      }
    });
  }
  handleNightStartHour(e,date){ 
    var startTime = date.getHours()+ date.getMinutes()/60; 
    this.setState({nightShift: {
      end: this.state.nightShift.end,
      start: startTime}
    });
  } 
  handleNightEndHour(e, date){ 
    var endTime = date.getHours()+ date.getMinutes()/60; 
    this.setState({nightShift: {
      start: this.state.nightShift.start,
      end: endTime
    }
    });
  } 
  submitShift() { 
    let submitData= {
      weekDayId:this.props.weekDay._id
    }; 
      submitData.morningShift = this.state.morningShiftOn?this.state.morningShift:null; 
      submitData.nightShift = this.state.nightShiftOn?this.state.nightShift:null; 
    this.props.submitUpdate(submitData); 
  }
  formatTime(time){
      let hour = Math.round(time -0.5);
      let minute = Math.round((time % 1)*60);
      var time = new Date(0,0,0,hour,minute,0,0);
      return time+"";
    }
  morningShiftForm(){
       let startHour = Math.round(this.state.morningShift.start -0.5);
      let startMin = Math.round((this.state.morningShift.start % 1)*60);
      let endHour = Math.round(this.state.morningShift.end -0.5);
      let endMin = Math.round((this.state.morningShift.end % 1)*60);
      let style ={
        width: '5em'
      }
      let inlineFlex = {
            display: 'inline-flex',
            marginBottom: 0
      }
    return(
          <ul style={inlineFlex} className="list-group">
          <li className="list-group-item">
          Bắt đầu 
            <TimePicker
              style={style}
              name="begin"
              format="24hr" 
              value={new Date(0,0,0,startHour,startMin,0,0)}
              onChange={this.handleMorningStartHour}/>  
              </li>
              <li className="list-group-item">
            Kết thúc
             <TimePicker
               style={style}
              name="end"
              format="24hr" 
              value={new Date(0,0,0,endHour,endMin,0,0)}
              onChange={this.handleMorningEndHour}/> 
         </li>
        </ul>
      )
  } 
  nightShiftForm(){
      let startHour = Math.round(this.state.nightShift.start -0.5);
      let startMin = Math.round((this.state.nightShift.start % 1)*60);
      let endHour = Math.round(this.state.nightShift.end -0.5);
      let endMin = Math.round((this.state.nightShift.end % 1)*60);
      let style ={
        width: '5em'
      }
      let inlineFlex = {
            display: 'inline-flex',
            marginBottom: 0
      }
    return(
         <ul style={inlineFlex} className="list-group">
          <li className="list-group-item">
            Bắt đầu
            
            <TimePicker
             style={style}
              name="begin"
              format="24hr" 
              value={new Date(0,0,0,startHour,startMin,0,0)}
              onChange={this.handleNightStartHour}/> 
          </li>
          <li className="list-group-item">
            Kết thúc
            <TimePicker
             style={style}
              name="end"
              format="24hr" 
              value={new Date(0,0,0,endHour,endMin,0,0)}
              onChange={this.handleNightEndHour}/>
          </li>
        </ul>
      )
  } 
  render() { 
    
    return ( 
   
      <ul className="list-group">
       <li className="list-group-item inline-table">
         <Toggle  
         label="Ca sang"
              toggled={this.state.morningShiftOn} 
              onToggle={this.setMorningShift}/>   
        {this.state.morningShiftOn?this.morningShiftForm():null} 
        </li>
        <li className="list-group-item inline-table">
        <Toggle  
        label="Ca tối"
              toggled={this.state.nightShiftOn} 
              onToggle={this.setNightShift}/>     
              
        {this.state.nightShiftOn?this.nightShiftForm():null}
        </li>
        <br/>
        <button type="button" className="btn btn-primary" onClick={this.submitShift}>
           Cập nhật
        </button>
      </ul> 
      );
  }
  }

export default WeekDayShift;
