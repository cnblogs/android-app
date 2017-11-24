import * as React from 'react'
import {
    Image,
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableHighlight
} from 'react-native'
import NewsContent from './NewsContent';
import RefreshListView, {RefreshState} from '../../component/comm/RefreshListView'
import { observer } from 'mobx-react';

@observer
class NewsList extends React.Component {
    static navigationOptions = {
        title: '新闻'
    }
    constructor() {
        super();
        this.state = {
            refreshState: RefreshState.Idle,
        }
    }
 
     componentWillReceiveProps(nextProps){
         if(this.props!=nextProps){
             this.porps=nextProps
         }
     }

    async _goDetail(item) {
        const {navigate} = this.props.navigation;
        navigate("NewsContent", {
            Id: item.Id,
            Data: item,
            Type: 'newsitems',
            title: item.Title
        });
    }

    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        this.props.OnRefresh();
        this.setState({refreshState: RefreshState.Idle})
    }

    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        setTimeout(() => {
            this.props.OnLoad();
            this.setState({refreshState: RefreshState.Idle})
        }, 1000)
    }

    keyExtractor = (item, index) => {
        return index
    }

    _renderItem=({item})=>{
        return <NewsContent {...item} GoTo={this._goDetail.bind(this)}/>
    }

    render() {
        return (
            <View style={{flex: 1}}>
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
            
const styles = StyleSheet.create({
  sepa: {
    height:5
   }
})

export default NewsList