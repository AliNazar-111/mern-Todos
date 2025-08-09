import React, { useEffect, useState } from 'react'
import Navbar from '../componenets/navbar'
import Ratelimited from '../componenets/Ratelimited';
import toast from "react-hot-toast"
import Note from '../../../Backend/src/models/Note';
import NoteCard from '../componenets/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../componenets/notesNotFound';
const HomePage = () => {
  const [isRatelimited , SetRateLimit] = useState(false);
  const [Notes,SetNotes] = useState([]);
  const [loading , setloading] = useState(true);
  
useEffect(() => {
  const fetchnotes = async() =>{
    try {
      const res = await api.get("/notes");
      console.log(res.data)
      SetNotes(res.data);
      SetRateLimit(false)
    } catch (error) {
      console.log("Error Fetching Notes", error);
      if(error?.response?.status === 429){
        SetRateLimit(true)
      }else{
        toast.error("failed to load notes")
      }
    }finally{
      setloading(false)
    }
  }
  fetchnotes();
},[])
  return (
    <div className='min-h-screen'>
  <Navbar />

  {isRatelimited && <Ratelimited />}

  <div className='max-w-7xl mx-auto p-4 mt-6'>
    {loading && (
      <div className='text-center text-primary py-10'>
        Loading Notes...
      </div>
    )}
    {Notes.length === 0 && !isRatelimited && <NotesNotFound/>}
    {Notes.length > 0 && !isRatelimited && (
    <div className="flex justify-center">
  <div className="w-full max-w-6xl px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {Notes.map((note) => (
        <NoteCard key={note._id} Note={note} SetNotes={SetNotes}/>
      ))}
    </div>
  </div>
</div>

    )}
  </div>
</div>

  ) 
}
export default HomePage
