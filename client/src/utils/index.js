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
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: null,
        },
      }
    );
    console.log(response.data);
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

//take care about this in Multiple Files Upload
//const [image, setImage] = useState([{}]);
export const handleMultipleFilesUpload = async (uploadFile) => {
  try {
    const files = [];
    for (let i = 0; i < 4; i++) {
      const formData = new FormData();
      formData.append('file', uploadFile[i]);
      formData.append('upload_preset', 'Smart Vision');
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_ID}/image/upload/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: null,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          files.push(response.data.secure_url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return files;
  } catch (error) {
    console.log(error);
  }
};
