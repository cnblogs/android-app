import * as React from 'react' 
import {  
  StyleSheet,  
  View,  
  WebView,
  Dimensions,
  ScrollView,
  Text
} from 'react-native'

class ContentPage extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
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