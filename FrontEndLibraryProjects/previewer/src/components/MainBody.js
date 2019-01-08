import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Editor from './Editor';
import Previewer from './Previewer';

const placeholder = 
`
# Welcome to my React Markdown Previewer!
## it uses a react components package (react-marked-markdown) that helps to use Markdown easily.

## To Install it with npm:
\`\`npm install --save react-marked-markdown \`\`

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

class MainBody extends Component{
	constructor(){
		super()
		this.state={
			maximized: false,
			previewerMaximized: false,
			editorOpacity: true,
			inEditor: ""
		}
	}

	componentDidMount = () => {
		this.setState({
			inEditor: placeholder
		})
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

	onEditorChange = (event) => {
		let value = event.target.value;
		this.setState({
			inEditor: value
		})
	}

	render(){
		return(
		<div
    		style={{
    			width: '100%',
      			textAlign: 'center',
      			marginBottom: `1rem`,
    	}}
 			 >
 			 <h2>Type in Editor and see how it appears in Previewer</h2>
  			{<Editor sizeChange={this.onSizeChange} maximized={this.state.maximized} editorOpacity={this.state.editorOpacity} onEditorChange={this.onEditorChange} placeholder={placeholder} />}
 			{!this.state.maximized && <Previewer sizeChange={this.onPreviewerSizeChange} previewerMaximized={this.state.previewerMaximized} inEditor={this.state.inEditor} />}  
  		</div>
		)
	}
}

MainBody.propTypes = {
	maximized: PropTypes.bool,
	previewerMaximized: PropTypes.bool,
	editorOpacity: PropTypes.func,
	inEditor: PropTypes.string
}

// MainBody.defaultProps = {
//   siteTitle: ``,
// }

export default MainBody;