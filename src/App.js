import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { Counter } from "./features/counter/Counter";
import { Authenticate } from "./features/authenticate/Authenticate";

import "./App.css";

function App() {
  const accessToken = useSelector((state) => state.authenticate.accessToken);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      if (pathname === "/login") navigate("/");
    } else {
      navigate("/login");
    }
  }, [pathname, navigate, accessToken]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Counter />}></Route>
        <Route path="/login" element={<Authenticate />}></Route>
      </Routes>
    </div>
  );
}

export default App;
