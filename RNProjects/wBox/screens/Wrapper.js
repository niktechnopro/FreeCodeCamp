import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, BackHandler, Animated} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import LocalStorage from './components/LocalStorage';
import Buttons from './Buttons';
import Footer from './Footer';
import CloseButton from './CloseButton';
import quotes from '../assets/quoteBlob';
import Tts from 'react-native-tts';

const quoteArrayLength = quotes.data.quotes.length;
const animationsIn = ["bounceIn", "bounceInDown", "bounceInUp", "bounceInLeft", "bounceInRight", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInUp", "fadeInUpBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "zoomIn", "zoomInDown", "zoomInUp", "zoomInLeft", "zoomInRight"];
const animationsOut = ["bounceOut", "bounceOutDown", "bounceOutUp", "bounceOutLeft", "bounceOutRight", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutUp", "fadeOutUpBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "zoomOut", "zoomOutDown", "zoomOutUp", "zoomOutLeft", "zoomOutRight"];
const direction = ["normal", "reverse", "alternate", "alternate-reverse"];

export default class Wrapper extends Component {
  constructor(){
    super()
    this.state={
      quote: "",
      author: "",
      animation: null,
      direction: "normal",
      autAnimation: null,
      fadeAnimation: new Animated.Value(0),
      speechReady: false
    }
    this.buttonReady = true;
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    Animated.timing(
      this.state.fadeAnimation,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();

      //to check if voice is possible
      Tts.getInitStatus().then(() => {
         LocalStorage.getItem('wBoxSettings')
          .then(result => {
            let tempData = JSON.parse(result);
            if(tempData.ttsStatus === "Detected!"){
              this.setState({
                speechReady: true
              }, ()=>{
                Tts.setDefaultVoice(tempData.selectedVoice);
                Tts.setDefaultRate(tempData.speechRate, true);
                Tts.setDefaultPitch(tempData.speechPitch);
                this.speakerTts("Press 'Get a Quote' button")
              })
            }
          })
          .catch(error => console.log("proble with asyncStorage"))
      }, (err) => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      });
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => true);
  }

  closeApp = () => {
    Animated.timing(
      this.state.fadeAnimation,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(
        ()=>{BackHandler.exitApp()}
      );
    //to close app and put it on the background
  }

  getQuote = (index) => {
    if(this.buttonReady){
      this.buttonReady = false;
      let animations = this.setAnimations();
      let author = ""
      try{
        let quote = quotes.data.quotes[index].quote;
        let temp = quotes.data.quotes[index].author;
        if(temp && temp.charAt(0).includes('-')){
          author = temp.substring(0);
        }else{
          author = temp;
        }
        this.setState({
          animation: animations.animationsOut,
          direction: animations.direction,
          autAnimation: animations.autAnimationOut
        },()=>{
            setTimeout(()=>{
              this.buttonReady = true;
              this.setState({
                quote,
                author: " - "+author,
                animation: animations.animationsIn,
                autAnimation: animations.autAnimationIn,
                ready: true},()=>{
                  // console.log("run speech right here", this.state.quote);
                  this.state.speechReady && this.speakerTts(this.state.quote + ". quote bY. " + this.state.author);
                })
            },800)
        })
      }catch{
        this.setState({
          quote: "Something went wrong, try again..."
        })
      }
    }
  }

  speakerTts = (quote) => {
    Tts.stop();
    Tts.speak(quote);
  }

  componentDidUpdate = () => {

  }

  setAnimations = () => {
    let indexIn = Math.floor(Math.random()*animationsIn.length);
    let indexOut = Math.floor(Math.random()*animationsOut.length);
    let autIndexIn = Math.floor(Math.random()*animationsIn.length);
    let autIndexOut = Math.floor(Math.random()*animationsOut.length);
    let directionIndex = Math.floor(Math.random()*direction.length);
    return {
      animationsIn : animationsIn[indexIn],
      animationsOut : animationsOut[indexOut],
      autAnimationIn : animationsIn[autIndexIn],
      autAnimationOut : animationsOut[autIndexOut],
      direction : direction[directionIndex]
    }
  }


  render() {
    return (
      <Animated.View style={[styles.mainContainer, {opacity: this.state.fadeAnimation}]}>
        <ImageBackground
          source = {require("../assets/flower.jpg")}
          style = {styles.backgroundImage}
          imageStyle={{
            resizeMode: 'cover' // works only here!
          }}
        >
          <View style={styles.container}>

            <View style={styles.closeAppWrapper} >
              <CloseButton closeApp={this.closeApp} />
            </View>

             <Text style={styles.title}>
                Wisdom Box
              </Text>
            <View
              style = {styles.bookFrame}
            >
              <Image
                source = {require("../assets/book.jpg")}
                style = {styles.insideImage}
                imageStyle={{
                  resizeMode: 'contain' // works only here!
                }}/>
                  <Animatable.Text 
                    style={styles.wisdomText} 
                    animation={this.state.animation} 
                    duration={850}
                    useNativeDriver={true}
                    >
                    {this.state.quote ? this.state.quote : "Press 'Get a Quote' button"}
                  </Animatable.Text>

                <View style={styles.authorBox}>
                  <Animatable.Text 
                    style={styles.author}
                    duration={850}
                    animation={this.state.autAnimation}
                    useNativeDriver={true}
                    >
                    {this.state.author}
                  </Animatable.Text>
                </View>
            </View>
            
            <View style={styles.buttonFrame}>
              <Buttons 
                getQuote={this.getQuote} 
                length={quoteArrayLength} 
                buttonReady={this.buttonReady}
              />
            </View>
          
          </View>
          <Footer />
        </ImageBackground>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backgroundImage:{
    width: "100%",
    height: "100%",
    flex: 1,
  },
  bookFrame:{
    padding: 2,
    width: "95%",
    minHeight: "40%",
    borderWidth: 5,
    borderRadius: 5,
    borderColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFrame:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideImage: {
    position: 'absolute',
    width: "100%",
    height: "100%",
  },
  title:{
    fontSize: 45,
    color: '#fff',
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  wisdomText:{
    padding: 10,
    fontSize: 25,
    color: '#000',
    fontWeight: "bold",
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'justify'
  },
  author:{
    padding: 10,
    fontSize: 20,
    color: '#000',
    fontWeight: "bold",
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'right',
    fontStyle: 'italic'
  },
  authorBox:{
    position: "absolute",
    padding: 2,
    width: "100%",
    bottom: 0,
    right: 0
  },
  closeAppWrapper : {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 50,
    // borderWidth: 2,
    // borderColor: "green",
    padding: 10
  }
});


