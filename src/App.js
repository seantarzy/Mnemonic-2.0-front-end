import React from 'react';
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import Playlists from './components/PlaylistsContainer'
import PlaylistCard from './components/PlaylistCard'
import NavBar from './components/NavBar'
import About from './components/About'
import './App.css';
import Search from './components/Search'
import {Switch, Route, withRouter} from 'react-router-dom'
import {getAllArtists, stayLoggedIn} from './services/utils'
import {connect} from 'react-redux'

class App extends React.Component {

  state = {
    artists: null, 
    artistOptions: null
  }
  componentDidMount = () => {
    if(localStorage.token){
      stayLoggedIn()
      .then(r => {
        // localStorage.token = r.token
        console.log('this', r)
        this.props.mountUser(r)
      })
    }
    getAllArtists()
    .then(r => 
      this.setState({artistOptions: r.map((artist)=>{
     return { label: artist.name, value: artist.id}})
    })
      // this.setState({artists: r})
    )
    .then(()=>{
      this.setState({
        artistOptions: [
          { label: "ANY", value: "any" },
          ...this.state.artistOptions],
      });
    })
  }

  renderLogin = () => {
    return <Login handleLogin={ (r) => this.props.mountUser(r) } redirect={ () => this.props.history.push("/") }/>
  }

  renderLogout = () => {
    return <Logout handleLogout={ this.props.unmountUser } redirect={ () => this.props.history.push("/logout") }/>
  }

  renderSearch = () => {
    return <Search artistOptions={this.state.artistOptions} handleSearch={(r) => this.props.mountSearch(r)} globalState={this.props.globalState} mountUser = {this.props.mountUser}/>
  }

  renderRegister = () => {
    return <Register redirect={ () => this.props.history.push("/") }/>
  }

  renderPlaylists = () => {
    return <Playlists globalState={this.props.globalState} stayLoggedIn = {stayLoggedIn} mountUser = {this.props.mountUser}/>
  }

  renderPlaylist = (id) => {
    return <PlaylistCard id={id} redirect={ () => this.props.history.push("/playlists") }/>
  }

  render(){
    return (
      <div className="App">
        <NavBar key="nav-bar" />
        <Switch>
          {localStorage.token
            ? [
                <Route
                  path="/playlists"
                  render={this.renderPlaylists}
                  key={"playlists"}
                />,
              ]
            : [
                <Route path="/login" render={this.renderLogin} key={"login"} />,
                <Route
                  path="/register"
                  render={this.renderRegister}
                  key={"register"}
                />,
              ]}
          <Route path="/logout" render={this.renderLogout} key={"logout"} />,
          <Route path="/about" component={About} key={"about"} />
          <Route path="/" exact render={this.renderSearch} key={"home"} />
          <Route render={() => <p>Page not found</p>} key={"not-found"} />
        </Switch>
      </div>
    );
  }
}


let componentWithRouterProps = withRouter(App)

// actionCreators are functions that return an action
let mountUser = (r) => {
  return {
    type: "MOUNT_USER",
    payload: r
  }
}

let unmountUser = () => {
  return {
    type: "UNMOUNT_USER"
  }
}

let mountSearch = (search) => {
  return {
    type: "MOUNT_SEARCH",
    payload: search
  }
}


// mapDispatchToProps
let mapDispatchToProps = {
  mountUser: mountUser,
  unmountUser: unmountUser,
  mountSearch: mountSearch,
}

let mapStateToProps = (globalState) => {
  return {
    globalState: globalState
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(componentWithRouterProps)