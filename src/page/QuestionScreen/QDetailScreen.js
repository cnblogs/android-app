import * as React from 'react'
import { Text, 
        View, 
        StyleSheet,
        FlatList,
        WebView, 
        Dimensions, 
        TextInput,
        ScrollView,
        Platform,
        AsyncStorage
    } from 'react-native'
import Tags from '../../component/question/Tags'
import AnswerComment from '../../component/question/AnswerComment'
import axios from 'axios'
import AutoHeightWebView from 'react-native-autoheight-webview'
import moment from 'moment'
import questionService from '../../services/questionService'
import  {Button} from 'react-native-elements'
import Toast from 'react-native-root-toast';
import token from '../../model/token'
import { observer } from 'mobx-react/native';

@observer
class QDetailScree extends React.Component{
    static navigationOptions= {
        headerTitle: '问题',
    }
    constructor(){
        super()
        this.state={
            question:{},
            userInfo:{},
            answers:[]
        }
    }
    async componentWillMount(){
        const item=this.props.navigation.state.params.data;
        let qDetail=await this._requestItem(item.Qid)
        let qAnsewers=await this._requestComments(item.Qid)
        this.setState({
            question:qDetail,
            userInfo:qDetail.QuestionUserInfo,
            answers:qAnsewers,
        })

    }
    _getTag(str){
        if(str){
            return str.split(',');
        }
       return []
     }


    async _requestItem(qid){
        const access_token=await token.Update_Client_Token();
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/questions/${qid}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           return response.data;
     }

     async _requestComments(qid){
        const access_token=await token.Update_Client_Token();
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/questions/${qid}/answers`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           return response.data;
    }

     _renderItem(answer){
         return(
            <AnswerComment data={answer} navigation={this.props.navigation} />   
         )
     }

    async sendComment(qid,answer){
        const data=await AsyncStorage.getItem('a_token');
        if(data==null){
            Toast.show('请先登录',{
               position: Toast.positions.CENTER,
          })
          return;
        }
        await questionService.sendAnswer(qid,answer);
        Toast.show('回答成功',{
            position: Toast.positions.CENTER,
       })
       this.refs.input.clear();       
    }

    render(){
        return(
        <View style={styles.main}>
            <ScrollView style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={styles.qTitle}>{this.state.question.Title}</Text>
                </View>

                <View style={styles.containerTags}>
                    <Tags items={this._getTag(this.state.question.Tags)}/>
                </View>

                <View style={styles.containerContent}>
                <AutoHeightWebView
                hasIframe={true}
                scalesPageToFit={Platform.OS === 'android' ? true : false} 
                enableBaseUrl={true}
                heightOffset={5}
                enableAnimation={true}
                animationDuration={255}
                startInLoadingState={true}
                source={{ html:this.state.question.Content,baseUrl:'file:///android_asset/web/'
              }} 
               customScript={`document.body.style.background = 'white';`}
               customStyle={`
              * {
                  font-family: 'Times New Roman';
              }
              p {
                  font-size: 16px;
              }
              img {
                  width:100%;
                  height:auto;
              }
              `}
              />
                </View>

                <View style={styles.containerInfo}>
                    <Text>
                        <Text style={styles.DisplayName}>{this.state.userInfo.UserName}</Text>
                        <Text> 发布于 {moment(this.state.question.DateAdded).format('YYYY-MM-DD HH:mm')}</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.containerComment}>
                  <Text style={styles.commentText}>回答 {this.state.question.AnswerCount}</Text>
            </View>

            <View style={styles.commentList}>
                <FlatList 
                   data={this.state.answers}
                   renderItem={({item})=>this._renderItem(item)}
                />
            </View>
            </ScrollView>
            <View style={styles.containerCommentBox}>
                    <TextInput placeholder="帮助一下他" style={styles.Input} 
                           keyboardType='web-search' 
                           underlineColorAndroid='transparent'
                           ref="input"
                           onChangeText={(text)=>{
                            this.setState({
                                txtValue:text,
                                sendBtnColor:text?'green':''
                             }) 
                           }}/>
                           <Button
                                fontSize={12}
                                title='发送'
                                backgroundColor={this.state.sendBtnColor}
                                containerViewStyle={styles.send}
                                onPress={()=>{
                                    this.sendComment(this.state.question.Qid,this.state.txtValue)
                                }}
                           />
                        </View>        
             </View>    
        )
    }
    
}

const styles=StyleSheet.create({
    main:{
        backgroundColor:'#E9E9EF',
        flex:1      
    },
    container:{
        backgroundColor:'white'
    },
    containerTitle:{
        marginTop:8,
        marginLeft:8,
        marginRight:8,
    },
    containerTags:{
        marginTop:5,
        marginLeft:8,
        marginRight:8,
    },
    containerContent:{
        marginRight:8,
        marginBottom:10,
    },
    containerInfo:{
        marginLeft:8,
        marginRight:8,
        marginTop:5,
        marginBottom:10,       
    },
    qTitle:{       
        fontSize:18,
        color:'black'
    },
    itemLabel:{
        marginLeft:8,
        marginRight:8,
        marginBottom:5,
        justifyContent:'flex-start',
    },
    DisplayName:{
        color:'#00aaff',
        fontSize:15,
    },
    containerComment:{
        marginTop:10,
        marginBottom:10,
        height:40,
        backgroundColor:'white',
        justifyContent:'center'
    },
    commentText:{
        marginLeft:8,
        color:'black',
    },
    containerInput:{
        height:60,
    },
    commentList:{
        
    },
    containerCommentBox:{
        flexDirection:'row',  
        backgroundColor:'white',
        height:60    
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
        flex:2,   
        justifyContent:'center'        
    }
})
export default QDetailScree