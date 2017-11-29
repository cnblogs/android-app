import React, {Component} from 'react'
import {View, StyleSheet, Text, Platform} from 'react-native'
import RefreshListView, {RefreshState} from '../../component/comm/RefreshListView'
import { observer } from 'mobx-react/native';
import BlogItem  from './BlogItem';
import Loading from './../../component/comm/Loading'
import ItemSeparator from '../../component/comm/ItemSeparator'

@observer
class BlogList extends Component {
    constructor() {
        super()
        this.state = {
            refreshState: RefreshState.Idle,
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props!=nextProps){
            this.porps=nextProps
        }
    }

    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        this.props.OnRefresh(this.props.type);
        this.setState({
            refreshState: RefreshState.Idle,
        })
    }

    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing}) 
        setTimeout(() => {
            this.props.OnLoad(this.props.type);
            this.setState({
                refreshState:RefreshState.Idle,
            })
        },1000)
    }

    keyExtractor = (item, index) => {
        return index
    }

    async  _goDeail(item){
        const { navigate } = this.props.navigation;
        navigate("BlogContent",{
              Data:item,
              Id:item.Id,
              title:`${item.Author}的博客`,
              Type:'blogposts'
          });
      }

    _renderItem = ({item}) => {
        return <BlogItem {...item} GoTo={this._goDeail.bind(this)}/>
    }

    render() {
        if(this.props.isLoading){
            return(
                <Loading />
            )
        }
        return (
            <View style={{flex:1}}>
                <RefreshListView
                    data={this.props.store}
                    keyExtractor={this.keyExtractor}
                    renderItem={this._renderItem}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                    ItemSeparatorComponent={()=><ItemSeparator />}                    
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />
            </View>
        )
    }
}
export default BlogList;
