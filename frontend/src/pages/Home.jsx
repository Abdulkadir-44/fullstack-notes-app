import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import SearchBar from '../components/Inputs/SearchBar'
import { getAllNotes } from "../services"
import NoteCard from '@/components/Cards/NoteCard'
import { MdAdd } from "react-icons/md"
// burda bulunan term state değerime navbarda ihtiyacım var o taraftan bu tarafa ulaşamadığımdan prop olarak geçtim ki web halinde navbarda yaptığım değişiklik burdaki state değerini etkilesin

//YAPILACAKLAR
//notların tamamını alıp ki eğer not yoksa notun olmadığına dair bir sayfa gösterilir eğer not varsa notlar gösterilir daha sonra bu çekilen not dizisinde searchTerm araması yapılır debounce işlemiyle
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [notes, setNotes] = useState([])

  useEffect(() => {
     getAllNotes()
      .then(data => setNotes(data.notes))
      .catch(err => console.log("catch hatası : ", err))
  }, [])

  console.log(notes);
  return (
    <>
      <div className='flex flex-col min-h-screen  bg-gradient-to-r from-purple-200 to-indigo-300'>
        <Navbar
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onClearSearch={() => setSearchTerm("")} />

        <div className='md:hidden flex items-center gap-4  justify-between  container mx-auto '>
          <SearchBar
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            oncClearSearch={() => setSearchTerm("")} />
          <button
            className='w-14 h-9 flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 justify-center rounded'>
            <MdAdd className='text-[32px] text-white' />
          </button>
        </div>
        {
          notes.length > 0 ? (
            <div className=' my-5 container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 '>
              {
                notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    content={note.content}
                    title={note.title}
                    tags={note.tags}
                    date={note.createdAt}
                  />
                ))
              }

            </div>
          ) :
            <div className='container w-[87%] mx-auto md:mt-4 bg-yellow-300'>
              Not yok aga
            </div>
        }
      </div>
    </>
  )
}

export default Home