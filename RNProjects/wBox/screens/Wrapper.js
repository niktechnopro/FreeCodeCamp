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
      quote: "",
      author: ""
    }
  }


  getQuote = (index) => {
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
        quote,
        author: " - "+author
      })
    }catch{
      this.setState({
        quote: "Something went wrong, try again..."
      })
    }
}



  render() {
    console.log(this.state)
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
                  {this.state.quote ? this.state.quote : "Press 'Get a Quote' button"}
                </Text>

                <View style={styles.authorBox}>
                  <Text style={styles.author}>
                    {this.state.author}
                  </Text>
                </View>
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
    textAlign: 'right'
  },
  authorBox:{
    position: "absolute",
    padding: 2,
    width: "100%",
    bottom: 0,
    right: 0
  }
});


