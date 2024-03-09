import { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
function MaterialOrder({ matrial }) {
  const [showOrder, setShowOrder] = useState(false);

  const toggleOrder = () => {
    setShowOrder(!showOrder);
  };

  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const date = new Date(matrial?.createdAt);
    const formatted = date.toLocaleDateString();
    setFormattedDate(formatted);
  }, [matrial?.createdAt]);
  return (
    <Grid container className="order-container" sx={{ marginBottom: "2rem" }}>
      <Grid
        item
        xs={11}
        sm={8}
        md={7}
        sx={{ margin: "auto", border: "2px solid #ddd", borderRadius: "10px" }}
      >
        <Grid
          container
          sx={{
            borderBottom: showOrder ? "2px solid #ddd" : "none",
            borderStartEndRadius: "10px",
            borderStartStartRadius: "10px",
            padding: "20px",
            backgroundColor: "#f2f2f2",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={6}
            md={6}
            lg={4}
            sx={{ marginBottom: { xs: "1.3rem", md: "0rem" } }}
          >
            <Typography variant="body1">Date Placed</Typography>
            <Typography variant="body2">
              {matrial.createdAt
                .substring(0, 10)
                .split("-")
                .reverse()
                .join("-")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
            lg={4}
            sx={{
              textAlign: { md: "center" },
              marginBottom: { xs: "2.1rem", lg: "0rem", md: "0rem" },
            }}
          >
            <Typography variant="body1">
              Total Materials : {matrial?.materials.length}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: {
                xs: "flex-end",
                md: "flex-start",
                lg: "flex-end",
              },
              marginTop: { md: "1.7rem", lg: "0rem" },
              marginRight: { xs: "20px", md: "0rem", lg: "0rem" },
            }}
          >
            <Button
              onClick={toggleOrder}
              variant="contained"
              sx={{
                backgroundColor: "#009688",
                color: "white",
                borderRadius: "5px",
                ":hover": {
                  backgroundColor: "#009688",
                },
              }}
            >
              {showOrder ? "close" : "Details"}
            </Button>
          </Grid>
        </Grid>
        {showOrder && (
          <Grid
            container
            item
            sx={{
              borderTop: "none",
              padding: "20px",
            }}
          >
            {matrial?.materials?.map((material, index) => (
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                        variant="body1"
                        sx={{
                          display: "flex",
                          justifyContent: { xs: "center", md: "flex-start" },
                          color: "black",
                          marginBottom: "1rem",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: {
                              xs: "16px",
                              md: "20px",
                              color: "black",
                            },
                          }}
                        >
                          Material Name:{" "}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: { xs: "16px", md: "20px" } }}
                        >
                          {material?.material}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        variant="body1"
                        sx={{
                          display: "flex",
                          justifyContent: { xs: "center", md: "flex-end" },
                          marginBottom: "1rem",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: {
                              xs: "16px",
                              md: "20px",
                              color: "black",
                            },
                          }}
                        >
                          Quantity:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: {
                              xs: "16px",
                              md: "22px",
                              color: "black",
                            },
                          }}
                        >
                          {material?.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item sm={8} xs={6}>
              <Link to={"/inventory"}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#009688",
                    color: "white",
                    borderRadius: "7px",
                    ":hover": {
                      backgroundColor: "#009688",
                    },
                  }}
                >
                  View Matrials
                </Button>
              </Link>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default MaterialOrder;
