import { Box, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { useMessageInputStyle } from '../../styles/MessagingStyle'
import SendIcon from '@mui/icons-material/Send'

const MessageInputField = ({ sendMsg }) => {
  const classes = useMessageInputStyle()
  const [text, setText] = useState('')

  return (
    <Box sx={{ position: 'sticky', bottom: '0' }}>
      <form
        className={classes.wrapForm}
        noValidate
        autoComplete='off'
        onSubmit={(e) => {
          e.preventDefault()
          sendMsg(text)
          setText('')
        }}
      >
        <TextField
          id='standard-text'
          label='Type message here'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={classes.wrapText}
        />
        <Button className={classes.button} type='submit'>
          <SendIcon />
        </Button>
      </form>
    </Box>
    // <Box sx={{ position: 'sticky', bottom: 0 }}>
    // </Box>
  )
}

export default MessageInputField
