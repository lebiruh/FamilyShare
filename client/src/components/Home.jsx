"use client"
import {Box} from '@mui/material'
import React from 'react'
import Post from './Post'
import { getPosts } from '@/query/Posts'
import {
  useQuery,
} from '@tanstack/react-query'
// import { notFound } from 'next/navigation'
import styled from '@emotion/styled'
import { getFamilies } from '@/query/Family'
import HomeFamilyData from './HomeFamilyData'
import { getUserByEmail } from '@/query/User'
import Loading from './Loading'
// import { Image, VideoCameraBack } from '@mui/icons-material'

const Home = ({userEmail}) => {

  const UserBox = styled(Box) ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
})

  // Access the client
  // const queryClient = useQueryClient()

  // Queries

  const { data: user } = useQuery({ queryKey: ["user", userEmail], queryFn: () => getUserByEmail(userEmail) })

  console.log("userData for family frontend is: ", user);

  const userId = user?.data?.id;

  console.log("The user ID is: ", userId);

  const familiesQuery = useQuery({ queryKey: ["families", userId], queryFn: () => getFamilies(userId), enabled: !!userId })

  console.log("data is: ", familiesQuery);

  return (
    <Box flex={3}>
      {
        familiesQuery.isLoading ? 
        <Loading /> :
        familiesQuery.error ? 
        <h1>Error</h1> :
        familiesQuery?.data?.data.map((data, idx) => (
        <HomeFamilyData data = {data} key={idx}/>
      ))
      }
    </Box>
  )
}

export default Home;