import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerInfo } from '../utils';
import { SetCustomer } from '../redux/CustomerSlice';
function Home() {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.customer);
  const getCustomer = async () => {
    const res = await getCustomerInfo(customer?.token);
    //console.log(res);
    const newData = { token: customer?.token, ...res };
    dispatch(SetCustomer(newData));
  };

  useEffect(() => {
    getCustomer();
  }, []);
  return <div>Home</div>;
}

export default Home;
