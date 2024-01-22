const initialState = {
  customer: {
    _id: '',
    userName: '',
    email: '',
    gander: '',
    address: '',
    phone: 0,
    points: 0,
    orderHistory: [],
    serviceHistory: [],
    customizedHistory: [],
    createdAt: '',
    updatedAt: '',
    token: '',
    verified: true,
  },
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CUSTOMER_LOGIN':
      return {
        ...state,
        customer: action.data,
      };

    default:
      return {
        state,
      };
  }
};

export default customerReducer;
