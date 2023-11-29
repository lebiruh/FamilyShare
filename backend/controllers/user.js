import { getDbUser } from "../Database/dbQuerry/dbUser.js";
import { searchDbUser } from "../Database/dbQuerry/searchDbUser.js";


export const getUser = (req, res) => {

  console.log("params object is: ", req.params);

  const userEmail = req.params.userEmail;

  if (userEmail === 'undefined') {
    return res.status(200).json("User not found");
  }

  getDbUser(req, res, userEmail);

  // console.log("response is: ", response);

  // res.json(response);
}

export const searchUser = (req, res) => {

  // console.log("params object is: ", req.params);

  const { query } = req.query;

  if ( query === 'undefined' || query === '') {
    return res.status(200).json("User not found");
  }

  searchDbUser(req, res);

  // console.log("response is: ", response);

  // res.json(response);
}