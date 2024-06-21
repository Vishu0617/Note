import { Outlet } from "react-router-dom";
import Header from "../component/Header";

function MainLayout() {

  return (<>
    <Header />
    <Outlet />
  </>);
}

export default MainLayout;
