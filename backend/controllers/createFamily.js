import {db} from "../connectDB.js";
// import jwt from 'jsonwebtoken';
// import moment from 'moment';
import { createDbfamily } from "../Database/dbQuerry/family.js";

export const createFamily = (req, res) => {

  const nextAuthToken = req.cookies['next-auth.session-token'];

  const token = req.cookies.accessToken || nextAuthToken;

  if (!token) return res.status(401).json("Not logged in");

  if (!req.body.familyName) return res.status(400).json("No family name provided");

  const user = req.params.userId;

  createDbfamily(req, res, user);

  // jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
  //   if(err) return res.status(403).json("Token is invalid!")


  //   //CREATE family ROW
  
  //   const q = "INSERT INTO family (`familyName`, `createdAt`) VALUES (?)"

  //   const values = [
  //     req.body.familyName,
  //     moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  //   ]

    // db.query(q, [values], (err, data) => { 
    //   if (err) return res.status(500).json(err);
    //   console.log(data);

    //   //ADD the creator of the family as the First Member

    //   const q = "INSERT INTO familyMember (`familyId`, `userId`) VALUES (?)"

    //   const values = [
    //     data.insertId,
    //     userInfo.id
    //   ]

    //   db.query(q, [values], (err, data) => { 
    //     if (err) return res.status(500).json(err);
    //     console.log(data);

    //     return res.status(200).json("Family created successfully");
    //   });
    // });
  // });  

};