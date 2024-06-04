import React, { useState } from 'react'
import TagsInput from '../Inputs/TagsInput'
import { MdClose } from 'react-icons/md'

export default function AddEditNotes({ onClose, noteData, type }) {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)


    const editNote = async () => { }
    const addNewNote = async () => { }

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

        if (type === "edit")
            editNote()
        else    
            addNewNote()

    }

    return (
        <div className='relative'>
            <button
                onClick={onClose}
                className='absolute right-0 -top-1 flex justify-center items-center rounded p-1 bg-red-500 hover:bg-red-600 transition-all'>
                <MdClose className='text-white text-xl' />
            </button>

            <div className='flex flex-col gap-2 pt-10'>
                <input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    type="text"
                    className='text-base p-2 rounded bg-transparent text-white  border-b outline-none placeholder:italic placeholder:text-slate-300'
                    placeholder='Başlık' />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <textarea
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                    typeof='text'
                    placeholder='Content'
                    rows={10}
                    className='text-sm resize-none overflow-y-auto text-slate-950 outline-none bg-slate-200 p-2 rounded placeholder:italic placeholder:text-base' ></textarea>
            </div>

            <div className='mt-3'>
                <TagsInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className='text-xs text-red-600 pt-4'>{error}</p>}

            <button
                onClick={handleAddNote}
                className='button font-medium mt-5 p-3'>
                Not ekle
            </button>
        </div>
    )
}