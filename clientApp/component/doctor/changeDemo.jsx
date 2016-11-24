import React from 'react'; 

export default class BoardManager extends React.Component{
  constructor(){
    super();
    this.state = {
      newForm : null
    };
    setTimeout(this.myFunction.bind(this), 4000)
  }
myFunction(){
	this.setState({
              newForm : true
            });
alert('ok');

}
  render(){
  	console.log('chg');
    return(
      <div>
      <div className="panel-group" id="collapse-parent" role="tablist" aria-multiselectable="true"> 
    <div id="collapseOne" className="panel-collapse collapse" role="tabpanel">
          <button className="btn btn-primary" data-toggle="collapse" data-target="#collapseTwo"
         data-parent="#collapse-parent" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button> 
    </div> 
    <div id="collapseTwo" className="panel-collapse collapse in" role="tabpanel">
        <button className="btn btn-primary collapsed" data-toggle="collapse" data-target="#collapseOne"
         data-parent="#collapse-parent" aria-expanded="false" aria-controls="collapseOne">
          Collapsible Group Item #2
        </button> 
    </div>
  
</div>
       
      dsafdsa 
        <button onClick={() => {
             
          }}>Add New</button>
          <button onClick={() => {
              this.setState({
                newForm : null
              });
              
            }}>Delete</button>
        {this.state.newForm ? <div>okdsaf</div>: null}
      </div>
    )
  }
}