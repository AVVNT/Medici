import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import $ from 'jquery';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/Login/login';
import Home from './Pages/Home/home';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import SingleProduct from './Pages/SingleProduct/SingleProduct';
import UserDashboard from './Pages/UserDashboard/UserDashboard'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="product" element={<SingleProduct id="61b886e9732e473153d1c660"/>} />
        <Route path="userlogin" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
