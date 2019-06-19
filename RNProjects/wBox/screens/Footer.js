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
		fontSize: 16,
		// color: "#2980b6"
		color: "#fff",
		textAlign: 'center'
	}
});