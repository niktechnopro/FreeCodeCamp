import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Splash from './screens/Splash';
import Wrapper from './screens/Wrapper';


const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    Splash: {
      screen: Splash
    },
    Wrapper: {
      screen: Wrapper
    }
  },
  {
    initialRouteName: 'Wrapper'
  }
));


export default class App extends Component {

  render() {
    return (
        <AppNavigator />
    );
  }
}