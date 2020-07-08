import React,{useContext} from 'react';
import {View, Text, StyleSheet,Button,TextInput,ScrollView,TouchableOpacity } from 'react-native';
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

    showDefinition(word){
      console.log(`Definition of ${word} `) //${this.contect.dico[word]}`)
      console.log(word)
    }

    printWord(word){
      return (<TouchableOpacity>
      <Text onLongPress={() => this.showDefinition(word)}> {word} </Text>
    </TouchableOpacity>)
    }

    removePunctuation = text => {
      // this is a hack to remove comma from the text
      // you may want to handle this different
      return text.replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, '');
    };

    printText(page){
      return page.split(' ').map((word, index) => {
        let clean_word = this.removePunctuation(word)
        return(
        <TouchableOpacity onPress={() => this.showDefinition(clean_word)}>
        <Text>
              {`${word} `}
        </Text>
        </TouchableOpacity>)
      });
    }

  //static lol = useContext(BookContext)
    render() {
    //  console.log(this.context)
      let text_to_render = this.printText(this.context.chapter[this.state.chapter].page[this.state.page])
      //console.log(text_to_render)
        return(
          <View style={[styles.container, {justifyContent: "center", padding:50}]}>
          <Text style={{textAlign: 'center',fontSize : 15, color:'red'} }> {this.context.chapter[this.state.chapter].title}  </Text>
          <ScrollView>
      //    <Text style={styles.paragraph}>
          text_to_render
          //</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 17,
    textAlign: 'justify',
  },
  specialword: {
    fontWeight: 'bold',
  },
});

//marginTop:"5px"
