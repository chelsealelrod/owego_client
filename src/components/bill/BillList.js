import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { BillContext } from "./BillProvider";
import "./Bills.css"

export const BillList = () => {
  const history = useHistory()
  const {bills, getBills, deleteBillById} = useContext(BillContext);


  useEffect(() => {
    getBills();
  }, [])

  // if (bill?.paid = False) {
  //   paid = "Not Paid";
  // } else {
  //   paid = "Paid";
  // }

  
  return(
    <div>
      <h2 className="bill_title">Bills</h2>
      <article>
        {
          bills?.map(bill => {
            return <section key={bill?.id}>
              <ul className="bill_list">
                <Link to={`/bills/${bill?.id}`}>{bill?.title}</Link><br/>
                <li>{bill?.category?.label}</li>
                <li>Due on:  {bill?.due_date}</li>
                <li>Amount due:  {bill?.amount_due}</li>
                <li>{bill?.paid === true?'Paid':'Not Paid'}</li>
                <button onClick={() => history.push(`/bills/view/${bill?.id}`)}>View Bill</button>
                <button onClick={() => deleteBillById(bill.id)}>Delete Bill</button>
                <button onClick={() => {
                                    history.push(`/bills/edit/${bill.id}`)
                                }}>Edit Bill</button>
              </ul>
            </section>
          })
        }
      </article>
      <button onClick={() => history.push("/bills/create")}>Create Bill</button>
    </div>
  )
}