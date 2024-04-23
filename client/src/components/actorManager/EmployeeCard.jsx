import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Typography, Grid, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export default function EmployeeCard({ employee }) {
  return (
    <Card sx={{ maxWidth: 320, marginBottom: "2rem", bgcolor: "#f8f9fa" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#48cae4", width: 50, height: 50 }}
            aria-label="recipe"
          >
            {/* MW */}
            { employee?.firstName ? (
              employee.firstName.charAt(0).toUpperCase() +
              employee.firstName.charAt(0).toUpperCase()
            ) : (
              employee.username.charAt(0).toUpperCase()
            )}
          </Avatar>
        }
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              style={{
                textAlign: "start",
                textTransform: "capitalize",
                fontSize: "19px",
              }}
            >
              {employee.firstName
                ? employee.firstName + " "+employee.lastName
                : employee.username}
            </Typography>
            <Link
              to={`/actor/edit-employee/${employee._id}`}
              style={{ marginLeft: "auto" }}
            >
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </Link>
          </div>
        }
        subheader={
          <Typography
            style={{ textAlign: "start", fontSize: "14px", color: "gray" }}
          >
            {employee.email}
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2} textAlign={"center"} style={{justifyContent:"center"}}>
          <Grid xs={4} item>
            <Typography
              style={{ fontSize: "19px", textAlign: "start", color: "gray" }}
            >
              UserName:
            </Typography>
          </Grid>
          <Grid xs={7} item>
            <Typography style={{ fontSize: "18px", textAlign: "center" ,textTransform:"capitalize"}}>
              {employee?.username}
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography
              style={{ fontSize: "19px", textAlign: "start", color: "gray" }}
            >
              <span style={{ fontSize: "19px" }}>JobTitle: </span>{" "}
            </Typography>
          </Grid>
          <Grid xs={7} item>
            <Typography style={{ fontSize: "18px", textAlign: "center",textTransform:"capitalize" }}>
              {employee?.jobTitle}
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography
              style={{ fontSize: "19px", textAlign: "start", color: "gray" }}
            >
              Salary:
            </Typography>
          </Grid>
          <Grid xs={7} item>
            <Typography style={{ fontSize: "18px", textAlign: "center" }}>
              {employee?.salary ? employee?.salary : 10000}$
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography style={{ fontSize: "19px", textAlign: "start", color: "gray" }}>
              Phone:
            </Typography>
          </Grid>
          <Grid xs={7} item>
            <Typography style={{ fontSize: "18px", textAlign: "center"}}>
             {employee?.phone?"0"+employee?.phone:"Undefined"}
            </Typography>
          </Grid>
          {/* <Grid xs={4} item>
            <Typography style={{ fontSize: "19px", color: "gray" }}>
              DOB:{" "}
            </Typography>
          </Grid>
          <Grid xs={8} item>
            <Typography style={{ fontSize: "18px" }}>
              {employee.birthday
                ? employee.birthday
                    ?.substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("-")
                : "Unknown"}
            </Typography>
          </Grid> */}
          <Grid
            xs={12}
            item
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Link to={`/actor/change-password/${employee?._id}`}>
              <Button
                sx={{
                  backgroundColor: "#f8f9fa",
                  color: "#48cae4",
                  textTransform: "capitalize",
                  fontSize: "17px",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#f8f9fa",
                    color: "blue",
                    outline: "none",
                  },
                  "&:active": { backgroundColor: "#f8f9fa" },
                }}
              >
                Change Passwo..
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
