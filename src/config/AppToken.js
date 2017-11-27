import axios from 'axios'
import {AsyncStorage} from "react-native";
import Http from './../utils/Http'
import AppConfig from './AppConfig'

class AppToken{  
   static Client_Credentials_Token=async()=>{
             let response;
             let tokenString= await  AsyncStorage.getItem('c_token');
            if(tokenString!=null) {
                response=JSON.parse(tokenString)
                 return response.access_token;
            }
            response=await Token._requestToken()
            await Token._saveToken('c_token',JSON.stringify(response));
            return response.access_token;
    }

    static Update_Client_Token=async()=>{
        let response=await Token._requestToken();
        await Token._saveToken('c_token',JSON.stringify(response));
        return response.access_token;
    }

   static _requestToken=async()=>{
       let data=`grant_type=client_credentials&client_id=${AppConfig.clientId}&client_secret=${AppConfig.clientSecret}`
       let response=await Http.PostAsFormAsync(AppConfig.authorizedUrl,data)
       return response.data;
    }

   static _saveToken=async(key,value)=>{
        await AsyncStorage.setItem(key,value);
    }
}
export default AppToken;