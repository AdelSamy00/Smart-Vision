import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CustomerLayout } from './utils/Layouts.jsx';
import axios from 'axios';

import {
  ContactUs,
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
  // InventoryHome,
} from './pages/e-commers/index.js';
import {
  EditProduct,
  HomePresenter,
  PresenterProductsView,
  ProductDetailsPresenter,
} from './pages/Presenter/index.js';
import {
  InventoryHome,
  TransactionsPage,
  TransactionHistory,
  InventoryMatrialsOrders
} from './pages/inventory/index.js';
import {
  EmployeLogin,
  Landing,
  Login,
  Register,
  Page404,
} from './pages/shared/index.js';

import {
  CustomOrderForm,
  ViewCutomizedOrders,
  OrderDetailsEnginer,
} from './pages/engineer/index.js';
import {
  ViewProductOrders
} from './pages/operator/index.js';

import { OrderDetailsFactory } from './pages/factory/index.js';
import Footer from './components/shared/Footer.jsx';
import Header from './components/shared/Header.jsx';
import OrderComponent from './components/e-commers/OrderComponent.jsx';
import AddProductForm from './components/inventory/AddProductFrom';
import AddMatrialForm from './components/inventory/AddMatrialForm';
import UpdateProductForm from './components/inventory/UpdateProductForm';
import UpdateMatrialForm from './components/inventory/UpdateMatrialeForm';
import { shouldRenderHeaderAndFooter } from './utils/ShouldRender.jsx';

function App() {
  const location = useLocation();
  const { customer } = useSelector((state) => state.customer);
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: customer?.token ? `Bearer ${customer?.token}` : '',
  };

  return (
    <>
      {shouldRenderHeaderAndFooter(location) && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/e/login" element={<EmployeLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceName" element={<ServicesDetails />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:productId" element={<ProductDetails />} />{' '}
        <Route path="/bag" element={<Bag />} />
        {/* Private Customer Routes (Logged in) */}
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
        </Route>
        {/* Private Inventory Manager Routes */}
        <Route path="/inventory" element={<InventoryHome />} />
        <Route path="/order" element={<OrderComponent />} />
        <Route path="/addProduct" element={<AddProductForm />} />
        <Route path="/addMatrial" element={<AddMatrialForm />} />
        <Route path="/transactions-history" element={<TransactionHistory />} />
        <Route path="/inventory-Order" element={<InventoryMatrialsOrders />} />
        <Route
          path="/updateProduct/:productId"
          element={<UpdateProductForm />}
        />
        <Route
          path="/updateMatrial/:matrialId"
          element={<UpdateMatrialForm />}
        />
        <Route path="/Transaction" element={<TransactionsPage />} />
        {/* Private Presenter Routes */}
        <Route
          path="/p/product/:productId"
          element={<ProductDetailsPresenter />}
        />
        <Route path="/presenter-home" element={<HomePresenter />} />
        <Route path="/presenter-view" element={<PresenterProductsView />} />
        <Route path="/ed/product/:productId" element={<EditProduct />} />
        {/* Private Enginer Routes */}
        <Route
          path="/engineer/send-request/:requestId"
          element={<CustomOrderForm />}
        />
         <Route
          path="/engineer/view-measured-customized-requests"
          element={<ViewCutomizedOrders measure="true" />}
        />
        <Route
          path="/engineer/view-customized-requests"
          element={<ViewCutomizedOrders measure="false" />}
        />
        <Route
          path="/e/order-details/:orderId"
          element={<OrderDetailsEnginer />}
        />
        {/* Private Factory Routes */}
        <Route
          path="/f/order-details/:orderId"
          element={<OrderDetailsFactory />}
        />
        {/* Private Operator Routes */}
        <Route
          path="/operator/view-product-orders"
          element={<ViewProductOrders />}
        />
        <Route path="*" element={<Page404 />} /> {/*The path not found.*/}
      </Routes>
      {shouldRenderHeaderAndFooter(location) && <Footer />}
    </>
  );
}

export default App;
