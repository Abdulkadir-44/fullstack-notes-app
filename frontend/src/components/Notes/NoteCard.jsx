import React, { useState } from 'react'
import { MdCreate, MdDelete } from "react-icons/md"
import { convertToTurkishDate } from "../../utils/helper"
import { deleteNote } from "../../services/index"
import { toast } from 'sonner'
import EditNotes from "./EditNotes"
import Modal from "react-modal"
const NoteCard = ({ title, date, content, tags = [], note }) => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
    })
    const handleDelete = async (id) => {
        deleteNote(id)
            .then(res => {
                console.log(res.message);
                toast.success(res.message)
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            })
            .catch(err => {
                console.log(err.message);
                toast.error(err.message)
            })

    }
    return (
        <>
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
                            onClick={() => setOpenAddEditModal({ isShown: true })}
                            className='text-white w-7 h-7 rounded-full p-1 cursor-pointer text-xl bg-green-600 md:hover:text-green-600 md:hover:bg-white transition-all'
                        />
                        <MdDelete
                            className='text-white w-7 h-7 rounded-full p-1 cursor-pointer text-xl bg-red-600 md:hover:bg-white md:hover:text-red-600 transition-all'
                            onClick={() => handleDelete(note._id)} />
                    </div>
                </div>

            </div>
            <Modal
                appElement={document.getElementById("root")}
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { setOpenAddEditModal({ isShown: false, type: "add", data: null }) }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.6)",
                    },
                }}
                contentLabel='My modal'
                className="w-[80%] outline-none md:w-[60%] lg:w-[45%] max-h-3/4 bg-gradient-to-r from-purple-900 to-indigo-800 rounded-md mx-auto mt-14 p-3"
            >

                <EditNotes
                    note={note}
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, data: null })
                    }} />

            </Modal>
        </>
    )
}

export default NoteCard