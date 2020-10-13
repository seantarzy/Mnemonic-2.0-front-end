import React, { createElement } from "react";
import { fetchMnemonic } from './services/utils'
import SongLyrics from './components/SongLyrics'
import SongHeader from './components/SongHeader'
import SearchBar from './components/SearchBar'
export default class Home extends React.Component {
  state = {
      query: '',
      handleSearch: false,
      currentSong: null,
      matchingPhrase: '',
      error: null
  }
  handleChange = (e)=>{
    this.setState({[e.target.name]: e.target.value})
  }
  refreshPage = ()=>{
    this.setState({handleSearch: false});
  }
  renderSong = ()=>{
  }
  handleSubmit = (e, query) => {
    // e.preventDefault()
    console.log("query:", query)
     fetchMnemonic(query).then((r) => {
      //  console.log('fetched', r.song.lyrics);
       if (r.error) {
         this.setState({error: r.error})
         let songDiv = document.getElementById("song");
         songDiv.innerText = r.error;
       } else {
         this.setState({currentSong: r.song, matchingPhrase: r.matching_phrase, error: null});
         console.log("state", this.state.currentSong.lyrics)
       }
     });
    e.preventDefault()
    setTimeout( ()=> {
        this.setState({ handleSearch: true });
    }, 10);
    this.refreshPage()
    };
  render() {
    return (
      <>
        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Enter Input:
            <input
              type="text"
              name="query"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form> */}
            <SearchBar handleSubmit = {this.handleSubmit}/>
        {this.state.handleSearch && this.state.currentSong ? 
        (
          <div>
          {console.log('hit')}
            <SongHeader song = {this.state.currentSong} matchingPhrase = {this.state.matchingPhrase}/>
            <SongLyrics
              query={this.state.query}
              handleSearch={this.state.handleSearch}
              lyrics={this.state.currentSong.lyrics}
              matchingPhrase={this.state.matchingPhrase}
            />
          </div>
        ) : null}
      </>
    );
  }
}

