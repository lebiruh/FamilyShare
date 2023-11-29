"use client"
import axios from 'axios';

export const getFamilies = async (userId) => {

  try {
    const response = await axios.get(`http://localhost:5000/api/getFamily/${userId}`, {  withCredentials: true});

    const family = response.data;

    console.log("Family Response is: ", response);

    console.log("Family data is: ", family);

    return response;

  } catch (error) {
    console.log(error);
  }

};

export const createFamily = async (familyData, userId) => {

  try {
    const response = await axios.post(`http://localhost:5000/api/createFamily/${userId}`, familyData, {  withCredentials: true});

    const family = response.data;

    console.log("Family Response is: ", response);

    console.log("Family data is: ", family);

    return response;

  } catch (error) {
    console.log(error);
  }

};