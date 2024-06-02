import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import SearchBar from '../components/Inputs/SearchBar'
import { getAllNotes } from "../services"
import NoteCard from '@/components/Cards/NoteCard'
import { MdAdd } from "react-icons/md"
import { useSelector } from "react-redux"
import Modal from "react-modal"
import AddEditNotes from '@/components/Notes/AddEditNotes'

const Home = () => {

  const searchTerm = useSelector(state => state.search.searchTerm)
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  useEffect(() => {
    console.log("api isteği");
    getAllNotes()
      .then(data => {
        setNotes(data.notes)
      })
      .catch(err => console.log("catch hatası : ", err))
  }, [])

  useEffect(() => {
    console.log("deneme");
    const timeOut = setTimeout(() => {
      const filtered = notes.filter((note) => note.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
      setFilteredNotes(filtered)
    }, 300)

    return () => {
      clearTimeout(timeOut)
    }
  }, [searchTerm])

  console.log("notes", notes);
  console.log("filteredNotes", filteredNotes);
  return (
    <>
      <div className='flex flex-col relative min-h-screen bg-slate-300'>
        <Navbar
          isNotes={notes.length > 0 ? true : false} />

        <div className='md:hidden flex items-center gap-4  justify-between  container mx-auto '>
          <SearchBar
            isNotes={notes.length > 0 ? true : false} />

          <button
            className='w-14 h-9 flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 justify-center rounded'>
            <MdAdd className='text-[32px] text-white' />
          </button>
        </div>
        {
          notes.length === 0 && (
            <div className='container w-[87%] mx-auto md:mt-4 bg-yellow-300'>
              Not yok aga
            </div>
          )
        }
        {
          (notes.length > 0 && filteredNotes.length === 0) && (
            <>
              {
                !searchTerm ? (
                  <div className='my-5 container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 '>
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
                ) : (
                  <div className='container w-[87%] mx-auto md:mt-4 bg-yellow-300'>
                    Eşleşen öge yok aga
                  </div>
                )
              }
            </>
          )
        }
        {
          (notes.length > 0 && filteredNotes.length > 0) && (
            <div className='my-5 container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 '>
              {
                filteredNotes.map((note) => (
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
          )
        }

        <button
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "ADD", data: null });
          }}
          className='max-md:hidden w-14 h-9 flex absolute bottom-6 right-6 lg:bottom-10 lg:right-10 items-center bg-gradient-to-r from-purple-600 to-indigo-600 justify-center rounded '>
          <MdAdd className='text-[32px] text-white' />
        </button>

        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => { }}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=''
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
        >

          <AddEditNotes
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => {
              setOpenAddEditModal({ isShown: false, type: "add", data: null })
            }} />

        </Modal>

      </div>

    </>
  )
}

export default Home


/*

// Debounce işlemi uygulanmış arama fonksiyonu
  // const debouncedSearch = debounce((term) => {
  //   console.log(filteredNotes);
  //   // Arama terimine göre notları filtrele
  //   if (term.trim() === '') {
  //     setFilteredNotes(notes);
  //   } else {
  //     const filtered = notes.filter((note) =>
  //       note.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
  //     );
  //     setFilteredNotes(filtered);
  //   }
  // }, 1000); // 250 milisaniye gecikme süresi


  // useEffect(() => {
  //   // Debounced arama fonksiyonunu kullanarak arama yap
  //   debouncedSearch(searchTerm);
  // }, [searchTerm]);

   n f
  0 0 HER İKİSİDE YOK               HERHANGİ BİR NOT YOK SAYFASI   filteredData === 0 && note === 0
  1 0 NOTLAR VAR FİLTRELEME YOK     TÜM NOTLAR GÖZÜKÜR              note > 0 && filtered === 0
  1 1 HER İKSİİDE VAR               FİLTRELENEN NOTLAR GÖZÜKÜR       note > 0 && filtered > 0

  {
          notes.length > 0 ? (
            <div className='my-5 container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 '>
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
          ) : (
            <div className='container w-[87%] mx-auto md:mt-4 bg-yellow-300'>
              Not yok aga
            </div>
          )
        }


*/