import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"
import classNames from 'classnames'
import { useDispatch, useSelector } from "react-redux"
import { setSearchTerm } from "../../redux/searchSlice"

export default function SearchBar({isNotes}) {

  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.search.searchTerm)
  return (
    <div className={classNames('w-80 flex flex-1 items-center px-4 bg-white my-2 rounded-md',{
      "opacity-50 cursor-not-allowed" : !isNotes
    })}>
      <input
        disabled={!isNotes}
        type="text"
        placeholder='Not ara...'
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={searchTerm}
        onChange={e => dispatch(setSearchTerm(e.target.value))}
      />

      {searchTerm ? (
        <IoMdClose
          className={classNames('text-slate-500 text-xl',{
            "cursor-not-allowed" : !isNotes,
            "cursor-pointer hover:text-indigo-900 " : isNotes
          })}
          onClick={isNotes && (() => dispatch(setSearchTerm("")))}
        />
      ) : (
        <FaMagnifyingGlass
          className={classNames('text-slate-400',{
            "cursor-not-allowed":!isNotes,
            "cursor-pointer hover:text-indigo-900" : isNotes
          })}
        />
      )}
    </div>
  )
}
