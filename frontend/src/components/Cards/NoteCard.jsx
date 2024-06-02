import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md"
import {convertToTurkishDate} from "../../utils/helper"

const NoteCard = ({ title, date, content, tags = [], onEdit, onDelete }) => {


    return (
        <div className='border rounded p-4 bg-white hover:shadow-xl transition-all'>

            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-lg font-medium'>{title}</h6>
                    <span className='text-xs font-semibold text-slate-600'>{convertToTurkishDate(date)}</span>
                </div>

            </div>

            <p className='text-sm text-slate-700 mt-2'>{content?.slice(0, 60)}</p>

            <div className='flex items-center justify-between mt-2'>

                <div className='flex gap-1'>
                    {
                        tags.map((tag, index) => (
                            <span key={index} className='text-xs text-slate-600 bg-slate-200 p-1 rounded'>#{tag}</span>
                        ))
                    }
                </div>

                <div className='flex items-center gap-2'>
                    <MdCreate
                        className='text-white w-7 h-7 rounded-full p-1 cursor-pointer text-xl bg-green-600'
                        onClick={onEdit} />
                    <MdDelete
                        className='text-white w-7 h-7 rounded-full p-1 cursor-pointer text-xl bg-red-600'
                        onClick={onDelete} />
                </div>
            </div>

        </div>
    )
}

export default NoteCard