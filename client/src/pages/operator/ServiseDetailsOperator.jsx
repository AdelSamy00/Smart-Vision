import React, { useEffect, useState } from 'react';
import Loading from '../../components/shared/Loading';
import CustomizedOrderDetails from '../../components/shared/CustomizedOrderDetails';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ServiseDetailsOperator({ socket, setSocket }) {
  const [order, setorder] = useState();
  const [orderNumber, setorderNumber] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { serviceId } = useParams();

  async function getCustomizedOrderDetail() {
    await axios
      .get(`/employees/services/${serviceId}`)
      .then((res) => {
        setorder(res?.data?.service[0]);
        const First8IdDigets = res?.data?.service[0]?._id?.substring(0, 8); //to get first 8 diget in _Id
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
      {console.log(socket?.id)}
      {!isLoading ? (
        <main className="OrderDetailsFactoryMain">
          <h1>
            Order ID: <span>{orderNumber}</span>
          </h1>
          <CustomizedOrderDetails
            order={order}
            employeeType={'OPERATOR'}
            socket={socket}
            setSocket={setSocket}
          />
        </main>
      ) : (
        <div className="h-screen">
          <Loading />
        </div>
      )}
    </>
  );
}

export default ServiseDetailsOperator;
