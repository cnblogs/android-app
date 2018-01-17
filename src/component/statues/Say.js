import * as React from 'react'
import {
    Image,
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native'
import CommentList from './CommentList'
import moment from 'moment'
import {Thumbnail,Icon,StyleProvider,getTheme} from 'native-base'

/**
 * 单条闪存组件
 * 
 * @class Say
 * @extends {React.Component}
 */
class Say extends React.Component {

    /**
     * 跳转到详情页
     * 
     * @param {any} item 
     * @memberof Say
     */
    linkToDetails(item) {
        this.props.linkToDetails(item);
    }

    /**
     * 处理回复人名
     * 
     * @param {any} content 
     * @returns 
     * @memberof Say
     */
    _getReplyUser(content) {
        let regx = /<a.*?>(.*?)<\/a>/ig;
        let replyUser = regx.exec(content);
        if (replyUser != null) {
            return replyUser[1];
        }
        return '';
    }

    /**
     * 处理内容
     * 
     * @param {any} content 
     * @returns 
     * @memberof Say
     */
    _getReplyContent(content) {
        if (content.includes("</a>")) {
            let commentStr = content.split('</a>');
            return commentStr[1];
        }
        return content;
    }
    render() {
        const sayItem = this.props
        return (
            <TouchableNativeFeedback onPress={() => this.linkToDetails(sayItem)}>
                <View style={styles.contains}>
                    <View style={styles.container_left}>
                        <Thumbnail
                            small
                            source={{
                            uri: sayItem.UserIconUrl
                        }}
                            activeOpacity={0.7}/>
                    </View>

                    <View style={styles.container_right}>
                        <View style={{flex:1,flexDirection:'row',marginRight:8}}>
                            <Text style={styles.author}>{sayItem.UserDisplayName}</Text>
                            <Text>{moment(sayItem.DateAdded).startOf('minute').fromNow()}</Text>
                        </View>
                        <View style={styles.body}>
                            <Text style={styles.content}>
                                {this._getReplyUser(sayItem.Content)}
                                {this._getReplyContent(sayItem.Content)}
                            </Text>

                            <View style={styles.comment}>
                                <View style={styles.commentIcon}>
                                <StyleProvider style={getTheme({ iconFamily: 'FontAwesome' })}>
                                    <Icon name='comment' style={{color:'#B9B9B9',fontSize:15}} />
                                </StyleProvider>
                                    <Text
                                        style={{
                                        marginLeft: 5
                                    }}>{sayItem.CommentCount}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}
const styles = StyleSheet.create({
    contains: {
        flexDirection:'row',
        backgroundColor:'#f9f9f9'
    },
    container_left:{
        marginLeft:8,
        marginRight:5,
        marginTop:8
    },
    container_right:{
        flex:1,
        marginTop:8 
    },
    author:{
        fontSize:15,
        color:'#333333',
        flex:1
    },
    body: {
        marginTop: 5,
        marginBottom: 8
    },
    content: {
        marginRight: 8,
        color: 'black',
        fontSize: 15
    },
    comment: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 8
    },
    commentIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop:5,
        marginRight: 8
    }
});


export default Say;
