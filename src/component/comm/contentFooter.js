import React from 'react'
import { View,Text,StyleSheet,TouchableHighlight,AsyncStorage} from 'react-native'
import {Icon,Badge} from 'react-native-elements'
import Toast from 'react-native-root-toast';
import token from '../../model/token'
import { observer } from 'mobx-react/native';
import collectionService from '../../services/collectionService'


@observer
class ContentFooter extends React.Component{
    constructor(){
        super()
        this.state={
            isCollection:false,
            isDigg:false,
            DiggCount:'',
        }
    }

    componentWillMount(){
        this._checkCollection()
        this.setState({
            DiggCount:this.props.data.DiggCount
        })
    }

   async _checkCollection(){
        const data=await AsyncStorage.getItem('a_token');
        if(data!=null){
            let linkUrl=this.props.data.Url;
          if(this.props.data.url==null){
              linkUrl=`https://news.cnblogs.com/n/${this.props.data.Id}/`
           }
          let code=await collectionService.Check(linkUrl)
          if(code==200){
              this.setState({
                isCollection:true,
              })
          }
        }
        return;
    }

   async _saveUrl(){
        const data=await AsyncStorage.getItem('a_token');
        if(data==null){
           Toast.show('请先登录',{
            position: Toast.positions.CENTER,
           })
        }else{
            if(!this.state.isCollection){
                let linkUrl=this.props.data.Url;
                if(this.props.data.url==null){
                    linkUrl=`https://news.cnblogs.com/n/${this.props.data.Id}/`
                }
                let data={
                    "Title":this.props.data.Title,
                    "LinkUrl":linkUrl,
                    "Tags":[],
                    "Summary":this.props.data.Description,
                }
               let code= await collectionService.Save(data);
               if(code==201){
                  Toast.show('已添加收藏',{
                      position: Toast.positions.CENTER,
                   })
                   this.setState({
                      isCollection:!this.state.isCollection
                   })
               }else{
                  Toast.show('收藏失败',{
                      position: Toast.positions.CENTER,
                   })
               }     
            }else{
                let linkUrl=this.props.data.Url;
                if(this.props.data.url==null){
                    linkUrl=`https://news.cnblogs.com/n/${this.props.data.Id}/`
                }
                let code =await collectionService.Remove(linkUrl)
                this.setState({
                    isCollection:!this.state.isCollection
                 })
            }
        }
            
        
    }

    _recommend(){
        if(!this.state.isDigg){
           this.setState({
             DiggCount:this.state.DiggCount+1,
             isDigg:true
        })
       }else{
          this.setState({
            isDigg:false,
            DiggCount:this.state.DiggCount-1
          })
       }
    }

    render(){
        const data=this.props.data
        return(
            <View style={styles.container}>  
                <TouchableHighlight 
                    style={styles.container_comment_box}
                    onPress={()=>this.props.navigation(data.BlogApp,data.Id)}>
                    <View style={styles.container_comment}>
                    <Icon
                        name='create' 
                        color='#757575'
                        containerStyle={{marginLeft:10}}/>
                    <Text style={{marginLeft:10}}>评论一下</Text>
                    </View>
                </TouchableHighlight>
           
                <View style={styles.container_tool}>
                    <View style={styles.thumb_up}>
                        <Icon 
                           name='thumbs-o-up'
                           type='font-awesome'
                           color='#757575'
                           onPress={()=>this._recommend()}/>
                           
                        <View style={{alignItems:'flex-start',marginTop:5}}>
                          <Badge
                           value={this.state.DiggCount}
                           containerStyle={{backgroundColor:'#2096F3'}}
                           textStyle={{ color: 'white',fontSize:6}}
                         /> 
                        </View>            
                    </View>

                    <View style={styles.comment}>
                      <Icon name="chat-bubble-outline"
                      color='#757575'
                      onPress={()=>this.props.navigation(data.BlogApp,data.Id)}/>
                      <View style={{alignItems:'flex-start',marginTop:5}}>
                      <Badge
                       value={data.CommentCount}
                       containerStyle={{backgroundColor:'#2096F3'}}
                       textStyle={{ color: 'white',fontSize:6}}
                     /> 
                    </View>
                    </View>

                    <View style={styles.favorite}>
                    <Icon 
                      name="favorite-border"
                      color={this.state.isCollection?'#2096F3':'#757575'}
                      onPress={()=>this._saveUrl()}
                      />
                 </View>

                </View>            
            </View> 
        )
    }
}

const styles=StyleSheet.create({
    container:{
        height:49,
        flexDirection:'row',
        alignSelf:'center',
        backgroundColor:'white',
        borderTopWidth:1,
        borderTopColor:'#D9D9D9',
        borderStyle:'solid',  
    },
    container_comment_box:{
        flexDirection:'row',
        height:30,
        marginLeft:10,
        alignSelf:'center',
        alignItems:'center',
        flex:1,
    },
    container_comment:{
        flexDirection:'row',
        height:30,
        marginLeft:10,
        alignSelf:'center',
        alignItems:'center',
        borderColor:'#d3d3d3',
        borderRadius:8,
        borderStyle:'solid',
        borderWidth:1,
        flex:1,
    },
    container_tool:{
        flex:1,        
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:5
    },
    thumb_up:{
        flexDirection:'row',
        marginRight:10
    },
    favorite:{
        flexDirection:'row',
    },
    comment:{
        flexDirection:'row',
        marginRight:10        
    }
})

export default ContentFooter;