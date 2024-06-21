function Confirmation({ message, onConfirm, onCancel, buttonText }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 md:p-6 h-auto md:h-48 rounded-md shadow-md w-full md:w-1/3">
                <p className="text-center font-medium mt-2 md:mt-10 pb-5">{message}</p>
                <div className="flex flex-col md:flex-row justify-center md:justify-end mt-4">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
