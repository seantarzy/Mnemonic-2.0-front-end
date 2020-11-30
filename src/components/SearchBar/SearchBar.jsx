import React from "react";

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
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCheckToggle = ()=>{
    this.setState({order: !this.state.order})
  }

  render() {
    return (
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
        <label>
          Phrase to remember:
          <br>
          </br>
          <input
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          By Specific Artist:
        </label>
          <select name="artist" id="artist" onChange={this.handleChange}>
            <option value="any">Any</option>
            {
            this.props.artists ? 
            this.props.artists.map(artist => {
              return <option value={artist.id}>{artist.name}</option>
            })
            :
            null
            }
          </select>
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
        <input type="submit" value="Submit" />

      </form>
    );
  }
}
