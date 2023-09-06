"use client"
import Timeline from '@/components/Timeline'
import Leftbar from '@/components/Leftbar'
import Rightbar from '@/components/Rightbar'
import { Box, Stack } from '@mui/material'
import Navbar from '@/components/Navbar'
import AddPost from '@/components/AddPost'
import {useRouter} from 'next/navigation'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { getUserByEmail } from '@/query/User'


export default function Home({params}) {

  console.log(params);
  const familyId = params.id

  const router = useRouter();

  const session = useSession();

  console.log("session: ", session);

  if(session.status === 'loading') {
    return (
    <Box sx={{ bgcolor: '#f3f2ef', minHeight: '100vh', width: '100vw', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
      <div>Loadig...</div>
    </Box>
    )
  }
  if(session.status === 'unauthenticated') {
    return (
    <Box sx={{ bgcolor: '#f3f2ef', minHeight: '100vh', width: '100vw', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
      <div>Error...</div>
    </Box>
    )
  }

  const userEmail = session.data?.token.email;

  const { data: user } = useQuery({ queryKey: ["user", userEmail], queryFn: () => getUserByEmail(userEmail) })

  const userId = user?.data?.id;  

  console.log("UserId on timeline: ", userId);


  return (
    <Box sx={{ bgcolor: '#f3f2ef', minHeight: '100vh', display: "flex", flexDirection: 'column', alignItems: "center"}}>
      <Navbar />
      <Stack spacing={2} 
        direction='row'
        justifyContent= "center"
        sx={{ width: '75vw'}}
      >        
        <Leftbar />
        <Timeline familyId={familyId} userId={userId}/>
        <Rightbar />
      </Stack>
      <AddPost />
    </Box>
  )
}
