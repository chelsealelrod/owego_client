import React from "react"
import { useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { BillContext } from "./BillProvider"
import { NoteList } from "../note/NoteList"
import { NoteForm } from "../note/NoteForm"
import "./Bills.css"
import "../note/Notes.css"




export const BillDetail = () => {

    const { bill, getBillById } = useContext(BillContext);
    const {billId} = useParams()
    const history = useHistory()

    useEffect(() => {
        getBillById(billId)
    }, [])


    return (
        <div className='bill_detail'>
            
            <h3 className='bill_detail_title'>{bill.title}</h3>
            <p className='bill_detail_list'>{bill.category?.label}</p>
            <p className='bill_detail_list'>Due on: {bill.due_date}</p>
            <p className='bill_detail_list'>Amount Due: {bill.amount_due}</p>
            <p className='bill_detail_paid'>{bill?.paid === true?'Paid':'Not Paid'}</p>
            <div className='bill_detail_notes'>
                <NoteForm billId={billId}/>
                <NoteList billNotes={bill.notes}/>
            </div>
           
            <br></br>
            <button className="edit_detail-bill-btn" onClick={() => {
                history.push(`/bills/edit/${bill.id}`)}}>Edit Bill</button>
        </div>
    )
}