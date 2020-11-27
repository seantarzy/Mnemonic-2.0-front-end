import React, {button} from 'react';
import Card from 'react-bootstrap/Card'

import Modal from 'react-modal';

import {getSong, deleteBookmark, getBookmark} from '../services/utils'
import EditNotes from './EditNotes';

export default class BookmarkCard extends React.Component {

    state = {
        showInputPhrase: false,
        showNotes: false, 
        editNotes: false,
        currentNote: this.props.bookmark.note
    }


    styles = {
        whole_card: {
            justifyContent: 'flex-start',
            backgroundColor: '#37C1A8'
        },
        card_image: {
        height: 40,
        width: 40,
        display: 'inline-block',
        },
        card_body: {
            justifyContents: 'left',
            display: 'inline-block',

        }
    }

       refreshPage=()=>{
    window.location.reload(false);
  }

    handleDelete = (id)=>{
        deleteBookmark(id)
        .then(()=>{
            this.props.handleBookmarkDelete(id)
        })
    }

    showNotes = (e)=>{
        e.preventDefault()
        this.setState({showNotes: true})
    }

    hideNotes = ()=>{
        // e.preventDefault()
        this.setState({showNotes: false})

    }

    setNewNote = (newNote)=>{
        this.setState({currentNote: newNote});
    }

    // getBookmark = ()=>{
    //     getBookmark(this.props.bookmark.id)
    //     .then((bookmark)=>{
    //         document.getElementById(this.props.bookmark.id).innerText = bookmark.note
    //     })
    // }

    toggleEditNotes=()=>{
        console.log("hit")
        this.setState({editNotes: !this.state.editNotes})
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
        return(
            <div id="bookmark" style = {this.styles.whole_card}>
              
                <Card >
                    {!this.state.showNotes  ?
                    <div>
            <iframe
            title="youtube-vid"
            width="200"
            className="youtube-frame"
            src={`https://www.youtube.com/embed/${this.props.bookmark.youtube_id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>                 
            <Card.Body style = {this.styles.card_body}>
                <Card.Text>{this.props.bookmark.full_title}</Card.Text>
                <Card.Text>matching phrase: {this.props.bookmark.matching_phrase}</Card.Text>
        <button onClick = {()=>this.setState({showInputPhrase: !this.state.showInputPhrase})}>{this.state.showInputPhrase ? <text>hide my phrase</text>: <text>show my phrase</text>}</button>
                {this.state.showInputPhrase ?
                <Card.Text>input phrase: {this.props.bookmark.input_phrase}</Card.Text>
                :
                null}
                </Card.Body>
                <button onClick = {(e)=>this.showNotes(e)}>
                    {this.props.bookmark.note ? <text> notes</text> : <text> notes</text>}
                </button>
                <button onClick = {()=> this.handleDelete(this.props.bookmark.id)}>
                    🗑
                </button>
                </div>
                :
                <div height = "200" width = "200">
                        <Card.Body style = {this.styles.card_body}>
                            <Card.Text>Notes: </Card.Text>
                            <div > 

                            </div>
                        <Card.Text id = {this.props.bookmark.id}>{this.props.bookmark.note ? <text>{this.props.bookmark.note}</text> : "Add Notes!"} </Card.Text>
                            <br>
                            </br>
                            <Card.Text></Card.Text>
                            <button onClick = {this.toggleEditNotes}>
                                edit notes
                            </button>
                            <button onClick = {this.hideNotes}>
                                ↩ mnemonic info
                            </button>
                        </Card.Body>
                </div>
                }
                    <Modal 
                     isOpen={this.state.editNotes}
                    style = {customStyles}
                    onRequestClose={this.toggleEditNotes}
                    >
                        <EditNotes 
                            note = {this.props.bookmark.note}
                            getBookmark = {this.getBookmark}
                            bookmark_id = {this.props.bookmark.id} 
                            mountUser = {this.props.mountUser} 
                            toggleEditNotes = {this.toggleEditNotes} 
                            setFeatured = {this.props.setFeatured}
                            playlist = {this.props.playlist}
                            refreshPage = {this.refreshPage}
                            hideNotes = {this.hideNotes}
                            setNewNote = {this.setNewNote}
                            />
                    </Modal>
                </Card>
    
            </div>
    
        )
    }
}