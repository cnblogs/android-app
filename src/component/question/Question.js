import * as React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight, TouchableNativeFeedback} from 'react-native'
import Avatar from '../comm/Avatar'
import Loading from '../comm/Loading'
import formatDate from '../../utils/formatDate'
import axios from 'axios'
import Tags from './Tags'
import moment from 'moment'

class Question extends React.Component{
    _getTag(str){
        if(str){
            return str.split(',');
        }
       return []
     }
     _navigateToContent(item){
        this.props.GoTo(item);
    }
    render(){
        const question=this.props;
        return(
            <TouchableNativeFeedback onPress={()=>this._navigateToContent(question)}>
            <View style={styles.contains}>
                <View style={styles.itemHeader}>

                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{question.Title}</Text>
                    </View>

                    <View style={styles.itemAnswer}>
                        <Text style={styles.answerCount}>{question.AnswerCount}</Text>
                        <Text style={styles.answerText}>回答</Text>
                    </View>
                </View>
                
                <View style={styles.itemFooter}>

                    <View style={styles.itemLabel}>
                      <Image
                         source={{
                          uri: `https://pic.cnblogs.com/avatar/${question.QuestionUserInfo.IconName}`
                       }}
                    style={styles.UserIcon}/>
                        <Text style={{color:'#2c2c2c',marginRight:3}}>{question.QuestionUserInfo.UserName}</Text>
                    </View>

                    <View style={styles.itemTime}>
                        <Text>{moment(question.DateAdded).startOf('minute').fromNow()}</Text>
                    </View>
                </View>
            </View>
            </TouchableNativeFeedback>
        )
    }
}
const styles=StyleSheet.create({
    contains:{
        backgroundColor:'white'
    },
    itemHeader:{
        height:60,
        flexDirection:'row',
        justifyContent:'center',
    },
    itemTitle:{
        fontSize:15,
        color:'black'
    },
    itemAnswer:{
        flex:1,
        height:40,
        width:40,
        borderWidth:1,
        borderColor:"#49A065",
        borderStyle:'solid',
        justifyContent:'center',
        alignItems:'center',
        marginTop:8,
        marginRight:20
    },
    itemContent:{
        flex:8,
        marginTop:8,
        marginLeft:20
    },
    itemFooter:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    itemLabel:{
        flex:3,
        marginLeft:20,
        marginBottom:10,
        flexDirection:'row',        
        justifyContent:'flex-start',
        alignItems:'center',        
    },
    itemTime:{
        flex:1,
        marginBottom:10,
        marginRight:20,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    answerCount:{
        color:'#49A065'
    },
    answerText:{
        color:'#49A065'
    },
    UserIcon: {
        width: 25,
        height: 25,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 12.5
    },
})

export default Question;