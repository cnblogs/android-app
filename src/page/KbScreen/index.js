import * as React from 'react'
import {observer} from 'mobx-react/native';
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'
import Knowledge from './../../component/home/Knowledge'
import Loading from './../../component/comm/Loading'
import kbService from '../../services/kbService'
import RefreshListView, {RefreshState} from '../../component/comm/RefreshListView'

@observer
class KnowledgeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            isLoading:true,
            index:1,
            refreshState: RefreshState.Idle,
        }
    }
   async componentWillMount(){
       await kbService.getKnowledgeList(1,20)
        this.setState({
            isLoading:false
        })
    }

   async _goDeail(item){
        const { navigate } = this.props.navigation;
        navigate("KbContent",{
            Id:item.Id,
            Url:`https://kb.cnblogs.com/page/${item.Id}`,
            Type:'kbarticles',
            title:item.Title
        });
    }

 onHeaderRefresh = async () => {
    this.setState({refreshState: RefreshState.HeaderRefreshing})
    await kbService.getKnowledgeList(1,10);
    this.setState({refreshState: RefreshState.Idle})
}

onFooterRefresh =async () => {
    this.setState({refreshState: RefreshState.FooterRefreshing})
    setTimeout(async() => {
        await kbService.loadKnowledgeList(this.state.index+1,10)
        this.setState({
            refreshState: RefreshState.Idle,
            index:this.state.index+1
        });
    }, 1000)
}

keyExtractor = (item, index) => {
    return index
}

 _renderItem=({item})=>{
    return <Knowledge {...item} GoTo={this._goDeail.bind(this)}/>
}


    render(){
        if(this.state.isLoading){
            return(
                <Loading />
            )
        }
        return(
            <View style={{flex: 1}}>
               <RefreshListView
                  data={kbService.knowledgeList}
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
    sepa:{
        borderTopWidth:1,
        borderTopColor:'#D9D9D9',
        borderStyle:'solid',
    }
});

export default KnowledgeScreen;