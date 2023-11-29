import {db} from "../../connectDB.js";
// import moment from 'moment';

export const getDbUser = (req, res, userEmail) => {

  // const q = "SELECT p.*, u.id AS userId, firstName FROM posts AS p JOIN users AS u ON (p.userId = u.id)"
  // const email = req.params.userEmail;
  const q = "SELECT users.* FROM users WHERE users.email = (?)";

    db.query(q, [userEmail], (err, data) => { 

      if (err) return res.status(500).json(err);

      // if (err) return err;
      
      console.log("userData from backend is: ", data[0]);

      // console.log("userData from backend is: ", data[0].id);

      const {password, ...others} = data[0];

      return res.status(200).json(others);
      // return data;
    });

}