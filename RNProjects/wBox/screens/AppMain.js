import React, {Component} from 'react';
import {StyleSheet, UIManager,
  Text, View, LayoutAnimation,
  ImageBackground, Image, 
  Animated, BackHandler, 
  Switch, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LocalStorage from './components/LocalStorage';
import Buttons from './Buttons';
import Footer from './Footer';
import CloseButton from './CloseButton';
import SettingsButton from './SettingsButton';
import quotes from '../assets/quoteBlob';
import Tts from 'react-native-tts';

const quoteArrayLength = quotes.data.quotes.length;
const animationsIn = ["bounceIn", "bounceInDown", "bounceInUp", "bounceInLeft", "bounceInRight", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInUp", "fadeInUpBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "zoomIn", "zoomInDown", "zoomInUp", "zoomInLeft", "zoomInRight"];
const animationsOut = ["bounceOut", "bounceOutDown", "bounceOutUp", "bounceOutLeft", "bounceOutRight", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutUp", "fadeOutUpBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "zoomOut", "zoomOutDown", "zoomOutUp", "zoomOutLeft", "zoomOutRight"];
const direction = ["normal", "reverse", "alternate", "alternate-reverse"];

export default class AppMain extends Component {
  constructor(){
    super()
    this.state={
      quote: "",
      author: "",
      animation: null,
      direction: "normal",
      autAnimation: null,
      fadeAnimation: new Animated.Value(0),
      speechReady: false,
      showAutoSwitch: true,
      autoMode: false
    }
    this.buttonReady = true;
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidMount = () => {
    Animated.timing(
      this.state.fadeAnimation,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start(
        ()=>{
          if(!this.props.isTtsReady){
            this.initializeTts();
          }
        }
      );

    let dimensionListener = Dimensions.addEventListener('change', this.orientationHandler)
  }

  orientationHandler = (e) => {
    console.log("orientationHandler", e)
    const { width, height } = e.window;
    if(!this.state.showAutoSwitch && (width < height)){
      this.setState({showAutoSwitch: true})
    }else if(this.state.showAutoSwitch && (width > height)){
      this.setState({showAutoSwitch: false})
    }
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

  initializeTts = () => {
    Tts.getInitStatus().then(() => {
         LocalStorage.getItem('wBoxSettings')
          .then(result => {
            // console.log(result)
            let tempData = JSON.parse(result);
            // console.log("tempData", tempData);
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

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.isTtsReady && !this.props.isTtsReady){
      // console.log("when does it trigger?")
       //to check if voice is possible
      this.initializeTts();
    }
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

  onSwitchChange = () => {
    this.setState(function(prevState){
      return{
        autoMode: !prevState.autoMode
      }
    },()=>{
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    })
  }


  render() {
    console.log(this.state.autoMode)
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

            <View style={styles.appSettingsWrapper} >
              <SettingsButton openSettings={this.props.openSettings} />
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

            {this.state.showAutoSwitch && 
              <View style={styles.modeSwitchContainer}>
              <Text style={styles.switchTextMode}>{this.state.autoMode ? "Auto mode" : "Manual mode"}</Text> 
              <View style = {[styles.switchContainer]}>
                <Switch
                style={styles.switch}
                thumbColor="#f0f0f0"
                value={this.state.autoMode}
                onChange={this.onSwitchChange}
                />
                <Text style={styles.switchText}>Switch to {!this.state.autoMode ? "auto" : "manual"} mode</Text>
              </View>
            </View>}
            
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
  },
  appSettingsWrapper : {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 50,
    // borderWidth: 2,
    // borderColor: "green",
    padding: 8
  },



  modeSwitchContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer : {
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 50,
    width: "95%",
  },
  switchText:{
    padding: 5,
    fontSize: 25,
    color: '#fff',
    color: '#fff',
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontStyle: 'italic'
  },
  switchTextMode:{
    padding: 5,
    fontSize: 30,
    color: '#fff',
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontStyle: 'italic'
  },
  switch: {

  } 
});
