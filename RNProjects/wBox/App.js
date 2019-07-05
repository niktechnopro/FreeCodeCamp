import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Splash from './screens/Splash';
import Wrapper from './screens/Wrapper';
import SettingsPage from './screens/SettingsPage';


const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    Splash: {
      screen: Splash
    },
    Wrapper: {
      screen: Wrapper
    },
    SettingsPage: {
      screen: SettingsPage
    }
  },
  {
    // initialRouteName: 'Splash'
    // initialRouteName: 'Wrapper'
    initialRouteName: 'SettingsPage'
  }
));


export default class App extends Component {

  render() {
    return (
        <AppNavigator />
    );
  }
}