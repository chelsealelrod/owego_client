import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";
import { BillContext } from "./BillProvider"
import "./Bills.css"

export const BillForm = () => {


  const { getCategories, categories, createBill,
    getBillById, editBillById, bill, bills } = useContext(BillContext);
  const history = useHistory()
  const { billId } = useParams()
  const [currentBill, setCurrentBill] = useState({
    categoryId: "",
    title: "",
    dueDate: new Date(),
    amountDue: "",
    paid: ""
  });

  useEffect(() => {
    if (billId) {
      getBillById(billId)
    }
    getCategories()
  }, [])


  useEffect(() => 
   [currentBill])


  useEffect(() => {
    if (bill.id) {
      const clearBill = { ...bill }
      clearBill.title = bill.title
      clearBill.categoryId = bill.category.id
      clearBill.dueDate = bill.due_date
      clearBill.amountDue = bill.amount_due
      clearBill.paid = bill.paid
      setCurrentBill(clearBill)
    }
  }, [bill])

//   const billPaidBoolean= () => {

//     if (paid === 0) {

//     } else {
//         addTag({
//             label: tag.label
//         })
//     }
// }


  const changeBillTitleState = (event) => {
    const newBillState = { ...currentBill };
    newBillState.title = event.target.value;
    setCurrentBill(newBillState);
  };

  const changeCategoryState = (event) => {
    const newBillState = { ...currentBill };
    newBillState.categoryId = event.target.value;
    setCurrentBill(newBillState);
  };

  const changeDueDateState = (event) => {
    const newBillState = { ...currentBill };
    newBillState.dueDate = event.target.value;
    setCurrentBill(newBillState);
  };

  const changeAmountDueState = (event) => {
    const newBillState = { ...currentBill };
    newBillState.amountDue = event.target.value;
    setCurrentBill(newBillState);
  };

  const changePaidState = (event) => {
    const newBillState = { ...currentBill };
    newBillState.paid = event.target.checked;
    setCurrentBill(newBillState);
  };


  return (
    <form className="billForm" key={bill.id}>
      <h2 className="billForm__title">Add a New Bill</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentBill.title}
            onChange={changeBillTitleState}
          />
          <label htmlFor="category">Category: </label>
          <select
            name="categories"
            required
            autoFocus
            className="form-control"
            value={currentBill.categoryId}
            onChange={changeCategoryState}
          >
            <option value="0">Select a category...</option>
            {categories.map((category) => (
              <option value={category.id}>{category.label}</option>
            ))}
          </select>
          <label htmlFor="date">Due Date:</label>
                        <input type="date" id="date" name="due_date" required autoFocus className="form-control"
                            placeholder="Choose Date" onChange={changeDueDateState}
                            default={currentBill.dueDate} />
          {/* <label htmlFor="due_date">Due Date: </label>
          <input
            type="text"
            name="due_date"
            required
            autoFocus
            className="form-control"
            value={currentBill.dueDate}
            onChange={changeDueDateState}
          /> */}
          <label htmlFor="amount_due">Amount Due: </label>
          <input
            type="text"
            name="content"
            required
            autoFocus
            className="form-control"
            value={currentBill.amountDue}
            onChange={changeAmountDueState}
          />
          <label htmlFor="paid">Paid: </label>
          <input
            type="checkbox"
            name="paid"
            checked={currentBill.is_paid}
            required
            autoFocus
            className="form-control"
            value={currentBill.paid}
            onChange={changePaidState}
          />

        </div>
      </fieldset>

      {/* You create the rest of the input fields for each game property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const bill = {
            id: parseInt(billId),
            categoryId: parseInt(currentBill.categoryId),
            title: currentBill.title,
            dueDate: currentBill.dueDate,
            amountDue: currentBill.amountDue,
            paid: currentBill.paid
          };
          // Send POST request to your API
          {
            billId ? editBillById(bill).then(() => history.push("/bills")) :
              createBill(bill).then(() => history.push("/bills"))
          }
        }}
        className="create-bill-button"
      >
        Create
      </button>
    </form>
  );
};