import React, { Component, Fragment } from 'react';
import Wrapper from './components/Wrapper';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
    	<div id="pageWrapper" />
    		<h1 className="title">The Wisdom Box</h1>
      		<div className="App">
        		<Wrapper />
      		</div>
      		<Footer />
      </Fragment>
    );
  }
}

export default App;
