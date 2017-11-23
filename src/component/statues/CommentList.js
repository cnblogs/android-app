import * as React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'
import Comment from './Comment'
import token from '../../model/token'
import axios from 'axios'
import {observer} from 'mobx-react/native'
import observableStatuesStore from '../../services/statuesService'

class CommentList extends React.Component{ 
    constructor(){
        super()
        this.state={
            isLoading:true,
            messages:[]
        }
    }
    async componentWillMount(){
        await observableStatuesStore.getCommentListById(this.props.statusId)
        this.setState({
            isLoading:false,
            messages:observableStatuesStore.statuesCommentList    
        })
    }
    
    _renderItem(item){
        return(
            <Comment comment={item} send={this.props.Send.bind(this)}/>
        )
    }
    
    render(){
        return(
            <View>
            <FlatList
            ItemSeparatorComponent={()=><View style={styles.sepa}></View>}
            data={this.state.messages}
            renderItem={({item})=>this._renderItem(item)}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    sepa:{
        borderTopWidth:1,
        borderTopColor:'#D9D9D9',
        borderStyle:'solid',
    }
});

export default CommentList;