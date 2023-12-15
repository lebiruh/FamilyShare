import {db} from "../../connectDB.js";

export const getDbUser = (req, res, userEmail) => {

  const q = "SELECT users.* FROM users WHERE users.email = (?)";

    db.query(q, [userEmail], (err, data) => { 

      if (err) return res.status(500).json(err);

      const {password, ...others} = data[0];

      return res.status(200).json(others);

    });

}