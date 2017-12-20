import * as React from 'react'
import {observer} from 'mobx-react/native';
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'
import KbItem from './KbContent'
import Loading from './../../component/comm/Loading'
import kbService from '../../services/kbService'
import RefreshListView, {RefreshState} from '../../component/comm/RefreshListView'
import ItemSeparator from '../comm/ItemSeparator'

@observer
class KbList extends React.Component{
    constructor(){
        super();
        this.state={
            refreshState: RefreshState.Idle,
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props!=nextProps){
            this.porps=nextProps
        }
    }

   async _goDeail(item){
        const { navigate } = this.props.navigation;
        navigate("KbContent",{
            Id:item.Id,
            Type:'kbarticles',
            Title:item.Title
        });
    }

    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        this.props.OnRefresh(this.props.type);
        this.setState({refreshState: RefreshState.Idle})
    }

    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        setTimeout(() => {
            this.props.OnLoad(this.props.type,this.props.index);
            this.setState({refreshState: RefreshState.Idle})
        }, 1000)
    }

    keyExtractor = (item, index) => {
        return index
    }


    _renderItem=({item})=>{
         return <KbItem {...item} GoTo={this._goDeail.bind(this)}/>
    }


    render(){
        if(this.props.isLoading){
            return(
                <Loading />
            )
        }
        return(
            <View style={{flex: 1}}>
               <RefreshListView
                data={this.props.store}
                keyExtractor={this.keyExtractor}
                renderItem={this._renderItem}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.onHeaderRefresh}
                onFooterRefresh={this.onFooterRefresh}
                ItemSeparatorComponent={() =><ItemSeparator />}
                footerRefreshingText='玩命加载中 >.<'
                footerFailureText='我擦嘞，居然失败了 =.=!'
                footerNoMoreDataText='-我是有底线的-'/>
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

export default KbList;