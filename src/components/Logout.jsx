import React from 'react'
import Beatles from '../assets/beatles.jpg'
import '../App.css'
export default class Logout extends React.Component{

    componentDidMount = ()=>{
        localStorage.clear()
        this.props.handleLogout()
    }
    
    render(){
        return(
            <div>
                <p className = "white-text">You have successfully logged out</p>
                <img src = {Beatles} id = "beatles-logout"/>
            </div>
        )
    }

}