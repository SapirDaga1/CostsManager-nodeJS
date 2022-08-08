import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Costs from './components/Costs';
import CostAdd from "./components/CostAdd";
import Users from "./components/Users";
import UserAdd from "./components/UserAdd"
import HomePage from "./components/HomePage";
import Report from "./components/Report";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/costs" element={<Costs />} />
            <Route path="/cost/add" element={<CostAdd />} />
            <Route path="/report" element={<Report />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/add" element={<UserAdd />} />
        </Routes>
    </BrowserRouter>
);