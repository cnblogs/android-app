import * as React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'
import Avatar from '../comm/Avatar'
import Loading from '../comm/Loading'
import formatDate from '../../utils/formatDate'
import moment from 'moment'

class BlogContent extends React.Component{
    _navigateToContent(item){
        this.props.GoTo(item);
    }
    render(){
        //接口获取blog数据
        const item=this.props;
        return(
            <TouchableHighlight
            onPress={()=>this._navigateToContent(item)}>
            <View style={styles.container}>
                <Avatar Author={item.Author} Url={item.Avatar} />

                <View style={styles.itemBody}>
                    <Text style={styles.itemTitle}>{item.Title}</Text>
                    <Text style={styles.itemDesc}>{item.Description+'...'}</Text>
                </View>
                <View style={styles.itemFooter}>
                    <View style={styles.itemCount}>
                        <View style={styles.ViewCount}>
                            <Text>
                              {item.DiggCount}
                            </Text>
                            <Text style={{marginLeft:6}}>
                            推荐 · 
                            </Text>
                        </View> 

                        <View style={styles.ViewCount}>
                            <Text  style={{marginLeft:6}}>
                                {item.ViewCount}
                            </Text>
                            <Text style={{marginLeft:6}}>
                            阅读  ·
                            </Text>
                        </View> 

                        <View style={styles.CommentCount}>
                            <Text style={{marginLeft:6}}>
                            {item.CommentCount}
                            </Text>
                            <Text style={{marginLeft:6}}>
                             评论
                            </Text>
                        </View>

                    </View>
                    <View style={styles.itemPostDate}>
                       <Text>{moment(item.PostDate).startOf('minute').fromNow()}</Text>
                    </View>
                </View>
            </View>
            </TouchableHighlight> 
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
    },
    itemBody:{
        flexDirection:'column',
        marginTop:5,
        marginLeft:8
    },
    itemTitle:{
      fontSize:16,
      fontFamily:'Noto',
      color:'black'
    },
    itemDesc:{
        marginTop:5,
        marginRight:8,
        fontSize:13,
        lineHeight:25,
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
        paddingLeft:5
    },
    itemPostDate:{
        flex:5,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center' ,
        marginRight:8   
    }
});

export default BlogContent;