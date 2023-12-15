"use client"

import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { logIn } from "@/query/User";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";


const Login = () => {

  const [loginData, setLoginData] = useState({email:'', password:''});

  const [error, setError] = useState(false);


  const router = useRouter()

  const handleChange = (e) => {
    setLoginData(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    const res = await signIn('credentials', {
      email: loginData.email,
      "password": loginData.password,
      redirect: false
    })

    if(!res.error) {
      router.push("/");
    } else {
      setError(true);
    }
  };

  const handleGoogleLogin = async () => {
    // Handle login with Google
  
    try {
      signIn('google', {callbackUrl: "http://localhost:3000"})
      // console.log('Google login res:', res)
    } catch (error) {
      console.error('Error during Google login:', error)
    }

    
  };

  const handleFacebookLogin = async() => {
    // Handle login with Facebook
    // const res = await signIn('facebook');
    try {
      signIn('facebook', {callbackUrl: "http://localhost:3000"})
      // console.log('Google login res:', res)
    } catch (error) {
      console.error('Error during Google login:', error)
    }
  };

  const user = useSession();


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
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
          
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
          required
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mb: 2, width: "100%" }} >
          Login
        </Button>
        {error && <Typography variant="body1" sx={{ mb: 2, color: 'red' }}>
          Wrong Password or Username. Retry?
        </Typography>}
        <Typography variant="body1" sx={{ mb: 2 }}>
          or
        </Typography>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{ mb: 2, width: "100%" }}
          
        >
          Login with Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<FacebookIcon />}
          onClick={handleFacebookLogin}
          sx={{ mb: 2, width: "100%" }}
        >
          Login with Facebook
        </Button>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="/register">
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
