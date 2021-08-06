import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      text:'',
    }
  }

  getWord = (word) =>{
    var searchKeyword = word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json";

    return fetch(url)
    .then((data) =>{
      if(data.status === 200){
        return data.json();
      }else{
        return null;
      }
    })
    .then((response) =>{
      var responseObject = response;

      if(responseObject){
        var wordData = responseObject.definitions[0];
        var definition = wordData.description;
        var lexicalCategory = wordData.wordtype;

        this.setState({
          "word": this.state.text,
          "definition": definition,
          "lexicalCategory": lexicalCategory,
        })
      }else{
        this.setState({
          "word": this.state.text,
          "definition": "Not Found",
          "lexicalCategory": "Not Found",
        })
      }
    })
  }

 render(){ 
  return (
    <View>
      <SafeAreaProvider>
        <Header
          backgroundColor={'#A020F0'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#ffffff', fontSize: 20 },
          }}
        />
      </SafeAreaProvider>

      <View>
        <TextInput
          style = {styles.inputBox}
          onChangeText = {text =>{
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: "Loading...",
              lexicalCategory: 'Loading...',
              examples: [],
              definition: "",
            })
            }
          }

          value = {this.state.text}
        />

        <TouchableOpacity
          style = {styles.searchButton}
          onPress = {() =>{
            this.setState({isSearchedPressed: true});
            this.getWord(this.state.text);
          }
          }
        >
          <Text style = {styles.searchButtonText}>
          Search
          </Text>
        </TouchableOpacity>

        <Text style = {styles.wordText}>Word:{" "}</Text>
        <Text style = {styles.wordText2}>{this.state.word}</Text>

        <Text style = {styles.lexicalCategoryText}>Type:{" "}</Text>
        <Text style = {styles.lexicalCategoryText2}>{this.state.lexicalCategory}</Text>

        <Text style = {styles.definitionText}>Definition:{" "}</Text>
        <Text style = {styles.definitionText2}>{this.state.definition}</Text>

      </View>
    </View>
  );
 } 
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    marginTop: 30,
    borderWidth: 4,
    borderRadius: 50
  },
  searchButtonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -5
  },
  wordText: {
    alignItems:"center",
    alignSelf: "center",
    fontSize: 20,
  },
  wordText2: {
    alignItems:"center",
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  lexicalCategoryText: {
    alignItems:"center",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 40,
  },
  lexicalCategoryText2: {
    alignItems:"center",
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  definitionText: {
    alignItems:"center",
    alignSelf: "center",
    fontSize: 20,
    marginTop: 40,
  },
  definitionText2: {
    alignItems:"center",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  }
});
