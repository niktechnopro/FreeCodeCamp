import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import Buttons from './Buttons';
import Footer from './Footer';
import quotes from '../assets/quoteBlob';

const quoteArrayLength = quotes.data.quotes.length;


export default class Wrapper extends Component {
  constructor(){
    super()
    this.state={
      quote: ""
    }
  }


  getQuote = (index) => {
    console.log("index", index)
    //let's generate a number withing the array index
    // let index = Math.ceil(Math.random()*100);
    // let quote = null;
    // try{
    //   quote = allquotes[index];
    // }catch{
    //   quote = 'Something went wrong, please refresh the page or comeback later'
    // }
}



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
                <Text style={styles.wisdomText}>
                  {this.state.quote.length>1 ? this.state.quote : "Some test text"}
                </Text>
            </View>
            
            <View style={styles.buttonFrame}>
              <Buttons getQuote={this.getQuote} length={quoteArrayLength} />
            </View>
          
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
    alignItems: 'center'
  },
  container: {
    marginTop: 20,
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
    width: "95%",
    height: "40%",
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
    fontSize: 25,
    color: '#000',
    fontWeight: "bold",
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});


