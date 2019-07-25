import React, {Component} from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import AppMain from './AppMain';
import SettingsPage from './SettingsPage';


export default class Wrapper extends Component {
  constructor(props){
    super(props)
    // console.log(props.navigation.state.params.engine);
    this.state =  {
      settings: (props.navigation.state.params.engine) ? false : true,
    }
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => true);
  }

  goodToGo = (status) => {
    this.setState({
      settings: status
    })
  }

  openSettings = () => {
    this.setState({
      settings: true
    })
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.settings &&
        <View style={styles.settingsContainer} > 
          <SettingsPage goodToGo = {this.goodToGo} />
        </View>
        }
        <View style={{flex: 1, display: !this.state.settings ? null : "none"}}>
          <AppMain openSettings = {this.openSettings} isTtsReady = {this.state.settings} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  settingsContainer:{
    flex: 1
  }
});


