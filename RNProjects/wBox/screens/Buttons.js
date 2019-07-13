import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, UIManager, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

export default class Buttons extends Component{
	constructor(props){
		super(props)
		this.animatedValue = new Animated.Value(1);
		this.state = {
			index: 0
		}
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(prevProps.buttonReady !== this.props.buttonReady){
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		}
	}

	handlePressIn = (e) => {
		Animated.timing(this.animatedValue, {
			toValue: 0.7,
			duration: 50,
			useNativeDriver: true
		}).start(
			()=>{
				this.props.randomIndex();
			}
		);
	}

	handlePressOut = (e) => {
		Animated.timing(this.animatedValue, {
			toValue: 1,
			duration: 100,
			useNativeDriver: true
		}).start();
	}

	render(){
		const animatedStyle = {
			transform: [{scale: this.animatedValue}]
		}
		return(
			<TouchableOpacity
				activeOpacity={1}
        		onPressIn={this.props.buttonReady ? this.handlePressIn : null}
        		onPressOut={this.handlePressOut}
        		>
	      			<Animated.View style={[styles.buttonWrapper, animatedStyle]}>
	        			<Text style={styles.button}>{this.props.buttonReady ? "Get a Quote" : "Disabled"}</Text>
	      			</Animated.View>
    		</TouchableOpacity>
		)
	}
}


const styles = StyleSheet.create({
  button: {
  	padding: 18,
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
  	borderColor: '#fff',
  	borderWidth: 2,
  	shadowRadius: 3,
    shadowOpacity: 1,
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: {
      width: 0,
      height: 1
    }
  }

});


