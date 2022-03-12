import React from "react"
import { useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { BillContext } from "./BillProvider"



export const PostDetail = () => {

    const { bill, geBillById } = useContext(BillContext);
    const {billId} = useParams()
    const history = useHistory()

    useEffect(() => {
        getBillById(billId)
    }, [])


    return (
        <div className='bill_detail'>
            <h3 className='bill_detail_title'>{bill.title}</h3>
            <p className='bill_detail_due_date'>Due on: {bill.due_date}</p>
            <p className='post_detail_amount_due'>Amount Due: {bill.amount_due}</p>
            <p className='post_detail_paid'>Paid: {bill.paid}</p>
            <button onClick={() => {
                history.push(`/bills/edit/${bill.id}`)}}>Edit</button>
        </div>
    )
}