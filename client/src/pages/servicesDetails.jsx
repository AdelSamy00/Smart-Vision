import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./StyleSheets/servicesdetails.css";
function ServicesDetails() {
  const { state } = useLocation();
  const service = state ? state.service : null;
  const { customer } = useSelector((state) => state.customer);

  const [formData, setFormData] = useState({
    ServiceName: "",
    phoneNumber: "",
    address: "",
    description: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/customers/service", {
        id: customer._id,
        service: service.title,
        description: formData.description,
      });
      if (response.data.success) {
        setFormSubmitted(true);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to submit the form:", error.response.data.message);
    }
  };
  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ServicesDetails" style={{margin:"30px"}}>
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
        {formSubmitted ? (
          <div>
            <p className="text-green-500 mt-3">
              Thank you! We will get in touch with you in a few days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="ServiceName" className="userNameLabel">
              Service Name :
            </label>
            <input
              type="text"
              id="ServiceName"
              name="ServiceName"
              className="userNameInput"
              value={service.title}
              onChange={handleInputChange}
              required
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
            <label htmlFor="description" className="adressLabel">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="adressInput"
            ></textarea>
            <button
              type="submit"
              style={{
                backgroundColor: "#009688",
                color: "white",
                padding: "10px 20px",
                border: "none", 
                borderRadius: "5px",
                cursor:"pointer", 
              }}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ServicesDetails;
