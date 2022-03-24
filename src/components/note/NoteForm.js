import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { NoteContext } from "./NoteProvider"
import { BillContext } from "../bill/BillProvider"

export const NoteForm = ({ billId }) => {
    const history = useHistory()
    const {  getNoteByBillId, addNote } = useContext(NoteContext)
    const { getBillById } = useContext(BillContext)
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
        }).then(() => getBillById(billId)).then(() => history.push(`/bills/view/${billId}`))
        
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

            <button className='note_edit--save' onClick={handleSaveEdit}
                >Save</button>
            <button className='note_edit--cancel'
             onClick={() => {history.push('/notes')}}>Cancel</button>
            

        </div >
    )
}