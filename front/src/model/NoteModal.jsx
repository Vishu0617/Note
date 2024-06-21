import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { noteValidation } from "../utils/Validation.js";
import axiosUrl from "../utils/axiosUrl.js";
import { handleServerNetworkError, handleUnknownError, notesHandleZodError, showErrorInfo, showSuccessInfo } from "../utils/functions/errors.js";

function NotesModal({ editNotes, isOpen, onClose, isEditModal, onSuccess, onEditSuccess }) {
    const [note, setNote] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [buttonLoader, setButtonLoader] = useState(false);

    const titleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (editNotes) {
            setNote(editNotes);
        } else {
            setNote({});
        }
    }, [editNotes]);

    const inputChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        setValidationErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const inputSubmit = async (e) => {
        e.preventDefault();
        try {
            noteValidation.parse(note);
            setValidationErrors({});
            setButtonLoader(true)
            if (!editNotes) {
                handleAddNote()
            } else {
                handleUpdateNote()
            }
        } catch (error) {
            setButtonLoader(false)
            if (error instanceof z.ZodError) {
                const errors = notesHandleZodError(error, titleRef, contentRef)
                setValidationErrors(errors);
            } else if (!error.response) {
                handleServerNetworkError()
            } else {
                handleUnknownError(error)
            }
        }
    };

    const handleAddNote = async () => {
        const response = await axiosUrl.post('/note', note);
        if (response.data.message) {
            showSuccessInfo(response);
            setNote({});
            onClose();
            onSuccess(response.data.result[0]);
        } else {
            showErrorInfo(response);
        }
        setButtonLoader(false)
    };

    const handleUpdateNote = async () => {
        const response = await axiosUrl.patch(`/note/${editNotes?.id}`, note);
        if (response.data.message) {
            showSuccessInfo(response);
            setNote({});
            onClose();
            onEditSuccess(response.data.result[0]);
        } else {
            showErrorInfo(response);

        }
        setButtonLoader(false)

    };

    const closeModal = () => {
        onClose();
        setValidationErrors({});
        setNote({});
    };

    const isVisible = editNotes ? isEditModal : isOpen;
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg mx-4 sm:mx-0 sm:w-1/3">
                <h2 className="text-lg font-semibold">{editNotes ? "Edit Note" : "Add Note"}</h2>
                <hr className="mb-4" />
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Note Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Notes title"
                            ref={titleRef}
                            value={note.title || ""}
                            onChange={inputChange}
                            className={`mt-1 block w-full px-3 py-2 border ${validationErrors.title ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                        />
                        <span className="text-red-500">{validationErrors.title}</span>
                    </div>
                    <div className="mb-4 h-36">
                        <label className="block text-sm font-medium text-gray-700">Note Content</label>
                        <textarea
                            name="content"
                            placeholder="Note content"
                            ref={contentRef}
                            value={note.content || ""}
                            onChange={inputChange}
                            className={`mt-1 block w-full h-32 px-3 py-2 border ${validationErrors.content ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                        ></textarea>
                        <span className="text-red-500">{validationErrors.content}</span>
                    </div>
                    <div className="flex justify-end mt-12">
                        <button
                            type="button"
                            // disabled={buttonLoader ? true : false}
                            onClick={closeModal}
                            className="bg-slate-400 hover:bg-red-400 text-white px-4 py-2 rounded-md mr-2"
                        >
                            <span className="flex space-x-2">
                                Cancel
                            </span>
                        </button>
                        <button
                            type="submit"
                            onClick={inputSubmit}
                            disabled={buttonLoader ? true : false}
                            className="bg-slate-400 hover:bg-blue-400 text-white px-4 py-2 rounded-md"
                        >
                            <span className="flex space-x-2">
                                {buttonLoader ? "Loading..." : (editNotes ? "Update Note" : "Add Note")}
                            </span>

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NotesModal;
