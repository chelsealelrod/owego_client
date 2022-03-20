import React, { useState, useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { TagContext } from "./TagProvider"


//This is the code for listing all Tags

export const BillTag = ({ bill_tag }) => {
    const history = useHistory()
    const { getTags, tags } = useContext(TagContext)
    const [currentBillTag, setCurrentBillTag] = useState({
        bill_tagId: "",
      });


    useEffect(() => {
        getTags()
    }, [bill_tag])



    const changeBillTagState = (event) => {
        const newBillTagState = { ...currentBillTag };
        newBillTagState.billTagId = event.target.value;
        setCurrentBillTag(newBillTagState);
    };

    return (
        <>
            <div className='tags' key={bill_tag.id}>
            
                <ul className='tags_list' >
                    {

                                <>
                                <ul>
                                    <label htmlFor="tags">Tags: </label>
                                    <select
                                        name="tags"
                                        required
                                        autoFocus
                                        className="form-control"
                                        value={currentBillTag.bill_tagId}
                                        onChange={changeBillTagState}
                                    >
                                        <option className="select_tag" value="0">Select a tag...</option>
                                        {bill_tag.map((tag => (
                                            <option value={bill_tag.id}>{bill_tag.label}</option>
                                        )))}
                                    </select>


                                </ul>
                                </>
                            
                        
                    }
                </ul>
            </div>
        </>
    )
}