import  * as React from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import Avatar from '../../component/comm/Avatar'
import HTML from 'react-native-render-html'
import {observer} from 'mobx-react/native'
import observeableSeachResultStore from '../../services/searchService'
import moment from 'moment'

@observer
class SeachPage extends React.Component{

    _goDeail(item){
        const { navigate } = this.props.navigation;
        navigate("Content",{
            Url:item.Uri,
            title:`搜索内容`,
        });
    }   
  _renderItem(item){   
    return(
    <TouchableHighlight
        onPress={()=>this._goDeail(item)}>
        <View style={styles.item}>
            <View style={styles.itemBody}>
                <HTML 
                  html={item.Title} 
                  tagsStyles={{strong:{color:'#FABD3B'}}}
                />
                <HTML html={item.Content} 
                  tagsStyles={{strong:{color:'#FABD3B'}}}/>
            </View>
            <View style={styles.itemFooter}>
                <View style={styles.itemPostDate}>
                   <Text>{moment(item.PublishTime).format('YYYY-MM-DD HH:mm')}</Text>
                </View>
            </View>
        </View>
        </TouchableHighlight> 
    )
}

render(){
    const ds=observeableSeachResultStore.results
    return(
            <View>
                <FlatList
                  data={ds}
                  renderItem={({item})=>this._renderItem(item)}
                />
            </View>
     )
  }
}

const styles = StyleSheet.create({
  item: {
      backgroundColor:'white',
      borderWidth:1,
      borderColor:"#D3D3D3",
      borderStyle:'solid',
  },
  itemHeader:{
      marginTop:5,
      marginLeft:10
  },
  itemBody:{
      marginTop:5,
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
      marginTop:5,
      flexDirection:'row',
      justifyContent: 'flex-end',
  },
  itemPostDate:{
      flex:5,
      flexDirection:'row',
      justifyContent:'flex-end',
      alignItems:'center' ,
      marginRight:8   
  }
})
export default SeachPage