import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

//creating the store - takes 2 arguments: applymiddleware, reducers(first argument),
//applyMiddleware - is an enhancer, and in the middle optioanally - the initial state
//example: createStore(reducer, [preloadedState], [enhancer])
let store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>	
		<App />
	</Provider>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
