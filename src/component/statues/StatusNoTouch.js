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
import {Icon, Thumbnail,StyleProvider,getthem} from 'native-base'
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

     /**
    * 幸运闪
    * 
    * @memberof Say
    */
   renderStatuesContent=(content,isLucky)=>{
    if(isLucky){
      return(<View style={{flexDirection:'row'}}>
            <Text style={styles.content}> {this._getReplyContent(content)}</Text>
            <Image source={{uri:'https://common.cnblogs.com/images/ing/lucky-star-20170120.png'}} style={{width: 24, height: 24}}/>
         </View>)
    }
    return <Text style={styles.content}> {this._getReplyContent(content)}</Text>
  }
    render() {
        const sayItem = this.props
        return (
            <TouchableNativeFeedback>
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
                            </Text>
                            {this.renderStatuesContent(sayItem.Content,sayItem.IsLucky)}
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