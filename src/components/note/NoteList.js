import React, { useEffect, useContext, useState } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { NoteContext  } from "./NoteProvider"
import { BillContext } from "../bill/BillProvider"
import "./Notes.css"


export const NoteList = ({billNotes=[]}) => { 
    const history = useHistory()
    const {getNotes, deleteNote, note, notes,
         setNotes, getNoteByBillId, editNotes} = useContext(NoteContext)
    const { getBillById } = useContext(BillContext)
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
                <div>
                <p className="note_list">{note.text}</p>
                <p className="note_list">{note.date}</p>
                </div>
                
                 <button className="notes_edit" 
                 onClick={() => {editNotes(note.id)}}>Edit</button>
                 <button  className="notes_delete" onClick={() => {deleteNote(note.id)
                .then(() => getBillById(billId))}}>Delete</button>
                 </section>

                )})
        }
        </div>
    </>
    )
    }
