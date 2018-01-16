import React from 'react'
import {View,Text,StyleSheet,Platform,Dimensions,TouchableHighlight} from 'react-native'
import {Thumbnail} from 'native-base'
import moment from 'moment'
import HtmlView from '../comm/HtmlView'

/**
 * 评论组件
 * 
 * @class BlogComment
 * @extends {React.Component}
 */
class BlogComment extends React.Component{

    /**
     * 渲染头像 (faceUrl为空是设置默认头像)
     * 
     * @memberof BlogComment
     */
    renderAvatar=(faceUrl)=>{
        if(!faceUrl){
            return(
               <Thumbnail
                small
                source={require('../../images/d_avatar.png')}
              />)
           }
           return(
           <Thumbnail
            small
            source={{uri:faceUrl}} />)   
     }

    render(){
        const {data}=this.props;
        return(
            <View style={styles.container}>
              <View style={styles.container_left}>
                 {this.renderAvatar(data.FaceUrl)}
                </View>
                <View style={styles.container_right}>
                    <View>
                        <Text style={styles.author}>{data.Author}</Text>
                    </View>

                    <View style={{marginRight:8}}>
                      <Text style={{color:'black',fontSize:15}}>{data.Body}</Text>
                    </View>
                    <View style={styles.container_bottom}>
                        <Text style={{fontSize:12}}>{moment(data.DateAdded).startOf('minute').fromNow()}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'white'
    },
    container_left:{
        width:50,
        marginLeft:8,
        marginRight:5,
        marginTop:8
    },
    container_right:{
        flex:1,
        marginTop:8 
    },
    container_bottom:{
        flexDirection:'row',
        marginBottom:5,
    },
    author:{
        fontSize:13,
        color:'#333333'
    }
})

export default BlogComment