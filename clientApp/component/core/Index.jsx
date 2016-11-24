import React from 'react'; 

class Home extends React.Component {
    constructor(props) {
      super(props); 
    }

	render() {
 	 return ( 
 	 	<div>
 	 		Home
          <a href="/doctor">sign in</a>
          {this.props.children}
         </div>
		);
	}
}

export default Home;
