import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StyleSheets/CustomizedOrderDetails.css';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
// [
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848315/Smart%20Vision/vojtech-bruzek-Yrxr3bsPdS0-unsplash_ekmimc.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848324/Smart%20Vision/febrian-zakaria-2QTsCoQnoag-unsplash_vjvjwj.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848324/Smart%20Vision/febrian-zakaria-2QTsCoQnoag-unsplash_vjvjwj.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848324/Smart%20Vision/febrian-zakaria-2QTsCoQnoag-unsplash_vjvjwj.jpg',
//   'https://res.cloudinary.com/dkep2voqw/image/upload/v1705848329/Smart%20Vision/kenny-eliason-iAftdIcgpFc-unsplash_l33xyj.jpg',
// ];
function CustomizedOrderDetails({ order, employeeType }) {
  console.log(order);
  const images = order?.images;
  const customer = order?.customer;
  const engineer = order?.assignedEngineer;
  const pdf = order?.details;
  const date = order?.updatedAt?.substring(0, 10); // to take date only
  const [mainImage, setmainImage] = useState(images[0]);


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
            <p>
              <span>Description: </span>Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Architecto autem adipisci nobis explicabo
              veritatis facere, assumenda dolor delectus laudantium iure enim
              omnis atque ad beatae illo, repudiandae voluptatibus consequuntur
              veniam!
            </p>
            <p>
              <span>Date:</span> {date}
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
              {images.length ? (
                <div className="customizedOrderDetailsImages">
                  <div className="customizedOrderDetailsMainImageDiv">
                    <img
                      className="customizedOrderDetailsMainImage"
                      src={mainImage}
                    />
                  </div>
                  <div className="customizedOrderDetailsSubImagesDiv">
                    {images.map((image, idx) => {
                      return (
                        <img
                          key={idx}
                          className="customizedOrderDetailsSubImage"
                          src={image}
                          onClick={() => setmainImage(image)}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                  <div className="customizedOrderDetailsNoImages">
                    No photos are attached
                  </div>
                </>
              )}
              {employeeType === 'FACTORY' ? (
                <div className="customizedOrderDetailsPdfButton flex ">
                  <Link to={pdf}>Download PDF</Link>
                </div>
              ) : (
                <></>
              )}
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
            <Accordion.Item eventKey="3">
              <Accordion.Header>Enginer Data</Accordion.Header>
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
        ) : (
          <></>
        )}
        <Accordion.Item eventKey="4">
          <Accordion.Header>customer Data</Accordion.Header>
          <Accordion.Body>
            <p>
              <span>Name: </span> {customer?.username}
            </p>
            <p>
              <span>Email: </span> {customer?.email}
            </p>
            <p>
              <span>phone:</span> {customer?.phone}
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default CustomizedOrderDetails;
