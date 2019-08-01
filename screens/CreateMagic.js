import React from "react";
import { Container, Content, Card, CardItem, Button, Body, Text } from "native-base";
import { TextInput, Dimensions, Alert, Picker, StyleSheet, TouchableOpacity } from "react-native";
import UUIDGenerator from "react-native-uuid-generator";
import firebase from "react-native-firebase";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CreateMagic extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        
        //console.log(params);
        return {
            drawerLabel: "Home ",
            headerTitle: "Create Magic",
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
            name: "",
            type: "Physical",
            description: "",
            value: 0,
        }
    }

    _updateDataBase() {
        if (this.state.name === "" ||
            this.state.descritpion === "" ||
            this.state.value === "" ||
            this.state.type === "") {
            Alert.alert("Empty Section", "One or more of the sections are blank, please fill out all sections");
            return;
        }
        var user = firebase.auth().currentUser;
        UUIDGenerator.getRandomUUID().then((uuid) => {
            firebase.database().ref('Magic/' + uuid).set({
                name: this.state.name,
                type: this.state.type,
                description: this.state.description,
                value: this.state.value,
                createdOn: new Date(),
                createdBy: user.uid,
                email: user.email,
                key: uuid,
            }
            ).then(() => {
                Alert.alert("Success", "Magic card successfully created!");
                this.setState({
                    name: "",
                    type: "",
                    description: "",
                    value: 0,
                })
            }).catch(function (error) {
                if (error) {
                    Alert.alert(error.code, error.message);
                }
            });
        });
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container style={styles.Container}>
                <Content contentContainerStyle={styles.Content}>
                    <Card style={styles.Card}>
                        <CardItem header>
                            <Text>Create Magic Card</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Name"
                                    onChangeText={(text) => this.setState({ name: text })}
                                    value={this.state.name}
                                />
                                <Text>Type</Text>
                                <Picker
                                    selectedValue={this.state.type}
                                    style={styles.Picker}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ type: itemValue })
                                    }>
                                    <Picker.Item label="Physical" value="Physical" />
                                    <Picker.Item label="Psychologcal" value="Psychological" />
                                    <Picker.Item label="Spirit" value="Spirit" />
                                    <Picker.Item label="AOE" value="AOE" />
                                    <Picker.Item label="IDK" value="IDK" />
                                </Picker>

                                <Text>Description</Text>
                                <TextInput
                                    style={styles.textInputDescription}
                                    placeholder="Description"
                                    onChangeText={(text) => this.setState({ description: text })}
                                    value={this.state.description}
                                />
                                <Text>Value</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Value"
                                    onChangeText={(text) => this.setState({ value: text })}
                                    keyboardType="number-pad"
                                    value={this.state.value.toString()}
                                />
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Button
                                full
                                primary
                                onPress={() => this._updateDataBase()}
                            >
                                <Text>Submit</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "white",
    },
    Content: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    Card: {
        alignItems: "center",
    },
    Picker: {
        height: 50,
        width: Dimensions.get("window").width / 2,
    },
    textInput: {
        fontSize: 20,
        width: Dimensions.get("window").width
    },
    textInputDescription: {
        fontSize: 20,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 6,
    },
})