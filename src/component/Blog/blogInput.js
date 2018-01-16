import React from 'react'
import {View,Text,TextInput,StyleSheet,AsyncStorage,Dimensions} from 'react-native'
import {Button,Toast} from 'native-base'
import _blogService from '../../api/blogService'
import _newsService  from '../../api/newsService'

const height=Dimensions.get('window').height;

/**
 * 博客评论框组件
 * 
 * @class BlogInput
 * @extends {React.Component}
 */
class BlogInput extends React.Component{
    constructor(){
        super()
        this.state={
            inputValue:''
        }
    }

   /**
    * 发布评论
    * 
    * @returns 
    * @memberof BlogInput
    */
   async onSubmit(){
      const data=await AsyncStorage.getItem('a_token');
      if(data==null){
        return  Toast.show({
            text:'请先登陆！',
            position: "bottom",
            style:{'marginBottom':height/2-49-49},
            type:'warning'
          })
      }
      const {id,blogApp}=this.props;
      if(this.props.type=='news'){
            await _newsService.postNewsComment(id,this.state.inputValue)
        }else if(this.props.type=='blogs'){
            await _blogService.postBlogComment(blogApp,id,this.state.inputValue)
        }
        Toast.show({
            text:'发布成功！',
            position: "bottom",
            style:{'marginBottom':height/2-49-49},
            type:'success'
         })
        this.props.update();
        this.refs.input.clear();
        this.refs.input.blur();
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={{flex:1}}>
              <TextInput placeholder="评论一下" style={styles.Input}
                ref="input"
                keyboardType='web-search' 
                underlineColorAndroid='transparent'
                blurOnSubmit={false}
                multiline={true}
                onChangeText={(text)=>this.setState({inputValue:text})}
                value={this.state.inputValue}
                />
            </View>
               <View>
                <Button 
                  style={{width:50,height:30,marginRight:8,flexDirection:'row',justifyContent:'center'}}
                  primary
                  onPress={()=>this.onSubmit()}>
                  <Text style={{color:'white'}}>发送</Text>
                </Button>
             </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',        
        height:49,
        backgroundColor:'white',
        borderTopWidth:1,
        borderStyle:'solid',
        borderColor:'#D9D9D9',
        justifyContent:'center',
        alignItems:'center'      
    },
})

export default BlogInput;