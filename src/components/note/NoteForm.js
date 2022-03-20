import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { NoteContext } from "./NoteProvider"

export const NoteForm = ({ billId }) => {
    const history = useHistory()
    const { editNotes, getNoteByBillId, addNote } = useContext(NoteContext)
    const [note, setNote] = useState({})
    const [theNote, setTheNote] = useState({ label: '' })
    const [newNote, setNewNote] = useState({})

    const { noteId } = useParams()



    const handleControlledInputChange = (event) => {
        newNote[event.target.name] = event.target.value
        setNewNote(newNote)
    }


    const handleSaveEdit = (e) => {
        e.preventDefault()

    const current = new Date();
        addNote({
            billId: billId,
            text: newNote.text,
            date: current.toLocaleDateString()
        }).then(() => {
            getNoteByBillId(billId)
        })
    }

    return (
        <div className='note_edit'>
            <form className='note_edit_form'>
                <fieldset>
                    <div className="note_edit_form_group">
                        <label htmlFor="name">Note: </label>
                        <input type="text" name="text" required autoFocus className="form-control"
                            placeholder="note"
                            defaultValue={note.text}
                            onChange={handleControlledInputChange} />
                        
                    </div>
                </fieldset>
            </form>

            <button className='category_edit--save' onClick={handleSaveEdit}>Save</button>
            <button className='category_edit--cancel' onClick={() => {history.push('/notes')}}>Cancel</button>
            {/* <button
                type="submit"
                onClick={(evt) => {
                    // Prevent form from being submitted
                    evt.preventDefault();

                    const note = {
                        id: parseInt(noteId),
                        text: newNote.text,
                        date: newNote.date
                        
                    };
                    // Send POST request to your API
                    {
                        noteId ? handleSaveEdit(note).then(() => history.push("/bills")) :
                            addNote(note).then(() => history.push("/bills"))
                    }
                }}
                className="create-note-button"
            >
                Create
            </button> */}

        </div >
    )
}