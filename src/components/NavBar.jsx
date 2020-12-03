import React from 'react'
import {NavLink} from 'react-router-dom'

export default class NavBar extends React.Component {

  render() {
    return (
      <ul className="nav">
        <li>
          <NavLink key = "home" exact to="/">Search </NavLink>
        </li>
        <li>
          <NavLink key = "about" to="/about">About</NavLink>
        </li>
        {localStorage.token ? 
          [
          <li>
            <NavLink key = "playlists" to="/playlists">Playlists</NavLink>
          </li>,
          <li>
            <NavLink key = "logout" to="/logout">Logout</NavLink>
          </li>
          ]
          :
          [
          <li>
            <NavLink key = "register" to="/register">Register</NavLink>
          </li>,
          <li>
            <NavLink key = "login" to="/login">Login</NavLink>
          </li>
          ]
        }
      </ul>
    );
  }
}