import * as React from 'react';
import { Modal, Text, View, StyleSheet, Button, WebView, TouchableHighlight } from 'react-native';
//import { WebView } from 'react-native-webview';
//import Constants from 'expo-constants';
import {
  EpubView, // Underlaying epub-canvas (wrapper for epub.js iframe)
  EpubViewStyle, // Styles for EpubView, you can pass it to the instance as a style prop for customize it
  ReactReader, // A simple epub-reader with left/right button and chapter navigation
  ReactReaderStyle // Styles for the epub-reader it you need to customize it
} from 'react-reader'

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const page_regex = /\[page\d+\]/;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.booktext = `[page1]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ne tum quidem te respicies et cogitabis sibi quemque natum esse et suis voluptatibus? Praetereo multos, in bis doctum hominem et suavem, Hieronymum, quem iam cur Peripateticum appellem nescio. Duo Reges: constructio interrete. Cave putes quicquam esse verius. Omnes enim iucundum motum, quo sensus hilaretur. Sed vobis voluptatum perceptarum recordatio vitam beatam facit, et quidem corpore perceptarum.
[page2]
Nam et a te perfici istam disputationem volo, nec tua mihi oratio longa videri potest. Sic igitur in homine perfectio ista in eo potissimum, quod est optimum, id est in virtute, laudatur. Cum sciret confestim esse moriendum eamque mortem ardentiore studio peteret, quam Epicurus voluptatem petendam putat. Hoc ipsum elegantius poni meliusque potuit. Ut in geometria, prima si dederis, danda sunt omnia. Quis contra in illa aetate pudorem, constantiam, etiamsi sua nihil intersit, non tamen diligat? Sed non sunt in eo genere tantae commoditates corporis tamque productae temporibus tamque multae. Quae cum dixissem, magis ut illum provocarem quam ut ipse loquerer, tum Triarius leniter arridens: Tu quidem, inquit, totum Epicurum paene e philosophorum choro sustulisti. Vide igitur ne non debeas verbis nostris uti, sententiis tuis.
[page3]
Atqui perspicuum est hominem e corpore animoque constare, cum primae sint animi partes, secundae corporis. Non est igitur summum malum dolor. Qualis est igitur omnis haec, quam dico, conspiratio consensusque virtutum, tale est illud ipsum honestum, quandoquidem honestum aut ipsa virtus est aut res gesta virtute; Non enim hilaritate nec lascivia nec risu aut ioco, comite levitatis, saepe etiam tristes firmitate et constantia sunt beati. Homines optimi non intellegunt totam rationem everti, si ita res se habeat. Ergo ita: non posse honeste vivi, nisi honeste vivatur? Est igitur officium eius generis, quod nec in bonis ponatur nec in contrariis. Ergo id est convenienter naturae vivere, a natura discedere. Deinde non quaerimus, quid obscuretur aut intereat, quia sit admodum parvum, sed quid tale sit, ut expleat summam.
[page4]
In omni enim arte vel studio vel quavis scientia vel in ipsa virtute optimum quidque rarissimum est. Omnes, qui non sint sapientes, aeque miseros esse, sapientes omnes summe beatos, recte facta omnia aequalia, omnia peccata paria; An me, inquis, tam amentem putas, ut apud imperitos isto modo loquar? An eum locum libenter invisit, ubi Demosthenes et Aeschines inter se decertare soliti sunt? Atqui perspicuum est hominem e corpore animoque constare, cum primae sint animi partes, secundae corporis. Nunc ita separantur, ut disiuncta sint, quo nihil potest esse perversius. Effluit igitur voluptas corporis et prima quaeque avolat saepiusque relinquit causam paenitendi quam recordandi. Ita finis bonorum existit secundum naturam vivere sic affectum, ut optime is affici possit ad naturamque accommodatissime.
`;
    this.state = { page: 1, isLoading: true, modalVisible: null };
  }

  componentDidMount() {
    /*     fetch('https://loripsum.net/api/plaintext/long')
      .then(response => {
        console.log(response.json());
        this.booktext = response;
      })
      .catch(error => console.log(error)); //to catch the errors if any
  */
  }

  removePunctuation = text => {
    // this is a hack to remove comma from the text
    // you may want to handle this different
    return text.replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, '');
  };

  onTextPress(e, s) {
    console.log(e, s);
    this.setModalVisible(s);
    console.log(this.state.modalVisible);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  split_pages_text(text) {
    return text.split(page_regex);
  }

  renderModal() {
    return (
      <Text>The definition of the word {this.state.modalVisible}</Text>
    )
  }

  addDictTouch(text, dict) {
    return text.split(' ').map((s, index) => {
      if (dict.indexOf(this.removePunctuation(s)) > -1) {
        //if (dict.indexOf(s) > -1) {
        return (
          // {`${index !== (text.split(' ').lenght - 1) && 'yolo'} `}
          <Text style={styles.specialword}
                onPress={e => this.onTextPress(e, s)} >
            {`${s} `}
          </Text>
        );
      } else return `${s} `;
    });
  }

         /* <WebView
        source={{ html: '<p>'+rich_text_of_page+'</p>' }}
        style={{ textAlign: "justify", margin: 24, fontSize: 18 }}
        /> */

  render() {

    const dict = ['lorem', 'dolor', 'amet'];
    const pagetext = this.split_pages_text(this.booktext);
    const rich_text_of_page = this.addDictTouch(pagetext[this.state.page], dict);
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {rich_text_of_page}
        </Text>
        <Button
          onPress={() => {
            if (this.state.page + 1 >= pagetext.length) {
              console.log('last page');
            } else {
              this.setState({ page: this.state.page + 1 });
            }
          }}
          title="Next page"
        />
        <Button
          title="Prev page"
          onPress={() =>
            this.setState(prevState => {
              return { page: Math.max(prevState.page - 1, 1) };
            })
          }
        />
        <Modal animationType="slide" visible={this.state.modalVisible!==null} >
          <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor:  'rgba(80,80,80,0.1)'}}>
          <View style={{width: 300,height: 300}}>
            {this.renderModal()}
            <Button title="Hide modal" onPress={() => {this.setModalVisible(null)}} />
            </View>
          </View>
        </Modal>
      </View>
    );
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
