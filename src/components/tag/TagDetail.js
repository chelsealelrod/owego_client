import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TagContext } from "./TagProvider";
import "./Tags.css"


export const TagDetail = () => {
    const label = useRef()

    const { addTag, getTags } = useContext(TagContext);
    const history = useHistory()
    const {tag_id} = useParams()
    const [tag, setTag] = useState([]);

    useEffect(() => {
        getTags()
    }, [])

    const handleControlledInputChange = (event) => {
        const newTag = { ...tag }
        newTag[event.target.id] = event.target.value
        setTag(newTag)
    }

    const handleSaveTag= () => {

        if (tag_id === 0) {
            window.alert("Please enter tag")
        } else {
            addTag({
                label: tag.label
            })
            .then(() => history.push("/tags"))
        }
    }

    return(
        <form className="tagForm">
            <h2 className="tagForm_title">New Tag</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Tag: </label>
                    <input type="text" id="label" ref={label} 
                     required autoFocus className="form-control" placeholder="Tag"
                     onChange={handleControlledInputChange} defaultValue={tag.label} />
             
                </div>
            </fieldset>
            <button type="submit"
                onClick={event => {
                    event.preventDefault()
                    handleSaveTag()
                }}
                className="save-tag-btn">
                    Save Tag
                </button>
        </form>
    )
}