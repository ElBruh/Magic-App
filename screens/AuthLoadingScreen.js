import React from 'react';
import { ActivityIndicator, Platform, StatusBar, StyleSheet, View, Alert} from 'react-native';
import firebase from 'react-native-firebase';
//import console = require('console');


export default class AuthLoadingScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        isLoadingComplete: false,
        loggedIn: false,
      };
  }
  

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Auth')
    })
  }

  render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});