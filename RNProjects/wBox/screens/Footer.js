import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Footer = () => {
	return(
		<View style={styles.fContainer}>
			<Text style={styles.fText}>{'\u00A9'} Fun Project by Nik</Text>
		</View>
	)
} 

export default Footer;

const styles = StyleSheet.create({
	fContainer : {
		margin: 5
	},
	fText : {
		fontSize: 31,
		// color: "#2980b6"
		color: "#fff",
		textAlign: 'center',
		textShadowColor: '#000', 
		textShadowOffset: { width: 1.5, height: 2.5 }, 
		textShadowRadius: 1
	}
});