import Swal from "sweetalert2";

export const signInHandleZodError = (error, emailRef, passwordRef) => {
  const errors = {};
  let focusSet = false;
  error.errors.forEach((Error) => {
    if (Error.path[0] === "email" && !focusSet) {
      emailRef?.current.focus();
      focusSet = true;
    }
    if (Error.path[0] === "password" && !focusSet) {
      passwordRef.current.focus();
      focusSet = true;
    }
    errors[Error.path[0]] = Error.message;
  });
  return errors;
};

export const signupHandleZodError = (
  error,
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef
) => {
  const errors = {};
  let focusSet = false;
  error.errors.forEach((Error) => {
    if (Error.path[0] === "firstName" && !focusSet) {
      firstNameRef.current.focus();
      focusSet = true;
    }
    if (Error.path[0] === "lastName" && !focusSet) {
      lastNameRef.current.focus();
      focusSet = true;
    }
    if (Error.path[0] === "email" && !focusSet) {
      emailRef.current.focus();
      focusSet = true;
    }
    if (Error.path[0] === "password" && !focusSet) {
      passwordRef.current.focus();
      focusSet = true;
    }
    errors[Error.path[0]] = Error.message;
  });
  return errors;
};

export const notesHandleZodError = (error, titleRef, contentRef) => {
  const errors = {};
  let focusSet = false;
  error.errors.forEach((err) => {
    if (err.path[0] === "title" && !focusSet) {
      titleRef?.current.focus();
      focusSet = true;
    }
    if (err.path[0] === "content" && !focusSet) {
      contentRef?.current.focus();
      focusSet = true;
    }
    errors[err.path[0]] = err.message;
  });

  return errors;
};

export const handleServerNetworkError = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Failed to connect to the server. Please try again later.",
    showConfirmButton: true,
  });
};

export const handleUnknownError = (error) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title:
      error?.response?.data?.message || "An error occurred. Please try again.",
    showConfirmButton: true,
  });
};

export const showSuccessInfo = (res) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: res.data.message,
    showConfirmButton: true,
  });
};

export const showErrorInfo = (res) => {
  Swal.fire({
    position: "center",
    icon: "info",
    title: res.data.message,
    showConfirmButton: true,
  });
};
