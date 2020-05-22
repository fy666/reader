import React from 'react';
import {View, Text, StyleSheet,Button,TextInput,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import {BookContext} from '../Providers'



export default class Test1 extends React.Component {
  state={
    chapter : 0
  }

  renderChapter = numChapter => (
      <View>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Coucou', {"chapter": numChapter})}>
      <Text style={{fontSize:20}}> {this.context.chapter[numChapter].title} </Text>
      </TouchableOpacity>
      </View>
  )

  static contextType = BookContext
  componentDidMount(){
    this.numOfChapters = this.context.chapters
    this.numOfPagesInCurrentChapter = this.context.chapter[this.state.chapter].pages
    }

    render() {
      let chapter_array = this.context.chapter.map((item,key) => this.renderChapter(key))
        return(
          <View style={{justifyContent: "center",padding:50}}>
          <Text style={{textAlign: 'center',fontSize : 15, color:'red'}}> Book one  </Text>
          {chapter_array}
          <Button
          title="Start reading"
          onPress={() => this.props.navigation.navigate('Coucou', {"chapter":0})}
          />
          </View>
        )
    }
}
