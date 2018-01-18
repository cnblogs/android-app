import * as React from 'react'
import { 
    Text, 
    View, 
    StyleSheet,
    FlatList,
    AsyncStorage
} from 'react-native'
import {Spinner,StyleProvider,getTheme,Button,Toast} from 'native-base'
import Say from './Say'
import _statuesService from '../../api/statuesService'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'

/**
 * 闪存列表组件
 * 
 * @class StatuesList
 * @extends {React.Component}
 */
class StatuesList extends React.Component{
    constructor() {
        super()
        this.state = {
            refreshState: RefreshState.Idle,
            listData:[],
            isLoading:true,
            index:1,
            isNeedLogin:false
        }
    }

    async componentDidMount(){
        const {category}=this.props;
        const islogin=await AsyncStorage.getItem('a_token');
        if(category=='following'&&islogin!=null){
              let data=await this._getOrUpdateData(category,1,10);
              this.setState({
                 listData:data,            
                 isLoading:false
           })
           return;
        }
        if(category=='my'&&islogin!=null){
            let data=await this._getOrUpdateData(category,1,10);
            this.setState({
               listData:data,            
               isLoading:false
         })
         return;
       }
        if(category=='all'){
            let data=await this._getOrUpdateData(category,1,10);
              this.setState({
                 listData:data,            
                 isLoading:false
           })
           return;
        }
        this.setState({
            isNeedLogin:true
        }) 
    }

   async componentWillReceiveProps(nextProps){
        if(this.props!=nextProps){
            this.porps=nextProps;
        }
    }

    /**
     * 获取最新闪存列表
     * 
     * @param {any} categroy 
     * @param {any} index 
     * @param {any} size 
     * @returns 
     * @memberof StatuesList
     */
    async _getOrUpdateData(categroy,index,size){
        let response=await _statuesService.getStatusAsync(categroy,index,size);
        if(response.status!=200){
            Toast.show({
                text:'服务器走丢了',
                position: "bottom",
                style:{'marginBottom':height/2-49-49},
                type:'error'
             })
        }
        return response.data;
     }

    /**
     * 下拉刷新
     * 
     * @memberof StatuesList
     */
    onHeaderRefresh =async () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        const {category}=this.props;
        let data=await this._getOrUpdateData(category,1,10);
        this.setState({
            refreshState: RefreshState.Idle,
            listData:data
        })
    }



    /**
     * 上拉加载
     * 
     * @memberof StatuesList
     */
    onFooterRefresh =async () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        const {category}=this.props;        
        let data=await this._getOrUpdateData(category,this.state.index+1,10);
        this.state.listData.push(...data);
        this.setState({
            refreshState:RefreshState.Idle,
            listData:this.state.listData,
            index:this.state.index+1
        })
    }

    /**
     * 生成Key
     * 
     * @memberof StatuesList
     */
    keyExtractor = (item, index) => {
        return index
    }

    /**
     * 跳转详情页
     * 
     * @param {any} item 
     * @memberof StatuesList
     */
    linkToDetails=(item)=> {
        const { navigate } = this.props.navigation;
        navigate("StatusDetail",{
            data:item
        })
    } 
    
    /**
     * 渲染
     * 
     * @memberof StatuesList
     */
    _renderItem=({item})=>{
        return(
            <Say {...item} linkToDetails={this.linkToDetails}/>
        )
    }

 render(){   
     if(this.state.isNeedLogin){
         return(
          <View style={{flex:1,marginTop:200,margin:8}}>
          <Button
             onPress={()=>this.props.navigation.navigate('Login')}
             full
             primary
        ><Text style={{color:'white'}}>立即登录</Text></Button>
        </View>)
     }
    if(this.state.isLoading){
            return(
                <View style={{flex:1,}}>
                  <Spinner color='#3385ff'/>
                </View>
            )
        }
        return(
            <View style={{flex:1}}>
            <RefreshListView
              data={this.state.listData}
              keyExtractor={this.keyExtractor}
              renderItem={this._renderItem}
              refreshState={this.state.refreshState}
              onHeaderRefresh={this.onHeaderRefresh}
              onFooterRefresh={this.onFooterRefresh}
              ItemSeparatorComponent={()=><View style={styles.sepa}></View>}
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
        borderStyle:'solid',
        borderColor:'#E9E9EF'
    }
})
export default StatuesList;