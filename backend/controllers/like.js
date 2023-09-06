import { addDbLikes, getDbLikes, removeDbLikes } from "../Database/dbQuerry/dbLikes.js";

export const getLikes = (req, res) => {

  getDbLikes(req, res);

  // res.send("Hello, world from likes!");
}

export const addLike = (req, res) => {

  addDbLikes(req, res);

  // res.send("Hello, world from likes!");
}

export const removeLike = (req, res) => {

  removeDbLikes(req, res);

  // res.send("Hello, world from likes!");
}