
import React from 'react'
import { editBookmark, stayLoggedIn, getBookmark} from '../services/utils'
export default class EditNodes extends React.Component {


    state = {
        currentNote: this.props.note
    }

    componentDidMount =()=>{
        console.log(this.props)
        console.log("mountin like a lion")
    }

    handleSubmit = (e)=>{
        // e.preventDefault()
        // console.log("submitted")
        editBookmark(this.state.currentNote, this.props.bookmark_id)
        .then(()=>{
            this.props.toggleEditNotes()
            window.location.reload(false);
            window.location.replace("https://mnemonicmaker.netlify.app/playlists");
        // this.props.setNewNote(this.state.currentNote)
        })
        .then(()=>{           
        });
        
    }

    handleChange = (e)=>{
        this.setState({currentNote: e.target.value})
    }



    render(){

        


        return (
        
        <div>
            <label>
                Edit Notes:
            </label>
            <input type= "textarea" name="notes" value = {this.state.currentNote} onChange = {(e)=>this.handleChange(e)}></input>
            <button onClick = {(e)=>this.handleSubmit(e)}>
                save notes
            </button>
        </div>
        )
    }
}

