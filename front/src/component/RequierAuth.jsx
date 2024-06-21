import { Navigate, Outlet } from "react-router-dom";
import userAuthentication from "../utils/userAuth";

function RequierAuth() {
    const { session } = userAuthentication()

    if (!session?.access_token) {
        return <Navigate to={'/'} replace={true} />
    } else {
        return <Outlet />
    }
}

export default RequierAuth