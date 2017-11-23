import * as React from 'react'
import 
{
    Image,
    Text,
    StyleSheet,
    View,
    FlatList,
    AsyncStorage
} from 'react-native'
import {Icon} from 'react-native-elements'
import token from '../../model/token' 
import Avatar from '../comm/Avatar'
import Http from '../../utils/Http'

class StatusHeader extends React.Component{

    constructor(){
        super();
        this.state={
            avatarUrl:'',
            isLogin:false
        }
    }
   async componentWillMount(){
        const tokenStr=await AsyncStorage.getItem('a_token');
        if(tokenStr!=null){
            this.GetUserIcon();
            this.setState({
                isLogin:true,
                avatarUrl:this.state.avatarUrl
            })
        }
    }
   async GetUserIcon(){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let url='https://api.cnblogs.com/api/users'       
        if(tokenStr){
            let access_token=JSON.parse(tokenStr).access_token;
            let userinfo=await this._request(url,access_token);
            this.setState({
                avatarUrl:userinfo.Avatar
            })
        }
    }

    async _request(url,access_token){
        let response=await Http.GetAsync(url,access_token);
        return response.data;
    }

    _goToPublish(){
        this.props.navigate("PublishStatus")     
    }
    render(){
        if(this.state.isLogin){
            return(
                <View style={styles.statusContainer}>
                <View style={styles.itemHeader}>
                <Image source={{uri:this.state.avatarUrl}} style={styles.itemAvatar}/>                
                    <Text style={styles.itemAuthor}>闪存</Text>
                </View>
               
                <View style={styles.spance}></View>
    
                <View style={styles.itemAdd}>
                    <Icon
                        name='add'
                        color='white' 
                        size={30}
                        onPress={()=>this._goToPublish()}/>
                </View>
            </View>)
        }
            return(
            <View style={styles.statusContainer}>
            <View style={styles.itemHeader}>
            <Image source={require('../../images/d_avatar.png')} style={styles.itemAvatar}/>
                <Text style={styles.itemAuthor}>闪存</Text>
            </View>
           
            <View style={styles.spance}></View>

            <View style={styles.itemAdd}>
                <Icon
                    name='add'
                    color='white' 
                    size={30}
                    onPress={()=>this._goToPublish()}/>
            </View>
        </View>)
    }
}
const styles = StyleSheet.create({
    statusContainer:{
        flexDirection:'row',
        backgroundColor:'#2196F3',
        height:40,
        marginTop:18
    },
    itemAdd:{
        width:40,
        marginRight:20,
        alignItems:'center' ,
        justifyContent:'center'                
    },
    spance:{
        flex:1
    },
    itemHeader:{
        flexDirection:'row',
        width:40,
        alignItems:'center',
        marginLeft:20
        },
    itemAvatar:{
        width:25, 
        height: 25, 
        marginLeft: 8, 
        marginRight: 8,
        borderRadius:12.5
    },
    itemAuthor:{
        fontSize:15,
        color:'white'
    }
});
export default StatusHeader;