import { useEffect, useState } from "react"
import { Link, useNavigate,  useParams } from "react-router"
import api from "../lib/axios"
import toast from "react-hot-toast"
import { ArrowLeftIcon, Loader2Icon, Save, Trash2Icon } from "lucide-react"

const NoteDetailPage = () => {
  const [note, setnotes] = useState(null)
  const [loading ,setloading] = useState(true)
  const [saving, setsaving] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const fetchNotes = async() =>{
      try {
        const res = await api.get(`/notes/${id}`)
        setnotes(res.data)
      } catch (error) {
        toast.error("Error In Fetching Note")
        console.log("Error In Fetching Note" .error)
      }finally{
      setloading  (false)
      }
    }
    fetchNotes();
  }, [id])

  const handledelete = async() => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/")
    } catch (error) {
      console.error("Error in deleting note:", error);
      toast.error("Failed to delete note");
    }
  }
   const handleSave = async() => {
     if (!note.title.trim() || !note.content.trim()){
      toast.error("All Fields Are Required")
    }
    setsaving(true);
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note Updated Successfully!")
      navigate("/")
    } catch (error) {
      console.log("Error Updaitng Note", error)
      toast.error("Faild To update Note!")
    }finally{
      setsaving(false)
    }
  }
  if(loading){
    return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <Loader2Icon className="animate-spin size-10"/>
    </div>
  );}

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto ">
         <div className="flex items-center justify-between mb-6">
          <Link to={"/"} className = "btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5"/>
              Back To Notes
          </Link>
          <button className="btn btn-error btn-outline" onClick={handledelete}>
            <Trash2Icon className="h-5 w-5"/>
            Delete Note
          </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text"
                placeholder="Note Title" 
                className="input input-bordered"
                value={note.title}
                onChange={(e) => setnotes({...note, title: e.target.value})}/>
              </div>
                <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <input type="text"
                placeholder="Content" 
                className="textarea textarea-bordered h-32"
                value={note.content}
                onChange={(e) => setnotes({...note, content: e.target.value})}/>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default NoteDetailPage 