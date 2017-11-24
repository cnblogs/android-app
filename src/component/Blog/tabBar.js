import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    Text,
    Animated
} from 'react-native';

class TabBar extends Component {
	setAnimationValue({value}) {
		console.log(value);
	}

	componentDidMount() {
		// Animated.Value监听范围 [0, tab数量-1]
		this.props.scrollValue.addListener(this.setAnimationValue);
    }
    
	renderTabOption(tab, i) {
		let color = this.props.activeTab == i ? "#2c2c2c" : "#ADADAD"; // 判断i是否是当前选中的tab，设置不同的颜色
        let active=this.props.activeTab==i?styles.active:null;
        return (
			<TouchableOpacity onPress={()=>this.props.goToPage(i)} style={[styles.tab,active]}>
				<View style={styles.tabItem}>
					<Text style={{color: color,fontSize:15,fontWeight:'bold'}}>
						{this.props.tabNames[i]}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	tabs: {
        height:30,
        flexDirection:'row',        
        backgroundColor:'white',
        justifyContent:'center',
	},
	tab: {
        marginLeft:20,
    },    
	tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
    },
    active:{
        borderStyle:'solid',
        borderBottomWidth:2,
        borderBottomColor:'#2c2c2c'
    }
});
export default TabBar;