import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

let Spinner=require('react-native-spinkit');

class Loading extends React.Component{
    render(){  
        return(
            <View style={styles.loading}>
             <Spinner
               isVisible={true}
               color='#666666'
               size={32}
               type='FadingCircleAlt'
              />
        </View>
        )
    }
}
const styles = StyleSheet.create({
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    text:{
        color:'#666666',
        fontSize:12
    }
})

export default Loading;

