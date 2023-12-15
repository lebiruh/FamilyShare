import { createFamily } from '@/query/Family'
import { getUserByEmail } from '@/query/User'
import styled from '@emotion/styled'
import { Add } from '@mui/icons-material'
import { Avatar, Box, Button, Fab, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

const StyledModal = styled(Modal) ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
const UserBox = styled(Box) ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
})

const AddPost = ({userId, userEmail}) => {
  const [open, setOpen] = useState(false);

  const [familyData, setFamilyData] = useState({userId: userId, familyName: ''})


  const { data: user } = useQuery({ queryKey: ["user", userEmail], queryFn: () => getUserByEmail(userEmail), enabled: !!userEmail })

  const handleChange = (e) => {
    setFamilyData(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
      mutationFn: (familyData) => createFamily(familyData, userId),
      onSuccess: () => {queryClient.invalidateQueries({queryKey: ["families", userId]})}
    })

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("post");
    mutation.mutate(familyData);
    setFamilyData({userId: userId, familyName: ''})
    setOpen(false)
  }

  return (
    <>
      <Tooltip sx={{position: 'fixed', bottom: 20, left: {xs: 'calc(50% - 25px)', md: 30}}} onClick={e => setOpen(true)}>
        <Fab color='primary' aria-label='add'>
          <Add />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={e => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={240} bgcolor='white' borderRadius={5} p={3}>
          <Typography variant='h6' color='gray' textAlign='center'> Create a Group</Typography>
          <UserBox>
            <Avatar sx={{width: 30, height: 30}}/>
            <Typography fontWeight={500} variant='span'>{`${user?.data?.firstName} ${user?.data?.lastName}`}</Typography>
          </UserBox>
          <TextField sx={{width:'100%'}} id='standard-multiline-static' multiline rows={2} placeholder="Group name..." variant='standard' name='familyName' onChange={handleChange} />
          <Stack direction='row' gap={1} mt={4} mb={2}>
            <Button variant='contained'sx={{width: '100px'}} onClick={handleSubmit}>Create</Button>
          </Stack>
        </Box>
      </StyledModal>
    </>
  )
}

export default AddPost