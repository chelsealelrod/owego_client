import React, { useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { NoteContext  } from "./NoteProvider"
// import "./Notes.css"


export const NoteList = () => { 
    
    const {getNotes, deleteNote, notes, setNotes} = useContext(NoteContext)
    const handleDelete = (id) => {
        deleteNote(id)
        .then(() => {
            const remainingNotes = notes.filter( note => note.id !== id )
            setNotes(remainingNotes)
        })
    }

    useEffect(() => {
        getNotes()
    }, [])

    useEffect(() => {
        const relatedNotes = notes.filter(note => note.bill_id === billId )
        setTheNotes(relatedNotes)
      },[notes, billId])

    const history = useHistory()

    return(
        <>
        <div className='notes'>
            <h2 className='notes_title'>Notes</h2>
            { 
                theNotes.length > 0?
                theNotes.map(note => {
                return <section key={note.id}>
                <li>
                <p>{note.text}</p>
                </li>
                </section>
          }):""
        }
            <button onClick={() => history.push("/notes/create")}>
                Create Note
            </button>
            <ul className='notes_list'>
                
                {
                notes && notes.map(note => {
                    return (
                        <li>
                          {note.text}
                          <button className='notes_edit' 
                          onClick={() => {history.push(`/notes/edit/${note.id}`)}}>Edit</button>
                          <button onClick={() => {handleDelete(note.id)}}>Delete Note</button>
                        </li>
                    )
                   
                })
                }
            </ul>
        </div>
    </>
    )
}