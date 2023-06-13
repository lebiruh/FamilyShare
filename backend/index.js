import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';


dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
});


// mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
// .then(() => app.listen(port, () => console.log(`Server is running on port: ${port}`)))
// .catch((error) => console.log(error.message));