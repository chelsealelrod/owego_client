import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router"
import { NoteContext } from "./NoteProvider"

export const NoteForm = () => {
    const history = useHistory()
    const { getNotes, editNotes } = useContext(NoteContext)
    const [ notes ] = useState([])
    const [theNote, setTheNote] = useState({label: ''})
    const [newNote, setNewNote] = useState({})

    const { noteId } = useParams()

    useEffect(() => {
        getNotes()
        // .then((data) => setNotes(data))
    }, [])

    useEffect(() => {
        const theNote = notes.find(note => note.id === parseInt(noteId)) || {label: ''}
        setTheNote(theNote)
    }, [notes, noteId])


    const handleControlledInputChange = (event) => {
        newNote[event.target.name] = event.target.value
        setNewNote(newNote)
    }

    const handleSaveEdit = (e) => {
        e.preventDefault()

        editNotes({
            id: theNote.id,
            label: newNote.label
        }).then(() =>{
           history.push('/notes/create')
        })
    }

    return (
        <div className='note_edit'>
            <form className='note_edit_form'>
                <fieldset>
                    <div className="note_edit_form_group">
                            <label htmlFor="name">Note: </label>
                            <input type="text" name="label" required autoFocus className="form-control"
                                placeholder="note"
                                defaultValue={note.text}
                                onChange={handleControlledInputChange}/>
                    </div>
                </fieldset>
            </form>
            <button className='note_edit--save' onClick={handleSaveEdit}>Save</button>
            <button className='note_edit--cancel' onClick={() => {history.push('/notes')}}>Cancel</button>
        </div>
    )
}