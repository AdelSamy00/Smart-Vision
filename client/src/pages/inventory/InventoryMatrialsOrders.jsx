import { useEffect, useState } from 'react';
import Loading from '../../components/shared/Loading';
import MaterialOrder from '../../components/inventory/MaterialOrder';
import { apiRequest } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../redux/NotificationSlice';
import { Typography } from '@mui/material';
import { t } from 'i18next';

const InventoryMatrialsOrders = ({ socket, setSocket }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [matrials, setMatrials] = useState([]);
  const { notification } = useSelector((state) => state?.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await apiRequest({
          method: 'get',
          url: '/Employees/material-order',
          data: {},
        });
        setMatrials(response.data.materialOrders.reverse());
        setIsLoading(false);
        //console.log(response.data.materialOrders);
      } catch (error) {
        console.error(
          'Error fetching order history:',
          error.response.data.message
        );
      }
    }

    fetchOrderHistory();
  }, []);

  useEffect(() => {
    socket?.on('notifications', (data) => {
      ///console.log(data);
      //let number = getNumberOfNotifications(notification);
      dispatch(setNotification([...notification, data]));
    });
  }, [socket]);

  return (
    <div>
      {isLoading ? (
        <div className="mt-40">
          <Loading />
        </div>
      ) : (
        <div>
          {matrials?.length ? (
            <>
              {matrials?.map((matrial, index) => (
                <MaterialOrder
                  key={index}
                  matrial={matrial}
                  setMaterialls={setMatrials}
                />
              ))}
            </>
          ) : (
            <Typography
              variant="body1"
              style={{
                padding: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '5px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '25px',
                width: '80vw',
                marginTop: '5rem ',
                marginInline: 'auto',
              }}
            >
              {t('noRequestsAtTheMoment')}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default InventoryMatrialsOrders;
