import React from "react";

import '../App.css'
import Modal from 'react-modal';
import AddToPlaylist from './AddToPlaylist'

export default class Result extends React.Component {

  state = {
    saved: false,
    showModal: false,
    scrolled: false,
    matchingPhrase: null, 
    perfectMatch: false,
    specifiedArtist: false,
    fresh_search: false
  }

  nonInitials = ["(", "'", '"', "[", "/", "`", "+", "*", "&", "^", "%", "$", "#", "@", "-", "="]

  numHash = {
    "0": "zero",
     "1": "one",
     "2": "two",
     "3": "three",
     "4": "four",
     "5":"five",
     "6":"six",
     "7":"seven",
     "8":"eight",
     "9":"nine"
   }

  componentDidMount = ()=>{
    this.appendLyrics()
    let result = document.getElementsByClassName("results")[0]
    result.scrollIntoView({behavior: 'smooth'})
    

  }

  componentDidUpdate = () => {
    this.appendLyrics()
    let result = document.getElementsByClassName("results")[0]
    result.scrollIntoView({behavior: 'smooth'})
    
  }

  boldTheInitials = ()=>{
    if(this.props.globalState){
        let boldMatch = []
        let inputPhrase = this.props.globalState.search.input_phrase.split(' ')
        let matchingPhrase = this.props.globalState.search.matching_phrase.split(' ')
        let wordIndex = 0
        if(inputPhrase.length == matchingPhrase.length){
          matchingPhrase.forEach((word)=>{ 
            //if the matching phrase and hte input phrase are the same length, its a perfect match so we can bold every one of the matching phrase's initials
            let matchInitial = word[wordIndex]
            let restOfWordStart = 1
            while(this.nonInitials.includes(matchInitial)){
            wordIndex++
            restOfWordStart++
            matchInitial = word[wordIndex]
          }
          boldMatch.push((matchInitial.toUpperCase().bold() + word.slice(restOfWordStart, word.length)) + " ")
          })
        }
        else{
        let inputPhraseIndex = 0
        matchingPhrase.forEach((word)=>{
          let matchInitial = word[wordIndex]
          //first let's assume the first charactar is a valid initial
          let restOfWordStart = 1
          if(inputPhraseIndex >= inputPhrase.length){
            //if we reach the end of the input phrase, let's just push the remaining words of the lyric, without bolding them
            boldMatch.push(word.toLowerCase() + " ")
          }
          if(!!word && !!matchInitial && !!inputPhrase[inputPhraseIndex]){
            //if the word is valid, the initial is valid and the input phrase word is still good
            let currentInputWord = inputPhrase[inputPhraseIndex]
            //
            if(this.numHash[currentInputWord]){
              currentInputWord = this.numHash[currentInputWord]
              //converting the digit to a word number
            }

          while(this.nonInitials.includes(matchInitial)){
            //if the first character of the word from the lyric is not a valid initial
            wordIndex++
            restOfWordStart++
            matchInitial = word[wordIndex]
          }
          if(currentInputWord[0] && matchInitial.toLowerCase() == currentInputWord[0].toLowerCase()){

            boldMatch.push((matchInitial.toUpperCase().bold() + word.slice(restOfWordStart, word.length)) + " ")
            inputPhraseIndex++
          }
          else{
            boldMatch.push(word.toLowerCase() + " ")
          }
        wordIndex = 0
          }
          if(!inputPhrase[inputPhraseIndex]){
            inputPhraseIndex++
          }
          
        })
      }
        document.getElementById('matching-phrase-text').innerHTML = " " + boldMatch.join(' ')
        
    }
  }

  backToSearch = ()=>{
    // this.props.scrollSearchIntoView()
    this.setState({scrolled: !this.state.scrolled})
 
     window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  appendLyrics = () => {
    let songDiv = document.getElementById("song");
    songDiv.innerText = "";
    let lyrics = document.createElement("p");
    lyrics.id = "lyrics"
    this.props.globalState.search.song.lyrics.split("\n").forEach((line) => {
     let trimmedMatchingPhrase =  this.props.globalState.search.matching_phrase.trim()
      line = line.trim()
      if(line.split(',').length && trimmedMatchingPhrase.split(' ').length != line.split(' ').length){
          let fragIndex = 0
          let lineLength = line.split(',').length
          line.split(',').forEach((fragment)=>{
            if(fragIndex < lineLength - 1){fragment = `${fragment},`}
            lyrics.innerHTML += fragment.replace(
            trimmedMatchingPhrase,
            (match) => (`<mark clasName = "highlight">${match}</mark>`)
            );
            fragIndex++
          })
      }
      else{
      lyrics.innerHTML += line.replace(
        trimmedMatchingPhrase,
        (match) => `<mark clasName = "highlight">${match}</mark>`
      );
      }
      lyrics.innerHTML += "<br/>";
    });
    this.boldTheInitials()
    songDiv.append(lyrics)
  };

  toggleModal = ()=>{
    this.setState({boldedPhrase: document.getElementById('matching-phrase-text').innerHTML})
    this.setState({showModal: !this.state.showModal})
  }

  render(){
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
      'overflow-y'           :'auto',
      'max-height'           :'100vh'   
      }
    }
   
      return (
        <div className="results">
          <div id = "page buttons">
           <button
            id="previous-page-button"
            className="query-summary"
            onClick = {(e)=>this.props.handleSubmit(e, this.props.original_query, this.props.globalState.search.current_snippet_index-1, this.props.globalState.search.song.artist_id, this.props.globalState.search.order_matters, this.state.fresh_search)}
            >
           ⬅ Previous Result {" "}
          </button>
          <div className = "page-button-break">
          <br>
          </br>
          </div>
          <button
            id="next-page-button"
            className="query-summary"
            onClick = {(e)=>this.props.handleSubmit(e, this.props.original_query, this.props.globalState.search.current_snippet_index+1, this.props.globalState.search.song.artist_id, this.props.globalState.search.order_matters, this.state.fresh_search)}
            >
            Next Result ⮕{" "}
          </button>
          </div>
        <Modal
        isOpen={this.state.showModal}
        style = {customStyles}
        onRequestClose={this.toggleModal}
        scrollable = {true}
        >
          
          <AddToPlaylist
          boldedPhrase = {this.state.boldedPhrase}
          mountUser = {this.props.mountUser}
            globalState = {this.props.globalState}
            toggleModal={this.toggleModal}
          />
            <button onClick = {this.toggleModal}>
              Close
            </button>
        </Modal>
             
        {localStorage.token ? 
      
            <p onClick={this.toggleModal}
              id = "add-song"
              className="query-summary">
              {this.state.saved ? "✓" : "+"}
            </p>
            :
            <p>Register to add this bookmark to a playlist!</p>
            }
            <div id="song-image-container" className= "query-summary">
              <img width = '40' height = '40' src = {this.props.globalState.search.song.image} alt = {this.props.globalState.search.song.full_title}/>
          </div>
            <a href={this.props.globalState.search.song.url} >
              {this.props.globalState.search.song.full_title}</a>
          <div id="input-phrase-match" className="query-summary">
            Your Input:
            {"  " + this.props.globalState.search.input_phrase}
            <br />
            Matching Phrase:
           <text id = "matching-phrase-text">{" " + this.props.globalState.search.matching_phrase}</text> 
          </div>
          
          <h2 id="title"></h2>

          <iframe
            title="youtube-vid"
            width="426"
            height="240"
            className="youtube-frame"
            src={`https://www.youtube.com/embed/${this.props.globalState.search.song.youtube_id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            /> 
            <button onClick = {this.backToSearch} id = 'back-to-search'>
              
              <text>Back to search ⬆</text>
              
            </button>
          <div id="song"></div> 
        </div>
      );
  }
}
