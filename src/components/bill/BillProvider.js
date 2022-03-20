import React, { useState } from "react";

export const BillContext = React.createContext();

export const BillProvider = (props) => {
  const [bills, setBills] = useState([])
  const [bill, setBill] = useState({})
  const [categories, setCategories] = useState([])


  const getBills = () => {
    return fetch("http://localhost:8000/bills", {
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setBills);
  };

 const createBill = bill => {
    return fetch("http://localhost:8000/bills", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify(bill)
    })

      .then((response) => response.json()).then(getBills);
  };

  const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setCategories);
  };


  const getBillById = (id) => {
    return fetch(`http://localhost:8000/bills/${id}`,{

      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("owegouser_id")}`
      }
    
    }).then((response) => response.json())
    .then(setBill);
  };

  const deleteBillById = (id) => {
    return fetch(`http://localhost:8000/bills/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("owegouser_id")}`
      }
    })
      .then(getBills)
  }

  const editBillById = bill => {
    return fetch(`http://localhost:8000/bills/${bill.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("owegouser_id")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bill)
    })
        .then(getBills)
  };


  return (
    <BillContext.Provider value={{bill, bills, getBills,deleteBillById, 
    createBill, editBillById, getCategories,getBillById, categories }}>
      {props.children}
    </BillContext.Provider>
  );
}
