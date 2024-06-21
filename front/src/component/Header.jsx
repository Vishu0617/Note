import { LogOut, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProfileModel from '../model/ProfileModal';
import axiosUrl from '../utils/axiosUrl';
import Confirmation from '../component/Confirmation.jsx'
import { formatName } from '../component/functions';
import userAuthentication from '../utils/userAuth';
import { showErrorInfo, showSuccessInfo } from '../utils/functions/errors.js';

const DashboardHeader = () => {
  const { setLogin } = userAuthentication()
  const [isOpen, setIsOpen] = useState(false);
  const [profileView, setProfileView] = useState(false)
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();


  const openModal = () => setProfileView(true);
  const closeModal = () => setProfileView(false);

  const { user } = userAuthentication()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };


  const handleLogoutClick = async () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = async () => {
    try {
      setShowLogoutConfirmation(false);
      await axiosUrl.post('/auth/logout').then((res) => {
        if (res.data.status === 1) {
          showSuccessInfo(res)
          setLogin({
            user: null,
            session: null
          })
          navigate('/', { replace: true });
        } else {
          showErrorInfo(res)
        }
      })
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error?.response?.data?.message,
        showConfirmButton: true,
      });
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);


  const viewModal = () => {
    openModal()
  }

  const closeVieMoal = () => {
    closeModal()
  }

  return (<>
    <div className="bg-slate-200 shadow-md py-1 px-4 flex z-40 fixed w-full justify-between items-center">
      <div className="text-2xl font-bold">Dashboard</div>
      <div className="relative" ref={dropdownRef}>
        <div
          id="dropdownHoverButton"
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none cursor-pointer"
        >
          {formatName(user)}
        </div>
        {isOpen && (
          <div
            id="dropdownHover"
            className="z-50 absolute top-full max-w-[150px] right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-42 dark:bg-gray-700"
          >
            <div className="px-4 py-3" role="none">
              <p
                className="text-sm font-medium text-gray-900 dark:text-white truncate"
                role="none"
                title={user?.user_metadata?.email}
              >
                {user?.user_metadata?.email || 'Name not available'}
              </p>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHoverButton"
            >
              <li>
                <Link
                  to="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => { handleLinkClick(), viewModal() }}
                >
                  <span className="flex items-center">
                    <User className="mr-2 ps-1 font-semibold" /> Profile
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleLogoutClick}
                >
                  <span className="flex items-center">
                    <LogOut className="mr-2 ps-1 font-semibold" /> Sign out
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        )}

      </div>
    </div>

    <ProfileModel profileView={profileView} closeVieMoal={closeVieMoal} />
    {showLogoutConfirmation && (
      <Confirmation
        message="Are you sure you want to log out?"
        buttonText="Logout"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    )}
  </>);
};

export default DashboardHeader;
