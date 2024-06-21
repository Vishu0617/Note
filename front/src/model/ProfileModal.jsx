import { X } from "lucide-react";
import userAuthentication from "../utils/userAuth";
import { CapitalFirstLater, DateAndTimeFormat } from "../utils/functions/functions";

function ProfileModal({ profileView, closeVieMoal }) {

    const { user } = userAuthentication()


    if (!profileView) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50 overflow-y-hidden">
            <div className="relative w-full max-w-lg h-auto mx-4 sm:mx-auto flex flex-col justify-between bg-gray-50 rounded-lg border-gray-300 my-6 py-5 px-4 shadow-lg max-h-screen overflow-y-auto">
                <button
                    title="Close"
                    onClick={closeVieMoal}
                    className="absolute top-0 right-0 mt-2 mr-2 w-8 h-8 rounded-full hover:bg-red-400 hover:text-white dark:bg-gray-300 bg-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    aria-label="close modal"
                >
                    <X className="h-5 w-5" />
                </button>
                <h3 className="text-2xl font-bold text-center ">Profile</h3>
                <hr className="w-full h-1 my-1 bg-gray-300 border-0 rounded dark:bg-gray-700 mb-4" />
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">First Name:</span>
                        <span className="text-gray-600"><span className="text-gray-600">{CapitalFirstLater(user.user_metadata.first_name)}</span>
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Last Name:</span>
                        <span className="text-gray-600">{CapitalFirstLater(user.user_metadata.last_name)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="text-gray-600">{user.user_metadata.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Joining At:</span>
                        <span className="text-gray-600">{DateAndTimeFormat(user.created_at)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Email Confirm At:</span>
                        <span className="text-gray-600">{DateAndTimeFormat(user.email_confirmed_at)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Last Sign-in At:</span>
                        <span className="text-gray-600">{DateAndTimeFormat(user.last_sign_in_at)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal