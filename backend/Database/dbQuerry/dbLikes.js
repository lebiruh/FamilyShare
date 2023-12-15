import {db} from "../../connectDB.js";
// import moment from 'moment';

export const getDbLikes = (req, res) => {

  const postId = req.params.postId;


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

  const postId = req.params.postId;
  const userId = req.body.userId;
        
  const query = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

  const values = [userId, postId];

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });

}

export const removeDbLikes = (req, res) => {

  const userId = req.body.userId;

  const q = `DELETE FROM likes WHERE likes.userId = ?`;

    db.query(q, userId, (err, data) => { 
      if (err) return res.status(500).json(err);    

      return res.status(200).json(data);
    });

}
