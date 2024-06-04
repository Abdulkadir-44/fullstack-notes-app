import NoteCard from "@/components/Cards/NoteCard";

export const NotesGrid = ({ notes }) => (
    <div className='my-5 container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
      {notes.map(note => (
        <NoteCard
          key={note._id}
          content={note.content}
          title={note.title}
          tags={note.tags}
          date={note.createdAt}
        />
      ))}
    </div>
  );