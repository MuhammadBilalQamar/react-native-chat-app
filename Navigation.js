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
        {/* <Stack.Screen name="Profile" /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// const AppNavigator = createStackNavigator(
//   {

//     Home: {
//       screen: Home,
//       navigationOptions: {
//         tabBarLabel: "Home",
//         // color:"#1A5CAD",
//         //tabBarActiveTintColor
//         tabBarIcon: ({ tintColor }) => (
//           <Icon name="ios-home" size={20} style={{ color: "white" }} />
//         )
//       }
//     },

//   },
//   {
//     // tabBarOptions: {
//     //   activeTintColor: "white",
//     //   inactiveTintColor: 'white',
//     //   style: {
//     //     backgroundColor: 'red',
//     //   },
//     // },

//     initialRouteName: "Home"
//   }
// );
export default AppNavigator;
// export default createAppContainer(AppNavigator);