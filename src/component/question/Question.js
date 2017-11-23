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
                        <Tags items={this._getTag(question.Tags)}/>
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
        flexDirection:'row',
        justifyContent:'center',
    },
    itemLabel:{
        flex:8,
        marginLeft:20,
        marginBottom:10,
        justifyContent:'flex-start',
    },
    itemTime:{
        flex:1,
        marginBottom:10,
        marginRight:10,
        justifyContent:'flex-end',
    },
    answerCount:{
        color:'#49A065'
    },
    answerText:{
        color:'#49A065'
    }
})

export default Question;