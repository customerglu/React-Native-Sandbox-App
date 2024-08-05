import { RegisterDevice, loadCampaignById, SetCurrentClassName, enableAnalytic } from '@customerglu/react-native-customerglu';


import messaging from '@react-native-firebase/messaging';

export const registerUser =  async (userId) =>{
    const token = await messaging().getToken();
    console.log("getToken", token)
        let userData = {
        'userId': userId,
        'firebaseToken': token
        }
    var ok = await RegisterDevice(userData);
    if (ok == true) {
    console.log("Register with CG");
    }else { 
        console.log("Failed to register with CG");
    }
}

export const loadCGCampaign =(campaignId) =>{

    loadCampaignById(campaignId) 

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