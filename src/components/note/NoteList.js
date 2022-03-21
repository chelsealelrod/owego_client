import React, { useEffect, useContext, useState } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { NoteContext  } from "./NoteProvider"
// import "./Notes.css"


export const NoteList = ({billNotes=[]}) => { 
    const history = useHistory()
    const {getNotes, deleteNote, note, notes,
         setNotes, getNoteByBillId, editNotes} = useContext(NoteContext)
    const { billId } = useParams()
    const parsedBillId = parseInt(billId)
    
    useEffect(() => {
    }, [billNotes])
 
    

    return(
        <>
        <div className='notes'>
            <h2 className='notes_title'>Notes</h2>
            { 
                billNotes.map(note => {
                return (
                <section key={`note--${note?.id}`}>
                <li>
                <p>{note.text}</p>
                <p>{note.date}</p>
                </li>
                
                 <button className='notes_edit' 
                 onClick={() => {editNotes(note.id)}}>Edit</button>
                 <button onClick={() => {deleteNote(note.id)}}>Delete</button>
                 </section>

                )})
        }
        </div>
    </>
    )
    }
