import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Animated, Easing} from 'react-native';
import * as Progress from 'react-native-progress';
import LocalStorage from './components/LocalStorage';
import PulsingDots from './components/PulsingDots';

const fullScreen = {height: Dimensions.get('window').height, width: Dimensions.get('window').width};

export default class Splash extends Component {

  constructor(){
    super()
    this.state={
      progress: 0,
      done: " ",
      width: fullScreen.width ? fullScreen.width : "100%",
    }
    this.progress = new Animated.Value(0);
    this.speechEngine = null;
  }

  componentDidMount = () => {
    // LocalStorage.clearAll();
    LocalStorage.getItem('wBoxSettings')
    .then(result => {
      let tempData = JSON.parse(result);
      this.speechEngine = tempData.ttsStatus;
    })
    .catch(error => this.speechEngine = null)
    this.progress.setValue(0);
    // this.progress.addListener((progress) => { //listener for progress
    //   this.setState({
    //     progress: parseInt(progress.value) + '%'
    //   });
    // });
 
    Animated.timing(this.progress, {
      duration: 6000,
      toValue: 1,
      easing: Easing.linear
    }).start(() => {
        this.setState({
          done: "Enjoy!"
        },()=>{
          setTimeout(()=>this.props.navigation.navigate("Wrapper",{
            engine : this.speechEngine 
          }), 300);
        })
    });

    Dimensions.addEventListener('change', this.orientation)
  }

  orientation = (e) => {
    const { width, height } = e.window;
      this.setState({
        width,
        height
      })
  }

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this.orientation)
  } 

  getProgressStyles = (screenWidth) => {
    let available_width = screenWidth - 40 - 16;


    let animated_width = this.progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, available_width / 2, available_width]
    });
    //red -> orange -> green
    const color_animation = this.progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["rgb(101, 203, 25)", "rgb(224, 150, 39)", "rgba(0, 122, 255, 1)"]
    });
   
    return {
      width: animated_width,
      height: 40, //height of the progress bar
      backgroundColor: color_animation
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.title}>to</Text>
          <Text style={styles.title}>Wisdom Box!</Text>
        </View>

        <View style={styles.containerOne}>
          <View style={styles.textWithDots}>
            <Text style={styles.description}>Wisdom Box is loading</Text>
            <PulsingDots />
          </View>
        
          <View style={[styles.progress_container, {width: this.state.width - 44}]}>
            <Animated.View
              style={[this.getProgressStyles(this.state.width)]}
            > 
            </Animated.View>
          </View>
          <Text style={styles.progress_status}></Text>
        </View>
        <View style={styles.doneContainer}>
          <View>
            <Text style={styles.title}>{this.state.done}</Text>
          </View>
          <Text style={styles.description}>Quotes By Famous People On Life & Success (2019)</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20
  },
  doneContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
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
  description: {
    fontSize: 26,
    textAlign: 'center',
    color: 'rgba(0, 122, 255, 1)',
  },
  textWithDots:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: "center",
    margin: 10,
    fontWeight: "bold",
  },
  containerOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress_container: {
    borderWidth: 6,
    borderColor: '#1299C5',
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  progress_status: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});



        
