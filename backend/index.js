const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json({limit:"50mb",extended:true}));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(port, () => console.log(`Server is running on port: ${port}`)))
.catch((error) => console.log(error.message));