import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class MyIcon extends Component {

	render(){
		return(
			<Icon
				name="closecircleo" 
				size={40}
				color="#fff"
			/>
		)
	}
}

export default class CloseButton extends Component{
	

	handlePressIn = (e) => {
		this.props.closeApp()
	}

	render(){
		return(
			<TouchableOpacity
	    		onPressIn={this.handlePressIn}
	    		onPressOut={this.handlePressOut}
    		>
      			<MyIcon />
			</TouchableOpacity>
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
