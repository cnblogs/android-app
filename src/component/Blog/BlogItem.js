import React from 'react';
import {Image,Text,StyleSheet,View,TouchableHighlight} from 'react-native'
import {Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from '../../config/momentConfig'
import GlobalStyles from '../../config/GlobalStyles'
import CAvatar from '../comm/Avatar';

/**
 * 博客组件
 * 
 * @class BlogItem
 * @extends {React.Component}
 */
class BlogItem extends React.Component{
    linkToDetails(id,title,avatar,author,postDate,blogApp){
        this.props.linkToDetails(id,title,avatar,author,postDate,blogApp);
    }

    /**
     * 头像 作者名 发布时间
     * 
     * @memberof BlogItem
     */
    renderItemAvatar=(avatar,author,postdate)=>{
        return(
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Grid>
                    <Col>
                       <CAvatar avatar={avatar} author={author} color={'black'}/>
                    </Col>
                    <Col>
                         <View style={styles.fromDate}>
                            <Text>{moment(postdate).startOf('minute').fromNow()}</Text>
                          </View>
                       </Col>
                </Grid>
            </View>
        )
    }

    /**
     * 标题
     * 
     * @memberof BlogItem
     */
    renderItemTitle=(title)=>{
            return( 
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
               <Text style={styles.title}>
                 {title}
               </Text>
            </View>)
    }

    /**
     * 简介
     * 
     * @memberof BlogItem
     */
    renderItemDesc=(description)=>{
        return (
        <Text style={styles.description}>
            {description+'...'}
         </Text>)
    }

    /**
     * 文章统计
     * 
     * @param {any} count 
     * @param {any} labelname 
     * @returns 
     * @memberof BlogItem
     */
    renderItemFootOption=(count,labelname)=>{
      return(
      <View style={styles.count}>
            <Text style={styles.countText}>{count}</Text>
            <Text style={{marginLeft:3,marginRight:5}}>{labelname}</Text>
      </View>)                                                         
    }
    
    render(){
        const {
            Author,
            Avatar,
            BlogApp,
            CommentCount,
            Description,
            DiggCount,
            Title,
            PostDate,
            ViewCount,Id}=this.props;
        return(
            <TouchableHighlight
            onPress={()=>this.linkToDetails(Id,Title,Avatar,Author,PostDate,BlogApp)}>
            <View style={GlobalStyles.cell_container}>
               {this.renderItemAvatar(Avatar,Author,PostDate)}
               {this.renderItemTitle(Title)}
               {this.renderItemDesc(Description)}
              <View style={{flexDirection: 'row'}}>
                {this.renderItemFootOption(DiggCount,'推荐 ·')}
                {this.renderItemFootOption(ViewCount,'阅读 ·')}
                {this.renderItemFootOption(CommentCount,'评论')}
              </View>
            </View>
            </TouchableHighlight>
        )
    }
}
const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
        flex:1
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    avatar:{
        width:25, 
        height: 25, 
        marginLeft: 8, 
        marginRight: 8,
        borderRadius:12.5
    },
    count:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    countText:{
        fontSize:14
    },
    fromDate:{
        flex:5,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center' ,
        marginRight:8
    }
});

export default BlogItem;