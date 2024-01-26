import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/Customer/CustomerAction';
function Home() {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.customer);
  const getCustomer = async () => {
    console.log(customer);
    /* const res = await getCustomerInfo(customer?._id, customer?.token);
    const newData = { token: user?.token, ...res };
    dispatch(login(newData)); */
  };

  useEffect(() => {
    getCustomer();
  }, []);
  return <div>Home</div>;
}

export default Home;
