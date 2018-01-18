import  * as React from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  FlatList,
  TextInput
} from 'react-native';
import {Icon,StyleProvider,getTheme} from 'native-base'
import Avatar from '../../component/comm/Avatar'
import HTML from 'react-native-render-html'
import _searchService from '../../api/searchService'
import moment from 'moment'

class SeachPage extends React.Component{
    constructor(){
        super()
        this.state={
            listData:[]
        }
    }
    _goDeail(item){
        const { navigate } = this.props.navigation;
        navigate("Content",{
            Url:item.Uri,
            title:`搜索内容`,
        });
    } 

    _navigation(){
        this.props.navigation.goBack()
    }

   async _inputKeyWorlds(text){
       let response= await  _searchService.seachByKeyWords(text);
       this.setState({
           listData:response.data
       })
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
    return(
        <View>
             <View style={styles.container}>
                <View style={styles.search}>
                    <View style={styles.searchLeft}>
                    <StyleProvider style={getTheme({ iconFamily: 'MaterialCommunityIcons' })}>
                        <Icon name="arrow-left" 
                              style={[styles.Icon,{color:"#708090" }]}
                              onPress={this._navigation.bind(this)}/>
                       </StyleProvider>
                        <TextInput placeholder="搜索" style={styles.Input}
                                  keyboardType='web-search' 
                                  underlineColorAndroid='transparent' 
                                  onChangeText={(text)=>this._inputKeyWorlds(text)}/>
                     </View>
                </View>           
            </View> 
            <View>
                <FlatList
                  data={this.state.listData}
                  renderItem={({item})=>this._renderItem(item)}
                />
            </View>   
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
  },

  container:{
    backgroundColor:'#2196F3',
    height:80,
    flexDirection:'row',
},
search:{
    borderWidth:1,
    borderColor:'white',
    borderStyle:'solid',
    marginTop:15,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'white',
    height:40,
    flex:1
},
searchLeft:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
},
Icon:{
    marginLeft:10,
    alignItems:'center',
},
Input:{
    flex:8,
    marginLeft:10,  
    backgroundColor:'transparent',  
    fontSize:15, 
    marginRight:10,
    alignItems:'center',
}
})
export default SeachPage