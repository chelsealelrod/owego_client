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
            <ul>
            <h3 className='bill_detail_title'>{bill.title}</h3>
            <li className='bill_detail_category'>{bill.category?.label}</li>
            <li className='bill_detail_due_date'>Due on: {bill.due_date}</li>
            <li className='bill_detail_amount_due'>Amount Due: {bill.amount_due}</li>
            <li className='bill_detail_paid'>Paid: {bill?.paid === true?'Paid':'Not Paid'}</li>
            <div className='bill_detail_notes'>
                <NoteForm billId={billId}/>
                <NoteList billNotes={bill.notes}/>
            </div>
           </ul>
            
            <button onClick={() => {
                history.push(`/bills/edit/${bill.id}`)}}>Edit Bill</button>
        </div>
    )
}