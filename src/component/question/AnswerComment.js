import * as React from 'react'
import
{
    Image,
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform
}
from 'react-native'
import Comment from './Comment'
import axios from 'axios'
import AutoHeightWebView from 'react-native-autoheight-webview'
import moment from 'moment'
import {Icon} from 'react-native-elements'
import AppToken from '../../config/AppToken';

class AnswerComment extends React.Component {
    constructor() {
        super()
        this.state = {
            answer: {},
            answerUserInfo: {},
            comments: []
        }
    }
    async componentWillMount() {
        const item = this.props.data
        this.setState({answer: item, answerUserInfo: item.AnswerUserInfo})
        let commentArray = await this._requestComments(item.AnswerID);
        this.setState({comments: commentArray})
    }

    _navigationToAnswerDetail(comments){
        const {navigate} =this.props.navigation;
        navigate('QAnswerDetail',{
            comments:comments,
            Qid:this.state.answer.Qid,
            AnswerID:this.state.answer.AnswerID
        })
    }
    
    async _requestComments(answerId) {
        const access_token = await AppToken.Update_Client_Token();
        let response = await axios({
            method: 'Get',
            url: `https://api.cnblogs.com/api/questions/answers/${answerId}/comments`,
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })
        return response.data;
    }
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.header}>

                        <View style={styles.avatar}>
                            <Image
                                source={{
                                uri: `https://pic.cnblogs.com/avatar/${this.state.answerUserInfo.IconName}`
                            }}
                                style={styles.UserIcon}/>
                        </View>

                        <View style={styles.user}>
                            <View>
                                <Text style={styles.DisplayName}>{this.state.answerUserInfo.UserName}</Text>
                            </View>
                        </View>

                        <View style={styles.publishTime}>
                            <Text>{moment(this.state.answer.DateAdded).startOf('minute').fromNow()}</Text>
                        </View>

                    </View >

                    <View style={styles.containerComment}>
                        <AutoHeightWebView
                            hasIframe={true}
                            scalesPageToFit={Platform.OS === 'android'
                            ? true
                            : false}
                            enableBaseUrl={true}
                            heightOffset={5}
                            enableAnimation={true}
                            animationDuration={255}
                            startInLoadingState={true}
                            source={{
                            html: this.state.answer.Answer,
                            baseUrl: 'file:///android_asset/web/'
                        }}
                            customScript={`document.body.style.background = 'white';`}
                            customStyle={` * { font-family: 'Times New Roman'; } p { font-size: 16px; padding:5px; } img { width:100%; height:auto; } `}/>
                    </View>

                    <View style={styles.comment}>
                      <View>
                         <TouchableNativeFeedback onPress={()=>this._navigationToAnswerDetail(this.state.comments)}>
                            <Text>回复</Text>
                        </TouchableNativeFeedback>
                      </View>

                    <View style={styles.commentIcon}>
                        <Icon
                            name='comment-o'
                            type='font-awesome' 
                            color='#B9B9B9'
                            size={15}/>
                            <Text style={{marginLeft:5}}>{this.state.answer.CommentCounts}</Text>
                    </View>
                </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderBottomColor: '#dedede',
        borderStyle: 'solid',
        borderBottomWidth: 1
    },
    containerComment: {
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 10
    },
    DisplayName: {
        color: '#7A7A7A',
        fontSize: 12
    },
    header: {
        marginTop: 5,
        flexDirection: 'row'
    },
    avatar: {
        width:35
    },
    user: {
        flex:1,
        marginLeft:5
    },
    UserIcon: {
        width: 25,
        height: 25,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 12.5
    },
    publishTime: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight:10
    },
    comment:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginLeft:8,
        marginBottom:8          
    },
    commentIcon:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:8
    }
})

export default AnswerComment