import React from 'react'
import {Text,View,StyleSheet,ScrollView,Dimensions} from 'react-native'
import NewsBody from '../../component/comm/htmlBody'
import NewsFooter from '../../component/comm/contentFooter'
import _newsService from './../../api/newsService'
import {Spinner,Container,Content,Toast} from 'native-base'


const height=Dimensions.get('window').height;
/**
 * 新闻内容页
 * 
 * @class ShowContent
 * @extends {React.Component}
 */
class ShowContent extends React.Component{
    static navigationOptions=({navigation})=>({
        headerTitle:'新闻'
    })

    constructor(){
        super();
        this.state={
            htmlCode:''
        }
    }

    async componentDidMount(){
        const {Id}=this.props.navigation.state.params;
        let data=await this.getOrUpdateData(Id);
        this.setState({
            htmlCode:data
        })

    }

    /**
     * 跳转到新闻评论
     * 
     * @memberof ShowContent
     */
    linkToComments=()=>{
        const {navigate} = this.props.navigation;
        const {Id}=this.props.navigation.state.params;
        navigate("NewsComments",{
            Id:Id
        });
    }

    /**
     * 获取最新数据
     * 
     * @memberof ShowContent
     */
    getOrUpdateData=async (id)=>{
        let response=await _newsService.getNewsContent(id);
        if(response.status!=200){
            return  Toast.show({
                text:'服务器走丢了',
                position: "bottom",
                style:{'marginBottom':height/2-49-49},
                type:'error'
              })
        }
        return response.data;
    }

    render(){
        const {Data}=this.props.navigation.state.params;
        return(
            <Container>
                 <Content>
                   <NewsBody html={this.state.htmlCode} data={Data} type='news'/>
                 </Content>
                <View>
                   <NewsFooter data={Data} 
                      linkToComments={this.linkToComments}/>
                </View>
            </Container>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    loading:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        color:'#666666',
        fontSize:12,
        marginTop:10
    }
})

export default ShowContent;