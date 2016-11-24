import React from 'react'; 
import PatientItem from './PatientItem.jsx';
import List from 'material-ui/List';

// import styles from '../../css/doctor.css';

class PatientList extends React.Component {
    constructor(props) {
      super(props);   
       this.props.refreshList();  
      this.treatPatient = this.treatPatient.bind(this);
    };
    treatPatient(submitData) { 
      this.props.treatPatient(submitData); 
      this.props.refreshList(); 
    }
    finishWork(){
      return (
        <h2>Về thôi pa ơi!!!
              <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
              <br/>
               Hú zeeee! 
              <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
              <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
            </h2>
        )
    }
	render() {
   
 	 return ( 
        <div>  
          <div className="item-right">   
            <i className="fa fa-users" aria-hidden="true"></i>
            Bệnh nhân: {this.props.patients.length} người
           </div>
           {this.props.patients.length == 0?this.finishWork(): null}
           {this.props.patients.map(patient => 
             <PatientItem
             treatPatient = {this.treatPatient} 
             key={patient._id} {...patient} />
            )}  

        </div>
		)
	};
}
export default  PatientList;
