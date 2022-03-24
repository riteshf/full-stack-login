import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { Home } from "./pages/Home";
import { Authenticate } from "./features/authenticate/Authenticate";

import "./App.css";
import { loginCheckAsync } from "./features/authenticate/authenticate.slice";

function App() {
  const accesstoken = useSelector((state) => state.authenticate.accesstoken);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (accesstoken) {
      if (pathname === "/login") navigate("/");
    } else {
      navigate("/login");
    }
  }, [pathname, navigate, accesstoken]);
  useEffect(() => {
    const getUser = () => {
      dispatch(loginCheckAsync({ accesstoken }));
    };
    getUser();
  }, [dispatch, accesstoken]);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Authenticate />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
