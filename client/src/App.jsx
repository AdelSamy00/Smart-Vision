import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ContactUs,
  Landing,
  Login,
  Register,
  Profile,
  ProfileDetails,
  Home,
  AboutUs,
  Services,
} from './pages/';
import axios from 'axios';
import Footer from './components/Footer';
import ChangePassword from './pages/ChangePassword';
function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  const Layout = () => {
    const { customer } = useSelector((state) => state.customer);
    console.log(customer);
    const location = useLocation();
    return customer?.token ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };
  return (
    <div className="">
      <Routes>
        <Route element={<Layout />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/profile-details" Component={ProfileDetails} />
        <Route path="/" Component={Landing} />
        <Route path="/index" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/about" Component={AboutUs} />
        <Route path="/contact-us" Component={ContactUs} />
        <Route path="/customer-services" Component={Services} />
        <Route path="/profile/change-password" Component={ChangePassword} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
