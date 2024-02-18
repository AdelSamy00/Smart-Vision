import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { handleMultipleFilesUpload } from "../utils";
import Loading from "../components/Loading";
function BookingServiceForm() {
  const { state } = useLocation();
  const [images, setImages] = useState([{}]);
  const service = state ? state.service : null;
  const { customer } = useSelector((state) => state.customer);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ServiceName: "",
    phoneNumber: "",
    address: "",
    description: "",
    images: [{}],
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
    setLoading(true);
    try {
      console.log(images);
      const uploadedImages =
        images && (await handleMultipleFilesUpload(images));

      console.log("Uploaded Image URL:", uploadedImages);
      const response = await axios.post("/customers/service", {
        id: customer._id,
        service: service.title,
        description: formData.description,
        images: uploadedImages,
      });
      if (response.data.success) {
        setFormSubmitted(true);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to submit the form:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
        If You Need To Book This Service Fill This Form .
      </h2>
      {loading && <Loading />}
      {!formSubmitted && !loading && (
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
            // style={{width:"50vw"}}
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
          <div className="p-2 w-full">
            <div className="relative flex justify-items-center gap-2">
              <label
                htmlFor="image"
                className="leading-7 text-sm text-gray-600 mt-1"
              >
                uploadFile
              </label>
              <input
                type="file"
                id="images"
                name="images"
                className="uploadBtn file:hidden text-gray-700 bg-gray-300 w-1/4"
                onChange={(e) => {
                  setImages(e.target.files);
                }}
                multiple
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#009688",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      )}
      {formSubmitted && (
        <div>
          <p className="text-green-500 mt-3">
            Thank you! We will get in touch with you in a few days.
          </p>
        </div>
      )}
    </div>
  );
}

export default BookingServiceForm;
