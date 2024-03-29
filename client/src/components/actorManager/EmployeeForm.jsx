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
  let currentDate = current.toISOString().substring(0, 10);
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
  const [firstName, setfirstName] = useState();
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
  const [maxEmployeeDateOfBirth, setmaxEmployeeDateOfBirth] = useState(
    getmaxEmployeeDateOfBirth()
  );
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function setEmployeetData(employee) {
    setfirstName(employee?.firstName);
    setlastName(employee?.lastName);
    setemail(employee?.email);
    setgender(employee?.gender);
    setdateOfBirth(employee?.dateOfBirth);
    setsalary(employee?.salary);
    setaddress(employee?.address);
    setqualification(employee?.qualification);
    setphone(employee?.phone);
    setphoto(employee?.photo);
    setemployeeType(employee?.employeeType);
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false || !PasswordConformed) {
      setValidated(true);
    }  else {
      console.log('first');
      //setIsLoading(true);
      //const picture = photo && (await handleFileUpload(photo));
    }
  };
  console.log(PasswordConformed);
  async function getEmployee() {
    console.log('fired');
    // await axios
    //   .get(`/products/${employeeId}`)
    //   .then((res) => {
    //     setEmployeetData(res?.data?.product);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }
  useEffect(() => {
    //fired only when ther is employeeId (edit)
    employeeId && getEmployee();
  }, []);

  useEffect(() => {
    console.log('first2222222');
    setPasswordConformed(password === confirmpassword);
  }, [confirmpassword, password]);

  return (
    <>
      {!isLoading ? (
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="employeeFormMain"
        >
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
            <Form.Group className="InputGroup">
              <Form.Label className="FormLabel" htmlFor="gender">
                Gender
              </Form.Label>
              <Form.Select
                className="InputField"
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
              >
                <option value="" disabled>
                  Choose an option
                </option>
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
            <Form.Group className="InputGroup">
              <Form.Label className="FormLabel" htmlFor="qualification">
                Qualification
              </Form.Label>
              <Form.Select
                className="InputField"
                id="qualification"
                name="qualification"
                value={qualification}
                onChange={(e) => setqualification(e.target.value)}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {qualificationAllTypes.map((type, idx) => {
                  return (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="InputGroup">
              <Form.Label className="FormLabel" htmlFor="employeeType">
                Employee Type
              </Form.Label>
              <Form.Select
                className="InputField"
                id="employeeType"
                name="employeeType"
                value={employeeType}
                onChange={(e) => setemployeeType(e.target.value)}
              >
                <option value="" disabled>
                  Choose an option
                </option>
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
              <div className="flex mt-2">
                <input
                  type="file"
                  id="uploadFile"
                  name="uploadFile"
                  className="uploadBtn hidden text-gray-700 bg-gray-300 w-1/4"
                  onChange={(e) => setphoto(e.target.files[0])}
                />
                <label
                  htmlFor="uploadFile"
                  className="uploadBtn text-gray-700 bg-gray-300 cursor-pointer"
                >
                  Upload picture
                </label>
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
          <div className="flex justify-between flex-row-reverse">
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
      ) : (
        <div className="h-96">
          <Loading />
        </div>
      )}
    </>
  );
}

export default EmployeeForm;
