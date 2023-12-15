"use client"
import {Box} from '@mui/material'
import React from 'react'
import {
  useQuery,
} from '@tanstack/react-query'
import styled from '@emotion/styled'
import { getFamilies } from '@/query/Family'
import HomeFamilyData from './HomeFamilyData'
import { getUserByEmail } from '@/query/User'
import Loading from './Loading'

const Home = ({userEmail}) => {

  const UserBox = styled(Box) ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
})

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