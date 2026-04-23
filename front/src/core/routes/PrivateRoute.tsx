
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
    const token = useAuthStore((state) => state.access_token);

    if (!token) return <Navigate to="/login"/>

    return children;
}

export default PrivateRoute;