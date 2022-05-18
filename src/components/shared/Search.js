import React, { useState, useEffect } from 'react'
import { useSearchStyles } from '../../styles/styles'
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Slider,
} from '@mui/material'
import MoneyIcon from '@mui/icons-material/Money'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { getAllCategories, getAllSubCategories } from '../../apis'

const Search = () => {
  const classes = useSearchStyles()

  const [openPrice, setOpenPrice] = useState(true)
  const [openCategory, setOpenCategory] = useState(false)
  const [openSubCategory, setOpenSubCategory] = useState(false)
  const [openLocation, setOpenLocation] = useState(false)
  const [openRating, setOpenRating] = useState(true)
  const [sliderValue, setSliderValue] = useState([1000, 10000])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  const naira = '\u20A6'

  function valuetext(value) {
    return `${naira}${value}`
  }

  const handlePriceClick = () => {
    setOpenPrice(!openPrice)
  }
  const handleCategoryClick = () => {
    setOpenCategory(!openCategory)
  }
  const handleSubCategoryClick = () => {
    setOpenSubCategory(!openSubCategory)
  }
  const handleLocationClick = () => {
    setOpenLocation(!openLocation)
  }
  const handleRatingClick = () => {
    setOpenRating(!openRating)
  }

  const handleSliderChange = (e, newValue) => {
    setSliderValue(newValue)
  }

  const getCategories = async () => {
    const res = await getAllCategories()

    if (res) {
      setCategories(res.category)
    }
  }

  const getSubCategories = async () => {
    const res = await getAllSubCategories()

    if (res) {
      setSubCategories(res.subCategory)
    }
  }

  useEffect(() => {
    getCategories()
    getSubCategories()
  }, [])

  return (
    <div className={classes.container}>
      <Typography variant='subtitle2' component='div'>
        SEARCH/FILTER
      </Typography>
      <List>
        <ListItemButton onClick={handlePriceClick}>
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText primary='Price' />
          {openPrice ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openPrice} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <Box sx={{ pl: 4, width: 270 }}>
              <Slider
                value={sliderValue}
                aria-label='Small'
                valueLabelDisplay='auto'
                onChange={handleSliderChange}
                min={500}
                max={50000}
                step={100}
                getAriaValueText={valuetext}
              />
            </Box>
          </List>
        </Collapse>
        <ListItemButton onClick={handleCategoryClick}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary='Categories' />
          {openCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openCategory} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {categories.map((category) => (
              <ListItemButton sx={{ pl: 6 }}>
                <ListItemText primary={category.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={handleSubCategoryClick}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary='SubCategories' />
          {openSubCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSubCategory} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {subCategories.map((sub) => (
              <ListItemButton sx={{ pl: 6 }}>
                <ListItemText primary={sub.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={handleLocationClick}>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary='Location' />
          {openLocation ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSubCategory} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {subCategories.map((sub) => (
              <ListItemButton sx={{ pl: 6 }}>
                <ListItemText primary={sub.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={handleRatingClick}>
          <ListItemIcon>
            <StarOutlineIcon />
          </ListItemIcon>
          <ListItemText primary='Rating' />
          {openRating ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openRating} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 6 }}>
              <ListItemText>
                <Typography>
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />{' '}
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />{' '}
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />{' '}
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />{' '}
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton sx={{ pl: 6 }}>
              <ListItemText>
                <Typography>
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />{' '}
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />{' '}
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />{' '}
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton sx={{ pl: 6 }}>
              <ListItemText>
                <Typography>
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />{' '}
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />{' '}
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton sx={{ pl: 6 }}>
              <ListItemText>
                <Typography>
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />{' '}
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton sx={{ pl: 6 }}>
              <ListItemText>
                <Typography>
                  <StarIcon fontSize='small' sx={{ color: '#F5AF00' }} />
                </Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  )
}

export default Search
