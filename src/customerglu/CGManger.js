import { RegisterDevice, loadCampaignById, SetCurrentClassName } from '@customerglu/react-native-customerglu';



export const registerUser =  async (userId) =>{
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

export const loadCGCampaign =(campaignId) =>{

    loadCampaignById(campaignId) 

}

export const setCGScreenName = (screenName) =>{
    SetCurrentClassName(screenName)
}


module.exports = {
    registerUser,
    loadCGCampaign,
    setCGScreenName
}