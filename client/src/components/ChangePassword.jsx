import styled from '@emotion/styled'
import { Box, Button, Fab, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
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

const ChangePassword = ({userId, userEmail}) => {
  const [open, setOpen] = useState(false);

  const [newPasswordData, setNewPasswordData] = useState({oldPassword: '', newPassword: '', confirmNewPassword: ''})


  const handleChange = (e) => {
    setNewPasswordData(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }

  const queryClient = useQueryClient();


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setOpen(false)
  }

  return (
    <>
      <Tooltip  onClick={e => setOpen(true)}>
        <Typography>
          Change Password
        </Typography>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={e => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={500} height={350} bgcolor='white' borderRadius={5} p={3}>
          <Typography variant='h6' color='gray' textAlign='center'> Change Password</Typography>
          <TextField
            label="Type your old password"
            type="password"
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            required
            name="oldPassword"
            value={newPasswordData.oldPassword}
            onChange={handleChange}
          />
          <TextField
            label="Type your new password"
            type="password"
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            required
            name="oldPassword"
            value={newPasswordData.newPassword}
            onChange={handleChange}
          />
          <TextField
            label="Retype your new password"
            type="password"
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            required
            name="oldPassword"
            value={newPasswordData.confirmNewPassword}
            onChange={handleChange}
          />
          <Stack direction='row' gap={1} mt={4} mb={2}>
            <Button variant='outlined'sx={{width: '200px'}} onClick={handleSubmit}>Save password</Button>
          </Stack>
        </Box>
      </StyledModal>
    </>
  )
}

export default ChangePassword