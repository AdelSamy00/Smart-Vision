import React, { isValidElement, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Loading from '../../components/shared/Loading';
import './styleSheets/EmployeeForm.css';
import { handleFileUpload } from '../../utils';

let current = new Date();

function getmaxEmployeeDateOfBirth() {
  let currentYear = current.toISOString().substring(0, 4);
  let currentDayAndMonth = current.toISOString().substring(4, 10);
  let maxYear = +currentYear - 18;
  return `${maxYear}${currentDayAndMonth}`;
}

const employeeAllTypes = [
  'engineer',
  'inventory manager',
  'factory',
  'presenter',
  'actor manager',
  'operator',
];
const qualificationAllTypes = [
  "Bachelor's Degree",
  "Master's Degree",
  'Doctor of Philosophy',
  'Professional Certification (e.g., CPA, CFA)',
  'Diploma',
  'Associate Degree',
  'High School Diploma/GED',
  'Technical Certification',
];
function EmployeeForm() {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [gender, setgender] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [address, setaddress] = useState('');
  const [qualification, setqualification] = useState('');
  const [employeeType, setemployeeType] = useState('');
  const [salary, setsalary] = useState('');
  const [photo, setphoto] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [PasswordConformed, setPasswordConformed] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const maxEmployeeDateOfBirth = getmaxEmployeeDateOfBirth();

  function setEmployeetData(employee) {
    setfirstName(employee?.firstName);
    setlastName(employee?.lastName);
    setemail(employee?.email);
    setgender(employee?.gender);
    setdateOfBirth(employee?.birthday.substring(0, 10));
    setsalary(employee?.salary);
    setaddress(employee?.address);
    setqualification(employee?.qualification);
    setphone(employee?.phone);
    setphoto(employee?.photo);
    setemployeeType(employee?.jobTitle);
    setpassword(employee?.password);
    setconfirmpassword(employee?.password);
    setIsLoading(false);
  }

  async function handleDeleteEmployee() {
    console.log('handleDeleteEmplyee');
    try {
      await axios
        .delete(`/employees/`, {
          data: { id: employeeId },
        })
        .then((res) => {
          navigate('/');
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddEmployee() {}
  function handleUpdateEmployee() {}

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false || !PasswordConformed) {
      setValidated(true);
    } else {
      console.log('first');
      setIsLoading(true);
      employeeId ? handleUpdateEmployee() : handleAddEmployee();
      //const picture = photo && (await handleFileUpload(photo));
    }
  };

  async function getEmployee() {
    await axios
      .get(`/employees/${employeeId}`)
      .then((res) => {
        console.log(res?.data?.employee);
        setEmployeetData(res?.data?.employee);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    //fired only when there is employeeId (edit)
    employeeId ? getEmployee() : setIsLoading(false);
  }, []);

  useEffect(() => {
    setPasswordConformed(password === confirmpassword);
  }, [confirmpassword, password]);

  return (
    <>
      {!isLoading ? (
        <main className="employeeFormMain">
          <div className="employeeFormHeader">
            <h2>{employeeId ? 'Edit' : 'Add'} Employee</h2>
            {employeeId ? (
              <button onClick={handleDeleteEmployee}>
                Delete
                <DeleteForeverIcon />
              </button>
            ) : null}
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="employeeFormDivForTowFields">
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
            <div className="employeeFormDivForTowFields">
              <Form.Group className="InputGroup">
                <Form.Label htmlFor="email" className="FormLabel">
                  Email
                </Form.Label>
                <Form.Control
                  required
                  className="InputField"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className=" InputGroup ">
                <Form.Label htmlFor="phone" className="FormLabel">
                  Phone
                </Form.Label>
                <Form.Control
                  required
                  className="InputField employeePhoneInput"
                  name="phone"
                  id="phone"
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="employeeFormDivForTowFields">
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
              <Form.Group className="InputGroup">
                <Form.Label htmlFor="dateOfBirth" className="FormLabel">
                  Date of birth
                </Form.Label>
                <Form.Control
                  required
                  className="InputField "
                  name="dateOfBirth"
                  id="dateOfBirth"
                  type="date"
                  max={maxEmployeeDateOfBirth}
                  value={dateOfBirth}
                  onChange={(e) => setdateOfBirth(e.target.value)}
                />
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

            <div className="employeeFormDivForTowFields">
              <Form.Group className="InputGroup suEditProductCategoryAndPriceDiv ">
                <Form.Label className="FormLabel" htmlFor="qualification">
                  Qualification
                </Form.Label>
                <Form.Select
                  required
                  className="InputField"
                  name="qualification"
                  id="qualification"
                  value={qualification}
                  onChange={(e) => setqualification(e.target.value)}
                >
                  <option value="">Choose a option</option>
                  {qualificationAllTypes.map((type, idx) => {
                    return (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="InputGroup suEditProductCategoryAndPriceDiv ">
                <Form.Label className="FormLabel" htmlFor="employeeType">
                  Employee Type
                </Form.Label>
                <Form.Select
                  required
                  className="InputField"
                  name="employeeType"
                  id="employeeType"
                  value={employeeType}
                  onChange={(e) => setemployeeType(e.target.value)}
                >
                  <option value="">Choose a option</option>
                  {employeeAllTypes.map((type, idx) => {
                    return (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="employeeFormDivForTowFields">
              <Form.Group className="InputGroup">
                <Form.Label className="FormLabel" htmlFor="salary">
                  Salary
                </Form.Label>
                <Form.Control
                  required
                  className="InputField "
                  name="salary"
                  id="salary"
                  type="number"
                  placeholder="Salary"
                  value={salary}
                  min={0}
                  onChange={(e) => setsalary(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="InputGroup ">
                <Form.Label className="FormLabel" htmlFor="uploadFile">
                  Photo
                </Form.Label>
                <div className="flex justify-items-center gap-2 mt-2">
                  <label htmlFor="uploadFile" className="text-gray-600 mt-2">
                    Upload File
                  </label>
                  <input
                    type="file"
                    id="uploadFile"
                    name="uploadFile"
                    className="uploadBtn file:hidden text-gray-700 bg-gray-300"
                    style={{ width: '145px' }}
                    onChange={(e) => {
                      setphoto(e.target.files[0]);
                    }}
                  />
                </div>
              </Form.Group>
            </div>
            <div className="employeeFormDivForTowFields">
              <Form.Group className="InputGroup">
                <Form.Label htmlFor="password" className="FormLabel">
                  Password
                </Form.Label>
                <Form.Control
                  required
                  className="InputField"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  minLength={'8'}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Minimum 8 characters.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="InputGroup">
                <Form.Label htmlFor="confirmpassword" className="FormLabel">
                  confirm Password
                </Form.Label>
                <Form.Control
                  isInvalid={!PasswordConformed}
                  className="InputField"
                  name="confirmpassword"
                  id="confirmpassword"
                  type="password"
                  minLength={'8'}
                  placeholder="confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Password not Conform.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
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

export default EmployeeForm;
