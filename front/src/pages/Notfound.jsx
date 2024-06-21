import { Link } from 'react-router-dom';
import NotfoundImg from '../assets/images.png'

function Notfound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4 md:px-8 lg:px-16 text-center">
            <img src={NotfoundImg} className=" w-60 max-w-sm md:max-w-md lg:max-w-lg mb-4" alt="Page Not Found" />
            <h1 className="text-2xl md:text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-base md:text-lg mb-4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <Link to={'/dashboard'} className="text-blue-500 hover:text-blue-700">Back to Dashboard</Link>
        </div>

    )
}

export default Notfound