"use client"
import React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";




const Register = () => {


  const handleRegister = (event) => {
    event.preventDefault();
    // Handle register with username and password
  };

  return (
    <Box sx={{
          display: "flex",
          // flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          backgroundColor:'#f3f2ef',
          minHeight: '94vh'
        }}>
      <Paper
        component="form"
        onSubmit={handleRegister}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          width: '30%',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Register
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="First Name"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
        />
        <TextField
          label="confirmPassword"
          type="password"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
        />
        <Button type="submit" variant="contained" sx={{ mb: 2, width: "100%" }} >
          Register
        </Button>
        <Typography variant="body1" sx={{ mb: 2 }}>
          or
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Have an account?{" "}
          <Link href="/login">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
