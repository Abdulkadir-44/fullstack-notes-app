import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"

export default function SearchBar({ value, onChange, oncClearSearch }) {

    return (
        <div className='w-80 flex flex-1 items-center px-4 bg-white my-2 rounded-md'>
            <input
                type="text"
                placeholder='Not ara...'
                className='w-full text-xs bg-transparent py-[11px] outline-none'
                value={value}
                onChange={onChange} />

            {
                value ? (
                    <IoMdClose className='text-slate-500 hover:text-slate-900 text-xl cursor-pointer' onClick={oncClearSearch} />
                ) :
                    (
                        <FaMagnifyingGlass className='text-slate-400 hover:text-slate-900 cursor-pointer' />
                    )

            }



        </div>
    )
}
