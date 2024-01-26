import { Routes, Route } from 'react-router-dom';
import { ContactUs, Landing, Login, Register, Profile } from './pages/';
import axios from 'axios';
function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/contact-us" element={<ContactUs />}></Route>
    </Routes>
  );
}

export default App;
