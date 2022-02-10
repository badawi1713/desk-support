import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Home, Login, Register } from "./pages";
const App = () => {
  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
