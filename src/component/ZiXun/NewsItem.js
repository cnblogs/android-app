import React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'
import moment from 'moment'
import GlobalStyles from '../../config/GlobalStyles'

/**
 * 新闻组件
 * 
 * @class NewsItem
 * @extends {React.Component}
 */
class NewsItem extends React.Component{
    /**
     * 跳转到详情页
     * 
     * @param {any} item 
     * @memberof NewsItem
     */
    linkToDetails(item){
        this.props.linkToDetails(item);
    }
    
    /**
     * 标题组件
     * 
     * @memberof NewsItem
     */
    _renderItemHeader=(title)=>{
        return(
        <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{title}</Text>
        </View>
        )
    }

/**
 * 
 *内容组件 
 * @memberof NewsItem
 */
_renderItemBody=(summary,topicIcon)=>{
        return(
            <View style={styles.itemBody}>
                <View style={styles.bodyLeft}>
                      <Text style={styles.itemDesc} numberOfLines={5}>{summary+'.......'}</Text>
                 </View>
                <View style={styles.bodyRight}>
                    <Image source={{uri:topicIcon}} resizeMode={'contain'} style={styles.itemTopIcon} />
                </View>
            </View>
        )
    }

    /**
     * 内容底部组件
     * 
     * @memberof NewsItem
     */
    _renderItemFooter=(dateAdded,diggCount,viewCount,commentCount)=>{
        return(
            <View style={styles.itemFooter}>
            <View style={styles.itemCount}>
               <View style={styles.itemPostDate}>
                  <Text>{moment(dateAdded).add(0,'days').calendar()}</Text>
                </View>
                <View style={styles.ViewCount}>
                    <Text>
                        {diggCount} 推荐 ·
                    </Text>
                </View> 
                <View style={styles.ViewCount}>
                    <Text>
                        {viewCount} 阅读 · 
                    </Text>
                </View> 
                <View style={styles.CommentCount}>
                    <Text>
                         {commentCount} 评论
                    </Text>
                </View>
            </View>
        </View>
        )
    }

    render(){
        const item=this.props;
        return(
            <TouchableHighlight
            onPress={()=>this.linkToDetails(item)}>
            <View style={GlobalStyles.cell_container}>
               {this._renderItemHeader(item.Title)}
               {this._renderItemBody(item.Summary,item.TopicIcon)}
               {this._renderItemFooter(item.DateAdded,item.DiggCount,item.ViewCount,item.CommentCount)}
            </View>
        </TouchableHighlight>
        )
    }
}
const styles = StyleSheet.create({
    itemHeader:{
        paddingTop:15,
        marginLeft:8
    },
    itemTopIcon:{ 
        flex:1,    
    },
    itemBody:{
        flexDirection:'row',
        flex:1,
        marginTop:5,
        marginLeft:8
    },
    bodyLeft:{
        flex:2,
    },
    bodyRight:{
        flex:1,
        marginRight:8,
    },
    itemTitle:{
      fontSize:16,
      fontFamily:'Noto',
      color:'black'
    },
    itemDesc:{
        fontSize:13,
        marginTop:2,
        marginRight:8,
        lineHeight:25,
    },
    itemFooter:{
        marginLeft:8,
        marginTop:10,
        marginBottom:10,
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    itemCount:{
        flex:5,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    ViewCount:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    CommentCount:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginRight:8
    },
    itemPostDate:{
        flex:5,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    }
});

export default NewsItem;