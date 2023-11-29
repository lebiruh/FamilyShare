import {db} from "../../connectDB.js";
import moment from 'moment';

export const getDbPosts = (req, res) => {

  // const q = "SELECT p.*, u.id AS userId, firstName FROM posts AS p JOIN users AS u ON (p.userId = u.id)"
  const familyId = req.params.familyId;
  const q = `
    SELECT posts.*, users.firstName, users.lastName
    FROM posts
    JOIN users ON posts.userId = users.id
    JOIN familymember ON users.id = familymember.userId
    WHERE familymember.familyId = ? AND posts.familyId = ?
    ORDER BY posts.createdAt DESC
  `;

    db.query(q, [familyId, familyId], (err, data) => { 
      if (err) return res.status(500).json(err);
      // console.log(data);
      return res.status(200).json(data);
    });

}
export const addDbPosts = (req, res) => {

  const q = "INSERT INTO posts (`userId`, `familyId`, `content`, `image`, `createdAt`) VALUES (?)"

  const values = [
    req.body.userId,
    req.params.familyId,
    req.body.content,
    req.body.image,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  ]

  db.query(q, [values], (err, data) => { 
    if (err) return res.status(500).json(err);
    // console.log(data);
    return res.status(200).json("Post has been created");
  });
}

export const deleteDbPost = (req, res) => {

  const postId = req.params.postId

  const q = "DELETE FROM posts WHERE id = ?"


  db.query(q, [postId], (err, data) => { 
    if (err) return res.status(500).json(err);
    // console.log(data);
    return res.status(200).json("Post has been deleted!");
  });

}