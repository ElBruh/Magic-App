import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'react-native-firebase';
//import console = require('console');


  

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    loggedIn: false,
  };

  render() {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
