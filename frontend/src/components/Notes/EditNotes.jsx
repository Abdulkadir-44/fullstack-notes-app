import React, { useState } from 'react'
import TagsInput from '../Inputs/TagsInput'
import { MdClose } from 'react-icons/md'
import { editNote } from "../../services/index"
import { ThreeDots } from "react-loader-spinner"
import { toast } from "sonner"

//hadnlenote fonksiyonunu prop olarak geçeriz 
export default function AddNotes({ onClose,note }) {

    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)
    const [tags, setTags] = useState(note.tags)
    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(false)

    
    const addNewNote = async () => {
        setLoader(true)
        
        editNote(note._id,{ title, content, tags })
            .then(res => {
                console.log(res)
                setLoader(false)
                onClose()
                toast.success(res.message)
                setTimeout(() => {
                    window.location.reload()
                }, 300);
            })
            .catch(err => {
                console.log(err)
                setLoader(false)
                toast.error(err.message)
            })
    }

    const handleAddNote = () => {
        if (!title) {
            setError("Lütfen başlık giriniz !")
            return;
        }
        if (!content) {
            setError("Please enter the content")
            return;
        }
        setError("")

         addNewNote()

    }

    return (
        <div className='relative'>
            <button
            aria-label='Pencereyi Kapat'
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

            {error && <p className='text-xs text-red-500 pt-4'>{error}</p>}

            <button
            aria-label='Ekle'
                onClick={handleAddNote}
                className='button font-medium mt-5 p-3 flex justify-center items-center'>
                {
                    loader ? (
                        <ThreeDots
                            visible={true}
                            height="24"
                            width="24"
                            color="#432B93"
                            radius="9"
                            ariaLabel="three-dots-loading" />
                    ) : <>Not ekle</>
                }
            </button>
        </div>
    )
}
