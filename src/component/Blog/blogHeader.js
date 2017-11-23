import React from 'react'
import 
{
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'


class BlogHeader extends React.Component{
    constructor(){
        super()
        this.state={
            isActive:true,
            type:'sitehome'
        }
    }

    _switchStyle(type){
        if(type){
            return styles.active
        }
    }

    _handleClick(type){
        if(type!=this.state.type){
            this.setState({
                isActive:!this.state.isActive,
                type:type
            })
            this.props.Switch(type)
        }
    }
    render(){
        return(
        <View style={styles.contentContainer}>
            <TouchableOpacity 
            style={[styles.container_home,this._switchStyle(this.state.isActive)]}
            onPress={()=>this._handleClick('sitehome')}>
            <View>
                <Text style={[styles.home_text,{color:this.state.isActive?'white':'#D9D9D9'}]}>首页</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.container_picked,this._switchStyle(!this.state.isActive)]}
            onPress={()=>this._handleClick('picked')}>
            <View>
                <Text style={[styles.picked_text,{color:!this.state.isActive?'white':'#D9D9D9'}]}>推荐</Text>
            </View>
            </TouchableOpacity>
        </View>)
    }
}

const styles=StyleSheet.create({
    contentContainer:{
        height:60,
        flexDirection:'row',        
        backgroundColor:'#2196F3',
        justifyContent:'center',   
    },
    home_text:{
        fontSize:15,
        fontWeight:'bold',
    },
    picked_text:{
        fontSize:15,
        fontWeight:'bold', 
    },
    container_picked:{
        marginLeft:20,
        justifyContent:'center',
    },
    container_home:{
        justifyContent:'center'
    },
    active:{
        borderStyle:'solid',
        borderBottomWidth:2,
        borderBottomColor:'white'
    }
})

export default BlogHeader