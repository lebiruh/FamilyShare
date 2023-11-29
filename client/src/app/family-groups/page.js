"use client"
// import styles from './page.module.css'
// import Timeline from '@/components/Timeline'
import Leftbar from '@/components/Leftbar'
import Rightbar from '@/components/Rightbar'
import { Box, Stack, CircularProgress } from '@mui/material'
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
// import { useState } from 'react'
// import HomeFamilyData from '@/components/HomeFamilyData'
import Home from '@/components/Home'
import Loading from '@/components/Loading'
import { getUserByEmail } from '@/query/User'
// import checkCookie from '@/helpers/checkCookie'
// import Cookies from 'js-cookie';
// import { useRouter as useNextRouter } from 'next/router';
// import { Height } from '@mui/icons-material'

export default function FamilyGroupsPage() {

  // const [err, setErr] = useState(false);

  // const queryClient = new QueryClient();

  const router = useRouter();

  const session = useSession();

  const userEmail = session.data?.token.email;

  console.log(userEmail);

  // console.log("Session is: ", session);

  // const userQuery = useQuery({ queryKey: ["user", userEmail], queryFn: getUserByEmail(userEmail) })


  const { data: user } = useQuery({ queryKey: ["user", userEmail], queryFn: () => getUserByEmail(userEmail), enabled: !!userEmail })

  const userId = user?.data?.id;  

  
  if(session.status === 'loading') {
    return (
    <Box sx={{ bgcolor: '#f3f2ef', minHeight: '100vh', width: '100vw', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
      <CircularProgress />
    </Box>
    )
  }
  if(session.status === 'unauthenticated') {
    return (
    <Box sx={{ bgcolor: '#f3f2ef', minHeight: '100vh', width: '100vw', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
      <div>Not authenticated...</div>
    </Box>
    )
    // router.push("/login");   
  }

  // router.push("/family-groups");


  return (
    // user ? (
      // <QueryClientProvider client={queryClient}>
        <Box sx={{ bgcolor: '#f3f2ef', minHeight: '100vh', display: "flex", flexDirection: 'column', alignItems: "center"}}>
          <Navbar userEmail={userEmail}/>
          <Stack spacing={2} 
            direction='row'
            justifyContent= "center"
            sx={{ width: '75vw'}}
          >        
            <Leftbar />
            <Home userEmail={userEmail}/>
            <Rightbar />
          </Stack>
          <AddPost userId={userId} userEmail={userEmail}/>
        </Box>
      // </QueryClientProvider>
    // ) :
    // router.push('/login')
  )
}
