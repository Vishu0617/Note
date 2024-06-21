import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import RequierAuth from "./component/RequierAuth";
import Signin from "./component/auth/Signin";
import Signup from "./component/auth/Signup";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Notfound from "./pages/Notfound";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequierAuth />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
