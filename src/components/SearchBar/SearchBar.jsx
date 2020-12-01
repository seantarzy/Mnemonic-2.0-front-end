import React from "react";

import Select from 'react-select'
import 'react-select/dist/react-select.cjs'
import './SearchBar.css'
export default class Home extends React.Component {
  //circular buttons
  //spice up background
  //different fonts
  // picker-on change filter the select menu
  // put a checkmark 
  state = {
    query: "",
    artist: "",
    order: true,
    artistOptions: null
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelect = (e)=>{
this.setState({artist: e.value})
  }
  handleCheckToggle = ()=>{
    this.setState({order: !this.state.order})
  }

  componentDidMount = ()=>{
    console.log("artist options: ", this.props.artistOptions)
if(this.props.artists){
    const artistOptions = this.props.artists.map((artist)=>{
     return { label: artist.name, value: artist.id}
    })
    // debugger
    this.setState({artistOptions})
  }
  }

  render() {
    return (
      <div className = "search-page"> 
      <form
        onSubmit={(e) =>
          this.props.handleSubmit(
            e,
            this.state.query,
            0,
            this.state.artist,
            this.state.order
          )
        }
        style={this.styles}
      >
        <div id="card-for-text">
          <div id = "phrase-to-remember">
        <label>
          Phrase to Remember:
          <br>
          </br>
          <input
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </label>
        </div>
        <br />
        <div id="by-artist">
        <label>
          By Specific Artist:
        </label>
          {/* <select name="artist" id="artist" onChange={this.handleChange}> */}
            {
              this.props.artistOptions ?
              <Select
              className = "filter-select"
              options = {this.props.artistOptions}
              onChange = {this.handleSelect}
              /> 
            :
                null
            }
            </div>
          {/* </select> */}
          <br>
          </br>
          <div id="round-order-matters-checkbox">
            <div className = "round"  >
        <input
          id = "checkbox"
          name="isGoing"
          type="checkbox"
          checked={this.state.order}
          onChange={this.handleCheckToggle}/>
          <label for="checkbox"></label>
          </div>
          <text className = "order-matters" id = "order-matters-text">Order Matters</text>
        <br />
        </div>
        <br>
        </br>
        <input type="submit" value = "make my mnemonic!" />
        </div>
      </form>
      </div>
    );
  }
}
