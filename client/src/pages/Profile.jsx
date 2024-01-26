import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import { SetCustomer } from '../redux/CustomerSlice';
import { getCustomerInfo } from '../utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCustomer = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const res = await getCustomerInfo(token);
      //console.log(res);
      const newData = { token, ...res };
      dispatch(SetCustomer(newData));
    }
  };

  useEffect(() => {
    //getCustomer();
  }, []);
  return (
    <>
      <div>Profile</div>
    </>
  );
}

export default Profile;
