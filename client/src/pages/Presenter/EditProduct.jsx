import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './PresenterStyleSheets/EditProduct.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InputColor from '../../components/Presenter/InputColor';
import { Alert, Snackbar } from '@mui/material';
import { handleMultipleFilesUpload } from '../../utils';
import Loading from '../../components/Loading';

function EditProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState(null);
  const [images, setImages] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [productName, setProductName] = useState(null);
  const [category, setCategory] = useState(null);
  const [colors, setColors] = useState(null);
  const [price, setPrice] = useState(null);
  const [points, setPoints] = useState(null);
  const [show, setShow] = useState(null);
  const [numberOfImages, setNumberOfImages] = useState(0);
  const [validated, setValidated] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    setProduct(product);
    setProductName(product?.name);
    setCategory(product?.category);
    setColors(product?.colors);
    setDescription(product?.description);
    setImages(product?.images);
    setPrice(product?.price);
    setShow(product?.show);
    setPoints(product?.points);
    setNumberOfImages(product?.images.length);
    setIsLoading(false);
  }

  async function sendNewData(
    name,
    description,
    images,
    category,
    price,
    points,
    colors,
    show,
    imagesUrl
  ) {
    await axios
      .put(`/products/${productId}`, {
        name,
        description,
        images: [...images, ...imagesUrl],
        category,
        price,
        points,
        colors,
        show,
      })
      .then((res) => {
        console.log(res.data);
        history.back()
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getNewImagesFiles() {
    let files = [];
    newImages.map((item) => {
      files.push(item.file[0]);
    });
    return files;
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
      setIsLoading(true)
      const files = getNewImagesFiles();
      const imagesUrl = newImages?.length
        ? await handleMultipleFilesUpload(files)
        : [];
      sendNewData(
        productName,
        description,
        images,
        category,
        price,
        points,
        colors,
        show,
        imagesUrl
      );
    }
  };

  function handleDeleteImage(removeImage) {
    setImages((prevImages) => {
      return prevImages.filter((image) => image !== removeImage);
    });
    setNumberOfImages(numberOfImages - 1);
  }

  function handleDeleteNewImage(removeImage) {
    setNewImages((prevImages) => {
      return prevImages.filter((image) => image.imgUrl !== removeImage.imgUrl);
    });

    setNumberOfImages(numberOfImages - 1);
  }

  async function conver2base64(e) {
    const files = e.target.files;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImages((prev) => {
        return [
          ...prev,
          { imgUrl: reader.result.toString(), file: [...files] },
        ];
      });
    };
    reader.readAsDataURL(files[0]);
    setNumberOfImages(numberOfImages + 1);
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
      {!isLoading ? (
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
                        onClick={() => handleDeleteNewImage(image)}
                      >
                        <div className="editProductFormDeleteImage">
                          <DeleteForeverIcon
                            sx={{
                              fontSize: '45px',
                            }}
                          />
                        </div>
                        <img
                          className="editProductFromImage"
                          src={image.imgUrl}
                        />
                      </div>
                    );
                  })}
                </div>
              </Form.Group>
              <div className="editProductFormAllData">
                {/* for product Name */}
                <Form.Group className="InputGroup">
                  <Form.Label htmlFor="productName" className="FormLabel">
                    Product Name
                  </Form.Label>
                  <Form.Control
                    required
                    className="InputField"
                    name="productName"
                    id="productName"
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>
                {/* for Description */}
                <Form.Group className="InputGroup">
                  <Form.Label
                    htmlFor="productDescription"
                    className="FormLabel"
                  >
                    Description
                  </Form.Label>
                  <Form.Control
                    required
                    className="InputField h-auto"
                    name="productDescription"
                    id="productDescription"
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
                    <Form.Label className="FormLabel" htmlFor="productCategory">
                      Category
                    </Form.Label>
                    <Form.Select
                      required
                      className="InputField"
                      name="productCategory"
                      id="productCategory"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Choose a category</option>
                      <option value="sofa">Sofa</option>
                      <option value="bed">Bed</option>
                    </Form.Select>
                  </Form.Group>
                  {/* for Price */}
                  <Form.Group className="InputGroup suEditProductCategoryAndPriceDiv">
                    <Form.Label htmlFor="productPrice" className="FormLabel">
                      Price
                    </Form.Label>
                    <Form.Control
                      required
                      className="InputField"
                      name="productPrice"
                      id="productPrice"
                      type="number"
                      placeholder="Price"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                </div>

                {/* for colors */}
                <Form.Group className="InputGroup ">
                  <Form.Label className="FormLabel">Colors</Form.Label>
                  <InputColor colors={colors} setColors={setColors} />
                </Form.Group>
                {/* for points */}
                <Form.Group className="InputGroup ">
                  <Form.Label htmlFor="productPoints" className="FormLabel">
                    Points
                  </Form.Label>
                  <Form.Control
                    required
                    className="InputField"
                    name="productPoints"
                    id="productPoints"
                    type="number"
                    placeholder="Points"
                    min={0}
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                  />
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
                  <Form.Label htmlFor="productShow" className="FormLabel mr-4">
                    Show
                  </Form.Label>
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    name="productShow"
                    id="productShow"
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
        <div className="h-96">
          <Loading />
        </div>
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
