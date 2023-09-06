import { addDbComment, getDbComments } from "../Database/dbQuerry/dbComments.js"

export const getComments = (req, res) => {
  getDbComments(req, res);
}

export const addComment = (req, res) => {
  addDbComment(req, res);
}