import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Animated } from 'react-native';

let index = 0;

export default class Wrapper extends Component{
	constructor(props){
		super(props)
		this.animatedValue = new Animated.Value(1);
		this.state = {
			index: 0
		}
	}

	handlePressIn = (e) => {
		Animated.spring(this.animatedValue, {
			toValue: 0.5,
			friction: 5,
			tension: 40
		}).start(
			()=>{
				this.randomIndex()
			}
		);
	}

	randomIndex = () => {
		index = Math.floor(Math.random()*this.props.length);
		if(this.state.index !== index){
			this.setState({
				index
			},()=>{
				this.props.getQuote(index);
			})
		}else{
			this.randomIndex();
		}
	}

	handlePressOut = (e) => {
		Animated.spring(this.animatedValue, {
			toValue: 1,
			friction: 3,
			tension: 40
		}).start();
	}

	render(){
		console.log(this.props.buttonReady);
		const animatedStyle = {
			transform: [{scale: this.animatedValue}]
		}
		return(
			<TouchableNativeFeedback
        		onPressIn={this.props.buttonReady ? this.handlePressIn : null}
        		onPressOut={this.handlePressOut}
        		background={TouchableNativeFeedback.SelectableBackground()}>
      			<Animated.View style={[styles.buttonWrapper, animatedStyle]}>
        			<Text style={styles.button}>Get a Quote</Text>
      			</Animated.View>
    		</TouchableNativeFeedback>
		)
	}
}


const styles = StyleSheet.create({
  button: {
  	padding: 30,
  	fontSize: 30,
  	color: '#fff',
  	fontWeight: "bold",
  	textShadowColor: 'rgba(0, 0, 0, 0.75)',
	textShadowOffset: {width: -1, height: 1},
	textShadowRadius: 10
  },
  buttonWrapper: {
  	alignItems: 'center',
  	justifyContent: 'center', 
  	backgroundColor: 'grey',
  	borderRadius: 50,
  	borderColor: '#2980b6',
  	borderWidth: 2
  }

});
