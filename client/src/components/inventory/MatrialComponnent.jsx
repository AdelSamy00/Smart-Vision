import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import Loading from "../Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function MatrialComponnent() {
  const [Matrials, setMatrials] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState(1);
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
      const response = await axios.delete("/Materials/", { data: {id: matrialId } });
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
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: "20px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>Date Placed:</span>{" "}
                      {Matrial.createdAt}
                    </Typography>
                  </Grid>
                  <Grid container style={{marginTop:"20px"}}>
                    <Grid item sm={8} xs={6} style={{ margin: "15px 0px" }}>
                      <Link to={`/updateMatrial/${Matrial._id}`}>
                        <Button variant="contained" color="primary">
                          Update
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item sm={4}xs={6} style={{ margin: "15px 0px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDelete(Matrial._id)}
                      >
                        Delete
                      </Button>
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
              <Link to="/addMatrial">
                <Button variant="contained" color="primary">
                  Add Matrial
                </Button>
              </Link>
            </Grid>

            {/* )} */}
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
          <p style={{marginBottom:"12px"}}>there is no Matrials .</p>
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
