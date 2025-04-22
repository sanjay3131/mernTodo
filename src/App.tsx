import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/userPage" element={<UserPage />} />
    </Routes>
  );
};

export default App;
