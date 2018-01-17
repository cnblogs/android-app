import * as React from 'react'
import { Text, View, StyleSheet,FlatList, AsyncStorage, TextInput} from 'react-native'
import Say from '../../component/statues/StatusNoTouch'
import CommentList from '../../component/statues/CommentList'
import {Button} from 'native-base'
import _statuesService from '../../api/statuesService'
import CommentInput from '../../component/comm/commentInput'


/**
 * 闪存详情页
 * 
 * @class StatusDetailScree
 * @extends {React.Component}
 */
class StatusDetailScree extends React.Component{
    static navigationOptions= {
        headerTitle: '闪存正文',
    }
    constructor(){
        super()
        this.state={
            txtValue:'',
            sendBtnColor:''
        }
    }

    /**
     * 设置回复
     * 
     * @param {any} item 
     * @memberof StatusDetailScree
     */
    sendToUser=(item)=>{
        this.setState({
            txtValue:item
        })
    }

    /**
     * 发布评论
     * 
     * @param {any} value 
     * @param {any} id 
     * @param {any} id2 
     * @param {any} id3 
     * @returns 
     * @memberof StatusDetailScree
     */
     postStatuesComent=async(content)=>{
        const {Id}=this.props.navigation.state.params.data;
        await _statuesService.publishComment(content,Id);
      }

      /**
       * 更新数据
       * 
       * @memberof StatusDetailScree
       */
      updateData=async()=>{
        console.log('更新数据...')
      }

    render(){  
        const item=this.props.navigation.state.params.data;
        return(
            <View style={styles.container}>
             <Say {...item} />
             
              <View style={styles.containerComment}>
                  <Text style={styles.commentText}>评论 {item.CommentCount}</Text>
              </View>

              <View style={styles.containerCommentList}>
                <CommentList statusId={item.Id} getSendName={this.sendToUser}/>
              </View>

              <View>
                 <CommentInput 
                    postComment={this.postStatuesComent}
                    update={this.updateData}
                    reply={this.state.txtValue}/>
              </View>

            </View>
        )
    }   
}

const styles = StyleSheet.create({  
    container: {  
      marginTop:10,
      flex:1
    }, 
    containerComment:{
        marginTop:20,
        marginBottom:10,
        height:40,
        backgroundColor:'white',
        justifyContent:'center'
    },
    containerCommentList:{
        flex:1
    },
    commentText:{
        marginLeft:8,
        color:'black',
    },
    containerInput:{
        height:60,
    },
    containerCommentBox:{
        flexDirection:'row',  
        backgroundColor:'white'      
    },
    Input:{
        flex:9,
        marginLeft:8,  
        backgroundColor:'transparent',  
        fontSize:15, 
        marginRight:10,
        alignItems:'center',
    },
    send:{   
        justifyContent:'center'        
    }
  });
export default StatusDetailScree