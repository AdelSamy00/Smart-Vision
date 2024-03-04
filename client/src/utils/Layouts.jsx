import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const defaultEmployeeNavigate = 'e/login';

export function CustomerLayout() {
  const { customer } = useSelector((state) => state.customer);
  return customer?._id ? <Outlet /> : <Navigate to="/login" />;
}

export function InventoryManagerLayout() {
  const { employee } = useSelector((state) => state.employee);
  if (employee?.jobTitle === 'Inventory Manager') {
    return <Outlet />;
  }
  return <Navigate to={defaultEmployeeNavigate} />;
}

export function EngineerLayout() {
  const { employee } = useSelector((state) => state.employee);
  if (employee?.jobTitle === 'Engineer') {
    return <Outlet />;
  }
  return <Navigate to={defaultEmployeeNavigate} />;
}

export function PresenterLayout() {
  const { employee } = useSelector((state) => state.employee);
  if (employee?.jobTitle === 'Presenter') {
    return <Outlet />;
  }
  return <Navigate to={defaultEmployeeNavigate} />;
}

export function FactoryLayout() {
  const { employee } = useSelector((state) => state.employee);
  if (employee?.jobTitle === 'Factory') {
    return <Outlet />;
  }
  return <Navigate to={defaultEmployeeNavigate} />;
}

export function OperatorLayout() {
  const { employee } = useSelector((state) => state.employee);
  if (employee?.jobTitle === 'Operator') {
    return <Outlet />;
  }
  return <Navigate to={defaultEmployeeNavigate} />;
}