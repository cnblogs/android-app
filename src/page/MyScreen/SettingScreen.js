import  * as React from 'react';
import {Text, AsyncStorage,StyleSheet,View} from 'react-native';
import {Button} from 'native-base';
import CookieManager from 'react-native-cookies'

class SettingScreen extends React.Component{
    static navigationOptions={
        title:'设置'
    }
constructor(){
    super()
    this.state={
        isLogin:false,
        btnBackgroundColor:'#397af8'
    }
}
async componentWillMount(){
    const data=await AsyncStorage.getItem('a_token');
   if(data){
        this.setState({
            isLogin:true,
            btnBackgroundColor:'#EB5F6B'
        })
   }
}
   async loginout(){
        //清除cookies
        CookieManager.clearAll().then((res)=>{
            console.log("CookieManager.ClearAll is Ok")
          })
        //清除token
       await AsyncStorage.removeItem('a_token')
       this.props.navigation.navigate('Mime')
    }
    render(){
        return(
            <View style={styles.container}>
              <Button
                 full
                 backgroundColor={this.state.btnBackgroundColor}
                 color='white'
                 disabled={!this.state.isLogin}
                 onPress={()=>this.loginout()}
            ><Text>退出登录</Text></Button>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        marginTop:50,
        flex:1
    }
})

export default SettingScreen;