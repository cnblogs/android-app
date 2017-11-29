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
                <View style={styles.containerHeader}>
               <TouchableHighlight
                   style={styles.search}
                   onPress={()=>this._navigation()}>
                    <View>
                        <Icon name="search" color="#2c2c2c"/>
                    </View>
                </TouchableHighlight>

                <View style={styles.Title}>
                    <Text style={{color:'#2c2c2c',fontWeight:'bold',fontSize:16,}}>博问</Text>
                </View>  
                <TouchableHighlight
                style={styles.search}
                onPress={()=>this._goToPublish()}>        
                <View style={styles.create}>
                    <Icon name="border-color" 
                          color="#2c2c2c"
                          />
                </View>  
                </TouchableHighlight> 
                </View>        
            </View>    
        )
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        height:45,
        
    },
    containerHeader:{
        flexDirection:'row',
        alignItems:'center',
        flex:1, 
    },
    Title:{
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    search:{
        justifyContent:'center',
        flex:1
    },
    create:{
        justifyContent:'center',
        flex:1,
    },
})
export default SearchbarComm;