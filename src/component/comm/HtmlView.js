import React from 'react';
import {StyleSheet, Text,Dimensions, Image, View,ScrollView} from 'react-native';
import HTMLView from 'react-native-htmlview';
import _ from 'lodash';
import { HtmlConvertorStyles, StyleConfig } from '../../config/htmlStyle';
import { filterCodeSnippet, decodeHTML, openLink } from '../../utils/htmlConvert';

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
        const codeRowHeight =15 ,
            codeViewPadding = 10;
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

        if (node.name == "code" || node.name == "pre" || (node.name == "div" && node.attribs && node.attribs.class && node.attribs.class == "cnblogs_code")) {
            const codeId = _.uniqueId('code_');
            let codeText = "";
            codeText = this.getNodeCodeText(node, codeText);
            codeText = decodeHTML(codeText);
            codeText = filterCodeSnippet(codeText);
            const codeViewHeight = this.getCodeViewHeight(codeText);
            if (codeText) {	
                return (
                    <ScrollView
                        key= { codeId }
                        style={[HtmlConvertorStyles.codeScrollView, {height: codeViewHeight}]}
                        horizontal={ true }
                        showsVerticalScrollIndicator ={ true }
                        showsHorizontalScrollIndicator={ true }>
                        <View style={HtmlConvertorStyles.codeWrapper}>
                            { this.renderCodeBlock(codeText) }
                        </View>
                    </ScrollView>
                );
            }
        }
    }

    render() {
        return (
            <View style={{
                backgroundColor:'white',
                marginLeft: 5,
                marginRight: 5}}>
                <HTMLView
                    value={this.props.html}
                    addLineBreaks={false}
                    stylesheet={HtmlConvertorStyles}
                    onLinkPress={this._handleLinkPress.bind(this)}
                    renderNode={this._renderNode.bind(this)}/>
            </View>
        )
    }
}
export default HtmlViewConvert;