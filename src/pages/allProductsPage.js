import {
  Box,
  Grid,
  Pagination,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Chip,
  Checkbox,
  Slider,
  Hidden,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import ProductCard from '../components/cards/ProductCard'
import Search from '../components/shared/Search'
import UserLayout from '../Layouts/UserLayout'
import MoneyIcon from '@mui/icons-material/Money'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useAllProductsStyles, useSearchStyles } from '../styles/styles'
import {
  getAllProducts,
  getProductsCount,
  getProductsByFilter,
  getAllCategories,
  getAllSubCategories,
} from '../apis'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const AllProducts = () => {
  const classes = useAllProductsStyles()
  const history = useHistory()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [productsCount, setProductsCount] = useState(0)
  const [page, setPage] = useState(1)

  // SIDE BAR CONST=============
  const classe = useSearchStyles()

  const [openPrice, setOpenPrice] = useState(true)
  const [openCategory, setOpenCategory] = useState(false)
  const [openSubCategory, setOpenSubCategory] = useState(false)
  const [openLocation, setOpenLocation] = useState(false)
  const [openRating, setOpenRating] = useState(true)
  const [sliderValue, setSliderValue] = useState([0, 0])
  const [categories, setCategories] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [ok, setOk] = useState(false)
  const [star, setStar] = useState(0)

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
    setCategoryIds([])

    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setSliderValue(newValue)
    setTimeout(() => {
      setOk(!ok)
    }, 300)
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

  // HANDLE CHECK

  // ===========================

  // LOAD PRODUCTS BASED ON SEARCH
  const dispatch = useDispatch()
  let { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  // setCategoryIds([])
  // setSliderValue([0, 0])
  // setStar(0)

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text })
      if (!text) {
        loadAllProducts()
      }
    }, 300)

    return () => clearTimeout(delayed)
  }, [text])

  const fetchProducts = (arg) => {
    getProductsByFilter(arg).then((res) => {
      setProducts(res.data)
    })
  }

  // LOAD PRODUCTS BASED ON PRICE range

  useEffect(() => {
    fetchProducts({ price: sliderValue })
  }, [ok])

  // =================

  // LOAD PRODUCTS BASED ON CATEGORY

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setOpenPrice([0, 0])
    setStar(0)

    let items = [...categoryIds]
    let checked = e.target.value
    let foundInState = items.indexOf(checked)

    // indexOf Method if not found returns -1 else returns index
    if (foundInState === -1) {
      items.push(checked)
    } else {
      // use splice to remove
      items.splice(foundInState, 1)
    }

    setCategoryIds(items)
    fetchProducts({ category: items })
  }

  useEffect(() => {
    fetchProducts({ price: sliderValue })
  }, [ok])

  // =================

  // LOAD PRODUCTS BASED ON STAR
  const handleStarClick = (num) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setOpenPrice([0, 0])
    setCategoryIds([])
    setStar(num)
    fetchProducts({ stars: num })
  }

  // ==========================

  // LOAD PRODUCTS BASED ON SUBCATEGORY
  const handleChipClick = (sub) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setOpenPrice([0, 0])
    setStar(0)
    setCategoryIds([])

    setSubCategory(sub)
    fetchProducts({ sub: subCategory })
  }

  // ===============

  useEffect(() => {
    loadAllProducts()
  }, [page])
  useEffect(() => {
    loadProductsCount()
  }, [])

  const loadProductsCount = async () => {
    const res = await getProductsCount()

    if (res) {
      setProductsCount(res)
    }
  }

  const loadAllProducts = async () => {
    setLoading(true)
    const res = await getAllProducts(page)

    if (res) {
      setLoading(false)
      setProducts(res.doc)
    }
  }

  return (
    <UserLayout>
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Hidden lgDown>
            <Grid item xs={3}>
              <div className={classe.container}>
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
                    <div className={classe.list}>
                      <List component='div' disablePadding>
                        {categories.map((category) => (
                          <ListItemButton sx={{ pl: 6 }}>
                            <ListItemText>
                              <Checkbox
                                onChange={handleCheck}
                                checked={categoryIds.includes(category._id)}
                                value={category._id}
                              />
                              {category.name}
                            </ListItemText>
                          </ListItemButton>
                        ))}
                      </List>
                    </div>
                  </Collapse>
                  <ListItemButton onClick={handleSubCategoryClick}>
                    <ListItemIcon>
                      <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary='SubCategories' />
                    {openSubCategory ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openSubCategory} timeout='auto' unmountOnExit>
                    <div className={classe.list}>
                      <List component='div' disablePadding>
                        <Box sx={{ pl: 5 }}>
                          {subCategories.map((sub) => (
                            <Chip
                              label={sub.name}
                              sx={{ m: 1 }}
                              onClick={() => handleChipClick(sub._id)}
                            />
                          ))}
                        </Box>
                        {/* {subCategories.map((sub) => (
                      <ListItemButton sx={{ pl: 6 }}>
                        <ListItemText primary={sub.name} />
                      </ListItemButton>
                    ))} */}
                      </List>
                    </div>
                  </Collapse>
                  <ListItemButton onClick={handleLocationClick}>
                    <ListItemIcon>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary='Location' />
                    {openLocation ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openLocation} timeout='auto' unmountOnExit>
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
                      <ListItemButton
                        sx={{ pl: 6 }}
                        onClick={() => handleStarClick(5)}
                      >
                        <ListItemText>
                          <Typography>
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />{' '}
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />{' '}
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />{' '}
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />{' '}
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        sx={{ pl: 6 }}
                        onClick={() => handleStarClick(4)}
                      >
                        <ListItemText>
                          <Typography>
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />{' '}
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />{' '}
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />{' '}
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        sx={{ pl: 6 }}
                        onClick={() => handleStarClick(3)}
                      >
                        <ListItemText>
                          <Typography>
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />{' '}
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />{' '}
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        sx={{ pl: 6 }}
                        onClick={() => handleStarClick(2)}
                      >
                        <ListItemText>
                          <Typography>
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />{' '}
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                      <ListItemButton
                        sx={{ pl: 6 }}
                        onClick={() => handleStarClick(1)}
                      >
                        <ListItemText>
                          <Typography>
                            <StarIcon
                              fontSize='small'
                              sx={{ color: '#F5AF00' }}
                            />
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>
            </Grid>
          </Hidden>
          <Grid item lg={9} md={12}>
            <div className={classes.contentWrapper}>
              <Typography variant='subtitle2'>
                {productsCount} Products Available
              </Typography>
              <Grid container spacing={3}>
                {products.length > 0
                  ? products.map((product) => (
                      <Grid
                        item
                        xs={6}
                        md={3}
                        sm={4}
                        lg={2.4}
                        key={product._id}
                      >
                        <ProductCard
                          product={product}
                          onClick={() =>
                            history.push(`/product/${product.slug}`)
                          }
                        />
                      </Grid>
                    ))
                  : 'Please refine your search'}
              </Grid>
              {productsCount > 3 && (
                <Box sx={{ py: 7 }}>
                  <Pagination
                    count={
                      3
                      // productsCount % 3 === 0
                      //   ? productsCount / 3
                      //   : productsCount / 3 + 1
                    }
                    page={page}
                    onChange={handlePageChange}
                    color='agent'
                    variant='outlined'
                  />
                </Box>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </UserLayout>
  )
}

export default AllProducts
