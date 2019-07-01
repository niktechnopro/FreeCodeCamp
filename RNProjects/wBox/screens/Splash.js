import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import PulsingDots from './components/PulsingDots';


export default class Splash extends Component {

  constructor(){
    super()
    this.state={
      progress: 0
    }
    this.splashInterval = null;
  }

  componentDidMount = () => {
    this.splashInterval = setInterval(()=>{
      if (this.state.progress < 1){
        this.setState(function(prevState){
          return {progress : prevState.progress + 0.2}
        })
      }else{
        clearInterval(this.splashInterval);
        setTimeout(()=>this.props.navigation.navigate("Wrapper"), 300);
        return
      }
    }, 600)
  }

  componentWillUnmount = () => {
    this.splashInterval = null;
  }



  render() {
    const fullScreen = {height: Dimensions.get('window').height, width: Dimensions.get('window').width};
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.title}>to</Text>
        <Text style={styles.title}>Wisdom Box!</Text>
        <View style={styles.textWithDots}>
          <Text style={styles.description}>Wisdom Box is loading</Text>
          <PulsingDots />
        </View>
        <Progress.Bar 
          progress={this.state.progress} 
          width={fullScreen.width - 30} 
          animationType="timing" 
          height={27}
          useNativeDriver={true}
        />
        <Text style={styles.description}>Quotes By Famous People On Life & Success (2019)</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    margin: 10,
    fontWeight: "bold",
  }
});

        

