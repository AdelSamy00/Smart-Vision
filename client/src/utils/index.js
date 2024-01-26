import axios from 'axios';

export const getCustomerInfo = async (token) => {
  try {
    const res = await axios.get(`/customers/get-customer/${token}`);
    return res.data.customer;
  } catch (error) {
    console.log(error);
  }
};
