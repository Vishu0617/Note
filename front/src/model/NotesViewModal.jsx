import { Pencil, Trash2, X } from "lucide-react";

function NotesViewModal({ viewNotes, isViewModel, edit, confirmDelete, closeViewModal }) {

    const editView = () => {
        edit(viewNotes),
            closeViewModal()
    }

    const removedView = () => {
        confirmDelete(viewNotes)
        closeViewModal()
    }

    const formattedDate = new Date(viewNotes.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

    if (!isViewModel) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <div className="relative w-full max-w-lg h-auto mx-4 sm:mx-auto flex flex-col justify-between bg-gray-50 rounded-lg border-gray-300 mb-6 py-5 px-4 shadow-lg">
                <button
                    title="Close"
                    onClick={closeViewModal}
                    className="absolute top-0 right-0 mt-2 mr-2 w-8 h-8 rounded-full hover:bg-red-400 hover:text-white dark:bg-gray-300 bg-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    aria-label="close modal"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="mt-4">
                    <h4 className="dark:text-black font-bold mb-3 text-lg sm:text-xl">{viewNotes?.title || "No titles available"}</h4>
                    <p className="dark:text-black text-sm sm:text-base truncate-name">{viewNotes?.content || "No content available"}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-sm sm:text-base">{formattedDate}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            title="Edit"
                            onClick={editView}
                            className="w-8 h-8 rounded-full hover:bg-green-500 dark:bg-gray-300 bg-gray-800 hover:text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            aria-label="edit note"
                        >
                            <Pencil className="h-5 w-5" />
                        </button>
                        <button
                            title="Delete"
                            onClick={removedView}
                            className="w-8 h-8 rounded-full hover:bg-red-500 hover:text-white bg-gray-800 dark:bg-gray-400 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            aria-label="delete note"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotesViewModal;
