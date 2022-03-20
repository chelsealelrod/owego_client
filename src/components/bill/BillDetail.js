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
            {/* <h3 className="bill_tags">Tags: {bill.tags.map((tag)=>
            tag?.user.username)}</h3> */}
            <h3 className='bill_detail_title'>{bill.title}</h3>
            <p className='bill_detail_category'>{bill.category?.label}</p>
            <p className='bill_detail_due_date'>Due on: {bill.due_date}</p>
            <p className='bill_detail_amount_due'>Amount Due: {bill.amount_due}</p>
            <p className='bill_detail_paid'>Paid: {bill?.paid === true?'Paid':'Not Paid'}</p>
            <div className='bill_detail_notes'>
                <NoteForm billId={billId}/>
                <NoteList billId={parseInt(billId)}/>
            </div>
            
            <button onClick={() => {
                history.push(`/bills/edit/${bill.id}`)}}>Edit Bill</button>
        </div>
    )
}