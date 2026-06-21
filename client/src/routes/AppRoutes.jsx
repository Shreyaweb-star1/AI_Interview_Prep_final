import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Interview from "../pages/Interview";
import Feedback from "../pages/Feedback";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/interview" element={<Interview />} />

      <Route path="/feedback" element={<Feedback />} />

    </Routes>
  );
}

export default AppRoutes;