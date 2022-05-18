import {
  AppBar,
  Button,
  Container,
  Grid,
  Menu,
  Modal,
  MenuItem,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from '@mui/material'
import { BsShop } from 'react-icons/bs'
import { BiRss } from 'react-icons/bi'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { Box } from '@mui/system'
import React from 'react'
import { useAgentHomePageStyles } from '../../styles/agentStyle'
import SettingsIcon from '@mui/icons-material/Settings'
import AddIcon from '@mui/icons-material/Add'
import HomeFeedCard from '../../components/cards/HomeFeedCard'
import { Link } from 'react-router-dom'
import AgentHeader from '../../components/shared/agent/Header'
import AgentNavbar from '../../components/shared/agent/NavBar'
import PostButtons from '../../components/shared/vendor/PostButtons'

const AgentHome = () => {
  const classes = useAgentHomePageStyles()
  const [open, setOpen] = React.useState(false)
  const [openUser, setOpenUser] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleOpenUser = () => setOpenUser(true)
  const handleCloseUser = () => setOpenUser(false)
  return (
    <Box sx={{ padding: '1rem 0' }}>
      <Container>
        <AgentHeader />
        <AgentNavbar />
        <PostButtons />
        {/* <div className={classes.lead}>
          <Typography>You are currently handling 10 farmers</Typography>

          <div className={classes.buttonContainer}>
            <Button variant='agent-plain' startIcon={<SettingsIcon />}>
              Delete
            </Button>
            <Link to='/agent/farmers'>
              <Button variant='agent' startIcon={<AddIcon />}>
                New Farmer
              </Button>
            </Link>
          </div>
        </div> */}

        <Grid container spacing={3} sx={{ padding: '2rem 0' }}>
          <HomeFeedCard />
          <HomeFeedCard />
          <HomeFeedCard />
          <HomeFeedCard />
        </Grid>
      </Container>
    </Box>
  )
}

export default AgentHome
