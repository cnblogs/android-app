import * as React from 'react'
import
 {
    Image,
    Text,
    StyleSheet,
    View,
} from 'react-native'
import {Thumbnail} from 'native-base'

/**
 * 头像
 * 
 * @class CAvatar
 * @extends {React.Component}
 */
class CAvatar extends React.Component{
    render(){
        const {avatar,author,color} =this.props;
        let authorColor=this.props.color?this.props.color:'black';
        if(avatar.indexOf('.png')<0){
            return(
            <View style={styles.container}>
            <Image source={require('../../images/d_avatar.png')}
                       style={styles.avatar}
                       />
            <Text style={[styles.author,{color:authorColor}]}>{author}</Text>
        </View>)
        }
        return(
            <View style={styles.container}>
                <Image source={{uri:avatar}} 
                           style={styles.avatar}
                           />
                    <Text style={[styles.author,{color:authorColor}]}>{author}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
    },
    avatar:{
        width:25, 
        height: 25, 
        marginRight:3,
        borderRadius:12.5
    },
    author: {
        height: 25,
        textAlignVertical:'center',
        fontSize: 14,
        alignItems: 'center'
    },
});

export default CAvatar;