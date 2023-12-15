import {db} from "../../connectDB.js";
import moment from 'moment';

export const getDbComments = (req, res) => {

    const postId = req.params.postId;

  const q = `
    SELECT comments.*, users.firstName, users.lastName
    FROM comments
    JOIN users ON comments.userId = users.id
    WHERE comments.postId = ? 
    ORDER BY comments.createdAt DESC
  `;

    db.query(q, [postId], (err, data) => { 
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });

}

export const addDbComment = (req, res) => {

  const q = "INSERT INTO comments (`userId`, `postId`, `content`, `createdAt`) VALUES (?)"

  const values = [
    req.body.userId,
    req.params.postId,
    req.body.content,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  ]

  db.query(q, [values], (err, data) => { 
    if (err) return res.status(500).json(err);
    // console.log(data);
    return res.status(200).json("Comment has been created");
  });

}