import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md"
import {convertToTurkishDate} from "../../utils/helper"

const NoteCard = ({ title, date, content, tags = [], onEdit, onDelete }) => {


    return (
        <div className='border border-slate-300 rounded p-4  bg-gradient-to-r from-purple-700 to-indigo-900 hover:shadow-xl transition-all'>

            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-xl mb-1 ml-2 text-white font-semibold'>{title}</h6>
                    <span className='text-xs font-semibold text-slate-300'>{convertToTurkishDate(date)}</span>
                </div>

            </div>

            <p className='text-sm text-slate-200 mt-2'>{content?.slice(0, 60)}</p>

            <div className='flex items-center justify-between mt-4'>

                <div className='flex gap-1 flex-wrap'>
                    {
                        tags.map((tag, index) => (
                            <span key={index} className='text-xs text-slate-700 font-semibold bg-indigo-300 p-1 rounded'>#{tag}</span>
                        ))
                    }
                </div>

                <div className='flex items-center gap-2'>
                    <MdCreate
                        className='text-white w-7 h-7 rounded-full p-1 cursor-pointer text-xl bg-green-600 md:hover:text-green-600 md:hover:bg-white transition-all'
                        onClick={onEdit} />
                    <MdDelete
                        className='text-white w-7 h-7 rounded-full p-1 cursor-pointer text-xl bg-red-600 md:hover:bg-white md:hover:text-red-600 transition-all'
                        onClick={onDelete} />
                </div>
            </div>

        </div>
    )
}

export default NoteCard