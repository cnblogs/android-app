import * as React from 'react'
import { Text, View, StyleSheet,TextInput,Image} from 'react-native'

const {Icon}=require('react-native-elements');
class Searchbar extends React.Component{
    _navigation(){
        this.props.navigate("Search")
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.search}>
                    <View style={styles.searchLeft}>
                        <Icon name="search" style={styles.Icon} color="#BDC6CF"/>
                        <TextInput placeholder="搜索" style={styles.Input}
                                  keyboardType='web-search' 
                                  underlineColorAndroid='transparent'
                                  onFocus={this._navigation.bind(this)}/>
                     </View>  
                     <View style={styles.searchRight}>           
                         <View style={styles.split}></View>       
                         <Icon name="create" style={styles.Icon} color="#BDC6CF"/>
                         <Text>博问</Text>
                    </View>
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
        flex:3,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        marginRight:20
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
export default Searchbar;