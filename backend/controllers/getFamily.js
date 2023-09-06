import { getDbfamily } from "../Database/dbQuerry/family.js";
import {db} from "../connectDB.js";
import jwt from 'jsonwebtoken';
// import moment from 'moment';

export const getFamily = (req, res) => {
  const nextAuthToken = req.cookies['next-auth.session-token'];

  console.log(nextAuthToken);

  const token = req.cookies.accessToken || nextAuthToken;

  console.log("params object to get family is: ", req.params);


  const user = req.params.userId;

  console.log("token is: ", token);
  console.log("User to get families is: ", user);

  if (!token) return res.status(401).json("Not logged in");

  // console.log("The body from the frontend is: ", req.body);

  // if (!req.body.firstName || !req.body.lastName)  return res.status(400).json("All fields are required");

  // if (!req.body.familyName) return res.status(400).json("No family name provided");

  // if (token === req.cookies.accessToken) {

  //   jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
  //     if(err) return res.status(403).json("Token is invalid accessToken!");

  //     console.log("user info to get family:", userInfo);

     getDbfamily(req, res, user);

      // res.json(response);
    
  //   }); 
  // } 

  // if (token === nextAuthToken) {

    // console.log(req);

    // Define the secret key used to sign the token
    // const secret = process.env.NEXTAUTH_SECRET;

    // Get the nextAuthToken from the request
    // const nextAuthToken = req.cookies['next-auth.session-token'];

    // Decode and verify the token
    // let decoded;
    // try {
    //   decoded = jwt.verify(token, secret);
    //   console.log("decoded token:", decoded);
    // } catch (error) {
      // Handle invalid token
    //   console.log("decoding error");
    // }
    // jwt.verify(token, process.env.NEXTAUTH_SECRET, (err, userInfo) => {
    //   if(err) return res.status(403).json("Token is invalid from nextAuthToken!");

    //   console.log("user info to get family from nextAuthToken is:", userInfo);

    //   getDbfamily(req,res,userInfo);
    
    // }); 
  // }

};