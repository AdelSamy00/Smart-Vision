import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/shared/Loading";
import { useEffect, useState } from "react";
import EmployeeCard from "../../components/actorManager/EmployeeCard";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Display, setDisplay] = useState("none");
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/employees/");
        console.log("API response:", response.data.employees);
        setEmployees(response.data.employees);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.response.data.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center">
      {" "}
      {isLoading ? (
        <Grid item>
          <Loading />
        </Grid>
      ) : employees.length > 0 ? (
        <Grid container xs={12} sm={10} md={10}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{
                marginBottom: "3rem",
              }}
            >
              Employees Of The Company
            </Typography>
          </Grid>
          <Grid
            container
            spacing={3}
            align="center"
            sx={{ justifyContent: { xs: "center", md: "space-evenly" } }}
          >
            {employees.map((employee, index) => (
              <Grid item key={index}>
                <EmployeeCard employee={employee} />
              </Grid>
            ))}
          </Grid>
          <Box
        sx={{
          height: 50,
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "fixed",
          bottom: 40,
          right: 20,
        }}
      >
        <span
          style={{
            position: "relative",
            right: 85,
            bottom: 7,
            display: Display,
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            backgroundColor: "rgba(0, 0, 0,0.6)",
          }}
        >
          {" "}
          Add New Employee
        </span>
        <Link to={"/actor/add-employee"}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            direction="up"
            open={false}
            onMouseOver={() => setDisplay("inline")}
            onMouseLeave={() => setDisplay("none")}
          ></SpeedDial>
        </Link>
      </Box>
        </Grid>
      ) : (
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" align="center" gutterBottom>
            There's No Employees
          </Typography>
        </Grid>
      )}
    
    </Grid>
  );
}

export default ViewEmployees;
