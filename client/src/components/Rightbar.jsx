import { Box } from '@mui/material'
import React from 'react'

const Rightbar = () => {
  return (
    <Box flex={1} p={2} sx={{display: {xs: "none", md: "block"}, bgcolor:'#fff', borderRadius: '10px', height: '100vh' }}>
      <Box position='fixed'>
        Rightbar
      </Box>
    </Box>
  )
}

export default Rightbar