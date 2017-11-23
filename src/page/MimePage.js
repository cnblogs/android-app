import  * as React from 'react';
import {Text, AsyncStorage,View} from 'react-native';
import UserCenter from './../component/user/UserCenter'
import Http from '../utils/Http'


class MimePage extends React.Component{
    static navigationOptions= {
        headerTitle: '我',
        headerLeft:null,
        headerTitleStyle:{
            color:'white'
        },
        headerStyle:{
            backgroundColor:'#2196F3',
            marginTop:15
            
        }
    }
    constructor(){
        super();
        this.state={
            isLogin:false,
            user:{}
        }
    }
    async componentWillMount(){
        const tokenStr=await AsyncStorage.getItem('a_token');
       let url='https://api.cnblogs.com/api/users'       
        if(tokenStr){
            let access_token=JSON.parse(tokenStr).access_token;
            let userinfo=await this._request(url,access_token);
            this.setState({
                isLogin:true,
                user:userinfo
            })
        }
    }
   async _request(url,access_token){
        let response=await Http.GetAsync(url,access_token);
        return response.data;
    }
    render(){
        return(
            <UserCenter 
                isLogin={this.state.isLogin} 
                navigation={this.props.navigation}
                user={this.state.user}
            />
        )
    }
}

export default MimePage