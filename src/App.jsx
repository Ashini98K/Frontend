import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import UserInformation from "./Components/user_details";
import AllUserDetails from "./Components/all_user_details";
import Register from "./Components/register_user";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/home-page" component={Homepage}></Route> */}
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/all/userdetails" element={<AllUserDetails />} />
          <Route path="/user/information/:id" element={<UserInformation />} />
          <Route exact path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
