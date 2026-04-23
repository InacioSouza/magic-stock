import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register/Register";

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;