import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Splash from './screens/Splash';
import Wrapper from './screens/Wrapper';
// import AppMain from './screens/AppMain';//for develpment purposes


const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    Splash: {
      screen: Splash
    },
    Wrapper: {
      screen: Wrapper
    },
    // AppMain: {
    //   screen: AppMain
    // }
  },
  {
    initialRouteName: 'Splash'
    // initialRouteName: 'Wrapper'
    // initialRouteName: 'AppMain'//for development purposes
  }
));


export default class App extends Component {

  render() {
    return (
        <AppNavigator />
    );
  }
}