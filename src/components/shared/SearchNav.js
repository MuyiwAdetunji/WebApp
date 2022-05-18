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
  Grid,
} from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchNavStyles } from '../../styles/styles'
import { ImFire } from 'react-icons/im'
import { RiShoppingBag3Line } from 'react-icons/ri'
import { FiTruck } from 'react-icons/fi'
import { IoListOutline } from 'react-icons/io5'
// import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu'
import { LoadingIcon } from '../../icons'

import 'rc-menu/assets/index.css'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { getAllCategories, getAllSubCategories } from '../../apis'
import MenuIcon from '@mui/icons-material/Menu'

import { useHistory } from 'react-router-dom'

const SearchNav = () => {
  const classes = useSearchNavStyles()
  // const [open, setOpen] = useState(true)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [placement, setPlacement] = useState()
  const [categorySub, setCategorySub] = useState([])
  const [subVisibility, setSubVisibility] = useState(false)

  const history = useHistory()

  // ==================== RC
  function handleSelect(info) {
    console.log('selected ', info)
  }

  function handleDeselect(info) {
    console.log('deselect ', info)
  }

  const titleRight = <span>Product</span>
  // ========================

  // const arrowRef = useRef()
  // console.log(categorySub)

  useEffect(() => {
    loadCategories()
    loadSubCategories()
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

  const loadSubCategories = async () => {
    setLoading(true)
    const res = await getAllSubCategories()
    setLoading(false)
    setSubCategories(res.subCategory)
  }

  const getSub = (categoryId) => {
    const sub = subCategories.filter((a) => a.parent === categoryId)
    const data = sub.map((s) => s.name)
    setCategorySub(data)
    console.log(data)
  }

  const result = categories.map((category) => {
    category.subCategories = subCategories.filter(
      (a) => a.parent === category._id
    )
    return category
  })

  return (
    <>
      <Paper>
        {/* <Menu
        multiple
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        defaultSelectedKeys={['2', '1-1']}
        style={{ overflowX: 'hidden', maxHeight: '70vh' }}
      >
        <MenuItem>
          <Typography variant='h6' component='body'>
            ALL CATEGORIES
          </Typography>
        </MenuItem>
        {loading && <LoadingIcon />}
        {result &&
          result.map((category) => (
            <div key={category._id}>
            <SubMenu title={category.name} key={category._id}>
              {category?.subCategories?.map((item) => (
                <MenuItem key={item._id}>{item.name}</MenuItem>
              ))}
              <Divider />
            </SubMenu>
            // </div>
          ))}
      </Menu> */}
        <MenuList sx={{ overflowX: 'hidden', maxHeight: '70vh' }}>
          <MenuItem sx={{ background: '#E9F2E4' }}>
            <Typography
              variant='h6'
              // component='body'
              onClick={() => window.open('/all-categories', '_blank')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#7AB259',
              }}
            >
              <MenuIcon /> ALL CATEGORIES
            </Typography>
          </MenuItem>
          <Divider />
          {result &&
            result.map((category) => (
              <>
                <MenuItem
                  key={category._id}
                  sx={{ pl: 5 }}
                  aria-describedby={id}
                  // onMouseOver={() => {
                  //   getSub(category._id)
                  // }}
                  // onMouseEnter={handlePopoverOpen}
                  // onMouseLeave={handlePopoverClose}
                >
                  <Typography variant='subtitle2'>{category.name}</Typography>
                </MenuItem>
                <Divider />
                {subVisibility && (
                  <div className={classes.test}>
                    <Typography variant='h6' sx={{ mb: 3 }}>
                      {category.name}
                    </Typography>
                    <Grid container>
                      {category?.subCategories?.map((item) => (
                        <Grid item xs={3}>
                          <Typography sx={{ ':hover': { fontWeight: 'bold' } }}>
                            {item.name}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                )}
                {/* <Popper id={id} open={open} anchorEl={anchorEl} placement='right'>
                <Paper sx={{ p: 1, bgcolor: 'background.paper' }}>
                  <MenuList>
                    {category?.subCategories?.map((item) => (
                      <MenuItem>{item.name}</MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              </Popper> */}
              </>
            ))}
        </MenuList>
      </Paper>
    </>
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

export default SearchNav
