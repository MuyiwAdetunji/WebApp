import React, { useState, useEffect, useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  Hidden,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material'
import { useHistory } from 'react-router-dom'

import { useAddFarmerProductPageStyles } from '../../styles/agentStyle'

import FileUpload from '../../components/shared/FileUpload'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/system'
import PromoCard from '../../components/cards/PromoCard'
import HelpIcon from '@mui/icons-material/Help'
import VendorHeader from '../../components/shared/vendor/Header'
import VendorNavbar from '../../components/shared/vendor/Navbar'
import HeaderMenu from '../../components/shared/vendor/HeaderMenu'
import AgentHeader from '../../components/shared/agent/Header'
import AgentNavbar from '../../components/shared/agent/NavBar'
import {
  getAllCategories,
  getCategorySubs,
  createVendorProduct,
  createAgentProduct,
  getMyFarmers,
} from '../../apis'
import { toast } from 'react-toastify'

import { LoadingIcon } from '../../icons'
import { useSelector } from 'react-redux'
import SEO from '../../components/shared/Seo'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const deliveryMode = [
  'Locally',
  'Nationwide',
  'Internationally',
  'Self-Delivery',
  'Pick-up',
]

const VendorAddProduct = () => {
  const classes = useAddFarmerProductPageStyles()
  const [productName, setProductName] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [category, setCategory] = useState('')
  const [farmers, setFarmers] = useState([])
  const [farmer, setFarmer] = useState('')
  const [subCategory, setSubCategory] = useState([])
  const [deliveryType, setDeliveryType] = useState([])
  const [quantityPriceWeight, setQuantityPriceWeight] = useState([])
  const [quantity, setQuantity] = useState('')
  const [weight, setWeight] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [images, setImages] = useState([])
  const [imageLoading, setImageLoading] = useState(false)
  const [metrics, setMetrics] = useState('')

  const naira = '\u20A6'

  const { user } = useSelector((state) => ({ ...state }))

  console.log(user)
  const history = useHistory()

  useEffect(() => {
    loadCategories()

    if (user.role === 'agent') {
      loadMyFarmers()
    }
  }, [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setDeliveryType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  // Load Farmers
  const loadMyFarmers = async () => {
    const res = await getMyFarmers(user._id)
    setFarmers(res.doc)
  }

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

    if (price !== '' || quantity !== '' || weight !== '' || metrics !== '') {
      window.alert('Please Click the + Add Button to add the product')
    } else {
      if (user.role === 'vendor') {
        for (let i = 0; i < quantityPriceWeight.length; i++) {
          const { price, quantity, weight, metrics } = quantityPriceWeight[i]
          const res = await createVendorProduct(
            productName,
            description,
            price,
            category,
            subCategory,
            quantity,
            weight,
            images,
            metrics,
            deliveryType,
            paymentType,
            user._id
          )

          if (res) {
            toast.success(`"${res.productName} - ${res.quantity}KG" is created`)
            history.push('/dashboard')
          }
        }
      } else if (user.role === 'agent') {
        for (let i = 0; i < quantityPriceWeight.length; i++) {
          const { price, quantity, weight, metrics } = quantityPriceWeight[i]
          const res = await createAgentProduct(
            productName,
            description,
            price,
            category,
            subCategory,
            quantity,
            weight,
            images,
            metrics,
            deliveryType,
            farmer,
            user._id
          )

          if (res) {
            toast.success(`"${res.productName} - ${res.quantity}KG" is created`)
            history.push('/dashboard')
          }
        }
      }
    }
  }

  // ADD ITEM TO ARRAY
  function addItem(e) {
    e.preventDefault()
    setQuantityPriceWeight([
      ...quantityPriceWeight,
      { quantity, weight, price, metrics },
    ])
    setQuantity('')
    setWeight('')
    setPrice('')
    setMetrics('')
  }

  return (
    <Container sx={{ my: 10 }}>
      <SEO title='Add Product' />
      {user.role === 'vendor' && (
        <>
          {/* <VendorHeader />
          <VendorNavbar /> */}
          <HeaderMenu />
        </>
      )}

      {user.role === 'agent' && (
        <>
          <AgentHeader />
          <AgentNavbar />
        </>
      )}

      <Typography component='h4' variant='h6'>
        Create New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FormControl sx={{ mt: 2, width: '100%' }} variant='outlined'>
              <InputLabel htmlFor='name' required>
                Product Name
              </InputLabel>
              <OutlinedInput
                required
                id='name'
                type='text'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                label='Product Name'
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl sx={{ mt: 2, width: '100%' }} variant='outlined'>
              {user.role === 'vendor' ? (
                <>
                  <InputLabel htmlFor='farmer-name'>Store Name</InputLabel>
                  <OutlinedInput
                    id='name'
                    type='text'
                    disabled
                    value={user.storeName}
                    label='Store Name'
                  />
                </>
              ) : (
                <>
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
                </>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FormControl sx={{ mt: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='payment-type'>Payment Type</InputLabel>
                <Select
                  id='payment-type'
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  label='Payment Type'
                >
                  <MenuItem value='Cash on Delivery'>Cash on Delivery</MenuItem>
                  <MenuItem value='Tinkoko Secure'>Tinkoko Secure</MenuItem>
                </Select>
              </FormControl>
              <Tooltip title='Tinkoko secure ensures that your payments are processed by us.'>
                <HelpIcon sx={{ color: '#000' }} />
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
              <InputLabel htmlFor='category' required>
                Category
              </InputLabel>
              <Select
                id='category'
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
              <InputLabel htmlFor='sub-category' required>
                Sub-Category
              </InputLabel>
              <Select
                id='sub-category'
                required
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                label='Sub-Category'
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
            <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
              <InputLabel htmlFor='type-of-delivery' required>
                Choose Your Delivery Range
              </InputLabel>
              <Select
                // labelId='demo-multiple-checkbox-label'
                id='type-of-delivery'
                multiple
                value={deliveryType}
                onChange={handleChange}
                input={<OutlinedInput label='Choose Your Delivery Range' />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                required
              >
                {deliveryMode.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={deliveryType.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
              <InputLabel htmlFor='in-stock' required>
                Quantity
              </InputLabel>
              <OutlinedInput
                id='in-stock'
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                label='Quantity'
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
              <InputLabel htmlFor='weight' required>
                Weight
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                endAdornment={
                  <InputAdornment position='end'>
                    <Select
                      id='metrics'
                      value={metrics}
                      onChange={(e) => setMetrics(e.target.value)}
                      label='metrics'
                    >
                      <MenuItem value='Kg'>Kg</MenuItem>
                      <MenuItem value='Litres'>Litres</MenuItem>
                      <MenuItem value='Tonnes'>Tonnes</MenuItem>
                    </Select>
                  </InputAdornment>
                }
                type='number'
                label='Weight'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3.5}>
            <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
              <InputLabel htmlFor='price' required>
                Price
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-amount'
                startAdornment={
                  <InputAdornment position='start'>{`${naira}`}</InputAdornment>
                }
                type='number'
                label='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1.4}>
            <div>
              <Button
                variant='primary'
                startIcon={<AddIcon />}
                onClick={addItem}
                disabled={!quantity || !weight || !price || !metrics}
              >
                Add
              </Button>
              <Tooltip>
                <HelpIcon sx={{ color: '#000' }} />
              </Tooltip>
            </div>
          </Grid>
        </Grid>
        {quantityPriceWeight.length > 0 &&
          quantityPriceWeight.map((v) => (
            <Grid container spacing={3}>
              <Grid item xs={3.5}>
                <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                  <TextField
                    type='text'
                    disabled
                    value={v.quantity}
                    // onChange={handleChange('email')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3.5}>
                <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    value={v.weight}
                    endAdornment={
                      <InputAdornment position='end'>
                        {v.metrics}
                      </InputAdornment>
                    }
                    disabled
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3.5}>
                <FormControl sx={{ my: 2, width: '100%' }} variant='outlined'>
                  <OutlinedInput
                    id='outlined-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${naira}`}</InputAdornment>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={10}
              sx={{ width: '100%', my: 2 }}
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
              variant='primary'
            />
            <PromoCard
              name='Start-Up'
              duration='30 days'
              product='15'
              amount='12,500'
              variant='primary'
            />
            <PromoCard
              name='Enterprise'
              duration='1 Year'
              product='30'
              amount='130,000'
              variant='primary'
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
                <Button fullWidth variant='primary-plain'>
                  Save as draft
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth variant='primary-plain'>
                  Preview
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth variant='primary' type='submit'>
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
  )
}

export default VendorAddProduct
