import React, { Component, Fragment } from 'react';
import Buttons from './Buttons';
import { connect } from 'react-redux';
import { getQuote, getTweet, getQuotesBlob } from '../actionCreators/actionCreators';
import {Animated} from "react-animated-css";

const animationsIn=['bounceInLeft', 'bounceInRight', 'flipInX', 'bounceInDown', 
					'bounceInUp', 'fadeInDownBig', 'rotateInDownLeft', 'rollIn',
					'zoomInDown', 'slideInUp', 'lightSpeedIn'];
const animationsOut=['bounceOutLeft', 'bounceOutLeft', 'flipOutX', 'bounceOutDown', 
					'bounceOutUp', 'fadeOutUpBig', 'rotateOutUpRight', 'rollOut', 'zoomOutUp',
					'slideOutUp', 'slideOutDown', 'lightSpeedOut']

class Wrapper extends Component {
	constructor(){
		super()
		this.state = {
			allquotes: [],
			firstLoad: true,
			animation: true,
			animationIn: 'bounceInRight',
			animationOut: 'bounceOutLeft' 
		}
	}

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.allquotes){
			this.setState({
				allquotes: nextProps.allquotes
			})
		}
		if(nextProps.newQuote){
			this.setState({
				firstLoad: false
			})
		}
	}
	
	componentDidMount = () => {
		//let's get a quote blob
		this.props.getQuotesBlob();
		this.setState({
			animation: true
		})
	}

	getTweet = () => {
		this.props.getTweet()
	}

	getRandAnimationIn = (min, max) => {
		//for random number in range:
	    let index = Math.floor(Math.random() * (max - min + 1)) + min;
	    return animationsIn[index];
	}

	getRandAnimationOut = (min, max) => {
		let index = Math.floor(Math.random() * (max - min + 1)) + min;
		return animationsOut[index];
	}

	getQuote = () => {
		//so wee need to generate random number 0..length of all quotes.length in action creator and select 
		//and use to select random quote
		let animationIn = this.getRandAnimationIn(0, animationsIn.length-1);
		let animationOut = this.getRandAnimationOut(0, animationsOut.length-1);
		console.log(animationIn, animationOut)
		this.setState((prevState)=>{
			return{
				animation: !prevState.animation,
				animationOut: animationOut,
				animationIn: animationIn
			}
		})
		setTimeout(()=>{
			this.setState((prevState)=>{
				return{
					animation: !prevState.animation
				}
			});
			this.props.getQuote(this.state.allquotes);
		}, 800)
	}

	render(){
		console.log(this.props)
		return(
			<Fragment>
			<div id="quote-box">
			<Animated animationIn={this.state.animationIn} animationOut={this.state.animationOut} isVisible={this.state.animation}>
				<div id="quote-wrapper" >
					<blockquote id="text" style = {{textAlign: this.state.firstLoad ? 'center' : 'left'}}cite="https://gist.githubusercontent.com/">{this.state.firstLoad ? 'Press The Button for a Quote' : this.props.newQuote}</blockquote>
					<div id="author">
						<cite>{this.props.author}</cite>
					</div>
				</div>
			</Animated>	
				<Buttons quote={this.getQuote} tweet={this.getTweet} />
			</div>
			</Fragment>
		)
	}
	
}

const mapStateToProps = (state) => {
	return{
		allStates: state,
		newTweet: state.tweet,
		newQuote: state.quote.quote,
		error: state.error,
		allquotes: state.allquotes,
		author: state.quote.author,
		animations: state.animations
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		getTweet: () => dispatch(getTweet()),
		getQuote: (quotes, animations) => dispatch(getQuote(quotes)),
		getQuotesBlob: () => dispatch(getQuotesBlob()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);