import React, { Component } from 'react';
import Buttons from './Buttons';
import { connect } from 'react-redux';
import { getQuote, getTweet, getQuotesBlob } from '../actionCreators/actionCreators';

class Wrapper extends Component {

	// error !== "Network Error"

	componentDidMount = () => {
		//let's get a quote blob
		this.props.getQuotesBlob();
	}

	getTweet = () => {
		console.log('tweet');
		this.props.getTweet()
	}

	getQuote = () => {
		console.log('new quote');
		this.props.getQuote()
	}

	render(){
		console.log(this.props)
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
		allStates: state,
		newTweet: state.tweet,
		newQuote: state.quote,
		error: state.error,
		allquotes: state.allquotes
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		getTweet: () => dispatch(getTweet()),
		getQuote: () => dispatch(getQuote()),
		getQuotesBlob: () => dispatch(getQuotesBlob())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);