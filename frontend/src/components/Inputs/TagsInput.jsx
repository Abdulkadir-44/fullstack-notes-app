import React, { useState } from 'react'
import { MdAdd, MdClose } from "react-icons/md"

const TagsInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue('')
        }
    }

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            addNewTag()
            setInputValue('')
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    return (
        <div>
            {
                tags?.length > 0 && (
                    <div className='flex rounded items-center gap-2 text-xs flex-wrap mt-2 h-20 overflow-y-auto'>
                        {
                            tags.map((tag, index) => (
                                <span key={index} className='flex items-center p-1 rounded bg-slate-300'>
                                    # {tag}
                                    <button
                                        className='text-white text-xl ml-2 bg-red-600 rounded'
                                        onClick={() => handleRemoveTag(tag)}>
                                        <MdClose />
                                    </button>
                                </span>
                            ))
                        }
                    </div>
                )
            }


            <div className='flex items-center gap-4 mt-3'>
                <input
                    value={inputValue}
                    onChange={handleInputChange}
                    type="text"
                    className='text-sm text-white md:w-[60%] bg-transparent border-b px-3 py-2 rounded outline-none'
                    placeholder='Etiket ekle'
                    onKeyDown={handleKeyDown} />

                <button
                    onClick={() => addNewTag()}
                    className='w-9 h-9 flex justify-center items-center rounded bg-gray-300 hover:bg-gray-100 transition-all'>
                    <MdAdd className='text-2xl text-blue-700 ' />
                </button>
            </div>
        </div>
    )
}

export default TagsInput