import PropTypes from 'prop-types';
import React from 'react';

const Previewer = () => (
  <div
    style={{
      textAlign: 'center',
      marginBottom: `1.45rem`,
    }}
  >
  <h1>This is a Previewer portion</h1>
    
  </div>
)

Previewer.propTypes = {
  siteTitle: PropTypes.string,
}

Previewer.defaultProps = {
  siteTitle: ``,
}

export default Previewer;