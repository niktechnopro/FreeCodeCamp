import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Editor from './Editor';
import Previewer from './Previewer';

class MainBody extends Component{
	constructor(){
		super()
		this.state={
			maximized: false,

		}
	}

	onSizeChange = (event) => {
		this.setState(function(prevState){
			return{
				maximized: !prevState.maximized
			}
		})
	}

	render(){
		// console.log(this.state)
		return(
		<div
    		style={{
      			textAlign: 'center',
      			marginBottom: `1.45rem`,
    	}}
 			 >
  			<Editor sizeChange={this.onSizeChange} maximized={this.state.maximized} />
 			<Previewer />  
  		</div>
		)
	}
}

// MainBody.propTypes = {
//   siteTitle: PropTypes.string,
// }

// MainBody.defaultProps = {
//   siteTitle: ``,
// }

export default MainBody;