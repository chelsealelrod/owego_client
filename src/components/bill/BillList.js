import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { BillContext } from "./BillProvider";

export const BillList = () => {
  const history = useHistory()
  const {bills,bill, getBills, deleteBillById} = useContext(BillContext);


  useEffect(() => {
    getBills();
  }, [])

  
  return(
    <div>
      <h2>Bills</h2>
      <article>
        {
          bills?.map(post => {
            return <section key={bill?.id}>
              <ul>
                <Link to={`/bills/${bill?.id}`}>{bill?.title}</Link><br/>
                <p>{bill?.due_date}</p>
                <button onClick={() => history.push(`/bills/view/${bill?.id}`)}>View Bill</button>
                <button onClick={() => deleteBillById(post.id)}>Delete Bill</button>
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