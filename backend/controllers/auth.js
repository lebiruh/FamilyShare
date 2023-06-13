import bcrypt from 'bcryptjs'
import {db} from '../connectDB.js';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

export const register = (req, res) => {
  
  //CHECK if USER EXISTS

  const q = "SELECT * FROM users WHERE email = ?"

  db.query(q, [req.body.email], (err,data) => {
    if (err)  return res.status(500).json(err);
    if(data.lengthen) return res.status(409).json("User already exists!");

    //CREATE NEW USER
      //Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      
      const q = "INSERT INTO users (firstName, lastName, email, password) VALUES (?)"

      const values = [req.body.firstName, req.body.lastName, req.body.email, hashedPassword]

      db.query(q, [values], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.")
      });

})
}

export const logIn = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err,data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const isPassword = bcrypt.compareSync(req.body.password, data[0].password);

    if (!isPassword) return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({id: data[0].id}, process.env.JWT_SECRET);

    const {password, ...other} = data[0];

    res.cookie("accessToken", token, {
      httpOnly: true,
    }).status(200).json(other);
  });
}

export const logOut = (req, res) => {
  res.send("Hello, world from logout!");
}