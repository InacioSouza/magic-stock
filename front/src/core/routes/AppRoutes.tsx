import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ListingProduct from "../pages/ListingProduct/ListingProduct";

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace/>}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>

                <Route path="/produtos" element={
                    <PrivateRoute>
                        <ListingProduct />
                    </PrivateRoute>
                }></Route>

                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }></Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;