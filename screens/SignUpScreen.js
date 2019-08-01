import React from "react";
import { Card, Content, Container, Text, CardItem, Body, Button } from "native-base";
import { TextInput, Dimensions, TouchableOpacity, Alert } from "react-native";
import firebase from 'react-native-firebase';
import { DrawerItems } from "react-navigation";
import { thisExpression } from "@babel/types";
//import console = require('console');
export default class SignUpScreens extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    //console.log(params);
    return {
      headerTitle: "SignUp",
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

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      username: "",
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Auth');
    })
  }

  SignUp() {
    if (this.state.password === "" || this.state.email === "" || this.state.username === "") {
      Alert.alert("Empty String", "Email/Password/Username is empty")
      return;
    }
    else if (this.state.password !== this.state.password2) {
      Alert.alert("Password Mismatch", "this entered passwords do not match. Please enter the same password");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      user = firebase.auth().currentUser;
      firebase.database().ref('users/' + user.uid).set({
        uid: user.uid,
        username: this.state.username,
        email: this.state.email,
        lastLoggedIn: new Date(),
      });
    }).catch(function (error) {
      Alert.alert(error.code, error.message);
    });
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
                  autoCapitalize="none"
                  placeholder="Email"
                  style={{ width: Dimensions.get("window").width, fontSize: 20 }}
                  onChangeText={(text) => { this.setState({ email: text }) }}
                />
                <Text>
                  Username
                    </Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Username"
                  style={{ width: Dimensions.get("window").width, fontSize: 20 }}
                  onChangeText={(text) => { this.setState({ username: text }) }}
                />
                <Text>
                  Password
                    </Text>
                <TextInput
                  style={{ width: Dimensions.get("window").width, fontSize: 20 }}
                  placeholder="Password"
                  autoCompleteType="password"
                  secureTextEntry
                  onChangeText={(text) => { this.setState({ password: text }) }}
                />
                <Text>
                  Confirm Password
                    </Text>
                <TextInput
                  style={{ width: Dimensions.get("window").width, fontSize: 20 }}
                  placeholder="Password"
                  //autoCompleteType="password"
                  secureTextEntry
                  onChangeText={(text) => { this.setState({ password2: text }) }}
                />
              </Body>
            </CardItem>
            <CardItem
              footer
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
            >
              <Button
                onPress={() => { this.SignUp() }}
                primary
                //large
                full
              >
                <Text>
                  Sign Up!
                  </Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}