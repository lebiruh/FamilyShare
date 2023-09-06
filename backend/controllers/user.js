import { getDbUser } from "../Database/dbQuerry/dbUser.js";


export const getUser = (req, res) => {

  console.log("params object is: ", req.params);

  const userEmail = req.params.userEmail;

  getDbUser(req, res, userEmail);

  // console.log("response is: ", response);

  // res.json(response);
}