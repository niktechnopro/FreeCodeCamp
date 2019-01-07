import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCompressArrowsAlt, faCheckSquare, faClipboardList, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

const placeholder = 
`# Welcome to my React Markdown Previewer!

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

const Editor = (props) => (
  <div className="edWrap" style={{opacity: props.editorOpacity ? 1: 0 }}>
  <div className="editorWrap" style={{width: props.maximized ? '90%' : '60%'}}>
  <div id="editorToolbar">
    <div className="leftIcon"><FontAwesomeIcon icon={faClipboardList} /><span className="windowName">Editor</span></div>
    <div className="rightIcon" onClick={props.sizeChange}>
      {!props.maximized ? 
        <FontAwesomeIcon icon={faArrowsAlt} />
        :
        <div className="minimizeIcon">
          <FontAwesomeIcon icon={faCompressArrowsAlt} />
        </div>
      }
    </div>
  </div>
  <textarea 
    id="editor"
    placeholder="Type your markdown here"
    defaultValue= {placeholder}
    style={{height: props.maximized ? '30rem' : '12rem'}}
  >
   
  </textarea>
  </div>
  </div>
)

export default Editor;