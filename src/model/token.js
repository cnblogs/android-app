import axios from 'axios'
import {AsyncStorage} from "react-native";
import Http from './../utils/Http'
import Url from './../config/Url'
import auth from '../config/auth'



class Token{
   static Client_Credentials_Token=async()=>{
             let response
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
       let data=`grant_type=client_credentials&client_id=${auth.clientId}&client_secret=${auth.clientSecret}`
       let response=await Http.PostAsFormAsync(Url.TOKEN,data)
       return response.data;
    }

   static _saveToken=async(key,value)=>{
            await AsyncStorage.setItem(key,value);
    }
}
export default Token;