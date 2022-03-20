import React, { useEffect, useContext, useState } from "react"
import { useHistory } from 'react-router-dom'
import { NoteContext  } from "./NoteProvider"
// import "./Notes.css"


export const NoteList = ({billId}) => { 
    const history = useHistory()
    const {getNotes, deleteNote, note, notes,
         setNotes, getNoteByBillId, editNotes, billNotes} = useContext(NoteContext)
    const [theNotes, setTheNotes] = useState([])


    const handleDelete = (id) => {
        deleteNote(id)
        .then(() => {
            const remainingNotes = notes.filter( note => note.id !== id )
            setNotes(remainingNotes)
        })
    }

    useEffect(() => {
        getNotes();
        getNoteByBillId(billId);
    }, [])

    useEffect(() => {
        const relatedNotes = notes.filter(note => note.bill_id === billId )
        setTheNotes(relatedNotes)
      },[notes, billId])

    

    return(
        <>
        <div className='notes'>
            <h2 className='notes_title'>Notes</h2>
            { 
                billNotes.map(note => {
                return <section key={note.id}>
                <li>
                <p>{note.text}</p>
                </li>
                </section>
          })
        }
               <button className='notes_edit' 
                          onClick={() => {history.push(`/notes/edit/${note.id}`)}}>Edit</button>
                          <button onClick={() => {handleDelete(note.id)}}>Delete</button>

                          <br></br>
                          <br></br>
                          <br></br>
            <ul className='notes_list'>
                
                {
                notes && notes.map(note => {
                    return (
                        <li>
                          <p>{note.text}</p>
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