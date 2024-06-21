import { Eye, Pencil, Pin, Trash2 } from "lucide-react"
import { Dateformater } from "../utils/functions/functions"

function Notes({ note, togglePin, view, edit, confirmDelete }) {
    return (<>
        <div className="w-full max-w-full h-64 flex flex-col justify-between hover:shadow-lg bg-gray-100 rounded-lg border-2 border-gray-300 mb-6 py-3 px-4">
            <div className="absolute top-0 right-0 m-2 ">
                <button
                    title={note.pinned === true ? "Clik to unpin note" : "Clik to pin note"}
                    onClick={() => togglePin(note)}
                    className={`w-8 h-8 rounded-full hover:bg-slate-900 hover:text-white ${note.pinned === true ? 'bg-slate-900 ' : 'bg-gray-400'} flex text-white items-center justify-center`}
                    aria-label="pin note"
                >
                    <Pin className="h-5 w-5" />
                </button>
            </div>
            <div className="justify-between items-center">
                <h4 className="dark:text-black font-bold mb-3">{note.title || "No titles available"}</h4>
                <p className="dark:text-black text-sm truncate-name">{note.content || "No content available"}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="items-center justify-between dark:text-black">
                    <p className="text-sm">{Dateformater(note.created_at) || "No date available"}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        title="View"
                        onClick={() => view(note)}
                        className="w-8 h-8 p-1 cursor-pointer rounded-full hover:bg-yellow-600 hover:text-white bg-gray-800 dark:bg-gray-400 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        aria-label="view note"
                    >
                        <Eye className="h-5 w-5" />
                    </button>
                    <button
                        title="Edit"
                        onClick={() => edit(note)}
                        className="w-8 h-8 p-1 cursor-pointer rounded-full hover:bg-green-600 hover:text-white bg-gray-800 dark:bg-gray-400 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        aria-label="edit note"
                    >
                        <Pencil className="h-5 w-5" />
                    </button>
                    <button
                        title="Delete"
                        onClick={() => confirmDelete(note)}
                        className="w-8 h-8 cursor-pointer rounded-full hover:bg-red-500 hover:text-white bg-gray-800 dark:bg-gray-400 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        aria-label="delete note"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default Notes