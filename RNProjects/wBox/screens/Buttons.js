import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Animated } from 'react-native';

export default class Wrapper extends Component{
	constructor(props){
		super(props)
		this.animatedValue = new Animated.Value(1);
	}


	handlePressIn = (e) => {
		Animated.spring(this.animatedValue, {
			toValue: 0.5
		}).start();
	}

	handlePressOut = (e) => {
		Animated.spring(this.animatedValue, {
			toValue: 1,
			friction: 3,
			tension: 40
		}).start();
	}

	render(){
		const animatedStyle = {
			transform: [{scale: this.animatedValue}]
		}
		return(
			<TouchableNativeFeedback
        		onPressIn={this.handlePressIn}
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
  	margin: 5,
  	fontSize: 20,
  	color: '#fff'
  },
  buttonWrapper: {
  	alignItems: 'center',
  	justifyContent: 'center', 
  	backgroundColor: 'grey',
  	borderRadius: 5
  }

});
