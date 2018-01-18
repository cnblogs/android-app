import * as React from 'react'
import { Text, View, StyleSheet,TextInput,Image} from 'react-native'
import {Icon} from 'react-native-elements'
import observeableSeachResultStore from '../../services/searchService'
import {observer} from 'mobx-react';

class SearchHeader extends React.Component{
    _navigation(){
        this.props.goBack()
    }
   async _inputKeyWorlds(text){
      await  observeableSeachResultStore.seachResult(text);
    }
    
    render(){    
        return(
            <View style={styles.container}>
                <View style={styles.search}>
                    <View style={styles.searchLeft}>
                        <Icon name="arrow-left" 
                              style={styles.Icon} 
                              color="#708090" 
                              type="material-community"
                              onPress={this._navigation.bind(this)}/>
                        <TextInput placeholder="搜索" style={styles.Input}
                                  keyboardType='web-search' 
                                  underlineColorAndroid='transparent' 
                                  onChangeText={(text)=>this._inputKeyWorlds(text)}/>
                     </View>
                </View>           
            </View>    
        )
    }
}
const styles=StyleSheet.create({
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
export default SearchHeader;