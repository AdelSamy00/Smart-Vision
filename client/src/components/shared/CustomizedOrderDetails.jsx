import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './StyleSheets/CustomizedOrderDetails.css';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const tempImages = [
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848315/Smart%20Vision/vojtech-bruzek-Yrxr3bsPdS0-unsplash_ekmimc.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848324/Smart%20Vision/febrian-zakaria-2QTsCoQnoag-unsplash_vjvjwj.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848324/Smart%20Vision/febrian-zakaria-2QTsCoQnoag-unsplash_vjvjwj.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848324/Smart%20Vision/febrian-zakaria-2QTsCoQnoag-unsplash_vjvjwj.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848324/Smart%20Vision/febrian-zakaria-2QTsCoQnoag-unsplash_vjvjwj.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848324/Smart%20Vision/febrian-zakaria-2QTsCoQnoag-unsplash_vjvjwj.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848324/Smart%20Vision/febrian-zakaria-2QTsCoQnoag-unsplash_vjvjwj.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848329/Smart%20Vision/kenny-eliason-iAftdIcgpFc-unsplash_l33xyj.jpg',
// ];
function CustomizedOrderDetails({ order, employeeType }) {
  console.log(order);
  let current = new Date();
  const images = order?.images;
  const customer = order?.customer;
  const engineer = order?.assignedEngineer;
  const pdf = order?.details;
  const orderDate = order?.updatedAt?.substring(0, 10); // to take date only
  const [mainImage, setmainImage] = useState(images ? images[0] : null);
  const [assignedEngineer, setassignedEngineer] = useState(null);
  const [measuringDate, setmeasuringDate] = useState(null);
  const [measuringTime, setmeasuringTime] = useState(null);
  const [minMeasuringTime, setminMeasuringTime] = useState('10:00');
  const [validated, setValidated] = useState(false);
  const [allEngineers, setallEngineers] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  async function getAllEngineers() {
    await axios
      .get(`/employees/engineer`)
      .then((res) => {
        setallEngineers(res?.data?.engineers);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllEngineers();
  }, []);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      await axios
        .post(
          `/employees/engineer`,
          measuringDate
            ? {
                engineerId: assignedEngineer,
                serviceId: order?._id,
                date: {
                  day: measuringDate,
                  time: measuringTime,
                },
              }
            : {
                engineerId: assignedEngineer,
                serviceId: order?._id,
              }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function getMinMeasuringDateToday() {
      const currentTime = current.toTimeString().substring(0, 5);
      let currentHoure = currentTime.substring(0, 2);
      let currentMineates = currentTime.substring(3);
      let minHoure = +currentHoure + 1;
      if (minHoure === 24) {
        minHoure = '00';
      }
      if (minHoure < 10) {
        minHoure = `0${minHoure}`;
      }
      return `${minHoure}:${currentMineates}`;
    }

    function CheckMinMesuringTimeToday() {
      if (measuringDate === current.toISOString().substring(0, 10)) {
        //to set with the current time
        setminMeasuringTime(getMinMeasuringDateToday());
      } else {
        setminMeasuringTime('10:00');
      }
    }

    useEffect(() => {
      CheckMinMesuringTimeToday();
    }, [measuringDate]);
  };

  const handleCancelMessage = () => {
    setShowMessage(false);
  };
  return (
    <>
      <Accordion
        defaultActiveKey={['0', '1']}
        alwaysOpen
        className="CustomizedOrderAccordion"
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Details</Accordion.Header>
          <Accordion.Body>
            <p className="mb-6">
              <span className="block">Description: </span>
              {order?.description}
            </p>
            <p>
              <span>Date:</span> {orderDate}
            </p>
            <p>
              <span>State:</span> {order?.state.toLowerCase()}.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Atachments</Accordion.Header>
          <Accordion.Body>
            <div className="customizedOrderDetailsAtachments">
              {images?.length ? (
                <>
                  <Dialog
                    open={showMessage}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCancelMessage}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogContent sx={{ position: 'relative', padding: '0' }}>
                      <CloseIcon
                        onClick={handleCancelMessage}
                        sx={{
                          fontSize: '30px',
                          color: 'black',
                          cursor: 'pointer',
                          marginLeft: 'auto',
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          margin: '.5rem',
                        }}
                      />
                      <img width={550} className="h-96" src={mainImage} />
                    </DialogContent>
                  </Dialog>
                  <div className="customizedOrderDetailsSubImagesDiv">
                    {images.map((image, idx) => {
                      return (
                        <img
                          key={idx}
                          className="customizedOrderDetailsSubImage"
                          src={image}
                          onClick={() => {
                            setmainImage(image);
                            setTimeout(() => setShowMessage(true), 20);
                          }}
                        />
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="customizedOrderDetailsNoImages">
                  No photos are attached
                </div>
              )}
              {employeeType === 'FACTORY' ? (
                <div className="customizedOrderDetailsPdfButton flex ">
                  <Link to={pdf}>Download PDF</Link>
                </div>
              ) : null}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {employeeType === 'FACTORY' ? (
          <>
            {' '}
            <Accordion.Item eventKey="2" className="TapleDiv">
              <Accordion.Header>Materials</Accordion.Header>
              <Accordion.Body className="CustomizedOrderAccordion AccordionMaterialTaple">
                <Table striped bordered responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </>
        ) : null}
        <Accordion.Item eventKey="4">
          <Accordion.Header>customer Data</Accordion.Header>
          <Accordion.Body>
            <p>
              <span>Name: </span> {customer?.username}
            </p>
            {employeeType !== 'FACTORY' ? (
              <>
                <p>
                  <span>Email: </span> {customer?.email}
                </p>
                <p>
                  <span>phone:</span> 0{customer?.phone} - 0{order?.phone}
                </p>
                <p>
                  <span>Address:</span> {order?.address}
                </p>
              </>
            ) : null}
            {employeeType !== 'FACTORY' && order?.date ? (
              <p>
                <span>Measuring Date: </span>
                {order?.date?.day} - {order?.date?.time}
              </p>
            ) : null}
          </Accordion.Body>
        </Accordion.Item>
        {employeeType !== 'ENGINEER' && engineer ? (
          <>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Engineer Data</Accordion.Header>
              <Accordion.Body>
                <p>
                  <span>Name: </span> {engineer?.username}
                </p>
                <p>
                  <span>Email: </span> {engineer?.email}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </>
        ) : null}
        {employeeType === 'OPERATOR' && !engineer ? (
          <Accordion.Item eventKey="5">
            <Accordion.Header>Assign Engineer</Accordion.Header>
            <Accordion.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="assignEngineerForm"
              >
                <Form.Group className="InputGroup">
                  <Form.Label
                    className="FormLabel text-2xl font-bold"
                    htmlFor="assignedEngineer"
                  >
                    Choose Engineer
                  </Form.Label>
                  <Form.Select
                    required
                    className="InputField"
                    name="assignedEngineer"
                    id="assignedEngineer"
                    onChange={(e) => setassignedEngineer(e.target.value)}
                  >
                    <option value="">Choose an Engineer</option>
                    {allEngineers?.map((engineer, idx) => {
                      return (
                        <option key={idx} value={engineer?._id}>
                          {engineer?.username?.toLowerCase()}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                {/* only show when the coustomer need measuring */}
                {/* {1 > 2 ? (
                  <> */}
                <Form.Group className="InputGroup">
                  <Form.Label
                    className="FormLabel text-2xl font-bold"
                    htmlFor="measuringDate"
                  >
                    Date for measuring
                  </Form.Label>
                  <Form.Control
                    required
                    className="InputField"
                    name="measuringDate"
                    id="measuringDate"
                    type="date"
                    //The current date is the minimum date.
                    min={current.toISOString().substring(0, 10)}
                    onChange={(e) => setmeasuringDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="InputGroup">
                  <Form.Label
                    className="FormLabel text-2xl font-bold"
                    htmlFor="measuringTime"
                  >
                    Time <span className="text-base">(10:00AM - 22:00PM)</span>
                  </Form.Label>
                  <Form.Control
                    required
                    className="InputField"
                    name="measuringTime"
                    id="measuringTime"
                    type="time"
                    min={minMeasuringTime}
                    max="22:00"
                    onChange={(e) => setmeasuringTime(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Choose a valid time and after one hour.
                  </Form.Control.Feedback>
                </Form.Group>
                {/* </>
                ) : null} */}
                <div className=" assignEnginterButtonDiv">
                  <button
                    type="submit"
                    className="text-2xl bg-gray-900 hover:bg-black text-white font-bold rounded-xl h-fit px-4 py-3 m-auto"
                  >
                    Assign
                  </button>
                </div>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        ) : null}
      </Accordion>
    </>
  );
}

export default CustomizedOrderDetails;
