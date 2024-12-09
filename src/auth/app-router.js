import {  Navigate, Route, Routes } from "react-router-dom";
import Login from "../auth/login";
import ForgotPassword from "./forgot-password";
import Register from "./register";


function AppRoutes() {

    return (<>
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/forgotpassword" element={<ForgotPassword />}/>
            <Route path="/" element={<Navigate to="/login" replace />} />

        </Routes>
    </>);
}

export default AppRoutes;