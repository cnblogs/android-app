import * as React from 'react'
import { Text, View, StyleSheet,TextInput,Image,TouchableHighlight} from 'react-native'
import {Icon} from 'react-native-elements'

class SearchbarComm extends React.Component{
    _navigation(){
        this.props.navigate("Search")
    }
    _goToPublish(){
        this.props.navigate("PublishQuestion")
    }
    render(){
        return(
            <View style={styles.container}>
            <TouchableHighlight
                  style={styles.search}
                  onPress={()=>this._navigation()}>
                <View>
                    <View style={styles.searchLeft}>
                        <View style={styles.Icon} >
                        <Icon name="search" color="#BDC6CF"/>
                        </View>
                        <Text style={{marginLeft:5}}>搜索...</Text>
                     </View>
                </View>
                </TouchableHighlight>                
                <View style={styles.searchRight}>
                    <Icon name="border-color" 
                          style={styles.Icon} 
                          color="white"
                          onPress={()=>this._goToPublish()}/>
                </View>             
            </View>    
        )
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#2196F3',
        height:60,
        flexDirection:'row',
        marginTop:10
    },
    search:{
        borderWidth:1,
        borderColor:'white',
        borderRadius:5,
        borderStyle:'solid',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'white',
        height:40,
        flex:1
    },
    searchLeft:{
        flex:7,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    searchRight:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
        marginRight:10,
    },
    split:{
        height:35,
        borderWidth:1,
        borderColor:"#e6e6e6",
        borderStyle:'solid',
        alignItems:'center',
    },
    Icon:{
        marginLeft:10
    },
    Input:{
        flex:8,
        marginLeft:10,  
        backgroundColor:'transparent',  
        fontSize:15, 
        marginRight:10,
    }
})
export default SearchbarComm;