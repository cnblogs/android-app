import React from 'react'
import { Container,Tabs,Tab,ScrollableTab} from 'native-base'
import NewsList from './../../component/ZiXun/NewsList'
import KbList from '../../component/ZiXun/kbList'
import GlobalStyles from '../../config/GlobalStyles'

/**
 * 资讯内容入口
 * 
 * @class Main
 * @extends {React.Component}
 */
class Main extends React.Component{
    constructor(){
        super();
        this.state= {
            types:[
                {
                    key:1,
                    labelName:'新闻',
                    type:'news'
                },{
                    key:2,
                    labelName:'知识库',
                    type:'kb'
                }
           ],
        }
    }

    _renderTabOptions=(item)=>{
        return(
          <Tab heading={item.labelName}
            key={item.key}
            activeTabStyle={GlobalStyles.primarColor}
            tabStyle={GlobalStyles.primarColor}>
            {this._renderList(item.type)}
          </Tab>);
    }

    _renderList(type){
        if(type=='news'){
           return (
             <NewsList
             category={type}
             navigation={this.props.navigation} 
            />);
        }
        return (
            <KbList
            category={type}
            navigation={this.props.navigation} 
            />);
    }
    

    render(){
        const {types}=this.state;
        return (
          <Container>
             <Tabs renderTabBar={()=> <ScrollableTab/>}
             style={GlobalStyles.primarColor}>
              {
                 types.map((type)=> this._renderTabOptions(type))
              }
            </Tabs>
          </Container>
        );
    }
}

export default Main;