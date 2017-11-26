import * as React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'
import moment from 'moment'

class NewsContent extends React.Component{
    _navigateToContent(item){
        this.props.GoTo(item);
    }

    addHttps(topicIcon){
        if(topicIcon.indexOf("https")>=0){
          return topicIcon;        
        }else{
            return "https:"+topicIcon;
        }
    }

    render(){
        const item=this.props;
        return(
            <TouchableHighlight
            onPress={()=>this._navigateToContent(item)}>
            <View style={styles.item}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.Title}</Text>
                </View>

                <View style={styles.itemBody}>
                    
                    <View style={styles.bodyLeft}>
                      <Text style={styles.itemDesc} numberOfLines={5}>{item.Summary+'.......'}</Text>
                    </View>
                    <View style={styles.bodyRight}>
                    <Image source={{uri:this.addHttps(item.TopicIcon)}} resizeMode={'contain'} style={styles.itemTopIcon} />
                </View>
                </View>


                <View style={styles.itemFooter}>
                    <View style={styles.itemCount}>
                       <View style={styles.itemPostDate}>
                          <Text>{moment(item.PostDate).subtract(1,'days').calendar()}</Text>
                        </View>

                        <View style={styles.ViewCount}>
                            <Text>
                                {item.DiggCount} 推荐 ·
                            </Text>
                        </View> 
                        <View style={styles.ViewCount}>
                            <Text>
                                {item.ViewCount} 阅读 ·
                            </Text>
                        </View> 
                        <View style={styles.CommentCount}>
                            <Text>
                                 {item.CommentCount} 评论
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            </TouchableHighlight> 
        )
    }
}
const styles = StyleSheet.create({
    sepa:{
        height:10
    },
    item: {
        backgroundColor:'#f9f9f9',
    },
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
    },
    itemFooter:{
        marginLeft:8,
        marginTop:5,
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

export default NewsContent;