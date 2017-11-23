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
import CommentBox from './CommentBox'
import {Icon, Avatar} from 'react-native-elements'
import moment from 'moment'

class Say extends React.Component {
    _getReplyUser(content) {
        let regx = /<a.*?>(.*?)<\/a>/ig;
        let replyUser = regx.exec(content);
        if (replyUser != null) {
            return replyUser[1];
        }
        return '';
    }
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
            <TouchableNativeFeedback>
                <View style={styles.contains}>
                    <View style={styles.container_left}>
                        <Avatar
                            small
                            source={{
                            uri: sayItem.UserIconUrl
                        }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}/>
                    </View>

                    <View style={styles.container_right}>
                        <View
                            style={{
                            flexDirection: 'row',
                            marginRight: 8
                        }}>
                            <Text style={styles.author}>
                                {sayItem.UserDisplayName}
                            </Text>
                            <Text>{moment(sayItem.DateAdded)
                                    .startOf('minute')
                                    .fromNow()}</Text>
                        </View>

                        <View style={styles.body}>
                            <Text style={styles.content}>
                                {this._getReplyUser(sayItem.Content)}
                                {this._getReplyContent(sayItem.Content)}
                            </Text>
                        </View>
                    </View>

                </View>
            </TouchableNativeFeedback>

        );
    }
}

const styles = StyleSheet.create({
    contains: {
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
        marginTop: 8
    },
    author: {
        fontSize: 15,
        color: '#333333',
        flex: 1
    },
    body: {
        marginTop: 5,
        marginBottom: 10
    },
    content: {
        marginRight: 8,
        color: 'black',
        fontSize: 15
    }
})
export default Say;