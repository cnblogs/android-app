import React from 'react'
import 
{
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'


class NewsHeader extends React.Component{
    constructor(){
        super()
        this.state={
            isActive:true,
            type:'home'
        }
    }

    _switchStyle(type){
        if(type==this.state.type){
            return styles.active
        }
        return null
    }

    _handleClick(type){
        if(type!=this.state.type){
            this.setState({
                type:type
            })
            this.props.Switch(type)
        }
    }
    render(){
        return(
        <View style={styles.contentContainer}>
            <TouchableOpacity 
            style={[styles.container_home,this._switchStyle("home")]}
            onPress={()=>this._handleClick('home')}>
            <View>
                <Text style={[styles.home_text,{color:this.state.type=="home"?'#2c2c2c':'#D9D9D9'}]}>首页</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.container_picked,this._switchStyle("hot-week")]}
            onPress={()=>this._handleClick('hot-week')}>
            <View>
                <Text style={[styles.picked_text,{color:this.state.type=="hot-week"?'#2c2c2c':'#D9D9D9'}]}>热门</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.container_picked,this._switchStyle("recommended")]}
            onPress={()=>this._handleClick('recommended')}>
            <View>
                <Text style={[styles.picked_text,{color:this.state.type=="recommended"?'#2c2c2c':'#D9D9D9'}]}>推荐</Text>
            </View>
            </TouchableOpacity>
        </View>)
    }
}

const styles=StyleSheet.create({
    contentContainer:{
        height:49,
        flexDirection:'row',        
        backgroundColor:'white',
        justifyContent:'flex-start',
        borderStyle:'solid',
        borderBottomWidth:1,
        borderBottomColor:'#D9D9D9'
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
        justifyContent:'center',
        marginLeft:15
    },
    active:{
        borderStyle:'solid',
        borderBottomWidth:2,
        borderBottomColor:'#2c2c2c'
    }
})

export default NewsHeader