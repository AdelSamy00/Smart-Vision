import React, { useEffect, useState } from 'react';
import CustomizedOrderDetails from '../../components/shared/CustomizedOrderDetails';
import axios from 'axios';
import Loading from '../../components/shared/Loading';
import '../factory/StyleSheets/OrderDetailsFactory.css';
import { Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

function OrderDetailsEnginer() {
  const [order, setorder] = useState();
  const [orderNumber, setorderNumber] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();


  async function getCustomizedOrderDetail() {
    await axios
      .get(`/employees/services/${orderId}`)
      .then((res) => {
        console.log(res);
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
      {!isLoading ? (
        <main className="OrderDetailsFactoryMain">
          <div className="flex flex-wrap justify-between my-4">
            <h1 className="m-0o">
              Order ID: <span>{orderNumber}</span>
            </h1>
            <Link
              to={`/engineer/send-order/${order?._id}`}
              className="link-style  "
            >
              <Button
                variant="contained"
                color="primary"
                className="add-to-store-button"
                style={{
                  background:
                    'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  textTransform: 'capitalize',
                  height: 50,
                  padding: '0px 10px',
                  fontSize: '20px',
                  fontWeight: '600',
                }}
              >
                {' '}
                Send Order To Factory
              </Button>
            </Link>
          </div>
          <CustomizedOrderDetails order={order} employeeType={'ENGINEER'} />
        </main>
      ) : (
        <div className="h-screen">
          <Loading />
        </div>
      )}
    </>
  );
}

export default OrderDetailsEnginer;
