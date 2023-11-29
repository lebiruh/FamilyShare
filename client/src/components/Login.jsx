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
import { useQuery,
  useMutation,
  useQueryClient,
  QueryClient } from "@tanstack/react-query";
import { logIn } from "@/query/User";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";


const Login = () => {

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn:  logIn
  //   });

  const [loginData, setLoginData] = useState({email:'', password:''});

  const [error, setError] = useState(false);


  const router = useRouter()

  // const session = useSession();

  const handleChange = (e) => {
    setLoginData(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    // Handle login with username and password
    // const response = await logIn();

    // console.log("Logged in as:", response);
    // response.data ? router.push("/") : setError(response.response.data);

    const res = await signIn('credentials', {
      email: loginData.email,
      "password": loginData.password,
      redirect: false
    })

    console.log("login res: ", res);
    console.log("loginData is: ", loginData);
    if(!res.error) {
      router.push("/");
    } else {
      setError(true);
    }
  };

  const handleGoogleLogin = async () => {
    // Handle login with Google
    // const res = await signIn('google')

    // console.log("Google login res: ", res);

    // console.log("session from Google:", session);

    try {
      signIn('google', {callbackUrl: "http://localhost:3000"})
      // console.log('Google login res:', res)
    } catch (error) {
      console.error('Error during Google login:', error)
    }

    // const session = useSession();

    // if(!res.error) {
    //   router.push("/");
    // } else {
    //   router.push("/error");
    // }

    // console.log("session from Google:", session);


    // if(session.status === 'loading') {
    //   return (
    //     <Box sx={{ bgcolor: '#f3f2ef', minHeight: '100vh', width: '100vw', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
    //       <div>Loadig...</div>
    //     </Box>
    //   )
    // }
    // if(session.status === 'unauthenticated') {
    //   return (
    //   <Box sx={{ bgcolor: '#f3f2ef', minHeight: '100vh', width: '100vw', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
    //     <div>Error...</div>
    //   </Box>
    //   )
    //   // router.push("/login");   
    // }

    // router.push("/");
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

  console.log("Usesr is logged in: ",  user);

  // if(user.status === 'authenticated') {
  //   router.push("/");
  // }

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
