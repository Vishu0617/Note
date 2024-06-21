import CryptoJS from "crypto-js";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { signingValidation } from "../../utils/Validation";
import axiosUrl from "../../utils/axiosUrl";
import { showErrorInfo, handleUnknownError, handleServerNetworkError, showSuccessInfo, signInHandleZodError } from "../../utils/functions/errors.js";
import userAuthentication from "../../utils/userAuth";
import { encryptUserData } from "../../component/functions.jsx";
const secret_key = import.meta.env.VITE_SECRET_KEY

function Signin() {
  const navigate = useNavigate();
  const { setLogin } = userAuthentication()
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [buttonLoader, setButtonLoader] = useState(false)

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const encryptedUser = encryptUserData(formData);
  const rememUser = localStorage.getItem('User');

  useEffect(() => {
    if (rememUser) {
      try {
        const bytesValue = CryptoJS.AES.decrypt(rememUser, secret_key);
        const decryptedString = bytesValue.toString(CryptoJS.enc.Utf8);

        if (decryptedString) {
          const decryptedUser = JSON.parse(decryptedString);
          setFormData({
            email: decryptedUser.email,
            password: decryptedUser.password,
            rememberMe: decryptedUser.rememberMe
          });
        }
      } catch (error) {
        console.error('Error during decryption or JSON parsing:', error);
      }
    }
  }, [rememUser]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signingValidation.parse(formData);
      setButtonLoader(true);
      setValidationErrors({});
      await axiosUrl.post('/auth/login', formData).then((res) => {
        if (res.data.status === 1) {
          showSuccessInfo(res)
          setLogin({
            user: res?.data?.result?.user,
            session: res?.data?.result?.session
          })
          if (formData.rememberMe) {
            localStorage.setItem("User", encryptedUser)
          } else {
            localStorage.removeItem("User", encryptedUser)
          }

          navigate("/dashboard");
        } else {
          showErrorInfo(res)
        }
        setButtonLoader(false);
      })
    } catch (error) {
      setButtonLoader(false);
      if (error instanceof z.ZodError) {
        const errors = signInHandleZodError(error, emailRef, passwordRef);
        setValidationErrors(errors);
        setButtonLoader(false);
      } else if (!error.response) {
        handleServerNetworkError()
      } else
        handleUnknownError(error)
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 px-4">
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <hr className="w-full h-1 my-1 bg-gray-300 border-0 rounded dark:bg-gray-700" />
        <form className="pt-6">
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              <span className="flex items-center">
                <Mail className="mr-2 ps-1 font-semibold" /> Email
              </span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              ref={emailRef}
              autoComplete="username"
              className={`mt-1 p-2 block w-full border rounded-md shadow-sm sm:text-sm ${validationErrors.email ? "border-red-500" : "border-gray-300"
                }`}
            />
            <span className="text-red-500 ">{validationErrors.email}</span>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              <span className="flex items-center">
                <Lock className="mr-2 ps-1" /> Password
              </span>
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                ref={passwordRef}
                autoComplete="current-password"
                className={`mt-1 p-2 block w-full border rounded-md shadow-sm sm:text-sm ${validationErrors.password
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
                style={{ height: "40px" }} // Set a fixed height for the input element
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                style={{ top: "50%", transform: "translateY(-50%)" }} // Center the button vertically
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <span className="text-red-500 absolute top-full left-0 mt-1">
                {validationErrors.password}
              </span>
            </div>
            <div className="flex justify-between items-center mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  name="rememberMe"
                  onChange={handleInputChange}
                  checked={formData.rememberMe}
                />
                <span className="ml-2 text-sm text-black cursor-pointer">Remember Me</span>
              </label>

            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={buttonLoader ? true : false}
            className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            {buttonLoader ? "Loading..." : "Sign In"}
          </button>

        </form>
        <div className="flex  text-sm">
          Not registered yet? <Link
            to="/signup"
            className="text-blue-400 hover:underline hover:text-blue-600 ps-1"
          >
            Create account
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Signin;
