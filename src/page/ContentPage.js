import * as React from 'react' 
import {  
  StyleSheet,  
  View,  
  WebView,
  Dimensions,
  ScrollView,
  Text
} from 'react-native'
import Http from './../utils/Http'
import token from './../model/token'
import {Icon} from 'react-native-elements'
import HtmlHelper from '../utils/htmlHelper'

class ContentPage extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerStyle:{
            marginTop:20
        }
      })
      render(){
          return(
            <WebView 
                source={{uri:this.props.navigation.state.params.Url}}
                startInLoadingState={true}
                domStorageEnabled={false}
                javaScriptEnabled={true}
                scalesPageToFit={true}
                />
          )
      } 
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        paddingTop:20
    }
})

export default ContentPage;