// import React from 'react';
"use client"
import axios from 'axios';

export const getLikes = async (postId) => {

  try {
    const response = await axios.get(`http://localhost:5000/api/likes/${postId}`, {  withCredentials: true});

    const likes = response.data;

    return likes;

  } catch (error) {
    console.log(error);
  }

};
export const addLike = async (postId, userId) => {

  try {
    const response = await axios.post(`http://localhost:5000/api/likes/${postId}`, {userId}, {  withCredentials: true});

    const likes = response.data;

    console.log("likes: " + likes);

    return likes;

  } catch (error) {
    console.log(error);
  }

};

export const removeLike = async (postId, userId) => {

  try {
    const response = await axios.post(`http://localhost:5000/api/removelike/${postId}`, {userId}, {  withCredentials: true});

    const likes = response.data;

    return likes;

  } catch (error) {
    console.log(error);
  }

};