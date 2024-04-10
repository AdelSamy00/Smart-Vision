import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  InventoryMatrialsOrders,
  InventoryProductOrders,
  InventoryMaterialTransactions,
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
  ViewMeasuredCutomizedOrders,
  OrderDetailsEnginer,
} from './pages/engineer/index.js';
import {
  ViewProductOrders,
  ViewServiceOrder,
  ServiseDetailsOperator,
  AddCustomer,
  EditCustomer,
  ViewCustomers,
} from './pages/operator/index.js';

import {
  AddEmployee,
  ChangeEmpPassword,
  EditEmployee,
  ViewEmployees,
} from './pages/actorManager/index.js';
import { OrderDetailsFactory } from './pages/factory/index.js';
import OrderComponent from './components/e-commers/OrderComponent.jsx';
import AddProductForm from './components/inventory/AddProductFrom';
import AddMatrialForm from './components/inventory/AddMatrialForm';
import UpdateProductForm from './components/inventory/UpdateProductForm';
import UpdateMatrialForm from './components/inventory/UpdateMatrialeForm';
import {
  shouldRenderEmployeeHeader,
  shouldRenderECommersHeader,
  shouldRenderECommersFooter,
} from './utils/ShouldRender.jsx';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import EmployeeHeader from './components/shared/EmployeeHeader.jsx';
import EditProductForm from './components/Presenter/EditProductPresenter.jsx';

function App() {
  const location = useLocation();
  const { customer } = useSelector((state) => state.customer);
  const { employee } = useSelector((state) => state.employee);
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: customer?.token ? `Bearer ${customer?.token}` : '',
  };
  //add by adel
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (customer?.email || employee?.email) {
      setSocket(io(import.meta.env.VITE_APP_SERVER_URL));
    }
  }, []);
  useEffect(() => {
    async function getConnection() {
      if (customer?.email) {
        await socket?.emit('newUser', { user: customer });
      }
    }
    getConnection();
  }, [socket, customer]);
  useEffect(() => {
    async function getConnection() {
      if (employee?.email) {
        await socket?.emit('newUser', { user: employee });
      }
    }
    getConnection();
  }, [socket, employee]);

  return (
    <>
      {shouldRenderECommersHeader(location) ||
        shouldRenderEmployeeHeader(location, socket, setSocket)}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/employee" element={<EmployeLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/services/:serviceName"
          element={<ServicesDetails socket={socket} setSocket={setSocket} />}
        />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:productId" element={<ProductDetails />} />{' '}
        <Route path="/bag" element={<Bag />} />
        {/* Private Customer Routes (Logged in) */}
        <Route element={<CustomerLayout />}>
          <Route
            path="/profile"
            element={<Profile socket={socket} setSocket={setSocket} />}
          />
          <Route path="/profile/profile-details" element={<ProfileDetails />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />
          <Route
            path="/profile/delete-account"
            element={<DeleteAccountPage />}
          />
          <Route path="/favourites" element={<Favourites />} />
          <Route
            path="/checkout"
            element={<Checkout socket={socket} setSocket={setSocket} />}
          />
          <Route path="/history" element={<History />} />
        </Route>
        {/* Private Inventory Manager Routes */}
        <Route path="/inventory" element={<InventoryHome />} />
        <Route path="/order" element={<OrderComponent />} />
        <Route path="/addProduct" element={<AddProductForm />} />
        <Route path="/addMatrial" element={<AddMatrialForm />} />
        <Route path="/transactions-history" element={<TransactionHistory />} />
        <Route
          path="/inventory-Order-matrials"
          element={
            <InventoryMatrialsOrders socket={socket} setSocket={setSocket} />
          }
        />
        <Route
          path="/inventory-Order-products"
          element={<InventoryProductOrders />}
        />
        <Route
          path="/updateProduct/:productId"
          element={<UpdateProductForm />}
        />
        <Route
          path="/updateMatrial/:matrialId"
          element={<UpdateMatrialForm />}
        />
        <Route path="/Transaction" element={<TransactionsPage />} />
        <Route
          path="/all-transactions"
          element={<InventoryMaterialTransactions />}
        />
        {/* Private Presenter Routes */}
        <Route
          path="/p/product/:productId"
          element={<ProductDetailsPresenter />}
        />
        <Route path="/presenter-home" element={<HomePresenter />} />
        <Route path="/presenter-view" element={<PresenterProductsView />} />
        <Route path="/ed/product/:productId" element={<EditProduct />} />
        <Route
          path="addtoStore/product/:productId"
          element={<EditProductForm />}
        />
        {/* Private Enginer Routes */}
        <Route
          path="/engineer/send-request/:requestId"
          element={<CustomOrderForm socket={socket} setSocket={setSocket} />}
        />
        <Route
          path="/engineer/view-measured-customized-requests"
          element={
            <ViewMeasuredCutomizedOrders
              socket={socket}
              setSocket={setSocket}
            />
          }
        />
        <Route
          path="/engineer/view-customized-requests"
          element={
            <ViewCutomizedOrders socket={socket} setSocket={setSocket} />
          }
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
          element={<ViewProductOrders socket={socket} setSocket={setSocket} />}
        />
        <Route
          path="/operator/view-Service-orders"
          element={<ViewServiceOrder socket={socket} setSocket={setSocket} />}
        />
        <Route
          path="/operator/servise-details/:serviceId"
          element={
            <ServiseDetailsOperator socket={socket} setSocket={setSocket} />
          }
        />
        <Route path="/operator/add-customer" element={<AddCustomer />} />
        <Route
          path="/operator/edit-customer/:customerId"
          element={<EditCustomer />}
        />
        <Route path="/operator/view-customers" element={<ViewCustomers />} />
        {/* Private actor manager Routes */}
        <Route path="/actor/add-employee" element={<AddEmployee />} />
        <Route path="/actor/view-employees" element={<ViewEmployees />} />
        <Route
          path="/actor/edit-employee/:employeeId"
          element={<EditEmployee />}
        />
         <Route
          path="/actor/change-password/:employeeId"
          element={<ChangeEmpPassword />}
        />
        {/*The path not found.*/}
        <Route path="*" element={<Page404 />} />
      </Routes>
      {shouldRenderECommersFooter(location)}
    </>
  );
}

export default App;
