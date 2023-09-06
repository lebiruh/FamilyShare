"use client"
import axios from 'axios';

export const getComments = async (postId) => {

  try {
    const response = await axios.get(`http://localhost:5000/api/comments/${postId}`, {  withCredentials: true});

    const posts = response.data;

    console.log("Comment Response data: ", response);

    console.log("Get comment: ", posts);

    return posts;

  } catch (error) {
    console.log(error);
  }

};

export const addComment = async (newComment) => {

  const postId = newComment.postId;

  console.log("post Id is: ", postId);


  console.log("comment Data is: ", newComment);



  try {
    const response = await axios.post(`http://localhost:5000/api/comments/${postId}`, newComment, {  withCredentials: true});

    const posts = response.data;

    console.log("Comment Response data: ", response);

    console.log("Get comment: ", posts);

    return posts;

  } catch (error) {
    console.log(error);
  }

};