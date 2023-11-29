// import React from 'react';
"use client"
import axios from 'axios';

export const getPosts = async (familyId) => {

  console.log("family Id is: ", familyId);

  try {
    const response = await axios.get(`http://localhost:5000/api/posts/${familyId}`, {  withCredentials: true});

    const posts = response.data;

    console.log("Post Response data: ", response);

    console.log("Get data: ", posts);

    return posts;

  } catch (error) {
    console.log(error);
  }

};
export const addPosts = async (postData, familyId) => {

  console.log("family Id is: ", familyId);


  console.log("post Data is: ", postData);



  try {
    const response = await axios.post(`http://localhost:5000/api/posts/${familyId}`, postData, {  withCredentials: true});

    const posts = response.data;

    console.log("Post Response data: ", response);

    console.log("Get data: ", posts);

    return posts;

  } catch (error) {
    console.log(error);
  }

};

export const deletePost = async (postId) => {

  console.log("family Id is: ", postId);


  try {
    const response = await axios.delete(`http://localhost:5000/api/deletePost/${postId}`, {  withCredentials: true});

    const posts = response.data;

    console.log("Post Response data: ", response);

    console.log("Get data: ", posts);

    return posts;

  } catch (error) {
    console.log(error);
  }

};