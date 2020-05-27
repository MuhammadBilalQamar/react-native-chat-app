import React from "react";
// import {
//   createBottomTabNavigator,
//   createAppContainer
// } from "@react-navigation/native";
import { Icon } from "native-base";
import { Image } from "react-native";
import Home from "./Screens/Home/index";
import Login from "./Screens/Login/index";
import SignUp from "./Screens/SignUp/index";
import Profile from "./Screens/Profile/index";
import RenderUsers from "./Screens/RenderUsers/index";
import MyChats from "./Screens/MyChats/index";
import ChatRoom from "./Screens/ChatRoom/index";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (

    <NavigationContainer >
      <Stack.Navigator
        initialRouteName="Login"
        headerMode="none"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="RenderUsers" component={RenderUsers} />
        <Stack.Screen name="MyChats" component={MyChats} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigator;
// export default createAppContainer(AppNavigator);
// @react-native-community/masked-view