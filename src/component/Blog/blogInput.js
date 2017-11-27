import React from 'react'
import {View,Text,TextInput,StyleSheet,AsyncStorage} from 'react-native'
import {Button} from 'react-native-elements'
import { observer } from 'mobx-react/native';
import blogService from '../../services/blogService'
import newsService  from '../../services/newsService'
import Toast from 'react-native-root-toast';

@observer
class BlogInput extends React.Component{
    constructor(){
        super()
        this.state={
            inputValue:''
        }
    }

   async onSubmit(){
      const data=await AsyncStorage.getItem('a_token');
      if(data==null){
          Toast.show('请先登录',{
             position: Toast.positions.CENTER,
        })
        return;
      }
      if(this.props.type=='news'){
            await newsService.postNewsComment(this.props.id,this.state.inputValue)
        }else if(this.props.type=='blogs'){
            await blogService.postBlogComment(this.props.blogApp,this.props.id,this.state.inputValue)
        }
        Toast.show('发布成功',{
            position: Toast.positions.CENTER,
           })
        this.refs.input.clear();
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
                title='发送' 
                buttonStyle={{height:30}}
                backgroundColor="#2096F3" 
                onPress={()=>this.onSubmit()}/>
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