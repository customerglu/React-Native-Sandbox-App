// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    NativeEventEmitter,
    ScrollView,
    AppState,
    Dimensions,
    NativeModules,

    LogBox
} from 'react-native';
import { SetCurrentClassName,SetCGCurrentClassName,addMarginsForPIP } from '@customerglu/react-native-customerglu';
import { useFocusEffect, useRoute, CommonActions } from "@react-navigation/native";
import {
    BannerWidget,
    EmbedBannerWidget,
    dataClear,
    openWallet,
    setOpenWalletAsFallback,
    UpdateUserAttributes,
    closeWebView,
    configureLoadingScreenColor,
    enableAnalytic,
    isCampaignValid,
     getCampaignStatus,
    loadCampaignById,
    UpdateProfile,
    loadCampaignWithUrl,
    configureDarkBackgroundColor,
    configureLightBackgroundColor,
    listenToDarkMode,
    enableDarkMode
} from '@customerglu/react-native-customerglu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

LogBox.ignoreLogs(['new NativeEventemitter()']);

const HomeScreen = ({ navigation }) => {
    const [apntoken, setApnToken] = useState("");
    const [fcmtoken, setFcmToken] = useState("");
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [finalHeight, setFinalHeight] = useState(0);
    const [finalEBHeight, setEBFinalHeight] = useState(0);

    const windowHeight = Dimensions.get('window').height;
    const _navigation = useNavigation();
    const route = useRoute();
// useEffect(async ()=>{
//     userdataAndroid = {
//         userId: "glutest-098909",
//         firebaseToken: token,
//         profile:{
//             "firstName":null
//         },
//         customAttributes: {
//             "isTestUser": true

//         }

//     };
//     userdataios = {
//         userId: "glutest-87899",
//         firebaseToken: token,
//         apnsDeviceToken: ""
//     };
//     var ok = await RegisterDevice(Platform.OS === "ios" ? userdataios : userdataAndroid);
//     console.log('Register....', ok);
// });

    useFocusEffect(
        React.useCallback( () => {
            //Dashboard  MoreScreen
        //    setOpenWalletAsFallback(false)
            
            try {
                const epochTime = Date.now().toString();
                // const result = await SetCurrentClassName('HomeScreen', epochTime);
                // console.log('Result from SetCurrentClassName:', result);
              } catch (error) {
                console.error('Error calling SetCurrentClassName:', error);
              }
            addMarginsForPIP(100,100,"px")


        }, [])
    );


    useEffect(() => {
        // enableAnalytic(true);
        setClassName()
        closeWebView(true)

        //2jan2023
        // configureDarkBackgroundColor("#800000");
        // configureLightBackgroundColor("#00ff00");
        // listenToDarkMode(true);  //listenToSystemDarkLightMode
        // enableDarkMode(false);
        //end

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
                        setFinalHeight(reminder["demo-quiz-banner1"] * windowHeight / 100);

                    }

                }

            );
            EmbedBannerHeight = RncustomergluManagerEmitter.addListener(
                'CGEMBED_FINAL_HEIGHT',
                (reminder) => {
                    console.log('reminder----', reminder);
                    // console.log('reminder["embedded1"]....', reminder["embedded1"])
                    if (reminder && reminder["embedded1"]) {
                        setEBFinalHeight(reminder["embedded1"]);
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
                eventfheight.remove();
                EmbedBannerHeight.remove()

            }

        }


    }, []);

    const setClassName = async ()=>{
        var returnedTimestamnp = await SetCGCurrentClassName("HomeScreen",Date.now().toString());
        console.log("Returned Response "+returnedTimestamnp)
    }


const openWalletTest=()=>{
    // let openWalletData = {
    //     nudgeConfiguration:{
    //          layout:'full-default',
    //           closeOnDeepLink:true,
    //           absoluteHeight:0,
    //           relativeHeight:0
    //     },
    // };
    let openNudgeData = {
        nudgeConfiguration:{
            layout:'middle-default',
             opacity:'0.8',
             closeOnDeepLink:true,
             absoluteHeight:'50',
             relativeHeight:70
        },
    };
    
  //  configureLoadingScreenColor("#FFFFFF");
  //  configureLightBackgroundColor("#FFFFFF");
    //setPIPEnabled(false);
    //enableAnalytic(true);
     //openWallet(openNudgeData);
  loadCampaignById("cf33fc67-e527-4d25-8c4d-09f378f7de48")
   // loadCampaignWithUrl("",openWalletData);
// openNudge("nudge1", openNudgeData);  // optional


}
const validCampaign= async ()=>{
    var isValid = await isCampaignValid("005686b4-749a-44f1-8654-817b6aa7e8b1","API");
if(isValid == true)
{
 console.log("campaign Valid");
} 
else{
    console.log("campaign InValid");

}
}
const campaignStatus= async ()=>{
    var status = await getCampaignStatus("005686b4-749a-44f1-8654-817b6aa7e8b1","API");

 console.log("campaign status"+ status);

}

const updateUser=()=>{
    userdataAndroid = {
            userName: "glutest"
    }
    UpdateUserAttributes(userdataAndroid)
}


    const clearDataFunc = async () => {

        dataClear();
        await AsyncStorage.setItem("isRegisterScuccess", JSON.stringify(false));
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "RegisterScreen" }]
            }));
    }


    return (
        <SafeAreaView flex={1}>
                <View style={{ flex: 1.3, alignItems: 'center', backgroundColor: '#000', height: '35%', justifyContent: 'center', padding: 10 }}>
                    <Image
                            source={require('../assets/focused/account.png')}
                            style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            width: '100%',
                            height: 60,
                            resizeMode: 'contain',
                        }}
                    />
                    <TouchableOpacity onPress={() => clearDataFunc()}>
                        <Image
                            source={require('../assets/focused/account.png')}
                            style={styles.logoutbtn}
                        />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.containerBox}
                        onPress={() => openWalletTest()}>
                         {/* openNudgeTest() */}
                        <Image
                            source={require('../assets/focused/account.png')}
                            style={styles.imageStyle} />
                        <Text style={styles.txtWallet}>Wallet</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.containerBox} onPress={() => updateUser()}>
                        <Image
                            source={require('../assets/focused/account.png')}
                            style={styles.imageStyle} />
                        <Text style={styles.txtWallet}>Rewards</Text>
                    </TouchableOpacity>

                </View>
               
               
                <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.containerBox} onPress={() => navigation.navigate('ShopScreen')} testID="shopButton">
                        <Image
                            source={require('../assets/focused/account.png')}
                            style={styles.imageStyle} />
                        <Text style={styles.txtWallet}>Shop</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.containerBox} onPress={() => navigation.navigate('CartScreen')}>
                        <Image
                            source={require('../assets/focused/account.png')}
                            style={styles.imageStyle} />
                        <Text style={styles.txtWallet}>Cart</Text>
                    </TouchableOpacity>

                </View>

                
                    <BannerWidget
                        style={{flex:1, width: '100%', height: Platform.OS === 'ios' ? finalHeight : null }}
                        bannerId="profile_banner"
                    />
                    
                    <EmbedBannerWidget
                        style={{flex:1, width: '100%' ,height: Platform.OS === 'ios' ? finalEBHeight : null }}
                        bannerId="embedded1"
                    />
                

            
        </SafeAreaView>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    containerBox: {
        flex: 1,
        borderColor: '#e5e5e5',
        borderWidth: 1,
        backgroundColor: '#fff',
        margin: 5,
        justifyContent: 'center',
        padding: 10,
        elevation: 1,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }

    },
    txtWallet: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20,

    },
    imageStyle: {
        alignSelf: 'center',
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    logoutbtn: {
        tintColor: '#fff',
        justifyContent: "flex-end",
        alignContent: "flex-end",
        alignSelf: "flex-end",
        width: 40,
        height: 40,
        resizeMode: 'contain',
    }

});
