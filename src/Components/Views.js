import React from "react";
import { Route, Routes } from 'react-router-dom';

import Login from "./Login";
import Registrierung from "./Registierung";
import Home from './Home';



const Views = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="/register" element={<Registrierung />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<div>404 Not Found!</div>} />

            {/*Nested Route example*/}
            <Route path="/post">
                <Route path="1" element={<div>Post 1</div>} />
            </Route>
        </Routes>
    )
}

export default Views;