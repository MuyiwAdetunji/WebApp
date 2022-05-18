import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Popper,
  Divider,
  MenuList,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchNavStyles } from '../../styles/styles'
import { ImFire } from 'react-icons/im'
import { RiShoppingBag3Line } from 'react-icons/ri'
import { FiTruck } from 'react-icons/fi'
import { IoListOutline } from 'react-icons/io5'
import { LoadingIcon } from '../../icons'
import ListIcon from '@mui/icons-material/List'

import { getAllCategories, getAllSubCategories } from '../../apis'

const FeedNav = () => {
  const classes = useSearchNavStyles()
  // const [open, setOpen] = useState(true)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [placement, setPlacement] = useState()
  const [categorySub, setCategorySub] = useState([])

  // const arrowRef = useRef()
  // console.log(categorySub)

  useEffect(() => {
    loadCategories()
    // loadSubCategories()
  }, [])

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget)
    console.log(e)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  // Load All Categories
  const loadCategories = async () => {
    setLoading(true)
    const res = await getAllCategories()
    setLoading(false)
    setCategories(res.category)
  }

  // const loadSubCategories = async () => {
  //   setLoading(true)
  //   const res = await getAllSubCategories()
  //   setLoading(false)
  //   setSubCategories(res.subCategory)
  // }

  // const getSub = (categoryId) => {
  //   const sub = subCategories.filter((a) => a.parent === categoryId)
  //   const data = sub.map((s) => s.name)
  //   setCategorySub(data)
  //   console.log(data)
  // }

  // const result = categories.map((category) => {
  //   category.subCategories = subCategories.filter(
  //     (a) => a.parent === category._id
  //   )
  //   return category
  // })
  // sx={{ maxHeight: '90vh', overflowY: 'scroll', position: 'sticky' }}
  return (
    <MenuList>
      <MenuItem sx={{ py: 1, backgroundColor: '#F9E6C8' }}>
        <ListIcon fontSize='large' sx={{ color: '#EE960A', pr: 1 }} />
        <Typography variant='h6' component='nav' color='#EE960A'>
          ALL CATEGORIES
        </Typography>
      </MenuItem>
      {categories.length > 0 &&
        categories.map((category) => (
          <MenuItem
            key={category._id}
            sx={{ pl: 5, py: 1 }}
            aria-describedby={id}
          >
            <Typography>{category.name}</Typography>
          </MenuItem>
        ))}

      {/* {result &&
          result.map((category) => (
            <>
              <MenuItem
                key={category._id}
                sx={{ pl: 5 }}
                aria-describedby={id}
                // onMouseOver={() => {
                //   getSub(category._id)
                // }}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <Typography>{category.name}</Typography>
              </MenuItem>
              <Divider />
              <Popper id={id} open={open} anchorEl={anchorEl} placement='right'>
                <Paper sx={{ p: 1, bgcolor: 'background.paper' }}>
                  <MenuList>
                    {category?.subCategories?.map((item) => (
                      <MenuItem>{item.name}</MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              </Popper>
            </>
          ))} */}
    </MenuList>

    // <List
    //   sx={{
    //     width: '100%',
    //     maxWidth: 360,
    //     bgcolor: 'background.paper',
    //     height: '100%',
    //   }}
    //   component='nav'
    //   aria-labelledby='nested-list-subheader'
    // >
    //   <ListItemButton>
    //     <ListItemIcon>
    //       <ImFire size='1.4rem' />
    //     </ListItemIcon>
    //     <ListItemText primary='Hot Jobs' />
    //   </ListItemButton>
    //   <ListItemButton>
    //     <ListItemIcon>
    //       <RiShoppingBag3Line size='1.4rem' />
    //     </ListItemIcon>
    //     <ListItemText primary='Buy Now' />
    //   </ListItemButton>
    //   <ListItemButton>
    //     <ListItemIcon>
    //       <FiTruck size='1.4rem' />
    //     </ListItemIcon>
    //     <ListItemText primary='Find a truck' />
    //   </ListItemButton>
    //   <ListItemButton onClick={handleClick}>
    //     <ListItemIcon>
    //       <IoListOutline size='1.4rem' />
    //     </ListItemIcon>
    //     <ListItemText primary='Category' />
    //     {open ? <ExpandLess /> : <ExpandMore />}
    //   </ListItemButton>
    //   <Collapse in={open} timeout='auto' unmountOnExit>
    //     <List component='div' disablePadding>
    //       {categories &&
    //         categories.map((category) => (
    //           <ListItemButton sx={{ pl: 9 }} key={category._id}>
    //             <ListItemText>{category.name}</ListItemText>
    //           </ListItemButton>
    //         ))}
    //     </List>
    //   </Collapse>
    // </List>
  )
}

export default FeedNav
