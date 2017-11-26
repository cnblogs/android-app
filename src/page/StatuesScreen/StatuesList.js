import * as React from 'react'
import { 
    Text, 
    View, 
    StyleSheet,
    FlatList
} from 'react-native'
import {observer} from 'mobx-react';
import moment from '../../component/comm/moment-zh';
import Say from './../../component/statues/Say'
import Loading from './../../component/comm/Loading'
import observableStatuesStore from '../../services/statuesService'
import RefreshListView, {RefreshState} from '../../component/comm/RefreshListView'

@observer
class StatuesList extends React.Component{
    constructor() {
        super();
        this.state = {
            index:1,
            refreshState: RefreshState.Idle,
        }
    }
 
     componentWillReceiveProps(nextProps){
         if(this.props!=nextProps){
             this.porps=nextProps
         }
     }

    _goToDetail(item) {
        const { navigate } = this.props.navigation;
        navigate("StatusDetail",{
            data:item
        })
    } 

    onHeaderRefresh =async() => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        this.props.OnRefresh(this.props.type);
        this.setState({                        
            refreshState: RefreshState.Idle})
    }

    onFooterRefresh = async() => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        setTimeout(async() => {
            this.props.OnLoad(this.props.type);
            this.setState({
                refreshState: RefreshState.Idle,
                index:this.state.index+1,
            })
        }, 1000)
    }

    keyExtractor = (item, index) => {
        return index
    }
    
    _renderItem=({item})=>{
        return(
            <Say {...item} GoTo={this._goToDetail.bind(this)}/>
        )
    }
    render(){
        return(
            <View>
            <RefreshListView
              data={this.props.store}
              keyExtractor={this.keyExtractor}
              renderItem={this._renderItem}
              refreshState={this.state.refreshState}
              onHeaderRefresh={this.onHeaderRefresh}
              onFooterRefresh={this.onFooterRefresh}
              ItemSeparatorComponent={() =><View style ={styles.sepa} ></View>}
              footerRefreshingText='玩命加载中 >.<'
              footerFailureText='我擦嘞，居然失败了 =.=!'
              footerNoMoreDataText='-我是有底线的-'/>
        </View>
        )
    }
}
const styles=StyleSheet.create({
    sepa:{
        borderTopWidth:1,
        borderTopColor:'#D9D9D9',
        borderStyle:'solid',
    }
})
export default StatuesList;