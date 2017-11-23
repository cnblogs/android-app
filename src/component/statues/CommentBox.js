import * as React from 'react'
import { Image, Text, StyleSheet, View, FlatList, TouchableHighlight, TextInput } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import  { Button } from 'react-native-elements'


class CommentBox extends React.Component{
    render(){
        return(
            <Kaede
              label={'评论'}
              backgroundColor={'white'}
              iconClass={FontAwesomeIcon}
              iconName={'comment'}
              iconColor={'#e6e6e6'}
          />
        )
    }
}


export default CommentBox;