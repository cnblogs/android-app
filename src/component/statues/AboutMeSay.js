import * as React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight, TouchableNativeFeedback} from 'react-native'
import formatDate from '../../utils/formatDate'
import CommentList from './CommentList'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CommentBox from './CommentBox'
import {Icon} from 'react-native-elements'
import HTML from 'react-native-render-html'

class AboutMeSay extends React.Component{
    _navigateToContent(item){
        this.props.GoTo(item.ContentId);        
    }
    _getReplyUser(content){
        let regx=/<a.*?>(.*?)<\/a>/ig;
        let replyUser=regx.exec(content);
        if(replyUser!=null){
            return replyUser[1];
        }
        return '';
    }
    _getReplyContent(content){
        if(content.includes("</a>")){
            let commentStr=content.split('</a>');
            return commentStr[1];
        }
        return content;
    }
    render(){
        const sayItem=this.props
    return(
        <TouchableNativeFeedback onPress={()=>this._navigateToContent(sayItem)}>
        <View style={styles.contains}>
            <View style={styles.header}>
              <View style={styles.avatar}>
                 <Image source={{uri:sayItem.IconName}} 
                       style={styles.UserIcon}
                />
               </View>
               <View style={styles.user}>
                  <View>
                     <Text style={styles.DisplayName}>{sayItem.UserName}</Text>
                     <Text style={styles.publishText}>评论</Text>
                  </View>
               </View>
               <View style={styles.publishTime}>
                    <Text>{formatDate(sayItem.DateAdded)}</Text>
               </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.content}>
                {this._getReplyUser(sayItem.Content)}
                {this._getReplyContent(sayItem.Content)}
                </Text>
            </View>

            <View style={styles.comment}>
                <View style={styles.commentIcon}>
                    <Icon
                        name='commenting-o'
                        type='font-awesome' 
                        color='#B9B9B9'/>
                </View>
            </View>
        </View>
        </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({ 
    contains:{
        backgroundColor:'white'
    },
    body:{
        marginTop:5
    },
    sepa:{
            height:10
        }, 
    header:{
        marginTop:5,
        flexDirection:'row',
        alignItems:'center'
    },
    avatar:{
        flex:1
    },
    user:{
        flex:11,
    },
    publishTime:{
        flex:2,
        flexDirection:'row',
        justifyContent: 'flex-end',
        marginRight:8
    },
    content:{
        marginLeft:8,
        marginRight:8,
        color:'black',
        fontSize:15
    },
    commentCount:{
        marginRight:16
    },
    UserIcon:{
        width:25, 
        height: 25, 
        marginLeft: 8, 
        marginRight: 8,
        borderRadius:12.5  
    },
    DisplayName:{
        color:'#00aaff',
        fontSize:15
    },
    publishText:{
        fontSize:10
    },
    message:{
        flexDirection:'row',
    },
    Icon_Message:{
        flex:2,
        marginLeft:8,
        fontSize:10
    },
    comment:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom:8          
    },
    commentIcon:{
        marginRight:8
    }
})
export default AboutMeSay;