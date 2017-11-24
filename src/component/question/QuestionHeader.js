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
                        <Icon name="search" color="#2c2c2c"/>
                    </View>
                </TouchableHighlight>

                <View style={{
                    flex: 3,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent:'center'
                }}>
                    <Text style={{color:'#2c2c2c',fontWeight:'bold'}}>博问</Text>
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
        )
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        height:35,
        flexDirection:'row',
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