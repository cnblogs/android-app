import * as React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'

class Avatar extends React.Component{
    render(){
        const item =this.props;
        if(item.Url.indexOf('.png')<0){
            return(
            <View style={styles.itemHeader}>
            <Image source={require('../../images/d_avatar.png')}
                       style={styles.itemAvatar}
                       />
                <Text style={styles.itemAuthor}>{item.Author}</Text>
        </View>)
        }
        return(
            <View style={styles.itemHeader}>
                <Image source={{uri:item.Url}} 
                           style={styles.itemAvatar}
                           />
                    <Text style={styles.itemAuthor}>{item.Author}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemHeader:{
        flexDirection:'row',
        paddingTop:15
    },
    itemAvatar:{
        width:25, 
        height: 25, 
        marginLeft: 8, 
        marginRight: 8,
        borderRadius:12.5
    },
    itemAuthor:{
        fontSize:13,
        color:'#333333'
    }
});
export default Avatar;