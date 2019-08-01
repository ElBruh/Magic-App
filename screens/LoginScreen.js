import React from "react";
import { Card, Content, Container, Text, CardItem, Body, Button } from "native-base";
import { TextInput, Dimensions, TouchableOpacity, Alert } from "react-native";
import firebase from 'react-native-firebase';
import { DrawerItems } from "react-navigation";
//import console = require('console');
export default class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    //console.log(params);
    return {
      headerTitle: "Login",
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
      headerRight: params.headerSetting,


      //header: null,
    };
  }
  constructor(props){
    super(props);
    this.state = {
      email: "",
    password: "",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Auth')
    })
  }


  SignIn(){
    if(this.state.password === "" || this.state.email === ""){
      Alert.alert("Empty String", "Email/Password is empty")
      return;
    } 
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error){
      Alert.alert(error.code, error.message)
    });
    
  }
  goToSignUp(){
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <Container
        style={{ flex: 1, flexDirection: "column", alignContent: "center" }}
      >
        <Content>
          <Card>
            <CardItem bordered>
              <Body>
                <Text>
                  Email
                    </Text>
                <TextInput
                  placeholder="Email"
                  autoCapitalize = "none"
                  autoCompleteType = "email"
                  style={{ width: Dimensions.get("window").width, fontSize: 20 }}
                  onChangeText = {(text) => {this.setState({email: text})}}
                />
                <Text>
                  Password
                    </Text>
                <TextInput
                  style={{ width: Dimensions.get("window").width, fontSize: 20 }}
                  placeholder="Password"
                  autoCompleteType="password"
                  secureTextEntry
                  onChangeText = {(text) => {this.setState({password: text})}}
                />
              </Body>
            </CardItem>
            <CardItem
              footer
            style = {{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}
            >
              <TouchableOpacity
                onPress = {() => {this.goToSignUp()}}
              >
                <Text
                  style = {{color: 'blue', fontSize: 12, marginRight: 12, marginTop: 30}}
                >
                  No account? Sign Up! 
                </Text>
              </TouchableOpacity>
              <Button
                onPress = {() => {this.SignIn()}}
                primary
                //large
                full
              >
                <Text>
                  Sign In!
                  </Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}