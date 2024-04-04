import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Loading from '../shared/Loading';
import './styleSheets/CustomerForm.css';

function CustomerForm() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [phone, setphone] = useState('');
  const [gender, setgender] = useState('');
  const [address, setaddress] = useState('');
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function setCustomertData(customer) {
    setfirstName(customer?.firstName);
    setlastName(customer?.lastName);
    setgender(customer?.gender);
    setaddress(customer?.address);
    setphone(customer?.phone);
    setIsLoading(false);
  }

  async function handleDeleteCustomer() {
    console.log('handleDeleteEmplyee');
    // try {
    //   await axios
    //     .delete(`/customers/`, {
    //       data: { id: customerId },
    //     })
    //     .then((res) => {
    //       navigate('/');
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  function handleAddCustomer() {
    console.log('AddCustomer');
  }
  function handleUpdateCustomer() {
    console.log('UpdateCustomer');
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setIsLoading(true);
      customerId ? handleUpdateCustomer() : handleAddCustomer();
    }
  };

  async function getCustomer() {
    console.log('getCustomer function');
    // await axios
    //   .get(`/customers/${customerId}`)
    //   .then((res) => {
    //     console.log(res?.data?.customer);
    //     setCustomertData(res?.data?.customer);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }
  useEffect(() => {
    //fired only when there is customerId (edit)
    customerId ? getCustomer() : setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading ? (
        <main className="customerFormMain">
          <div className="customerFormHeader">
            <h2>{customerId ? 'Edit' : 'Add'} Customer</h2>
            {customerId ? (
              <button onClick={handleDeleteCustomer}>
                Delete
                <DeleteForeverIcon />
              </button>
            ) : null}
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="customerFormDivForTowFields">
              <Form.Group className="InputGroup">
                <Form.Label htmlFor="firstName" className="FormLabel">
                  First Name
                </Form.Label>
                <Form.Control
                  required
                  className="InputField"
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="InputGroup">
                <Form.Label htmlFor="lastName" className="FormLabel">
                  Last Name
                </Form.Label>
                <Form.Control
                  required
                  className="InputField"
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="last Name"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="customerFormDivForTowFields">
              <Form.Group className=" InputGroup ">
                <Form.Label htmlFor="phone" className="FormLabel">
                  Phone
                </Form.Label>
                <Form.Control
                  required
                  className="InputField customerPhoneInput"
                  name="phone"
                  id="phone"
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="InputGroup suEditProductCategoryAndPriceDiv ">
                <Form.Label className="FormLabel" htmlFor="gender">
                  Gender
                </Form.Label>
                <Form.Select
                  required
                  className="InputField"
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value="">Choose a option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
            </div>
            <Form.Group className="InputGroup">
              <Form.Label htmlFor="address" className="FormLabel">
                Address
              </Form.Label>
              <Form.Control
                required
                className="InputField "
                name="address"
                id="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </Form.Group>
            <div className="flex justify-around flex-row-reverse ">
              <button
                type="submit"
                className="text-2xl bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mb-4 h-16"
              >
                Save
              </button>
              <button
                className="text-2xl bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl mb-4 h-16"
                onClick={(e) => {
                  e.preventDefault();
                  history.back();
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        </main>
      ) : (
        <div className="h-96">
          <Loading />
        </div>
      )}
    </>
  );
}

export default CustomerForm;
