import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BillContext } from "./BillProvider";
import { BillTag } from "../tag/BillTag";
import "./Bills.css"

export const BillList = () => {
  const history = useHistory();
  const { bills, getBills, deleteBillById } = useContext(BillContext);



  useEffect(() => {
    getBills();
  }, [])



  return (
    <>
    <article className="allBills">
      <h1 className="bill_title">Owe-Go Bills</h1>
      <button className="create-bill-button" onClick={() => history.push("/bills/create")}>Create Bill</button>


      <div className="allCards">
        {bills && bills?.map(bill => {
           return (
              <section className="card" key={`bill--${bill?.id}`}>
                
              <div className="container">
                <BillTag bill_tag={bill?.bill_tag}/>
                <p className ="card-list-title">{bill?.title}</p>
                <p className ="card-list">{bill?.category?.label}</p>
                <p className ="card-list">Due on:  {bill?.due_date}</p>
                <p className ="card-list">Amount due:  {bill?.amount_due}</p>
                <p className ="card-list-paid">{bill?.paid === true ? 'Paid' : 'Not Paid'}</p>


              <div className="createBillButton">
                <button className="View-Bill-Button" onClick={() => history.push(`/bills/view/${bill?.id}`)}>View Bill</button>
                <button className="Delete-Bill-Button" onClick={() => deleteBillById(bill.id)}>Delete Bill</button>
                <button className="Edit-Bill-Button" onClick={() => {
                  history.push(`/bills/edit/${bill.id}`)
                }}>Edit Bill</button>
              </div>
              </div>
            </section>
        )})
        
        }
        </div>
      </article>
      
  
       </>
  )}
      