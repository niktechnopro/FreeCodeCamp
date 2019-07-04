import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class CloseButton extends Component{
	constructor(props){
		super(props)
		this.animatedValue = new Animated.Value(1);
	}

	handlePressIn = (e) => {
		console.log("calling this method")
		Animated.spring(this.animatedValue, {
			toValue: 0.2,
			friction: 5,
			useNativeDriver: true
		}).start();
	}

	// handlePressOut = (e) => {
	// 	Animated.spring(this.animatedValue, {
	// 		toValue: 1,
	// 		friction: 3,
	// 		tension: 40,
	// 		useNativeDriver: true
	// 	}).start(
	// 		()=>console.log("close app pressed out");
	// 		// ()=>{this.props.closeApp()}
	// 	);
	// }

	render(){
		const animatedStyle = {
			transform: [{scale: this.animatedValue}]
		}
		return(
			<View>
			<TouchableNativeFeedback
        		onPressIn={this.props.buttonReady ? this.handlePressIn : null}
        		onPressOut={this.handlePressOut}
        		background={TouchableNativeFeedback.SelectableBackground()}>
      			<AnimatedIcon 
      				style={[styles.buttonWrapper, animatedStyle]}
        			name="closecircleo" 
        			size={40} 
        			color="#fff"
        		/>
    		</TouchableNativeFeedback>

    		<TouchableNativeFeedback
        		onPressIn={this.props.buttonReady ? this.handlePressIn : null}
        		onPressOut={this.handlePressOut}
        		background={TouchableNativeFeedback.SelectableBackground()}>
      			<Animated.View style={[styles.buttonWrapper, animatedStyle]}>
        			<Text style={styles.button}>Get a Quote</Text>
      			</Animated.View>
    		</TouchableNativeFeedback>
    		</View>
		)
	}
}


const styles = StyleSheet.create({
  button: {
  	padding: 0,
  	fontSize: 30,
  	color: '#fff',
  	fontWeight: "bold",
  	textShadowColor: 'rgba(0, 0, 0, 0.75)',
	textShadowOffset: {width: -1, height: 1},
	textShadowRadius: 10,
	borderColor: '#2980b6',
  },
  buttonWrapper: {
  	padding: 10,
  	alignItems: 'flex-end',
  }
});
