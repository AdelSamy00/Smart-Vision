import {
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/shared/Loading";
import { useEffect, useState } from "react";
import EmployeeCard from "../../components/actorManager/EmployeeCard";

function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        <Grid item xs={12} sm={10} md={10}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ marginBottom: "3rem" }}
          >
            Employees Of The Company
          </Typography>
          <Grid
            container
            spacing={3}
            align="center"
            sx={{justifyContent:{xs:"center",md:"space-between"}}}
          >
            {employees.map((employee, index) => (
                <Grid item key={index}>
                <EmployeeCard employee={employee} />
              </Grid>
            ))}
          </Grid>
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
