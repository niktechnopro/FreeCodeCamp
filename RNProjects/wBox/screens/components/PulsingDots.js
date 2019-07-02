import React, {Component} from 'react';
import { Animated, View, Text, StyleSheet, Easing } from 'react-native';


export default class PulsingDots extends Component {

	static defaultProps = {
		color: "#1e90ff",
		size: 10,
		betweenSpace: 5
	};

	state = {//same as this.state
		scales: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]
	};


	componentDidMount() {
		// this.handleAnimationIn();
		this.animation();
	}

	componentWillUnmount() {
		this.unmounted = true;
	}

    animation = () => {

		function seq(self, i) {
			return Animated.sequence([
				Animated.timing(self.state.scales[i], {
					toValue: 1,
					duration: 300,
					delay: (i + 1) * 200,
					useNativeDriver: true
				}),
				Animated.timing(self.state.scales[i], 
					{ 
						toValue: 0.3, 
						duration: 300, 
						delay: 50,
						useNativeDriver: true 
					}
				)
			])
		}


		//executes first
		Animated.parallel([
			seq(this, 0), seq(this, 1), seq(this, 2)
		]).start(() => {
			if (!this.unmounted)
				this.animation();
		});
	};

    animatedComponent = (value, index) => {
    	let offSet = index*2;
    	return(
    		<Animated.View
    			key={offSet} 
				style={[
				styles.circle,
				{left: offSet},
				{transform : [{scale: this.state.scales[index]}]}
				]}
			/>	
    	)
    }

	render() {
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
		flexDirection: 'row',
		padding: 3,
	},
	circle:{
		width: 10,
		height: 10,
		borderRadius: 50,
		backgroundColor: "#1e90ff"
	}
})
