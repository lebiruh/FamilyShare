"use client"
import React, { useState } from 'react'
import {Avatar, Box, Button, Stack, TextField, Typography, CircularProgress} from '@mui/material'
import Post from './Post'
import { addPosts, deletePost, getPosts } from '@/query/Posts'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient
} from '@tanstack/react-query'
// import { notFound } from 'next/navigation'
import styled from '@emotion/styled'
import { Image, VideoCameraBack } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import { getUserByEmail } from '@/query/User'
import axios from 'axios'
// import FileBase from 'react-file-base64';

const Timeline = ({familyId, userId}) => {

  const session = useSession();

  // console.log("Timeline user: ", session);

  const userEmail = session.data?.token.email;

  const { data: user } = useQuery({ queryKey: ["user", userEmail], queryFn: () => getUserByEmail(userEmail), enabled: !!userEmail })

  // const userId = user?.data?.id;  

  // console.log("UserId on timeline: ", userId);

  const [file, setFile] = useState(null)

  const [postData, setPostData] = useState({userId: userId, content: '', familyId: familyId})

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("file is: ", formData);
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  const UserBox = styled(Box) ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
})

  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ['posts', familyId], queryFn: () => getPosts(familyId) })

  const handleChange = (e) => {
    setPostData(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }

  const mutation = useMutation({
      mutationFn: (postData) => addPosts(postData, familyId),
      onSuccess: () => {queryClient.invalidateQueries({queryKey: ['posts', familyId]})}
    })

  const getPostsMutation = useMutation({
      mutationFn: ({postId}) => deletePost(postId),
      onSuccess: () => {queryClient.invalidateQueries({queryKey: ['posts', familyId]})}
    })

  const handleDelete = (postId) => {
    console.log("Delete post: " + postId);   
    getPostsMutation.mutate({postId}); 
  }

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("post");
    let imgUrl = "";
    if(file) imgUrl = await upload();
    mutation.mutate({...postData, image: imgUrl});
    setPostData({userId: userId, content: '', familyId: familyId})
    setFile(null);
  }

  return (
    <Box flex={3}>
      <Box height={150} bgcolor='white' borderRadius={5} p={3} m={2}>
          <UserBox>
            <Avatar sx={{width: 30, height: 30}}/>
            <Typography>{user?.data?.firstName}</Typography>            
          </UserBox>
          <Box >
            <TextField sx={{width:'80%'}} id='standard-multiline-static' multiline rows={2} placeholder="What's on your mind?" variant='standard' name="content"
            value={postData.content}
            onChange={handleChange}/>
            {file && <img src={URL.createObjectURL(file)} alt="" style={{width: "50px", height: "50px", objectFit: "cover"}} />}
          </Box>
          

            <Stack direction='row' mt={2} mb={3} alignItems="center" justifyContent="space-between">
            <Stack direction='row' gap={2}>
              <input type="file" id="file" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])}/>
              <label htmlFor='file'>
                <Image color='secondary' cursor='pointer' />
              </label>
              <VideoCameraBack color='success' cursor='pointer'/>
            </Stack>
              <Button variant='contained' sx={{width: '100px'}} onClick={handleSubmit}>Post</Button>              
            </Stack>
        </Box>
      {
        query.isLoading ? 
        <CircularProgress /> :
        query.error ? 
        <h1>Error</h1> :
        query?.data.map((data, idx) => (
        <Post data = {data} userId={userId} handleDelete={handleDelete} key={idx}/>
      ))
      }
    </Box>
  )
}

export default Timeline