import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Editor from './Editor';
import Previewer from './Previewer';

class MainBody extends Component{
	constructor(){
		super()
		this.state={
			maximized: false,
			previewerMaximized: false,
			editorOpacity: true
		}
	}

	onSizeChange = (event) => {
		this.setState(function(prevState){
			return{
				maximized: !prevState.maximized
			}
		})
	}

	onPreviewerSizeChange = (event) => {
		this.setState(function(prevState){
			return{
				previewerMaximized: !prevState.previewerMaximized,
				editorOpacity: !prevState.editorOpacity
			}
		})
	}

	render(){
		// console.log(this.state)
		return(
		<div
    		style={{
    			width: '100%',
      			textAlign: 'center',
      			marginBottom: `1.45rem`,
    	}}
 			 >
  			{<Editor sizeChange={this.onSizeChange} maximized={this.state.maximized} editorOpacity={this.state.editorOpacity} />}
 			{!this.state.maximized && <Previewer sizeChange={this.onPreviewerSizeChange} previewerMaximized={this.state.previewerMaximized} />}  
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