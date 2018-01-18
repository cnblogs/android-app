import * as React from 'react'
import { Text, 
        View, 
        StyleSheet,
        Dimensions, 
        TextInput,
        ScrollView,
        Platform,
        AsyncStorage
    } from 'react-native'
import AnswerComment from '../../component/question/AnswerComment'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import moment from 'moment'
import _qService from '../../api/questionService'
import  {Button,Spinner,Toast} from 'native-base'
import Tags from '../../component/question/Tags'
import CommentInput from '../../component/comm/commentInput'
import AutoHeightWebView from 'react-native-autoheight-webview'


const width=Dimensions.get('window').width;

/**
 * 问题详情
 * 
 * @class QDetails
 * @extends {React.Component}
 */
class QDetails extends React.Component{
    static navigationOptions= {
        headerTitle: '问题',
    }
    constructor(){
        super()
        this.state={
            refreshState: RefreshState.Idle,
            isLoading:true,
            question:{},
            userInfo:{},
            answers:[],
        }
    }
    async componentDidMount(){
        const {Qid}=this.props.navigation.state.params.data;
        let qDetail=await this._getQuestionDetail(Qid)
        let qAnsewers=await this._getAnswerList(Qid)
        this.setState({
            question:qDetail,
            userInfo:qDetail.QuestionUserInfo,
            answers:qAnsewers,
            isLoading:false
        })

    }


    /**
     * 标签处理
     * 
     * @param {any} str 
     * @returns 
     * @memberof QDetails
     */
    _getTag(str){
        if(str){
            return str.split(',');
        }
       return []
     }



     /**
      * 获取问题详情
      * 
      * @memberof QDetails
      */
     _getQuestionDetail=async(qid)=>{
         let response=await _qService.getQuestionDetailsAsync(qid);
         if(response.status!=200){
            Toast.show({
               text:'服务器走丢了.',
               position:"center",
               type:'danger'
            })
         }
         return response.data;
     }


    /**
     * 获取问题答案列表
     * 
     * @memberof QDetails
     */
    _getAnswerList=async(qid)=>{
        let response=await _qService.getQuestionAnswerAsync(qid);
        if(response.status!=200){
            Toast.show({
               text:'服务器走丢了.',
               position:"center",
               type:'danger'
            })
         }
         return response.data;
     }

       /**
      * 回答问题
      * 
      * @memberof QDetails
      */
      postAnswer=async(content)=>{
        const{Qid}= this.state.question;
        await _qService.publishAnswer(Qid,content)
      }


      /**
       * 更新数据
       * 
       * @memberof QDetails
       */
      updateData=async()=>{
        const {Qid}=this.props.navigation.state.params.data;
        let qAnsewers=await this._getAnswerList(Qid);
        this.setState({
            answers:qAnsewers
        })
      }

       /**
     * 下拉刷新
     * 
     * @memberof QDetails
     */
    onHeaderRefresh =async () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        const {Qid}=this.props.navigation.state.params.data;
        let qAnsewers=await this._getAnswerList(Qid);
        this.setState({
            refreshState: RefreshState.Idle,
            answers:qAnsewers
        })
    }

     /**
     * 生成Key
     * 
     * @memberof BlogList
     */
    keyExtractor = (item, index) => {
        return index
    }


    /**
     * 问题详情组件
     * 
     * @memberof QDetails
     */
    renderQdetails=()=>{
        return(
            <View>
                <View style={styles.containerTitle}>
                    <Text style={styles.qTitle}>{this.state.question.Title}</Text>
                </View>

                <View style={styles.containerTags}>
                    <Tags items={this._getTag(this.state.question.Tags)}/>
                </View>
                <View style={styles.commentList}>
                   {this.renderQDesc(this.state.question.Content)}
                </View>
                <View style={styles.containerInfo}>
                    <Text>
                        <Text style={styles.DisplayName}>{this.state.userInfo.UserName}</Text>
                        <Text> 发布于 {moment(this.state.question.DateAdded).format('YYYY-MM-DD HH:mm')}</Text>
                    </Text>
                </View>
            </View>
        )
    }

    /**
     * 问题描述
     * 
     * @memberof QDetails
     */
    renderQDesc=(htmlCode)=>{
        return(
            <AutoHeightWebView
                    source={{html:htmlCode,baseUrl:'file:///android_asset/web/'}}
                    hasIframe={true}
                    scalesPageToFit={Platform.OS === 'android' ? true : false}
                    enableBaseUrl={true}
                    enableAnimation={true}
                    animationDuration={255}
                    bounces={false}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={true}
                    contentInset={{top:0,left:0}}
                    scalesPageToFit={true}
                    startInLoadingState={true}
                    >
               </AutoHeightWebView>
        )
    }

     /**
      * 渲染答案列表
      * 
      * @memberof QDetails
      */
     renderAnswerList=()=>{
        if(this.state.isLoading){
            return(
                <View style={{flex:1}}>
                  <Spinner color='#3385ff'/>
                </View>
            )
        }
        return (
            <View style={{flex:1}}>
                <RefreshListView
                    data={this.state.answers}
                    keyExtractor={this.keyExtractor}
                    renderItem={this._renderItem}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}                  
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />
            </View>
        )
     }

     _renderItem = ({item}) => {
        return <AnswerComment data={item} navigation={this.props.navigation} />   
    }

    render(){
        return(
            <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                <View style={{backgroundColor:'white'}}>
                    {this.renderQdetails()}
                </View>
            <View style={styles.containerComment}>
                  <Text style={styles.commentText}>回答 {this.state.question.AnswerCount}</Text>
            </View>
             <View style={{flex:1}}>
                 {this.renderAnswerList()}
             </View>
          </ScrollView>
             
            <View style={{marginBottom:0}}> 
                 <CommentInput 
                    postComment={this.postAnswer}
                    update={this.updateData}
                    reply=''/>
              </View>
              </View>
        )
    }
    
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop:10
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
    }
})
export default QDetails