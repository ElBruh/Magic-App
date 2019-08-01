import React from 'react';
import { Content, Container, Text, Card, CardItem, Body, Button } from 'native-base';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default class Profile extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        //console.log(params);
        return {
            headerTitle: "Profile",
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
            headerLeft: (
                <TouchableOpacity
                    style={{ flex: 1, alignSelf: "center" }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Icon
                        style={{ paddingLeft: 10 }}
                        size={30}
                        color="white"
                        name="menu"
                    />
                </TouchableOpacity>
            ),


            //header: null,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            username: "",
        }
    }

    componentDidMount() {
        localuser = firebase.database().ref('users');
        myUser = firebase.auth().currentUser;
        temp = localuser.orderByChild("uid").equalTo(myUser.uid);
        temp.once('value').then((snapshot) =>{
            snapshot.forEach((child) => {
                this.setState({
                    user: myUser,
                    username: child.val().username,
                });
            })
            
        }).catch((error) => {
            Alert.alert(error.code, error.message);
        })
        
    }

    SignOut() {
        firebase.auth().signOut().then(
            () => this.props.navigation.navigate("AuthLoading")
        ).catch(function (error) {
            Alert.alert(error.code, error.message)
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>
                                {this.state.username}
                            </Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    {this.state.user.email}
                                </Text>
                                <Text>
                                    {this.state.user.uid}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Button
                        primary
                        full
                        large
                        onPress={() => this.SignOut()}
                    >
                        <Text>SignOut</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    Text: {
        fontSize: 20,
        fontWeight: "bold"
    }
})