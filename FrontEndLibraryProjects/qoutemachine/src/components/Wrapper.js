import React, { Component } from 'react';
import Buttons from './Buttons';
import { connect } from 'react-redux';
import { getQuote, getTweet } from '../actionCreators/actionCreators';

class Wrapper extends Component {

	getTweet = () => {
		console.log('tweet');
		this.props.getTweet()
	}

	getQuote = () => {
		console.log('new quote');
		this.props.getQuote()
	}

	render(){
		return(
			<div id="quote-box">
				<div id="text">
				</div>
				<div id="author">
				</div>
				<Buttons quote={this.getQuote} tweet={this.getTweet} />
			</div>
		)
	}
	
}

const mapStateToProps = (state) => {
	return{
		allStates: state
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		getTweet: () => dispatch(getTweet()),
		getQuote: () => dispatch(getQuote())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);