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
  Checkout,
  History,
  ServicesDetails,
  InventoryHome
} from './pages/';
import axios from 'axios';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import { useEffect, useState } from 'react';
import OrderComponent from './components/OrderComponent';
import AddProductForm from './components/inventory/AddProductFrom';
import AddMatrialForm from './components/inventory/AddMatrialForm';
import UpdateProductForm from './components/inventory/UpdateProductForm';
import UpdateMatrialForm from './components/inventory/UpdateMatrialeForm';
import EditProductForm from './components/Presenter/EditProductPresenter';
import PresenterProductsView from './pages/Presenter/PresenterProductsview';
import HomePresenter from './pages/Presenter/Homepresenter';
import ProductDetailsPresenter from './pages/Presenter/ProductDetailsPresenter';
import EditProduct from './pages/Presenter/EditProduct';
import { CustomerLayout } from './utils/Layouts.jsx';
function App() {
  const location = useLocation();
  const [shwoHeaderAndFooter, setShowHeaderAndFooter] = useState(null);
  const { customer } = useSelector((state) => state.customer);
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: customer?.token ? `Bearer ${customer?.token}` : '',
  };


  const shouldRenderHeaderAndFooter = () => {
    const routesWithoutHeader = ['/login', '/register', '/'];
    return !routesWithoutHeader.includes(location.pathname);
  };

  useEffect(() => {
    const res = shouldRenderHeaderAndFooter();
    setShowHeaderAndFooter(res);
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
        <Route path="/services/:serviceName" element={<ServicesDetails />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route
          path="/p/product/:productId"
          element={<ProductDetailsPresenter />}
        />
        <Route path="/ed/product/:productId" element={<EditProduct />} />
        <Route path="/order" element={<OrderComponent />} />
        <Route path="/addProduct" element={<AddProductForm />} />
        <Route path="/addMatrial" element={<AddMatrialForm />} />
        <Route
          path="/updateProduct/:productId"
          element={<UpdateProductForm />}
        />
        <Route
          path="/updateMatrial/:matrialId"
          element={<UpdateMatrialForm />}
        />
        <Route path="/bag" element={<Bag />} />
        <Route element={<CustomerLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/profile-details" element={<ProfileDetails />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />
          <Route
            path="/profile/delete-account"
            element={<DeleteAccountPage />}
          />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/history" element={<History />} />
          <Route path="/inventory" element={<InventoryHome />} />
          <Route path="/presenter-home" element={<HomePresenter />} />
          <Route path="/presenter-view" element={<PresenterProductsView />} />
          <Route
            path="/presenter-edit-product/:productId"
            element={<EditProductForm />}
          />
        </Route>
      </Routes>
      {shwoHeaderAndFooter && <Footer />}
    </>
  );
}

export default App;
