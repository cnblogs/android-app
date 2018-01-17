import * as React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'
import { Button } from 'native-base'

class Tags extends React.Component{
    _renderItem(item){
        return(
            <TouchableHighlight>
            <View style={styles.container}>
                <Text style={styles.tagText}>{item}</Text>
            </View>
            </TouchableHighlight>
        )
    }
    _sepa(){
        return <View style={styles.sepa}></View>
    }
render(){
        return(
            <View>
            <FlatList 
                ItemSeparatorComponent={this._sepa}
                data={this.props.items}
                renderItem={({item})=>this._renderItem(item)}
                horizontal={true}
            />
        </View>
        )
    }

}

const styles = StyleSheet.create({
    sepa:{
    },
    container:{
        backgroundColor:'#E1ECF4',
        marginRight:10
    },
    tagText:{
        color:'#3C7DB8',
        padding:3      
    }
  })

export default Tags;