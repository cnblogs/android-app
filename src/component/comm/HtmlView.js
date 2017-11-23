import React from 'react';
import {StyleSheet, Text,Dimensions, Image, View,ScrollView} from 'react-native';
import HTMLView from 'react-native-htmlview';
import _ from 'lodash';
import htmlHelper from '../../utils/htmlHelper';
import { HtmlConvertorStyles, StyleConfig } from './style/index';
import { filterCodeSnippet, decodeHTML, openLink } from '../../utils/index';


const screenWidth = Dimensions
    .get("window")
    .width

class HtmlViewConvert extends React.Component {

    renderCodeBlock(codeText) {
        const codeLines = codeText.split('\n');
        const codeLen = codeLines.length;
        return codeLines.map((line, index) => {
            if (index == codeLen)
                return null;
            return (
                <View key={index} style={HtmlConvertorStyles.codeRow}>
                    <View style={HtmlConvertorStyles.codeLineWrapper}>
                        <Text style={HtmlConvertorStyles.codeLine}>
                            {line}
                        </Text>
                    </View>
                </View>
            );
        });
    }

    getNodeCodeText(node, codeText) {
        if (node.type == 'text') {
            if (node.data) {
                codeText = codeText + node.data;
            }
        }
        if (node.name && node.children && node.children.length) {
            node
                .children
                .map((child) => {
                    codeText = this.getNodeCodeText(child, codeText);
                });
        }
        return codeText;
    }

    getCodeViewHeight(codeText) {
        const codeRowHeight = 25,
            codeViewPadding = 30;
        const codeRowCount = codeText
                .split('\n')
                .length,
            codeViewHeight = codeRowCount * codeRowHeight + codeViewPadding;
        return codeViewHeight;
    }

    _handleLinkPress(url) {
        Linking
            .canOpenURL(url)
            .then(support => {
                if (support) {
                    Linking.openURL(url)
                }
            })
            .catch(err => console.log(err))
    }

    _onImageLoadEnd(uri, index) {
        const {maxImageWidth} = this.props
        Image.getSize(uri, (w, h) => {
            if (w >= maxImageWidth) {
                w = maxImageWidth
                h = (maxImageWidth / w) * h
            }
            this._images[index] && this
                ._images[index]
                .setNativeProps({
                    style: {
                        width: w,
                        height: h
                    }
                })
        }, err => {})
    }

    _renderNode(node, index) {

        if (node.name == 'iframe') {
            return (
                <View
                    key={'iframe_' + index}
                    style={{
                    width: 200,
                    height: 200
                }}>
                    <Text>{node.attribs.src}</Text>
                </View>
            )
        }

        if (node.name === 'img') {
            const uri = node.attribs.src
            return (<Image
                     source={{ uri:uri}}
                     resizeMode="center"
                     key={'img_' + index}
                     onLoadEnd={() => this._onImageLoadEnd(uri, index)}
                     />)
        }

        if (node.name == "code" || node.name == "pre" || (node.name == "div" && node.attribs && node.attribs.class && node.attribs.class == "cnblogs_code")) {

            const codeId = _.uniqueId('code_');
            let codeText = "";
            codeText = this.getNodeCodeText(node, codeText);

            codeText = decodeHTML(codeText);
            codeText = filterCodeSnippet(codeText);

            const codeViewHeight = this.getCodeViewHeight(codeText);
        }
    }

    render() {
        return (
            <View
                style={{
                backgroundColor: 'white',
                flex: 1
            }}>
                <HTMLView
                    value={htmlHelper.formatHtml(this.props.html)}
                    stylesheet={HtmlConvertorStyles}
                    onLinkPress={this._handleLinkPress.bind(this)}
                    renderNode={this._renderNode.bind(this)}/>
            </View>
        )
    }
}

export default HtmlViewConvert;