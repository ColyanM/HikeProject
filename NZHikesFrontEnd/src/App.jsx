import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import DetailedHike from "./DetailedHike";
import AddHike from "./AddHike";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hikes/:id" element={<DetailedHike />} />
      <Route path="/add-hike" element={<AddHike />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
