import {db} from "../../connectDB.js";


// Mock data
// const users = [
//   { id: 1, name: 'John Doe', email: 'john@example.com' },
//   { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
// ];

export const searchDbUser = (req, res) => {

  const q = "SELECT users.* FROM users";

    db.query(q, (err, data) => { 

      if (err) return res.status(500).json(err);

      // if (err) return err;
      
      // console.log("userData from backend is: ", data[0]);

      // console.log("userData from backend is: ", data[0].id);

      // const {password, ...others} = data[0];
      const { query } = req.query;
        const results = data.filter((user) =>
        user.firstName.toLowerCase().includes(query.toLowerCase())
      );
      res.json(results)

      // return res.status(200).json(others);
      // return data;
    });

  // const { query } = req.query;
  // const results = users.filter((user) =>
  //   user.name.toLowerCase().includes(query.toLowerCase())
  // );
  // res.json(results);
};