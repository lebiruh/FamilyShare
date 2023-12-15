import {db} from "../../connectDB.js";


export const searchDbUser = (req, res) => {

  const q = "SELECT users.* FROM users";

    db.query(q, (err, data) => { 

      if (err) return res.status(500).json(err);

      const { query } = req.query;
        const results = data.filter((user) =>
        user.firstName.toLowerCase().includes(query.toLowerCase())
      );
      res.json(results)

    });

};