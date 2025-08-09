"use client"

import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "../lib/utils"
import toast from "react-hot-toast"
import api from "../lib/axios"

const NoteCard = ({ Note, SetNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault()

    if (!window.confirm("Are you sure you want to delete this note?")) return

    console.log("Deleting note with ID:", id)

    try {
      await api.delete(`/notes/${id}`)
      SetNotes((prev) => prev.filter((Note) => Note._id !== id))
      toast.success("Note deleted successfully")
    } catch (error) {
      console.error("Error in deleting note:", error)
      toast.error("Failed to delete note")
    }
  }

  return (
    <Link
      to={`/note/${Note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#4d342b]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{Note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{Note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(Note.createdAt)}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, Note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
