import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Input,
  InputAdornment,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@mui/material'

const SearchForm = () => {
  const dispatch = useDispatch()
  const { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  const history = useHistory()

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/products?${text}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          background: '#F4F5F8',
          padding: '0.5rem',
          borderRadius: '10px',
        }}
      >
        <SearchIcon />
        <input
          type='text'
          placeholder='Search'
          value={text}
          onChange={handleChange}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            resize: 'none',
            outline: 'none',
            margin: '0 10px',
            fontSize: '1rem',
          }}
        />
        <select
          name='filter'
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            resize: 'none',
            outline: 'none',
            margin: '0 10px',
            fontSize: '1rem',
            color: '#979797',
          }}
        >
          <option value='all-products'>All Products</option>
          <option value='all-vendors'>All Vendors</option>
        </select>

        {/* <Input
          placeholder='Search'
          value={text}
          variant='outlined'
          onChange={handleChange}
          // startAdornment={
          //   <InputAdornment position='start'>
          //     <SearchIcon />
          //   </InputAdornment>
          // }
        /> */}
        {/* <Select name='choose' id='choose'>
          <MenuItem value='All Products'>All-Produts</MenuItem>
          <MenuItem value='All Vendors'>All Vendors</MenuItem>
        </Select> */}
      </Box>
    </form>
  )
}

export default SearchForm
