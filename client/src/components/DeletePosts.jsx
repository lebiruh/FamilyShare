import { Box, Paper, Typography } from "@mui/material"


const DeletePosts = () => {
  return (
    <Box sx={{position:"absolute", top: 10, right: 10, bgcolor: "gray"}}  width={100}>
      <Typography variant="body1" sx={{ color: "red" }}>
        Delete post
      </Typography>
    </Box>
  )
}

export default DeletePosts