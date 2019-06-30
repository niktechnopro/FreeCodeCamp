import React, {Component} from 'react';
import { Animated, View, Text, StyleSheet, Easing } from 'react-native';


export default class PulsingDots extends Component {

	static defaultProps = {
		color: "#1e90ff",
		size: 10,
		betweenSpace: 5
	};

	state = {//same as this.state
		scales: [new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]
	};


	componentDidMount() {
		this.handleAnimationIn();
	}

	componentWillUnmount() {
		this.unmounted = true;
	}

	handleAnimationIn = (i) => {
        Animated.timing(
        	this.state.scales[0], {
            toValue: 0.5,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(
        	()=>this.handleAnimationOut()
        )
    }

    handleAnimationOut = (i) => {
    	Animated.timing(
        	this.state.scales[0], {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(
        	()=>this.handleAnimationIn()
        )
    }

    animatedComponent = (value, index) => {
    	let offSet = index*5;
    	return(
    		<Animated.View 
				style={[
				styles.circle,
				{left: offSet},
				{scaleX: this.state.scales[index]},
				{scaleY: this.state.scales[index]}
				]}
			/>	
    	)
    }


	render() {
		const { size, betweenSpace, color } = this.props;
		return (
			<View style={styles.lineOfCircles}>
				{this.state.scales.map((value, index)=>{
					return this.animatedComponent(value, index)
				})

				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	lineOfCircles:{
		flexDirection: 'row'
	},
	circle:{
		width: 40,
		height: 40,
		borderRadius: 50,
		borderColor: "#1e90ff",
		borderWidth: 2,
		backgroundColor: "#1e90ff"
	}
})
