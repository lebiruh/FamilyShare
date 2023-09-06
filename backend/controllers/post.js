import {db} from "../connectDB.js";
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { getDbPosts, addDbPosts } from "../Database/dbQuerry/posts.js";

export const getPosts = (req, res) => {

  const nextAuthToken = req.cookies['next-auth.session-token'];

  console.log(nextAuthToken);

  const token = req.cookies.accessToken || nextAuthToken;

  console.log("token is: ", token);

  if (!token) return res.status(401).json("Not logged in");

  if (token === req.cookies.accessToken) {

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
      if(err) return res.status(403).json("Token is invalid!"); 
  
      getDbPosts(req, res);
      // const q = "SELECT p.*, u.id AS userId, firstName FROM posts AS p JOIN users AS u ON (p.userId = u.id)"
  
      // db.query(q, (err, data) => { 
      //   if (err) return res.status(500).json(err);
      //   // console.log(data);
      //   return res.status(200).json(data);
      // });
    })
  }

  if (token === nextAuthToken) {
    getDbPosts(req, res);
  }

};

export const addPost = (req, res) => {
  // const token = req.cookies.accessToken;

  const nextAuthToken = req.cookies['next-auth.session-token'];

  console.log(nextAuthToken);

  const token = req.cookies.accessToken || nextAuthToken;

  if (!token) return res.status(401).json("Not logged in");

  if (!req.body.content) return res.status(400).json("No content");

  // jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
  //   if(err) return res.status(403).json("Token is invalid!")

    addDbPosts(req, res);
  
    // const q = "INSERT INTO posts (`userId`, `content`, `image`, `createdAt`) VALUES (?)"

    // const values = [
    //   userInfo.id,
    //   req.body.content,
    //   req.body.image,
    //   moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    // ]

    // db.query(q, [values], (err, data) => { 
    //   if (err) return res.status(500).json(err);
    //   // console.log(data);
    //   return res.status(200).json("Post has been created");
    // });
  // });  

};