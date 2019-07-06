import React, {Component} from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import AppMain from './AppMain';
import SettingsPage from './SettingsPage';


export default class Wrapper extends Component {
  constructor(props){
    super(props)
    console.log(props.navigation.state.params.engine)
    this.state =  {
      settings: props.navigation
    }
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => true);
  }


  render() {
    // console.log("props: ", this.props)
    return (
      <View>
        {true ?
        <SettingsPage />
        :
        <AppMain />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
});


