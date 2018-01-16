import React from 'react'
import { View,Text,StyleSheet,TouchableHighlight,AsyncStorage,Dimensions} from 'react-native'
import {Icon,Badge,StyleProvider,getTheme,Button,Toast} from 'native-base';
import _bookmarkService from '../../api/bookmarksService'

const height=Dimensions.get("window").height;
/**
 * 底部推荐 收藏 评论功能组件
 * 
 * @class ContentFooter
 * @extends {React.Component}
 */
class ContentFooter extends React.Component{
    constructor(){
        super()
        this.state={
            isCollection:false,
            isDigg:false,
            DiggCount:'',
        }
    }

  async  componentWillMount(){       
       await this._checkCollection();
        this.setState({
            DiggCount:this.props.data.DiggCount
        })
    }

   /**
    * 检查重复收藏
    * 
    * @returns 
    * @memberof ContentFooter
    */
   async _checkCollection(){
        let linkUrl=this.props.data.Url;
        const data=await AsyncStorage.getItem('a_token');
        if(data!=null){
         if(this.props.data.url==null){
              linkUrl=`https://news.cnblogs.com/n/${this.props.data.Id}/`
         }
          let code=await _bookmarkService.checkBookmarks(linkUrl)
          if(code==200){
              this.setState({
                isCollection:true,
              })
          }
        }
        return;
    }

   /**
    * 是否登陆
    * 
    * @returns 
    * @memberof ContentFooter
    */
   async isLogin(){
        const data=await AsyncStorage.getItem('a_token');
        if(data==null){
            return false;
        }
        return true;
    }

    /**
     * 点击推荐
     * 
     * @memberof ContentFooter
     */
   async _recommend(){
        let isLogin=await this.isLogin();
        if(isLogin){
            this.setState({
              isDigg:!this.state.isDigg
            })
            return;
        }
      return  Toast.show({
            text:'请先登陆！',
            position: "bottom",
            style:{'marginBottom':height/2-49-49},
            type:'warning'
         })
    }

   /**
    * 点击收藏按钮
    * 
    * @memberof ContentFooter
    */
   async diggBookmark(){
        let isLogin=await this.isLogin();
        if(isLogin){
            if(this.state.isCollection){
                await this._removeBookmark();
                return;
            }else{
                await this._addBookmark();
                return;
            }
        }
      return  Toast.show({
          text:'请先登陆！',
          position: "bottom",
          style:{'marginBottom':height/2-49-49},
          type:'warning'
        })
      }

   /**
    * 添加收藏
    * 
    * @returns 
    * @memberof ContentFooter
    */
   async _addBookmark(){
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
         let response= await _bookmarkService.addBookmarks(data);
        if(response.status!=201){
          return  Toast.show({
              text:'服务器走丢了.',
              position: "bottom",
              style:{'marginBottom':height/2-49-49},
              type:'danger'
            })
        }
        this.setState({
            isCollection:!this.state.isCollection
        })
        return  Toast.show({
            text:'已收藏',
            position: "bottom",
            style:{'marginBottom':height/2-49-49},
            type:'success'
         })
    }

    /**
     * 删除收藏
     * 
     * @memberof ContentFooter
     */
    async _removeBookmark(){
        let linkUrl=this.props.data.Url;
        if(this.props.data.url==null){
            linkUrl=`https://news.cnblogs.com/n/${this.props.data.Id}/`
        }
        await _bookmarkService.removeBookmarkByUrl(linkUrl)
        this.setState({
            isCollection:!this.state.isCollection
         })
    }

    render(){
        const {data}=this.props;
        return(
            <View style={styles.container}>  
                <TouchableHighlight 
                    style={styles.container_comment_box}
                    onPress={()=>this.props.linkToComments(data.BlogApp,data.PostId)}>
                    <View style={styles.container_comment}>
                    <StyleProvider style={getTheme({ iconFamily: 'MaterialIcons' })}>
                    <Icon
                        name='create' 
                        style={{fontSize: 20, color:'#757575',marginLeft:10}}
                        />
                        </StyleProvider>
                    <Text style={{marginLeft:10}}>评论一下</Text>
                    </View>
                </TouchableHighlight>
           
                <View style={styles.container_tool}>                      
                    <View style={styles.thumb_up}>
                        <StyleProvider style={getTheme({ iconFamily: 'FontAwesome' })}>
                        <Icon
                           name='thumbs-o-up'
                        style={{fontSize: 20, color:this.state.isDigg?'#2096F3':'#757575'}}
                           onPress={()=>this._recommend()}/>
                        </StyleProvider>
                    </View> 

                    <View style={styles.favorite}>
                      <StyleProvider style={getTheme({ iconFamily: 'MaterialIcons' })}>                    
                      <Icon 
                        name="favorite-border"
                        style={{fontSize: 20, color:this.state.isCollection?'#2096F3':'#757575'}}
                        onPress={()=>this.diggBookmark()}
                        />
                      </StyleProvider>
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
        justifyContent:'center',        
        marginRight:10
    },
    favorite:{
        justifyContent:'center',        
    }
})

export default ContentFooter;