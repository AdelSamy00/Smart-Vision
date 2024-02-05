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
  ChangePassword,
  Favourites,
  ProductDetails,
  DeleteAccountPage,
  Store,
  Bag,
  Checkout
} from './pages/';
import axios from 'axios';
import Footer from './components/Footer';
import Header from './components/Header/Header';

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
  const routesWithoutHeader = ['/login', '/register','/'];
  const shouldRenderHeader = !routesWithoutHeader.includes(window.location.pathname);

  return (
    <>
    {shouldRenderHeader && <Header/>}
      <Routes>
        <Route element={<Layout />}></Route>
        <Route path="/" element={<Landing />} />
        <Route path="/index" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/customer-services" element={<Services />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/profile-details" element={<ProfileDetails />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />
        <Route path="/profile/delete-account" element={<DeleteAccountPage />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {shouldRenderHeader && <Footer />}
    </>
  );
}

export default App;
