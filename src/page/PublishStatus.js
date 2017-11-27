import * as React from 'react';  
import {  
  StyleSheet,  
  View,
  Text,
  TextInput,
  AsyncStorage
} from 'react-native';
import {CheckBox,Icon,Button} from 'react-native-elements'
import {observer} from 'mobx-react';
import observableStatuesStore from '../services/statuesService';
import Toast from 'react-native-root-toast';

@observer
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
        Toast.show('请先登录',{
           position: Toast.positions.CENTER,
      })
      return;
    }

      await observableStatuesStore.publishStatues(this.state.txtValue,this.state.check)
      Toast.show('发布成功',{
         position: Toast.positions.CENTER,
       })
      this.refs.input.clear();       
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
                    title='公开'
                    checked={!this.state.check}
                    onPress={()=>this._onPress_checkbox()}
                />
                <CheckBox
                  title='私有'
                  checked={this.state.check}
                   onPress={()=>this._onPress_checkbox()}
                 />
                <Button
                    title='发布'
                    backgroundColor={this.state.sendBtnColor}
                    onPress={this._publishStatus.bind(this)}
                />
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