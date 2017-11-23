import * as React from 'react';  
import {  
  StyleSheet,  
  View,  
  WebView,  
  Dimensions, 
  AsyncStorage 
} from 'react-native'; 
import auth from '../config/auth' 
import Http from './../utils/Http'
import Url from './../config/Url'
import CookieManager from 'react-native-cookies'

const {width, height} = Dimensions.get('window');  
  
const url =`https://oauth.cnblogs.com/connect/authorize?client_id=${auth.clientId}`+
`&scope=openid profile CnBlogsApi offline_access`+
`&response_type=code id_token`+
`&redirect_uri=https://oauth.cnblogs.com/auth/callback`+
`&state=abc`+
`&nonce=xyz`
export default class LoginPage extends React.Component {
  static navigationOptions={
    title:'登录',
    headerStyle:{
      marginTop:15  
  }
}
  componentWillMount(){
    CookieManager.clearAll().then((res)=>{
      console.log("CookieManager.ClearAll is Ok")
    })
  }
   async onNavigationStateChange(navState) {
      if(navState.url.indexOf('#')>0){
          let authorizationCode=this._getAuthorizationCode(navState.url)
          let data=`client_id=${auth.clientId}`+
          `&client_secret=${auth.clientSecret}`+
          `&grant_type=authorization_code`+
          `&code=${authorizationCode}`+
          `&redirect_uri=https://oauth.cnblogs.com/auth/callback`
          let response=await Http.PostAsFormAsync(Url.TOKEN,data)
          console.log(response.data)
          //保存 token
          await this._saveToken('a_token',JSON.stringify(response.data))
          //哪里来回那里去
          this.props.navigation.navigate('Mime')
        }
    } 
  _getAuthorizationCode(url){
        let queryString =url.split('#')[1]
        let queryCode =queryString.split('&')[0]
        let authorizationCode=queryCode.split('=')[1]
        return authorizationCode;
  }

  async _saveToken(key,value){
      await AsyncStorage.setItem(key,value)       
  }

  render() {  
    return (  
      <View style={styles.container}>  
        <WebView  
          style={{width:width,height:height-20,backgroundColor:'gray'}}  
          source={{uri:url,method: 'GET'}}  
          javaScriptEnabled={true}  
          domStorageEnabled={true}  
          scalesPageToFit={true}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          startInLoadingState={true}
          />  
      </View>  
    );  
  }  
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#f2f2f2', 
  },  
});