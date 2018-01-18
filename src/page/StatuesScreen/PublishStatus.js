import * as React from 'react';  
import {  
  StyleSheet,  
  View,
  Text,
  TextInput,
  AsyncStorage
} from 'react-native';
import {CheckBox,Icon,Button,Toast} from 'native-base'
import _statuesService from '../../api/statuesService';

/**
 * 发布闪存
 * 
 * @class PublishStatus
 * @extends {React.Component}
 */
class PublishStatus extends React.Component{
    static navigationOptions= {
        headerTitle: '发布闪存'
    }
    constructor(){
        super()
        this.state={
            check:false,
            sendBtnColor:'',
            txtValue:''
        }
    }
    _onPress_checkbox(){
        this.setState({
            check:!this.state.check
        })
    }

   async _publishStatus(){
     const data=await AsyncStorage.getItem('a_token');
     if(data==null){
        Toast.show({
            text:'请先登陆',
            position:"center",
            type:'warning'
         })
      return;
    }

      await _statuesService.publishStatues(this.state.txtValue,this.state.check)
      Toast.show({
        text:'发布成功',
        position:"center",
        type:'success'
     })
      this.refs.input.clear();   
      this.props.navigation.navigate('Status')  
    }
    
    render(){
        return(
            <View>
                <View style={styles.containerInput}>
                    <TextInput style={styles.input}
                         multiline={true}
                         ref="input"
                         placeholder="脑海中一闪而过的是什么呢?"
                         underlineColorAndroid='transparent'
                         onChangeText={(text)=>{
                            this.setState({
                                txtValue:text,
                                sendBtnColor:text?'#2B97F0':''
                             }) 
                           }}/>
                </View>
                <View style={styles.publish}>
                  <CheckBox
                     style={{marginRight:2}}
                     checked={!this.state.check}
                     onPress={()=>this._onPress_checkbox()}
                  />
                  <Text style={{marginLeft:8}}>私有</Text>
                  <CheckBox
                    style={{marginRight:2}}
                    checked={this.state.check}
                    onPress={()=>this._onPress_checkbox()}
                   />
                  <Text style={{marginLeft:8,marginRight:2}}>公开</Text>               
                <Button primar onPress={this._publishStatus.bind(this)} style={{width:50,height:30,marginRight:8,flexDirection:'row',justifyContent:'center'}}><Text style={{color:'white'}}>发布</Text></Button>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    input:{

    },
    containerInput:{
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderStyle:'solid',
        height:200,
        margin:8,
        backgroundColor:'white'
    },
    publish:{
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'flex-end'      
    }
})
export default PublishStatus