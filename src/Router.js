import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Browse from "./routes/Browse";
import Lecture from "./routes/Lecture";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Search from "./routes/Search";
import Topic from "./routes/Topic";
import Instructor from "./routes/Instructor";
import Watch from "./routes/Watch";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* /search */}
        <Route path="/search" element={<Search />} />
        {/* /browse */}
        <Route path="/" element={<Navigate replace to="/browse" />} />
        <Route path="/browse">
          <Route path="" element={<Browse />} />
          <Route path=":id" element={<Lecture />} />
          <Route path="topics/:id" element={<Topic />} />
          <Route path="instructors/:id" element={<Instructor />} />
        </Route>
        {/* /watch */}
        <Route path="/watch/:id" element={<Watch />} />
        {/* user */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
