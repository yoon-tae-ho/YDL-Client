import { Routes, Route, Navigate } from "react-router-dom";
import Browse from "./routes/Browse";
import Lecture from "./routes/Lecture";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Search from "./routes/Search";
import Topic from "./routes/Topic";
import Instructor from "./routes/Instructor";
import Watch from "./routes/Watch";
import Category from "./routes/Category";

const Router = () => {
  return (
    <Routes>
      {/* /search */}
      <Route path="/search" element={<Search />} />
      {/* /browse */}
      <Route path="/" element={<Navigate replace to="/browse" />} />
      <Route path="/browse">
        <Route path="" element={<Browse />} />
        <Route path="topics" element={<Category />} />
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
  );
};

export default Router;
