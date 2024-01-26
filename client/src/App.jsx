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
} from './pages/';
import axios from 'axios';
import Footer from './components/Footer';
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
        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/profile-details" Component={ProfileDetails} />
        </Route>
        <Route path="/" Component={Landing} />
        <Route path="/index" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />

        <Route path="/contact-us" Component={ContactUs} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
