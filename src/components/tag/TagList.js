import React, { useState, useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { TagContext } from "./TagProvider"


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
                <button onClick={() => history.push("/tags/create")}>
                    Create Tag
                </button>
                <ul className='tags_list' >
                    {
                        tags.map(tag => {
                            return (
                    <ul>
                        <li>
                          {tag.label}
                        </li>
                        <button onClick={() => {
                                    history.push(`/tags/edit/${tag.id}`)
                                }}>Edit</button><button onClick={() => deleteTagById(tag.id)}>Delete</button>
               
                </ul>
                )
                })
                }
            </ul>
        </div>
    </>
    )
}