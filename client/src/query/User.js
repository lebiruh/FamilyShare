// "use client"

// import React from 'react';
import axios from 'axios';
// import { redirect } from 'next/navigation';

export const logIn = async () => {

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {"email": "test@email.com",
      "password": "password"}, {
      withCredentials: true,
    })

    return response;


  } catch (error) {
    // console.log(error.response.data);
    return error;
  }

};

export const getUserByEmail = async (userEmail) => {

  try {
    const response = await axios.get(`http://localhost:5000/api/users/find/${userEmail}`, {
      withCredentials: true,
    })

    console.log("The user is:", response);

    return response;


  } catch (error) {
    // console.log(error.response.data);
    return error;
  }
};