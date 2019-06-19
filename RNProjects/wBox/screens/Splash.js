import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';


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
          return {progress : prevState.progress + 0.1}
        })
      }else{
        clearInterval(this.splashInterval);
        this.props.navigation.navigate("Wrapper");
      }
    }, 10)
  }



  render() {
    const fullScreen = {height: Dimensions.get('window').height, width: Dimensions.get('window').width};
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
        <Text style={styles.title}>to Wisdom Box!</Text>
        <Text style={styles.description}>Your source of Wisdom is loading...</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'red',
    borderWidth: 2
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  
});

