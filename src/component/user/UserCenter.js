import * as React from 'react';
import { Text, View, StyleSheet, AsyncStorage,Alert } from 'react-native';
import User from './User';
import list from '../../config/Setting'
import {List,ListItem} from 'react-native-elements'
import codePush from 'react-native-code-push'


const deploymentKey="Na445gxFz-KIIu2j1gGjEmUq4QpZ487f23ee-7ab9-474a-b2ea-308f881eabe4";

class UserCenter extends React.Component{
    navigation(pagename,blogApp){
        if(pagename=="update"){
            this.checkUpdate();
        }else{
        let data={
            BlogApp:blogApp
        }
        this.props.navigation.navigate(pagename,data)
    }
    }

    checkUpdate(){
        codePush.checkForUpdate(deploymentKey).then((update)=>{
            if(!update){
                Alert.alert("提示","已是最新版本.",[
                    {
                        text:'ok',
                        onPress:()=>{
                            console.log("点了OK")
                        }
                    }
                ])
            }else{
                codePush.sync({
                    deploymentKey: deploymentKey,
                    updateDialog: {
                        mandatoryContinueButtonLabel:"立即更新",
                        optionalIgnoreButtonLabel: '稍后',
                        optionalInstallButtonLabel: '立即更新',
                        optionalUpdateMessage: '有新版本了，是否更新？',
                        title: '更新提示'
                    },
                    installMode: codePush.InstallMode.IMMEDIATE,
                },
                (status) => {
                    switch (status) {
                        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                            console.log("DOWNLOADING_PACKAGE");
                            break;
                        case codePush.SyncStatus.INSTALLING_UPDATE:
                            console.log(" INSTALLING_UPDATE");
                            break;
                    }
                },
                (progress) => {
                    console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
                },
            );
            }
        })
    }

    render() {
        const BlogApp=this.props.user.BlogApp;
        return (
            <View>
                <View>
                    <User
                        isLogin={this.props.isLogin}
                        navigation={this.props.navigation}
                        userinfo={this.props.user}
                    />
                </View>
                <View>
                    <List>
                        {
                            list.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    leftIcon={{ name: item.icon }}
                                    onPress={()=>{this.navigation(item.name,BlogApp)}}
                                />
                            ))
                        }
                    </List>
                </View>

            </View>)
    }
}

export default UserCenter;