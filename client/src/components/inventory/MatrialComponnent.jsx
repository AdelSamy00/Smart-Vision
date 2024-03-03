import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import Loading from "../shared/Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/MatrialCard";
function MatrialComponnent() {
  const [Matrials, setMatrials] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState(1);
  const [cart, setCart] = useState([]);
  const cart2 = useSelector((state) => state.matrialCard.cart);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`/Materials/`);
        setMatrials(response.data.materials);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const handleShowMore = () => {
    setDisplayedOrders(Matrials.length);
  };

  const handleDelete = async (matrialId) => {
    try {
      const response = await axios.delete("/Materials/", {
        data: { id: matrialId },
      });
      setMatrials((prevMatrials) =>
        prevMatrials.filter((Matrial) => Matrial._id !== matrialId)
      );
      toast.dismiss();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting matrial:", error);
      toast.error("Failed to delete matrial. Please try again.");
    }
  };
  const dispatch = useDispatch();
  const handleAddToCart = (matrial) => {
    const isAlreadyInCart = cart.some((item) => item._id === matrial._id);

    if (isAlreadyInCart) {
      toast.error("Item is already in the cart!");
    } else {
      dispatch(addToCart(matrial)); 
    }
  };
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            duration: 3000,
            border: "1px solid #6A5ACD",
            backgroundColor: "#6A5ACD",
            padding: "16px",
            color: "white",
            fontWeight: "Bold",
            marginTop: "65px",
            textAlign: "center",
          },
        }}
      />
      {isLoading ? (
        <Loading />
      ) : Matrials.length > 0 ? (
        <Grid
          container
          className="order-container"
          sx={{ marginBottom: "2rem" }}
        >
          <Grid
            item
            xs={11}
            md={7}
            sx={{
              margin: "auto",
              border: "2px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <Grid
              container
              sx={{
                borderBottom: "2px solid #ddd",
                borderStartEndRadius: "10px",
                borderStartStartRadius: "10px",
                padding: "10px",
                backgroundColor: "#f2f2f2",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={6}
                md={4}
                // lg={3}
                sx={{
                  textAlign: { xs: "start", md: "center" },
                  padding: "10px 0px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    // fontWeight: "bold",
                    fontSize: { xs: "16px", md: "20px" },
                  }}
                >
                  Inventory Matrials
                </Typography>
              </Grid>

              <Grid
                item
                xs={6}
                md={4}
                // lg={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: { md: "auto" },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    marginRight: "1rem",
                    fontSize: { xs: "16px", md: "20px" },
                  }}
                >
                  Total Matrials:{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "16px", md: "19px" } }}
                >
                  {Matrials.length}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                borderTop: "none",
                padding: "20px",
              }}
            >
              {Matrials.slice(0, displayedOrders).map((Matrial, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sx={{
                    border: "2px solid #ddd",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    padding: "20px",
                  }}
                >

                  <Grid item xs={12} md={7}>
                      <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: "20px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>Matrial Name :</span>{" "}
                      {Matrial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: "20px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>quantity:</span>{" "}
                      {Matrial.quantity}
                    </Typography>
                  </Grid>
                  <Grid container style={{ marginTop: "20px" }}>
                    <Grid item sm={4} xs={6} style={{ margin: "15px 0px", display:"flex",justifyContent:"flex-start"}}>
                      <Link to={`/updateMatrial/${Matrial._id}`}>
                        <Button variant="contained" color="primary">
                          Update
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item sm={4} xs={6} style={{ margin: "15px 0px", display:"flex",justifyContent:"center"}}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDelete(Matrial._id)}
                      >
                        Delete
                      </Button>
                    </Grid>
                    <Grid item sm={4} xs={12}  style={{ margin: "15px 0px", display:"flex",justifyContent:"flex-end" }}>
                    <button
                      onClick={() => handleAddToCart(Matrial)}
                      className="addToCartButton"
                      style={{ border: "none" }}
                    >
                      {cart2.find((item) => item._id === Matrial._id) ? (
                        // If item is in the cart
                        <svg
                          className="sbProductCardFooterIcon"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7.8,21.425A2.542,2.542,0,0,1,6,20.679L.439,15.121,2.561,13,7.8,
18.239,21.439,4.6l2.122,2.121L9.6,20.679A2.542,2.542,0,0,1,7.8,21.425Z"
                          />
                        </svg>
                      ) : (
                        // If item is not in the cart
                        <svg
                          className="sbProductCardFooterIcon"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M18,12a5.993,5.993,0,0,1-5.191-9H4.242L4.2,2.648A3,3,0,0,0,1.222,0H1A1,1,0,
    0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,
    3,0,0,1-2.821-2H17.657a5,5,0,0,0,4.921-4.113l.238-1.319A5.984,5.984,0,0,1,18,12Z"
                          />
                          <circle cx="7" cy="22" r="2" />
                          <circle cx="17" cy="22" r="2" />
                          <path d="M15,7h2V9a1,1,0,0,0,2,0V7h2a1,1,0,0,0,0-2H19V3a1,1,0,0,0-2,0V5H15a1,1,0,0,0,0,2Z" />
                        </svg>
                      )}
                    </button>
                  </Grid>
                  </Grid>
                </Grid>
              ))}
              {Matrials.length > displayedOrders && (
                <Grid container justifyContent="end">
                  <Typography
                    variant="body2"
                    style={{
                      cursor: "pointer",
                      fontSize: "19px",
                      textDecoration: "underline",
                    }}
                    onClick={handleShowMore}
                  >
                    Show All
                  </Typography>
                </Grid>
              )}
              <Grid container>
                <Grid item sm={8} xs={6}>
                <Link to="/addMatrial">
                <Button variant="contained" color="primary">
                  Add Matrial
                </Button>
              </Link>
                </Grid>
             <Grid item sm={4} xs={6}>
             <Link to="/Transaction">
                <Button variant="contained" color="primary">
                  Open Bag
                </Button>
              </Link>
             </Grid>

              </Grid>

            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            width: "65%",
            border: "2px solid",
            margin: "auto",
            padding: "20px",
            marginBottom: "5rem",
          }}
        >
          <p style={{ marginBottom: "12px" }}>there is no Matrials .</p>
          <Link to="/addMatrial">
            <Button variant="contained" color="primary">
              Add Matrial
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default MatrialComponnent;
