import React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight, TouchableNativeFeedback} from 'react-native'
import moment from 'moment'

class QuestionItem extends React.Component{
    _getTag(str){
        if(str){
            return str.split(',');
        }
       return []
     }
     _navigateToContent(item){
        this.props.GoTo(item);
    }

    checkAvatar(avartarurl){
        if(avartarurl=="sample_face.gif"){
            return(
                <Image 
                source={require('../../images/d_avatar.png')} 
                style={styles.UserIcon}
                />
            )
        }
        return (
            <Image
            source={{
             uri: `https://pic.cnblogs.com/avatar/${avartarurl}`
          }}
        style={styles.UserIcon}/>
        )
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
                        {this.checkAvatar(question.QuestionUserInfo.IconName)}
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
        borderWidth:2,
        borderColor:'#f4f5f7',
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
        marginTop:8,
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
        alignItems:'center',                
    },
    answerCount:{
        color:'#808080'
    },
    answerText:{
        color:'#808080'
    },
    UserIcon: {
        width: 25,
        height: 25,
        marginRight: 8,
        borderRadius: 12.5
    },
})

export default QuestionItem;