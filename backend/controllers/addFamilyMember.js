import {db} from "../connectDB.js";
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const addFamilyMember = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  if (!req.body.firstName || !req.body.lastName)  return res.status(400).json("All fields are required");

  // if (!req.body.familyName) return res.status(400).json("No family name provided");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if(err) return res.status(403).json("Token is invalid!");

    // console.log(userInfo);

    const userName = "SELECT * FROM users WHERE firstName = ? AND lastName = ?"

    db.query(userName, [req.body.firstName, req.body.lastName], (err,data) => {
      if (err)  return res.status(500).json(err);

      //CHECK if user ALREADY exists in familyMember table

      const familyMember = "SELECT * FROM familyMember WHERE userId = ?"

      db.query(familyMember, [data[0].id], (err,data) => {

        if (err)  return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exists!");

      });
      
      // if(data.length) return res.status(409).json("User already exists!");      

      // console.log("User Data:", data);
      // console.log(req.params);

      //ADD USER TO familyMember Table
      
      const addFamilyMember = "INSERT INTO familyMember (`familyId`, `userId`) VALUES (?)";
      const values = [req.params.familyId, data[0].id]
      
      db.query(addFamilyMember, [values], (err,data) => {

        if (err)  return res.status(500).json(err);

        return res.status(200).json("Family member added successfully");

      });
    
    })
  
  });  

};