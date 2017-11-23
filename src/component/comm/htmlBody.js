import React from 'react'
import {View,Text,Platform} from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import HtmlHelper from '../../utils/htmlHelper'

class HtmlBody extends React.Component{
    formatHtml(html){
        return HtmlHelper.formatHtml(html);
    }
    render(){
        return(
                <AutoHeightWebView
                  hasIframe={true}
                  scalesPageToFit={Platform.OS === 'android' ? true : false} 
                  enableBaseUrl={true}
                  heightOffset={5}
                  enableAnimation={true}
                  animationDuration={255}
                  startInLoadingState={true}
                  source={{ html:this.formatHtml(this.props.html),baseUrl:'file:///android_asset/web/'
                }} 
                 customScript={`document.body.style.background = 'white';`}
                 customStyle={`
                  img {
                    width:100%;
                    height:auto;
                  }
                `}
                />
        )
    }
}
export default HtmlBody;