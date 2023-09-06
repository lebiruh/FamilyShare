import {db} from "../../connectDB.js";
// import moment from 'moment';

export const getDbLikes = (req, res) => {

  // const q = "SELECT p.*, u.id AS userId, firstName FROM posts AS p JOIN users AS u ON (p.userId = u.id)"
  const postId = req.params.postId;

  console.log("Post Id for Likes: " + postId);

  const q = `
    SELECT likes.*
    FROM likes
    WHERE likes.postId = ?
  `;

    db.query(q, postId, (err, data) => { 
      if (err) return res.status(500).json(err);
      // console.log(data);
      return res.status(200).json(data);
    });

}

export const addDbLikes = (req, res) => {

  // const q = "SELECT p.*, u.id AS userId, firstName FROM posts AS p JOIN users AS u ON (p.userId = u.id)"
  const postId = req.params.postId;
  const userId = req.body.userId;

  console.log("Post Id for addLikes: " + postId);
  console.log("Post Id for addLikes: " + userId);
        
  const query = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

  const values = [userId, postId];

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}

export const removeDbLikes = (req, res) => {

  // const q = "SELECT p.*, u.id AS userId, firstName FROM posts AS p JOIN users AS u ON (p.userId = u.id)"
  // const postId = req.params.postId;
  const userId = req.body.userId;

  console.log("Post Id for removeLikes: " + userId);

  const q = `DELETE FROM likes WHERE likes.userId = ?`;

    db.query(q, userId, (err, data) => { 
      if (err) return res.status(500).json(err);    

      return res.status(200).json(data);
    });

}
