import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner";
import ApplyDoctor from "./pages/ApplyDoctor";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";


function App() {
  const { loading } = useSelector(state => state.alerts);

  return (
    <BrowserRouter>
      {loading && <Spinner />} {/* ✅ FIXED */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apply-doctor" element={<ApplyDoctor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/doctors" element={<Doctors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
