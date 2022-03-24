import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { Home } from "./pages/Home";
import { Authenticate } from "./features/authenticate/Authenticate";

import "./App.css";
import { loginCheckAsync } from "./features/authenticate/authenticate.slice";

function App() {
  const accessToken = useSelector((state) => state.authenticate.accessToken);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) {
      if (pathname === "/login") navigate("/");
    } else {
      navigate("/login");
    }
  }, [pathname, navigate, accessToken]);
  useEffect(() => {
    const getUser = () => {
      dispatch(loginCheckAsync({ accessToken }));
    };
    getUser();
  }, [dispatch, accessToken]);
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
