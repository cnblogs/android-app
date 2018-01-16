import * as React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'
import moment from 'moment'
import GlobalStyles from '../../config/GlobalStyles'

/**
 * 
 * 
 * @class KbItem
 * @extends {React.Component}
 */
class KbItem extends React.Component{

    linkToDetails=(item)=>{
        this.props.linkToDetails(item);
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
        const item=this.props;
        return(
            <TouchableHighlight
            onPress={()=>this.linkToDetails(item)}>
            <View style={GlobalStyles.cell_container}>
               {this.renderItemTitle(item.Title)}
               {this.renderItemDesc(item.Summary)}
                <View style={{flexDirection:'row'}}>
                {
                    this.renderItemFootOption(item.DiggCount,'推荐 ·')
                }
                {
                    this.renderItemFootOption(item.ViewCount,'阅读')                    
                }  
                <View style={styles.fromDate}>
                    <Text>
                        {moment(item.DateAdded).format('YYYY-MM-DD')}
                    </Text>
                </View>
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

export default KbItem;