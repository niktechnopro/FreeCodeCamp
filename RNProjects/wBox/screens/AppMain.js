import React, {Component} from 'react';
import {StyleSheet, UIManager,
  Text, View, LayoutAnimation,
  ImageBackground, Image, Switch,
  Animated, BackHandler, Dimensions, AppState} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LocalStorage from './components/LocalStorage';
import Buttons from './Buttons';
import Footer from './Footer';
import CloseButton from './CloseButton';
import SettingsButton from './SettingsButton';
import quotes from '../assets/quoteBlob';
import Tts from 'react-native-tts';
import BackgroundTimer from 'react-native-background-timer';

const quoteArrayLength = quotes.data.quotes.length;
const animationsIn = ["bounceIn", "bounceInDown", "bounceInUp", "bounceInLeft", "bounceInRight", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInUp", "fadeInUpBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "zoomIn", "zoomInDown", "zoomInUp", "zoomInLeft", "zoomInRight"];
const animationsOut = ["bounceOut", "bounceOutDown", "bounceOutUp", "bounceOutLeft", "bounceOutRight", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutUp", "fadeOutUpBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "zoomOut", "zoomOutDown", "zoomOutUp", "zoomOutLeft", "zoomOutRight"];
const direction = ["normal", "reverse", "alternate", "alternate-reverse"];
let index = 0;

//initial screen position (if width > height - vertical) - used in this.state
const { width, height } = Dimensions.get("window");

// let CustomLayoutOpacity = {//not in use right now
//   duration: 500,
//   create: {
//     property: LayoutAnimation.Properties.opacity,
//     type: LayoutAnimation.Types.linear,
//   },
//   update: {
//       property: LayoutAnimation.Properties.opacity,
//       type: LayoutAnimation.Types.easeInEaseOut,
//   },
//   delete: {
//       duration: 150,
//       property: LayoutAnimation.Properties.opacity,
//       type: LayoutAnimation.Types.linear
//   }
// 

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
      showAutoSwitch: false,
      autoMode: false,
      buttonReady: true
    }
    this.quoteTimer = null;
    this.inTimer = null;
    this.activityStatus = "";
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidMount = () => {
    if(width > height){
      !this.state.showAutoSwitch && this.setState({showAutoSwitch : false});
    }else{
      this.setState({showAutoSwitch : true});
    }


    Animated.timing(
      this.state.fadeAnimation,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        index: 0
      }).start(
        ()=>{
          if(!this.props.isTtsReady){
            this.initializeTts();
          }
        }
      );

    Dimensions.addEventListener('change', this.orientationHandler);

    //experimental - APPSTATE
    AppState.addEventListener('change', this._handleAppStateChange);
    AppState.addEventListener('memoryWarning', this._handleMemoryWarning);
  }

  _handleAppStateChange = (appState) => {
    console.log("appState: ", appState);
    this.activityStatus = appState;
  }

  _handleMemoryWarning = (memoryWarning) => {
    console.log("memory warning: ", memoryWarning);
  } 


  orientationHandler = (e) => {
    const { width, height } = e.window;
    if(!this.state.showAutoSwitch && (width < height)){
      this.setState({
        showAutoSwitch: true,
      })
    }else if(this.state.showAutoSwitch && (width > height)){
      this.quoteTimer && clearInterval(this.quoteTimer);
      this.quoteTimer = null;
      this.setState({
        showAutoSwitch: false,
        autoMode: false,
        buttonReady: true
      })
    }
  }

  closeApp = () => {
    this.quoteTimer && clearInterval(this.quoteTimer);
    this.quoteTimer = null;
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

  randomIndex = () => {//to make sure the index will be changed
    console.log("random index runs here")
    index = Math.floor(Math.random()*quoteArrayLength);
    if(this.state.index !== index){
      this.setState({
        index
      },()=>{
        this.getQuote();
      })
    }else{
      this.randomIndex();
    }
  }

  getQuote = () => {
    console.log("start quote");
    let quote = "";
    let author = "";
    if(this.state.buttonReady || this.state.autoMode){
      let animations = this.setAnimations();
      let temp = "";
      try{
        quote = quotes.data.quotes[index].quote;
        temp = quotes.data.quotes[index].author;
        if(temp && temp.charAt(0).includes('-')){
          author = temp.substring(0);
        }else{
          author = temp;
        }
        this.setState({
          animation: animations.animationsOut,
          direction: animations.direction,
          autAnimation: animations.autAnimationOut,
          buttonReady: false,
        },()=>{
            this.inTimer = setTimeout(()=>{
              this.setState({
                quote,
                author: " - "+author,
                animation: animations.animationsIn,
                autAnimation: animations.autAnimationIn,
                buttonReady: this.state.autoMode ? false : true
              },()=>{
                  console.log("run speech right here", this.state.quote);
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
    console.log(this.activityStatus)
    console.log("end of quote: ", quote);
    if(this.activityStatus === "background"){
      this.speakerTts(quote + ". quote bY. " + author);
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
          autoMode: !prevState.autoMode,
          buttonReady: !prevState.buttonReady
        }
    },()=>{
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      if (this.state.autoMode){
        this.randomIndex();
        // this.quoteTimer = setInterval(this.randomIndex,12000);
        this.quoteTimer =BackgroundTimer.setInterval(this.randomIndex, 12000);

      }else{
        // this.quoteTimer && clearInterval(this.quoteTimer);
        this.quoteTimer && BackgroundTimer.clearInterval(this.quoteTimer);
        this.quoteTimer = null;
        this.inTimer && clearInterval(this.inTimer);
        this.inTimer = null;
      }
      
    })
  }

  openSettings = () => {
    this.quoteTimer && clearInterval(this.quoteTimer);
    this.quoteTimer = null;
    this.inTimer && clearInterval(this.inTimer);
    this.inTimer = null;
    this.setState({
      autoMode: false,
      buttonReady: true
    },()=>{
      this.props.openSettings();
    }) 
  }

  componentWillUnmount = () => {
    this.quoteTimer && clearInterval(this.quoteTimer);
    this.quoteTimer = null;
    this.inTimer && clearInterval(this.inTimer);
    this.inTimer = null;
    Dimensions.removeEventListener('change', this.orientationHandler)
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

            <View style={styles.appSettingsWrapper} >
              <SettingsButton openSettings={this.openSettings} />
            </View>

              <Text style={[styles.title, { marginTop: this.state.showAutoSwitch ? 10 : 0 }]}>
                  Wisdom Box
              </Text>

              {this.state.showAutoSwitch && <View>
                <Text style={styles.switchTextMode}>{this.state.autoMode ? "Auto mode" : "Manual mode"}</Text> 
              </View>
              }

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
                    value={this.state.autoMode}
                    >
                    {this.state.author}
                  </Animatable.Text>
                </View>
            </View>

            {this.state.showAutoSwitch && 
              <View style={styles.modeSwitchContainer}>
                <View style = {[styles.switchContainer]}>
                  <Text style={styles.switchText}>Switch to {!this.state.autoMode ? "auto" : "manual"}</Text>
                  <Switch
                  style={styles.switch}
                  thumbColor="#f0f0f0"
                  value={this.state.autoMode}
                  onChange={this.onSwitchChange}
                  />
                </View>
            </View>}
            
            <View style={styles.buttonFrame}>
              <Buttons 
                randomIndex={this.randomIndex} 
                length={quoteArrayLength} 
                buttonReady={this.state.buttonReady}
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
    // backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 50,
    width: "95%",
  },
  switchText:{
    padding: 5,
    fontSize: 30,
    color: '#fff',
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontStyle: 'italic'
  },
  switchTextMode:{
    padding: 5,
    fontSize: 36,
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


