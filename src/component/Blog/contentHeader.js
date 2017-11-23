import React from 'react'
import {Text,View,StyleSheet} from 'react-native'
import {Icon,Avatar,Button} from 'react-native-elements'
import formatDate from '../../utils/formatDate'


class ContentHeader extends React.Component{
    render(){
        const data=this.props.data;
        return(
            <View style={styles.container}>
                <View style={styles.container_Title}>
                    <Text style={styles.Title}>{data.Title}</Text>
                </View>
                <View style={styles.container_Des}>
                    <View style={styles.Avatar}>
                    <Avatar
                        small
                        source={{uri:data.Avatar}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                    </View>
                    <View style={styles.info}>
                        <Text style={{color:'black'}}>{data.Author}</Text>
                        <Text style={{color:'black'}}>{formatDate(data.PostDate)}</Text>
                    </View>
                    <View style={styles.Button}>
                        <Button 
                          title='关注' 
                          borderRadius={5}
                          buttonStyle={{height:30}}
                          backgroundColor="#2096F3"/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white'
    },
    container_Title:{
        marginLeft:10,
        marginRight:10,
        marginTop:8,
    },
    container_Des:{
        marginTop:8,
        marginLeft:10,
        marginRight:10,
        marginBottom:8,
        flexDirection:'row',
        alignItems:'center',

    },
    info:{
        marginLeft:10,
        flex:1
    },
    Title:{
        color:'black',
        fontWeight:'bold',
        fontSize:20
    }
})

export default ContentHeader