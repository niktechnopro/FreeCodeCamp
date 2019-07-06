import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated
} from "react-native";
import Slider from '@react-native-community/slider';
import LocalStorage from './components/LocalStorage';
import Tts from "react-native-tts";


export default class SettingsPage extends Component{
	constructor(){
		super()
		this.state = {
			voices: [],
			ttsStatus: "initializing",
			selectedVoice: "en-US-language",
			speechRate: 0.5,
			speechPitch: 1,
			fadeAnimation: new Animated.Value(0),
		}
	}

	componentDidMount = () => {
		Animated.timing(
	      this.state.fadeAnimation,
	      {
	        toValue: 1,
	        duration: 1000,
	        useNativeDriver: true
	      }
	    ).start();
		Tts.getInitStatus().then(() => {
        	this.initializingTts();
        	// Tts.addEventListener('tts-start', (event) => console.log("start", event));

			// Tts.addEventListener('tts-finish', (event) => console.log("finish", event));

			// Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
      	}, (err) => {
      		this.setState({
				ttsStatus: "Not detected!"
			})
	        if (err.code === 'no_engine') {
	          Tts.requestInstallEngine();
	        }
      	});
	}

	initializingTts = () => {
		let availableVoices;
		Tts.setDefaultLanguage('en-IE');
		Tts.setDefaultVoice("en-US-language");
		Tts.setDefaultRate(this.state.speechRate, true);
    	Tts.setDefaultPitch(this.state.speechPitch);
    	Tts.setDucking(true);
    	Tts.voices()
    	.then(voices =>{
    		availableVoices = voices.filter(v => !v.networkConnectionRequired && !v.notInstalled).map(v=>{
    			return { id: v.id, name: v.name, language: v.language };
    		});
    		this.setState({
        		voices: availableVoices,
        		ttsStatus: "Detected!"
      		},()=>{
      			console.log(availableVoices);
      			Tts.speak('This is how I talk');
      		});
    	})
    	.catch(error => {
    		console.log(error)
    		this.setState({
        		ttsStatus: "No Voice Engine"
        	})
    	})
	}

	setTheVoice = (voice) => {
		Tts.stop();
		Tts.setDefaultVoice(voice.id);
		this.setState({
			selectedVoice: voice.name
		},()=>{
			Tts.speak("This is how I talk");
		})
	}

	setSpeechPitch = async rate => {
    	await Tts.setDefaultPitch(rate);
    	this.setState({ speechPitch: rate },()=>{
    		Tts.stop();
    		Tts.speak("This is how I talk");
    	});

  	};

  	setSpeechRate = async rate => {
    	await Tts.setDefaultRate(rate);
    	this.setState({ speechRate: rate },()=>{
    		Tts.stop();
    		Tts.speak("This is how I talk");
    	});
  	};

	renderVoiceItem = ({ item }) => {
	    return (
	      	<TouchableOpacity
                key = {item.id}
                style = {styles.listBox}
                onPress = {() => this.setTheVoice(item)}>
                <Text style = {styles.listText}>
                    {item.name}
                </Text>
            </TouchableOpacity>
	   	);
  	};

  	storeData = async () => {
  		let tempData = {
			ttsStatus: this.state.ttsStatus,
			selectedVoice: this.state.selectedVoice,
			speechRate: this.state.speechRate,
			speechPitch: this.state.speechPitch
  		}
  		let toStore = JSON.stringify(tempData);
    	LocalStorage.setItem('wBoxSettings', toStore);
    	this.props.goodToGo(false);
	}

	resetAll = () => {
		this.setState({
			selectedVoice: "en-US-language",
			speechRate: 0.7,
			speechPitch: 1
		},()=>{
			this.initializingTts();
		})
	}

	render(){
		return(
			<ScrollView>
			<Animated.View style={[styles.container, {opacity: this.state.fadeAnimation}]}>
				<Text style={styles.title}>Quick Set Up</Text>
				<View style={styles.innerContainer}>
					<Text style={styles.label}>Speech Engine: {this.state.ttsStatus}</Text>

					<View style={styles.sliderContainer}>
			          <Text
			            style={styles.label}
			          >Speed: 
			          </Text>

			        <View style={{borderRadius: 50, overflow: 'hidden'}}>   
			        <View style={{flexDirection: 'row', position: 'absolute'}}>
               			 <View style={styles.sliderDummy}></View>
            		</View>
			          <Slider
					    style={styles.slider}
					    minimumValue={0.01}
					    maximumValue={0.99}
					    value={this.state.speechRate}
					    minimumTrackTintColor="rgba(0, 122, 255, 0.5)"
					    maximumTrackTintColor="#000000"
					    onSlidingComplete={this.setSpeechRate}
					  />
					</View>

			        </View>

			        <View style={styles.sliderContainer}>
			          <Text
			            style={styles.label}
			          >Pitch: 
			          </Text>


			        <View style={{borderRadius: 50, overflow: 'hidden'}}>   
			        <View style={{flexDirection: 'row', position: 'absolute'}}>
               			 <View style={styles.sliderDummy}></View>
            		</View>
			          <Slider
					    style={styles.slider}
					    minimumValue={0.1}
					    maximumValue={2}
					    value={this.state.speechPitch}
					    minimumTrackTintColor="rgba(0, 122, 255, 0.5)"
					    maximumTrackTintColor="#000000"
					    onSlidingComplete={this.setSpeechPitch}
					  />
			        </View>

			        </View>
			     	<View>
			     		<Text
			            style={styles.label}
			          	>Select desired voice: 
			          	</Text>
			          	<View style={{width: "100%", position: "absolute", top: 40}}>
				          	<Text
				            style={styles.subLabel}
				          	>selected: {this.state.selectedVoice}
				          	</Text>
			          	</View>
			          	<View style={styles.flatlistBox}>
				     		<FlatList
				     			style={styles.flatlist}
	          					keyExtractor={item => item.id}
	          					renderItem={this.renderVoiceItem}
	          					extraData={this.state.selectedVoice}
	          					data={this.state.voices}
	        				/>	
         				</View>
         			</View>
				</View>
				<View>
					<TouchableOpacity
	                		style = {styles.saveSettings}
	                		onPress = {this.storeData}
	                	>
	            		<Text style = {styles.saveText}>
	               			Good to Go!
	            		</Text>
	            	</TouchableOpacity>
            	</View>
			</Animated.View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 2,
		alignItems: 'center',
		backgroundColor: "#F5FCFF",
		paddingBottom: 50
	},
	title:{
		padding: 10,
    	fontSize: 45,
    	// color: '#fff',
    	color: 'rgba(0, 122, 255, 1)',
    	fontWeight: "bold",
    	textShadowColor: 'rgba(99, 99, 99, 0.75)',
    	textShadowOffset: {width: -3, height: 2},
    	textShadowRadius: 10,
    	textAlign: 'justify'
	},
	innerContainer:{
		flex:1,
		width: "90%",
		// borderColor: "red",
		// borderWidth: 4,
		alignItems: 'center'

	},
	label: {
    	textAlign: "center",
    	padding: 10,
    	fontSize: 20,
    	fontWeight: "bold"
  	},
  	subLabel:{
  		textAlign: "left",
    	padding: 4,
    	fontSize: 18,
    	fontWeight: "bold"
  	},
	sliderContainer: {
    	flexDirection: "row",
    	justifyContent: "center",
    	alignItems: "center"
  	},
  	listContainer: {
    	flexDirection: "row",
    	justifyContent: "flex-start",
    	alignItems: "flex-start"
  	},
  	slider: {
    	width: 180,
    	height: 40,
    	borderRadius: 50,
    	color: "blue"
  	},
  	listBox:{
  		width: 250,
  		borderRadius: 10,
  		paddingVertical: 5,
  		paddingHorizontal: 2,
	    marginTop: 3,
	    backgroundColor: 'rgba(0, 122, 255, 0.1)',
	    alignItems: 'center',
  	},
  	listText: {
  		fontWeight: "bold",
  		fontSize: 19,
      	color: '#4f603c'
   	},
   	flatlist:{
   		height: 120
   	},
   	flatlistBox:{
   		height: 120,
   		marginTop: 39,
   		width: 250,
   		borderWidth:5,
   		borderColor: 'rgba(0, 122, 255, 0.5)',
   		borderRadius: 10
   	},
   	sliderDummy: {
	    backgroundColor: 'rgba(0, 122, 255, 0.05)',
	    width: 180,
	    height:40,
	    borderRadius: 50,
	    position: 'absolute',                
    },
    saveSettings:{
    	width: 250,
  		borderRadius: 10,
  		paddingVertical: 10,
  		paddingHorizontal: 2,
  		padding: 5,
	    backgroundColor: 'rgba(0, 122, 255, 0.6)',
	    alignItems: 'center',
	    marginTop: 20
    },
    resetSettings:{
    	width: 250,
  		borderRadius: 10,
  		paddingVertical: 10,
  		paddingHorizontal: 2,
  		padding: 5,
	    backgroundColor: 'rgba(234, 121, 121, 0.8)',
	    alignItems: 'center',
	    marginTop: 10
    },
    saveText:{
    	fontWeight: "bold",
  		fontSize: 21,
      	color: '#fff'
    }
})

// <View>
// 					<TouchableOpacity
// 	                		style = {styles.resetSettings}
// 	                		onPress = {this.storeData}
// 	                	>
// 	            		<Text style = {styles.saveText}>
// 	               			Reset to Defaults
// 	            		</Text>
// 	            	</TouchableOpacity>
//             	</View>
