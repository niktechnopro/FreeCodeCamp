import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import Buttons from './Buttons';
import Footer from './Footer';


export default class Wrapper extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source = {require("../assets/flower.jpg")}
          style = {styles.backgroundImage}
          imageStyle={{
            resizeMode: 'cover' // works only here!
          }}
        >
          <View style={styles.container}>
            <Text>Some</Text>
          </View>
          <Footer />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 5,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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
  }
});


