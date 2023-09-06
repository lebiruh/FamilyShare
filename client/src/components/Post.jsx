"use client"

import React, { useState } from 'react';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, MoreVert, Share, TextsmsOutlined, Delete } from '@mui/icons-material';
// import DeleteIcon from '@mui/icons-material/Delete';
import { addLike, getLikes, removeLike } from '@/query/Likes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import Comments from './Comments';
import DeletePosts from './deletePosts';
import { getComments } from '@/query/comments';
import Image from 'next/image';


const Post = ({data, userId}) => {

  const [commentsOpen, setCommentsOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const postBy = data?.firstName 

  const postId = data?.id;

  const posterId = data?.userId;

  const likesQuery = useQuery({ queryKey: ['likes', postId], queryFn: () => getLikes(postId), enabled: !!postId})

  const numberOfLikesCount = likesQuery?.data?.length;

  const likeUserIds = likesQuery.data?.map(data => data.userId);

  console.log("likeUserIds: ", likeUserIds);

  const queryClient = useQueryClient();

  const addLikeMutation = useMutation({
      mutationFn: ({postId, userId}) => addLike(postId, userId),
      onSuccess: () => {queryClient.invalidateQueries({queryKey: ['likes', postId]})}
    })

  const removeLikeMutation = useMutation({
      mutationFn: ({postId, userId}) => removeLike(postId, userId),
      onSuccess: () => {queryClient.invalidateQueries({queryKey: ['likes', postId]})}
    })

  const handleLike = () => {

    if (!likeUserIds.includes(userId)) {
      addLikeMutation.mutate({postId, userId});
    }
    
    removeLikeMutation.mutate({postId, userId}); 
  }

  // const commentsQuery = useQuery({ queryKey: ['comments', postId], queryFn: () => getComments(postId), enabled: !!postId})

  // console.log("comments query: ", commentsQuery);

  // const comments = [
  //   {
  //     id: 1,
  //     author: "Biruh",
  //     text: "Welcome",
  //     date: "2023-07-08"
  //   },
  //   {
  //     id: 2,
  //     author: "Author",
  //     text: "Weldone",
  //     date: "2023-07-08"
  //   },
  //   {
  //     id: 3,
  //     author: "GetComments",
  //     text: "I love it.",
  //     date: "2023-07-08"
  //   },
  // ]

  // const comments = commentsQuery.data;

  // console.log("comments are: ", comments);
  const filepath = `/upload/${data.image}`

  console.log("File path is: ", filepath);

  return (
    <Card sx={{margin: 2, position:"relative"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#1976d2' }} aria-label="user">
            {postBy[0]}
          </Avatar>
        }
        action={ posterId === userId ? 
          (<IconButton aria-label="settings" onClick={() => setDeleteOpen(!deleteOpen)}>
            <Delete />
          </IconButton>) : null
        }
        title={postBy}
        subheader= {moment(data.createdAt).fromNow()}
      />
      {deleteOpen && <DeletePosts />}
      {data.image && <CardMedia
        component='img'
        height="20%"
        image={`/upload/${data.image}`}
        alt="Paella dish"
        
      />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          {likeUserIds?.includes(userId) ? 
            <Favorite htmlColor='red' /> : 
            <FavoriteBorder/>
          }
                   
        </IconButton>
        <Typography variant="body2" width={50}>
          {numberOfLikesCount === 0 || undefined ?
            "" : 
            numberOfLikesCount === 1 ?
            `${numberOfLikesCount} like` :
            `${numberOfLikesCount} likes`
          }
        </Typography>
        <IconButton sx={{ ml: 3}} aria-label="comments" onClick={() => setCommentsOpen(!commentsOpen)}>
          <TextsmsOutlined />          
        </IconButton>
        <Typography variant="body2">
            comments
        </Typography>
      </CardActions>
      {commentsOpen && <Comments userId={userId} postId={postId}/>}
    </Card>
  )
}

export default Post