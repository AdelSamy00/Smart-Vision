import { Routes, Route } from 'react-router-dom';
import { ContactUs, Landing, Login, Register, Profile, ProfileDetails } from './pages/';
import axios from 'axios';
function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  return (
    <Routes>
      <Route path="/" Component={Landing} />
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/profile" Component={Profile} />
      <Route path="/profile/profile-details" Component={ProfileDetails}/>
      <Route path="/contact-us" Component={ContactUs}/>
    </Routes>
  );
}

export default App;
