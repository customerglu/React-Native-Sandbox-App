import { RegisterDevice, loadCampaignById, SetCurrentClassName, enableAnalytic } from '@customerglu/react-native-customerglu';


import messaging from '@react-native-firebase/messaging';

export const registerUser =  async (userId) =>{
  //  const token = await messaging().getToken();
   // console.log("getToken", token)
        let userData = {
        'userId': userId
        }
    var ok = await RegisterDevice(userData);
    if (ok == true) {
    console.log("Register with CG");
    }else { 
        console.log("Failed to register with CG");
    }
}

export const loadCGCampaign =(campaignId) => {

    let nudgeConfigurationData = {
        nudgeConfiguration:{
             layout:'full-default',
             opacity:'0.8',
             closeOnDeepLink:true,
             absoluteHeight:'50',
             relativeHeight:'60'
        },
    };

    loadCampaignById(campaignId,nudgeConfigurationData) 

}

export const setCGScreenName = (screenName) =>{
    SetCurrentClassName(screenName)
}

export const enableCGAnalytic = () =>{
    enableAnalytic(true)
}


module.exports = {
    registerUser,
    loadCGCampaign,
    setCGScreenName,
    enableCGAnalytic
}