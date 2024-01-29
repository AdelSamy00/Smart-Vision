import axios from 'axios';
const CLOUDINARY_ID = import.meta.env.VITE_APP_CLOUDINARY_ID;
export const getCustomerInfo = async (token) => {
  try {
    const res = await axios.get(`/customers/get-customer/${token}`);
    return res.data.customer;
  } catch (error) {
    console.log(error);
  }
};

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append('file', uploadFile);
  formData.append('upload_preset', 'Smart Vision');
  console.log(formData);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_ID}/image/upload/`,
      formData
    );
    console.log(response.data);
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
