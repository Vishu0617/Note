import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { signUpValidation } from "../../utils/Validation.js";
import axiosUrl from "../../utils/axiosUrl.js";
import { handleServerNetworkError, handleUnknownError, showErrorInfo, showSuccessInfo, signupHandleZodError } from "../../utils/functions/errors.js";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [buttonLoader, setButtonLoader] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signUpValidation.parse(formData);
      setButtonLoader(true);
      setValidationErrors({});
      await axiosUrl.post('/auth/registration', formData).then((res) => {
        if (res.data.status === 1) {
          showSuccessInfo(res)
          navigate("/");
        } else {
          showErrorInfo(res)
        }
        setButtonLoader(false);
      })

    } catch (error) {
      setButtonLoader(false);
      if (error instanceof z.ZodError) {
        const errors = signupHandleZodError(error, firstNameRef, lastNameRef, emailRef, passwordRef)
        setValidationErrors(errors);
      } else if (!error.response) {
        handleServerNetworkError()
      } else {
        handleUnknownError(error)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 px-4 py-4 overflow-hidden">
      <div className="bg-gray-50  p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center">
          Sign Up
        </h2>
        <hr className="w-full h-1 my-1 bg-gray-300 border-0 rounded dark:bg-gray-700" />
        <form className="pt-6" >
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
                <span className="flex items-center">
                  <User className="mr-2 ps-1 font-semibold" /> First name
                </span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleInputChange}
                ref={firstNameRef}
                className={`mt-1 p-2 block w-full border rounded-md shadow-sm sm:text-sm ${validationErrors.firstName ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.firstName && (
                <span className="text-red-500">{validationErrors.firstName}</span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="lastName" className="block text-lg font-medium text-gray-700">
                <span className="flex items-center">
                  <User className="mr-2 ps-1 font-semibold" /> Last name
                </span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleInputChange}
                ref={lastNameRef}
                className={`mt-1 p-2 block w-full border rounded-md shadow-sm sm:text-sm ${validationErrors.lastName ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.lastName && (
                <span className="text-red-500">{validationErrors.lastName}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-2">
            <div className="w-full md:w-1/2">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                <span className="flex items-center">
                  <Mail className="mr-2 ps-1 font-semibold" /> Email
                </span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                ref={emailRef}
                className={`mt-1 p-2 block w-full border rounded-md shadow-sm sm:text-sm ${validationErrors.email ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.email && (
                <span className="text-red-500">{validationErrors.email}</span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
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
                  value={formData.password || ""}
                  onChange={handleInputChange}
                  ref={passwordRef}
                  className={`mt-1 p-2 block w-full border rounded-md shadow-sm sm:text-sm ${validationErrors.password ? "border-red-500" : "border-gray-300"}`}
                  style={{ height: "40px" }} // Set a fixed height for the input element
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                  style={{ top: "50%", transform: "translateY(-50%)" }} // Center the button vertically
                >
                  {isPasswordVisible ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {validationErrors.password && (
                  <span
                    className="text-red-500 absolute"
                    style={{ top: "100%", left: 0 }}
                  >
                    {validationErrors.password}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={buttonLoader ? true : false}
            className="text-gray-900 mt-2 bg-[#F7BE38] hover:bg-[#F7BE38]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            {buttonLoader ? 'Loading...' : "Sign up"}
          </button>
        </form>
        <div className="flex text-sm">
          Already have an account ?  <Link
            to="/"
            className="text-blue-400 hover:underline hover:text-blue-600 ps-1"
          >
            Signin here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
