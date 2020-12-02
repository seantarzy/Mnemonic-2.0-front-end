import React from "react";

import '../App.css'
import { saveBookmark } from '../services/utils'
import Modal from 'react-modal';
import CreatePlaylistForm from './AddToPlaylist'
import AddToPlaylist from './AddToPlaylist'
export default class Result extends React.Component {


  state = {
    saved: false,
    showModal: false,
    scrolled: false,
    showModal: false,
    matchingPhrase: null
  }

  nonInitials = ["(", "'", '"', "[", "/", "`", "+", "*", "&", "^", "%", "$", "#", "@", "-", "="]


  componentDidMount = ()=>{
    // this.boldTheInitials()
    this.appendLyrics()
    let result = document.getElementsByClassName("results")[0]
    result.scrollIntoView({behavior: 'smooth'})
    

  }

  componentDidUpdate = () => {
    this.appendLyrics()
    // this.boldTheInitials()
    let result = document.getElementsByClassName("results")[0]
    result.scrollIntoView({behavior: 'smooth'})
    
  }

  boldTheInitials = ()=>{
    if(this.props.globalState){
      console.log("hit")
        let boldMatch = []
        let inputPhrase = this.props.globalState.search.input_phrase.split(' ')
        let matching_phrase = this.props.globalState.search.matching_phrase.split(' ')
        let inputPhraseLetterIndex = 0
        let wordIndex = 0
        matching_phrase.forEach((word)=>{
          let matchInitial = word[wordIndex]
          let restOfWordStart = 1
          while(this.nonInitials.includes(matchInitial)){
            wordIndex++
            restOfWordStart++
            matchInitial = word[wordIndex]
          }
          if(word && matchInitial && inputPhrase[inputPhraseLetterIndex] && inputPhrase[inputPhraseLetterIndex][0] && matchInitial.toLowerCase() == inputPhrase[inputPhraseLetterIndex][0].toLowerCase()){
            boldMatch.push((matchInitial.toUpperCase().bold() + word.slice(restOfWordStart, word.length)) + " ")
            inputPhraseLetterIndex++
          }
          else{
            boldMatch.push(word + " ")
          }
        wordIndex = 0
        })
        // debugger
        document.getElementById('matching-phrase-text').innerHTML = " " + boldMatch.join(' ')
        // this.setState({matchingPhrase: boldMatch.join(' ')})
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
  
    this.props.globalState.search.song.lyrics.split("\n").forEach((line) => {
      lyrics.innerHTML += line.replace(
        this.props.globalState.search.matching_phrase,
        (match) => `<mark>${match}</mark>`
      );
      lyrics.innerHTML += "<br/>";
    });
    this.boldTheInitials()

    songDiv.append(lyrics);
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
    };
      return (
        <div className="results">
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
          <button
            id="next-page-button"
            className="query-summary"
            onClick = {(e)=>this.props.handleSubmit(e, this.props.original_query, this.props.globalState.search.current_snippet_index, this.props.globalState.search.song.artist_id, this.props.globalState.search.order_matters)}
            >
            Next Result ⮕{" "}
          </button>
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
