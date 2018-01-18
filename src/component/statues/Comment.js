import * as React from 'react'
import {
    Image,
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableNativeFeedback
} from 'react-native'
import moment from 'moment'
import {Thumbnail} from 'native-base'

/**
 * 评论组件
 * 
 * @class Comment
 * @extends {React.Component}
 */
class Comment extends React.Component {

    /**
     * 处理回复用户名
     * 
     * @param {any} content 
     * @returns 
     * @memberof Comment
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
     * 处理html内容
     * 
     * @param {any} content 
     * @returns 
     * @memberof Comment
     */
    _getReplyContent(content) {
        if (content.includes("</a>")) {
            let commentStr = content.split('</a>');
            return commentStr[1];
        }
        return content;
    }
    
    /**
     * @某人
     * 
     * @memberof Comment
     */
    _sendUserName(comment) {
        this.props.getSendName('@' +comment.UserDisplayName)
    }

    render() {
        const comment = this.props.comment
        return (
            <TouchableNativeFeedback>
                <View style={styles.container}>
                    <View style={styles.container_left}>
                        <Thumbnail
                            small
                            source={{
                            uri: comment.UserIconUrl
                        }}
                            activeOpacity={0.7}/>
                    </View>

                    <View style={styles.container_right}>
                        <View
                            style={{
                            flexDirection: 'row',
                            marginRight: 8
                        }}>
                            <Text style={styles.author}>
                                {comment.UserDisplayName}
                            </Text>
                            <Text>{moment(comment.DateAdded).startOf('minute').fromNow()}</Text>
                        </View>

                        <View style={styles.body}>
                            <Text style={styles.content}>
                                {this._getReplyUser(comment.Content)}
                                {this._getReplyContent(comment.Content)}
                            </Text>
                        </View>

                     <TouchableNativeFeedback onPress={() => this._sendUserName(comment)}>
                        <View style={{marginBottom:10}}>
                            <Text>回复</Text>
                        </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </TouchableNativeFeedback>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    container_left: {
        marginLeft: 8,
        marginRight: 5,
        marginTop: 8
    },
    container_right: {
        flex: 1,
        marginTop: 8,
    },
    author: {
        fontSize: 15,
        color: '#333333',
        flex: 1
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
    ReplyName: {
        color: '#00aaff'
    }
})

export default Comment;