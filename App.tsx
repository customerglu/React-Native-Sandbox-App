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
import Home from "./src/screen/Home";
import ProductDetailsScreen from "./src/screen/ProductDetailsScreen";
import HomeScreen from './src/screen/HomeScreen';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Call registerUser when the component mounts
    // pass your userId
    registerUser("glutest-78");

    const { Rncustomerglu } = NativeModules;
        const RncustomergluManagerEmitter = new NativeEventEmitter(Rncustomerglu);

        const eventanalytics = RncustomergluManagerEmitter.addListener(
            'CUSTOMERGLU_ANALYTICS_EVENT',
            (reminder) => 
            console.log('CUSTOMERGLU_ANALYTICS_EVENT...', reminder)
        );

        const CG_UNI_DEEPLINK_EVENT = RncustomergluManagerEmitter.addListener(
            'CG_UNI_DEEPLINK_EVENT',
            (reminder) => 
            console.log('CG_UNI_DEEPLINK_EVENT...', reminder)
        );

        const eventdeeplink = RncustomergluManagerEmitter.addListener(
            'CUSTOMERGLU_DEEPLINK_EVENT',
            (reminder) => 
            {
                if (Platform.OS === 'ios') {
                    reminder = reminder.data
                }
                 console.log('CUSTOMERGLU_DEEPLINK_EVENT...12345',  reminder)
                if(reminder && reminder.campaignId){
                loadCampaignById(reminder.campaignId,)
                }
            }
            
        );
        const eventbanner = RncustomergluManagerEmitter.addListener(
            'CUSTOMERGLU_BANNER_LOADED',
            (reminder) => 
            console.log('CUSTOMERGLU_BANNER_LOADED...>>>>>', reminder)
        );

        const invalidCampid = RncustomergluManagerEmitter.addListener(
            'CG_INVALID_CAMPAIGN_ID',
            (reminder) => 
            console.log('CG_INVALID_CAMPAIGN_ID...>>>>>', reminder)
        );
        let eventfheight = null,EmbedBannerHeight=null
        if (Platform.OS === 'ios') {
            eventfheight = RncustomergluManagerEmitter.addListener(
                'CGBANNER_FINAL_HEIGHT',
                (reminder) => {
                    console.log('reminder----', reminder);
                    // console.log('reminder["entry1"]....', reminder["entry1"])
                    if (reminder && reminder["demo-quiz-banner1"]) {

                    }

                }

            );
            EmbedBannerHeight = RncustomergluManagerEmitter.addListener(
                'CGEMBED_FINAL_HEIGHT',
                (reminder) => {
                    console.log('reminder----', reminder);
                    // console.log('reminder["embedded1"]....', reminder["embedded1"])
                    if (reminder && reminder["embedded1"]) {
                    }

                }

            );
        }

        return () => {
            eventanalytics.remove();
            eventdeeplink.remove();
            eventbanner.remove();
            invalidCampid.remove()
            CG_UNI_DEEPLINK_EVENT.remove()
            if (Platform.OS === 'ios') {
                console.log('destroy.!!!!!!!!')
                

            }

        }




  }, []);


  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
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
