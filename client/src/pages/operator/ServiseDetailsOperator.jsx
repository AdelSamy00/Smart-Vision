import React, { useEffect, useState } from 'react';
import Loading from '../../components/shared/Loading';
import CustomizedOrderDetails from '../../components/shared/CustomizedOrderDetails';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../utils';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
function ServiseDetailsOperator({ socket, setSocket }) {
  const { employee } = useSelector((state) => state?.employee);
  const { t } = useTranslation();
  const [order, setorder] = useState();
  const [orderNumber, setorderNumber] = useState();
  const [from, setfrom] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { serviceId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const from = params.get('from');
    setfrom(from);
    console.log(from);
  }, [location.search]);
  async function getCustomizedOrderDetail() {
    const response = await apiRequest({
      url: `/employees/operator/services/${serviceId}`,
      method: 'GET',
      token: employee?.token,
    });
    if (response?.data?.success) {
      setorder(response?.data?.service[0]);
      const First8IdDigets = response?.data?.service[0]?._id?.substring(0, 8); //to get first 8 diget in _Id
      setorderNumber(First8IdDigets);
      setIsLoading(false);
    } else {
      toast.dismiss();
      toast.error('Failed to get service order details');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCustomizedOrderDetail();
  }, []);

  return (
    <>
      <Toaster />
      {console.log(socket?.id)}
      {!isLoading ? (
        <main className="OrderDetailsFactoryMain">
          <h1>
            {t('orderId')}: <span>{orderNumber}</span>
          </h1>
          <CustomizedOrderDetails
            order={order}
            employeeType={'OPERATOR'}
            socket={socket}
            setSocket={setSocket}
            from={from}
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
