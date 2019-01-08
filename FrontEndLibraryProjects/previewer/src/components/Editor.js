import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCompressArrowsAlt, faClipboardList, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';


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
    defaultValue= {props.placeholder}
    style={{height: props.maximized ? '30rem' : '12rem'}}
    onChange={props.onEditorChange}
  >
   
  </textarea>
  </div>
  </div>
)

export default Editor;