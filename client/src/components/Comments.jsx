import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { addComment, getComments } from "@/query/comments";

const Comment = ({ comment }) => {

  const { firstName, content, createdAt } = comment;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Avatar sx={{ mr: 1, ml: 2 }} />
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {firstName}
        </Typography>
        <Typography variant="body2">{content}</Typography>
        <Typography variant="caption" color="text.secondary">
          {moment(createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

const Comments = ({ userId, postId }) => {

  const [newComment, setNewComment] = useState({userId: userId, postId: postId, content:""});

  const queryClient = useQueryClient();

  const commentsQuery = useQuery({ queryKey: ['comments', postId], queryFn: () => getComments(postId), enabled: !!postId})

  console.log("comments query: ", commentsQuery);

  const comments = commentsQuery.data;

  console.log("comments are: ", comments);

  const handleChange = (e) => {
    setNewComment(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }

  const commentMutation = useMutation({
      mutationFn: (newComment) => addComment(newComment),
      onSuccess: () => {queryClient.invalidateQueries({queryKey: ['comments', postId]})}
    })

  const handleAddComment = (event) => {
    event.preventDefault();
    //TODO: Handle adding new comment
    commentMutation.mutate(newComment, postId);
    setNewComment({userId: userId, postId: postId, content:""});
  };

  return (
    <Box sx={{ m: 2 }}>
      <Box
        component="form"
        onSubmit={handleAddComment}
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <TextField
          value={newComment.content}
          onChange={handleChange}
          label="Add a comment"
          variant="outlined"
          name="content"
          sx={{ flex: 9, mr: 1}}
        />
        <Button type="submit" variant="outlined" sx={{ flex: 1, fontSize: "12px"}}>
          comment
        </Button>
      </Box>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Box>
  );
};

export default Comments