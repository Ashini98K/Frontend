import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import UserInformation from "./Components/user_details";
import AllUserDetails from "./Components/all_user_details";
import Register from "./Components/register_user";
import AllNotes from "./Components/all_notes";
import CreateNote from "./Components/create_note";
import UpdateDeleteNote from "./Components/update_delete_note";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/edit/delete/note/:id"
            element={<UpdateDeleteNote />}
          />
          <Route exact path="/add/note/:id" element={<CreateNote />} />
          <Route exact path="/view/notes/:id" element={<AllNotes />} />
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
