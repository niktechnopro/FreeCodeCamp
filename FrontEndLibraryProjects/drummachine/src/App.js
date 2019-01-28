import React, { Component, Fragment } from 'react';
import Main from "./components/Main";
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div id="wrapper">
          <header>
            <p id="title">My Drum Machine</p>
          </header>
          <main id="main">
            <Main />
          </main>
          <footer id="footer">Built with React.js</footer>
        </div>
      </Fragment>
    );
  }
}

export default App;
