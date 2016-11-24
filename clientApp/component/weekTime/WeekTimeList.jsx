import React from 'react'; 
import WeekDay from './WeekDayItem.jsx';
import {List, ListItem} from 'material-ui/List';

// import styles from '../../css/doctor.css';

class WeekTimeList extends React.Component {
    constructor(props) {
      super(props);   
      console.log('event component');
      this.props.refreshList(); 
      this.updateShift = this.updateShift.bind(this);
    };
    updateShift(submitData) { 
      this.props.weekTimeAct.updateShiftInDay(submitData); 
      this.props.refreshList(); 
    }
	render() {
 	 return (  
          <div> 
           
             <List>
               {this.props.weekTimeRes.weekTime.map(weekDay => 
                 <WeekDay error={this.props.weekTimeRes.error} 
                 updateShift = {this.updateShift} 
                 key={weekDay._id} {...weekDay} />
                )}
             </List>
              <p className="error"><i className="fa fa-warning" aria-hidden="true"></i> 
            {this.props.weekTimeRes.error} 
            </p>
          </div>
		)
	};
}
export default  WeekTimeList;
