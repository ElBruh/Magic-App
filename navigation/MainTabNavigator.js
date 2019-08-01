import React from 'react';
import { Platform, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createDrawerNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

//import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CreateMagic from '../screens/CreateMagic';
import ProfileScreen from '../screens/Profile';
import MyCardsScreen from '../screens/MyCards';



const HomeStack = createStackNavigator({
  Home: HomeScreen,
  
  //Login: LoginScreen,
  //Setting: SettingsScreen,
  //Search: LinksScreen,
});
const CreateStack = createStackNavigator({
  Create: CreateMagic,
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
})
const MyCardsStack = createStackNavigator({
  MyCards: MyCardsScreen,
})

const MYProfileTab = createBottomTabNavigator({
  Profile: ProfileStack,
  MyCards: MyCardsStack,
},{
  swipeEnabled: true,
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Profile') {
          iconName = `person`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          //IconComponent = HomeIconWithBadge; 
        } else if (routeName === 'MyCards') {
          iconName = `class`;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      
    },
  })

export default HomeDrawer =createDrawerNavigator({
  Profile: {
    screen: MYProfileTab,
    navigationOptions: {
      drawerLabel: "Profile ",
      drawerIcon: (
      <View style = {{width: 90, paddingLeft: 10}}>
        <Icon name= "person" size = {90} color = "black"/>
      </View>
      ),
      
    }
  },
  Main:{
    screen: HomeStack,
    navigationOptions: {
      drawerLabel: 'Home ',
      drawerIcon: (<Icon name= "home" size = {20} color = "black"/>),
    }
  },
  Create:{
    screen: CreateStack,
    navigationOptions: {
      drawerLabel: 'Create Magic ',
      drawerIcon: (<Icon name= "code" size = {20} color = "black"/>),
    }
  },
},{
  drawerType: "back",
  //contentComponent: SideMenu,
})

/*HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};*/



//export default createAppContainer(HomeDrawer);

//export default HomeStack;
