import {db} from "../../connectDB.js";
import moment from 'moment';

export const getDbfamily = (req, res, user) => {

  const familyMember = "SELECT * FROM familyMember WHERE userId = ?"

    db.query(familyMember, user, (err,data) => {
      if (err)  return err;

      // Extract the familyId values from the data
      const familyIds = data.map(item => item.familyId);
      
      const family = "SELECT * FROM family WHERE id IN (?)"

      db.query(family, [familyIds], (err,data) => {

        if (err) return res.status(500).json(err);

        if(data.length) return res.status(200).json(data);


      });

    })
}

export const createDbfamily = (req, res, user) => {

  const q = "INSERT INTO family (`familyName`, `createdAt`) VALUES (?)"

  const values = [
    req.body.familyName,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  ]

  db.query(q, [values], (err, data) => { 
    if (err) return res.status(500).json(err);

    const q = "INSERT INTO familyMember (`familyId`, `userId`) VALUES (?)"

    const values = [
      data.insertId,
      user
    ]

    db.query(q, [values], (err, data) => { 
      if (err) return res.status(500).json(err);

      return res.status(200).json("Family created successfully");
    });
  });
}