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
import { login, logout } from "./app/features/verifyLogin/verifyLoginSlice";
import Users from "./pages/Users";

function PrivateRoute({ children, requireAuth = true}) {
  const location = useLocation()
  const isLoggedIn = useSelector((state) => state.verifyLogin.isLoggedIn)
  if (isLoggedIn && location.pathname == "/login" || location.pathname == "/register") {
    console.log({"1":1,"isLoggedIn":isLoggedIn, "!isLoggedIn": !isLoggedIn, "requireAuth":requireAuth})
    return <Navigate to="/"/>
  }
  if (!isLoggedIn && requireAuth) {
    console.log({"2":2,"isLoggedIn":isLoggedIn, "!isLoggedIn": !isLoggedIn, "requireAuth":requireAuth})
    return <Navigate to="/login"/>
  }
  return children;
}

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.verifyLogin.isLoggedIn)
  useEffect(()=>{
    const getLoggedUser = localStorage.getItem("loggedInUser")
    console.log({"!!localStorage.getItem('loggedinUser')":!!localStorage.getItem("loggedinUser"),"loggedInUser":getLoggedUser,"isLoggedIn":isLoggedIn})
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<PrivateRoute children={<Users />}/>} />
        <Route path="/forgot-password" element={<PrivateRoute children={<ForgotPassword/>} requireAuth={false}/>}/>
        <Route path="/register" element={<PrivateRoute children={<Signup/>} requireAuth={false}/>}/>
        <Route path="/login" element={<PrivateRoute children={<Login />} requireAuth={false}/>}/>
      </Routes>
    </>
  );
}

export default App;
