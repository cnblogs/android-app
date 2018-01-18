import React from 'react'
import {View,Text,StyleSheet,Platform,Dimensions,TouchableHighlight,Image} from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import moment from 'moment'


class Comment extends React.Component{
    setDefaultAvatar=(avatar)=>{
        if(avatar.indexOf('.gif')<0){
            return(
            <View style={styles.container}>
            <Image source={require('../../images/d_avatar.png')}
                       style={styles.avatar}
                       />
        </View>)
        }
        return(
            <View style={styles.container}>
                <Image source={{uri:`https://pic.cnblogs.com/avatar/${avatar}`}} 
                           style={styles.avatar}
                           />
            </View>
        );
    }
    render(){
        const data=this.props.data;
        return(
            <View style={styles.container}>
              <View style={styles.container_left}>
                 {this.setDefaultAvatar(data.PostUserInfo.IconName)}
                </View>
                <View style={styles.container_right}>
                    <View>
                        <Text style={styles.author}>{data.PostUserInfo.UserName}</Text>
                    </View>
                    <View style={{marginRight:8}}>
                    <AutoHeightWebView
                      hasIframe={true}
                      scalesPageToFit={Platform.OS === 'android' ? true : false} 
                      enableBaseUrl={true}
                      enableAnimation={true}
                      animationDuration={255}
                      source={{ html:data.Content}} 
                      style={{ width: Dimensions.get('window').width -15-48}}
                      customScript={`document.body.style.background = 'white';`}
                      customStyle={`
                      * {
                         font-family: 'Times New Roman';
                         margin-top:3px
                        }
                      p {
                         font-size: 13px;
                        }
                      img {
                        width:100%;
                        height:auto;
                       }
                     `}
                    />
                    </View>
                    <View style={styles.container_bottom}>
                        <Text style={{marginLeft:5}}>{moment(data.DateAdded).startOf('minute').fromNow()}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'white'
    },
    avatar:{
        width:25, 
        height: 25,
        borderRadius:12.5
    },
    container_left:{
        width:50,
        marginLeft:8,
        marginRight:5,
        marginTop:8
    },
    container_right:{
        flex:1,
        marginTop:8
    
    },
    container_bottom:{
        flexDirection:'row',
        marginBottom:5
    },
    author:{
        fontSize:15,
        color:'#333333'
    }
})

export default Comment