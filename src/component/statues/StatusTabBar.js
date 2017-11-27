'use strict';

import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import {Icon} from 'react-native-elements'

class StatusTabBar extends Component {
	setAnimationValue({value}) {
		console.log(value);
	}

	componentDidMount() {
		// Animated.Value监听范围 [0, tab数量-1]
		this.props.scrollValue.addListener(this.setAnimationValue);
    }
    
    _goToPublish(){
        this.props.navigationToPublish();
    }

	renderTabOption(tab, i) {
        let color = this.props.activeTab == i ? '#2c2c2c':'#ADADAD'; // 判断i是否是当前选中的tab，设置不同的颜色
        let active=this.props.activeTab==i?styles.active:null;
		return (
			<TouchableOpacity onPress={()=>this.props.goToPage(i)} style={[styles.tab,active]}>
				<View style={[styles.tabItem]}>
					<Text style={{color: color,fontSize:15,fontWeight:'bold'}}>
						{this.props.tabNames[i]}
					</Text>
				</View>
            </TouchableOpacity>
		);
	}

	render() {
		return (
            <View style={styles.container}>
               <View style={styles.iconCreate}>
                 <Icon name="border-color" color='#2c2c2c' onPress={this._goToPublish.bind(this)}/>
               </View>

                <View style={styles.tabs}>
                   {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                </View>

                <View style={styles.iconNotice}>
                   <Icon name="inbox" color='#2c2c2c'  onPress={() => this._goToPublish()}/>
                </View>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'white',
        height:45,
        alignItems:'center', 
    },
	tabs: {
        flex:2,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',         
        height:45  
	},

	tab: {
		marginLeft:20,
	},
	tabItem: {
        flexDirection: 'column',
        justifyContent:'center',         
    },
    iconCreate:{
        flex:1,        
    },
    iconNotice:{
        flex:1,        
    },
    active:{
        borderStyle:'solid',
        borderBottomWidth:2,
        borderBottomColor:'#2c2c2c'
    }
});


export default StatusTabBar;