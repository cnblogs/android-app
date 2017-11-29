import * as React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'
import Avatar from '../comm/Avatar'
import Loading from '../comm/Loading'
import moment from 'moment'

class KbContent extends React.Component{

    _navigateToContent(item){
        this.props.GoTo(item);
    }

    render(){
        const item=this.props;
        return(
            <TouchableHighlight
            onPress={()=>this._navigateToContent(item)}>
            <View style={styles.item}>
                <View style={styles.itemBody}>
                    <Text style={styles.itemTitle}>{item.Title}</Text>
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
                        <View style={styles.ViewCount2}>
                            <Text>
                               {item.ViewCount}
                            </Text>
                            <Text style={{marginLeft:6}}>
                                 阅读 · 
                            </Text>
                        </View>
                        <View style={styles.ViewCount2}>
                          <Text>
                            {item.Author} ·
                         </Text>
                         <Text style={{marginLeft:6}}>
                           {moment(item.DateAdded).format('YYYY-MM-DD HH:mm')}
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
    item: {
        backgroundColor:'white',
    },
    itemBody:{
        flexDirection:'column',
        marginTop:10,
        marginLeft:8
    },
    itemTitle:{
      fontSize:16,
      fontFamily:'Noto',
      color:'black'
    },
    itemDesc:{
        marginTop:2,
        marginRight:8,
        fontSize:13
    },
    itemFooter:{
        marginLeft:8,
        marginTop:10,
        marginBottom:20,
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
    ViewCount2:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginLeft:5
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

export default KbContent;