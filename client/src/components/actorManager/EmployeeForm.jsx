import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Loading from "../../components/shared/Loading";
import "./styleSheets/EmployeeForm.css";
import { handleFileUpload } from "../../utils";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../../Language/translate";
let current = new Date();

function getmaxEmployeeDateOfBirth() {
  let currentYear = current.toISOString().substring(0, 4);
  let currentDayAndMonth = current.toISOString().substring(4, 10);
  let maxYear = +currentYear - 18;
  return `${maxYear}${currentDayAndMonth}`;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EmployeeForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const employeeAllTypes = [
    t("Engineer"),
    t("InventoryManager"),
    t("FactotyManager"),
    t("Presenter"),
    t("ActorManager"),
    t("Operator"),
  ];
  const qualificationAllTypes = [
    t("Bachelor's Degree"),
    t("Master's Degree"),
    t("Doctor of Philosophy"),
    t("Professional Certification (e.g., CPA, CFA)"),
    t("Diploma"),
    t("Associate Degree"),
    t("High School Diploma/GED"),
    t("Technical Certification"),
  ];
  const { employeeId } = useParams();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [address, setaddress] = useState("");
  const [qualification, setqualification] = useState("");
  const [employeeType, setemployeeType] = useState("");
  const [salary, setsalary] = useState("");
  const [image, setimage] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [PasswordConformed, setPasswordConformed] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteMessage, setshowDeleteMessage] = useState(false);
  const maxEmployeeDateOfBirth = getmaxEmployeeDateOfBirth();

  function setEmployeetData(employee) {
    setfirstName(employee?.firstName);
    setlastName(employee?.lastName);
    setemail(employee?.email);
    setgender(employee?.gender);
    setdateOfBirth(employee?.birthday?.substring(0, 10));
    setsalary(employee?.salary);
    setaddress(employee?.address);
    setqualification(employee?.qualification);
    setphone(employee?.phone);
    setimage(employee?.image);
    setemployeeType(employee?.jobTitle);
    setpassword(employee?.password);
    setconfirmpassword(employee?.password);
    setIsLoading(false);
  }

  async function handleDeleteEmployee() {
    try {
      await axios
        .delete(`/employees/`, {
          data: { id: employeeId },
        })
        .then((res) => {
          navigate("/actor/view-employees");
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddEmployee() {
    try {
      await axios
        .post(`/employees/`, {
          firstName,
          lastName,
          username: `${firstName} ${lastName}`,
          email,
          password,
          gender,
          jobTitle: employeeType,
          qualification,
          birthday: dateOfBirth,
          salary,
          phone,
          address,
          image,
        })
        .then((res) => {
          navigate("/actor/view-employees");
          // console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateEmployee() {
    try {
      await axios
        .put(`/employees/`, {
          employeeId,
          firstName,
          lastName,
          username: `${firstName} ${lastName}`,
          email,
          password,
          gender,
          jobTitle: employeeType,
          qualification,
          birthday: dateOfBirth,
          salary,
          phone,
          address,
          image,
        })
        .then((res) => {
          navigate("/actor/view-employees");
          // console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false || !PasswordConformed) {
      setValidated(true);
    } else {
      setIsLoading(true);
      employeeId ? handleUpdateEmployee() : handleAddEmployee();
      //const picture = image && (await handleFileUpload(image));
    }
  };

  async function getEmployee() {
    await axios
      .get(`/employees/${employeeId}`)
      .then((res) => {
        setEmployeetData(res?.data?.employee);
        //console.log(res?.data?.employee);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleAgreeDeleteProductMessage = () => {
    handleDeleteEmployee();
  };

  const handleDisagreeDeleteProductMessage = () => {
    setshowDeleteMessage(false);
  };

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
          <div className="employeeFormHeader" style={{ position: "relative" }}>
            <h2>{employeeId ? t("EditEmployee") : t("AddNewEmployee")}</h2>
            {employeeId ? (
              <button
                onClick={() => setshowDeleteMessage(true)}
                style={
                  i18n.language === "ar"
                    ? {
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }
                    : {}
                }
              >
                {t("delete")}
                <DeleteForeverIcon />
              </button>
            ) : null}
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="employeeFormDivForTowFields">
              <Form.Group className="InputGroup">
                <Form.Label htmlFor="firstName" className="FormLabel">
                  {t("firstName")}
                </Form.Label>
                <Form.Control
                  required
                  className="InputField"
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder={t("firstName")}
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="InputGroup">
                <Form.Label htmlFor="lastName" className="FormLabel">
                  {t("lastName")}
                </Form.Label>
                <Form.Control
                  required
                  className="InputField"
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder={t("lastName")}
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="employeeFormDivForTowFields">
              <Form.Group className="InputGroup">
                <Form.Label htmlFor="email" className="FormLabel">
                  {t("email")}
                </Form.Label>
                <Form.Control
                  required
                  className="InputField"
                  name="email"
                  id="email"
                  type="email"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className=" InputGroup ">
                <Form.Label htmlFor="phone" className="FormLabel">
                  {t("phone")}
                </Form.Label>
                <Form.Control
                  required
                  className="InputField employeePhoneInput"
                  name="phone"
                  id="phone"
                  type="number"
                  placeholder={t("phone")}
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="employeeFormDivForTowFields">
              <Form.Group className="InputGroup suEditProductCategoryAndPriceDiv ">
                <Form.Label className="FormLabel" htmlFor="gender">
                  {t("gender")}
                </Form.Label>
                <Form.Select
                  required
                  className="InputField"
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value="">{t("ChooseOption")}</option>
                  <option value="Male">{t("Male")}</option>
                  <option value="Female">{t("Female")}</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="InputGroup">
                <Form.Label htmlFor="dateOfBirth" className="FormLabel">
                  {t("dateOfBirth")}
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
                {t("address")}
              </Form.Label>
              <Form.Control
                required
                className="InputField "
                name="address"
                id="address"
                type="text"
                placeholder={t("address")}
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </Form.Group>

            <div className="employeeFormDivForTowFields">
              <Form.Group className="InputGroup suEditProductCategoryAndPriceDiv ">
                <Form.Label className="FormLabel" htmlFor="qualification">
                  {t("qualification")}
                </Form.Label>
                <Form.Select
                  required
                  className="InputField"
                  name="qualification"
                  id="qualification"
                  value={qualification}
                  onChange={(e) => setqualification(e.target.value)}
                >
                  <option value="">{t("ChooseOption")}</option>
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
                  {t("employeeType")}
                </Form.Label>
                <Form.Select
                  required
                  className="InputField"
                  name="employeeType"
                  id="employeeType"
                  value={employeeType}
                  onChange={(e) => setemployeeType(e.target.value)}
                >
                  <option value="">{t("ChooseOption")}</option>
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
                  {t("Salary")}
                </Form.Label>
                <Form.Control
                  required
                  className="InputField "
                  name="salary"
                  id="salary"
                  type="number"
                  placeholder={t("Salary")}
                  value={salary}
                  min={0}
                  onChange={(e) => setsalary(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="InputGroup ">
                <Form.Label className="FormLabel" htmlFor="uploadFile">
                  {t("photo")}
                </Form.Label>
                <div className="flex justify-items-center gap-2 mt-2">
                  <label
                    htmlFor="uploadFile"
                    className="text-gray-600 mt-2"
                    style={{ order: i18n.language === "ar" ? "2" : "1" }}
                  >
                    {t("UploadFile")}
                  </label>
                  <input
                    type="file"
                    id="uploadFile"
                    name="uploadFile"
                    className="uploadBtn file:hidden text-gray-700 bg-gray-300"
                    style={{
                      width: "145px",
                      order: i18n.language === "ar" ? "1" : "2",
                    }}
                    onChange={(e) => {
                      setimage(e.target.files[0]);
                    }}
                  />
                </div>
              </Form.Group>
            </div>
            {!employeeId ? (
              <div className="employeeFormDivForTowFields">
                <Form.Group className="InputGroup">
                  <Form.Label htmlFor="password" className="FormLabel">
                    {t("password")}
                  </Form.Label>
                  <Form.Control
                    required
                    className="InputField"
                    name="password"
                    id="password"
                    type="password"
                    placeholder={t("password")}
                    minLength={"8"}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t("Minimum 8 characters")}.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="InputGroup">
                  <Form.Label htmlFor="confirmpassword" className="FormLabel">
                    {t("confirmPassword")}
                  </Form.Label>
                  <Form.Control
                    isInvalid={!PasswordConformed}
                    className="InputField"
                    name="confirmpassword"
                    id="confirmpassword"
                    type="password"
                    minLength={"8"}
                    placeholder={t("confirmPassword")}
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t("notConfirmedoassword")}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            ) : null}
            <div className="flex justify-around flex-row-reverse ">
              <button
                type="submit"
                style={{ order: i18n.language === "ar" ? "2" : "1" }}
                className="text-2xl bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mb-4 h-16"
              >
                {t("save")}
              </button>
              <button
                style={{ order: i18n.language === "ar" ? "1" : "2" }}
                className="text-2xl bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl mb-4 h-16"
                onClick={(e) => {
                  e.preventDefault();
                  history.back();
                }}
              >
                {t("cancel")}
              </button>
            </div>
          </Form>
        </main>
      ) : (
        <div className="h-96">
          <Loading />
        </div>
      )}
      <Dialog
        open={showDeleteMessage}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDisagreeDeleteProductMessage}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: "25px", fontWeight: "bold" }}>
          {t("delete")} {t("employee")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {/* Are you sure you want to proceed with the deletion of this employee?
            <br />
            <br />
            This action cannot be undone and will permanently remove the
            employee from the database. */}
            {t("deleteConfirmationMessage")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDisagreeDeleteProductMessage}
            sx={{ marginRight: "auto" }}
          >
            {t("disagree")}
          </Button>
          <Button onClick={handleAgreeDeleteProductMessage}>
            {t("agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeForm;
