import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorList from "./pages/DoctorList";
import DoctorDetails from "./pages/DoctorsDetails";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorAvailability from "./pages/DoctorAvailability";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/doctor/availability" element={<DoctorAvailability />} />
      </Routes>
    </BrowserRouter>
  );
}
