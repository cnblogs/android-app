import React from 'react'
import {Platform} from 'react-native'
import {Spinner} from 'native-base'
import _htmlService from '../../utils/htmlService';
import AutoHeightWebView from 'react-native-autoheight-webview'

class HtmlBody extends React.Component{
    constructor(){
        super()
        this.state={
            height:500
        }
    }
    render(){
        const {html,data,type}=this.props;
        const htmlCode=_htmlService.generateHtmlCode(data,html,type);
        return(
                <AutoHeightWebView
                    source={{html:htmlCode,baseUrl:'file:///android_asset/web/'}}
                    hasIframe={true}
                    scalesPageToFit={Platform.OS === 'android' ? true : false}
                    enableBaseUrl={true}
                    enableAnimation={true}
                    animationDuration={255}
                    bounces={false}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={true}
                    contentInset={{top:0,left:0}}
                    scalesPageToFit={false}
                    startInLoadingState={true}>
               </AutoHeightWebView>
        )
    }
}
export default HtmlBody;