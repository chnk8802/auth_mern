/*
import logos from assets
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
*/
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material"
import "./App.css"
import Home from "./pages/Home"
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import OtpInput from "./components/authentication/OtpInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { login, logout } from "./app/features/authentication/authenticationSlice";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import UserForm from "./pages/UserProfile";

function PrivateRoute({ children, requireAuth = true}) {
  const location = useLocation()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  if (isLoggedIn && (location.pathname == "/login" || location.pathname == "/register")) {
    return <Navigate to="/"/>
  }
  if (!isLoggedIn && requireAuth) {
    return <Navigate to="/login"/>
  }
  return children;
}

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  useEffect(()=>{
    const getLoggedUser = localStorage.getItem("loggedInUser")
    }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute children={<Home />}/>} />
        <Route path="/my-profile" element={<PrivateRoute children={<UserForm />}/>} />
        <Route path="/all-users" element={<PrivateRoute children={<Users />}/>} />
        <Route path="/forgot-password" element={<PrivateRoute children={<ForgotPassword/>} requireAuth={false}/>}/>
        <Route path="/register" element={<PrivateRoute children={<Signup/>} requireAuth={false}/>}/>
        <Route path="/login" element={<PrivateRoute children={<Login />} requireAuth={false}/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
