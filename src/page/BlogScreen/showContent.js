import React from 'react'
import {Text,View,StyleSheet,ScrollView,Dimensions} from 'react-native'
import ContentHeader from '../../component/Blog/contentHeader'
import BlogBody from '../../component/comm/htmlBody'
import BlogFooter from '../../component/comm/contentFooter'
import Loading from './../../component/comm/Loading'
import blogService from './../../services/blogService'

class ShowContent extends React.Component{
    static navigationOptions= {
        headerTitle: '博客',
        headerStyle:{
            marginTop:20
        }
    }
    constructor(){
        super()
        this.state={
            isLoading:true, 
        }
    }

    async componentWillMount(){
        await blogService.getBlogContent(this.props.navigation.state.params.Id)
        this.setState({
            isLoading:false
        })
    }

    _navigationComments(blogApp,id){
        const { navigate } = this.props.navigation;
        navigate("BlogComments",{
            Id:id,
            BlogApp:blogApp,
        });
    }
    render(){
        if(this.state.isLoading){
            return(
                <Loading />
            )
        }
        return(
            <View style={styles.container}>
                 <ScrollView style={{flex:1}}>
                   <ContentHeader data={this.props.navigation.state.params.Data} />
                   <BlogBody html={blogService.blogContent} />
                 </ScrollView>
                <View>
                   <BlogFooter data={this.props.navigation.state.params.Data} 
                    navigation={this._navigationComments.bind(this)}/>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
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