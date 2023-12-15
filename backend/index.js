import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import createFamilyRoutes from './routes/createFamily.js';
import addFamilyMemberRoutes from './routes/addFamilyMember.js';
import getFamilyRoutes from './routes/getFamily.js';
import cookieParser from 'cookie-parser';
import removeLikeRoute from "./routes/removeLike.js";
import deletePostRoute from "./routes/deletePost.js";
import searchUserRoute from "./routes/searchUser.js";
import multer from "multer";
import path from "path";


dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors({ credentials: true, origin: process.env.LOCAL_HOST, }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('../FamilyShare/client/public/upload'))
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({storage: storage}) 

app.post('/api/upload', upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename)
})

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/removelike', removeLikeRoute);
app.use('/api/createFamily', createFamilyRoutes);
app.use('/api/addFamilyMember', addFamilyMemberRoutes); 
app.use('/api/getFamily', getFamilyRoutes); 
app.use('/api/deletePost', deletePostRoute); 
app.use('/api/search', searchUserRoute); 


app.listen(port, () => {
  console.log(`listening on port ${port}`)
});


