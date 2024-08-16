/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import { Image,  NativeModules,
  NativeEventEmitter } from "react-native";
import  { useContext, useState, useEffect } from "react";
import { loadCGCampaign, registerUser, setCGScreenName } from "./src/customerglu/CGManger"

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { loadCampaignById } from '@customerglu/react-native-customerglu';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductDetailsScreen from "./src/screen/ProductDetailsScreen";
import HomeScreen from './src/screen/HomeScreen';
import RegisterScreen from './src/RegisterScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

import { DisplayCGNotification,DisplayCGBackgroundNotification,handleDeepLinkUri } from '@customerglu/react-native-customerglu';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import {PermissionsAndroid} from 'react-native';

// import messaging from '@react-native-firebase/messaging';
import ProfileScreen from './src/screen/AccountScreen';
// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
 

//   useEffect(() => {

//     requestUserPermission()
//     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

//     messaging().onMessage(async remoteMessage => {
//       console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
//       var notification = JSON.parse(JSON.stringify(remoteMessage))
//       if (notification.data.glu_message_type) {
//         //ios notification open from forground
//         DisplayCGNotification(notification.data, true)

//     } else {
//         DisplayCGNotification(notification.data.data, true)
//     }
//     });

//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       console.log('Message handled in the background!----------', remoteMessage);
//       var notification = JSON.parse(JSON.stringify(remoteMessage))

//     //   if(Platform.OS==='android'){
//     //     DisplayCGBackgroundNotification(notification.data, true)
//     // }else{
//         DisplayCGNotification(notification.data, true)
//    // }
//     });

//     // Call registerUser when the component mounts
//     // pass your userId
//    // registerUser("glutest-78");


//  // const onRemoteNotification = (notification) => {
// //     const isClicked = notification.getData().userInteraction === 1;
// //     console.log("isClicked", notification.getData());
// //     console.log("isClicked", isClicked);
// //     if (isClicked) {
// //         console.log("isClicked", isClicked);
// //         // Navigate user to another screen
// //     } else {
// //         // Do something else with push notification
// //     }
// // };

   
        

      




//   }, []);


  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={'RegisterScreen'}>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'SplashScreen', headerShown: false }}
        />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'SplashScreen', headerShown: false }}
        />
         <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ title: 'SplashScreen', headerShown: false }}
        />
   
        <Stack.Screen
            name="PRODUCT_DETAILS"
            component={ProductDetailsScreen}
            options={{ title: 'HomeScreen', headerBackVisible: false }}
        />
  
    </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover', // Ensures the image covers the full width and maintains its aspect ratio
    marginVertical: 20,
  },
});

export default App;
