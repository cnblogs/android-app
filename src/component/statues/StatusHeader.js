import * as React from 'react'
import
{
    Image,
    Text,
    StyleSheet,
    View,
    FlatList,
    AsyncStorage,
    TouchableOpacity
}
from 'react-native'
import {Icon} from 'react-native-elements'
import token from '../../model/token'
import Avatar from '../comm/Avatar'
import Http from '../../utils/Http'

class StatusHeader extends React.Component {
    constructor() {
        super()
        this.state = {
            isActive: true,
            type:'all'
        }
    }

    _switchStyle(type) {
        if (type == this.state.type) {
            return styles.active
        }
        return null
    }

    _handleClick(type) {
        if (type != this.state.type) {
            this.setState({type: type})
            this.props.Switch(type)
        }
    }

    _goToPublish() {
        this.props.navigate("PublishStatus")
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    justifyContent:'center'
                }}>
                    <Icon name="border-color" color='#2c2c2c' size={15} onPress={() => this._goToPublish()}/>
                </View>

                <View
                    style={{
                    flex: 3,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent:'center'
                }}>
                    <TouchableOpacity
                        style={[
                        styles.container_home,this._switchStyle("all")
                    ]}
                        onPress={() => this._handleClick('all')}>
                        <View>
                            <Text
                                style={[
                                styles.home_text, {
                                    color: this.state.type == "all"
                                        ? '#2c2c2c'
                                        : '#ADADAD'
                                }
                            ]}>动态</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                        styles.container_picked, this._switchStyle("following")
                    ]}
                        onPress={() => this._handleClick('following')}>
                        <View>
                            <Text
                                style={[
                                styles.picked_text, {
                                    color: this.state.type == "following"
                                        ? '#2c2c2c'
                                        : '#ADADAD'
                                }
                            ]}>关注</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                        styles.container_picked, this._switchStyle("my")
                    ]}
                        onPress={() => this._handleClick('my')}>
                        <View>
                            <Text
                                style={[
                                styles.picked_text, {
                                    color: this.state.type == "my"
                                        ? '#2c2c2c'
                                        : '#ADADAD'
                                }
                            ]}>我的</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent:'center'
                }}>
                    <Icon name="inbox" color='#2c2c2c' size={15} onPress={() => this._goToPublish()}/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 35,
    },
    home_text: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    picked_text: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    container_picked: {
        marginLeft: 20,
        justifyContent: 'center'
    },
    container_home: {
        justifyContent: 'center',
        marginLeft: 15
    },
    active: {
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: 'white'
    }
});
export default StatusHeader;