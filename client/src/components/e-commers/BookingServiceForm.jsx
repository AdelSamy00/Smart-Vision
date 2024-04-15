import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { handleMultipleFilesUpload } from "../../utils";
import Loading from "../shared/Loading";
import { TextField, Button, Grid } from "@mui/material";
import { apiRequest } from "../../utils";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function BookingServiceForm({ socket, setSocket }) {
  const { state } = useLocation();
  const [images, setImages] = useState([{}]);
  const service = state ? state.service : null;
  const { customer } = useSelector((state) => state.customer);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ServiceName: "",
    phoneNumber: customer?.phone,
    address: customer?.address,
    description: "",
    images: [{}],
  });


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
      const response = await apiRequest({
        method: "post",
        url: "/customers/service",
        data: {
          id: customer._id,
          service: service.title,
          description: formData.description,
          images: uploadedImages,
          phone: formData.phoneNumber,
          address: formData.address,
        },
      });
      if (response.data.success) {
        console.log(response.data);
        setFormSubmitted(true);
        socket?.emit("setService", {
          user: customer,
          type: "addService",
          serviceOrder: response?.data.serviceOrder,
        });
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
    <>
      {customer?._id ? (
        <div>
          {/* {console.log(socket)} */}
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              paddingBottom: "20px",
            }}
          >
            If You Need To Book This Service Fill This Form .
          </h2>
          {loading && <Loading />}
          {!formSubmitted && !loading && (
            <form onSubmit={handleSubmit} className="Form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Service Name"
                    variant="outlined"
                    name="ServiceName"
                    value={service.title}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    name="address"
                    multiline
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    name="description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </Grid>
              <div className="p-2 w-full" style={{ marginTop: "15px" }}>
                <div className="relative flex justify-items-center gap-2">
                <label
                    htmlFor="image"
                    className="leading-7 text-sm text-gray-600 mt-1"
                    style={{fontSize:"20px"}}
                  >
                    <CloudUploadIcon className="mr-2" />
                    UploadFile
                  </label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    className="uploadBtn file:hidden text-gray-700  w-1/4"
                    style={{backgroundColor:"#cbeef3"}}
                    onChange={(e) => {
                      setImages(e.target.files);
                    }}
                    multiple                 
                  />
                </div>
              </div>
              <div className="w-full flex justify-center" style={{marginTop:"20px" }}>
              <Button
                type="submit"
                variant="contained"
                className="checkoutButton"
                style={{width:"80%",backgroundColor:"#cbeef3",color:"black"}}
              >
                submit
              </Button>
            </div>
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
      ) : (
        <div className="flex h-full ">
          <div className="m-auto text-center">
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                paddingBottom: "20px",
              }}
            >
              For booking this service, you need to log in first.
            </h2>
            <Link
              to="/login"
              className="btn btn-secondary text-xl font-bold text-white"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingServiceForm;
