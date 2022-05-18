import React, { useState, useEffect, useContext } from 'react'
import {
  Button,
  Container,
  FormControl,
  Grid,
  Hidden,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAddFarmerProductPageStyles } from '../../styles/agentStyle'
import AgentHeader from '../../components/shared/agent/Header'
import AgentNavbar from '../../components/shared/agent/NavBar'
import AuthContext from '../../contexts/AuthContext'
import FileUpload from '../../components/shared/FileUpload'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/system'
import PromoCard from '../../components/cards/PromoCard'
import HelpIcon from '@mui/icons-material/Help'
import {
  getMyFarmers,
  getAllCategories,
  getCategorySubs,
  createFarmerProduct,
} from '../../apis'

import { LoadingIcon } from '../../icons'
import { useDispatch, useSelector } from 'react-redux'

const AddFarmerProduct = () => {
  const classes = useAddFarmerProductPageStyles()
  // const auth = useContext(AuthContext)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))

  const history = useHistory()

  const [farmers, setFarmers] = useState([])
  const [farmer, setFarmer] = useState('')
  const [productName, setProductName] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState([])
  const [deliveryType, setDeliveryType] = useState('')
  const [quantityPriceWeight, setQuantityPriceWeight] = useState([])
  const [quantity, setQuantity] = useState('')
  const [weight, setWeight] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [images, setImages] = useState([])
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => loadMyFarmers(), [])

  const loadMyFarmers = async () => {
    const res = await getMyFarmers(user._id)
    setFarmers(res.doc)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  // Load All Categories
  const loadCategories = async () => {
    const res = await getAllCategories()
    setCategories(res.category)
  }

  const handleCategoryChange = async (e) => {
    e.preventDefault()
    setCategory(e.target.value)
    const res = await getCategorySubs(e.target.value)
    if (res) {
      setSubCategories(res)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    for (let i = 0; i < quantityPriceWeight.length; i++) {
      const { price, quantity, weight } = quantityPriceWeight[i]
      const res = await createFarmerProduct(
        productName,
        description,
        price,
        category,
        subCategory,
        quantity,
        weight,
        images,
        deliveryType,
        farmer,
        user._id,
        user.token
      )
      if (res) {
        toast.success(
          `"${res.doc.productName} - ${res.doc.quantity}KG" is created`
        )
        setFarmers([])
        setFarmer('')
        setProductName('')
        setLocation('')
        setCategory('')
        setSubCategory([])
        setDeliveryType('')
        setQuantityPriceWeight([])
        setQuantity('')
        setWeight('')
        setPrice('')
        setDescription('')
        setCategories([])
        setSubCategories([])
        setImages([])
        history.push('/agent')
      }
    }
  }

  // ADD ITEM TO ARRAY
  function addItem(e) {
    e.preventDefault()
    setQuantityPriceWeight([
      ...quantityPriceWeight,
      { quantity, weight, price },
    ])
    setQuantity('')
    setWeight('')
    setPrice('')
  }

  return (
    <>
      <Container>
        <AgentHeader />
        <AgentNavbar />
      </Container>
      <Container sx={{ my: 3 }}>
        <Typography component='h4' variant='h6'>
          Create New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FormControl
                sx={{ mt: 2, width: '100%' }}
                variant='outlined'
                color='agent'
              >
                <InputLabel htmlFor='name' required>
                  Product Name
                </InputLabel>
                <OutlinedInput
                  id='name'
                  required
                  type='text'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  label='Name'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl
                sx={{ mt: 2, width: '100%' }}
                variant='outlined'
                color='agent'
              >
                <InputLabel htmlFor='location' required>
                  Location
                </InputLabel>
                <Select
                  id='location'
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  label='Location'
                >
                  <MenuItem value={10}>Nigeria</MenuItem>
                  <MenuItem value={20}>China</MenuItem>
                  <MenuItem value={30}>Adamawa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl
                sx={{ mt: 2, width: '100%' }}
                variant='outlined'
                color='agent'
              >
                <InputLabel htmlFor='farmer-name' required>
                  Farmer's Name
                </InputLabel>
                <Select
                  id='farmer-name'
                  value={farmer}
                  onChange={(e) => setFarmer(e.target.value)}
                  label='farmer-name'
                >
                  {farmers &&
                    farmers.map((farmer) => (
                      <MenuItem key={farmer._id} value={farmer._id}>
                        {farmer.fullName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='category' required color='agent'>
                  Category
                </InputLabel>
                <Select
                  id='category'
                  color='agent'
                  required
                  value={category}
                  onChange={handleCategoryChange}
                  label='Category'
                >
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <MenuItem key={c._id} value={c._id}>
                        {c.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='sub-category' required color='agent'>
                  Sub-category
                </InputLabel>
                <Select
                  id='sub-category'
                  color='agent'
                  required
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  label='Sub-category'
                >
                  {subCategories.length > 0 ? (
                    subCategories.map((s) => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Please Choose Category</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl
                sx={{ my: 2, width: '100%' }}
                variant='outlined'
                color='agent'
              >
                <InputLabel htmlFor='type-of-delivery' required>
                  Type of delivery?
                </InputLabel>
                <Select
                  id='type-of-delivery'
                  required
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  label='type-of-delivery'
                >
                  <MenuItem value='self-delivery'>Self Delivery</MenuItem>
                  <MenuItem value='tinkoko-services'>Tinkoko Services</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={3.5}>
              <FormControl
                color='agent'
                sx={{ my: 2, width: '100%' }}
                variant='outlined'
              >
                <InputLabel htmlFor='in-stock' required>
                  In stock
                </InputLabel>
                <OutlinedInput
                  id='in-stock'
                  type='text'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  label='in-stock'
                />
              </FormControl>
            </Grid>
            <Grid item xs={3.5}>
              <FormControl
                color='agent'
                sx={{ my: 2, width: '100%' }}
                variant='outlined'
              >
                <InputLabel htmlFor='weight' required>
                  Weight
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  endAdornment={
                    <InputAdornment position='end'>kg</InputAdornment>
                  }
                  type='number'
                  label='Weight'
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3.5}>
              <FormControl
                color='agent'
                sx={{ my: 2, width: '100%' }}
                variant='outlined'
              >
                <InputLabel htmlFor='price' required>
                  Price
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  startAdornment={
                    <InputAdornment position='start'>N</InputAdornment>
                  }
                  type='number'
                  label='Price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1.4}>
              <div className={classes.buttonIcon}>
                <Button
                  variant='agent'
                  startIcon={<AddIcon />}
                  onClick={addItem}
                  disabled={!quantity || !weight || !price}
                >
                  Add
                </Button>
                <Tooltip
                  title='Do you have the same product but in
              different sizes?
               Use this “add” feature to add your similar
              products in one post.'
                  transitionComponent={Zoom}
                  placement='bottom-end'
                >
                  <HelpIcon sx={{ color: '#000' }} />
                </Tooltip>
              </div>
            </Grid>
          </Grid>
          {quantityPriceWeight.length > 0 &&
            quantityPriceWeight.map((v) => (
              <Grid container spacing={3}>
                <Grid item xs={3.5}>
                  <FormControl
                    sx={{ my: 2, width: '100%' }}
                    variant='outlined'
                    color='vendor'
                  >
                    <TextField
                      type='text'
                      disabled
                      value={v.quantity}
                      // onChange={handleChange('email')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3.5}>
                  <FormControl
                    sx={{ my: 2, width: '100%' }}
                    variant='outlined'
                    color='vendor'
                  >
                    <OutlinedInput
                      id='outlined-adornment-password'
                      value={v.weight}
                      endAdornment={
                        <InputAdornment position='end'>kg</InputAdornment>
                      }
                      disabled
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={3.5}>
                  <FormControl
                    sx={{ my: 2, width: '100%' }}
                    variant='outlined'
                    color='vendor'
                  >
                    <OutlinedInput
                      id='outlined-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>N</InputAdornment>
                      }
                      value={v.price}
                      disabled
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={1.2} sx={{ my: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Tooltip
                        title='Edit'
                        transitionComponent={Zoom}
                        placement='bottom-end'
                      >
                        <EditIcon sx={{ color: '#000', cursor: 'pointer' }} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title='Delete'>
                        <DeleteIcon
                          sx={{ color: '#ee0000', cursor: 'pointer' }}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <TextField
                label='Description'
                multiline
                color='agent'
                rows={10}
                sx={{ width: '100%', my: 2 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%', my: 2 }}>
                <Typography component='h4' variant='h6'>
                  Add Photo
                </Typography>
                <Typography component='div' variant='body2'>
                  Add at least 1 photo for this category.
                </Typography>
                <Typography component='div' variant='body2'>
                  First picture - is the title picture. You can change the order
                  of photos: just grab your photos and drag.
                </Typography>
                <FileUpload
                  images={images}
                  setImages={setImages}
                  setLoading={setImageLoading}
                />
                <Typography component='div' variant='body2'>
                  Each picture must not exceed 5 Mb
                </Typography>
                <Typography component='div' variant='body2'>
                  Supported formats are *.jpg, *.gif and *.png
                </Typography>
              </Box>
              {imageLoading && <LoadingIcon />}
            </Grid>
          </Grid>
          <Typography
            component='h4'
            variant='h6'
            sx={{ textAlign: 'center', my: 3 }}
          >
            Promote your product
          </Typography>
          <Container maxWidth='md'>
            <Grid container spacing={6}>
              <PromoCard
                name='Basic'
                duration='7 days'
                product='5'
                amount='3,500'
                variant='agent'
              />
              <PromoCard
                name='Start-Up'
                duration='30 days'
                product='15'
                amount='12,500'
                variant='agent'
              />
              <PromoCard
                name='Enterprise'
                duration='1 Year'
                product='30'
                amount='130,000'
                variant='agent'
              />
            </Grid>
          </Container>

          <Grid container>
            <Hidden smDown>
              <Grid item xs={12} md={3}></Grid>
            </Hidden>
            <Grid item xs={12} md={6} sx={{ my: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Button fullWidth variant='agent-plain'>
                    Save as draft
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth variant='agent-plain'>
                    Preview
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth variant='agent' type='submit'>
                    Finish
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} md={3}></Grid>
            </Hidden>
          </Grid>
        </form>
      </Container>
    </>
  )
}

export default AddFarmerProduct
