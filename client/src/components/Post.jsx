"use client"

import React, { useState } from 'react';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, TextsmsOutlined, Delete } from '@mui/icons-material';

import { addLike, getLikes, removeLike } from '@/query/Likes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import Comments from './Comments';
import DeletePosts from './deletePosts';



const Post = ({data, userId, handleDelete}) => {

  const [commentsOpen, setCommentsOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const postBy = data?.firstName 

  const postId = data?.id;

  const posterId = data?.userId;

  const familyId = data?.familyId

  const likesQuery = useQuery({ queryKey: ['likes', postId], queryFn: () => getLikes(postId), enabled: !!postId})

  const numberOfLikesCount = likesQuery?.data?.length;

  const likeUserIds = likesQuery.data?.map(data => data.userId);

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
      addLikeMutation.mutate({postId, userId});
  }

  const handleDislike = () => {
    removeLikeMutation.mutate({postId, userId}); 
  }


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
          (<IconButton aria-label="settings" onClick={() => handleDelete(postId)}>
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
        {/* <IconButton aria-label="add to favorites" onClick={handleLike}> */}
          {likeUserIds?.includes(userId) ? 
            <IconButton aria-label="add to favorites" onClick={handleDislike}>
              <Favorite htmlColor='red' />
            </IconButton> : 
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              <FavoriteBorder/>
            </IconButton>
          }
                   
        {/* </IconButton> */}
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