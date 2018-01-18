import React from 'react'
import {Text,View,StyleSheet,ScrollView,Dimensions} from 'react-native'
import KbBody from '../../component/comm/htmlBody'
import _kbService from './../../api/kbService'
import {Container,Content} from 'native-base'

class ShowContent extends React.Component{
    static navigationOptions=({navigation})=>({
        headerTitle:'文章',
    })

    constructor(){
        super();
        this.state={
            htmlCode:'',
        }
    }

    async componentDidMount(){
        const {Id}=this.props.navigation.state.params;
        let data=await this.getOrUpdateData(Id);
        this.setState({
            htmlCode:data
        })
    }

    getOrUpdateData=async (id)=>{
        let response=await _kbService.getKbContent(id);
        if(response.status!=200){
            console.log('error')
        }
        return response.data;
    }

    linkToComments=(blogApp,id)=>{
        const { navigate } = this.props.navigation;
        navigate("NewsComments",{
            Id:id,
            BlogApp:blogApp,
        });
    }
    render(){
        const {Data}=this.props.navigation.state.params;
        console.log(Data);
        return(
            <Container>
                 <Content>
                   <KbBody html={this.state.htmlCode} data={Data} type="kb"/>
                 </Content>
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