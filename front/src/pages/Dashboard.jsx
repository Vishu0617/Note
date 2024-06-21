import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import searching from "../assets/searchingfinle.jpg";
import Notes from "../component/Notes";
import NotesModel from "../model/NotesModal";
import NotesViewModel from "../model/NotesViewModal";
import axiosUrl from "../utils/axiosUrl";
import Confirmation from "../utils/functions/Confirmation";
import { handleInfo, handleOtherError, handleServerNetworkError, handleSuccess } from "../utils/functions/Errors";
import Loader from "../utils/functions/Loader";
import SearchBar from "../utils/functions/Searchbar";

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [isViewModel, setIsViewModel] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [viewNotes, setViewNotes] = useState({});
    const [editNotes, setEditNotes] = useState({});
    const [deleteNote, setDeleteNote] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const apiCalled = useRef(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openEditModal = () => setIsEditModal(true);
    const closeEditModal = () => setIsEditModal(false);

    const openViewModal = () => setIsViewModel(true)
    const closeViewModal = () => setIsViewModel(false)

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    const getNotes = async () => {
        setIsLoading(true);
        await axiosUrl.get('/note').then((res) => {
            if (res.data.status === 1) {
                setNotes(res.data.result);
                setIsLoading(false);
            }
        }).catch((error) => {
            setIsLoading(false);
            if (error.response && error.response.data) {
                handleOtherError(error)
            } else if (!error.response) {
                handleServerNetworkError()
            } else console.log("~ Catch Error :-", error);
        });
    };

    useEffect(() => {
        if (!apiCalled.current) {
            apiCalled.current = true;
            getNotes();
        }
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredNotes = notes?.filter((note) => {
        const matchesSearchQuery = note.title.toLowerCase().includes(searchQuery.toLowerCase().trim().replace(/\s+/g, ' '));
        const matchesFilter = filter === "all" ? true : filter === "pinned" ? note.pinned : !note.pinned;
        return matchesSearchQuery && matchesFilter;
    });

    const onSuccess = (note) => {
        const newNote = {
            ...note,
            pinned: note.pinned ?? false,
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
    };

    const onDelteSuccess = (note) => {
        const newNotesList = notes.filter((n) => n.id !== note.id);
        setNotes(newNotesList);
    };

    const onEditSuccess = (note) => {
        const newNotesList = notes.map((n) => (n.id === note.id ? note : n));
        setNotes(newNotesList);
    };

    const view = (note) => {
        openViewModal();
        setViewNotes(note);
    };

    const edit = (note) => {
        openEditModal();
        setEditNotes(note);
    };

    const confirmDelete = (note) => {
        closeViewModal()
        setDeleteNote(note);
        setShowConfirmation(true);
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
        setDeleteNote(null);
    };

    const handleDelete = async () => {
        if (deleteNote) {
            await axiosUrl.delete(`/note/${deleteNote.id}`).then((res) => {
                if (res.data.status === 1) {
                    handleSuccess(res)
                    onDelteSuccess(deleteNote);
                    setShowConfirmation(false);
                    setDeleteNote(null);
                } else {
                    handleInfo(res)
                }

            }).catch((error) => {
                setIsLoading(false);

                if (!error.response) {
                    handleServerNetworkError()
                } else
                    handleOtherError(error)
            });

        }
    };

    const togglePin = async (note) => {
        const newPinnedValue = note.pinned === true ? false : true;
        try {
            await axiosUrl.post(`/note/pinned/${note.id}`, { pinned: note?.pinned });
            const action = newPinnedValue ? "pinned" : "unpinned";
            const newToggleArry = notes.map((n) => (n.id === note.id ? { ...n, pinned: newPinnedValue } : n));

            const sortedNotes = newToggleArry.sort((a, b) => b.pinned - a.pinned);

            setNotes(sortedNotes);
            toast.success(`Note ${action} successfully.`, {
                position: "top-center",
                autoClose: 2000,
            });
        } catch (error) {
            console.error("Error updating note pin status:", error);
            if (!error.response) {
                handleServerNetworkError()
            } else
                handleOtherError(error)
        }
    };

    return (
        <div>
            <div className="relative overflow-x-auto px-5 pt-16 sm:rounded-lg flex-1">
                <div className="flex justify-between items-center mb-4">
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleClearSearch={handleClearSearch}
                        filter={filter}
                        isLoading={isLoading}
                        openModal={openModal}
                        handleFilterChange={handleFilterChange}
                    />
                </div>
                {isLoading ? (
                    <Loader />
                ) : filteredNotes?.length > 0 ? (
                    <div className="mx-auto py-0">
                        <div className="grid grid-row-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                            {filteredNotes.map((note) => (
                                <div className="rounded group relative" key={note.id}>
                                    <Notes note={note} togglePin={togglePin} view={view} edit={edit} confirmDelete={confirmDelete} />
                                </div>
                            ))}
                        </div>
                    </div>

                ) : (
                    <div className="flex flex-col items-center justify-center h-full p-2 md:p-8 lg:p-16 text-center border-opacity-60">
                        <img src={searching} alt="Searching" className="w-48 max-w-xs md:max-w-sm lg:max-w-md mb-" />
                        <p className="text-red-500 text-lg mb-32 md:text-xl">Oops, sorry, your data was not found.</p>
                    </div>
                )}
            </div>
            <NotesModel isOpen={isModalOpen} onClose={closeModal} onSuccess={onSuccess} />
            <NotesViewModel edit={edit} confirmDelete={confirmDelete} viewNotes={viewNotes} isViewModel={isViewModel} closeViewModal={closeViewModal} />
            <NotesModel editNotes={editNotes} isEditModal={isEditModal} onClose={closeEditModal} onSuccess={onSuccess} onEditSuccess={onEditSuccess} />
            {showConfirmation && (
                <Confirmation
                    message="Are you sure you want to delete this note?"
                    buttonText="Delete"
                    onConfirm={handleDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}

export default Dashboard;
