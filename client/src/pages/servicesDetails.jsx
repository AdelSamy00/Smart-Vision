import React from "react";
import { useLocation } from "react-router-dom";
import BookingServiceForm from "../components/BookingServiceForm";
import "./StyleSheets/servicesdetails.css";
function ServicesDetails() {
  const { state } = useLocation();
  const service = state ? state.service : null;
 
  return (
    <div className="ServicesDetails">
      <div className="ServicesDetailsContent">
        <h2 className="text-3xl font-bold mt-5 mb-3">{service.title}</h2>
        <img
          src={service.image_url}
          alt={service.title}
          width={250}
          height={250}
          className="imageServices"
        />
        <p
          className="text-gray-600 mt-3 descriptionServices"
          style={{ maxWidth: "90vw" }}
        >
          {service.description}
        </p>
      </div>
      <div className="formContent">
        <BookingServiceForm />
      </div>
    </div>
  );
}

export default ServicesDetails;
