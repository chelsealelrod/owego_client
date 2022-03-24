import React, { useState, useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { TagContext } from "./TagProvider"
import "./Tags.css"


//This is the code for listing all Tags

export const TagList = ({bill_tag}) => {
    const history = useHistory()
    const { getTags, tags, tag, deleteTagById } = useContext(TagContext)


    // const handleDelete = (id) => {
    //     deleteTag(id)
    //     .then(() => {
    //         const remainingTags = tags.filter( tag => tag.id !== id )
    //         setTags(remainingTags)
    //     })
    // }

    useEffect(() => {
        getTags()
    }, [])



    return (
        <>
            <div className='tags' key={tag.id}>
                <h1 className='tags_title'>Tags</h1>
                <button className="create-tag" onClick={() => history.push("/tags/create")}>
                    Create Tag
                </button>
                <div className='tags_list' key={`tag--${tag?.id}`}>
                    {
                        tags.map(tag => {
                            return (
                    <div className="tags_container">
                        
                          <p className="tag_label">{tag.label}</p>
                        
                        <button className="tag-btn" onClick={() => {
                                    history.push(`/tags/edit/${tag.id}`)
                                }}>Edit</button>

                        <button className="tag-btn" 
                                 onClick={() => deleteTagById(tag.id)}>Delete</button>
               
                </div>
                )
                })
                }
            </div>
        </div>
    </>
    )
}