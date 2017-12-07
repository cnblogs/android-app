import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    AsyncStorage
} from 'react-native'
import {Button} from 'react-native-elements'
import questionService from '../../services/questionService'
import { observer } from 'mobx-react/native';
import {Info,Error,Success} from '../../component/comm/CustomToast'

@observer
class PublishQuestion extends Component {
  static navigationOptions= {
    headerTitle: '提问'
  }

  constructor(){
    super();
    this.state={
      titleValue:'',
      labelValue:'',
      contentValue:''
    }

  }
  async onSubmit(){
    const data=await AsyncStorage.getItem('a_token');
    if(data==null){
        Info("请先登录");
      return;
    }
    await questionService.publishQuestion(this.state.titleValue,this.state.contentValue,this.state.labelValue)
      Success("发布成功")
      this.refs.inputTitle.clear();
      this.refs.inputLabel.clear();
      this.refs.inputQuestion.clear();
      this.props.navigation.navigate('Question');
  }


  render() {
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
         <View style={{height:40,marginTop:15}}>
            <TextInput 
               placeholder="标题" 
               ref="inputTitle"
               keyboardType='web-search' 
               blurOnSubmit={false}
               multiline={true}
               style={{fontSize:16,color:'black'}}
               onChangeText={(text)=>this.setState({titleValue:text})}
               value={this.state.titleValue}/>
         </View>
         <View style={{height:40}}>
           <TextInput 
             placeholder="标签(多标签请用逗号分隔)"
             ref="inputLabel"
             keyboardType='web-search'
             blurOnSubmit={false}
             multiline={true}
             onChangeText={(text)=>this.setState({labelValue:text})}
             value={this.state.labelValue}/>
         </View>
             <View style={{flex:1}}>
                 <View style={styles.QuestionInput}>
                   <TextInput 
                    placeholder="问题描述....(不少于25个字)"
                    ref="inputQuestion"
                    keyboardType='web-search'
                    underlineColorAndroid='transparent'
                    blurOnSubmit={false}
                    multiline={true}
                    onChangeText={(text)=>this.setState({contentValue:text})}
                    value={this.state.contentValue}/>
                 </View>
             </View>
             <View style={{marginTop:10,marginBottom:10}}>
             <Button 
              title='发布' 
              buttonStyle={{height:30}}
              backgroundColor="#2096F3" 
              onPress={()=>this.onSubmit()}/>
          </View>
       </View>
    );
  }
}
const styles=StyleSheet.create({
  QuestionInput:{
    borderColor:'#BFBFBF',
    borderStyle:'solid',
    borderWidth:2,
    flex:1,
    marginLeft:5,
    marginRight:5,
    marginTop:10
 }
})
export default PublishQuestion

