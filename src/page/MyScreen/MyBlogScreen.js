import * as React from 'react';
import {
	AppRegistry,
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
    AsyncStorage
} from 'react-native';
import Http from '../../utils/Http'
import formatDate from '../../utils/formatDate'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import AppConfig from '../../config/AppConfig'

class MyBlogScreen extends React.Component {
	static navigationOptions={
        title:'我的博客'
    }
	constructor(props) {
		super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const { params } = this.props.navigation.state               
		this.state = {
            listViewData:[],
            blogApp:params.BlogApp
		};
    }
    async componentWillMount(){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let url=`https://api.cnblogs.com/api/blogs/${this.state.blogApp}/posts?pageIndex=1`
         if(tokenStr){
             let access_token=JSON.parse(tokenStr).access_token;
             let data=await this._request(url,access_token);
             this.setState({
                listViewData:data
             })
         }
	}
	
    _goDeail(item){
        const { navigate } = this.props.navigation;
        navigate("Content",{
            Url:item.Url,
            title:`${item.Author}的博客`,
            type:'blog'
        });
    }

	deleteRow(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].closeRow();
		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({listViewData: newData});
    }
    
    async _request(url,access_token){
        let response=await Http.GetAsync(url,access_token);
        return response.data;
    }

	render() {
        const { params } = this.props.navigation.state       
		return (
			<View style={styles.container}>
					<SwipeListView
					    disableRightSwipe={true}
						dataSource={this.ds.cloneWithRows(this.state.listViewData)}
						renderRow={ data => (
							<TouchableHighlight
								onPress={()=>this._goDeail(data) }
								style={styles.rowFront}
							>
								<View>
									<Text style={styles.title}>{data.Title}</Text>
                                    <View style={styles.itemFooter}>
									<View style={styles.itemCount}>
										<View style={styles.ViewCount}>
											<Text>
												{data.DiggCount} 推荐 · 
											</Text>
										</View> 
										<View style={styles.ViewCount}>
											<Text>
												{data.ViewCount} 阅读 ·
											</Text>
										</View> 
										<View style={styles.CommentCount}>
											<Text>
												 {data.CommentCount} 评论
											</Text>
										</View>
									</View>
									<View style={styles.itemPostDate}>
									   <Text>{formatDate(data.PostDate)}</Text>
									</View>
								</View>
								</View>
							</TouchableHighlight>
						)}
						renderHiddenRow={ (data, secId, rowId, rowMap) => (
							<View style={styles.rowBack}>
                            <Text>分享</Text>
								<View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
									<Text style={styles.backTextWhite}></Text>
								</View>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(secId, rowId, rowMap,data) }>
								    <Text style={styles.backTextWhite}>分享</Text>
							   </TouchableOpacity>
							</View>
						)}
						leftOpenValue={0}
						rightOpenValue={-75}
					/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E9E9EF',
		flex: 1
	},
	title:{
		color:'black',
		fontSize:15,
		margin:10		
	},
	itemFooter:{
        marginLeft:8,
        marginTop:5,
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    itemCount:{
        flex:5,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    ViewCount:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    CommentCount:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingLeft:5
    },
    itemPostDate:{
        flex:5,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center' ,
        marginRight:8   
    },
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: 'white',
		justifyContent: 'center',
		height: 50,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		backgroundColor: 'white',
		borderBottomColor: '#dddddd',
		borderBottomWidth: 1,
		justifyContent: 'flex-start',
		height:75,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: '#EB5F6B',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: '#2196F3',
		right: 0
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: 100,
	}
});

export default MyBlogScreen;