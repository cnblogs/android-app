import * as React from 'react'
import { Text, View, StyleSheet,FlatList, AsyncStorage, TextInput} from 'react-native'
import Say from '../../component/statues/StatusNoTouch'
import CommentList from '../../component/statues/CommentList'
import {Button} from 'react-native-elements'
import observableStatuesStore from '../../services/statuesService'
import Toast from 'react-native-root-toast';

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
    _sendToUser(item){
        this.setState({
            txtValue:`${item}`
        })
    }
    async onSubmit(value,id,id2,id3){
        const data=await AsyncStorage.getItem('a_token');
        if(data==null){
            Toast.show('请先登录',{
               position: Toast.positions.CENTER,
          })
          return;
        }
        observableStatuesStore.sendStauesComment(value,id,id2,id3)
        Toast.show('发布成功',{
              position: Toast.positions.CENTER,
            })
        this.refs.input.clear();
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
                <CommentList statusId={item.Id} Send={this._sendToUser.bind(this)}/>
              </View>
              
              <View style={styles.containerCommentBox}>
                 <TextInput placeholder="评论一下" style={styles.Input}
                            refs="input"
                            keyboardType='web-search' 
                            underlineColorAndroid='transparent'
                            value={this.state.txtValue}
                            onChangeText={(text)=>{
                              this.setState({
                                 txtValue:text,
                                 sendBtnColor:text?'#2096F3':''
                              }) 
                            }}/>
                           <Button
                                fontSize={12}
                                containerViewStyle={styles.send}
                                title='发送'
                                backgroundColor={this.state.sendBtnColor}
                                onPress={()=>this.onSubmit(this.state.txtValue,item.Id,0,0)}
                           />
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