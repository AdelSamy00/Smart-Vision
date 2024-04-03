import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Typography, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red } from '@mui/material/colors';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function EmployeeCard({ employee }) {
  const [expanded, setExpanded] =React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ maxWidth: 300, marginBottom: "2rem",bgcolor:"#f8f9fa" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{bgcolor: "#48cae4", width: 50, height: 50 }}
            aria-label="recipe"
          >
            {/* MW */}
            {employee?.image ? (
              <img src={employee.image} alt="Employee" />
            ) : employee?.firstName ? (
              employee.firstName.charAt(0).toUpperCase() +
              employee.firstName.charAt(0).toUpperCase()
            ) : (
              employee.username.charAt(0).toUpperCase()
            )}
          </Avatar>
        }
        title={
          <Typography variant="h6" style={{ textAlign: "start" ,textTransform:"capitalize"}}>
            {employee.firstName
              ? employee.firstName + employee.lastName
              : employee.username}
          </Typography>
        }
        subheader={
          <Typography
            style={{ textAlign: "start", fontSize: "15px", color: "gray" }}
          >
            {employee.email}
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2} textAlign={"center"}>
          <Grid xs={4} item>
            <Typography style={{ fontSize: "19px", textAlign: "center", color: "gray" }}>
              UserName:
            </Typography>
          </Grid>
          <Grid xs={8} item>
            <Typography style={{ fontSize: "18px", textAlign: "center" }}>
              {employee.username}
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography style={{ fontSize: "19px", textAlign: "center" , color: "gray"}}>
              <span style={{ fontSize: "19px" }}>jobTitle: </span>{" "}
            </Typography>
          </Grid>
          <Grid xs={8} item>
            <Typography
              style={{ fontSize: "18px", textAlign: "center" }}
            >
              {employee.jobTitle}
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography style={{ fontSize: "19px", textAlign: "center",color:"gray" }}>
              Salary:
            </Typography>
          </Grid>
          <Grid xs={8} item>
            <Typography
              style={{ fontSize: "18px", textAlign: "center"}}
            >
              {employee.salary?employee.salary:10000}$
            </Typography>
          </Grid>
          <Grid xs={5} item>
          <Typography style={{ fontSize: "19px",color:"gray" }}>
            Qualification:
          </Typography>
        </Grid>
          <Grid xs={7} item>
          <Typography style={{ fontSize: "17px",}}>
            Bachelor's Degree
          </Typography>
        </Grid>
        <Grid xs={4} item>
          <Typography style={{ fontSize: "19px",color:"gray"}}>
            DOB:{" "}
          </Typography>
        </Grid>
        <Grid xs={8} item>
          <Typography style={{ fontSize: "18px"}}>
            {employee.birthday?employee.birthday?.substring(0, 10).split("-").reverse().join("-"):"Unknown"}
          </Typography>
        </Grid>
        </Grid>
      </CardContent>
    
    </Card>
  );
}
