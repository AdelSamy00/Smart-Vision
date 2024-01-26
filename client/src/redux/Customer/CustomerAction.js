export const login = (customer) => {
  return {
    type: 'CUSTOMER_LOGIN',
    data: customer,
  };
};
