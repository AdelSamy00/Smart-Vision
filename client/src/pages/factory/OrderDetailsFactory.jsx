import React, { useEffect, useState } from 'react';
import CustomizedOrderDetails from '../../components/shared/CustomizedOrderDetails';
import axios from 'axios';
import Loading from '../../components/shared/Loading';
import './StyleSheets/OrderDetailsFactory.css';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../utils';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

function OrderDetailsFactory() {
  const { t } = useTranslation();
  const { employee } = useSelector((state) => state?.employee);
  const [order, setorder] = useState();
  const [orderNumber, setorderNumber] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();

  async function getCustomizedOrderDetail() {
    const response = await apiRequest({
      method: 'GET',
      url: `/employees/operator/services/${orderId}`,
      token: employee?.token,
    });
    console.log(response);
    if (response?.data?.success) {
      setorder(response?.data?.service[0]);
      const First8IdDigets = response?.data?.service[0]?._id?.substring(0, 8); //to get first 8 diget in _Id
      setorderNumber(First8IdDigets);
      setIsLoading(false);
    } else if (response) {
      toast.dismiss();
      toast.error('Faild to get customization orders');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCustomizedOrderDetail();
  }, []);

  return (
    <>
      <Toaster />
      {!isLoading ? (
        <main className="OrderDetailsFactoryMain">
          <h1>
            {t('orderId')}: <span>{orderNumber}</span>
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
