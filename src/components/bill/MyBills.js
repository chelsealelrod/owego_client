import React, { useState, useEffect, useContext } from "react";
import { BillContext } from "./BillProvider";


export const MyBills = () => {
    const { getBills } = useContext(BillContext)
    const [bills, setBills] = useState([])
    const [myBills, setMyBills] = useState([])

    const userId = localStorage.getItem('owegouser_id')

    useEffect(() => {
        getBills()
    }, [])

    useEffect(() => {
        const myBills = bills.filter(bill => bill.user_id === parseInt(userId))
        setMyPosts(myBills)
    }, [bills, userId])

    return (
        <div className='myBills'>
            {
            myBills.map(bill => {
                return (
                    <div className='myBills_post'>
                        <h3>{bill.title}</h3>
                        <p>{bill.amount_due}</p>
                    </div>
                )
            })
            }
        </div>
    )
}