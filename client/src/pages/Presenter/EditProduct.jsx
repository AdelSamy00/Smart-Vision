import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './PresenterStyleSheets/EditProduct.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InputColor from '../../components/Presenter/InputColor';
import { Alert, Snackbar } from '@mui/material';

function EditProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [description, setDescription] = useState(null);
  const [images, setImages] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [productName, setProductName] = useState(null);
  const [category, setCategory] = useState(null);
  const [colors, setColors] = useState(null);
  const [price, setPrice] = useState(null);
  const [show, setShow] = useState(null);
  const [numberOfImages, setNumberOfImages] = useState(0);
  const [validated, setValidated] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  function setProductData(product) {
    setProductName(product?.name);
    setCategory(product?.category);
    setColors(product?.colors);
    setDescription(product?.description);
    setImages(product?.images);
    setPrice(product?.price);
    setShow(product?.show);
    setNumberOfImages(product?.images.length);
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (numberOfImages === 0 || colors.length === 0) {
      handleOpenSnackbar();
    } else if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      console.log(
        productName,
        category,
        colors,
        description,
        price,
        show,
        images
      );
      // await axios.put('', { })
      //     .then((res) => {
      //         const newData = { ...res.data?.customer };
      //         handleClose()
      //     })
      //     .catch((error) => {
      //         console.log(error)
      //     })
    }
  };

  function handleDeleteImage(removeImage) {
    setImages((prevImages) => {
      return prevImages.filter((image) => image !== removeImage);
    });
    setNewImages((prevImages) => {
      return prevImages.filter((image) => image !== removeImage);
    });
    setNumberOfImages(numberOfImages - 1);
  }

  async function conver2base64(e) {
    const files = e.target.files;
    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImages((prev) => {
          return [...prev, reader.result.toString()];
        });
      };
      reader.readAsDataURL(files[index]);
      setNumberOfImages(numberOfImages + 1);
    }
  }

  async function getProduct(productId) {
    await axios
      .get(`/products/${productId}`)
      .then((res) => {
        setProductData(res?.data?.product);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getProduct(productId);
  }, []);

  return (
    <>
      {productName ? (
        <main className="editProductMain">
          <h1>Edit product</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="editProductFormMainDiv">
              {/* for images */}
              <Form.Group className="InputGroup editProductFormImages">
                <Form.Label className="FormLabel">Images</Form.Label>
                <div
                  className={
                    images.length || newImages.length
                      ? 'editProductFromImagesDiv'
                      : 'editProductFromImagesDiv h-60'
                  }
                >
                  {images.map((image, idx) => {
                    return (
                      <div
                        key={idx}
                        className="editProductFormImageDiv"
                        onClick={() => handleDeleteImage(image)}
                      >
                        <div className="editProductFormDeleteImage">
                          <DeleteForeverIcon
                            sx={{
                              fontSize: '45px',
                            }}
                          />
                        </div>
                        <img className="editProductFromImage" src={image} />
                      </div>
                    );
                  })}
                  {newImages?.map((image, idx) => {
                    return (
                      <div
                        key={idx}
                        className="editProductFormImageDiv"
                        onClick={() => handleDeleteImage(image)}
                      >
                        <div className="editProductFormDeleteImage">
                          <DeleteForeverIcon
                            sx={{
                              fontSize: '45px',
                            }}
                          />
                        </div>
                        <img className="editProductFromImage" src={image} />
                      </div>
                    );
                  })}
                </div>
              </Form.Group>
              <div className="editProductFormAllData">
                {/* for product Name */}
                <Form.Group className="InputGroup">
                  <Form.Label className="FormLabel">Product Name</Form.Label>
                  <Form.Control
                    required
                    className="InputField"
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>
                {/* for Description */}
                <Form.Group className="InputGroup">
                  <Form.Label className="FormLabel">Description</Form.Label>
                  <Form.Control
                    required
                    className="InputField h-auto"
                    type="text"
                    as="textarea"
                    rows={5}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <div className="editProductCategoryAndPriceDiv">
                  {/*for category */}
                  <Form.Group className="InputGroup suEditProductCategoryAndPriceDiv ">
                    <Form.Label className="FormLabel" htmlFor="disabledSelect">
                      Category
                    </Form.Label>
                    <Form.Select
                      required
                      className="InputField"
                      id="disabledSelect"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Choose a category</option>
                      <option value="sofa">Sofa</option>
                    </Form.Select>
                  </Form.Group>
                  {/* for Price */}
                  <Form.Group className="InputGroup suEditProductCategoryAndPriceDiv">
                    <Form.Label className="FormLabel">Price</Form.Label>
                    <Form.Control
                      required
                      className="InputField"
                      type="number"
                      placeholder="Price"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                </div>
                {/* for colors */}
                <Form.Group className="InputGroup">
                  <Form.Label className="FormLabel">Colors</Form.Label>
                  <InputColor colors={colors} setColors={setColors} />
                </Form.Group>
                {/* for upload picture */}
                {numberOfImages < 4 ? (
                  <Form.Group className="InputGroup flex flex-wrap justify-items-center gap-2 items-center">
                    <input
                      type="file"
                      id="uploadFile"
                      name="uploadFile"
                      className="uploadBtn hidden text-gray-700 bg-gray-300 w-1/4"
                      onChange={(e) => conver2base64(e)}
                    />
                    <label
                      htmlFor="uploadFile"
                      className="uploadBtn text-gray-700 bg-gray-300 cursor-pointer"
                    >
                      Upload picture
                    </label>
                    <p>Maximum 4 pictures</p>
                  </Form.Group>
                ) : (
                  <></>
                )}
                {/* for show */}
                <Form.Group className="InputGroup flex items-center">
                  <Form.Label className="FormLabel mr-4">Show</Form.Label>
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    value={show}
                    checked={show}
                    onChange={() => {
                      setShow(!show);
                    }}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="flex justify-between flex-row-reverse">
              <button
                type="submit"
                className="text-2xl bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mb-4 h-16"
              >
                Save
              </button>
              <button
                className="text-2xl bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl mb-4 h-16"
                onClick={(e) => {
                  e.preventDefault();
                  history.back();
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        </main>
      ) : (
        <></>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Include at least one picture and color.
        </Alert>
      </Snackbar>
    </>
  );
}

export default EditProduct;
