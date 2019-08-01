import React from "react";
import { Card, Content, Container, Text, CardItem, Body, Button } from "native-base"
import { Alert, FlatList, View, StyleSheet, RefreshControl, TouchableOpacity } from "react-native";
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    //console.log(params);
    return {
      headerTitle: "HomeScreen",
      //headerLeft: params.Count,
      headerTintColor: "#FFFFFF",
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTitleStyle: {
        flex: 1,
        flexDirection: "column",
        fontWeight: 'bold',
        //color:"#FFFFFF",
        textAlign: 'center',
      },
      headerLeft: (
        <TouchableOpacity
          style = {{flex: 1, alignSelf: "center"}}
          onPress = {() => navigation.toggleDrawer()}
        >
          <Icon
            style = {{paddingLeft: 10}}
            size = {30}
            color = "white"
            name = "menu"
          />
        </TouchableOpacity>
      ),
      headerRight: params.headerSetting,


      //header: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      refreshing: false,
    }
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid).update({
      //username: user.uid,
      //email: user.email,
      lastLoggedIn: new Date(),
    }).catch(function (error) {
      if (error) {
        Alert.alert(error.code, error.message);
      }
    })
    this._queryDatabase();
  }

  _queryDatabase = async () => {
    this.setState({refreshing: true});
    localData =  firebase.database().ref('Magic');
    arr = [];
    query = localData.orderByChild('value');
    query.once('value').then((snapshot) => {
      //console.log(snapshot.val());
      
      snapshot.forEach(ss => {
        arr.push(ss.val())
      })
      //console.log(arr)
    }).then(() => {
      this.setState({
        data: arr,
        refreshing: false,
      });
    })
  }



  

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.data !== nextState.data){
      return true;
    }
    else{
      return false;
    }
  }

  render() {
    return (
      <Container style = {styles.container}>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._queryDatabase.bind(this)}
            />}
        >
          {this.state.data.map(item => 
          <Card style ={styles.Card} key={item.key}>
          <CardItem header bordered>
            <Text>{item.name}</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text style = {styles.Text}>Type: {item.type}</Text>

              <Text style = {styles.Text}>Description: {item.description}</Text>

              <Text style = {styles.Text}>Value: {item.value}</Text>

            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Text>Made By: </Text>
            <Text>{item.email}</Text>
          </CardItem>
        </Card>  
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black"
  },
  Card: {},
  Text: {},

})