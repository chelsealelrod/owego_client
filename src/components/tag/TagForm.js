import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { TagContext } from "./TagProvider"

export const TagForm = () => {
    
    const { getTags, tags, editTagById, addtag } = useContext(TagContext)
    const history = useHistory()
    const [tag, setTag] = useState({label: ''})
    const [newTag, setNewTag] = useState({})

    const { tagId } = useParams()

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        const tag = tags.find(tag => tag.id === parseInt(tagId)) || {label: ''}
        setTag(tag)
    }, [tags, tagId])


    const handleControlledInputChange = (event) => {
        newTag[event.target.name] = event.target.value
        setNewTag(newTag)
    }

    const handleSaveEdit = (e) => {
        e.preventDefault()

        editTagById({
            id: tag.id,
            label: newTag.label
        }).then(() =>{
           history.push('/tags')
        })
    }


    return (
        <div className='tag_edit'>
            <form className='tag_edit_form'>
                <fieldset>
                    <div className="tag_edit_form_group">
                            <label htmlFor="name">Tag Name: </label>
                            <input type="text" name="label" required autoFocus className="form-control"
                                placeholder="Tag label"
                                defaultValue={tag.label}
                                onChange={handleControlledInputChange}/>
                    </div>
                </fieldset>
            </form>
            <button className='tag_edit--save' onClick={handleSaveEdit}>Save</button>
            <button className='tag_edit--cancel' onClick={() => {history.push('/tags')}}>Cancel</button>
        </div>
    )
}