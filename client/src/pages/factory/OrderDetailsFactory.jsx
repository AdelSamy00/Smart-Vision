import React, { useEffect, useState } from 'react';
import CustomizedOrderDetails from '../../components/shared/CustomizedOrderDetails';
import axios from 'axios';
import Loading from '../../components/shared/Loading';
import './StyleSheets/OrderDetailsFactory.css';
import { useParams } from 'react-router-dom';

function OrderDetailsFactory() {
  const [order, setorder] = useState();
  const [orderNumber, setorderNumber] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();

  async function getCustomizedOrderDetail() {
    await axios
      .get(`/employees/customizationOrders/${orderId}`)
      .then((res) => {
        setorder(res?.data?.customizationOrder);
        const First8IdDigets = res?.data?.customizationOrder?._id?.substring(
          0,
          8
        ); //to get first 8 diget in _Id
        setorderNumber(First8IdDigets);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCustomizedOrderDetail();
  }, []);

  return (
    <>
      {!isLoading ? (
        <main className="OrderDetailsFactoryMain">
          <h1>
            Order ID: <span>{orderNumber}</span>
          </h1>
          <CustomizedOrderDetails order={order} employeeType={'FACTORY'} />
        </main>
      ) : (
        <div className="h-screen">
          <Loading />
        </div>
      )}
    </>
  );
}

export default OrderDetailsFactory;
