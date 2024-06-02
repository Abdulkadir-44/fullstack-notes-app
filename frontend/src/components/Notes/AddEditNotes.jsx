import React, { useState } from 'react'

import { MdClose } from 'react-icons/md'

export default function AddEditNotes({ onClose, noteData, type }) {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)


    const editNote = async ()=>{}
    const addNewNote = async ()=>{}

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title")
            return;
        }
        if (!content) {
            setError("Please enter the content")
            return;
        }
        setError("")

        if(type === "edit")
            editNote()
        else
            addNewNote()

        //api çağrısı olcak
    }

    return (
        <div className='relative'>
            <button
                onClick={onClose}
                className='absolute right-2 flex justify-center items-center rounded p-1 bg-red-500 hover:bg-red-600 transition-all'>
                <MdClose className='text-white text-xl' />
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label' >TITLE</label>
                <input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    type="text"
                    className='text-2xl text-slate-950 border-b outline-none'
                    placeholder='Deneme baba deneeme' />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                    typeof='text'
                    placeholder='Content'
                    rows={10}
                    className='text-sm resize-none overflow-y-scroll text-slate-950 outline-none bg-slate-100 p-2 rounded' ></textarea>
            </div>

            {/* <div className='mt-3'>
                <label className='input-label' >TAGS</label>
                <TagsInput tags={tags} setTags={setTags} />
            </div> */}

            {error && <p className='text-xs text-red-600 pt-4'>{error}</p>}

            <button
                onClick={handleAddNote}
                className='btn-primary font-medium mt-5 p-3'>
                ADD
            </button>
        </div>
    )
}
