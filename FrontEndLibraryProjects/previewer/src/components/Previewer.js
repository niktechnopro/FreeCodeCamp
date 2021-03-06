import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MarkdownPreview } from 'react-marked-markdown';
// import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCompressArrowsAlt, faClipboardList, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

const Previewer = (props) => (
  <div className="previewerWrap" style={{width: props.previewerMaximized ? '100%' : '75%', marginTop: props.previewerMaximized ? '-17rem' : 0}}>
  <div id="editorToolbar">
    <div className="leftIcon"><FontAwesomeIcon icon={faClipboardList} /><span className="windowName">Previewer</span></div>
    <div className="rightIcon" onClick={props.sizeChange}>
      {!props.previewerMaximized ? 
        <FontAwesomeIcon icon={faArrowsAlt} />
        :
        <div className="minimizeIcon">
          <FontAwesomeIcon icon={faCompressArrowsAlt} />
        </div>
      }
    </div>
  </div>
    <div
      id="preview"
      style={{minHeight: props.previewerMaximized ? '33rem' : '12rem'}}
    >
    <MarkdownPreview value={props.inEditor} />
    </div>    
  </div>
)

export default Previewer;