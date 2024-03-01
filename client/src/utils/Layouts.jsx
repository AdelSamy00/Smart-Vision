import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function CustomerLayout(){
  const { customer } = useSelector((state) => state.customer);
  return customer?._id ? <Outlet /> : <Navigate to="/login" />;
};
