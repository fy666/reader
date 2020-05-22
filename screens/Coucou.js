import React,{useContext} from 'react';
import {View, Text, StyleSheet,Button,TextInput,ScrollView } from 'react-native';
import PropTypes from 'prop-types'
import {BookContext} from '../Providers'


export default class Test2 extends React.Component {

  state={
    page : 0,
    chapter : 0
  }

  static contextType = BookContext
  componentDidMount(){
    var data = this.props.route.params
    this.setState({chapter:data.chapter})

    this.numOfChapters = this.context.chapters
    this.numOfPagesInCurrentChapter = this.context.chapter[this.state.chapter].pages
    }

    componentDidUpdate(prevProps, prevState){
      if(this.state.chapter !== prevState.chapter){
          this.numOfPagesInCurrentChapter = this.context.chapter[this.state.chapter.pages]
      }
      if(this.state.chapter !== prevState.chapter || this.state.page != prevState.page){
      console.log(`Going to page : ${this.state.page} chapter ${this.state.chapter}`)
      }
      }

    nextPage() {
      if (this.state.page + 1 < this.numOfPagesInCurrentChapter){
        this.setState((previousState) => ({page: previousState.page+1}))
      }
      else if(this.state.chapter + 1 < this.numOfChapters){
        this.setState((previousState) => ({page: 0, chapter: previousState.chapter+1}))
      }
      else{
        console.log("End of book !")
      }
    }

    previousPage() {
      if (this.state.page - 1 >= 0){
        this.setState((previousState) => ({page: previousState.page-1}))
      }
      else if(this.state.chapter - 1 >= 0){
        this.setState((previousState) => ({page: this.context.chapter[previousState.chapter-1].pages-1, chapter: previousState.chapter-1}))
      }
      else{
        console.log("End of book !")
      }
    }

  //static lol = useContext(BookContext)
    render() {
    //  console.log(this.context)
        return(
          <View style={{justifyContent: "center", padding:50}}>
          <Text style={{textAlign: 'center',fontSize : 15, color:'red'} }> {this.context.chapter[this.state.chapter].title}  </Text>
          <ScrollView>
          <Text style={{textAlign: 'justify',fontSize : 15, color:'black'} }> {this.context.chapter[this.state.chapter].page[this.state.page]}  </Text>
          <Button
          title="Next Page"
          onPress={() => this.nextPage()}
          />
          <Button
          title="Previous Page"
          onPress={() => this.previousPage()}
          />
          </ScrollView>
          </View>
        )
    }
}

//marginTop:"5px"
