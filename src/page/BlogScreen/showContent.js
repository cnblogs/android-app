import React from 'react'
import {
    Container,
    Text,
    Content,
    Header,
    Body,
    Left,
    Right,
    Button,
    Icon,
    StyleProvider,
    Toast
} from 'native-base'
import {View} from 'react-native'
import HtmlView from '../../component/comm/htmlBody'
import Avatar from '../../component/comm/Avatar'
import BlogFooter from '../../component/comm/contentFooter'
import _blogService from './../../api/blogService'

/**
 * 博文内容展示
 * 
 * @class ShowContent
 * @extends {React.Component}
 */
class ShowContent extends React.Component {
    constructor() {
        super()
        this.state = {
            htmlCode: ''
        }
    }

    async componentDidMount() {
        const {Id}=this.props.navigation.state.params;
        let data = await this._getBlogContentById(Id);
        this.setState({htmlCode: data})
    }

    /**
     * 跳转到评论页
     * 
     * @memberof ShowContent
     */
    linkToComments=(blogApp, postId)=>{
        const {navigate} = this.props.navigation;
        navigate("BlogComments", {
            PostId: postId,
            BlogApp: blogApp
        });
    }

    /**
     * 根据Id获取博文内容
     * 
     * @param {any} id 
     * @returns 
     * @memberof ShowContent
     */
    async _getBlogContentById(id) {
        let response = await _blogService.getBlogContent(id);
        if (response.status != 200) {
            Toast.show({
                text:'服务器走丢了.',
                position:"center",
                type:'danger'
             })
        }
        return response.data;
    }
    
    render() {
        const {Data} = this.props.navigation.state.params;
        return (
            <Container>
                <Header androidStatusBarColor="#007FFF" style={{backgroundColor:'#007FFF'}}>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Avatar avatar={Data.Avatar} author={Data.Author} color='white'/>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <HtmlView html={this.state.htmlCode} data={Data} type='blog'/>
                </Content>
                <View>
                   <BlogFooter data={Data}
                    linkToComments={this.linkToComments}/>
                </View>
            </Container>
        )
    }
}

export default ShowContent;