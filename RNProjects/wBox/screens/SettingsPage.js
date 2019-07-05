import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Slider,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Tts from "react-native-tts";


export default class SettingsPage extends Component{
	constructor(){
		super()
		this.state = {
			voices: [],
			ttsStatus: "initializing",
			selectedVoice: null,
			speechRate: 0.5,
			speechPitch: 1,
			someText: "some test text",
		}
	}

	componentDidMount = () => {
		Tts.getInitStatus()
		.then(() => {
			this.initializingTts();
			// Tts.addEventListener('tts-start', (event) => console.log("start", event));

			// Tts.addEventListener('tts-finish', (event) => console.log("finish", event));

			// Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
		})
		.catch(() => {
			this.setState({
				ttsStatus: "Not detected!"
			})
		})
	}

	initializingTts = () => {
		let availableVoices;
		Tts.setDefaultLanguage('en-IE');
		Tts.setDefaultRate(this.state.speechRate, true);
    	Tts.setDefaultPitch(this.state.speechPitch);
    	Tts.setDucking(true);
    	Tts.voices()
    	.then(voices =>{
    		availableVoices = voices.filter(v => !v.networkConnectionRequired && !v.notInstalled).map(v=>{
    			return { id: v.id, name: v.name, language: v.language };
    		})
    		console.log(availableVoices);
    		// Tts.setDefaultVoice(availableVoices[1].id);
    		this.setState({
        		voices: availableVoices,
        		ttsStatus: "Detected!"
      		},()=>{
      			Tts.speak('Hello, world!');
      		});
    	})
    	.catch(error => {
    		console.log(error)
    		this.setState({
        		ttsStatus: "No installed Voice"
        	})
    	})
	}

	setTheVoice = (voice) => {
		console.log(voice)
		this.setState({
			selectedVoice: voice.name
		})
	}

	renderVoiceItem = ({ item }) => {
		console.log(item)
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

	render(){
		return(
			<View style={styles.container} >
				<Text style={styles.title}>Quick Set Up</Text>
				<View style={styles.innerContainer}>
					<Text style={styles.label}>Speech Engine: {this.state.ttsStatus}</Text>

					<View style={styles.sliderContainer}>
			          <Text
			            style={styles.label}
			          >Speed: 
			          </Text>
			          <Slider
			            style={styles.slider}
			            minimumValue={0.01}
			            maximumValue={0.99}
			            value={this.state.speechRate}
			            onSlidingComplete={()=>console.log("do something here")}
			          />
			        </View>

			        <View style={styles.sliderContainer}>
			          <Text
			            style={styles.label}
			          >Pitch: 
			          </Text>
			          <Slider
			            style={styles.slider}
			            minimumValue={0.5}
			            maximumValue={2}
			            value={this.state.speechPitch}
			            onSlidingComplete={()=>console.log("do something here")}
			          />
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
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 26,
		flex: 1,
		alignItems: 'center',
		backgroundColor: "#F5FCFF"
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
		alignItems: 'flex-start'

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
    	width: 180
  	},
  	listBox:{
  		width: 250,
  		borderRadius: 10,
  		padding: 10,
	    marginTop: 3,
	    backgroundColor: 'rgba(0, 122, 255, 0.1)',
	    alignItems: 'center',
  	},
  	listText: {
  		fontWeight: "bold",
  		fontSize: 15,
      	color: '#4f603c'
   	},
   	flatlist:{
   		height: 120,
   	},
   	flatlistBox:{
   		marginTop: 39,
   		width: 250,
   		borderWidth:5,
   		borderColor: 'rgba(0, 122, 255, 0.5)',
   		borderRadius: 10
   	}
})