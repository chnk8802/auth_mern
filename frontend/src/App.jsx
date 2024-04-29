/*
import logos from assets
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
*/
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material"
import "./App.css"
import Home from "./pages/Home"
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/forgot-password" Component={ForgotPassword}></Route>
        <Route path="/register" Component={Signup}></Route>
        <Route path="/login" Component={Login}></Route>
      </Routes>
    </>
  );
}

export default App;
