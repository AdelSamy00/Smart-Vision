// ServicesDetails.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./StyleSheets/servicesdetails.css";
function ServicesDetails() {
  const { state } = useLocation();
  const service = state ? state.service : null;

  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    address: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ServicesDetails">
      <div className="ServicesDetailsContent">
        <h2 className="text-3xl font-bold mt-5 mb-3">{service.title}</h2>
        <img
          src={service.image_url}
          alt={service.title}
          width={200}
          height={200}
          className="imageServices"
        />
        <p
          className="text-gray-600 mt-3 descriptionServices"
          style={{ maxWidth: "80vw" }}
        >
          {service.description}
        </p>
      </div>
      <div className="formContent">
        <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
          If You Need To Book This Service Fill This Form .
        </h2>
        {/* Display form or success message based on formSubmitted state */}
        {formSubmitted ? (
          <p className="text-green-500 mt-3">
            Thank you! We will get in touch with you in a few days.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="ServiceName" className="userNameLabel">
              Service Name :
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
              className="userNameInput"
            />
            <label htmlFor="phoneNumber" className="phoneLabel">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="phoneInput"
            />
            <label htmlFor="address" className="adressLabel">
              Address:
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="adressInput"
            ></textarea>
            <label htmlFor="address" className="adressLabel">
              Description
            </label>
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              required
              className="adressInput"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ServicesDetails;
