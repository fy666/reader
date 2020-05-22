import React from 'react';
import {View, Text, StyleSheet,Button,TextInput } from 'react-native';
import PropTypes from 'prop-types'


export default class Settings extends React.Component {

    render() {
        return(
          <View style={{justifyContent: "center",padding:50}}>
          <Text style={{textAlign: 'center',fontSize : 15, color:'blue'}}> Settings  </Text>
          </View>
        )
    }
}
