import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header, PrivateRoute } from "./components";
import { Home, Login, NewTicket, Page404, Register, Ticket, TicketDetail } from "./pages";
const App = () => {

  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/new-ticket" element={<PrivateRoute />}>
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>
          <Route path="/tickets" element={<PrivateRoute />}>
            <Route path="/tickets" element={<Ticket />} />
          </Route>
          <Route path="/ticket/:id" element={<PrivateRoute />}>
            <Route path="/ticket/:id" element={<TicketDetail />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
