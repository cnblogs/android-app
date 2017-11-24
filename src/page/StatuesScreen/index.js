import React from 'react';
import {View} from 'react-native';
import { observer } from 'mobx-react/native';
import statuesService from '../../services/statuesService';
import StatusHeader from '../../component/statues/StatusHeader';
import StatuesList from './StatuesList';

@observer
class Index extends React.Component{
    constructor(){
        super();
        this.state={
            type:'all',
            index:1
        }
    }
    async componentWillMount(){
        await statuesService.getStatuesList(this.state.type,1,10)       
    }

    async _swithType(type){
        this.setState({
            type:type,
        })
    }

    async _onRefresh(){
        await statuesService.getStatuesList(this.state.type,1,10);
    }

    async _onLoad(){
        await statuesService.loadStatuesList(this.state.type,this.state.index+1,10);
        this.setState({
            index:this.state.index+1
        })
    }

    _renderItem(){
        return <StatuesList
                 type={this.state.type}
                 navigation={this.props.navigation} 
                 store={statuesService.statuesList}
                 OnRefresh={this._onRefresh.bind(this)}
                 OnLoad={this._onLoad.bind(this)}
                />
    }

    render(){
        return(
            <View style={{flex:1}}>
            <View style={{flex:1}}>
                <View>
                   <StatusHeader Switch={this._swithType.bind(this)} navigation={this.props.navigation}/>
                </View>
                 {this._renderItem()}
            </View>
            </View>
        )
    }
}
export default Index;