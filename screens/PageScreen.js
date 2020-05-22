import React from 'react';
import {View, Text, StyleSheet,Button,Image } from 'react-native';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'


export default class Page extends React.Component {
render() {
        var data = this.props.navigation.getParam('text')
        return(
          <View>
          <Text style={{textAlign: 'left',fontSize : 20} }> {this.props.navigation.getParam('text')} </Text>
          </View>
        )
    }
}
