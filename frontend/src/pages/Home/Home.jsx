import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/Inputs/SearchBar'
import { getAllNotes } from "../../services"
import { MdAdd } from "react-icons/md"
import { useSelector } from "react-redux"
import Modal from "react-modal"
import AddEditNotes from '@/components/Notes/AddEditNotes'
import { NoMatchingNotesMessage } from "./NoMatchingNotesMessage"
import { NoNotesMessage } from "./NoNotesMessage"
import { NotesGrid } from "./NotesGrid"
import { LoadingMessage } from "./Loading"




//program kapandığında eğer login olmaz ise ne kadar süre geçerse geçsin user localstorage'da olduğundan panele giriyor ama token süresi dolduğundan işlem yapılamıyor
const Home = () => {

  const [loader, setLoader] = useState(true)
  const searchTerm = useSelector(state => state.search.searchTerm)
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  console.log(openAddEditModal);
  useEffect(() => {
    setLoader(true)
    getAllNotes()
      .then(data => {
        setNotes(data.notes)
        setLoader(false)
      })
      .catch(err => {
        console.log("catch hatası : ", err)
        setLoader(false)
      })
  }, [])

  useEffect(() => {

    const timeOut = setTimeout(() => {
      const filtered = notes.filter((note) => {
        const normalizedTitle = note.title.toLocaleLowerCase().replace(/\s+/g, '');
        const normalizedSearchTerm = searchTerm.toLocaleLowerCase().replace(/\s+/g, '');
        return normalizedTitle.includes(normalizedSearchTerm);
      })
      setFilteredNotes(filtered)
    }, 300)

    return () => {
      clearTimeout(timeOut)
    }
  }, [searchTerm])


  const noNotes = !loader && notes.length === 0;
  const notesExist = !loader && notes.length > 0;
  const noFilteredNotes = filteredNotes.length === 0;
  const filteredNotesExist = filteredNotes.length > 0;
  // console.log("notes", notes);
  // console.log("filteredNotes", filteredNotes);
  return (
    <>
      <div className='flex flex-col relative min-h-screen bg-slate-300'>
        <Navbar
          isNotes={notes.length > 0 ? true : false} />

        <div className='md:hidden flex items-center gap-4  justify-between  container mx-auto '>
          <SearchBar
            isNotes={notes.length > 0 ? true : false} />

          <button
            onClick={() => {
              setOpenAddEditModal({ isShown: true, type: "ADD", data: null });
            }}
            className='w-14 h-9 flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 justify-center rounded'>
            <MdAdd className='text-[32px] text-white' />
          </button>
        </div>
        <div className='mb-20  flex-1'>
          {loader && (
            <div className='flex justify-center items-center h-[332px] md:h-[507px]'>
              <LoadingMessage />
            </div>
          )}
          {noNotes && (
            <div className='flex justify-center items-center h-[332px] md:h-[507px]'>
              <NoNotesMessage />
            </div>
          )}
          {notesExist && noFilteredNotes && (
            <>
              {
                !searchTerm ? (
                  <NotesGrid notes={notes} />
                ) : (
                  <div className='flex justify-center items-center h-[332px] md:h-[507px]'>
                    <NoMatchingNotesMessage />
                  </div>
                )
              }
            </>
          )}
          {notesExist && filteredNotesExist && (
            <NotesGrid notes={filteredNotes} />
          )}
        </div>

        <button
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "ADD", data: null });
          }}
          className='max-md:hidden w-14 h-12 flex absolute bottom-6 right-6 lg:bottom-10 lg:right-10 items-center bg-gradient-to-r from-purple-600 to-indigo-600 justify-center rounded '>
          <MdAdd className='text-[32px] text-white' />
        </button>

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
          className="w-[80%] md:w-[60%] lg:w-[45%] max-h-3/4 bg-gradient-to-r from-purple-900 to-indigo-800 rounded-md mx-auto mt-14 p-3"
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

*/