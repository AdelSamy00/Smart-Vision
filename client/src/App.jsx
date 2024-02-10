import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import { useEffect, useState } from 'react';
import OrderComponent from './components/OrderComponent';

function App() {
  const location = useLocation();
  const [shwoHeaderAndFooter, setShowHeaderAndFooter] = useState(null)
  axios.defaults.baseURL = 'http://localhost:3000';
  const Layout = () => {
    const { customer } = useSelector((state) => state.customer);
    console.log(customer);
    return customer?.token ?
      (
        <Outlet />
      )
      :
      (
        <Navigate to="/login" state={{ from: location }} />
      );
  };
  const shouldRenderHeaderAndFooter = () => {
    const routesWithoutHeader = ['/login', '/register', '/'];
    return !routesWithoutHeader.includes(location.pathname);
  };
  useEffect(() => {
    const res = shouldRenderHeaderAndFooter()
    setShowHeaderAndFooter(res)
  }, [location]);

  return (
    <>
      {shwoHeaderAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/order" element={<OrderComponent />} />
        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/profile-details" element={<ProfileDetails />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />
          <Route path="/profile/delete-account" element={<DeleteAccountPage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
      {shwoHeaderAndFooter && <Footer />}
    </>
  );
}

export default App;
